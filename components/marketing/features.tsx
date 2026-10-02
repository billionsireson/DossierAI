import { Spot } from "@/components/motion/spot";
import { Icons } from "@/components/marketing/icons";

const FEATURES = [
  {
    icon: Icons.spark,
    tint: "from-[#2563EB]/25 to-[#7c3aed]/25 text-[#93c5fd]",
    title: "AI-Powered Creation",
    desc: "Turns your CV, resume or project files into a complete, professional portfolio.",
  },
  {
    icon: Icons.layout,
    tint: "from-[#0ea5e9]/25 to-[#2563EB]/25 text-[#7dd3fc]",
    title: "Premium Designs",
    desc: "Modern, clean and globally accepted templates that make you stand out.",
  },
  {
    icon: Icons.layers,
    tint: "from-[#84cc16]/20 to-[#14b8a6]/20 text-[#B7F000]",
    title: "Fully Editable",
    desc: "Customize your content, layout, colors and sections to match your style.",
  },
  {
    icon: Icons.brief,
    tint: "from-[#f59e0b]/20 to-[#ef4444]/20 text-[#fcd34d]",
    title: "Multiple Input Options",
    desc: "Upload CV, resume, project documents or take a photo.",
  },
  {
    icon: Icons.globe,
    tint: "from-[#38bdf8]/20 to-[#6366f1]/25 text-[#93c5fd]",
    title: "Lifetime Publishing",
    desc: "Keep your portfolio live and accessible forever (with Pro/Premium).",
  },
  {
    icon: Icons.users,
    tint: "from-[#ec4899]/20 to-[#7c3aed]/25 text-[#f0a6d3]",
    title: "Built for Everyone",
    desc: "Students, professionals, creatives, freelancers, job seekers and teams.",
  },
];

export function Features() {
  return (
    <section id="features" aria-labelledby="features-heading" className="relative bg-[#040b1e] py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <h2 id="features-heading" className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          Why DossierAI?
        </h2>
        <p className="mt-2 text-[#93a4c4]">
          More than a CV. It&apos;s your personal brand, on autopilot.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <li key={f.title}>
              <Spot className="h-full rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-[#38bdf8]/40 hover:shadow-[0_16px_50px_rgba(37,99,235,0.35)]">
                <span className={`inline-flex rounded-xl bg-gradient-to-br p-2.5 ${f.tint}`}>
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold text-white">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#93a4c4]">{f.desc}</p>
              </Spot>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
