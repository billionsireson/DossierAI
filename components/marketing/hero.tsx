import Link from "next/link";
import { Logo } from "@/components/logo";

const FILE_BADGES = [
  { label: "PDF", bg: "bg-[#ef4444]" },
  { label: "DOCX", bg: "bg-[#2563EB]" },
  { label: "IMG", bg: "bg-[#7c3aed]" },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="px-3 pt-3 md:px-6 md:pt-6">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl bg-[#07142F] px-6 py-12 md:px-12 md:py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <Logo tone="dark" />
            <p className="mt-8 text-xs font-semibold tracking-[0.22em] text-[#cbd5e1]">
              YOUR STORY. PROFESSIONALLY PRESENTED.
            </p>
            <h1
              id="hero-heading"
              className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl"
            >
              Turn Your CV, Resume or Projects into a Stunning Portfolio —{" "}
              <span className="bg-gradient-to-r from-[#60a5fa] to-[#2563EB] bg-clip-text text-transparent">
                Instantly.
              </span>
            </h1>
            <p className="mt-5 max-w-md text-[#cbd5e1]">
              Upload your CV, resume or project document, let DossierAI build a
              complete, modern, professional portfolio for you — in minutes.
            </p>
            <div className="mt-8">
              <Link
                href="/app/dashboard"
                className="inline-block rounded-full bg-[#B7F000] px-7 py-3.5 font-semibold text-[#07142F] transition-colors hover:bg-[#a6e000] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B7F000]"
              >
                Create Your Portfolio →
              </Link>
            </div>
          </div>

          <div className="relative hidden md:block" aria-hidden>
            <div className="ml-auto w-fit rounded-2xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur">
              <p className="text-sm font-semibold text-white">Create Your Portfolio</p>
              <p className="mt-1 text-xs text-[#94a3b8]">
                Upload your CV, resume or project document to get started.
              </p>
              <div className="mt-4 rounded-xl border-2 border-dashed border-white/25 px-6 py-6 text-center">
                <p className="text-xs text-white">Drag & drop your file here</p>
                <p className="mt-1 text-[11px] text-[#94a3b8]">or click to upload</p>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {["Upload CV / Resume", "Upload Project", "Take a Photo"].map((t) => (
                  <div key={t} className="rounded-lg bg-white/10 px-2 py-2.5 text-[10px] leading-tight text-white">
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <ul className="absolute -left-2 top-2 space-y-2">
              {FILE_BADGES.map((f) => (
                <li
                  key={f.label}
                  className={`rounded-lg ${f.bg} px-2.5 py-1.5 text-xs font-bold text-white shadow-lg`}
                >
                  {f.label}
                </li>
              ))}
            </ul>
            <p className="absolute -bottom-2 left-0 max-w-[180px] text-xs italic leading-snug text-[#94a3b8]">
              From your files… to a global-ready portfolio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
