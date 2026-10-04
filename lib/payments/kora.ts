import type { PaymentProvider } from "@/lib/payments/provider";

const KORA_API = "https://api.korapay.com/merchant/api/v1";

/** Kora — crypto payments for additional credits (integration #4b).
 *  Scaffolded to the provider interface; confirm charge payload + webhook
 *  header names against Kora's docs when credentials arrive. */
export const koraProvider: PaymentProvider = {
  name: "kora",
  async initialize({ email, amountNGN, purpose }) {
    const secret = process.env.KORA_SECRET_KEY;
    if (!secret) throw new Error("Kora is not configured.");
    const res = await fetch(`${KORA_API}/charges`, {
      method: "POST",
      headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: amountNGN,
        currency: "NGN",
        customer: { email },
        notification_url: `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/api/payments/kora/webhook`,
        narration: purpose.kind === "subscription" ? `DossierAI ${purpose.plan}` : `DossierAI ${purpose.credits} credits`,
        metadata: { purpose },
      }),
    });
    if (!res.ok) throw new Error("Kora charge creation failed.");
    const data = (await res.json()) as { data?: { checkout_url?: string; reference?: string } };
    if (!data.data?.checkout_url || !data.data?.reference) {
      throw new Error("Kora returned no checkout URL.");
    }
    return { authorizationUrl: data.data.checkout_url, reference: data.data.reference };
  },
  async verify(reference) {
    const secret = process.env.KORA_SECRET_KEY;
    if (!secret) throw new Error("Kora is not configured.");
    const res = await fetch(`${KORA_API}/charges/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${secret}` },
    });
    if (!res.ok) throw new Error("Kora verify failed.");
    const data = (await res.json()) as {
      data?: { status?: string; amount?: number; customer?: { email?: string } };
    };
    return {
      paid: data.data?.status === "success",
      amountNGN: Number(data.data?.amount ?? 0),
      email: data.data?.customer?.email,
    };
  },
};
