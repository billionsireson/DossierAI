import Link from "next/link";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto w-full max-w-6xl px-6 pt-10"
    >
      <div className="overflow-hidden rounded-3xl bg-[#07142F] px-6 py-16 text-center text-white md:px-16 md:py-20">
        <p className="text-xs font-semibold tracking-[0.22em] text-[#B7F000]">
          YOUR CV. YOUR STORY. A GLOBAL PORTFOLIO.
        </p>
        <h1
          id="hero-heading"
          className="mx-auto mt-4 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl"
        >
          Turn Your CV, Resume or Project into a Professional Portfolio —
          Instantly.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-[#cbd5e1] md:text-lg">
          Upload your professional material and let DossierAI transform it into
          a polished, responsive portfolio website. No code. No design skills.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/app/dashboard"
            className="rounded-xl bg-[#2563EB] px-7 py-3.5 font-semibold text-white transition-colors hover:bg-[#1d4ed8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B7F000]"
          >
            Build Your Portfolio
          </Link>
          <Link
            href="/examples"
            className="rounded-xl border border-white/25 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Explore Examples
          </Link>
        </div>
        <dl className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-4 text-center">
          {[
            ["Minutes", "upload → publish"],
            ["4", "curated templates"],
            ["100%", "responsive output"],
          ].map(([v, l]) => (
            <div key={l} className="rounded-xl bg-white/5 px-3 py-4">
              <dt className="order-2 mt-1 block text-xs text-[#94a3b8]">{l}</dt>
              <dd className="text-xl font-bold text-white">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
