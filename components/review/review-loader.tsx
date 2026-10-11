"use client";

import { useEffect, useState } from "react";
import { ReviewForm } from "@/components/review/review-form";
import type { ExtractedProfile } from "@/types/extracted-profile";

type Props = {
  storageKey?: string;
  fileName?: string;
  mimeType?: string;
  fallback: { profile: ExtractedProfile; warnings: string[] };
};

export function ReviewLoader({ storageKey, fileName, mimeType, fallback }: Props) {
  const [state, setState] = useState(fallback);
  const [loading, setLoading] = useState(Boolean(storageKey));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!storageKey) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/extraction", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ storageKey, fileName, mimeType }),
        });
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok) throw new Error(data?.error ?? "Extraction failed.");
        if (data.status === "needs-provider") {
          setState({ profile: fallback.profile, warnings: [data.reason] });
        } else {
          setState({ profile: data.profile, warnings: data.review ?? [] });
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Extraction failed.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [storageKey, fileName, mimeType, fallback]);

  if (loading) {
    return (
      <div className="glass-panel animate-glow-pulse p-10 text-center" role="status">
        <p className="font-semibold text-white">Reading your files…</p>
        <p className="mt-1 text-sm text-[#b6c8e2]">
          Extracting your experience and structuring your story.
        </p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p role="alert" className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
          {error} — showing sample data instead.
        </p>
        <ReviewForm initial={fallback.profile} warnings={fallback.warnings} />
      </div>
    );
  }
  return <ReviewForm initial={state.profile} warnings={state.warnings} />;
}
