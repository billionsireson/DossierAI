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

/** Creative Minimal: gallery-first, typographic, light — same story depth. */
export function CreativeMinimal({ portfolio }: { portfolio: Portfolio }) {
  const hero = heroOf(portfolio);
  const about = aboutOf(portfolio);
  const skills = skillsOf(portfolio)?.skills ?? [];
  const projects = projectsOf(portfolio);
  const experience = experienceOf(portfolio);
  const education = educationOf(portfolio);
  const contact = contactOf(portfolio);
  const stats = statsOf(portfolio);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#faf9f7]">
      <nav aria-label="Portfolio" className="flex items-center justify-between px-6 py-3 md:px-8">
        <span className="text-sm font-black tracking-tight">{initialsOf(portfolio.profile.name)}</span>
        <span className="flex gap-4 text-xs text-[#64748B]">
          {skills.length > 0 && <span>Expertise</span>}
          {projects.length > 0 && <span>Work</span>}
          <span>Contact</span>
        </span>
      </nav>

      <div className="px-6 py-10 md:px-10 md:py-14">
        {hero?.headline && (
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#a16207]">
            {hero.headline}
          </p>
        )}
        <h1 className="mt-3 max-w-2xl text-5xl font-black leading-[1.02] tracking-tight text-[#0F172A] md:text-6xl">
          {portfolio.profile.name}
        </h1>
        {hero?.subheadline && (
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#475569]">{hero.subheadline}</p>
        )}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {contact?.email && (
            <a href={`mailto:${contact.email}`} className="rounded-full bg-[#0F172A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#334155]">
              Explore my work ↓
            </a>
          )}
          {stats.map((s) => (
            <span key={s.label} className="text-sm text-[#64748B]">
              <strong className="text-[#0F172A]">{s.value}</strong> {s.label}
            </span>
          ))}
        </div>
      </div>

      {(projects.length > 0 || about?.body) && (
        <div className="grid gap-px bg-[#E2E8F0] md:grid-cols-2">
          {projects.slice(0, 6).map((p, i) => (
            <div key={p.title + i} className="bg-[#faf9f7] p-6">
              <div aria-hidden className={`h-32 rounded-lg bg-gradient-to-br ${["from-[#f59e0b] to-[#ef4444]", "from-[#0F172A] to-[#475569]", "from-[#0ea5e9] to-[#6366f1]", "from-[#ec4899] to-[#f59e0b]"][i % 4]}`} />
              <p className="mt-3 text-xs font-semibold text-[#a16207]">
                {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </p>
              <h2 className="mt-1 font-bold text-[#0F172A]">{p.title}</h2>
              {p.summary && <p className="mt-1 text-sm text-[#64748B]">{p.summary}</p>}
              {(p.tools ?? []).length > 0 && (
                <p className="mt-2 text-xs text-[#94a3b8]">{(p.tools ?? []).join(" · ")}</p>
              )}
            </div>
          ))}
          {about?.body && projects.length === 0 && (
            <div className="bg-[#faf9f7] p-6 md:col-span-2">
              <p className="max-w-2xl leading-relaxed text-[#334155]">{about.body}</p>
            </div>
          )}
        </div>
      )}

      <div className="px-6 py-8 md:px-10">
        {skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#a16207]">What I do</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {skills.map((s, i) => (
                <li key={s} className="flex gap-3 rounded-lg bg-white p-3 shadow-sm">
                  <span className="text-sm font-black text-[#0F172A]/20">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm font-medium">{s}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
        {experience.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#a16207]">Behind the work</h2>
            <ul className="mt-3 space-y-3">
              {experience.map((e, i) => (
                <li key={i} className="border-l-2 border-[#0F172A] pl-4">
                  <p className="font-semibold">{e.role}{e.company ? ` — ${e.company}` : ""}</p>
                  {e.summary && <p className="text-sm text-[#64748B]">{e.summary}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}
        {education.length > 0 && (
          <p className="mt-6 text-sm text-[#64748B]">
            {education.map((e) => [e.degree, e.school].filter(Boolean).join(" — ")).join(" · ")}
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-3 border-t border-[#E2E8F0] pt-5 text-sm">
          {contact?.email && <span>{contact.email}</span>}
          {portfolio.socialLinks.map((l) => (
            <a key={l.id} href={l.url} className="font-semibold underline">{l.label}</a>
          ))}
        </div>
      </div>
    </div>
  );
}
