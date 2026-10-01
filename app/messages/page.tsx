"use client";

import { useState } from "react";
import { KEYS, useLocalStorage, type Enquiry } from "@/lib/store";

export default function MessagesPage() {
  const store = useLocalStorage<Enquiry[]>(KEYS.enquiries, []);
  const [reply, setReply] = useState<Record<string, string>>({});

  const sendReply = (id: string) => {
    const text = (reply[id] ?? "").trim();
    if (!text) return;
    store.set((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              thread: [...e.thread, { from: "customer" as const, text, at: new Date().toISOString() }],
            }
          : e
      )
    );
    setReply((p) => ({ ...p, [id]: "" }));
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-12">
      <p className="text-[11px] font-extrabold tracking-[0.18em] text-steel-dark uppercase">
        Connect · GREGREY-first messaging
      </p>
      <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight">
        Messages ({store.value.length})
      </h1>
      <p className="mt-1 text-sm text-muted">
        Local-only threads. WhatsApp-assist comes later per PRD §24.
      </p>

      {store.value.length === 0 ? (
        <p className="mt-6 text-sm bg-surface border border-border rounded-2xl p-4">
          No enquiries yet. Start from any <a className="font-bold text-burgundy" href="/search">product</a>.
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {store.value.map((e) => (
            <div key={e.id} className="bg-surface border border-border rounded-3xl p-4">
              <p className="font-extrabold">{e.productName}</p>
              <p className="text-xs text-muted">
                {e.business} · {new Date(e.createdAt).toLocaleString()} · {e.prompts.length} prompt(s)
              </p>
              <div className="mt-3 space-y-2">
                {e.thread.map((t, i) => (
                  <div
                    key={i}
                    className={`text-sm p-2.5 rounded-xl leading-relaxed ${
                      t.from === "customer" ? "bg-ink text-white ml-6" : "bg-background border border-border mr-6"
                    }`}
                  >
                    <p className="whitespace-pre-line">{t.text}</p>
                    {t.structured && (
                      <dl className="mt-2 grid grid-cols-2 gap-1.5 text-[13px] text-ink">
                        {Object.entries(t.structured).map(([k, v]) => (
                          <div key={k} className="bg-white border border-border rounded-lg p-2">
                            <dt className="text-[10px] font-bold uppercase text-muted">{k}</dt>
                            <dd className="font-semibold">{v}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <input
                  value={reply[e.id] ?? ""}
                  onChange={(ev) => setReply((p) => ({ ...p, [e.id]: ev.target.value }))}
                  placeholder="Reply…"
                  className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-ink"
                />
                <button
                  onClick={() => sendReply(e.id)}
                  className="px-4 py-2.5 rounded-full bg-burgundy text-white text-sm font-bold"
                >
                  Send
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={() => store.set([])}
            className="text-xs font-bold text-muted underline"
          >
            Clear all local messages
          </button>
        </div>
      )}
    </main>
  );
}
