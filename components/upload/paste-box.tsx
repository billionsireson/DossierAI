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
      <label htmlFor="paste-text" className="text-sm font-medium">
        Paste your bio, notes, or project description
      </label>
      <textarea
        id="paste-text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        placeholder={"Esther Okafor\nProduct Designer in Lagos\nesther@example.com\nSkills: Product Design, UX Research"}
        className="mt-2 w-full rounded-2xl border border-[#cbd5e1] bg-white p-4 text-sm"
      />
      <button
        onClick={() => void submit()}
        disabled={busy}
        className="mt-3 rounded-xl bg-[#2E7CF6] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(46,124,246,0.4)] disabled:opacity-60"
      >
        {busy ? "Saving…" : "Save & continue"}
      </button>
      {result && (
        <p className={`mt-3 text-sm ${result.ok ? "text-[#166534]" : "text-[#b91c1c]"}`}>
          {result.message}{" "}
          {result.reviewHref && (
            <a href={result.reviewHref} className="font-semibold text-[#2E7CF6] hover:underline">
              Review →
            </a>
          )}
        </p>
      )}
    </div>
  );
}
