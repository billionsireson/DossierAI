"use client";

import { useActionState, useState } from "react";
import { setPasskey } from "@/lib/auth/actions";

export function PasskeyModal() {
  const [dismissed, setDismissed] = useState(false);
  const [state, action, pending] = useActionState(setPasskey, undefined);
  if (dismissed) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label="Set your passkey" className="fixed inset-0 z-50 flex items-center justify-center bg-[#020914]/80 p-6 backdrop-blur-sm">
      <div className="glass-panel w-full max-w-sm p-6 text-white shadow-[0_0_60px_rgba(0,102,255,0.25)]">
        <h2 className="text-lg font-semibold">Lock your account with a passkey</h2>
        <p className="mt-1 text-sm text-[#b6c8e2]">
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
              className="ocean-input text-center text-lg tracking-[0.5em]"
            />
          </label>
          {state?.message && (
            <p role="status" className="glass-panel p-3 text-sm text-white">{state.message}</p>
          )}
          <button type="submit" disabled={pending} className="ocean-btn w-full">
            {pending ? "Setting…" : "Set passkey"}
          </button>
        </form>
        <button onClick={() => setDismissed(true)} className="mt-2 w-full py-1 text-center text-xs text-[#7892b5] hover:text-white">
          Remind me later
        </button>
      </div>
    </div>
  );
}
