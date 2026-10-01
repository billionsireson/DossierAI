"use client";

import { useRef, useState } from "react";
import { KEYS, uid, useLocalStorage, type FurnitureRequest } from "@/lib/store";
import { businesses, requestFields, requestStatuses } from "@/lib/data";
import BusinessCard from "@/components/business/BusinessCard";
import { Badge } from "@/components/ui/primitives";

export default function RequestForm() {
  const store = useLocalStorage<FurnitureRequest[]>(KEYS.requests, []);
  const fileRef = useRef<HTMLInputElement>(null);

  const [values, setValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    requestFields.slice(1).forEach(([label]) => {
      init[label] = "";
    });
    return init;
  });
  const [imageName, setImageName] = useState("");
  const [preview, setPreview] = useState("");
  const [lastSubmitted, setLastSubmitted] = useState<FurnitureRequest | null>(null);

  const set = (label: string, v: string) => setValues((p) => ({ ...p, [label]: v }));

  const onFile = (f: File | undefined) => {
    if (!f) return;
    setImageName(f.name);
    const url = URL.createObjectURL(f);
    setPreview(url);
  };

  const save = (status: string) => {
    const now = new Date().toISOString();
    const req: FurnitureRequest = {
      id: uid("req"),
      fields: values,
      imageName,
      imagePreview: preview,
      status,
      createdAt: now,
      updatedAt: now,
    };
    store.set((prev) => [req, ...prev]);
    setLastSubmitted(req);
  };

  const advance = (id: string) => {
    store.set((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const i = requestStatuses.indexOf(r.status);
        const next = requestStatuses[Math.min(i + 1, requestStatuses.length - 1)];
        return { ...r, status: next, updatedAt: new Date().toISOString() };
      })
    );
  };

  const currentStatus = (s: string) => requestStatuses.indexOf(s);

  return (
    <div>
      <div className="mt-6 bg-surface border-2 border-dashed border-steel rounded-3xl p-8 text-center">
        <p className="text-[11px] font-extrabold uppercase tracking-wider text-muted">Image</p>
        {preview ? (
          <img src={preview} alt="Request reference" className="mx-auto mt-3 max-h-56 rounded-2xl border border-border object-cover" />
        ) : (
          <p className="text-3xl mt-1">📤</p>
        )}
        <p className="mt-2 font-bold">{imageName || "Drop your reference photo"}</p>
        <p className="text-sm text-muted">Phone photo · Screenshot · Product image — max 10MB (local preview only)</p>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onFile(e.target.files?.[0])}
        />
        <div className="mt-3 flex justify-center gap-2">
          <button
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center justify-center gap-2 font-semibold rounded-full text-sm px-5 py-3 bg-ink text-white hover:bg-black"
          >
            Upload image
          </button>
          <button
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center justify-center gap-2 font-semibold rounded-full text-sm px-5 py-3 border border-border bg-surface hover:border-ink"
          >
            Use camera
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {requestFields.slice(1).map(([label, ph]) => (
          <label key={label} className="block bg-surface border border-border rounded-2xl p-4">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-muted">{label}</span>
            <input
              value={values[label] ?? ""}
              onChange={(e) => set(label, e.target.value)}
              placeholder={ph}
              className="mt-1 w-full bg-transparent outline-none text-[15px] font-medium placeholder:text-pebble"
            />
          </label>
        ))}
      </div>

      <div className="mt-6 flex gap-2">
        <button
          onClick={() => save("SUBMITTED")}
          className="flex-1 inline-flex items-center justify-center gap-2 font-semibold rounded-full text-sm px-5 py-3 bg-burgundy text-white hover:bg-burgundy-dark"
        >
          Submit request →
        </button>
        <button
          onClick={() => save("DRAFT")}
          className="inline-flex items-center justify-center gap-2 font-semibold rounded-full text-sm px-5 py-3 border border-border bg-surface hover:border-ink"
        >
          Save draft
        </button>
      </div>

      {lastSubmitted && (
        <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-sm">
          <p className="font-extrabold text-success">✓ {lastSubmitted.status === "DRAFT" ? "Draft saved" : "Request submitted"} locally</p>
          <p className="text-ink-soft mt-1">
            {lastSubmitted.fields["Description"] || "No description"} · {lastSubmitted.fields["Category"] || "No category"} ·{" "}
            {lastSubmitted.fields["Budget"] || "No budget"}
          </p>
          <div className="mt-2 flex gap-2">
            <a href="/messages" className="font-bold text-burgundy">Go to messages →</a>
            <a href="/saved" className="font-bold text-ink">View saved →</a>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="font-extrabold text-lg">My requests ({store.value.length}) — local</h2>
        {store.value.length === 0 ? (
          <p className="mt-2 text-sm text-muted">No requests yet. Submit above to see status flow DRAFT → CLOSED.</p>
        ) : (
          <div className="mt-3 space-y-3">
            {store.value.slice(0, 5).map((r) => (
              <div key={r.id} className="bg-surface border border-border rounded-2xl p-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge tone={r.status === "DRAFT" ? "neutral" : "burgundy"}>{r.status}</Badge>
                  <span className="text-xs text-muted">{new Date(r.createdAt).toLocaleString()}</span>
                </div>
                <p className="mt-2 text-sm font-semibold">
                  {r.fields["Description"] || "Untitled request"} · {r.fields["Budget"] || "No budget"}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {requestStatuses.map((s, i) => (
                    <span
                      key={s}
                      className={`text-[10px] font-extrabold px-2 py-1 rounded-full border ${
                        i <= currentStatus(r.status)
                          ? "bg-burgundy text-white border-burgundy"
                          : "bg-background border-border text-muted"
                      }`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                {currentStatus(r.status) < requestStatuses.length - 1 && (
                  <button
                    onClick={() => advance(r.id)}
                    className="mt-3 text-xs font-bold px-3 py-2 rounded-full bg-ink text-white"
                  >
                    Advance status →
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8">
        <h2 className="font-extrabold text-lg">Relevant businesses for this request</h2>
        <p className="text-sm text-muted">MVP matching preview — same makers as Search Level 3.</p>
        <div className="mt-3 grid gap-3">
          {businesses.map((b) => (
            <BusinessCard key={b.id} b={b} />
          ))}
        </div>
      </div>
    </div>
  );
}
