"use client";

import { useState } from "react";

export function PasteBox() {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string; reviewHref?: string } | null>(null);

  async function submit() {
    const trimmed = text.trim();
    if (trimmed.length < 10) {
      setResult({ ok: false, message: "Paste at least a few words about yourself or your work." });
      return;
    }
    setBusy(true);
    setResult(null);
    try {
      const form = new FormData();
      form.append(
        "files",
        new File([trimmed], "pasted.txt", { type: "text/plain" }),
      );
      const res = await fetch("/api/uploads", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Upload failed.");
      const f = data.files?.[0];
      if (!f?.ok) throw new Error(f?.error ?? "Upload rejected.");
      setResult({
        ok: true,
        message: "Text saved — ready for extraction.",
        reviewHref: `/app/review?storageKey=${encodeURIComponent(f.storageKey)}&fileName=${encodeURIComponent(f.fileName)}&mimeType=text%2Fplain`,
      });
      setText("");
    } catch (e) {
      setResult({ ok: false, message: e instanceof Error ? e.message : "Upload failed." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <label htmlFor="paste-text" className="text-sm font-medium text-white">
        Paste your bio, notes, or project description
      </label>
      <textarea
        id="paste-text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        placeholder={"Esther Okafor\nProduct Designer in Lagos\nesther@example.com\nSkills: Product Design, UX Research"}
        className="ocean-input mt-2 min-h-44"
      />
      <button
        onClick={() => void submit()}
        disabled={busy}
        className="ocean-btn mt-3"
      >
        {busy ? "Saving…" : "Save & continue"}
      </button>
      {result && (
        <p className={`mt-3 text-sm ${result.ok ? "text-[#64ddff]" : "text-red-300"}`}>
          {result.message}{" "}
          {result.reviewHref && (
            <a href={result.reviewHref} className="font-semibold text-[#00c8ff] hover:underline focus-visible:outline-2 focus-visible:outline-[#00c8ff]">
              Review →
            </a>
          )}
        </p>
      )}
    </div>
  );
}
