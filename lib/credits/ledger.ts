import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { CREDIT_COSTS, type CreditAction } from "@/lib/billing/plans";

// Immutable credit ledger — PRD §27. Balance derives from transactions.
// Prisma-backed persistence replaces the file driver once Neon is wired.

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

function ledgerFile(): string {
  const name = process.env.CREDIT_LEDGER_FILE ?? "credits.json";
  return path.join(process.cwd(), "data", path.basename(name));
}

function load(): CreditTransaction[] {
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

function save(txs: CreditTransaction[]): void {
  const file = ledgerFile();
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(txs, null, 2));
}

export function balance(userId: string): number {
  return load()
    .filter((t) => t.userId === userId)
    .reduce((sum, t) => sum + t.amount, 0);
}

export function history(userId: string, limit = 20): CreditTransaction[] {
  return load()
    .filter((t) => t.userId === userId)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, limit);
}

function append(tx: Omit<CreditTransaction, "id" | "createdAt">): CreditTransaction {
  const txs = load();
  const record: CreditTransaction = {
    ...tx,
    id: `ctx_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  txs.push(record);
  save(txs);
  return record;
}

export function grant(
  userId: string,
  amount: number,
  type: Extract<CreditTxType, "subscription_grant" | "purchase" | "bonus" | "admin_adjustment">,
  referenceId?: string,
): CreditTransaction {
  if (amount <= 0) throw new Error("Grant amount must be positive.");
  return append({ userId, type, amount, referenceId });
}

/** Spend credits for an AI action. Returns null when balance is insufficient. */
export function spend(
  userId: string,
  action: CreditAction,
  referenceId?: string,
): { ok: true; tx: CreditTransaction } | { ok: false; needed: number; balance: number } {
  const cost = CREDIT_COSTS[action];
  const current = balance(userId);
  if (current < cost) return { ok: false, needed: cost, balance: current };
  const tx = append({
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
