import { rmSync } from "fs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { balance, grant, spend, history, canUseTemplate } from "@/lib/credits/ledger";
import { PLANS } from "@/lib/billing/plans";

beforeEach(() => {
  rmSync("data/credits.test.json", { force: true });
  vi.stubEnv("CREDIT_LEDGER_FILE", "credits.test.json");
});

describe("credit ledger", () => {
  it("derives balance from the immutable ledger", () => {
    grant("u-credits-1", 10, "subscription_grant");
    expect(balance("u-credits-1")).toBe(10);
    const r = spend("u-credits-1", "generation");
    expect(r.ok).toBe(true);
    expect(balance("u-credits-1")).toBe(9);
  });

  it("refuses overspend without mutating", () => {
    const r = spend("u-credits-broke", "generation");
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.needed).toBe(1);
      expect(r.balance).toBe(0);
    }
    expect(history("u-credits-broke")).toEqual([]);
  });

  it("rejects non-positive grants", () => {
    expect(() => grant("u-credits-2", 0, "bonus")).toThrow();
  });

  it("gates premium templates by plan", () => {
    expect(canUseTemplate(PLANS.FREE.templates, "modern-professional")).toBe(true);
    expect(canUseTemplate(PLANS.FREE.templates, "tech-developer")).toBe(false);
    expect(canUseTemplate(PLANS.PREMIUM.templates, "tech-developer")).toBe(true);
  });
});
