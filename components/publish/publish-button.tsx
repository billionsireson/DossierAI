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
        className="rounded-full bg-gradient-to-r from-[#0875ff] to-[#4338ff] px-4 py-2 text-sm font-semibold text-white shadow-[0_6px_24px_rgba(0,93,255,0.24)] disabled:opacity-60"
      >
        {busy ? "Working…" : "Publish"}
      </button>
      <button
        disabled={busy}
        onClick={() => void run(`/api/portfolios/${portfolioId}/publish`, "DELETE")}
        className="rounded-full border border-[rgba(73,147,255,0.28)] bg-[rgba(7,26,51,0.75)] px-4 py-2 text-sm font-semibold text-white hover:border-[rgba(0,174,255,0.65)] disabled:opacity-60"
      >
        Unpublish
      </button>
      {url && (
        <a href={url} className="text-sm font-semibold text-[#00c8ff] hover:underline focus-visible:outline-2 focus-visible:outline-[#00c8ff]">
          Open {url} →
        </a>
      )}
      {error && (
        <span role="alert" className="text-sm text-red-300">
          {error}
        </span>
      )}
    </div>
  );
}
