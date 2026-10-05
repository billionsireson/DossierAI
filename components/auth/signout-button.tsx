"use client";

import { logout } from "@/lib/auth/actions";

export function SignOutButton() {
  return (
    <button
      onClick={() => void logout()}
      className="w-full rounded-lg px-3 py-2 text-left text-sm text-[#cbd5e1] hover:bg-white/10 hover:text-white"
    >
      Sign out
    </button>
  );
}
