"use client";

import { useEffect, useState } from "react";
import type { TemplateRow } from "@/lib/templates/studio";
import { PLAN_IDS } from "@/lib/templates/studio";

const HEROES = ["midnight", "royal", "sunset", "forest", "mono"] as const;
const FONTS = ["jakarta", "serif", "mono"] as const;
const RADII = ["soft", "sharp", "pill"] as const;

function ThemeEditor({
  value,
  onChange,
}: {
  value: { hero: string; font: string; radius: string; accent: string; darkSections: boolean };
  onChange: (v: { hero: string; font: string; radius: string; accent: string; darkSections: boolean }) => void;
}) {
  const sel = "rounded-lg border border-[#E2E8F0] px-2 py-1.5 text-sm";
  return (
    <div className="mt-2 grid gap-2 rounded-xl bg-[#F7FAFC] p-3 text-sm sm:grid-cols-2">
      <label className="flex flex-col gap-1">
        Hero
        <select className={sel} value={value.hero} onChange={(e) => onChange({ ...value, hero: e.target.value })}>
          {HEROES.map((h) => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1">
        Font
        <select className={sel} value={value.font} onChange={(e) => onChange({ ...value, font: e.target.value })}>
          {FONTS.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1">
        Corners
        <select className={sel} value={value.radius} onChange={(e) => onChange({ ...value, radius: e.target.value })}>
          {RADII.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1">
        Accent
        <span className="flex items-center gap-2">
          <input
            type="color"
            value={value.accent}
            onChange={(e) => onChange({ ...value, accent: e.target.value })}
            className="h-9 w-12 cursor-pointer rounded border border-[#E2E8F0]"
          />
          <code className="text-xs">{value.accent}</code>
        </span>
      </label>
      <label className="flex items-center gap-2 sm:col-span-2">
        <input
          type="checkbox"
          checked={value.darkSections}
          onChange={(e) => onChange({ ...value, darkSections: e.target.checked })}
        />
        Dark content sections
      </label>
    </div>
  );
}

type DraftTheme = { hero: string; font: string; radius: string; accent: string; darkSections: boolean };
type Draft = { name?: string; plans?: string[]; active?: boolean; theme?: DraftTheme | null };

const DEFAULT_THEME: DraftTheme = { hero: "royal", font: "jakarta", radius: "soft", accent: "#2E7CF6", darkSections: false };

export function TemplateDesigner() {
  const [rows, setRows] = useState<TemplateRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/templates")
      .then(async (r) => {
        if (!r.ok) throw new Error(r.status === 403 ? "Admin locked (see guard)." : "Load failed.");
        return r.json();
      })
      .then((d) => setRows(d.templates))
      .catch((e) => setError(e instanceof Error ? e.message : "Load failed."));
  }, []);

  async function save(key: string, patch: object) {
    setSaving(key);
    setError(null);
    try {
      const res = await fetch(`/api/admin/templates/${key}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Save failed.");
      setRows((rs) => rs?.map((t) => (t.key === key ? data.template : t)) ?? rs);
      setDrafts((d) => {
        const next = { ...d };
        delete next[key];
        return next;
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setSaving(null);
    }
  }

  if (error && !rows) return <p role="alert" className="text-sm text-[#b91c1c]">{error}</p>;
  if (!rows) return <p className="text-sm text-[#64748B]">Loading templates…</p>;

  return (
    <div className="space-y-3">
      {error && (
        <p role="alert" className="rounded-xl bg-[#fef2f2] p-3 text-sm text-[#b91c1c]">{error}</p>
      )}
      {rows.map((t) => {
        const d = drafts[t.key] ?? {};
        const theme = { ...(t.theme ?? DEFAULT_THEME), ...(d.theme ?? {}) };
        const plans = d.plans ?? t.plans;
        const active = d.active ?? t.active;
        const dirty =
          JSON.stringify({ theme, plans, active }) !==
          JSON.stringify({ theme: t.theme ?? DEFAULT_THEME, plans: t.plans, active: t.active });
        return (
          <article key={t.key} className="rounded-2xl border border-[#E2E8F0] bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="font-semibold">{t.name} <span className="font-mono text-xs text-[#94a3b8]">{t.key}</span></h3>
                <p className="text-xs text-[#64748B]">
                  {t.theme ? "Studio theme" : "Code renderer"} · {plans.length === 0 ? "all plans" : plans.join(", ")}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <label className="flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setDrafts((x) => ({ ...x, [t.key]: { ...d, active: e.target.checked } }))}
                  />
                  Active
                </label>
                <button
                  disabled={!dirty || saving === t.key}
                  onClick={() => void save(t.key, { theme, plans, active })}
                  className="rounded-lg bg-[#07142F] px-3.5 py-1.5 font-medium text-white disabled:opacity-40"
                >
                  {saving === t.key ? "Saving…" : "Save"}
                </button>
                <a
                  href={`/app/portfolio/demo-fintech/preview?template=${t.key}`}
                  className="rounded-lg border border-[#E2E8F0] px-3.5 py-1.5 hover:bg-[#F7FAFC]"
                >
                  Preview →
                </a>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-xs font-semibold text-[#475569]">Plans (empty = everyone)</p>
              <div className="mt-1 flex gap-3 text-sm">
                {PLAN_IDS.map((p) => (
                  <label key={p} className="flex items-center gap-1.5">
                    <input
                      type="checkbox"
                      checked={plans.includes(p)}
                      onChange={(e) =>
                        setDrafts((x) => ({
                          ...x,
                          [t.key]: {
                            ...d,
                            plans: e.target.checked ? [...plans, p] : plans.filter((q) => q !== p),
                          },
                        }))
                      }
                    />
                    {p}
                  </label>
                ))}
              </div>
            </div>
            <ThemeEditor
              value={theme}
              onChange={(v) => setDrafts((x) => ({ ...x, [t.key]: { ...d, theme: v } }))}
            />
            {!t.theme && (
              <p className="mt-2 text-xs text-[#94a3b8]">
                Saving a theme switches this template from its code renderer to your studio design.
              </p>
            )}
          </article>
        );
      })}
    </div>
  );
}
