import Link from "next/link";
import { Logo } from "@/components/logo";
import { LoginForm } from "@/components/auth/login-form";
import { GoogleButton } from "@/components/auth/google-button";

export const metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
      <Logo />
      <h1 className="mt-6 text-3xl font-bold">Welcome back</h1>
      <p className="mt-1 text-sm text-[#64748B]">Sign in to your DossierAI account.</p>
      <div className="mt-6">
        <GoogleButton />
      </div>
      <div className="my-4 flex items-center gap-3 text-xs text-[#94a3b8]">
        <span className="h-px flex-1 bg-[#E2E8F0]" /> or with email <span className="h-px flex-1 bg-[#E2E8F0]" />
      </div>
      <LoginForm />
      <p className="mt-6 text-center text-sm text-[#64748B]">
        New here?{" "}
        <Link href="/signup" className="font-semibold text-[#2563EB] hover:underline">
          Create an account
        </Link>
      </p>
    </main>
  );
}
