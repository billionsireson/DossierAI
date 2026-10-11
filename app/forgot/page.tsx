import Link from "next/link";
import { Logo } from "@/components/logo";
import { ForgotForm } from "@/components/auth/forgot-form";

export const metadata = { title: "Forgot password" };

export default function ForgotPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020914] px-6 py-12">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="wave-background" />
      </div>
      <div className="glass-panel relative w-full max-w-md p-8">
        <Logo tone="dark" />
        <h1 className="mt-6 text-3xl font-semibold text-white">Reset your password</h1>
        <p className="mt-1 text-sm text-[#b6c8e2]">
          Enter your account email and we&apos;ll send a one-hour reset link.
        </p>
        <ForgotForm />
        <p className="mt-6 text-center text-sm text-[#b6c8e2]">
          Remembered it?{" "}
          <Link href="/login" className="font-semibold text-[#00c8ff] hover:underline focus-visible:outline-2 focus-visible:outline-[#00c8ff]">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
