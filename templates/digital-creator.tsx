import type { Portfolio } from "@/types/portfolio";
import {
  aboutOf,
  contactOf,
  heroOf,
  initialsOf,
  projectsOf,
  skillsOf,
  statsOf,
} from "@/lib/portfolio/sections";

/** Digital Creator: vibrant, media-first layout for content creators. */
export function DigitalCreator({ portfolio }: { portfolio: Portfolio }) {
  const hero = heroOf(portfolio);
  const about = aboutOf(portfolio);
  const skills = skillsOf(portfolio);
  const projects = projectsOf(portfolio);
  const contact = contactOf(portfolio);
  const stats = statsOf(portfolio);

  return (
    <div className="overflow-hidden rounded-2xl bg-[#0d1442] text-white">
      <nav aria-label="Portfolio" className="flex items-center justify-between px-6 py-3 text-xs text-white/70">
        <span className="font-black">{initialsOf(portfolio.profile.name)}.</span>
        <span className="flex gap-4">
          <span>Work</span>
          <span>About</span>
        </span>
      </nav>
      <div className="bg-gradient-to-br from-[#7c3aed] via-[#ec4899] to-[#f59e0b] px-8 py-12">
        <p className="text-xs font-bold tracking-[0.24em] text-white/85">CREATOR</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight drop-shadow">
          {portfolio.profile.name}
        </h1>
        {hero?.headline && <p className="mt-2 font-medium text-white/90">{hero.headline}</p>}
        {stats.length > 0 && (
          <p className="mt-3 text-sm font-semibold text-white">
            {stats.map((s) => `${s.value} ${s.label}`).join("   ")}
          </p>
        )}
      </div>
      <div className="px-8 py-8">
        {about?.body && <p className="max-w-2xl text-[#cbd5e1]">{about.body}</p>}
        {projects.length > 0 && (
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {projects.map((p, i) => (
              <div key={i} className="overflow-hidden rounded-xl bg-white/10">
                <div
                  aria-hidden
                  className={`h-20 bg-gradient-to-br ${
                    ["from-[#7c3aed] to-[#ec4899]", "from-[#f59e0b] to-[#ef4444]", "from-[#06b6d4] to-[#7c3aed]"][i % 3]
                  }`}
                />
                <p className="px-3 py-2 text-sm font-semibold">{p.title}</p>
              </div>
            ))}
          </div>
        )}
        {skills?.skills && skills.skills.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {skills.skills.map((s) => (
              <span key={s} className="rounded-full bg-white/15 px-3 py-1 text-sm">
                #{s.replace(/\s+/g, "")}
              </span>
            ))}
          </div>
        )}
        <div className="mt-6 flex flex-wrap gap-3 border-t border-white/15 pt-5 text-sm">
          {contact?.email && (
            <a href={`mailto:${contact.email}`} className="rounded-full bg-white px-4 py-2 font-semibold text-[#0d1442]">
              Collaborate
            </a>
          )}
          {portfolio.socialLinks.map((l) => (
            <a key={l.id} href={l.url} className="rounded-full border border-white/25 px-4 py-2 hover:bg-white/10">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
