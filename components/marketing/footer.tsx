import Link from "next/link";
import { LogoLockup } from "@/components/logo";
import { Icons } from "@/components/marketing/icons";

const TRUST = [
  { icon: Icons.spark, label: "AI-Powered" },
  { icon: Icons.check, label: "Secure" },
  { icon: Icons.globe, label: "Global Access" },
];

/** Footer panel per moodboard: brand lockup, tagline, blue CTA, trust row. */
export function Footer() {
  return (
    <footer className="bg-[#F4F6FB] px-6 pb-10 pt-4">
      <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-3xl bg-[#180F6E] px-8 py-12 text-white md:px-14">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#180F6E] via-[#2320a8] to-[#0d1442]" />
          <div className="bg-streaks absolute inset-0" />
          <div className="bg-gloss-top absolute inset-0" />
          <div className="animate-drift absolute -right-20 top-0 h-72 w-72 rounded-full bg-[#2E7CF6]/40 blur-[110px]" />
        </div>
        <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <LogoLockup className="w-52" />
            <p className="mt-4 text-xs font-semibold tracking-[0.22em] text-[#B7CCE3]">
              YOUR SKILLS. YOUR STORY. POWERED BY AI.
            </p>
            <p className="mt-3 text-lg font-medium text-white">
              Build. Personalize. Stand Out.
            </p>
          </div>
          <Link
            href="/app/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-[#2E7CF6] px-7 py-3.5 font-semibold text-white shadow-[0_0_36px_rgba(46,124,246,0.55)] transition-shadow hover:shadow-[0_0_54px_rgba(46,124,246,0.75)]"
          >
            Get Started Free <Icons.arrow className="h-4 w-4" />
          </Link>
        </div>
        <div className="relative mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6">
          <div className="flex flex-wrap gap-6 text-sm text-[#B7CCE3]">
            {TRUST.map((t) => (
              <span key={t.label} className="inline-flex items-center gap-2">
                <t.icon className="h-4 w-4" /> {t.label}
              </span>
            ))}
          </div>
          <nav aria-label="Footer" className="flex gap-5 text-sm text-[#8DA1B9]">
            <Link href="/examples" className="hover:text-white">Examples</Link>
            <Link href="/pricing" className="hover:text-white">Pricing</Link>
            <Link href="/app/dashboard" className="hover:text-white">Dashboard</Link>
          </nav>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-[#94a3b8]">
        © {new Date().getFullYear()} DossierAI
      </p>
    </footer>
  );
}
