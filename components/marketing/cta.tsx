import Link from "next/link";
import { Icons } from "@/components/marketing/icons";

export function CTA() {
  return (
    <section aria-labelledby="cta-heading" className="bg-[#040b1e] px-6 pb-20 pt-4">
      <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0d2247] via-[#1e1b4b] to-[#3b0764] px-6 py-16 text-center text-white md:px-16">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="animate-glow-pulse absolute -top-20 left-1/3 h-56 w-[30rem] rounded-full bg-[#38bdf8]/25 blur-[110px]" />
          <div className="bg-blueprint absolute inset-0 opacity-60" />
        </div>
        <h2 id="cta-heading" className="relative mx-auto max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
          Your work deserves a world-class stage.
        </h2>
        <p className="relative mx-auto mt-3 max-w-xl text-[#cbd5e1]">
          Professional work deserves professional presentation. Start from the
          CV you already have.
        </p>
        <Link
          href="/app/dashboard"
          className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-[#B7F000] px-8 py-3.5 font-semibold text-[#07142F] shadow-[0_0_40px_rgba(183,240,0,0.45)] transition-shadow hover:shadow-[0_0_60px_rgba(183,240,0,0.65)]"
        >
          Build My Portfolio <Icons.arrow className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
