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
import {
  FONTS,
  HERO_GRADIENTS,
  type StudioTheme,
} from "@/lib/templates/studio";

/** Studio renderer — interprets validated DB theme tokens. One layout,
 *  infinitely re-skinnable by admins without touching code. */
export function Studio({ portfolio, theme }: { portfolio: Portfolio; theme: StudioTheme }) {
  const hero = heroOf(portfolio);
  const about = aboutOf(portfolio);
  const skills = skillsOf(portfolio)?.skills ?? [];
  const projects = projectsOf(portfolio);
  const experience = experienceOf(portfolio);
  const education = educationOf(portfolio);
  const contact = contactOf(portfolio);
  const stats = statsOf(portfolio);
  const mono = initialsOf(portfolio.profile.name);
  const font = { fontFamily: FONTS[theme.font] };
  const round = theme.radius === "pill" ? "rounded-full" : theme.radius === "sharp" ? "rounded-none" : "rounded-2xl";
  const card = theme.radius === "pill" ? "rounded-3xl" : theme.radius === "sharp" ? "rounded-none" : "rounded-2xl";
  const section = theme.darkSections ? "bg-[#0F172A] text-white" : "bg-white text-[#0F172A]";
  const muted = theme.darkSections ? "text-[#94a3b8]" : "text-[#64748B]";

  return (
    <div className={`overflow-hidden border border-[#E2E8F0] ${card} ${section}`} style={font}>
      <nav aria-label="Portfolio" className="flex items-center justify-between px-6 py-3 md:px-8">
        <span className="flex items-center gap-2">
          <span
            className="flex h-8 w-8 items-center justify-center text-xs font-bold text-white"
            style={{ backgroundColor: theme.accent, borderRadius: theme.radius === "sharp" ? 0 : 8 }}
          >
            {mono}
          </span>
          <span className="text-sm font-bold">{portfolio.profile.name}</span>
        </span>
        <span className={`hidden gap-5 text-xs ${muted} md:flex`}>
          {skills.length > 0 && <span>Expertise</span>}
          {projects.length > 0 && <span>Work</span>}
          <span>Contact</span>
        </span>
      </nav>

      <div className={`bg-gradient-to-br px-6 py-12 text-white md:px-10 ${HERO_GRADIENTS[theme.hero]}`}>
        {hero?.headline && (
          <p className="text-xs font-bold uppercase tracking-[0.22em] opacity-80">{hero.headline}</p>
        )}
        <h1 className="mt-3 max-w-2xl text-4xl font-black tracking-tight md:text-5xl">
          {portfolio.profile.name}
        </h1>
        {hero?.subheadline && <p className="mt-4 max-w-xl opacity-85">{hero.subheadline}</p>}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {contact?.email && (
            <a href={`mailto:${contact.email}`} className={`${round} bg-white px-5 py-2.5 text-sm font-bold text-black`}>
              Get in touch ↓
            </a>
          )}
          {portfolio.socialLinks.map((l) => (
            <a key={l.id} href={l.url} className={`${round} border border-white/30 px-4 py-2 text-sm`}>
              {l.label}
            </a>
          ))}
        </div>
        {stats.length > 0 && (
          <p className="mt-6 text-sm font-semibold">
            {stats.map((s) => `${s.value} ${s.label}`).join("  ·  ")}
          </p>
        )}
      </div>

      <div className="space-y-10 px-6 py-10 md:px-10">
        {about?.body && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: theme.accent }}>About</h2>
            <p className={`mt-3 max-w-2xl leading-relaxed ${muted}`}>{about.body}</p>
          </section>
        )}
        {skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: theme.accent }}>Expertise</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {skills.map((s, i) => (
                <li key={s} className={`${card} border border-[#E2E8F0] p-4 ${theme.darkSections ? "bg-white/5" : "bg-[#F4F6FB]"}`}>
                  <p className="text-xs font-black" style={{ color: theme.accent }}>{String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-1 font-bold">{s}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
        {projects.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: theme.accent }}>Selected work</h2>
            <ul className="mt-4 space-y-4">
              {projects.map((p, i) => (
                <li key={p.title + i} className={`${card} overflow-hidden border border-[#E2E8F0]`}>
                  <div aria-hidden className={`h-24 bg-gradient-to-br ${HERO_GRADIENTS[theme.hero]}`} />
                  <div className="p-5">
                    <p className={`text-xs font-semibold ${muted}`}>
                      {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 font-bold">{p.title}</h3>
                    {p.summary && <p className={`mt-1.5 text-sm ${muted}`}>{p.summary}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
        {experience.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: theme.accent }}>Experience</h2>
            <ul className="mt-4 space-y-3">
              {experience.map((e, i) => (
                <li key={i}>
                  <p className="font-bold">{e.role}{e.company ? <span className={`font-normal ${muted}`}> · {e.company}</span> : null}</p>
                  {e.summary && <p className={`text-sm ${muted}`}>{e.summary}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}
        {education.length > 0 && (
          <p className={`text-sm ${muted}`}>
            {education.map((e) => [e.degree, e.school].filter(Boolean).join(" — ")).join(" · ")}
          </p>
        )}
      </div>

      <footer className="flex flex-wrap items-center justify-between gap-3 bg-[#0F172A] px-6 py-5 text-sm text-white md:px-10">
        <span className="font-bold">{portfolio.profile.name}</span>
        <span className="text-[#94a3b8]">{contact?.email ?? portfolio.profile.location ?? ""}</span>
      </footer>
    </div>
  );
}
