import { randomUUID } from "crypto";
import type { ExtractedProfile } from "@/types/extracted-profile";
import type { Portfolio, PortfolioSection } from "@/types/portfolio";
import { toSlug } from "@/types/portfolio";

/**
 * Profile → Portfolio JSON builder (PRD §13 Stage D/E).
 * Transforms sourced facts into portfolio sections. Omits sections without
 * evidence — never invents experience, projects, metrics or testimonials.
 */
export function buildPortfolio(args: {
  profile: ExtractedProfile;
  userId: string;
  templateId: string;
}): Portfolio {
  const { profile, userId, templateId } = args;
  const name = profile.name?.value?.trim() || "Your Name";
  const slug = toSlug(`${name}-portfolio`);
  // Headline must never repeat the name. Prefer the extracted title; else a
  // word-boundary slice of the summary; else omit and let the name carry it.
  const rawHeadline = profile.title?.value?.trim();
  const headline =
    rawHeadline && rawHeadline.toLowerCase() !== name.toLowerCase()
      ? rawHeadline
      : undefined;
  const summary = profile.summary?.value;
  const wordSlice = (s: string | undefined, max: number): string | undefined => {
    if (!s) return undefined;
    if (s.length <= max) return s;
    const cut = s.slice(0, max);
    return cut.slice(0, Math.max(cut.lastIndexOf(" "), 1)).trimEnd() + "…";
  };
  const sections: PortfolioSection[] = [];
  let order = 0;
  const push = (s: PortfolioSection) => {
    sections.push({ ...s, order: order++ } as PortfolioSection);
  };

  push({
    id: randomUUID(),
    type: "hero",
    order: 0,
    visible: true,
    content: {
      headline,
      subheadline: wordSlice(summary, 160),
    },
  } as PortfolioSection);

  if (profile.summary?.value) {
    push({
      id: randomUUID(),
      type: "about",
      order: 0,
      visible: true,
      content: { body: profile.summary.value },
    } as PortfolioSection);
  }

  if (profile.experience.length > 0) {
    push({
      id: randomUUID(),
      type: "experience",
      order: 0,
      visible: true,
      content: {
        items: profile.experience.map((e) => ({
          id: randomUUID(),
          company: e.company?.value,
          role: e.role?.value,
          summary: e.summary?.value,
        })),
      },
    } as PortfolioSection);
  }

  if (profile.projects.length > 0) {
    push({
      id: randomUUID(),
      type: "projects",
      order: 0,
      visible: true,
      content: {
        items: profile.projects.map((p) => ({
          id: randomUUID(),
          title: p.title?.value ?? "Untitled project",
          summary: p.problem?.value,
          role: p.role?.value,
          tools: p.tools,
        })),
      },
    } as PortfolioSection);
  }

  if (profile.skills.length > 0) {
    push({
      id: randomUUID(),
      type: "skills",
      order: 0,
      visible: true,
      content: { skills: profile.skills.map((s) => s.value) },
    } as PortfolioSection);
  }

  if (profile.education.length > 0) {
    push({
      id: randomUUID(),
      type: "education",
      order: 0,
      visible: true,
      content: {
        items: profile.education.map((e) => ({
          id: randomUUID(),
          school: e.school?.value,
          degree: e.degree?.value,
        })),
      },
    } as PortfolioSection);
  }

  push({
    id: randomUUID(),
    type: "contact",
    order: 0,
    visible: true,
    content: { email: profile.email?.value, location: profile.location?.value },
  } as PortfolioSection);

  return {
    id: randomUUID(),
    userId,
    slug,
    profile: {
      name,
      headline,
      location: profile.location?.value,
      summary,
    },
    socialLinks: profile.links.slice(0, 8).map((url, i) => ({
      id: `link-${i}`,
      label: labelFor(url),
      url,
    })),
    sections,
    theme: { templateId, mode: "light" },
    seo: {
      title: `${name} — Portfolio`,
      description: wordSlice(summary, 160),
    },
    publishing: { status: "draft" },
    version: 1,
  };
}

function labelFor(url: string): string {
  if (/linkedin/i.test(url)) return "LinkedIn";
  if (/github/i.test(url)) return "GitHub";
  if (/behance/i.test(url)) return "Behance";
  if (/dribbble/i.test(url)) return "Dribbble";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "Link";
  }
}
