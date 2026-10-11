import Link from "next/link";
import { Logo } from "@/components/logo";
import { SignupForm } from "@/components/auth/signup-form";
import { GoogleButton } from "@/components/auth/google-button";

export const metadata = { title: "Sign up" };

export default function SignupPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020914] px-6 py-12">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="wave-background" />
        <div className="absolute right-1/4 top-10 h-72 w-72 rounded-full bg-[#4338ff]/25 blur-[120px]" />
      </div>
      <div className="glass-panel relative w-full max-w-md p-8">
        <Logo tone="dark" />
        <h1 className="mt-6 text-3xl font-semibold text-white">Create your account</h1>
        <p className="mt-1 text-sm text-[#b6c8e2]">From raw material to portfolio in minutes.</p>
        <div className="mt-6">
          <GoogleButton />
        </div>
        <div className="my-4 flex items-center gap-3 text-xs text-[#7892b5]">
          <span className="h-px flex-1 bg-[rgba(73,147,255,0.28)]" /> or with email <span className="h-px flex-1 bg-[rgba(73,147,255,0.28)]" />
        </div>
        <SignupForm />
        <p className="mt-6 text-center text-sm text-[#b6c8e2]">
          Have an account?{" "}
          <Link href="/login" className="font-semibold text-[#00c8ff] hover:underline focus-visible:outline-2 focus-visible:outline-[#00c8ff]">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
