import { NextResponse } from "next/server";
import { balance, grant, history } from "@/lib/credits/ledger";

export const runtime = "nodejs";

const DEMO_USER = "demo-user";

export async function GET() {
  // TODO(auth): derive userId from session.
  return NextResponse.json({ balance: balance(DEMO_USER), history: history(DEMO_USER) });
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
  const tx = grant(DEMO_USER, amount, "bonus", "demo-grant");
  return NextResponse.json({ balance: balance(DEMO_USER), tx });
}
