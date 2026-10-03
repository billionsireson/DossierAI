import { getDb } from "@/lib/db";

/** Demo identity until real auth lands. Upserts so FK constraints hold. */
export async function ensureDemoUser() {
  const db = await getDb();
  return db.user.upsert({
    where: { email: "esther@example.com" },
    update: {},
    create: {
      id: "demo-user",
      email: "esther@example.com",
      name: "Esther Okafor",
      plan: "FREE",
    },
  });
}
