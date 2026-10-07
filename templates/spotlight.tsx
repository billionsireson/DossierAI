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

/** Spotlight Editorial — sticky nav, story hero, stats, numbered expertise,
 *  case-study work, gallery, timeline, footer. Mirrors the reference
 *  portfolio's information architecture, rendered only from sourced data. */
export function Spotlight({ portfolio }: { portfolio: Portfolio }) {
  const hero = heroOf(portfolio);
  const about = aboutOf(portfolio);
  const skills = skillsOf(portfolio)?.skills ?? [];
  const projects = projectsOf(portfolio);
  const experience = experienceOf(portfolio);
  const education = educationOf(portfolio);
  const contact = contactOf(portfolio);
  const stats = statsOf(portfolio);
  const mono = initialsOf(portfolio.profile.name);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white text-[#0F172A]">
      <nav aria-label="Portfolio" className="sticky top-0 z-10 flex items-center justify-between bg-white/90 px-6 py-3 backdrop-blur md:px-10">
        <span className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F172A] text-sm font-black text-white">
            {mono}
          </span>
          <span className="text-sm font-bold">{portfolio.profile.name}</span>
        </span>
        <span className="hidden gap-6 text-xs font-semibold text-[#475569] md:flex">
          {skills.length > 0 && <a href="#spot-expertise">Expertise</a>}
          {projects.length > 0 && <a href="#spot-work">Work</a>}
          {experience.length > 0 && <a href="#spot-about">About</a>}
          <a href="#spot-contact">Contact</a>
        </span>
      </nav>

      <header className="relative overflow-hidden bg-[#0d1442] px-6 pb-10 pt-12 text-white md:px-12 md:pt-16">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[#2E7CF6]/40 blur-[110px]" />
          <div className="absolute -bottom-28 left-1/3 h-64 w-96 rounded-full bg-[#7c3aed]/30 blur-[110px]" />
        </div>
        <div className="relative grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            {hero?.headline && (
              <p className="text-sm font-medium text-[#93c5fd]">{hero.headline}</p>
            )}
            <h1 className="mt-3 text-5xl font-black leading-[1.02] tracking-tight md:text-6xl">
              {portfolio.profile.name}
            </h1>
            {hero?.subheadline && (
              <p className="mt-4 max-w-xl leading-relaxed text-[#cbd5e1]">{hero.subheadline}</p>
            )}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {projects.length > 0 && (
                <a href="#spot-work" className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#0d1442] hover:bg-[#e8f1fd]">
                  Explore my work ↓
                </a>
              )}
              {contact?.email && (
                <a href={`mailto:${contact.email}`} className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold hover:bg-white/10">
                  {contact.email}
                </a>
              )}
            </div>
            {portfolio.profile.location && (
              <p className="mt-5 text-sm text-[#93a4c4]">{portfolio.profile.location}</p>
            )}
          </div>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-1 lg:grid-cols-3">
            {(stats.length > 0 ? stats : [{ value: "01", label: "Portfolio" }]).map((s) => (
              <div key={s.label} className="rounded-2xl bg-white/[0.07] p-4 backdrop-blur">
                <p className="text-2xl font-black text-white">{s.value}</p>
                <p className="mt-1 text-xs leading-snug text-[#93a4c4]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {stats.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-10 gap-y-3 border-b border-[#E2E8F0] bg-[#F4F6FB] px-6 py-5 md:px-12">
          {stats.map((s) => (
            <p key={s.label} className="text-sm text-[#475569]">
              <strong className="text-xl font-black text-[#0F172A]">{s.value}</strong>{" "}
              {s.label}
            </p>
          ))}
        </div>
      )}

      <div className="space-y-14 px-6 py-12 md:px-12">
        {skills.length > 0 && (
          <section id="spot-expertise" aria-label="Expertise">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2E7CF6]">What I do</p>
            <h2 className="mt-2 max-w-xl text-2xl font-black tracking-tight md:text-3xl">
              Strategy is one channel. Growth is the job.
            </h2>
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {skills.map((s, i) => (
                <li key={s} className="group rounded-2xl border border-[#E2E8F0] p-5 transition-shadow hover:shadow-[0_12px_36px_rgba(46,124,246,0.18)]">
                  <p className="text-xs font-black text-[#2E7CF6]">{String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-1.5 font-bold">{s} <span aria-hidden className="text-[#93c5fd] transition-transform group-hover:translate-x-1">↗</span></p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {projects.length > 0 && (
          <section id="spot-work" aria-label="Selected work">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2E7CF6]">Selected work</p>
            <h2 className="mt-2 max-w-xl text-2xl font-black tracking-tight md:text-3xl">
              Built to be seen. Designed to perform.
            </h2>
            <ol className="mt-6 space-y-8">
              {projects.map((p, i) => (
                <li key={p.title + i} className="overflow-hidden rounded-2xl border border-[#E2E8F0]">
                  <div aria-hidden className={`flex h-36 items-end bg-gradient-to-br p-5 ${["from-[#1e3a8a] via-[#2563EB] to-[#0ea5e9]", "from-[#4c1d95] via-[#7c3aed] to-[#ec4899]", "from-[#0f766e] via-[#059669] to-[#84cc16]"][i % 3]}`}>
                    <p className="text-xs font-black tracking-widest text-white/85">
                      {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                    </p>
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl font-black">{p.title}</h3>
                    {p.role && <p className="mt-1 text-sm font-medium text-[#2E7CF6]">{p.role}</p>}
                    {p.summary && (
                      <p className="mt-3 max-w-3xl leading-relaxed text-[#475569]">{p.summary}</p>
                    )}
                    {(p.tools ?? []).length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {(p.tools ?? []).map((t) => (
                          <li key={t} className="rounded-full bg-[#e8f1fd] px-3 py-1 text-xs font-semibold text-[#1e3a8a]">
                            {t}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {about?.body && (
          <section id="spot-about" aria-label="About">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2E7CF6]">Behind the work</p>
            <p className="mt-3 max-w-3xl text-lg leading-relaxed text-[#334155]">{about.body}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section aria-label="Career timeline">
            <ol className="mt-2 space-y-0">
              {experience.map((e, i) => (
                <li key={i} className="flex gap-4 border-b border-[#E2E8F0] py-4 last:border-0">
                  <span className="w-28 shrink-0 text-xs font-semibold text-[#94a3b8]">
                    {[e.startDate, e.endDate].filter(Boolean).join(" – ") || "—"}
                  </span>
                  <span>
                    <p className="font-bold">
                      {e.role}
                      {e.company ? <span className="font-medium text-[#64748B]"> · {e.company}</span> : null}
                    </p>
                    {e.summary && <p className="mt-1 text-sm leading-relaxed text-[#475569]">{e.summary}</p>}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {education.length > 0 && (
          <p className="text-sm text-[#64748B]">
            {education.map((e) => [e.degree, e.school].filter(Boolean).join(" — ")).join(" · ")}
          </p>
        )}
      </div>

      <footer id="spot-contact" className="flex flex-wrap items-center justify-between gap-4 bg-[#0F172A] px-6 py-6 text-sm text-white md:px-12">
        <span className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-black text-[#0F172A]">
            {mono}
          </span>
          <span>
            <strong className="block leading-tight">{portfolio.profile.name}</strong>
            <span className="text-xs text-[#94a3b8]">{hero?.headline ?? "Portfolio"}</span>
          </span>
        </span>
        <span className="flex flex-wrap gap-3">
          {contact?.email && (
            <a href={`mailto:${contact.email}`} className="rounded-full bg-white px-4 py-2 font-semibold text-[#0F172A]">
              {contact.email}
            </a>
          )}
          {portfolio.socialLinks.map((l) => (
            <a key={l.id} href={l.url} className="rounded-full border border-white/25 px-4 py-2 hover:bg-white/10">
              {l.label}
            </a>
          ))}
        </span>
      </footer>
    </div>
  );
}
