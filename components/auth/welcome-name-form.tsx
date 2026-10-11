"use client";

import { useActionState } from "react";
import { saveOnboardingName } from "@/lib/auth/actions";

export function WelcomeNameForm({ initial }: { initial?: string | null }) {
  const [state, action, pending] = useActionState(saveOnboardingName, undefined);
  return (
    <form action={action} className="mt-6 space-y-3 text-white">
      <label className="block text-sm">
        <span className="mb-1 block font-medium">Your full name</span>
        <input
          name="name"
          defaultValue={initial ?? ""}
          required
          minLength={2}
          placeholder="Ada Lovelace"
          className="ocean-input"
        />
      </label>
      {state?.message && (
        <p role="alert" className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
          {state.message}
        </p>
      )}
      <button type="submit" disabled={pending} className="ocean-btn w-full">
        {pending ? "Saving…" : "Continue"}
      </button>
    </form>
  );
}
