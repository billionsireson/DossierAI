import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifySession } from "@/lib/auth/dal";
import { deleteSession } from "@/lib/auth/session";

export const runtime = "nodejs";

// Full account erasure — PRD §40 privacy. Cascades via Prisma relations.
export async function DELETE() {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  const db = await getDb();
  await db.user.delete({ where: { id: session.userId } });
  await deleteSession();
  return NextResponse.json({ deleted: true });
}
