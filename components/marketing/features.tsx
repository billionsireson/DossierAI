const FEATURES = [
  {
    title: "AI-Powered Creation",
    desc: "Turns your CV, resume or project files into a complete, professional portfolio.",
  },
  {
    title: "Premium Designs",
    desc: "Modern, clean and globally accepted templates that make you stand out.",
  },
  {
    title: "Fully Editable",
    desc: "Customize your content, layout, colors and sections to match your style.",
  },
  {
    title: "Multiple Input Options",
    desc: "Upload CV, resume, project documents or take a photo.",
  },
  {
    title: "Lifetime Publishing",
    desc: "Keep your portfolio live and accessible forever (with Pro/Premium).",
  },
  {
    title: "Built for Everyone",
    desc: "Students, professionals, creatives, freelancers, job seekers and teams.",
  },
];

export function Features() {
  return (
    <section id="features" aria-labelledby="features-heading" className="mx-auto w-full max-w-6xl px-6 py-16">
      <h2 id="features-heading" className="text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">
        Why DossierAI?
      </h2>
      <p className="mt-1 text-[#64748B]">
        More than a CV. It&apos;s your personal brand, on autopilot.
      </p>
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
