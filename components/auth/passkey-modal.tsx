"use client";

import { useActionState, useState } from "react";
import { setPasskey } from "@/lib/auth/actions";

export function PasskeyModal() {
  const [dismissed, setDismissed] = useState(false);
  const [state, action, pending] = useActionState(setPasskey, undefined);
  if (dismissed) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label="Set your passkey" className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d1442]/70 p-6 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
        <h2 className="text-lg font-bold">Lock your account with a passkey</h2>
        <p className="mt-1 text-sm text-[#64748B]">
          To prevent unauthorized access to your account, set a unique 4–8 digit passkey.
        </p>
        <form action={action} className="mt-4 space-y-3">
          <label className="block text-sm">
            <span className="mb-1 block font-medium">Passkey (digits only)</span>
            <input
              name="passkey"
              inputMode="numeric"
              pattern="[0-9]{4,8}"
              required
              placeholder="••••"
              className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-center text-lg tracking-[0.5em]"
            />
          </label>
          {state?.message && (
            <p role="status" className="rounded-xl bg-[#F4F6FB] p-3 text-sm">{state.message}</p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-xl bg-[#180F6E] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {pending ? "Setting…" : "Set passkey"}
          </button>
        </form>
        <button onClick={() => setDismissed(true)} className="mt-2 w-full py-1 text-center text-xs text-[#94a3b8] hover:text-[#475569]">
          Remind me later
        </button>
      </div>
    </div>
  );
}
