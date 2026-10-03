import { rmSync } from "fs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { publish, unpublish, getPublicationBySlug, uniqueSlug } from "@/lib/publishing/store";

beforeEach(() => {
  rmSync("data/publications.test.json", { force: true });
  vi.stubEnv("PUBLICATIONS_FILE", "publications.test.json");
});

describe("publishing", () => {
  it("publishes with a unique URL-safe slug", async () => {
    const r = await publish("test-portfolio-1", "Ada Lovelace");
    expect(r.slug).toBe("ada-lovelace");
    expect(r.status).toBe("published");
    expect((await getPublicationBySlug("ada-lovelace"))?.portfolioId).toBe("test-portfolio-1");
  });

  it("dedupes colliding slugs", async () => {
    const a = await publish("test-portfolio-a", "Same Name");
    const b = await publish("test-portfolio-b", "Same Name");
    expect(a.slug).not.toBe(b.slug);
  });

  it("unpublishes", async () => {
    await publish("test-portfolio-u", "Temp Name");
    await unpublish("test-portfolio-u");
    expect(await getPublicationBySlug("temp-name")).toBeNull();
  });

  it("protects reserved words", async () => {
    expect(await uniqueSlug("admin")).not.toBe("admin");
  });
});
