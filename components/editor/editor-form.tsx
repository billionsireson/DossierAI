"use client";

import { useState } from "react";
import type { Portfolio, PortfolioSection } from "@/types/portfolio";
import { TEMPLATE_IDS } from "@/components/portfolio/renderer";

export function EditorForm({ initial }: { initial: Portfolio }) {
  const [portfolio, setPortfolio] = useState<Portfolio>(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const setProfile = (k: keyof Portfolio["profile"], v: string) =>
    setPortfolio((p) => ({ ...p, profile: { ...p.profile, [k]: v } }));

  const move = (index: number, dir: -1 | 1) =>
    setPortfolio((p) => {
      const sections = [...p.sections].sort((a, b) => a.order - b.order);
      const j = index + dir;
      if (j < 0 || j >= sections.length) return p;
      const [s] = sections.splice(index, 1);
      sections.splice(j, 0, s);
      return {
        ...p,
        sections: sections.map((s, order) => ({ ...s, order }) as PortfolioSection),
      };
    });

  const toggle = (id: string) =>
    setPortfolio((p) => ({
      ...p,
      sections: p.sections.map((s) =>
        s.id === id ? ({ ...s, visible: !s.visible } as PortfolioSection) : s,
      ),
    }));

  const setSkills = (value: string) =>
    setPortfolio((p) => ({
      ...p,
      sections: p.sections.map((s) =>
        s.type === "skills"
          ? ({
              ...s,
              content: {
                skills: value.split(",").map((x) => x.trim()).filter(Boolean),
              },
            } as PortfolioSection)
          : s,
      ),
    }));

  const setBody = (type: "about", value: string) =>
    setPortfolio((p) => ({
      ...p,
      sections: p.sections.map((s) =>
        s.type === type
          ? ({ ...s, content: { body: value } } as PortfolioSection)
          : s,
      ),
    }));

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/portfolios/${portfolio.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: portfolio.profile,
          theme: portfolio.theme,
          sections: portfolio.sections,
          note: "Editor save",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Save failed.");
      setPortfolio(data.portfolio);
      setMessage(`Saved — version ${data.portfolio.version}.`);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  const ordered = [...portfolio.sections].sort((a, b) => a.order - b.order);
  const skills = ordered.find((s) => s.type === "skills")?.content as
    | { skills?: string[] }
    | undefined;
  const about = ordered.find((s) => s.type === "about")?.content as
    | { body?: string }
    | undefined;

  const input = "ocean-input";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        <section className="glass-panel p-5">
          <h2 className="font-semibold text-white">Content</h2>
          <div className="mt-3 grid gap-3 text-white">
            <label className="block text-sm">
              <span className="mb-1 block font-medium">Name</span>
              <input className={input} value={portfolio.profile.name} onChange={(e) => setProfile("name", e.target.value)} />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium">Headline</span>
              <input className={input} value={portfolio.profile.headline ?? ""} onChange={(e) => setProfile("headline", e.target.value)} />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium">Summary</span>
              <textarea className={input} rows={3} value={portfolio.profile.summary ?? ""} onChange={(e) => setProfile("summary", e.target.value)} />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium">Location</span>
              <input className={input} value={portfolio.profile.location ?? ""} onChange={(e) => setProfile("location", e.target.value)} />
            </label>
            {about && (
              <label className="block text-sm">
                <span className="mb-1 block font-medium">About section</span>
                <textarea className={input} rows={3} value={about.body ?? ""} onChange={(e) => setBody("about", e.target.value)} />
              </label>
            )}
            {skills && (
              <label className="block text-sm">
                <span className="mb-1 block font-medium">Skills (comma separated)</span>
                <input className={input} value={(skills.skills ?? []).join(", ")} onChange={(e) => setSkills(e.target.value)} />
              </label>
            )}
          </div>
        </section>

        <section className="glass-panel p-5">
          <h2 className="font-semibold text-white">Sections</h2>
          <ul className="mt-3 space-y-2">
            {ordered.map((s, i) => (
              <li
                key={s.id}
                className="flex items-center justify-between gap-2 rounded-xl border border-[rgba(73,147,255,0.28)] bg-[rgba(7,26,51,0.75)] px-3 py-2 text-sm text-white"
              >
                <span className="font-medium capitalize">{s.type}</span>
                <span className="flex items-center gap-1">
                  <button aria-label={`Move ${s.type} up`} onClick={() => move(i, -1)} className="rounded px-2 py-1 text-[#b6c8e2] hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-[#00c8ff]">↑</button>
                  <button aria-label={`Move ${s.type} down`} onClick={() => move(i, 1)} className="rounded px-2 py-1 text-[#b6c8e2] hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-[#00c8ff]">↓</button>
                  <button
                    onClick={() => toggle(s.id)}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${s.visible ? "bg-[#00c8ff]/20 text-[#64ddff]" : "bg-white/10 text-[#7892b5]"}`}
                  >
                    {s.visible ? "visible" : "hidden"}
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <aside className="space-y-4">
        <section className="glass-panel p-5 text-white">
          <h2 className="font-semibold">Design</h2>
          <label className="mt-3 block text-sm">
            <span className="mb-1 block font-medium">Template</span>
            <select
              className={input}
              value={portfolio.theme.templateId}
              onChange={(e) =>
                setPortfolio((p) => ({ ...p, theme: { ...p.theme, templateId: e.target.value } }))
              }
            >
              {TEMPLATE_IDS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => void save()}
              disabled={saving}
              className="ocean-btn flex-1"
            >
              {saving ? "Saving…" : "Save"}
            </button>
            <a
              href={`/app/portfolio/${portfolio.id}/preview?template=${portfolio.theme.templateId}`}
              className="ocean-btn-ghost"
            >
              Preview
            </a>
          </div>
          {message && <p role="status" className="mt-3 text-sm text-[#b6c8e2]">{message}</p>}
          <p className="mt-2 text-xs text-[#7892b5]">Version {portfolio.version} · every save snapshots.</p>
        </section>
      </aside>
    </div>
  );
}
