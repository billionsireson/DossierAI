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

/** Creative Minimal: gallery-first, typographic, light. */
export function CreativeMinimal({ portfolio }: { portfolio: Portfolio }) {
  const hero = heroOf(portfolio);
  const about = aboutOf(portfolio);
  const skills = skillsOf(portfolio);
  const projects = projectsOf(portfolio);
  const contact = contactOf(portfolio);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#faf9f7]">
      <div className="px-8 py-12">
        <p className="text-xs font-semibold tracking-[0.24em] text-[#a16207]">
          PORTFOLIO
        </p>
        <h1 className="mt-3 text-5xl font-black leading-[1.02] tracking-tight text-[#0F172A]">
          {portfolio.profile.name}
        </h1>
        {hero?.headline && (
          <p className="mt-3 max-w-lg text-lg text-[#475569]">{hero.headline}</p>
        )}
      </div>
      {(projects.length > 0 || about?.body) && (
        <div className="grid gap-px bg-[#E2E8F0] md:grid-cols-2">
          {projects.slice(0, 4).map((p, i) => (
            <div key={p.title + i} className="bg-[#faf9f7] p-6">
              <div
                aria-hidden
                className={`h-28 rounded-lg bg-gradient-to-br ${
                  [
                    "from-[#f59e0b] to-[#ef4444]",
                    "from-[#0F172A] to-[#475569]",
                    "from-[#0ea5e9] to-[#6366f1]",
                    "from-[#ec4899] to-[#f59e0b]",
                  ][i % 4]
                }`}
              />
              <h2 className="mt-3 font-bold text-[#0F172A]">{p.title}</h2>
              {p.summary && <p className="mt-1 text-sm text-[#64748B]">{p.summary}</p>}
            </div>
          ))}
          {about?.body && projects.length === 0 && (
            <div className="bg-[#faf9f7] p-6 md:col-span-2">
              <p className="max-w-2xl text-[#334155]">{about.body}</p>
            </div>
          )}
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-4 px-8 py-6">
        {skills?.skills && skills.skills.length > 0 ? (
          <p className="text-sm text-[#475569]">{skills.skills.join(" · ")}</p>
        ) : (
          <span />
        )}
        <div className="flex gap-3 text-sm">
          {contact?.email && <span>{contact.email}</span>}
          {portfolio.socialLinks.map((l) => (
            <a key={l.id} href={l.url} className="font-medium underline">
              {l.label}
            </a>
          ))}
        </div>
      </div>
      {experienceOf(portfolio).length > 0 && (
        <div className="border-t border-[#E2E8F0] px-8 py-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#a16207]">
            Experience
          </h2>
          <ul className="mt-3 space-y-3">
            {experienceOf(portfolio).map((e, i) => (
              <li key={i}>
                <p className="font-semibold text-[#0F172A]">
                  {e.role} {e.company ? `— ${e.company}` : ""}
                </p>
                {e.summary && <p className="text-sm text-[#64748B]">{e.summary}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
      {educationOf(portfolio).length > 0 && (
        <div className="border-t border-[#E2E8F0] px-8 py-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#a16207]">
            Education
          </h2>
          <ul className="mt-3 space-y-2">
            {educationOf(portfolio).map((e, i) => (
              <li key={i} className="text-sm text-[#334155]">
                {[e.degree, e.school].filter(Boolean).join(" — ")}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
