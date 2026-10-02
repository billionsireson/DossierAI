import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { isAdminRequest, adminBanner } from "@/lib/admin/guard";

beforeEach(() => {
  vi.stubEnv("NODE_ENV", "development");
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("admin guard", () => {
  it("opens in dev without a token", () => {
    vi.stubEnv("NODE_ENV", "development");
    process.env.ADMIN_API_TOKEN = "";
    expect(isAdminRequest(new Request("http://x/"))).toBe(true);
    expect(adminBanner()).toBe("open-dev");
  });

  it("locks production without a token", () => {
    vi.stubEnv("NODE_ENV", "production");
    process.env.ADMIN_API_TOKEN = "";
    expect(isAdminRequest(new Request("http://x/"))).toBe(false);
    expect(adminBanner()).toBe("locked");
  });

  it("requires the token when set", () => {
    vi.stubEnv("NODE_ENV", "development");
    process.env.ADMIN_API_TOKEN = "s3cret";
    expect(isAdminRequest(new Request("http://x/"))).toBe(false);
    expect(
      isAdminRequest(new Request("http://x/", { headers: { "x-admin-token": "s3cret" } })),
    ).toBe(true);
    expect(adminBanner()).toBeNull();
  });
});
