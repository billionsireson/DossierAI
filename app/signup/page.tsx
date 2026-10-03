import Link from "next/link";
import { Logo } from "@/components/logo";
import { SignupForm } from "@/components/auth/signup-form";
import { GoogleButton } from "@/components/auth/google-button";

export const metadata = { title: "Sign up" };

export default function SignupPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
      <Logo />
      <h1 className="mt-6 text-3xl font-bold">Create your account</h1>
      <p className="mt-1 text-sm text-[#64748B]">From raw material to portfolio in minutes.</p>
      <div className="mt-6">
        <GoogleButton />
      </div>
      <div className="my-4 flex items-center gap-3 text-xs text-[#94a3b8]">
        <span className="h-px flex-1 bg-[#E2E8F0]" /> or with email <span className="h-px flex-1 bg-[#94a3b8]" />
      </div>
      <SignupForm />
      <p className="mt-6 text-center text-sm text-[#64748B]">
        Have an account?{" "}
        <Link href="/login" className="font-semibold text-[#2563EB] hover:underline">
          Sign in
        </Link>
      </p>
    </main>
  );
}
