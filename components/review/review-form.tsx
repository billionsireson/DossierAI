"use client";

import { useState } from "react";
import type { ExtractedProfile } from "@/types/extracted-profile";

type Props = { initial: ExtractedProfile; warnings: string[] };

function Field({ label, value, confidence }: { label: string; value?: string; confidence?: number }) {
  const [v, setV] = useState(value ?? "");
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
        value={v}
        onChange={(e) => setV(e.target.value)}
        className="mt-2 w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm"
      />
      {low && <span className="mt-1 block text-xs text-[#92400e]">Low confidence — please confirm.</span>}
    </label>
  );
}

export function ReviewForm({ initial, warnings }: Props) {
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
        <Field label="Name" value={initial.name?.value} confidence={initial.name?.evidence?.confidence} />
        <Field label="Email" value={initial.email?.value} confidence={initial.email?.evidence?.confidence} />
        <Field label="Phone" value={initial.phone?.value} confidence={initial.phone?.evidence?.confidence} />
        <Field label="Summary" value={initial.summary?.value} confidence={initial.summary?.evidence?.confidence} />
      </div>
      <div className="mt-4 rounded-xl border border-[#E2E8F0] bg-white p-4">
        <h2 className="text-sm font-medium">Skills ({initial.skills.length})</h2>
        <p className="mt-1 text-sm text-[#64748B]">
          {initial.skills.length > 0
            ? initial.skills.map((s) => s.value).join(", ")
            : "None detected."}
        </p>
      </div>
      <p className="mt-4 text-sm text-[#64748B]">
        Corrections here feed generation (Milestone 5). Nothing is published yet.
      </p>
    </div>
  );
}
