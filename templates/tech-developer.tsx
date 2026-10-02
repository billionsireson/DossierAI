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

/** Tech / Developer: terminal-inspired dark layout with stats. */
export function TechDeveloper({ portfolio }: { portfolio: Portfolio }) {
  const hero = heroOf(portfolio);
  const about = aboutOf(portfolio);
  const skills = skillsOf(portfolio);
  const contact = contactOf(portfolio);
  const experience = experienceOf(portfolio);
  const projects = projectsOf(portfolio);
  const education = educationOf(portfolio);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#1e293b] bg-[#020617] font-mono text-[#e2e8f0]">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
        <span className="ml-2 text-xs text-[#64748B]">~/portfolio</span>
      </div>
      <div className="px-6 py-8">
        <p className="text-sm text-[#22c55e]">$ whoami</p>
        <h1 className="mt-2 text-3xl font-bold text-white">{portfolio.profile.name}</h1>
        {hero?.headline && <p className="mt-1 text-[#38bdf8]">{hero.headline}</p>}
        {about?.body && <p className="mt-4 max-w-2xl text-sm text-[#94a3b8]">{about.body}</p>}
        {skills?.skills && skills.skills.length > 0 && (
          <p className="mt-4 text-sm">
            <span className="text-[#22c55e]">$ skills --list</span>
            <br />
            <span className="text-[#a78bfa]">{skills.skills.join("  ")}</span>
          </p>
        )}
        {projects.length > 0 && (
          <div className="mt-6">
            <p className="text-sm text-[#22c55e]">$ ls projects/</p>
            <div className="mt-2 grid gap-2 md:grid-cols-2">
              {projects.map((p, i) => (
                <div key={i} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                  <p className="font-bold text-white">{p.title}</p>
                  {p.summary && <p className="mt-1 font-sans text-xs text-[#94a3b8]">{p.summary}</p>}
                  {p.tools && p.tools.length > 0 && (
                    <p className="mt-1 text-xs text-[#f59e0b]">{p.tools.join(" ")}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {experience.length > 0 && (
          <div className="mt-6">
            <p className="text-sm text-[#22c55e]">$ cat experience.log</p>
            <ul className="mt-2 space-y-2 text-sm">
              {experience.map((e, i) => (
                <li key={i}>
                  <span className="text-white">
                    {e.role}@{e.company ?? "—"}
                  </span>
                  {e.summary && <span className="block font-sans text-xs text-[#94a3b8]">{e.summary}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
        {education.length > 0 && (
          <p className="mt-6 text-sm text-[#94a3b8]">
            <span className="text-[#22c55e]">$ cat education</span>
            <br />
            {education.map((e) => [e.degree, e.school].filter(Boolean).join(" @ ")).join("; ")}
          </p>
        )}
        <p className="mt-6 border-t border-white/10 pt-4 text-sm">
          <span className="text-[#22c55e]">$ contact</span>
          <br />
          {contact?.email && <span>{contact.email} </span>}
          {portfolio.socialLinks.map((l) => (
            <a key={l.id} href={l.url} className="mr-3 text-[#38bdf8] hover:underline">
              [{l.label}]
            </a>
          ))}
        </p>
      </div>
    </div>
  );
}
