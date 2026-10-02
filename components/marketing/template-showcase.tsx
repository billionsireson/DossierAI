import Link from "next/link";

const TEMPLATES = [
  {
    id: "modern-professional",
    name: "Modern Professional",
    desc: "Clean SaaS-grade layout for job seekers and consultants.",
    swatch: "bg-gradient-to-br from-[#07142F] to-[#2563EB]",
  },
  {
    id: "creative-minimal",
    name: "Creative Minimal",
    desc: "Gallery-first storytelling for designers and photographers.",
    swatch: "bg-gradient-to-br from-[#0F172A] to-[#7c3aed]",
  },
  {
    id: "corporate-executive",
    name: "Corporate Executive",
    desc: "Restrained, authority-led hierarchy for senior leaders.",
    swatch: "bg-gradient-to-br from-[#1e293b] to-[#475569]",
  },
  {
    id: "tech-developer",
    name: "Tech / Developer",
    desc: "Project- and code-aware cards for engineers and builders.",
    swatch: "bg-gradient-to-br from-[#07142F] to-[#0ea5e9]",
  },
];

export function TemplateShowcase({ compact = false }: { compact?: boolean }) {
  return (
    <section aria-labelledby="templates-heading" className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-[#2563EB]">
            TEMPLATES
          </p>
          <h2 id="templates-heading" className="mt-2 text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl">
            Four families. One portfolio schema.
          </h2>
        </div>
        {!compact && (
          <Link href="/examples" className="text-sm font-medium text-[#2563EB] hover:underline">
            See all examples →
          </Link>
        )}
      </div>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TEMPLATES.map((t) => (
          <li key={t.id} className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
            <div className={`h-36 ${t.swatch}`} role="img" aria-label={`${t.name} preview`} />
            <div className="p-5">
              <h3 className="font-semibold text-[#0F172A]">{t.name}</h3>
              <p className="mt-1 text-sm text-[#64748B]">{t.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
