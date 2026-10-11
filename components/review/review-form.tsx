"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ExtractedProfile } from "@/types/extracted-profile";
import { TEMPLATE_IDS } from "@/components/portfolio/renderer";

type Props = { initial: ExtractedProfile; warnings: string[] };

function Field({
  label,
  value,
  confidence,
  onChange,
}: {
  label: string;
  value?: string;
  confidence?: number;
  onChange: (v: string) => void;
}) {
  const low = typeof confidence === "number" && confidence < 0.7;
  return (
    <label className="glass-panel block p-4">
      <span className="flex items-center justify-between text-sm font-medium text-white">
        {label}
        {typeof confidence === "number" && (
          <span className={`rounded-full px-2 py-0.5 text-xs ${low ? "bg-amber-400/20 text-amber-200" : "bg-[#00c8ff]/20 text-[#64ddff]"}`}>
            {Math.round(confidence * 100)}%
          </span>
        )}
      </span>
      <input
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="ocean-input mt-2"
      />
      {low && <span className="mt-1 block text-xs text-amber-200/90">Low confidence — please confirm.</span>}
    </label>
  );
}

export function ReviewForm({ initial, warnings }: Props) {
  const router = useRouter();
  const [profile, setProfile] = useState<ExtractedProfile>(initial);
  const [templateId, setTemplateId] = useState<string>("modern-professional");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (path: "name" | "email" | "phone" | "summary") => (v: string) =>
    setProfile((p) => ({
      ...p,
      [path]: v ? { value: v, evidence: p[path]?.evidence } : undefined,
    }));

  async function generate() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, templateId }),
      });
      const text = await res.text();
      let data: { portfolio?: { id: string }; error?: string };
      try {
        data = text ? (JSON.parse(text) as typeof data) : {};
      } catch {
        throw new Error(`Server returned ${res.status} with an unreadable response. Try again.`);
      }
      if (!res.ok) throw new Error(data?.error ?? `Request failed (${res.status}). Try again.`);
      if (!data?.portfolio?.id) throw new Error("Generation returned no portfolio. Try again.");
      router.push(`/app/portfolio/${data.portfolio.id}/preview?template=${templateId}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generation failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      {warnings.length > 0 && (
        <ul role="alert" className="mb-4 space-y-2">
          {warnings.map((w) => (
            <li key={w} className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-3 text-sm text-amber-100">
              {w}
            </li>
          ))}
        </ul>
      )}
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Name" value={profile.name?.value} confidence={profile.name?.evidence?.confidence} onChange={set("name")} />
        <Field label="Email" value={profile.email?.value} confidence={profile.email?.evidence?.confidence} onChange={set("email")} />
        <Field label="Phone" value={profile.phone?.value} confidence={profile.phone?.evidence?.confidence} onChange={set("phone")} />
        <Field label="Summary" value={profile.summary?.value} confidence={profile.summary?.evidence?.confidence} onChange={set("summary")} />
      </div>
      <div className="glass-panel mt-4 p-4">
        <h2 className="text-sm font-medium text-white">Skills ({profile.skills.length})</h2>
        <p className="mt-1 text-sm text-[#b6c8e2]">
          {profile.skills.length > 0
            ? profile.skills.map((s) => s.value).join(", ")
            : "None detected."}
        </p>
      </div>

      <div className="glass-panel mt-4 flex flex-wrap items-center gap-3 p-4">
        <label className="text-sm font-medium text-white">
          Template{" "}
          <select
            value={templateId}
            onChange={(e) => setTemplateId(e.target.value)}
            className="ml-1 rounded-lg border border-[rgba(73,147,255,0.28)] bg-[rgba(7,26,51,0.75)] px-2 py-1.5 text-sm text-white"
          >
            {TEMPLATE_IDS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <button
          onClick={() => void generate()}
          disabled={busy}
          className="ocean-btn"
        >
          {busy ? "Generating…" : "Generate My Portfolio"}
        </button>
        {error && (
          <span role="alert" className="text-sm text-red-300">
            {error}
          </span>
        )}
      </div>
      <p className="mt-3 text-sm text-[#7892b5]">
        Corrections here feed generation. Nothing is published until you publish.
      </p>
    </div>
  );
}
