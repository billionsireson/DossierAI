import Link from "next/link";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="border-t border-[rgba(73,147,255,0.14)] bg-[#010711]">
      <div className="mx-auto flex w-full max-w-6xl flex-col justify-between gap-8 px-6 py-8 md:flex-row md:items-center">
        <Logo tone="dark" />
        <nav aria-label="Footer" className="flex flex-wrap gap-6 text-sm text-[#7892b5]">
          <Link href="/examples" className="transition-colors hover:text-white">Examples</Link>
          <Link href="/pricing" className="transition-colors hover:text-white">Pricing</Link>
          <Link href="/app/dashboard" className="transition-colors hover:text-white">Dashboard</Link>
          <Link href="/login" className="transition-colors hover:text-white">Sign in</Link>
        </nav>
        <p className="text-xs text-[#7892b5]">© {new Date().getFullYear()} DossierAI</p>
      </div>
    </footer>
  );
}
