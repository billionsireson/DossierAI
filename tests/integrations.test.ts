import { createHmac } from "crypto";
import { describe, expect, it, vi } from "vitest";
import { verifyPaystackSignature, verifyKoraSignature } from "@/lib/payments/provider";
import { getProvider } from "@/lib/ai/provider";

describe("payment webhooks", () => {
  it("accepts a correctly signed Paystack payload", () => {
    vi.stubEnv("PAYSTACK_SECRET_KEY", "test-secret");
    const body = JSON.stringify({ event: "charge.success" });
    const sig = createHmac("sha512", "test-secret").update(body).digest("hex");
    expect(verifyPaystackSignature(body, sig)).toBe(true);
    expect(verifyPaystackSignature(body, "deadbeef")).toBe(false);
    expect(verifyPaystackSignature(body, null)).toBe(false);
  });

  it("rejects Kora payloads without a secret", () => {
    vi.stubEnv("KORA_SECRET_KEY", "");
    vi.stubEnv("KORA_WEBHOOK_SECRET", "");
    expect(verifyKoraSignature("{}", "abc")).toBe(false);
  });
});

describe("AI provider selection", () => {
  it("uses the heuristic without a key", () => {
    vi.stubEnv("AI_PROVIDER_API_KEY", "");
    expect(getProvider().name).toBe("heuristic");
  });
});
