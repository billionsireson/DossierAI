const STEPS = [
  { n: "1", title: "Upload", desc: "Add your CV, resume, project document or take a photo." },
  { n: "2", title: "AI Builds", desc: "Our AI analyzes your content and creates a stunning portfolio." },
  { n: "3", title: "Customize", desc: "Edit, tweak and make it yours with our easy editor (Pro/Premium)." },
  { n: "4", title: "Publish", desc: "Go live with a unique URL and share your portfolio worldwide." },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      aria-labelledby="how-heading"
      className="mx-auto w-full max-w-6xl px-6 pb-4"
    >
      <h2 id="how-heading" className="text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">
        How It Works
      </h2>
      <p className="mt-1 text-[#64748B]">Get your professional portfolio in 4 simple steps.</p>
      <ol className="mt-8 grid gap-4 md:grid-cols-4">
        {STEPS.map((s) => (
          <li key={s.n} className="rounded-2xl bg-[#F7FAFC] p-6">
            <span
              aria-hidden
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#07142F] text-sm font-bold text-[#B7F000]"
            >
              {s.n}
            </span>
            <h3 className="mt-4 font-semibold text-[#0F172A]">{s.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#64748B]">{s.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
