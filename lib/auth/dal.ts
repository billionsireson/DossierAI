import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { decryptSession, sessionCookieName } from "@/lib/auth/session";

/**
 * Data Access Layer guard (Next.js docs pattern).
 * All private data fetching must go through verifySession().
 */
export const verifySession = cache(async (): Promise<{ userId: string } | null> => {
  const cookie = (await cookies()).get(sessionCookieName)?.value;
  const session = await decryptSession(cookie);
  if (!session?.userId) return null;
  if (new Date(session.expiresAt).getTime() < Date.now()) return null;
  return { userId: session.userId };
});
