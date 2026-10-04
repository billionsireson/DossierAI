import type { PaymentProvider } from "@/lib/payments/provider";

const PAYSTACK_API = "https://api.paystack.co";

/** Paystack — fiat subscriptions + recurring (integration #4a). */
export const paystackProvider: PaymentProvider = {
  name: "paystack",
  async initialize({ email, amountNGN, purpose }) {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    if (!secret) throw new Error("Paystack is not configured.");
    const plan =
      purpose.kind === "subscription"
        ? purpose.plan === "PRO"
          ? process.env.PAYSTACK_PRO_PLAN
          : process.env.PAYSTACK_PREMIUM_PLAN
        : undefined;
    const res = await fetch(`${PAYSTACK_API}/transaction/initialize`, {
      method: "POST",
      headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        amount: Math.round(amountNGN * 100), // kobo
        ...(plan ? { plan } : {}),
        metadata: { purpose },
      }),
    });
    if (!res.ok) throw new Error("Paystack initialize failed.");
    const data = (await res.json()) as {
      data?: { authorization_url?: string; reference?: string };
    };
    if (!data.data?.authorization_url || !data.data?.reference) {
      throw new Error("Paystack returned no authorization URL.");
    }
    return { authorizationUrl: data.data.authorization_url, reference: data.data.reference };
  },
  async verify(reference) {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    if (!secret) throw new Error("Paystack is not configured.");
    const res = await fetch(`${PAYSTACK_API}/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${secret}` },
    });
    if (!res.ok) throw new Error("Paystack verify failed.");
    const data = (await res.json()) as {
      data?: { status?: string; amount?: number; customer?: { email?: string } };
    };
    return {
      paid: data.data?.status === "success",
      amountNGN: (data.data?.amount ?? 0) / 100,
      email: data.data?.customer?.email,
    };
  }
};
