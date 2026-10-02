import { z } from "zod";

// Runtime validation mirror of types/portfolio.ts (PRD §53 quality gate:
// schema → required fields → provenance → quality → rendering).

const SectionBase = z.object({
  id: z.string().min(1),
  type: z.string().min(1),
  order: z.number(),
  visible: z.boolean(),
  content: z.unknown(),
});

export const PortfolioSchema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
  slug: z.string().min(1),
  profile: z.object({
    name: z.string().min(1),
    headline: z.string().optional(),
    location: z.string().optional(),
    summary: z.string().optional(),
    avatarUrl: z.string().optional(),
    resumeUrl: z.string().optional(),
  }),
  socialLinks: z
    .array(z.object({ id: z.string(), label: z.string(), url: z.string() }))
    .default([]),
  sections: z.array(SectionBase).min(1),
  theme: z.object({
    templateId: z.string().min(1),
    mode: z.enum(["light", "dark", "auto"]),
    primaryColor: z.string().optional(),
    accentColor: z.string().optional(),
    fontFamily: z.string().optional(),
  }),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      imageUrl: z.string().optional(),
    })
    .default({}),
  publishing: z.object({
    status: z.enum(["draft", "published", "unpublished"]),
    publishedAt: z.string().optional(),
  }),
  version: z.number(),
});

export type ValidatedPortfolio = z.infer<typeof PortfolioSchema>;

/** Content quality gate: no placeholders, no broken sentences, hero present. */
export function qualityGate(portfolio: ValidatedPortfolio): string[] {
  const issues: string[] = [];
  const hero = portfolio.sections.find((s) => s.type === "hero");
  if (!hero) issues.push("Missing hero section.");
  const text = JSON.stringify(portfolio);
  for (const bad of ["lorem ipsum", "TODO", "FIXME", "[object Object]"]) {
    if (text.toLowerCase().includes(bad)) issues.push(`Placeholder detected: ${bad}.`);
  }
  if (!portfolio.profile.name.trim()) issues.push("Profile name is empty.");
  const urls = [
    ...portfolio.socialLinks.map((l) => l.url),
    portfolio.profile.avatarUrl,
    portfolio.profile.resumeUrl,
  ].filter(Boolean) as string[];
  for (const u of urls) {
    if (!/^https?:\/\//i.test(u) && !u.startsWith("/")) {
      issues.push(`Suspicious URL (not http/https or site path): ${u}`);
    }
  }
  return issues;
}
