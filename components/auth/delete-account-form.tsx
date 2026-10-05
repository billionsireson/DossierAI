"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteAccountForm() {
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [gone, setGone] = useState(false);

  async function run() {
    setMessage(null);
    try {
      const res = await fetch("/api/account", { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Delete failed.");
      setGone(true);
      router.push("/");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Delete failed.");
    }
  }

  if (gone) return <p className="mt-2 text-sm">Account deleted. Redirecting…</p>;

  return (
    <div className="mt-2">
      <p className="text-[#64748B]">
        Deletes your account, portfolios, files, credits and publications. This cannot be undone.
      </p>
      {!confirm ? (
        <button
          onClick={() => setConfirm(true)}
          className="mt-3 rounded-xl border border-[#fecaca] px-4 py-2 text-sm font-medium text-[#b91c1c] hover:bg-[#fef2f2]"
        >
          Delete my account
        </button>
      ) : (
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => void run()}
            className="rounded-xl bg-[#b91c1c] px-4 py-2 text-sm font-semibold text-white hover:bg-[#991b1b]"
          >
            Yes, delete everything
          </button>
          <button
            onClick={() => setConfirm(false)}
            className="rounded-xl border border-[#E2E8F0] px-4 py-2 text-sm hover:bg-[#F7FAFC]"
          >
            Keep my account
          </button>
        </div>
      )}
      {message && (
        <p role="alert" className="mt-2 text-sm text-[#b91c1c]">
          {message}
        </p>
      )}
    </div>
  );
}
