import type { Portfolio } from "@/types/portfolio";

export type ExpItem = { company?: string; role?: string; startDate?: string; endDate?: string; summary?: string };
export type ProjItem = { title: string; summary?: string; role?: string; tools?: string[] };
export type EduItem = { school?: string; degree?: string };

/** Typed accessors over the generic section list. */
export function sectionContent<T>(portfolio: Portfolio, type: string): T | undefined {
  const s = portfolio.sections.find((s) => s.type === type && s.visible);
  return s?.content as T | undefined;
}

export function heroOf(portfolio: Portfolio) {
  return sectionContent<{ headline?: string; subheadline?: string }>(portfolio, "hero");
}

export function aboutOf(portfolio: Portfolio) {
  return sectionContent<{ body?: string }>(portfolio, "about");
}

export function skillsOf(portfolio: Portfolio) {
  return sectionContent<{ skills?: string[] }>(portfolio, "skills");
}

export function contactOf(portfolio: Portfolio) {
  return sectionContent<{ email?: string; location?: string }>(portfolio, "contact");
}

export function experienceOf(portfolio: Portfolio): ExpItem[] {
  return (
    sectionContent<{ items?: ExpItem[] }>(portfolio, "experience")?.items ?? []
  );
}

export function projectsOf(portfolio: Portfolio): ProjItem[] {
  return sectionContent<{ items?: ProjItem[] }>(portfolio, "projects")?.items ?? [];
}

export function educationOf(portfolio: Portfolio): EduItem[] {
  return (
    sectionContent<{ items?: EduItem[] }>(portfolio, "education")?.items ?? []
  );
}

/** Factual, derived stats — counts only, never invented metrics. */
export function statsOf(portfolio: Portfolio): { value: string; label: string }[] {
  const stats: { value: string; label: string }[] = [];
  const exp = experienceOf(portfolio).length;
  const proj = projectsOf(portfolio).length;
  const skills = skillsOf(portfolio)?.skills?.length ?? 0;
  if (proj > 0) stats.push({ value: `${proj}+`, label: proj === 1 ? "Project" : "Projects" });
  if (exp > 0) stats.push({ value: `${exp}+`, label: exp === 1 ? "Role" : "Roles" });
  if (skills > 0) stats.push({ value: `${skills}`, label: "Core skills" });
  return stats;
}

export function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}
