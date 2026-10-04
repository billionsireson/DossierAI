import Link from "next/link";
import { Logo } from "@/components/logo";
import { Icons } from "@/components/marketing/icons";

const FILE_BADGES = [
  { label: "PDF", bg: "bg-[#ef4444] shadow-[0_0_24px_rgba(239,68,68,0.55)]" },
  { label: "DOCX", bg: "bg-[#2563EB] shadow-[0_0_24px_rgba(37,99,235,0.6)]" },
  { label: "IMG", bg: "bg-[#7c3aed] shadow-[0_0_24px_rgba(124,58,237,0.6)]" },
];

function PortfolioMock() {
  return (
    <div className="w-72 overflow-hidden rounded-2xl border border-white/15 bg-[#0a1730] shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        {["Home", "About", "Projects"].map((t) => (
          <span key={t} className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] text-white/70">
            {t}
          </span>
        ))}
      </div>
      <div className="bg-gradient-to-br from-[#0d2247] to-[#07142F] px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#60a5fa] to-[#7c3aed] text-xs font-bold text-white">
            EO
          </div>
          <div>
            <p className="text-sm font-bold text-white">Hello, I&apos;m Esther Okafor</p>
            <p className="text-[10px] text-[#93c5fd]">Product Designer · Creative Problem Solver</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="rounded-full bg-[#B7F000] px-2.5 py-1 text-[9px] font-bold text-[#07142F]">
            Download Resume
          </span>
          {["in", "𝕏", "◉"].map((s) => (
            <span key={s} className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 text-[8px] text-white">
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="bg-[#F7FAFC] px-4 py-3">
        <p className="text-[10px] font-bold text-[#0F172A]">Featured Projects</p>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {[
            ["from-[#1e3a8a] to-[#0ea5e9]", "Fintech"],
            ["from-[#7c3aed] to-[#ec4899]", "E-commerce"],
            ["from-[#0f766e] to-[#84cc16]", "Brand"],
          ].map(([g, t]) => (
            <div key={t}>
              <div className={`h-12 rounded-md bg-gradient-to-br ${g}`} />
              <p className="mt-1 text-[8px] font-semibold text-[#0F172A]">{t}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PhoneMock() {
  return (
    <div className="w-32 overflow-hidden rounded-[1.6rem] border border-white/20 bg-[#0a1730] shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
      <div className="mx-auto mt-1.5 h-1 w-10 rounded-full bg-white/20" />
      <div className="px-3 py-3">
        <div className="flex h-14 items-end justify-center rounded-lg bg-gradient-to-br from-[#1e3a8a] to-[#7c3aed] pb-1.5">
          <p className="text-[8px] font-bold text-white">Esther Okafor</p>
        </div>
        <div className="mt-2 space-y-1">
          <div className="h-1 rounded bg-white/25" />
          <div className="h-1 w-2/3 rounded bg-white/25" />
        </div>
        <div className="mt-2 grid grid-cols-2 gap-1">
          <div className="h-8 rounded bg-gradient-to-br from-[#0ea5e9] to-[#1e3a8a]" />
          <div className="h-8 rounded bg-gradient-to-br from-[#ec4899] to-[#7c3aed]" />
        </div>
        <span className="mt-2 block rounded-full bg-[#B7F000] py-1 text-center text-[8px] font-bold text-[#07142F]">
          Download
        </span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-[#180F6E]">
      {/* Ambient light + gloss streaks */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#180F6E] via-[#1e1b8f] to-[#0d1442]" />
        <div className="bg-streaks absolute inset-0" />
        <div className="bg-gloss-top absolute inset-0" />
        <div className="bg-blueprint absolute inset-0 opacity-70" />
        <div className="animate-drift absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-[#2E7CF6]/40 blur-[130px]" />
        <div className="animate-drift absolute right-[-80px] top-1/3 h-80 w-80 rounded-full bg-[#7c3aed]/30 blur-[130px]" style={{ animationDelay: "-7s" }} />
        <div className="animate-glow-pulse absolute bottom-[-120px] left-[10%] h-72 w-[36rem] rounded-full bg-[#93c5fd]/20 blur-[130px]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-6 md:pb-24">
        <div className="flex items-center justify-between">
          <Logo tone="dark" />
          <nav aria-label="Primary" className="hidden items-center gap-7 text-sm text-[#cbd5e1] md:flex">
            <Link href="#features" className="transition-colors hover:text-white">Features</Link>
            <Link href="#how" className="transition-colors hover:text-white">How it works</Link>
            <Link href="/examples" className="transition-colors hover:text-white">Examples</Link>
            <Link href="/pricing" className="transition-colors hover:text-white">Pricing</Link>
          </nav>
          <Link
            href="/app/dashboard"
            className="rounded-full bg-[#2E7CF6] px-5 py-2 text-sm font-semibold text-white shadow-[0_0_28px_rgba(46,124,246,0.5)] transition-all hover:shadow-[0_0_40px_rgba(46,124,246,0.7)]"
          >
            Build Your Portfolio
          </Link>
        </div>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-[#B7CCE3]">
              YOUR SKILLS. YOUR STORY. POWERED BY AI.
            </p>
            <h1
              id="hero-heading"
              className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl"
            >
              Turn Your CV, Resume or Projects into a Stunning Portfolio —{" "}
              <span className="bg-gradient-to-r from-[#7dd3fc] via-[#38bdf8] to-[#2E7CF6] bg-clip-text text-transparent">
                Instantly.
              </span>
            </h1>
            <p className="mt-6 max-w-md leading-relaxed text-[#cbd5e1]">
              Upload your CV, resume or project document, let DossierAI build a
              complete, modern, professional portfolio for you — in minutes.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/app/dashboard"
                className="group inline-flex items-center gap-2 rounded-full bg-[#2E7CF6] px-7 py-3.5 font-semibold text-white shadow-[0_0_36px_rgba(46,124,246,0.55)] transition-all hover:shadow-[0_0_54px_rgba(46,124,246,0.75)]"
              >
                Create Your Portfolio
                <Icons.arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/examples" className="text-sm font-medium text-[#cbd5e1] hover:text-white">
                Explore Examples →
              </Link>
            </div>
          </div>

          {/* Floating composition */}
          <div className="relative hidden min-h-[480px] select-none lg:block" aria-hidden>
            <ul className="absolute left-0 top-6 z-10 space-y-2.5">
              {FILE_BADGES.map((f, i) => (
                <li
                  key={f.label}
                  className={`animate-float rounded-xl ${f.bg} px-3.5 py-2 text-sm font-bold text-white`}
                  style={{ animationDelay: `${i * -2.3}s` }}
                >
                  {f.label}
                </li>
              ))}
            </ul>

            <svg viewBox="0 0 120 200" className="absolute left-16 top-32 w-24 text-[#38bdf8]/70" fill="none">
              <path d="M8 8 C 70 40, 90 90, 104 188" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
              <path d="M96 172l8 18 10-16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p className="absolute left-0 top-[19rem] w-40 text-xs italic leading-snug text-[#7d8aa5]">
              From your files… to a global-ready portfolio.
            </p>

            <div className="animate-float-soft absolute right-24 top-0 w-64 rounded-2xl border border-white/15 bg-white/[0.07] p-5 shadow-[0_0_60px_rgba(37,99,235,0.35)] backdrop-blur-xl">
              <p className="text-sm font-semibold text-white">Create Your Portfolio</p>
              <p className="mt-1 text-[11px] leading-snug text-[#93a4c4]">
                Upload your CV, resume or project document to get started.
              </p>
              <div className="mt-4 rounded-xl border-2 border-dashed border-[#38bdf8]/40 bg-[#2563EB]/10 px-4 py-6 text-center">
                <Icons.upload className="mx-auto h-6 w-6 text-[#38bdf8]" />
                <p className="mt-2 text-[11px] text-white">Drag & drop your file here</p>
                <p className="text-[10px] text-[#7d8aa5]">or click to upload</p>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-1.5 text-center">
                {["Upload CV / Resume", "Upload Project", "Take a Photo"].map((t) => (
                  <div key={t} className="rounded-lg bg-white/10 px-1 py-2 text-[9px] leading-tight text-white">
                    {t}
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-float absolute bottom-0 right-0" style={{ animationDelay: "-3.5s" }}>
              <PortfolioMock />
            </div>
            <div className="animate-float absolute bottom-6 right-[19rem]" style={{ animationDelay: "-5s" }}>
              <PhoneMock />
            </div>

            <div className="animate-float-soft absolute right-2 top-2 max-w-[10rem] rounded-xl border border-violet-300/30 bg-violet-400/15 px-3 py-2 text-[10px] leading-snug text-violet-100 backdrop-blur" style={{ animationDelay: "-1.5s" }}>
              Professional. Modern. Global Standard.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
