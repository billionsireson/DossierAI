import type { Portfolio } from "@/types/portfolio";

export type ExpItem = { company?: string; role?: string; summary?: string };
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
