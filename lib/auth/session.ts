import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SESSION_COOKIE = "dossierai_session";
const ALG = "HS256";

function getKey(): Uint8Array | null {
  const secret = process.env.AUTH_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

export type SessionPayload = {
  userId: string;
  expiresAt: string;
};

export async function encryptSession(payload: SessionPayload): Promise<string> {
  const key = getKey();
  if (!key) throw new Error("AUTH_SECRET is not configured.");
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function decryptSession(
  session: string | undefined,
): Promise<SessionPayload | null> {
  const key = getKey();
  if (!key || !session) return null;
  try {
    const { payload } = await jwtVerify(session, key, { algorithms: [ALG] });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function createSession(userId: string): Promise<void> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  const session = await encryptSession({ userId, expiresAt });
  const store = await cookies();
  store.set(SESSION_COOKIE, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expiresAt),
  });
}

export async function deleteSession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export const sessionCookieName = SESSION_COOKIE;
