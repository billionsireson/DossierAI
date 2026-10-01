"use client";

import { useState } from "react";
import { KEYS, uid, useLocalStorage, type Enquiry } from "@/lib/store";
import { enquiryPrompts, type Product } from "@/lib/data";
import { Button } from "@/components/ui/primitives";

export default function EnquiryPanel({ product }: { product: Product }) {
  const store = useLocalStorage<Enquiry[]>(KEYS.enquiries, []);
  const [selected, setSelected] = useState<string[]>([enquiryPrompts[0]]);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const mine = store.value
    .filter((e) => e.productId === product.id)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  const togglePrompt = (q: string) =>
    setSelected((prev) => (prev.includes(q) ? prev.filter((x) => x !== q) : [...prev, q]));

  const send = () => {
    if (selected.length === 0 && !message.trim()) return;
    setSending(true);
    const now = new Date().toISOString();
    const id = uid("enq");
    const customerText = [...selected, message.trim()].filter(Boolean).join("\n• ");

    const enquiry: Enquiry = {
      id,
      productId: product.id,
      productName: product.name,
      business: product.business,
      businessId: product.businessId,
      prompts: selected,
      message: message.trim(),
      createdAt: now,
      thread: [{ from: "customer", text: customerText, at: now }],
    };
    store.set((prev) => [enquiry, ...prev]);

    // Simulated structured business response (local only, no backend)
    setTimeout(() => {
      const reply: Enquiry = {
        ...enquiry,
        thread: [
          ...enquiry.thread,
          {
            from: "business",
            text: `Thanks for your enquiry on "${product.name}". Yes — we can help. See structured details below. Reply here to continue.`,
            at: new Date().toISOString(),
            structured: {
              price: product.priceLabel,
              availability: product.availability,
              customization: product.customization,
              material: `${product.material} · ${product.colour}`,
              delivery: product.delivery,
              timeframe: product.productionTime,
            },
          },
        ],
      };
      store.set((prev) => prev.map((e) => (e.id === id ? reply : e)));
    }, 900);

    setMessage("");
    setSending(false);
  };

  return (
    <div className="mt-5 bg-surface border border-border rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <p className="font-extrabold">Ask Business</p>
        <a href="/messages" className="text-xs font-bold text-burgundy">
          View all ({store.value.length}) →
        </a>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {enquiryPrompts.map((q) => {
          const on = selected.includes(q);
          return (
            <button
              key={q}
              onClick={() => togglePrompt(q)}
              aria-pressed={on}
              className={`text-[13px] font-semibold px-3 py-2 rounded-full border transition active:scale-95 ${
                on ? "bg-ink text-white border-ink" : "bg-mist-light border-border hover:border-ink"
              }`}
            >
              {q}
            </button>
          );
        })}
      </div>
      <textarea
        placeholder="Write a message"
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="mt-3 w-full rounded-2xl border border-border bg-background p-3 text-sm outline-none focus:border-ink"
      />
      <div className="mt-3 flex gap-2">
        <button
          onClick={send}
          disabled={sending || (selected.length === 0 && !message.trim())}
          className="flex-1 inline-flex items-center justify-center gap-2 font-semibold rounded-full transition active:scale-[0.98] text-sm px-5 py-3 bg-burgundy text-white hover:bg-burgundy-dark shadow-sm disabled:opacity-50"
        >
          {sending ? "Sending…" : "Send enquiry →"}
        </button>
        <Button variant="outline" href="/request/new">Request custom</Button>
      </div>

      {mine.length > 0 && (
        <div className="mt-4 space-y-3">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-muted">
            This product · {mine.length} enquir{mine.length === 1 ? "y" : "ies"} (this browser)
          </p>
          {mine.slice(0, 3).map((e) => (
            <div key={e.id} className="border border-border rounded-2xl p-3 bg-background space-y-2">
              {e.thread.map((t, i) => (
                <div
                  key={i}
                  className={`text-sm p-2.5 rounded-xl leading-relaxed ${
                    t.from === "customer" ? "bg-ink text-white ml-6" : "bg-surface border border-border mr-6"
                  }`}
                >
                  <p className="text-[10px] font-extrabold uppercase tracking-wider opacity-70 mb-1">
                    {t.from === "customer" ? "You" : e.business}
                  </p>
                  <p className="whitespace-pre-line">{t.text}</p>
                  {t.structured && (
                    <dl className="mt-2 grid grid-cols-2 gap-1.5 text-[13px]">
                      {Object.entries(t.structured).map(([k, v]) => (
                        <div key={k} className="bg-background border border-border rounded-lg p-2">
                          <dt className="text-[10px] font-bold uppercase text-muted">{k}</dt>
                          <dd className="font-semibold">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
