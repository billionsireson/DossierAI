import Link from "next/link";
import { Logo } from "@/components/logo";

export function Navbar() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
      <Logo />
      <nav aria-label="Primary" className="hidden items-center gap-6 text-sm md:flex">
        <Link href="#features" className="text-[#475569] hover:text-[#0F172A]">
          Features
        </Link>
        <Link href="#how" className="text-[#475569] hover:text-[#0F172A]">
          How it works
        </Link>
        <Link href="/examples" className="text-[#475569] hover:text-[#0F172A]">
          Examples
        </Link>
        <Link href="/pricing" className="text-[#475569] hover:text-[#0F172A]">
          Pricing
        </Link>
      </nav>
      <div className="flex items-center gap-2">
        <Link
          href="/app/dashboard"
          className="rounded-lg px-4 py-2 text-sm font-medium text-[#475569] hover:text-[#0F172A]"
        >
          Sign in
        </Link>
        <Link
          href="/app/dashboard"
          className="rounded-lg bg-[#B7F000] px-4 py-2 text-sm font-semibold text-[#07142F] hover:bg-[#a6e000]"
        >
          Build Your Portfolio
        </Link>
      </div>
    </header>
  );
}
