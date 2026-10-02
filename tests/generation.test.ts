import { describe, expect, it } from "vitest";
import { buildPortfolio } from "@/lib/portfolio/build";
import { PortfolioSchema, qualityGate } from "@/lib/portfolio/validate";
import type { ExtractedProfile } from "@/types/extracted-profile";

const profile: ExtractedProfile = {
  name: { value: "Esther Okafor" },
  summary: { value: "Product designer with 3+ years." },
  email: { value: "esther@example.com" },
  links: ["https://linkedin.com/in/esther"],
  experience: [],
  education: [],
  skills: [{ value: "Product Design" }],
  projects: [],
  certifications: [],
  achievements: [],
};

describe("portfolio generation", () => {
  it("builds valid portfolio JSON and omits empty sections", () => {
    const p = buildPortfolio({ profile, userId: "u1", templateId: "modern-professional" });
    expect(p.sections.some((s) => s.type === "experience")).toBe(false);
    expect(p.sections.some((s) => s.type === "projects")).toBe(false);
    expect(PortfolioSchema.safeParse(p).success).toBe(true);
    expect(qualityGate(PortfolioSchema.parse(p))).toEqual([]);
  });

  it("falls back safely, never fabricates", () => {
    const p = buildPortfolio({
      profile: { links: [], experience: [], education: [], skills: [], projects: [], certifications: [], achievements: [] },
      userId: "u1",
      templateId: "modern-professional",
    });
    expect(p.profile.name).toBe("Your Name");
    expect(p.sections.some((s) => s.type === "experience")).toBe(false);
  });
});
