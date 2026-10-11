"use client";

import { useActionState } from "react";
import { changePassword } from "@/lib/auth/actions";

export function ChangePasswordForm() {
  const [state, action, pending] = useActionState(changePassword, undefined);
  return (
    <form action={action} className="mt-3 grid gap-3 text-white">
      <label className="block text-sm">
        <span className="mb-1 block font-medium">Current password</span>
        <input name="currentPassword" type="password" required className="ocean-input" />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium">New password</span>
        <input name="newPassword" type="password" required minLength={8} className="ocean-input" />
        {state?.errors?.newPassword && (
          <span className="mt-1 block text-xs text-red-300">{state.errors.newPassword[0]}</span>
        )}
      </label>
      {state?.message && (
        <p role="status" className="glass-panel p-3 text-sm text-white">
          {state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="ocean-btn w-fit"
      >
        {pending ? "Updating…" : "Update password"}
      </button>
    </form>
  );
}
