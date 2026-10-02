import { describe, expect, it } from "vitest";
import { isReservedSlug, toSlug } from "@/types/portfolio";

describe("slug", () => {
  it("lowercases and dasherizes", () => {
    expect(toSlug("Isaac Gregory")).toBe("isaac-gregory");
  });

  it("protects reserved words", () => {
    expect(isReservedSlug("admin")).toBe(true);
    expect(toSlug("admin")).toBe("u-admin");
  });
});
