"use client";

import { useActionState } from "react";
import { signup } from "@/lib/auth/actions";

export function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);
  return (
    <form action={action} className="mt-6 space-y-3 text-white">
      <label className="block text-sm">
        <span className="mb-1 block font-medium">Name</span>
        <input name="name" required placeholder="Ada Lovelace" className="ocean-input" />
        {state?.errors?.name && <p className="mt-1 text-xs text-red-300">{state.errors.name[0]}</p>}
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium">Email</span>
        <input name="email" type="email" required placeholder="you@example.com" className="ocean-input" />
        {state?.errors?.email && <p className="mt-1 text-xs text-red-300">{state.errors.email[0]}</p>}
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium">Password</span>
        <input name="password" type="password" required minLength={8} className="ocean-input" />
        {state?.errors?.password && (
          <ul className="mt-1 space-y-0.5 text-xs text-red-300">
            {state.errors.password.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        )}
      </label>
      {state?.message && (
        <p role="alert" className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
          {state.message}
        </p>
      )}
      <button type="submit" disabled={pending} className="ocean-btn w-full">
        {pending ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}
