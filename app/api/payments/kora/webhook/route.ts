import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { grant } from "@/lib/credits/ledger";
import { verifyKoraSignature } from "@/lib/payments/provider";

export const runtime = "nodejs";

// Kora crypto webhook — verified signature → additional credits.
export async function POST(req: Request) {
  const raw = await req.text();
  const signature =
    req.headers.get("x-kora-signature") ?? req.headers.get("x-korapay-signature");
  if (!verifyKoraSignature(raw, signature)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }
  let event: unknown;
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }
  const parsed = z
    .object({
      event: z.string(),
      data: z.object({
        status: z.string().optional(),
        reference: z.string().optional(),
        customer: z.object({ email: z.string().optional() }).optional(),
        credits: z.number().int().positive().optional(),
      }),
    })
    .safeParse(event);
  if (!parsed.success || parsed.data.event !== "charge.success") {
    return NextResponse.json({ received: true });
  }
  const email = parsed.data.data.customer?.email?.toLowerCase();
  const credits = parsed.data.data.credits ?? 50;
  if (!email) return NextResponse.json({ received: true });
  const db = await getDb();
  const user = await db.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ received: true });
  await grant(user.id, credits, "purchase", parsed.data.data.reference);
  return NextResponse.json({ received: true });
}
