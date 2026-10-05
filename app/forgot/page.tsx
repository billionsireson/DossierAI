import Link from "next/link";
import { Logo } from "@/components/logo";
import { ForgotForm } from "@/components/auth/forgot-form";

export const metadata = { title: "Forgot password" };

export default function ForgotPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
      <Logo />
      <h1 className="mt-6 text-3xl font-bold">Reset your password</h1>
      <p className="mt-1 text-sm text-[#64748B]">
        Enter your account email and we&apos;ll send a one-hour reset link.
      </p>
      <ForgotForm />
      <p className="mt-6 text-center text-sm text-[#64748B]">
        Remembered it?{" "}
        <Link href="/login" className="font-semibold text-[#2563EB] hover:underline">
          Sign in
        </Link>
      </p>
    </main>
  );
}
