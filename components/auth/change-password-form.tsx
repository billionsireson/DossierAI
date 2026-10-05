"use client";

import { useActionState } from "react";
import { changePassword } from "@/lib/auth/actions";

export function ChangePasswordForm() {
  const [state, action, pending] = useActionState(changePassword, undefined);
  const input =
    "w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0F172A]";
  return (
    <form action={action} className="mt-3 grid gap-3">
      <label className="block text-sm">
        <span className="mb-1 block font-medium">Current password</span>
        <input name="currentPassword" type="password" required className={input} />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium">New password</span>
        <input name="newPassword" type="password" required minLength={8} className={input} />
        {state?.errors?.newPassword && (
          <span className="mt-1 block text-xs text-[#b91c1c]">{state.errors.newPassword[0]}</span>
        )}
      </label>
      {state?.message && (
        <p role="status" className="rounded-xl bg-[#F7FAFC] p-3 text-sm text-[#334155]">
          {state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-fit rounded-xl bg-[#07142F] px-4 py-2 text-sm font-medium text-white hover:bg-[#0f2452] disabled:opacity-60"
      >
        {pending ? "Updating…" : "Update password"}
      </button>
    </form>
  );
}
