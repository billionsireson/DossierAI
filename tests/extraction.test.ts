import { describe, expect, it } from "vitest";
import { heuristicProvider } from "@/lib/ai/provider";
import { ExtractedProfileSchema, needsReview } from "@/types/extracted-profile";
import { extractFromText } from "@/lib/extraction/extract";

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
});
