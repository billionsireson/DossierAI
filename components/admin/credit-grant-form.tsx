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
    <form onSubmit={(e) => void submit(e)} className="mt-3 flex items-end gap-2 text-white">
      <label className="text-sm">
        <span className="mb-1 block font-medium">Adjust credits (signed-in user)</span>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          inputMode="numeric"
          className="ocean-input w-28"
        />
      </label>
      <button
        type="submit"
        className="rounded-full bg-gradient-to-r from-[#0875ff] to-[#4338ff] px-4 py-2 text-sm font-semibold text-white"
      >
        Grant
      </button>
      {message && (
        <span role="status" className="text-sm text-[#b6c8e2]">
          {message}
        </span>
      )}
    </form>
  );
}
