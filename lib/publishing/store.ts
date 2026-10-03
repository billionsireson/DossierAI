import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { isDbConfigured } from "@/lib/env";
import { getDb } from "@/lib/db";
import { toSlug } from "@/types/portfolio";

export type PublicationRecord = {
  portfolioId: string;
  slug: string;
  status: "draft" | "published" | "unpublished";
  publishedAt?: string;
};

function dbEnabled(): boolean { return isDbConfigured(); }

// ---------- File driver ----------

function storeFile(): string {
  const name = process.env.PUBLICATIONS_FILE ?? "publications.json";
  return path.join(process.cwd(), "data", path.basename(name));
}

function loadFile(): PublicationRecord[] {
  const file = storeFile();
  try {
    if (existsSync(file)) {
      const raw = JSON.parse(readFileSync(file, "utf8")) as PublicationRecord[];
      if (Array.isArray(raw)) return raw;
    }
  } catch {
    // Corrupt → start empty (portfolio store seeds demo publications).
  }
  return [];
}

function saveFile(records: PublicationRecord[]): void {
  const file = storeFile();
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(records, null, 2));
}

// ---------- Shared ----------

async function portfolioSlugs(): Promise<{ id: string; slug: string }[]> {
  if (!dbEnabled()) {
    const { listPortfolios } = await import("@/lib/portfolio/store");
    return (await listPortfolios()).map((p) => ({ id: p.id, slug: p.slug }));
  }
  const db = await getDb();
  return db.portfolio.findMany({ select: { id: true, slug: true } });
}

function slugTaken(
  records: PublicationRecord[],
  others: { id: string; slug: string }[],
  slug: string,
  excludeId?: string,
): boolean {
  if (records.some((r) => r.slug === slug && r.portfolioId !== excludeId)) return true;
  return others.some((p) => p.slug === slug && p.id !== excludeId);
}

export async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  const [records, others] = dbEnabled()
    ? await (async () => {
        const db = await getDb();
        const pubs = await db.publication.findMany();
        return [
          pubs.map((p) => ({
            portfolioId: p.portfolioId,
            slug: p.slug,
            status: p.status.toLowerCase() as PublicationRecord["status"],
            publishedAt: p.publishedAt?.toISOString(),
          })),
          await portfolioSlugs(),
        ] as const;
      })()
    : [loadFile(), await portfolioSlugs()];
  let slug = toSlug(base);
  let n = 2;
  while (slugTaken(records, others, slug, excludeId)) {
    slug = toSlug(`${base}-${n}`);
    n += 1;
    if (n > 100) throw new Error("Could not allocate a unique slug.");
  }
  return slug;
}

export async function publish(portfolioId: string, requestedSlug?: string) {
  if (!dbEnabled()) {
    const records = loadFile();
    const { listPortfolios } = await import("@/lib/portfolio/store");
    const base =
      requestedSlug ??
      records.find((r) => r.portfolioId === portfolioId)?.slug ??
      (await listPortfolios()).find((p) => p.id === portfolioId)?.slug ??
      portfolioId;
    const slug = await uniqueSlug(base, portfolioId);
    const record: PublicationRecord = {
      portfolioId,
      slug,
      status: "published",
      publishedAt: new Date().toISOString(),
    };
    saveFile([...records.filter((r) => r.portfolioId !== portfolioId), record]);
    return record;
  }
  const db = await getDb();
  const existing = await db.publication.findUnique({ where: { portfolioId } });
  const portfolio = await db.portfolio.findUnique({ where: { id: portfolioId } });
  const base = requestedSlug ?? existing?.slug ?? portfolio?.slug ?? portfolioId;
  const slug = await uniqueSlug(base, portfolioId);
  const record = await db.publication.upsert({
    where: { portfolioId },
    update: { slug, status: "PUBLISHED", publishedAt: new Date() },
    create: {
      portfolioId,
      slug,
      status: "PUBLISHED",
      publishingPlan: "FREE",
      publishedAt: new Date(),
    },
  });
  await db.portfolio.updateMany({ where: { id: portfolioId }, data: { slug } });
  return {
    portfolioId,
    slug: record.slug,
    status: "published" as const,
    publishedAt: record.publishedAt?.toISOString(),
  };
}

export async function unpublish(portfolioId: string) {
  if (!dbEnabled()) {
    const records = loadFile();
    const existing = records.find((r) => r.portfolioId === portfolioId);
    const record = existing
      ? { ...existing, status: "unpublished" as const }
      : { portfolioId, slug: await uniqueSlug(portfolioId), status: "unpublished" as const };
    saveFile([...records.filter((r) => r.portfolioId !== portfolioId), record]);
    return record;
  }
  const db = await getDb();
  const existing = await db.publication.findUnique({ where: { portfolioId } });
  if (!existing) {
    return { portfolioId, slug: await uniqueSlug(portfolioId), status: "unpublished" as const };
  }
  const record = await db.publication.update({
    where: { portfolioId },
    data: { status: "UNPUBLISHED" },
  });
  return {
    portfolioId,
    slug: record.slug,
    status: "unpublished" as const,
    publishedAt: record.publishedAt?.toISOString(),
  };
}

export async function getPublicationBySlug(slug: string) {
  if (!dbEnabled()) {
    return loadFile().find((r) => r.slug === slug && r.status === "published") ?? null;
  }
  const db = await getDb();
  const record = await db.publication.findUnique({ where: { slug } });
  if (!record || record.status !== "PUBLISHED") return null;
  return {
    portfolioId: record.portfolioId,
    slug: record.slug,
    status: "published" as const,
    publishedAt: record.publishedAt?.toISOString(),
  };
}

export async function getPublication(portfolioId: string) {
  if (!dbEnabled()) {
    return loadFile().find((r) => r.portfolioId === portfolioId) ?? null;
  }
  const db = await getDb();
  const record = await db.publication.findUnique({ where: { portfolioId } });
  if (!record) return null;
  return {
    portfolioId: record.portfolioId,
    slug: record.slug,
    status: record.status.toLowerCase() as PublicationRecord["status"],
    publishedAt: record.publishedAt?.toISOString(),
  };
}
