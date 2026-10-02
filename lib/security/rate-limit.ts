// Simple in-memory token bucket — PRD §57 abuse prevention.
// Per-process, suitable pre-Redis. Resets on restart; strict enough for MVP.

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export type RateLimit = { limit: number; windowMs: number };

export const RATE_LIMITS: Record<string, RateLimit> = {
  upload: { limit: 20, windowMs: 60_000 },
  ai: { limit: 10, windowMs: 60_000 },
  publish: { limit: 30, windowMs: 60_000 },
  default: { limit: 60, windowMs: 60_000 },
};

export function checkRateLimit(
  key: string,
  kind: keyof typeof RATE_LIMITS = "default",
  now = Date.now(),
): { ok: true } | { ok: false; retryAfterSec: number } {
  const { limit, windowMs } = RATE_LIMITS[kind];
  const bucket = buckets.get(key);
  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }
  if (bucket.count < limit) {
    bucket.count += 1;
    return { ok: true };
  }
  return { ok: false, retryAfterSec: Math.ceil((bucket.resetAt - now) / 1000) };
}

export function rateLimitKey(req: Request, scope: string): string {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  return `${scope}:${ip}`;
}

/** Test hook — do not use in routes. */
export function __resetBuckets(): void {
  buckets.clear();
}
