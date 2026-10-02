import Link from "next/link";
import { LogoLockup } from "@/components/logo";
import { Icons } from "@/components/marketing/icons";

export function Footer() {
  return (
    <footer className="bg-[#040b1e] px-6 pb-10 pt-4">
      <div className="mx-auto grid w-full max-w-6xl gap-4 md:grid-cols-3">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#07142F] p-8 text-white">
          <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#2563EB]/30 blur-[80px]" />
          <LogoLockup className="relative w-40" />
          <p className="relative mt-4 text-sm text-[#cbd5e1]">
            Your data. Our AI. Your next opportunity.
          </p>
          <p className="relative mt-6 flex items-center gap-2 text-sm text-[#94a3b8]">
            <Icons.bolt className="h-4 w-4 text-[#B7F000]" /> Build
            <span aria-hidden className="text-[#38bdf8]">✦</span> Personalize
            <span aria-hidden className="text-[#38bdf8]">✦</span> Stand Out
          </p>
          <nav aria-label="Footer" className="relative mt-6 flex gap-5 text-sm text-[#94a3b8]">
            <Link href="/examples" className="hover:text-white">Examples</Link>
            <Link href="/pricing" className="hover:text-white">Pricing</Link>
            <Link href="/app/dashboard" className="hover:text-white">Dashboard</Link>
          </nav>
        </div>

        <figure className="flex flex-col justify-center rounded-2xl border border-[#38bdf8]/20 bg-gradient-to-br from-[#0d2247] to-[#0a1730] p-8 shadow-[0_0_50px_rgba(37,99,235,0.2)]">
          <blockquote className="text-lg font-medium leading-relaxed text-white">
            “A great portfolio doesn&apos;t just show what you&apos;ve done, it
            opens doors to what&apos;s next.”
          </blockquote>
          <figcaption className="mt-4 text-sm text-[#7d8aa5]">— DossierAI</figcaption>
        </figure>

        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur">
          <h2 className="font-bold text-white">Ready to Build Your Portfolio?</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#93a4c4]">
            Upload your CV, resume or project now and see how DossierAI can
            transform your career story.
          </p>
          <Link
            href="/app/dashboard"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#B7F000] px-6 py-3 text-sm font-semibold text-[#07142F] shadow-[0_0_30px_rgba(183,240,0,0.35)] transition-shadow hover:shadow-[0_0_46px_rgba(183,240,0,0.55)]"
          >
            Get Started Free <Icons.arrow className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-[#5b6b8c]">
        © {new Date().getFullYear()} DossierAI
      </p>
    </footer>
  );
}
