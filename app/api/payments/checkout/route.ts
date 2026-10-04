import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth/current-user";
import { paystackProvider } from "@/lib/payments/paystack";
import { koraProvider } from "@/lib/payments/kora";

export const runtime = "nodejs";

const BodySchema = z.object({
  provider: z.enum(["paystack", "kora"]),
  email: z.string().email().optional(),
  amountNGN: z.number().int().positive().max(10_000_000),
  purpose: z.union([
    z.object({ kind: z.literal("subscription"), plan: z.enum(["PRO", "PREMIUM"]) }),
    z.object({ kind: z.literal("credit_pack"), credits: z.number().int().positive().max(10_000) }),
  ]),
});

// Start a checkout: Paystack for fiat (subscriptions + packs), Kora for crypto packs.
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid checkout request." }, { status: 400 });
  }
  const user = await getCurrentUser();
  const email = parsed.data.email ?? user?.email ?? undefined;
  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }
  const provider = parsed.data.provider === "paystack" ? paystackProvider : koraProvider;
  try {
    const session = await provider.initialize({
      email,
      amountNGN: parsed.data.amountNGN,
      purpose: parsed.data.purpose,
    });
    return NextResponse.json({ provider: provider.name, ...session });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Checkout failed." },
      { status: 502 },
    );
  }
}
