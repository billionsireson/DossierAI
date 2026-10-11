"use client";

import { useActionState, useState } from "react";
import { confirmVerificationCode } from "@/lib/auth/actions";

export function VerifyPanel({
  email,
  emailVerified,
  phone,
  phoneVerified,
}: {
  email?: string | null;
  emailVerified?: string | null;
  phone?: string | null;
  phoneVerified?: string | null;
}) {
  const [state, action, pending] = useActionState(confirmVerificationCode, undefined);
  const [sent, setSent] = useState<Record<string, string>>({});

  async function send(channel: "email" | "phone") {
    const res = await fetch("/api/verify/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ channel }),
    });
    const data = await res.json();
    setSent((s) => ({ ...s, [channel]: data.debugCode ? `Dev code: ${data.debugCode}` : (data.message ?? "") }));
  }

  const row = (
    channel: "email" | "phone",
    value?: string | null,
    verified?: string | null,
  ) => (
    <div className="glass-panel p-5 text-white">
      <h2 className="font-semibold capitalize">{channel}</h2>
      <p className="mt-1 text-sm text-[#b6c8e2]">{value ?? "Not provided"}</p>
      {verified ? (
        <p className="mt-2 inline-block rounded-full bg-[#00c8ff]/20 px-3 py-1 text-xs font-semibold text-[#64ddff]">
          Verified
        </p>
      ) : (
        <div className="mt-3 space-y-2">
          <button
            onClick={() => void send(channel)}
            className="rounded-full border border-[rgba(73,147,255,0.28)] bg-[rgba(7,26,51,0.75)] px-3 py-1.5 text-sm font-semibold text-white hover:border-[rgba(0,174,255,0.65)]"
          >
            Send code
          </button>
          {sent[channel] && <p className="text-xs text-amber-200">{sent[channel]}</p>}
          <form action={action} className="flex gap-2">
            <input type="hidden" name="channel" value={channel} />
            <input
              name="code"
              required
              inputMode="numeric"
              placeholder="6-digit code"
              className="ocean-input w-36"
            />
            <button
              type="submit"
              disabled={pending}
              className="rounded-full bg-gradient-to-r from-[#0875ff] to-[#4338ff] px-4 py-1.5 text-sm font-semibold text-white disabled:opacity-60"
            >
              Verify
            </button>
          </form>
        </div>
      )}
    </div>
  );

  return (
    <div>
      {state?.message && (
        <p role="status" className="glass-panel mb-3 p-3 text-sm text-white">{state.message}</p>
      )}
      <div className="grid gap-3 md:grid-cols-2">
        {row("email", email, emailVerified)}
        {row("phone", phone, phoneVerified)}
      </div>
    </div>
  );
}
