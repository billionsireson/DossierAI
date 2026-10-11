"use client";

import { useActionState } from "react";
import { saveOnboardingName } from "@/lib/auth/actions";

export function WelcomeNameForm({ initial }: { initial?: string | null }) {
  const [state, action, pending] = useActionState(saveOnboardingName, undefined);
  return (
    <form action={action} className="mt-6 space-y-3">
      <label className="block text-sm">
        <span className="mb-1 block font-medium">Your full name</span>
        <input
          name="name"
          defaultValue={initial ?? ""}
          required
          minLength={2}
          placeholder="Ada Lovelace"
          className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm"
        />
      </label>
      {state?.message && (
        <p role="alert" className="rounded-xl bg-[#fef2f2] p-3 text-sm text-[#b91c1c]">
          {state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-[#180F6E] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
      >
        {pending ? "Saving…" : "Continue"}
      </button>
    </form>
  );
}
