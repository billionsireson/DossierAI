import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { demoPortfolios } from "@/lib/demo";
import type { Portfolio, PortfolioSection } from "@/types/portfolio";

export type PortfolioVersionRecord = {
  version: number;
  note?: string;
  data: Portfolio;
  createdAt: string;
};

type StoreShape = {
  portfolios: Portfolio[];
  versions: Record<string, PortfolioVersionRecord[]>;
};

function storeFile(): string {
  const name = process.env.PORTFOLIOS_FILE ?? "portfolios.json";
  return path.join(process.cwd(), "data", path.basename(name));
}

function seed(): StoreShape {
  const versions: Record<string, PortfolioVersionRecord[]> = {};
  for (const p of demoPortfolios) {
    versions[p.id] = [
      { version: p.version, note: "Seeded sample", data: p, createdAt: new Date().toISOString() },
    ];
  }
  return { portfolios: demoPortfolios, versions };
}

function load(): StoreShape {
  const file = storeFile();
  try {
    if (existsSync(file)) {
      const raw = JSON.parse(readFileSync(file, "utf8")) as StoreShape;
      if (Array.isArray(raw.portfolios)) return raw;
    }
  } catch {
    // Corrupt → reseed.
  }
  const seeded = seed();
  save(seeded);
  return seeded;
}

function save(shape: StoreShape): void {
  const file = storeFile();
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(shape, null, 2));
}

export function getPortfolio(id: string): Portfolio | null {
  return load().portfolios.find((p) => p.id === id) ?? null;
}

export function listPortfolios(): Portfolio[] {
  return load().portfolios;
}

export type PortfolioPatch = {
  profile?: Partial<Portfolio["profile"]>;
  theme?: Partial<Portfolio["theme"]>;
  socialLinks?: Portfolio["socialLinks"];
  sections?: PortfolioSection[];
  slug?: string;
};

/** Pure merge without persisting — lets callers validate before committing. */
export function buildUpdated(id: string, patch: PortfolioPatch): Portfolio | null {
  const current = load().portfolios.find((p) => p.id === id);
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

function commit(next: Portfolio, note?: string): Portfolio {
  const shape = load();
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
  save(shape);
  // TODO(Neon): persist Portfolio + PortfolioVersion via Prisma.
  return stamped;
}

/** Apply a partial update, bump version, snapshot. Caps history at 20. */
export function updatePortfolio(
  id: string,
  patch: PortfolioPatch,
  note?: string,
): Portfolio | null {
  const next = buildUpdated(id, patch);
  if (!next) return null;
  return commit(next, note);
}

export function listVersions(id: string): PortfolioVersionRecord[] {
  return load().versions[id] ?? [];
}
