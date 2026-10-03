"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";
import { createSession, deleteSession } from "@/lib/auth/session";
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
  redirect("/app/dashboard");
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
  redirect("/app/dashboard");
}

export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/login");
}
