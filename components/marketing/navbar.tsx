import Link from "next/link";
import { Logo } from "@/components/logo";

export function Navbar() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
      <Logo tone="dark" />
      <nav aria-label="Primary" className="hidden items-center gap-6 text-sm text-[#cbd5e1] md:flex">
        <Link href="#features" className="transition-colors hover:text-white">
          Features
        </Link>
        <Link href="#how" className="transition-colors hover:text-white">
          How it works
        </Link>
        <Link href="/examples" className="transition-colors hover:text-white">
          Examples
        </Link>
        <Link href="/pricing" className="transition-colors hover:text-white">
          Pricing
        </Link>
      </nav>
      <div className="flex items-center gap-2">
        <Link
          href="/app/dashboard"
          className="rounded-full px-4 py-2 text-sm font-medium text-[#cbd5e1] hover:text-white"
        >
          Sign in
        </Link>
        <Link
          href="/app/dashboard"
          className="rounded-full bg-[#2E7CF6] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_24px_rgba(46,124,246,0.45)]"
        >
          Build Your Portfolio
        </Link>
      </div>
    </header>
  );
}
