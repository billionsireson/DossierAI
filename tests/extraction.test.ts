import { beforeEach, describe, expect, it, vi } from "vitest";
import { heuristicProvider } from "@/lib/ai/provider";
import { ExtractedProfileSchema, needsReview } from "@/types/extracted-profile";
import { extractFromText } from "@/lib/extraction/extract";

beforeEach(() => {
  // Deterministic heuristic path: vendor keys must not leak into unit tests.
  vi.stubEnv("GEMINI_API_KEY", "");
  vi.stubEnv("AI_PROVIDER_API_KEY", "");
});

const CV = `Esther Okafor
Product Designer in Lagos
esther@example.com
https://linkedin.com/in/esther
Skills: Product Design, UX Research, UI Design`;

describe("heuristic extraction", () => {
  it("extracts email + links without inventing experience", async () => {
    const p = await heuristicProvider.extractProfile({ text: CV, fileName: "cv.txt" });
    expect(p.email?.value).toBe("esther@example.com");
    expect(p.links).toContain("https://linkedin.com/in/esther");
    expect(p.experience).toEqual([]);
    expect(ExtractedProfileSchema.safeParse(p).success).toBe(true);
  });

  it("flags low-confidence name for review", async () => {
    const { profile } = await extractFromText({ text: CV, fileName: "cv.txt" });
    expect(needsReview(profile)).toContain("name");
  });

  it("never fabricates from empty text", async () => {
    const { profile } = await extractFromText({ text: "", fileName: "empty.txt" });
    expect(profile.name).toBeUndefined();
    expect(profile.email).toBeUndefined();
  });

  it("parses sections, experience and education from a realistic CV", async () => {
    const text = [
      "ISAAC GREGORY EDO",
      "Growth Strategy | Business Development | Customer Success",
      "isaacgregoryhq@gmail.com | +2349017901914 | Lagos, Nigeria",
      "PROFILE",
      "Growth leader with 8+ years across partnerships and revenue operations.",
      "EXPERIENCE",
      "Head of Growth, Kora (2022 - Present)",
      "Regional Manager, TradeDepot (2019 - 2022)",
      "EDUCATION",
      "B.Sc Economics, University of Lagos",
      "SKILLS",
      "Growth Strategy, Business Development, Customer Success",
    ].join("\n");
    const { profile } = await extractFromText({ text, fileName: "cv.txt" });
    expect(profile.name?.value).toBe("ISAAC GREGORY EDO");
    expect(profile.title?.value).toContain("Growth Strategy");
    expect(profile.experience.length).toBe(2);
    expect(profile.experience[0].startDate?.value).toBe("2022");
    expect(profile.education.length).toBeGreaterThan(0);
    expect(profile.skills.map((s) => s.value)).toEqual([
      "Growth Strategy",
      "Business Development",
      "Customer Success",
    ]);
  });
});
