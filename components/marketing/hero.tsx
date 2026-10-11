import Link from "next/link";
import { Logo } from "@/components/logo";
import { Icons } from "@/components/marketing/icons";

function ProductPreview() {
  return (
    <div className="product-preview animate-float-soft">
      <div className="product-preview__inner">
        <div className="hidden flex-col gap-2 border-r border-[rgba(73,147,255,0.14)] bg-[rgba(5,23,47,0.85)] p-3 sm:flex">
          <span className="mb-1 flex items-center gap-1.5 px-1">
            <span className="h-4 w-4 rounded bg-gradient-to-br from-[#0865ff] to-[#4338ff]" aria-hidden />
            <span className="h-1.5 w-10 rounded bg-white/40" aria-hidden />
          </span>
          {["Home", "Create", "Work", "Templates"].map((t, i) => (
            <span
              key={t}
              className={`rounded-lg px-2 py-1.5 text-[10px] ${i === 1 ? "bg-[#0865ff]/25 text-white" : "text-[#7892b5]"}`}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="min-w-0 p-3 md:p-4">
          <div className="flex items-center gap-2 rounded-full border border-[rgba(73,147,255,0.28)] bg-[rgba(7,26,51,0.75)] px-3 py-1.5">
            <Icons.upload className="h-3.5 w-3.5 text-[#00c8ff]" />
            <span className="text-[11px] text-[#7892b5]">Create Your Portfolio — upload a CV to begin</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["PDF", "DOCX", "Photo", "Text"].map((t) => (
              <span key={t} className="rounded-full border border-[rgba(73,147,255,0.28)] px-2.5 py-1 text-[10px] text-[#b6c8e2]">
                {t}
              </span>
            ))}
          </div>
          <p className="mt-3 text-[11px] font-semibold text-white">Recent documents</p>
          <ul className="mt-1.5 space-y-1.5">
            {[
              ["Executive CV.pdf", "Ready to review"],
              ["Fintech deck.pptx", "Extracted"],
              ["Site photos (6)", "Queued"],
            ].map(([n, s]) => (
              <li key={n} className="flex items-center justify-between rounded-lg bg-[rgba(7,26,51,0.75)] px-2.5 py-1.5">
                <span className="flex items-center gap-2 text-[11px] text-white">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-[#0865ff]/25 text-[#00c8ff]" aria-hidden>
                    <Icons.brief className="h-3 w-3" />
                  </span>
                  {n}
                </span>
                <span className="text-[10px] text-[#64ddff]">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-[#020914]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="wave-background" />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 70% 25%, rgba(0,76,190,0.2) 0%, transparent 50%)" }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-6 md:pb-24">
        <div className="flex items-center justify-between">
          <Logo tone="dark" />
          <nav aria-label="Primary" className="hidden items-center gap-7 text-sm text-[#b6c8e2] md:flex">
            <Link href="#features" className="transition-colors hover:text-white">Features</Link>
            <Link href="#how" className="transition-colors hover:text-white">How it works</Link>
            <Link href="/examples" className="transition-colors hover:text-white">Examples</Link>
            <Link href="/pricing" className="transition-colors hover:text-white">Pricing</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/app/dashboard" className="hidden text-sm text-[#b6c8e2] hover:text-white sm:block">
              Sign in
            </Link>
            <Link
              href="/app/dashboard"
              className="rounded-full bg-gradient-to-r from-[#0875ff] via-[#0755f5] to-[#4338ff] px-5 py-2 text-sm font-semibold text-white shadow-[0_6px_24px_rgba(0,93,255,0.24)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_48px_rgba(0,112,255,0.32)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00c8ff]"
            >
              Start Your Journey Here
            </Link>
          </div>
        </div>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="max-w-[600px]">
            <p className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,174,255,0.65)] bg-[rgba(0,95,255,0.08)] px-3.5 py-[7px] text-xs font-semibold tracking-[0.14em] text-[#00c8ff]">
              YOUR SKILLS. YOUR STORY. POWERED BY AI.
            </p>
            <h1
              id="hero-heading"
              className="mt-6 text-[clamp(2.8rem,5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.055em] text-[#f4f8ff]"
              style={{ textWrap: "balance" }}
            >
              Turn Your CV into a Stunning Portfolio —{" "}
              <span className="text-gradient">Instantly.</span>
            </h1>
            <p className="mt-6 max-w-[48ch] text-lg leading-[1.7] text-[#b6c8e2]">
              Upload your CV, resume or project document, let DossierAI build a
              complete, modern, professional portfolio for you — in minutes.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/app/dashboard"
                className="group inline-flex min-h-[46px] items-center gap-3 rounded-full bg-gradient-to-r from-[#0875ff] via-[#0755f5] to-[#4338ff] px-[22px] py-3 text-sm font-semibold text-white shadow-[0_6px_24px_rgba(0,93,255,0.24)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_48px_rgba(0,112,255,0.32)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00c8ff]"
              >
                Start Your Journey Here
                <Icons.arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/examples"
                className="inline-flex min-h-[46px] items-center rounded-full border border-[rgba(73,147,255,0.28)] bg-[rgba(7,26,51,0.75)] px-[22px] py-3 text-sm font-semibold text-[#f4f8ff] transition-all hover:-translate-y-0.5 hover:border-[rgba(0,174,255,0.65)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00c8ff]"
              >
                Explore Examples
              </Link>
            </div>
          </div>

          <div className="relative hidden select-none lg:block" aria-hidden>
            <ProductPreview />
            <div className="animate-float absolute -right-2 -top-6 max-w-[10rem] rounded-xl border border-[rgba(73,147,255,0.28)] bg-[rgba(7,26,51,0.85)] px-3 py-2 text-[10px] leading-snug text-[#b6c8e2] backdrop-blur">
              Professional. Modern. Global Standard.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
