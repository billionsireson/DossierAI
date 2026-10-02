import { describe, expect, it, beforeEach } from "vitest";
import { __resetBuckets, checkRateLimit } from "@/lib/security/rate-limit";

beforeEach(() => {
  __resetBuckets();
});

describe("rate limiter", () => {
  it("allows up to the limit then refuses with retry-after", () => {
    for (let i = 0; i < 10; i++) {
      expect(checkRateLimit("test-key", "ai").ok).toBe(true);
    }
    const r = checkRateLimit("test-key", "ai");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.retryAfterSec).toBeGreaterThan(0);
  });

  it("isolates keys", () => {
    for (let i = 0; i < 10; i++) checkRateLimit("key-a", "ai");
    expect(checkRateLimit("key-b", "ai").ok).toBe(true);
  });
});
