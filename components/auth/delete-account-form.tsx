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
      <p className="text-[#b6c8e2]">
        Deletes your account, portfolios, files, credits and publications. This cannot be undone.
      </p>
      {!confirm ? (
        <button
          onClick={() => setConfirm(true)}
          className="mt-3 rounded-full border border-red-500/50 px-4 py-2 text-sm font-semibold text-red-200 hover:bg-red-500/10 focus-visible:outline-2 focus-visible:outline-[#00c8ff]"
        >
          Delete my account
        </button>
      ) : (
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => void run()}
            className="rounded-full bg-[#b91c1c] px-4 py-2 text-sm font-semibold text-white hover:bg-[#991b1b]"
          >
            Yes, delete everything
          </button>
          <button
            onClick={() => setConfirm(false)}
            className="rounded-full border border-[rgba(73,147,255,0.28)] px-4 py-2 text-sm text-white hover:border-[rgba(0,174,255,0.65)]"
          >
            Keep my account
          </button>
        </div>
      )}
      {message && (
        <p role="alert" className="mt-2 text-sm text-red-300">
          {message}
        </p>
      )}
    </div>
  );
}
