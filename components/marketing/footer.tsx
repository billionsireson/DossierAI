import Link from "next/link";
import { LogoLockup } from "@/components/logo";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-6 pb-8">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-[#07142F] p-8 text-white">
          <LogoLockup />
          <p className="mt-4 text-sm text-[#cbd5e1]">
            Your data. Our AI. Your next opportunity.
          </p>
          <p className="mt-6 text-sm text-[#94a3b8]">
            Build <span aria-hidden className="mx-1">✦</span> Personalize{" "}
            <span aria-hidden className="mx-1">✦</span> Stand Out
          </p>
          <nav aria-label="Footer" className="mt-6 flex gap-5 text-sm text-[#94a3b8]">
            <Link href="/examples" className="hover:text-white">Examples</Link>
            <Link href="/pricing" className="hover:text-white">Pricing</Link>
            <Link href="/app/dashboard" className="hover:text-white">Dashboard</Link>
          </nav>
        </div>

        <figure className="flex flex-col justify-center rounded-2xl bg-[#e8f1fd] p-8">
          <blockquote className="text-lg font-medium leading-relaxed text-[#0F172A]">
            “A great portfolio doesn&apos;t just show what you&apos;ve done, it
            opens doors to what&apos;s next.”
          </blockquote>
          <figcaption className="mt-4 text-sm text-[#64748B]">— DossierAI</figcaption>
        </figure>

        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8">
          <h2 className="font-bold text-[#0F172A]">Ready to Build Your Portfolio?</h2>
          <p className="mt-2 text-sm text-[#64748B]">
            Upload your CV, resume or project now and see how DossierAI can
            transform your career story.
          </p>
          <Link
            href="/app/dashboard"
            className="mt-6 inline-block rounded-full bg-[#B7F000] px-6 py-3 text-sm font-semibold text-[#07142F] hover:bg-[#a6e000]"
          >
            Get Started Free →
          </Link>
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-[#94a3b8]">
        © {new Date().getFullYear()} DossierAI
      </p>
    </footer>
  );
}
