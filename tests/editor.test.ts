import { beforeEach, describe, expect, it, vi } from "vitest";
import { getPortfolio, listPortfolios, updatePortfolio, listVersions } from "@/lib/portfolio/store";

beforeEach(() => {
  vi.stubEnv("PORTFOLIOS_FILE", "portfolios.test.json");
});

describe("portfolio store", () => {
  it("seeds from demo data", () => {
    expect(listPortfolios().length).toBeGreaterThan(0);
    expect(getPortfolio("demo-fintech")?.profile.name).toBe("Esther Okafor");
  });

  it("updates, bumps version and snapshots", () => {
    const before = getPortfolio("demo-fintech")!;
    const next = updatePortfolio("demo-fintech", { profile: { name: "Test Name" } }, "test save");
    expect(next?.profile.name).toBe("Test Name");
    expect(next?.version).toBe(before.version + 1);
    expect(listVersions("demo-fintech").length).toBeGreaterThan(1);
    // Restore
    updatePortfolio("demo-fintech", { profile: { name: before.profile.name } }, "restore");
  });

  it("returns null for unknown ids", () => {
    expect(getPortfolio("nope")).toBeNull();
    expect(updatePortfolio("nope", {}, "x")).toBeNull();
  });
});
