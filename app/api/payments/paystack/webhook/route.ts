import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { grant } from "@/lib/credits/ledger";
import { verifyPaystackSignature } from "@/lib/payments/provider";

export const runtime = "nodejs";

// Paystack fiat webhook — verified signature → credits or subscription.
export async function POST(req: Request) {
  const raw = await req.text();
  const signature = req.headers.get("x-paystack-signature");
  if (!verifyPaystackSignature(raw, signature)) {
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
        metadata: z.object({ purpose: z.unknown().optional() }).optional(),
      }),
    })
    .safeParse(event);
  if (!parsed.success || parsed.data.event !== "charge.success") {
    return NextResponse.json({ received: true });
  }
  const email = parsed.data.data.customer?.email?.toLowerCase();
  const purpose = parsed.data.data.metadata?.purpose as
    | { kind?: string; plan?: string; credits?: number }
    | undefined;
  if (!email) return NextResponse.json({ received: true });
  const db = await getDb();
  const user = await db.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ received: true });

  if (purpose?.kind === "subscription" && (purpose.plan === "PRO" || purpose.plan === "PREMIUM")) {
    await db.user.update({ where: { id: user.id }, data: { plan: purpose.plan } });
    await db.subscription.create({
      data: { userId: user.id, plan: purpose.plan, status: "active" },
    });
    const { PLANS } = await import("@/lib/billing/plans");
    await grant(user.id, PLANS[purpose.plan].creditsPerMonth, "subscription_grant", parsed.data.data.reference);
  } else if (purpose?.kind === "credit_pack" && Number.isInteger(purpose.credits)) {
    await grant(user.id, Number(purpose.credits), "purchase", parsed.data.data.reference);
  }
  return NextResponse.json({ received: true });
}
