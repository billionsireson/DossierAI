"use client";

import { useActionState } from "react";
import { resetPassword } from "@/lib/auth/actions";

export function ResetForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState(resetPassword, undefined);
  return (
    <form action={action} className="mt-6 space-y-3 text-white">
      <input type="hidden" name="token" value={token} />
      <label className="block text-sm">
        <span className="mb-1 block font-medium">New password</span>
        <input
          name="newPassword"
          type="password"
          required
          minLength={8}
          className="ocean-input"
        />
      </label>
      {state?.message && (
        <p role="alert" className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
          {state.message}
        </p>
      )}
      <button type="submit" disabled={pending} className="ocean-btn w-full">
        {pending ? "Resetting…" : "Reset password"}
      </button>
    </form>
  );
}
