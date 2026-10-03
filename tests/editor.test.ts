import { rmSync } from "fs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getPortfolio, listPortfolios, updatePortfolio, listVersions } from "@/lib/portfolio/store";

beforeEach(() => {
  rmSync("data/portfolios.test.json", { force: true });
  vi.stubEnv("PORTFOLIOS_FILE", "portfolios.test.json");
});

describe("portfolio store", () => {
  it("seeds from demo data", async () => {
    expect((await listPortfolios()).length).toBeGreaterThan(0);
    expect((await getPortfolio("demo-fintech"))?.profile.name).toBe("Esther Okafor");
  });

  it("updates, bumps version and snapshots", async () => {
    const before = (await getPortfolio("demo-fintech"))!;
    const next = await updatePortfolio("demo-fintech", { profile: { name: "Test Name" } }, "test save");
    expect(next?.profile.name).toBe("Test Name");
    expect(next?.version).toBe(before.version + 1);
    expect((await listVersions("demo-fintech")).length).toBeGreaterThan(1);
    // Restore
    await updatePortfolio("demo-fintech", { profile: { name: before.profile.name } }, "restore");
  });

  it("returns null for unknown ids", async () => {
    expect(await getPortfolio("nope")).toBeNull();
    expect(await updatePortfolio("nope", {}, "x")).toBeNull();
  });
});
