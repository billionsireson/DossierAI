import Link from "next/link";
import { Icons } from "@/components/marketing/icons";

export function CTA() {
  return (
    <section aria-labelledby="cta-heading" className="bg-[#F4F6FB] px-6 pb-20 pt-4">
      <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-3xl bg-[#180F6E] px-6 py-16 text-center text-white md:px-16">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#180F6E] via-[#2a1fa0] to-[#0d1442]" />
          <div className="bg-streaks absolute inset-0" />
          <div className="animate-glow-pulse absolute -top-20 left-1/3 h-56 w-[30rem] rounded-full bg-[#2E7CF6]/40 blur-[110px]" />
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
          className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-[#2E7CF6] px-8 py-3.5 font-semibold text-white shadow-[0_0_40px_rgba(46,124,246,0.55)] transition-shadow hover:shadow-[0_0_60px_rgba(46,124,246,0.75)]"
        >
          Build My Portfolio <Icons.arrow className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
