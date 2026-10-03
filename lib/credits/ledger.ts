import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { isDbConfigured } from "@/lib/env";
import { getDb } from "@/lib/db";
import { CREDIT_COSTS, type CreditAction } from "@/lib/billing/plans";

// Immutable credit ledger — PRD §27. Balance derives from transactions.
// Live Neon path when DATABASE_URL is set, file driver otherwise (tests/dev).

export type CreditTxType =
  | "purchase"
  | "subscription_grant"
  | "generation"
  | "ai_rewrite"
  | "refund"
  | "bonus"
  | "admin_adjustment";

export type CreditTransaction = {
  id: string;
  userId: string;
  type: CreditTxType;
  amount: number; // +grant, -spend
  referenceType?: string;
  referenceId?: string;
  createdAt: string;
};

function dbEnabled(): boolean { return isDbConfigured(); }

function ledgerFile(): string {
  const name = process.env.CREDIT_LEDGER_FILE ?? "credits.json";
  return path.join(process.cwd(), "data", path.basename(name));
}

function loadFile(): CreditTransaction[] {
  const file = ledgerFile();
  try {
    if (existsSync(file)) {
      const raw = JSON.parse(readFileSync(file, "utf8")) as CreditTransaction[];
      if (Array.isArray(raw)) return raw;
    }
  } catch {
    // Corrupt → start empty.
  }
  return [];
}

function saveFile(txs: CreditTransaction[]): void {
  const file = ledgerFile();
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(txs, null, 2));
}

type DbRow = {
  id: string;
  userId: string;
  type: string;
  amount: number;
  referenceType: string | null;
  referenceId: string | null;
  createdAt: Date;
};

function toTx(r: DbRow): CreditTransaction {
  return {
    id: r.id,
    userId: r.userId,
    type: r.type as CreditTxType,
    amount: r.amount,
    referenceType: r.referenceType ?? undefined,
    referenceId: r.referenceId ?? undefined,
    createdAt: r.createdAt.toISOString(),
  };
}

export async function balance(userId: string): Promise<number> {
  if (!dbEnabled()) {
    return loadFile()
      .filter((t) => t.userId === userId)
      .reduce((sum, t) => sum + t.amount, 0);
  }
  const db = await getDb();
  const rows = await db.creditTransaction.findMany({ where: { userId } });
  return rows.reduce((sum, t) => sum + t.amount, 0);
}

export async function history(userId: string, limit = 20): Promise<CreditTransaction[]> {
  if (!dbEnabled()) {
    return loadFile()
      .filter((t) => t.userId === userId)
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      .slice(0, limit);
  }
  const db = await getDb();
  const rows = await db.creditTransaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  return rows.map(toTx);
}

async function append(
  tx: Omit<CreditTransaction, "id" | "createdAt">,
): Promise<CreditTransaction> {
  if (!dbEnabled()) {
    const txs = loadFile();
    const record: CreditTransaction = {
      ...tx,
      id: `ctx_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
    };
    txs.push(record);
    saveFile(txs);
    return record;
  }
  const db = await getDb();
  const row = await db.creditTransaction.create({
    data: {
      userId: tx.userId,
      type: tx.type,
      amount: tx.amount,
      referenceType: tx.referenceType,
      referenceId: tx.referenceId,
    },
  });
  return toTx(row);
}

export async function grant(
  userId: string,
  amount: number,
  type: Extract<CreditTxType, "subscription_grant" | "purchase" | "bonus" | "admin_adjustment">,
  referenceId?: string,
): Promise<CreditTransaction> {
  if (amount <= 0) throw new Error("Grant amount must be positive.");
  return append({ userId, type, amount, referenceId });
}

/** Spend credits for an AI action. Returns null when balance is insufficient. */
export async function spend(
  userId: string,
  action: CreditAction,
  referenceId?: string,
): Promise<{ ok: true; tx: CreditTransaction } | { ok: false; needed: number; balance: number }> {
  const cost = CREDIT_COSTS[action];
  const current = await balance(userId);
  if (current < cost) return { ok: false, needed: cost, balance: current };
  const tx = await append({
    userId,
    type: action === "generation" ? "generation" : "ai_rewrite",
    amount: -cost,
    referenceType: "ai_action",
    referenceId,
  });
  return { ok: true, tx };
}

/** Entitlement: can this plan use this template? */
export function canUseTemplate(planTemplates: string[], templateId: string): boolean {
  return planTemplates.includes(templateId);
}
