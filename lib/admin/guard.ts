/**
 * Admin guard — PRD §56 requires strong protection. Rule:
 * - If ADMIN_API_TOKEN is set, requests must carry it (x-admin-token).
 * - If unset, only non-production is allowed, and the UI shows a warning
 *   banner. Production without a token denies everything.
 */
export function isAdminRequest(req: Request): boolean {
  const token = process.env.ADMIN_API_TOKEN;
  if (token && token.length > 0) {
    return req.headers.get("x-admin-token") === token;
  }
  return process.env.NODE_ENV !== "production";
}

export function adminBanner(): string | null {
  if (process.env.ADMIN_API_TOKEN) return null;
  if (process.env.NODE_ENV === "production") return "locked";
  return "open-dev";
}
