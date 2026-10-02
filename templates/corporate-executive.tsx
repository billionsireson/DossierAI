import type { Portfolio } from "@/types/portfolio";
import {
  aboutOf,
  contactOf,
  educationOf,
  experienceOf,
  heroOf,
  projectsOf,
  skillsOf,
} from "@/lib/portfolio/sections";

/** Corporate Executive: restrained, centered, authority-led on deep navy. */
export function CorporateExecutive({ portfolio }: { portfolio: Portfolio }) {
  const hero = heroOf(portfolio);
  const about = aboutOf(portfolio);
  const skills = skillsOf(portfolio);
  const contact = contactOf(portfolio);
  const experience = experienceOf(portfolio);
  const projects = projectsOf(portfolio);
  const education = educationOf(portfolio);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#1e293b] bg-[#0b1226] text-white">
      <div className="px-8 py-12 text-center">
        <div
          aria-hidden
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#c9a227] to-[#f5e08c] text-xl font-bold text-[#0b1226]"
        >
          {(portfolio.profile.name || "D").slice(0, 1)}
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">{portfolio.profile.name}</h1>
        {hero?.headline && <p className="mt-2 text-[#c9a227]">{hero.headline}</p>}
        {hero?.subheadline && (
          <p className="mx-auto mt-3 max-w-xl text-sm text-[#94a3b8]">{hero.subheadline}</p>
        )}
      </div>
      <div className="mx-auto max-w-2xl space-y-8 px-8 pb-10">
        {about?.body && (
          <section className="border-t border-white/15 pt-6 text-center">
            <p className="text-[#cbd5e1]">{about.body}</p>
          </section>
        )}
        {experience.length > 0 && (
          <section className="border-t border-white/15 pt-6">
            <h2 className="text-center text-xs font-bold uppercase tracking-[0.24em] text-[#c9a227]">
              Experience
            </h2>
            <ul className="mt-4 space-y-4">
              {experience.map((e, i) => (
                <li key={i} className="text-center">
                  <p className="font-semibold">
                    {e.role} {e.company ? `· ${e.company}` : ""}
                  </p>
                  {e.summary && <p className="mt-1 text-sm text-[#94a3b8]">{e.summary}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}
        {projects.length > 0 && (
          <section className="border-t border-white/15 pt-6">
            <h2 className="text-center text-xs font-bold uppercase tracking-[0.24em] text-[#c9a227]">
              Selected Work
            </h2>
            <ul className="mt-4 space-y-3">
              {projects.map((p, i) => (
                <li key={i} className="rounded-lg bg-white/5 p-4 text-center">
                  <p className="font-semibold">{p.title}</p>
                  {p.summary && <p className="mt-1 text-sm text-[#94a3b8]">{p.summary}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}
        {education.length > 0 && (
          <section className="border-t border-white/15 pt-6 text-center text-sm text-[#cbd5e1]">
            <h2 className="text-xs font-bold uppercase tracking-[0.24em] text-[#c9a227]">
              Education
            </h2>
            <ul className="mt-3 space-y-1">
              {education.map((e, i) => (
                <li key={i}>{[e.degree, e.school].filter(Boolean).join(" — ")}</li>
              ))}
            </ul>
          </section>
        )}
        {skills?.skills && skills.skills.length > 0 && (
          <section className="border-t border-white/15 pt-6 text-center">
            <h2 className="text-xs font-bold uppercase tracking-[0.24em] text-[#c9a227]">
              Expertise
            </h2>
            <p className="mt-3 text-sm text-[#cbd5e1]">{skills.skills.join("  ·  ")}</p>
          </section>
        )}
        <footer className="border-t border-white/15 pt-6 text-center text-sm text-[#94a3b8]">
          {contact?.email && <p>{contact.email}</p>}
          {contact?.location && <p>{contact.location}</p>}
          <p className="mt-2">
            {portfolio.socialLinks.map((l) => (
              <a key={l.id} href={l.url} className="mx-2 text-[#c9a227] hover:underline">
                {l.label}
              </a>
            ))}
          </p>
        </footer>
      </div>
    </div>
  );
}
