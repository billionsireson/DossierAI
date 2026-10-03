import Link from "next/link";

/** Google OAuth entry point — activates once AUTH_PROVIDER_CLIENT_ID is set. */
export function GoogleButton() {
  const configured = Boolean(process.env.AUTH_PROVIDER_CLIENT_ID);
  if (!configured) {
    return (
      <p className="rounded-xl border border-dashed border-[#cbd5e1] p-3 text-center text-xs text-[#64748B]">
        Continue with Google activates after the OAuth client is configured. See docs/auth.md.
      </p>
    );
  }
  return (
    <Link
      href="/api/auth/google"
      className="block rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-center text-sm font-semibold hover:bg-[#F7FAFC]"
    >
      Continue with Google
    </Link>
  );
}
