/**
 * Minimal env validation for Milestone 0.
 * Keeps server boot safe when optional providers are not configured yet.
 * Full zod-based validation lands with Prisma + Auth wiring.
 */

function required(name: string, value: string | undefined, opts?: { public?: boolean }): string {
  if (!value || value.length === 0) {
    if (process.env.NODE_ENV === "production" && !opts?.public) {
      throw new Error(`Missing required environment variable: ${name}`);
    }
    return "";
  }
  return value;
}

export const env = {
  DATABASE_URL: required("DATABASE_URL", process.env.DATABASE_URL),
  AUTH_SECRET: required("AUTH_SECRET", process.env.AUTH_SECRET),
  AI_PROVIDER_API_KEY: required(
    "AI_PROVIDER_API_KEY",
    process.env.AI_PROVIDER_API_KEY ?? process.env.AI_API_KEY,
  ),
  STORAGE_ENDPOINT: required("STORAGE_ENDPOINT", process.env.STORAGE_ENDPOINT),
  STORAGE_BUCKET: required("STORAGE_BUCKET", process.env.STORAGE_BUCKET),
  STORAGE_ACCESS_KEY: required("STORAGE_ACCESS_KEY", process.env.STORAGE_ACCESS_KEY),
  STORAGE_SECRET_KEY: required("STORAGE_SECRET_KEY", process.env.STORAGE_SECRET_KEY),
  NEXT_PUBLIC_APP_URL:
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
};

export function isDbConfigured(): boolean {
  return env.DATABASE_URL.length > 0;
}
