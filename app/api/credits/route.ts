import { NextResponse } from "next/server";
import { balance, grant, history } from "@/lib/credits/ledger";
import { getCurrentUserId } from "@/lib/auth/current-user";

export const runtime = "nodejs";

export async function GET() {
  const userId = await getCurrentUserId();
  return NextResponse.json({ balance: await balance(userId), history: await history(userId) });
}

export async function POST(req: Request) {
  // Demo-only grant endpoint so the flow is testable pre-payments.
  // TODO(billing): replace with purchase/subscription webhooks + admin guard.
  let body: unknown = {};
  try {
    body = await req.json();
  } catch {
    body = {};
  }
  const amount = Number((body as { amount?: unknown }).amount ?? 5);
  if (!Number.isInteger(amount) || amount <= 0 || amount > 1000) {
    return NextResponse.json({ error: "Amount must be 1–1000." }, { status: 400 });
  }
  const userId = await getCurrentUserId();
  const tx = await grant(userId, amount, "bonus", "demo-grant");
  return NextResponse.json({ balance: await balance(userId), tx });
}
