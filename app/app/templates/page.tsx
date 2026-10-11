import Link from "next/link";

export const metadata = { title: "Templates" };

const TEMPLATES = [
  { id: "modern-professional", name: "Modern Professional", desc: "Clean SaaS-grade layout for job seekers and consultants." },
  { id: "creative-minimal", name: "Creative Minimal", desc: "Gallery-first storytelling for designers and photographers." },
  { id: "corporate-executive", name: "Corporate Executive", desc: "Restrained, authority-led hierarchy for senior leaders." },
  { id: "tech-developer", name: "Tech / Developer", desc: "Project- and code-aware cards for engineers and builders." },
  { id: "digital-creator", name: "Digital Creator", desc: "Vibrant, media-first layout for content creators." },
  { id: "spotlight", name: "Spotlight", desc: "Editorial story layout — nav, stats, expertise, case studies, timeline." },
];

export default function TemplatesPage() {
  return (
    <main id="main" className="py-2">
      <h1 className="text-2xl font-semibold text-white">Templates</h1>
      <p className="mt-1 text-sm text-[#b6c8e2]">
        One portfolio schema, six presentations. Switching never loses content.
      </p>
      <ul className="mt-5 grid gap-4 md:grid-cols-2">
        {TEMPLATES.map((t) => (
          <li
            key={t.id}
            className="glass-panel p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(0,174,255,0.65)]"
          >
            <h2 className="font-semibold text-white">{t.name}</h2>
            <p className="mt-1 text-sm text-[#b6c8e2]">{t.desc}</p>
            <Link
              href={`/app/portfolio/demo-fintech/preview?template=${t.id}`}
              className="mt-4 inline-block rounded-full bg-gradient-to-r from-[#0875ff] to-[#4338ff] px-3.5 py-1.5 text-sm font-semibold text-white"
            >
              Preview with sample data →
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
