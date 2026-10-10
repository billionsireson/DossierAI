import { getDb } from "@/lib/db";
import { isDbConfigured } from "@/lib/env";
import { CODE_TEMPLATES, type TemplateRow } from "@/lib/templates/studio";

// Admin-managed templates live in Postgres; file/memory fallback otherwise.
let memory: TemplateRow[] | null = null;

async function ensureSeeded(): Promise<void> {
  if (!isDbConfigured()) {
    memory ??= CODE_TEMPLATES.map((t) => ({ ...t, active: true }));
    return;
  }
  const db = await getDb();
  for (const t of CODE_TEMPLATES) {
    await db.template.upsert({
      where: { key: t.key },
      update: {},
      create: { key: t.key, name: t.name, plans: t.plans, active: true },
    });
  }
}

function rowToTemplate(r: {
  key: string;
  name: string;
  plans: string[];
  theme: unknown;
  active: boolean;
}): TemplateRow {
  return {
    key: r.key,
    name: r.name,
    plans: r.plans,
    theme: (r.theme as TemplateRow["theme"]) ?? null,
    active: r.active,
  };
}

export async function listTemplates(): Promise<TemplateRow[]> {
  await ensureSeeded();
  if (!isDbConfigured()) return memory ?? [];
  const db = await getDb();
  return (await db.template.findMany({ orderBy: { name: "asc" } })).map(rowToTemplate);
}

export async function getTemplate(key: string): Promise<TemplateRow | null> {
  await ensureSeeded();
  if (!isDbConfigured()) return memory?.find((t) => t.key === key) ?? null;
  const db = await getDb();
  const row = await db.template.findUnique({ where: { key } });
  return row ? rowToTemplate(row) : null;
}

export async function saveTemplate(
  key: string,
  patch: Partial<Pick<TemplateRow, "name" | "plans" | "theme" | "active">>,
): Promise<TemplateRow | null> {
  await ensureSeeded();
  if (!isDbConfigured()) {
    if (!memory) return null;
    const idx = memory.findIndex((t) => t.key === key);
    if (idx < 0) return null;
    memory[idx] = { ...memory[idx], ...patch };
    return memory[idx];
  }
  const db = await getDb();
  const existing = await db.template.findUnique({ where: { key } });
  if (!existing) return null;
  const row = await db.template.update({
    where: { key },
    data: {
      ...(patch.name !== undefined ? { name: patch.name } : {}),
      ...(patch.plans !== undefined ? { plans: patch.plans } : {}),
      ...(patch.theme !== undefined ? { theme: patch.theme as object } : {}),
      ...(patch.active !== undefined ? { active: patch.active } : {}),
    },
  });
  return rowToTemplate(row);
}

export async function createTemplateRow(args: {
  key: string;
  name: string;
  plans: string[];
  theme: TemplateRow["theme"];
}): Promise<TemplateRow> {
  await ensureSeeded();
  if (!isDbConfigured()) {
    const row: TemplateRow = { ...args, active: true };
    memory = [...(memory ?? []), row];
    return row;
  }
  const db = await getDb();
  const row = await db.template.create({
    data: { key: args.key, name: args.name, plans: args.plans, theme: args.theme as object, active: true },
  });
  return rowToTemplate(row);
}
