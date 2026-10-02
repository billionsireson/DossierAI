import type { Portfolio } from "@/types/portfolio";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#64748B]">
      {children}
    </h2>
  );
}

/** First template family: Modern Professional (PRD §20, §63). */
export function ModernProfessional({ portfolio }: { portfolio: Portfolio }) {
  const byType = (t: string) => portfolio.sections.find((s) => s.type === t && s.visible);
  const hero = byType("hero")?.content as { headline?: string; subheadline?: string } | undefined;
  const about = byType("about")?.content as { body?: string } | undefined;
  const skills = byType("skills")?.content as { skills?: string[] } | undefined;
  const contact = byType("contact")?.content as { email?: string; location?: string } | undefined;

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white">
      <div className="bg-[#07142F] px-8 py-12 text-white">
        <p className="text-xs font-semibold tracking-[0.2em] text-[#B7F000]">PORTFOLIO</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">{portfolio.profile.name}</h1>
        {hero?.headline && <p className="mt-2 text-lg text-[#cbd5e1]">{hero.headline}</p>}
        {hero?.subheadline && <p className="mt-3 max-w-xl text-sm text-[#94a3b8]">{hero.subheadline}</p>}
      </div>
      <div className="space-y-8 px-8 py-8">
        {about?.body && (
          <section>
            <SectionTitle>About</SectionTitle>
            <p className="mt-2 text-[#334155]">{about.body}</p>
          </section>
        )}
        {skills?.skills && skills.skills.length > 0 && (
          <section>
            <SectionTitle>Skills</SectionTitle>
            <ul className="mt-3 flex flex-wrap gap-2">
              {skills.skills.map((s) => (
                <li key={s} className="rounded-full bg-[#F7FAFC] px-3 py-1 text-sm text-[#0F172A]">
                  {s}
                </li>
              ))}
            </ul>
          </section>
        )}
        {(contact?.email || contact?.location || portfolio.socialLinks.length > 0) && (
          <section>
            <SectionTitle>Contact</SectionTitle>
            <div className="mt-2 space-y-1 text-sm">
              {contact?.email && <p>{contact.email}</p>}
              {contact?.location && <p className="text-[#64748B]">{contact.location}</p>}
              {portfolio.socialLinks.map((l) => (
                <p key={l.id}>
                  <a href={l.url} className="text-[#2563EB] hover:underline">
                    {l.label}
                  </a>
                </p>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
