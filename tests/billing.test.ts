import { rmSync } from "fs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { balance, grant, spend, history, canUseTemplate, shouldRefill } from "@/lib/credits/ledger";
import { FREE_REFILL_CREDITS, PLANS } from "@/lib/billing/plans";

beforeEach(() => {
  rmSync("data/credits.test.json", { force: true });
  vi.stubEnv("CREDIT_LEDGER_FILE", "credits.test.json");
});

describe("credit ledger", () => {
  it("derives balance from the immutable ledger", async () => {
    await grant("u-credits-1", 10, "subscription_grant");
    expect(await balance("u-credits-1")).toBe(10);
    const r = await spend("u-credits-1", "generation");
    expect(r.ok).toBe(true);
    expect(await balance("u-credits-1")).toBe(9);
  });

  it("refills instead of refusing overspend, and records it", async () => {
    const r = await spend("u-credits-broke", "generation");
    expect(r.ok).toBe(true);
    const txs = await history("u-credits-broke");
    expect(txs.some((t) => t.type === "auto_refill")).toBe(true);
  });

  it("rejects non-positive grants", async () => {
    await expect(grant("u-credits-2", 0, "bonus")).rejects.toThrow();
  });

  it("refills an empty wallet automatically (15 per 12h)", async () => {
    const r = await spend("u-credits-refill", "generation");
    expect(r.ok).toBe(true);
    expect(await balance("u-credits-refill")).toBe(FREE_REFILL_CREDITS - 1);
  });

  it("does not refill twice within 12 hours", () => {
    const now = Date.now();
    const twelveAgo = new Date(now - 12 * 3_600_000).toISOString();
    const elevenAgo = new Date(now - 11 * 3_600_000).toISOString();
    expect(shouldRefill([], now)).toBe(true);
    expect(
      shouldRefill([{ type: "auto_refill", createdAt: new Date(now).toISOString() }], now),
    ).toBe(false);
    expect(
      shouldRefill([{ type: "auto_refill", createdAt: elevenAgo }], now),
    ).toBe(false);
    expect(
      shouldRefill([{ type: "auto_refill", createdAt: twelveAgo }], now + 1),
    ).toBe(true);
  });

  it("gates premium templates by plan", () => {
    expect(canUseTemplate(PLANS.FREE.templates, "modern-professional")).toBe(true);
    expect(canUseTemplate(PLANS.FREE.templates, "tech-developer")).toBe(false);
    expect(canUseTemplate(PLANS.PREMIUM.templates, "tech-developer")).toBe(true);
  });
});
