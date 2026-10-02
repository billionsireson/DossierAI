import Link from "next/link";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="border-t border-[#E2E8F0] bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <Logo />
        <nav aria-label="Footer" className="flex flex-wrap gap-5 text-sm text-[#64748B]">
          <Link href="/examples" className="hover:text-[#0F172A]">Examples</Link>
          <Link href="/pricing" className="hover:text-[#0F172A]">Pricing</Link>
          <Link href="/app/dashboard" className="hover:text-[#0F172A]">Dashboard</Link>
          <Link href="/api/health" className="hover:text-[#0F172A]">Status</Link>
        </nav>
        <p className="text-sm text-[#94a3b8]">© {new Date().getFullYear()} DossierAI</p>
      </div>
    </footer>
  );
}
