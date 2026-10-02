const STEPS = [
  { n: "1", title: "Upload", desc: "Drop your CV, project doc, or screenshots. We validate type, size and readability." },
  { n: "2", title: "AI Builds", desc: "We extract experience, projects, skills and structure your professional story." },
  { n: "3", title: "Edit & Personalize", desc: "Review extracted facts, pick a template, refine copy and sections." },
  { n: "4", title: "Publish", desc: "One click to a fast, SEO-friendly public URL you can share anywhere." },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      aria-labelledby="how-heading"
      className="border-y border-[#E2E8F0] bg-white"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <p className="text-xs font-semibold tracking-[0.2em] text-[#2563EB]">
          HOW IT WORKS
        </p>
        <h2 id="how-heading" className="mt-2 text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl">
          Upload. AI builds. You publish.
        </h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-4">
          {STEPS.map((s) => (
            <li key={s.n} className="rounded-2xl bg-[#F7FAFC] p-6">
              <span
                aria-hidden
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#07142F] font-bold text-[#B7F000]"
              >
                {s.n}
              </span>
              <h3 className="mt-4 font-semibold text-[#0F172A]">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#64748B]">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
