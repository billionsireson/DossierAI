import { describe, expect, it } from "vitest";
import { StudioThemeSchema } from "@/lib/templates/studio";

describe("studio themes", () => {
  it("accepts a valid token set", () => {
    const r = StudioThemeSchema.safeParse({
      hero: "sunset",
      font: "serif",
      radius: "pill",
      accent: "#2E7CF6",
      darkSections: true,
    });
    expect(r.success).toBe(true);
  });

  it("rejects raw CSS and unknown variants", () => {
    expect(
      StudioThemeSchema.safeParse({
        hero: "midnight",
        font: "jakarta",
        radius: "soft",
        accent: "red; background: url(evil)",
        darkSections: false,
      }).success,
    ).toBe(false);
    expect(
      StudioThemeSchema.safeParse({
        hero: "hacker",
        font: "jakarta",
        radius: "soft",
        accent: "#FFFFFF",
        darkSections: false,
      }).success,
    ).toBe(false);
  });
});
