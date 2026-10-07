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
    <main className="py-2">
      <h1 className="text-2xl font-bold">Templates</h1>
      <p className="mt-1 text-sm text-[#64748B]">
        One portfolio schema, four presentations. Switching never loses content.
      </p>
      <ul className="mt-5 grid gap-4 md:grid-cols-2">
        {TEMPLATES.map((t) => (
          <li
            key={t.id}
            className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(37,99,235,0.2)]"
          >
            <h2 className="font-semibold">{t.name}</h2>
            <p className="mt-1 text-sm text-[#64748B]">{t.desc}</p>
            <Link
              href={`/app/portfolio/demo-fintech/preview?template=${t.id}`}
              className="mt-4 inline-block rounded-lg bg-[#07142F] px-3.5 py-1.5 text-sm font-medium text-white hover:bg-[#0f2452]"
            >
              Preview with sample data →
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
