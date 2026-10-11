"use client";

import { useActionState } from "react";
import { requestPasswordReset } from "@/lib/auth/actions";

export function ForgotForm() {
  const [state, action, pending] = useActionState(requestPasswordReset, undefined);
  return (
    <form action={action} className="mt-6 space-y-3 text-white">
      <label className="block text-sm">
        <span className="mb-1 block font-medium">Email</span>
        <input
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="ocean-input"
        />
      </label>
      {state?.message && (
        <p role="status" className="glass-panel p-3 text-sm text-white">
          {state.message}
        </p>
      )}
      {"debugToken" in (state ?? {}) && (state as { debugToken?: string }).debugToken && (
        <p className="rounded-xl border border-amber-400/40 bg-amber-400/10 p-3 text-sm text-amber-100">
          Dev token (would be emailed):{" "}
          <a
            className="font-mono underline"
            href={`/reset?token=${(state as { debugToken: string }).debugToken}`}
          >
            open reset link →
          </a>
        </p>
      )}
      <button type="submit" disabled={pending} className="ocean-btn w-full">
        {pending ? "Sending…" : "Send reset link"}
      </button>
    </form>
  );
}
