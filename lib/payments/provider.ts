import { createHmac, timingSafeEqual } from "crypto";

// Payment provider abstraction — integrations #4 (Paystack: fiat
// subscriptions/recurring; Kora: crypto for additional credits).
// Business logic depends on this interface, never on vendor SDKs.

export type PaymentPurpose =
  | { kind: "subscription"; plan: "PRO" | "PREMIUM" }
  | { kind: "credit_pack"; credits: number };

export interface PaymentProvider {
  readonly name: "paystack" | "kora";
  initialize(args: {
    email: string;
    amountNGN: number;
    purpose: PaymentPurpose;
  }): Promise<{ authorizationUrl: string; reference: string }>;
  verify(reference: string): Promise<{ paid: boolean; amountNGN: number; email?: string }>;
}

export function verifyPaystackSignature(rawBody: string, signature: string | null): boolean {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret || !signature) return false;
  const digest = createHmac("sha512", secret).update(rawBody).digest("hex");
  const a = Buffer.from(digest);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Kora webhook check — confirm header/secret names against Kora's current
 *  docs when credentials arrive; scaffolded to the same shape as Paystack. */
export function verifyKoraSignature(rawBody: string, signature: string | null): boolean {
  const secret = process.env.KORA_WEBHOOK_SECRET ?? process.env.KORA_SECRET_KEY;
  if (!secret || !signature) return false;
  const digest = createHmac("sha512", secret).update(rawBody).digest("hex");
  const a = Buffer.from(digest);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
