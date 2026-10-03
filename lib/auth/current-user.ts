import "server-only";
import { cache } from "react";
import { getDb } from "@/lib/db";
import { verifySession } from "@/lib/auth/dal";

/** Session user id, or the demo identity pre-auth. */
export const getCurrentUserId = cache(async (): Promise<string> => {
  const session = await verifySession();
  return session?.userId ?? "demo-user";
});

export const getCurrentUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;
  const db = await getDb();
  return db.user.findUnique({ where: { id: session.userId } });
});
