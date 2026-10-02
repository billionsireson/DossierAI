import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-16">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#07142F] font-bold text-[#B7F000]"
          >
            D
          </div>
          <span className="text-lg font-semibold tracking-tight">DossierAI</span>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/examples" className="text-[#64748B] hover:text-[#0F172A]">
            Examples
          </Link>
          <Link href="/pricing" className="text-[#64748B] hover:text-[#0F172A]">
            Pricing
          </Link>
          <Link
            href="/app/dashboard"
            className="rounded-lg bg-[#2563EB] px-4 py-2 font-medium text-white hover:bg-[#1d4ed8]"
          >
            Build Your Portfolio
          </Link>
        </nav>
      </header>

      <section className="mt-20 rounded-2xl bg-[#07142F] px-8 py-16 text-center text-white md:px-16">
        <p className="text-xs font-semibold tracking-[0.2em] text-[#B7F000]">
          YOUR CV. YOUR STORY. A GLOBAL PORTFOLIO.
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
          Turn Your CV, Resume or Project into a Professional Portfolio —
          Instantly.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[#cbd5e1]">
          Upload your professional material and let DossierAI transform it into
          a polished, responsive portfolio website.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/app/dashboard"
            className="rounded-lg bg-[#2563EB] px-6 py-3 font-semibold text-white hover:bg-[#1d4ed8]"
          >
            Build Your Portfolio
          </Link>
          <Link
            href="/examples"
            className="rounded-lg border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10"
          >
            Explore Examples
          </Link>
        </div>
        <p className="mt-6 text-xs text-[#94a3b8]">
          Milestone 0 foundation is live. Full generation flow lands in the
          first vertical slice.
        </p>
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        {[
          { title: "Upload", desc: "PDF, DOCX, TXT, JPG, PNG, WebP." },
          { title: "AI Builds", desc: "Extraction → structured profile → portfolio JSON." },
          { title: "Publish", desc: "Shareable URL with SEO + resume download." },
        ].map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-[#E2E8F0] bg-white p-6"
          >
            <h2 className="font-semibold">{f.title}</h2>
            <p className="mt-1 text-sm text-[#64748B]">{f.desc}</p>
          </div>
        ))}
      </section>

      <footer className="mt-16 flex items-center justify-between border-t border-[#E2E8F0] pt-6 text-sm text-[#64748B]">
        <span>DossierAI — Milestone 0</span>
        <Link href="/api/health" className="hover:text-[#0F172A]">
          API health
        </Link>
      </footer>
    </main>
  );
}
