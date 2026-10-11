import { Spot } from "@/components/motion/spot";
import { Icons } from "@/components/marketing/icons";

const FEATURES = [
  {
    icon: Icons.spark,
    title: "AI-Powered Creation",
    desc: "Turns your CV, resume or project files into a complete, professional portfolio.",
  },
  {
    icon: Icons.layout,
    title: "Premium Designs",
    desc: "Modern, clean and globally accepted templates that make you stand out.",
  },
  {
    icon: Icons.layers,
    title: "Fully Editable",
    desc: "Customize your content, layout, colors and sections to match your style.",
  },
  {
    icon: Icons.brief,
    title: "Multiple Input Options",
    desc: "Upload CV, resume, project documents or take a photo.",
  },
  {
    icon: Icons.globe,
    title: "Lifetime Publishing",
    desc: "Keep your portfolio live and accessible forever (with Pro/Premium).",
  },
  {
    icon: Icons.users,
    title: "Built for Everyone",
    desc: "Students, professionals, creatives, freelancers, job seekers and teams.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative border-y border-[rgba(73,147,255,0.14)] bg-[#041126]"
      style={{ backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(0,96,255,0.08), transparent 70%)" }}
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
        <h2 id="features-heading" className="text-3xl font-semibold tracking-tight text-[#f4f8ff] md:text-[2.5rem] md:leading-[1.15]">
          Why DossierAI?
        </h2>
        <p className="mt-2 text-[#b6c8e2]">
          More than a CV. It&apos;s your personal brand, on autopilot.
        </p>
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <li key={f.title}>
              <Spot className="h-full rounded-[18px] border border-transparent p-4 transition-all duration-200 hover:-translate-y-1 hover:border-[rgba(73,147,255,0.28)] hover:bg-[rgba(5,24,49,0.78)]">
                <span className="grid h-12 w-12 place-items-center rounded-xl border border-[rgba(0,174,255,0.65)] bg-[rgba(0,104,255,0.1)] text-[#00c8ff] shadow-[inset_0_0_18px_rgba(0,111,255,0.08)]">
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-semibold text-[#f4f8ff]">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-[1.65] text-[#b6c8e2]">{f.desc}</p>
              </Spot>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
