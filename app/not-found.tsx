import Link from "next/link";
import { Logo } from "@/components/logo";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 text-center">
      <Logo />
      <h1 className="mt-6 text-4xl font-bold text-[#0F172A]">404</h1>
      <p className="mt-2 text-[#64748B]">
        This page isn&apos;t published yet. Try a public portfolio URL or head back.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-xl bg-[#07142F] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0f2452]"
      >
        Back home
      </Link>
    </main>
  );
}
