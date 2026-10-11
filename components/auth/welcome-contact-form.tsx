"use client";

import { useActionState } from "react";
import { saveOnboardingContact } from "@/lib/auth/actions";

export function WelcomeContactForm({
  email,
  phone,
}: {
  email?: string | null;
  phone?: string | null;
}) {
  const [state, action, pending] = useActionState(saveOnboardingContact, undefined);
  return (
    <form action={action} className="mt-6 space-y-3 text-white">
      <label className="block text-sm">
        <span className="mb-1 block font-medium">Email</span>
        <input name="email" type="email" required defaultValue={email ?? ""} className="ocean-input" />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium">Active phone number</span>
        <input
          name="phone"
          type="tel"
          required
          defaultValue={phone ?? ""}
          placeholder="+234 801 234 5678"
          className="ocean-input"
        />
      </label>
      {state?.message && (
        <p role="alert" className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
          {state.message}
        </p>
      )}
      <button type="submit" disabled={pending} className="ocean-btn w-full">
        {pending ? "Saving…" : "Enter my dashboard"}
      </button>
    </form>
  );
}
