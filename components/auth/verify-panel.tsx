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
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5">
      <h2 className="font-semibold capitalize">{channel}</h2>
      <p className="mt-1 text-sm text-[#64748B]">{value ?? "Not provided"}</p>
      {verified ? (
        <p className="mt-2 inline-block rounded-full bg-[#dcfce7] px-3 py-1 text-xs font-semibold text-[#166534]">
          Verified
        </p>
      ) : (
        <div className="mt-3 space-y-2">
          <button
            onClick={() => void send(channel)}
            className="rounded-lg border border-[#E2E8F0] px-3 py-1.5 text-sm font-medium hover:bg-[#F7FAFC]"
          >
            Send code
          </button>
          {sent[channel] && <p className="text-xs text-[#92400e]">{sent[channel]}</p>}
          <form action={action} className="flex gap-2">
            <input type="hidden" name="channel" value={channel} />
            <input
              name="code"
              required
              inputMode="numeric"
              placeholder="6-digit code"
              className="w-36 rounded-lg border border-[#E2E8F0] px-3 py-1.5 text-sm"
            />
            <button
              type="submit"
              disabled={pending}
              className="rounded-lg bg-[#180F6E] px-3 py-1.5 text-sm font-medium text-white disabled:opacity-60"
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
        <p role="status" className="mb-3 rounded-xl bg-[#F4F6FB] p-3 text-sm">{state.message}</p>
      )}
      <div className="grid gap-3 md:grid-cols-2">
        {row("email", email, emailVerified)}
        {row("phone", phone, phoneVerified)}
      </div>
    </div>
  );
}
