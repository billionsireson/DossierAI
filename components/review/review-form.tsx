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
    <label className="block rounded-xl border border-[#E2E8F0] bg-white p-4">
      <span className="flex items-center justify-between text-sm font-medium text-[#0F172A]">
        {label}
        {typeof confidence === "number" && (
          <span className={`rounded-full px-2 py-0.5 text-xs ${low ? "bg-[#fef3c7] text-[#92400e]" : "bg-[#dcfce7] text-[#166534]"}`}>
            {Math.round(confidence * 100)}%
          </span>
        )}
      </span>
      <input
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm"
      />
      {low && <span className="mt-1 block text-xs text-[#92400e]">Low confidence — please confirm.</span>}
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
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Generation failed.");
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
            <li key={w} className="rounded-xl bg-[#fffbeb] p-3 text-sm text-[#92400e]">
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
      <div className="mt-4 rounded-xl border border-[#E2E8F0] bg-white p-4">
        <h2 className="text-sm font-medium">Skills ({profile.skills.length})</h2>
        <p className="mt-1 text-sm text-[#64748B]">
          {profile.skills.length > 0
            ? profile.skills.map((s) => s.value).join(", ")
            : "None detected."}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4">
        <label className="text-sm font-medium">
          Template{" "}
          <select
            value={templateId}
            onChange={(e) => setTemplateId(e.target.value)}
            className="ml-1 rounded-lg border border-[#E2E8F0] px-2 py-1.5 text-sm"
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
          className="rounded-xl bg-[#2E7CF6] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(46,124,246,0.45)] disabled:opacity-60"
        >
          {busy ? "Generating…" : "Generate My Portfolio"}
        </button>
        {error && (
          <span role="alert" className="text-sm text-[#b91c1c]">
            {error}
          </span>
        )}
      </div>
      <p className="mt-3 text-sm text-[#64748B]">
        Corrections here feed generation. Nothing is published until you publish.
      </p>
    </div>
  );
}
