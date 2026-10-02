const FEATURES = [
  {
    title: "AI-powered generation",
    desc: "Extraction → structured profile → portfolio narrative. Evidence-first, never invented.",
  },
  {
    title: "Professional templates",
    desc: "Four curated families that share one schema — switch presentation without losing content.",
  },
  {
    title: "Multiple input formats",
    desc: "PDF, DOCX, TXT, JPG, PNG, WebP. Drag-and-drop plus mobile camera where supported.",
  },
  {
    title: "Project storytelling",
    desc: "Briefs, decks and screenshots become case-study cards with problem, role, process, outcome.",
  },
  {
    title: "Editable portfolios",
    desc: "Structured section editing — content, order, visibility — not a complex canvas.",
  },
  {
    title: "Publish + share",
    desc: "Shareable URL with SEO + social metadata and resume download. Lifetime option on Premium.",
  },
];

export function Features() {
  return (
    <section id="features" aria-labelledby="features-heading" className="mx-auto w-full max-w-6xl px-6 py-16">
      <p className="text-xs font-semibold tracking-[0.2em] text-[#2563EB]">
        FEATURES
      </p>
      <h2 id="features-heading" className="mt-2 max-w-2xl text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl">
        More than a CV. A complete professional presence.
      </h2>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <li
            key={f.title}
            className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition-shadow hover:shadow"
          >
            <h3 className="font-semibold text-[#0F172A]">{f.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#64748B]">{f.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
