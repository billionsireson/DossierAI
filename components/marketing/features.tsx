import { Spot } from "@/components/motion/spot";
import { Icons } from "@/components/marketing/icons";

const FEATURES = [
  {
    icon: Icons.spark,
    chip: "bg-[#e8f1fd] text-[#2563EB]",
    title: "AI-Powered Creation",
    desc: "Turns your CV, resume or project files into a complete, professional portfolio.",
  },
  {
    icon: Icons.layout,
    chip: "bg-[#e8f7f0] text-[#0f766e]",
    title: "Premium Designs",
    desc: "Modern, clean and globally accepted templates that make you stand out.",
  },
  {
    icon: Icons.layers,
    chip: "bg-[#f1f5f9] text-[#475569]",
    title: "Fully Editable",
    desc: "Customize your content, layout, colors and sections to match your style.",
  },
  {
    icon: Icons.brief,
    chip: "bg-[#fef3e8] text-[#c2410c]",
    title: "Multiple Input Options",
    desc: "Upload CV, resume, project documents or take a photo.",
  },
  {
    icon: Icons.globe,
    chip: "bg-[#eef2ff] text-[#4f46e5]",
    title: "Lifetime Publishing",
    desc: "Keep your portfolio live and accessible forever (with Pro/Premium).",
  },
  {
    icon: Icons.users,
    chip: "bg-[#fdf2f8] text-[#be185d]",
    title: "Built for Everyone",
    desc: "Students, professionals, creatives, freelancers, job seekers and teams.",
  },
];

export function Features() {
  return (
    <section id="features" aria-labelledby="features-heading" className="bg-[#F4F6FB] py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <h2 id="features-heading" className="text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl">
          Why DossierAI?
        </h2>
        <p className="mt-2 text-[#64748B]">
          More than a CV. It&apos;s your personal brand, on autopilot.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <li key={f.title}>
              <Spot className="h-full rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_2px_16px_rgba(24,15,110,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#2E7CF6]/40 hover:shadow-[0_16px_44px_rgba(46,124,246,0.22)]">
                <span className={`inline-flex rounded-xl p-2.5 ${f.chip}`}>
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold text-[#0F172A]">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#64748B]">{f.desc}</p>
              </Spot>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
