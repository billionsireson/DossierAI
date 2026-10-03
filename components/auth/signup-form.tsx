"use client";

import { useActionState } from "react";
import { signup } from "@/lib/auth/actions";

export function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);
  const input =
    "w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm text-[#0F172A]";
  return (
    <form action={action} className="mt-6 space-y-3">
      <label className="block text-sm">
        <span className="mb-1 block font-medium">Name</span>
        <input name="name" required placeholder="Ada Lovelace" className={input} />
        {state?.errors?.name && <p className="mt-1 text-xs text-[#b91c1c]">{state.errors.name[0]}</p>}
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium">Email</span>
        <input name="email" type="email" required placeholder="you@example.com" className={input} />
        {state?.errors?.email && <p className="mt-1 text-xs text-[#b91c1c]">{state.errors.email[0]}</p>}
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium">Password</span>
        <input name="password" type="password" required minLength={8} className={input} />
        {state?.errors?.password && (
          <ul className="mt-1 space-y-0.5 text-xs text-[#b91c1c]">
            {state.errors.password.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        )}
      </label>
      {state?.message && (
        <p role="alert" className="rounded-xl bg-[#fef2f2] p-3 text-sm text-[#b91c1c]">
          {state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1d4ed8] disabled:opacity-60"
      >
        {pending ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}
