"use client";

import { useState } from "react";

export function CreditGrantForm() {
  const [amount, setAmount] = useState("10");
  const [message, setMessage] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await fetch("/api/credits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(amount) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Grant failed.");
      setMessage(`Granted. New balance: ${data.balance}. Refresh to update.`);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Grant failed.");
    }
  }

  return (
    <form onSubmit={(e) => void submit(e)} className="mt-3 flex items-end gap-2">
      <label className="text-sm">
        <span className="mb-1 block font-medium">Adjust credits (demo-user)</span>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          inputMode="numeric"
          className="w-28 rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm"
        />
      </label>
      <button
        type="submit"
        className="rounded-lg bg-[#07142F] px-4 py-2 text-sm font-medium text-white hover:bg-[#0f2452]"
      >
        Grant
      </button>
      {message && (
        <span role="status" className="text-sm text-[#334155]">
          {message}
        </span>
      )}
    </form>
  );
}
