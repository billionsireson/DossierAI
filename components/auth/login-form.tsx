"use client";

import { useActionState } from "react";
import { login } from "@/lib/auth/actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} className="mt-6 space-y-3 text-white">
      <label className="block text-sm">
        <span className="mb-1 block font-medium">Email</span>
        <input name="email" type="email" required placeholder="you@example.com" className="ocean-input" />
        {state?.errors?.email && <p className="mt-1 text-xs text-red-300">{state.errors.email[0]}</p>}
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium">Password</span>
        <input name="password" type="password" required className="ocean-input" />
        {state?.errors?.password && <p className="mt-1 text-xs text-red-300">{state.errors.password[0]}</p>}
      </label>
      {state?.message && (
        <p role="alert" className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
          {state.message}
        </p>
      )}
      <button type="submit" disabled={pending} className="ocean-btn w-full">
        {pending ? "Signing in…" : "Sign in"}
      </button>
      <p className="text-center text-sm">
        <a href="/forgot" className="text-[#00c8ff] hover:underline focus-visible:outline-2 focus-visible:outline-[#00c8ff]">
          Forgot password?
        </a>
      </p>
    </form>
  );
}
