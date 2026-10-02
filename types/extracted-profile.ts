import { z } from "zod";

// DossierAI structured profile — PRD §13 Stage B/C.
// Every fact carries provenance; AI must prefer sourced facts over claims.

export const EvidenceSchema = z.object({
  fact: z.string(),
  source: z.string(),
  sourceLocation: z.string().optional(),
  confidence: z.number().min(0).max(1),
});

export type Evidence = z.infer<typeof EvidenceSchema>;

const EvidencedString = z.object({
  value: z.string(),
  evidence: EvidenceSchema.optional(),
});

export const ExperienceItemSchema = z.object({
  company: EvidencedString.optional(),
  role: EvidencedString.optional(),
  startDate: EvidencedString.optional(),
  endDate: EvidencedString.optional(),
  summary: EvidencedString.optional(),
});

export const ProjectItemSchema = z.object({
  title: EvidencedString.optional(),
  problem: EvidencedString.optional(),
  role: EvidencedString.optional(),
  tools: z.array(z.string()).default([]),
  outcome: EvidencedString.optional(),
});

export const ExtractedProfileSchema = z.object({
  name: EvidencedString.optional(),
  title: EvidencedString.optional(),
  summary: EvidencedString.optional(),
  location: EvidencedString.optional(),
  email: EvidencedString.optional(),
  phone: EvidencedString.optional(),
  links: z.array(z.string()).default([]),
  experience: z.array(ExperienceItemSchema).default([]),
  education: z
    .array(
      z.object({
        school: EvidencedString.optional(),
        degree: EvidencedString.optional(),
      }),
    )
    .default([]),
  skills: z.array(EvidencedString).default([]),
  projects: z.array(ProjectItemSchema).default([]),
  certifications: z.array(EvidencedString).default([]),
  achievements: z.array(EvidencedString).default([]),
});

export type ExtractedProfile = z.infer<typeof ExtractedProfileSchema>;

/** Fields below this confidence must be confirmed by the user (PRD §14). */
export const REVIEW_THRESHOLD = 0.7;

export function needsReview(profile: ExtractedProfile): string[] {
  const paths: string[] = [];
  const check = (path: string, e?: { confidence?: number } | null) => {
    if (e && typeof e.confidence === "number" && e.confidence < REVIEW_THRESHOLD) {
      paths.push(path);
    }
  };
  check("name", profile.name?.evidence);
  check("title", profile.title?.evidence);
  check("summary", profile.summary?.evidence);
  profile.experience.forEach((x, i) => {
    check(`experience[${i}].company`, x.company?.evidence);
    check(`experience[${i}].role`, x.role?.evidence);
  });
  profile.skills.forEach((s, i) => check(`skills[${i}]`, s.evidence));
  return paths;
}
