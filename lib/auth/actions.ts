"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { createHash, randomBytes } from "crypto";
import { getDb } from "@/lib/db";
import { createSession, deleteSession } from "@/lib/auth/session";
import { verifySession } from "@/lib/auth/dal";
import { grant } from "@/lib/credits/ledger";
import { PLANS } from "@/lib/billing/plans";
import { LoginSchema, SignupSchema, type AuthFormState } from "@/lib/auth/validation";

export async function signup(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const parsed = SignupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }
  const db = await getDb();
  const existing = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) return { message: "An account with this email already exists. Try signing in." };

  const passwordHash = await bcrypt.hash(parsed.data.password, 10);
  const user = await db.user.create({
    data: {
      email: parsed.data.email,
      name: parsed.data.name,
      passwordHash,
      plan: "FREE",
    },
  });
  await grant(user.id, PLANS.FREE.creditsPerMonth, "bonus", "welcome");
  await createSession(user.id);
  redirect("/app/welcome");
}

export async function login(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const parsed = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }
  const db = await getDb();
  const user = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (!user?.passwordHash) {
    return { message: "No password account found for this email. Try signing up or Google sign-in." };
  }
  const ok = await bcrypt.compare(parsed.data.password, user.passwordHash);
  if (!ok) return { message: "Incorrect password. Try again." };
  await createSession(user.id);
  redirect(user.phone ? "/app/dashboard" : "/app/welcome");
}

export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/");
}

export async function saveOnboardingName(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const session = await verifySession();
  if (!session) redirect("/login");
  const name = String(formData.get("name") ?? "").trim();
  if (name.length < 2) return { message: "Please tell us your full name." };
  const db = await getDb();
  await db.user.update({ where: { id: session.userId }, data: { name } });
  redirect("/app/welcome/contact");
}

export async function saveOnboardingContact(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const session = await verifySession();
  if (!session) redirect("/login");
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const phone = String(formData.get("phone") ?? "").trim();
  if (!email.includes("@")) return { message: "Please enter a valid email." };
  if (phone.replace(/\D/g, "").length < 7) {
    return { message: "Please enter an active phone number." };
  }
  const db = await getDb();
  const clash = await db.user.findUnique({ where: { email } });
  if (clash && clash.id !== session.userId) {
    return { message: "That email belongs to another account." };
  }
  await db.user.update({
    where: { id: session.userId },
    data: { email, phone, emailVerified: null, phoneVerified: null },
  });
  redirect("/app/dashboard");
}

export async function setPasskey(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const session = await verifySession();
  if (!session) redirect("/login");
  const passkey = String(formData.get("passkey") ?? "").trim();
  if (!/^\d{4,8}$/.test(passkey)) {
    return { message: "Passkey must be 4–8 digits." };
  }
  const db = await getDb();
  await db.user.update({
    where: { id: session.userId },
    data: { passkeyHash: await bcrypt.hash(passkey, 10) },
  });
  return { message: "Passkey set. Your account has an extra lock." };
}

function codeHash(code: string, userId: string): string {
  return createHash("sha256")
    .update(`${code}:${userId}:${process.env.AUTH_SECRET ?? ""}`)
    .digest("hex");
}

export async function sendVerificationCode(
  channel: "email" | "phone",
): Promise<{ ok: boolean; debugCode?: string; message: string }> {
  const session = await verifySession();
  if (!session) redirect("/login");
  const code = String(Math.floor(100000 + Math.random() * 900000));
  const db = await getDb();
  await db.verificationCode.create({
    data: {
      userId: session.userId,
      channel,
      codeHash: codeHash(code, session.userId),
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    },
  });
  // TODO(notify): deliver via email/SMS provider (Resend/Termii). Dev reveals the code.
  if (process.env.NODE_ENV !== "production") {
    return { ok: true, debugCode: code, message: `Dev code for ${channel}: ${code}` };
  }
  return { ok: true, message: `A code is on its way to your ${channel}.` };
}

export async function confirmVerificationCode(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const session = await verifySession();
  if (!session) redirect("/login");
  const channel = String(formData.get("channel") ?? "");
  const code = String(formData.get("code") ?? "").trim();
  if (channel !== "email" && channel !== "phone") return { message: "Invalid channel." };
  const db = await getDb();
  const record = await db.verificationCode.findFirst({
    where: { userId: session.userId, channel, usedAt: null },
    orderBy: { createdAt: "desc" },
  });
  if (!record || record.expiresAt < new Date() || record.codeHash !== codeHash(code, session.userId)) {
    return { message: "Invalid or expired code. Request a fresh one." };
  }
  await db.verificationCode.update({ where: { id: record.id }, data: { usedAt: new Date() } });
  await db.user.update({
    where: { id: session.userId },
    data: channel === "email" ? { emailVerified: new Date() } : { phoneVerified: new Date() },
  });
  redirect("/app/dashboard");
}

export async function changePassword(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const session = await verifySession();
  if (!session) redirect("/login");
  const current = String(formData.get("currentPassword") ?? "");
  const next = String(formData.get("newPassword") ?? "");
  if (next.length < 8 || !/[a-zA-Z]/.test(next) || !/[0-9]/.test(next)) {
    return {
      errors: {
        newPassword: ["Must be 8+ characters with a letter and a number."],
      },
    };
  }
  const db = await getDb();
  const user = await db.user.findUnique({ where: { id: session.userId } });
  if (!user?.passwordHash) {
    return { message: "This account uses Google sign-in — no password to change." };
  }
  if (!(await bcrypt.compare(current, user.passwordHash))) {
    return { message: "Current password is incorrect." };
  }
  await db.user.update({
    where: { id: user.id },
    data: { passwordHash: await bcrypt.hash(next, 10) },
  });
  return { message: "Password updated." };
}

function resetTokenHash(token: string): string {
  return createHash("sha256")
    .update(token + (process.env.AUTH_SECRET ?? ""))
    .digest("hex");
}

export async function requestPasswordReset(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState & { debugToken?: string }> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email.includes("@")) return { message: "Enter a valid email address." };
  const db = await getDb();
  const user = await db.user.findUnique({ where: { email } });
  // Always respond identically so emails can't be enumerated.
  if (!user) return { message: "If an account exists, a reset link is on its way." };
  const token = randomBytes(32).toString("hex");
  await db.passwordReset.create({
    data: {
      userId: user.id,
      tokenHash: resetTokenHash(token),
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    },
  });
  // TODO(email): deliver via SMTP provider; dev surfaces the token to unblock testing.
  if (process.env.NODE_ENV !== "production") {
    return { message: "Dev mode: use the token below.", debugToken: token };
  }
  return { message: "If an account exists, a reset link is on its way." };
}

export async function resetPassword(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const token = String(formData.get("token") ?? "");
  const next = String(formData.get("newPassword") ?? "");
  if (next.length < 8) return { message: "Password must be at least 8 characters." };
  const db = await getDb();
  const record = await db.passwordReset.findUnique({
    where: { tokenHash: resetTokenHash(token) },
  });
  if (!record || record.usedAt || record.expiresAt < new Date()) {
    return { message: "This reset link is invalid or expired." };
  }
  await db.user.update({
    where: { id: record.userId },
    data: { passwordHash: await bcrypt.hash(next, 10) },
  });
  await db.passwordReset.update({ where: { id: record.id }, data: { usedAt: new Date() } });
  await createSession(record.userId);
  redirect("/app/dashboard");
}
