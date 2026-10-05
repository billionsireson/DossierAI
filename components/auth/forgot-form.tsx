"use client";

import { useActionState } from "react";
import { requestPasswordReset } from "@/lib/auth/actions";

export function ForgotForm() {
  const [state, action, pending] = useActionState(requestPasswordReset, undefined);
  return (
    <form action={action} className="mt-6 space-y-3">
      <label className="block text-sm">
        <span className="mb-1 block font-medium">Email</span>
        <input
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm text-[#0F172A]"
        />
      </label>
      {state?.message && (
        <p role="status" className="rounded-xl bg-[#F7FAFC] p-3 text-sm text-[#334155]">
          {state.message}
        </p>
      )}
      {"debugToken" in (state ?? {}) && (state as { debugToken?: string }).debugToken && (
        <p className="rounded-xl bg-[#fffbeb] p-3 text-sm text-[#92400e]">
          Dev token (would be emailed):{" "}
          <a
            className="font-mono underline"
            href={`/reset?token=${(state as { debugToken: string }).debugToken}`}
          >
            open reset link →
          </a>
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1d4ed8] disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send reset link"}
      </button>
    </form>
  );
}
