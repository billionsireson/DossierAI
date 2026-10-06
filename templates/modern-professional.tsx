import type { Portfolio } from "@/types/portfolio";
import {
  aboutOf,
  contactOf,
  educationOf,
  experienceOf,
  heroOf,
  initialsOf,
  projectsOf,
  skillsOf,
  statsOf,
} from "@/lib/portfolio/sections";

/** Flagship: Modern Professional — sticky nav, story hero, stats, numbered
 *  expertise, case-study projects, timeline, footer. Every block renders
 *  only from sourced data. */
export function ModernProfessional({ portfolio }: { portfolio: Portfolio }) {
  const hero = heroOf(portfolio);
  const about = aboutOf(portfolio);
  const skills = skillsOf(portfolio)?.skills ?? [];
  const contact = contactOf(portfolio);
  const experience = experienceOf(portfolio);
  const projects = projectsOf(portfolio);
  const education = educationOf(portfolio);
  const stats = statsOf(portfolio);
  const initials = initialsOf(portfolio.profile.name);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white">
      <nav aria-label="Portfolio" className="flex items-center justify-between bg-[#0d1442] px-6 py-3 text-white md:px-8">
        <span className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#2E7CF6] to-[#180F6E] text-xs font-bold">
            {initials}
          </span>
          <span className="text-sm font-semibold">{portfolio.profile.name}</span>
        </span>
        <span className="hidden gap-5 text-xs text-[#B7CCE3] md:flex">
          {skills.length > 0 && <span>Expertise</span>}
          {projects.length > 0 && <span>Work</span>}
          {experience.length > 0 && <span>About</span>}
          <span>Contact</span>
        </span>
      </nav>

      <div className="relative overflow-hidden bg-[#0d1442] px-6 py-12 text-white md:px-10 md:py-16">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#2E7CF6]/40 blur-[100px]" />
          <div className="absolute -bottom-24 left-1/4 h-56 w-96 rounded-full bg-[#7c3aed]/30 blur-[100px]" />
        </div>
        <div className="relative">
          {hero?.headline && (
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7dd3fc]">
              {hero.headline}
            </p>
          )}
          <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
            {portfolio.profile.name}
          </h1>
          {hero?.subheadline && (
            <p className="mt-4 max-w-xl leading-relaxed text-[#cbd5e1]">{hero.subheadline}</p>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {contact?.email && (
              <a
                href={`mailto:${contact.email}`}
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0d1442] hover:bg-[#e8f1fd]"
              >
                Get in touch ↓
              </a>
            )}
            {portfolio.socialLinks.map((l) => (
              <a key={l.id} href={l.url} className="rounded-full border border-white/25 px-4 py-2 text-sm text-white hover:bg-white/10">
                {l.label}
              </a>
            ))}
          </div>
          {(contact?.location || stats.length > 0) && (
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/15 pt-6">
              {contact?.location && (
                <p className="text-sm text-[#B7CCE3]">{contact.location}</p>
              )}
              {stats.map((s) => (
                <p key={s.label} className="text-sm">
                  <span className="text-xl font-bold text-white">{s.value}</span>{" "}
                  <span className="text-[#93a4c4]">{s.label}</span>
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-10 px-6 py-10 md:px-10">
        {about?.body && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-[#2E7CF6]">About</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-[#334155]">{about.body}</p>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-[#2E7CF6]">
              Expertise
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {skills.map((s, i) => (
                <li key={s} className="rounded-xl border border-[#E2E8F0] bg-[#F4F6FB] p-4">
                  <p className="text-xs font-bold text-[#2E7CF6]">{String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-1 font-semibold text-[#0F172A]">{s}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-[#2E7CF6]">
              Selected work
            </h2>
            <ul className="mt-4 space-y-4">
              {projects.map((p, i) => (
                <li key={p.title + i} className="overflow-hidden rounded-xl border border-[#E2E8F0]">
                  <div className={`h-24 bg-gradient-to-br ${["from-[#1e3a8a] to-[#0ea5e9]", "from-[#7c3aed] to-[#ec4899]", "from-[#0f766e] to-[#84cc16]"][i % 3]}`} aria-hidden />
                  <div className="p-5">
                    <p className="text-xs font-semibold text-[#64748B]">
                      {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 font-bold text-[#0F172A]">{p.title}</h3>
                    {p.summary && <p className="mt-1.5 text-sm leading-relaxed text-[#475569]">{p.summary}</p>}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.role && (
                        <span className="rounded-full bg-[#e8f1fd] px-2.5 py-1 text-xs font-medium text-[#1e3a8a]">
                          {p.role}
                        </span>
                      )}
                      {(p.tools ?? []).map((t) => (
                        <span key={t} className="rounded-full bg-[#F1F5F9] px-2.5 py-1 text-xs text-[#475569]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-[#2E7CF6]">
              Experience
            </h2>
            <ol className="relative mt-4 space-y-5 border-l-2 border-[#e8f1fd] pl-5">
              {experience.map((e, i) => (
                <li key={i} className="relative">
                  <span aria-hidden className="absolute -left-[27px] top-1 h-3 w-3 rounded-full bg-[#2E7CF6]" />
                  <p className="font-semibold text-[#0F172A]">
                    {e.role}
                    {e.company ? <span className="font-normal text-[#64748B]"> · {e.company}</span> : null}
                  </p>
                  {(e.startDate || e.endDate) && (
                    <p className="text-xs text-[#94a3b8]">
                      {[e.startDate, e.endDate].filter(Boolean).join(" – ")}
                    </p>
                  )}
                  {e.summary && <p className="mt-1 text-sm leading-relaxed text-[#475569]">{e.summary}</p>}
                </li>
              ))}
            </ol>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-[#2E7CF6]">
              Education
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm text-[#334155]">
              {education.map((e, i) => (
                <li key={i}>{[e.degree, e.school].filter(Boolean).join(" — ")}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <footer className="flex flex-wrap items-center justify-between gap-3 bg-[#0d1442] px-6 py-5 text-sm text-[#B7CCE3] md:px-10">
        <span className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#2E7CF6] to-[#180F6E] text-[11px] font-bold text-white">
            {initials}
          </span>
          {portfolio.profile.name}
        </span>
        <span>{contact?.email ?? portfolio.profile.location ?? ""}</span>
      </footer>
    </div>
  );
}
