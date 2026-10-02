import { beforeEach, describe, expect, it, vi } from "vitest";
import { publish, unpublish, getPublicationBySlug, uniqueSlug } from "@/lib/publishing/store";

beforeEach(() => {
  vi.stubEnv("PUBLICATIONS_FILE", ".publications.test.json");
});

describe("publishing", () => {
  it("publishes with a unique URL-safe slug", () => {
    const r = publish("test-portfolio-1", "Ada Lovelace");
    expect(r.slug).toBe("ada-lovelace");
    expect(r.status).toBe("published");
    expect(getPublicationBySlug("ada-lovelace")?.portfolioId).toBe("test-portfolio-1");
  });

  it("dedupes colliding slugs", () => {
    const a = publish("test-portfolio-a", "Same Name");
    const b = publish("test-portfolio-b", "Same Name");
    expect(a.slug).not.toBe(b.slug);
  });

  it("unpublishes", () => {
    publish("test-portfolio-u", "Temp Name");
    unpublish("test-portfolio-u");
    expect(getPublicationBySlug("temp-name")).toBeNull();
  });

  it("protects reserved words", () => {
    expect(uniqueSlug("admin")).not.toBe("admin");
  });
});
