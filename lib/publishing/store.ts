import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { demoPortfolios } from "@/lib/demo";
import { toSlug } from "@/types/portfolio";

export type PublicationRecord = {
  portfolioId: string;
  slug: string;
  status: "draft" | "published" | "unpublished";
  publishedAt?: string;
};

/**
 * M8 publishing store. File-backed JSON so publications are visible across
 * route modules (dev code-splitting) and server restarts. Prisma-backed
 * persistence replaces this once Neon is wired (docs/database.md).
 */
function storeFile(): string {
  const name = process.env.PUBLICATIONS_FILE ?? "publications.json";
  return path.join(process.cwd(), "data", path.basename(name));
}

function seed(): PublicationRecord[] {
  return demoPortfolios
    .filter((p) => p.publishing.status === "published")
    .map((p) => ({
      portfolioId: p.id,
      slug: p.slug,
      status: "published" as const,
      publishedAt: p.publishing.publishedAt,
    }));
}

function load(): PublicationRecord[] {
  const file = storeFile();
  try {
    if (existsSync(file)) {
      const raw = JSON.parse(readFileSync(file, "utf8")) as PublicationRecord[];
      if (Array.isArray(raw)) return raw;
    }
  } catch {
    // Corrupt file → reseed below.
  }
  const seeded = seed();
  save(seeded);
  return seeded;
}

function save(records: PublicationRecord[]): void {
  const file = storeFile();
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(records, null, 2));
}

function slugTaken(
  records: PublicationRecord[],
  slug: string,
  excludeId?: string,
): boolean {
  if (records.some((r) => r.slug === slug && r.portfolioId !== excludeId)) {
    return true;
  }
  return demoPortfolios.some((p) => p.slug === slug && p.id !== excludeId);
}

export function uniqueSlug(base: string, excludeId?: string): string {
  const records = load();
  let slug = toSlug(base);
  let n = 2;
  while (slugTaken(records, slug, excludeId)) {
    slug = toSlug(`${base}-${n}`);
    n += 1;
    if (n > 100) throw new Error("Could not allocate a unique slug.");
  }
  return slug;
}

export function publish(portfolioId: string, requestedSlug?: string) {
  const records = load();
  const base =
    requestedSlug ??
    records.find((r) => r.portfolioId === portfolioId)?.slug ??
    demoPortfolios.find((p) => p.id === portfolioId)?.slug ??
    portfolioId;
  const slug = uniqueSlug(base, portfolioId);
  const record: PublicationRecord = {
    portfolioId,
    slug,
    status: "published",
    publishedAt: new Date().toISOString(),
  };
  save([...records.filter((r) => r.portfolioId !== portfolioId), record]);
  // TODO(Neon): upsert Publication + portfolio slug via Prisma.
  return record;
}

export function unpublish(portfolioId: string) {
  const records = load();
  const existing = records.find((r) => r.portfolioId === portfolioId);
  const record = existing
    ? { ...existing, status: "unpublished" as const }
    : { portfolioId, slug: uniqueSlug(portfolioId), status: "unpublished" as const };
  save([...records.filter((r) => r.portfolioId !== portfolioId), record]);
  return record;
}

export function getPublicationBySlug(slug: string) {
  const record = load().find((r) => r.slug === slug && r.status === "published");
  return record ?? null;
}

export function getPublication(portfolioId: string) {
  return load().find((r) => r.portfolioId === portfolioId) ?? null;
}
