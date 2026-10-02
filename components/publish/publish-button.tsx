"use client";

import { useState } from "react";

export function PublishButton({ portfolioId }: { portfolioId: string }) {
  const [url, setUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run(path: string, method: string) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(path, { method });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Request failed.");
      if (method === "POST" && data.slug) setUrl(`/p/${data.slug}`);
      else setUrl(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        disabled={busy}
        onClick={() => void run(`/api/portfolios/${portfolioId}/publish`, "POST")}
        className="rounded-lg bg-[#B7F000] px-4 py-2 text-sm font-semibold text-[#07142F] shadow-[0_0_24px_rgba(183,240,0,0.35)] disabled:opacity-60"
      >
        {busy ? "Working…" : "Publish"}
      </button>
      <button
        disabled={busy}
        onClick={() => void run(`/api/portfolios/${portfolioId}/publish`, "DELETE")}
        className="rounded-lg border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-medium hover:bg-[#F7FAFC] disabled:opacity-60"
      >
        Unpublish
      </button>
      {url && (
        <a href={url} className="text-sm font-medium text-[#2563EB] hover:underline">
          Open {url} →
        </a>
      )}
      {error && (
        <span role="alert" className="text-sm text-[#b91c1c]">
          {error}
        </span>
      )}
    </div>
  );
}
