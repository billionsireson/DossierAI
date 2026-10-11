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
  const input =
    "w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm";
  return (
    <form action={action} className="mt-6 space-y-3">
      <label className="block text-sm">
        <span className="mb-1 block font-medium">Email</span>
        <input name="email" type="email" required defaultValue={email ?? ""} className={input} />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium">Active phone number</span>
        <input
          name="phone"
          type="tel"
          required
          defaultValue={phone ?? ""}
          placeholder="+234 801 234 5678"
          className={input}
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
        {pending ? "Saving…" : "Enter my dashboard"}
      </button>
    </form>
  );
}
