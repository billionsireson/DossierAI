"use client";

import { useState } from "react";

export function CheckoutButtons() {
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function checkout(plan: "PRO" | "PREMIUM", amountNGN: number) {
    setBusy(plan);
    setError(null);
    try {
      const res = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: "paystack",
          amountNGN,
          purpose: { kind: "subscription", plan },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Checkout failed.");
      window.location.assign(data.authorizationUrl as string);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout failed.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="mt-4 space-y-3">
      {(
        [
          { plan: "PRO", price: 4998, label: "Upgrade to Pro — ₦4,998/month" },
          { plan: "PREMIUM", price: 9998, label: "Upgrade to Premium — ₦9,998/month" },
        ] as const
      ).map((p) => (
        <button
          key={p.plan}
          disabled={busy !== null}
          onClick={() => void checkout(p.plan, p.price)}
          className="w-full rounded-xl bg-[#180F6E] px-4 py-3 text-sm font-semibold text-white hover:bg-[#2320a8] disabled:opacity-60"
        >
          {busy === p.plan ? "Redirecting to Paystack…" : p.label}
        </button>
      ))}
      {error && (
        <p role="alert" className="rounded-xl bg-[#fef2f2] p-3 text-sm text-[#b91c1c]">
          {error}
        </p>
      )}
      <p className="text-xs text-[#94a3b8]">
        Test mode: pay with card 4084 0840 8408 4081, any CVV and future expiry.
      </p>
    </div>
  );
}
