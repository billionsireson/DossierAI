import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { demoPortfolios } from "@/lib/demo";
import { isDbConfigured } from "@/lib/env";
import { getDb } from "@/lib/db";
import { ensureDemoUser } from "@/lib/db/ensure";
import { toSlug } from "@/types/portfolio";
import type { Portfolio, PortfolioSection } from "@/types/portfolio";

export type PortfolioVersionRecord = {
  version: number;
  note?: string;
  data: Portfolio;
  createdAt: string;
};

export type PortfolioPatch = {
  profile?: Partial<Portfolio["profile"]>;
  theme?: Partial<Portfolio["theme"]>;
  socialLinks?: Portfolio["socialLinks"];
  sections?: PortfolioSection[];
  slug?: string;
};

function dbEnabled(): boolean { return isDbConfigured(); }

// ---------- File driver (dev without DB, and test path) ----------

type StoreShape = {
  portfolios: Portfolio[];
  versions: Record<string, PortfolioVersionRecord[]>;
};

function storeFile(): string {
  const name = process.env.PORTFOLIOS_FILE ?? "portfolios.json";
  return path.join(process.cwd(), "data", path.basename(name));
}

function seedShape(): StoreShape {
  const versions: Record<string, PortfolioVersionRecord[]> = {};
  for (const p of demoPortfolios) {
    versions[p.id] = [
      { version: p.version, note: "Seeded sample", data: p, createdAt: new Date().toISOString() },
    ];
  }
  return { portfolios: demoPortfolios, versions };
}

function loadFile(): StoreShape {
  const file = storeFile();
  try {
    if (existsSync(file)) {
      const raw = JSON.parse(readFileSync(file, "utf8")) as StoreShape;
      if (Array.isArray(raw.portfolios)) return raw;
    }
  } catch {
    // Corrupt → reseed.
  }
  const seeded = seedShape();
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(seeded, null, 2));
  return seeded;
}

function saveFile(shape: StoreShape): void {
  const file = storeFile();
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(shape, null, 2));
}

// ---------- Prisma driver (live Neon) ----------

async function ensureSeeded(): Promise<void> {
  const db = await getDb();
  const count = await db.portfolio.count();
  if (count > 0) {
    // One-time upgrade: thin seeds predate the full story data.
    const thin = await db.portfolio.findUnique({ where: { id: "demo-fintech" } });
    const data = thin?.data as unknown as Portfolio | undefined;
    const hasProjects = data?.sections?.some((s) => s.type === "projects");
    if (thin && !hasProjects) {
      const rich = demoPortfolios.find((p) => p.id === "demo-fintech")!;
      await db.portfolio.update({
        where: { id: rich.id },
        data: { data: rich as unknown as object, version: rich.version, slug: rich.slug },
      });
      await db.portfolioVersion.create({
        data: {
          portfolioId: rich.id,
          version: rich.version,
          data: rich as unknown as object,
          note: "Seeded full story sample",
        },
      });
    }
    return;
  }
  await ensureDemoUser();
  for (const p of demoPortfolios) {
    await db.portfolio.create({
      data: {
        id: p.id,
        userId: p.userId,
        slug: p.slug,
        data: p as unknown as object,
        version: p.version,
      },
    });
    await db.portfolioVersion.create({
      data: {
        portfolioId: p.id,
        version: p.version,
        data: p as unknown as object,
        note: "Seeded sample",
      },
    });
    if (p.publishing.status === "published") {
      await db.publication.create({
        data: {
          portfolioId: p.id,
          slug: p.slug,
          status: "PUBLISHED",
          publishingPlan: "FREE",
          publishedAt: p.publishing.publishedAt
            ? new Date(p.publishing.publishedAt)
            : new Date(),
        },
      });
    }
  }
}

function rowToPortfolio(row: {
  id: string;
  userId: string;
  slug: string;
  data: unknown;
  version: number;
}): Portfolio {
  return { ...(row.data as Portfolio), id: row.id, userId: row.userId, slug: row.slug, version: row.version };
}

// ---------- Public API (dual-path) ----------

export async function getPortfolio(id: string): Promise<Portfolio | null> {
  if (!dbEnabled()) return loadFile().portfolios.find((p) => p.id === id) ?? null;
  await ensureSeeded();
  const db = await getDb();
  const row = await db.portfolio.findUnique({ where: { id } });
  return row ? rowToPortfolio(row) : null;
}

export async function listPortfolios(userId?: string): Promise<Portfolio[]> {
  if (!dbEnabled()) {
    const all = loadFile().portfolios;
    return userId ? all.filter((p) => p.userId === userId) : all;
  }
  await ensureSeeded();
  const db = await getDb();
  const rows = await db.portfolio.findMany({
    where: userId ? { userId } : undefined,
    orderBy: { updatedAt: "desc" },
  });
  return rows.map(rowToPortfolio);
}

/** Pure merge without persisting — lets callers validate before committing. */
export async function buildUpdated(
  id: string,
  patch: PortfolioPatch,
): Promise<Portfolio | null> {
  const current = await getPortfolio(id);
  if (!current) return null;
  const defined = Object.fromEntries(
    Object.entries(patch).filter(([, v]) => v !== undefined),
  );
  return {
    ...current,
    ...defined,
    profile: { ...current.profile, ...(patch.profile ?? {}) },
    theme: { ...current.theme, ...(patch.theme ?? {}) },
  };
}

export async function updatePortfolio(
  id: string,
  patch: PortfolioPatch,
  note?: string,
): Promise<Portfolio | null> {
  const next = await buildUpdated(id, patch);
  if (!next) return null;
  if (!dbEnabled()) {
    const shape = loadFile();
    const idx = shape.portfolios.findIndex((p) => p.id === next.id);
    const stamped: Portfolio = { ...next, version: next.version + 1 };
    shape.portfolios[idx] = stamped;
    const history = shape.versions[next.id] ?? [];
    history.push({
      version: stamped.version,
      note,
      data: stamped,
      createdAt: new Date().toISOString(),
    });
    shape.versions[next.id] = history.slice(-20);
    saveFile(shape);
    return stamped;
  }
  const db = await getDb();
  const stamped: Portfolio = { ...next, version: next.version + 1 };
  await db.portfolio.update({
    where: { id },
    data: {
      slug: stamped.slug,
      data: stamped as unknown as object,
      version: stamped.version,
    },
  });
  await db.portfolioVersion.create({
    data: {
      portfolioId: id,
      version: stamped.version,
      data: stamped as unknown as object,
      note,
    },
  });
  const old = await db.portfolioVersion.findMany({
    where: { portfolioId: id },
    orderBy: { version: "desc" },
    select: { id: true },
  });
  const drop = old.slice(20);
  if (drop.length > 0) {
    await db.portfolioVersion.deleteMany({ where: { id: { in: drop.map((d) => d.id) } } });
  }
  return stamped;
}

export async function listVersions(id: string): Promise<PortfolioVersionRecord[]> {
  if (!dbEnabled()) return loadFile().versions[id] ?? [];
  const db = await getDb();
  const rows = await db.portfolioVersion.findMany({
    where: { portfolioId: id },
    orderBy: { version: "asc" },
  });
  return rows.map((r) => ({
    version: r.version,
    note: r.note ?? undefined,
    data: r.data as unknown as Portfolio,
    createdAt: r.createdAt.toISOString(),
  }));
}

/** Unique portfolio slug, suffixing on collision (repeat generations). */
export async function ensureUniquePortfolioSlug(base: string): Promise<string> {
  let slug = toSlug(base);
  if (!dbEnabled()) return slug;
  const db = await getDb();
  let n = 2;
  while (await db.portfolio.findUnique({ where: { slug } })) {
    slug = toSlug(`${base}-${n}`);
    n += 1;
    if (n > 100) throw new Error("Could not allocate a unique slug.");
  }
  return slug;
}

/** Persist a freshly generated portfolio as version 1. */
export async function createPortfolio(portfolio: Portfolio): Promise<Portfolio> {
  if (!dbEnabled()) {
    const shape = loadFile();
    shape.portfolios.push(portfolio);
    shape.versions[portfolio.id] = [
      {
        version: portfolio.version,
        note: "AI generated",
        data: portfolio,
        createdAt: new Date().toISOString(),
      },
    ];
    saveFile(shape);
    return portfolio;
  }
  const db = await getDb();
  await db.portfolio.create({
    data: {
      id: portfolio.id,
      userId: portfolio.userId,
      slug: portfolio.slug,
      data: portfolio as unknown as object,
      version: portfolio.version,
    },
  });
  await db.portfolioVersion.create({
    data: {
      portfolioId: portfolio.id,
      version: portfolio.version,
      data: portfolio as unknown as object,
      note: "AI generated",
    },
  });
  return portfolio;
}
