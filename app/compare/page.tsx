"use client";

import { KEYS, useLocalStorage } from "@/lib/store";
import { businesses, products } from "@/lib/data";
import { Badge } from "@/components/ui/primitives";

export default function ComparePage() {
  const cmpP = useLocalStorage<string[]>(KEYS.compareProducts, []);
  const cmpB = useLocalStorage<string[]>(KEYS.compareBusinesses, []);

  const selProducts = products.filter((p) => cmpP.value.includes(p.id)).slice(0, 3);
  const selBusinesses = businesses.filter((b) => cmpB.value.includes(b.id)).slice(0, 3);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-12">
      <p className="text-[11px] font-extrabold tracking-[0.18em] text-steel-dark uppercase">
        Decide · Shortlist & Compare
      </p>
      <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight">Compare</h1>
      <p className="mt-1 text-sm text-muted">
        PRD §17 — compare prices, delivery, customisation and trust. Max 3 + 3, stored locally.
      </p>

      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold text-lg">Furniture ({selProducts.length}/3)</h2>
          {selProducts.length > 0 && (
            <button onClick={() => cmpP.set([])} className="text-xs font-bold text-muted underline">Clear</button>
          )}
        </div>
        {selProducts.length === 0 ? (
          <p className="mt-3 text-sm bg-surface border border-border rounded-2xl p-4">
            No furniture selected. Use + Compare on <a className="font-bold text-burgundy" href="/search">Search</a>.
          </p>
        ) : (
          <div className="mt-3 overflow-auto border border-border rounded-2xl bg-surface">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="p-3 text-muted text-xs uppercase">Field</th>
                  {selProducts.map((p) => (
                    <th key={p.id} className="p-3">{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(
                  [
                    ["Price", (p: typeof selProducts[number]) => p.priceLabel],
                    ["Business", (p: typeof selProducts[number]) => p.business],
                    ["Location", (p: typeof selProducts[number]) => p.location],
                    ["Availability", (p: typeof selProducts[number]) => p.availability],
                    ["Customisation", (p: typeof selProducts[number]) => p.customization],
                    ["Production", (p: typeof selProducts[number]) => p.productionTime],
                    ["Delivery", (p: typeof selProducts[number]) => p.delivery],
                    ["Match", (p: typeof selProducts[number]) => `${p.match} · ${p.matchScore}%`],
                    ["Trust", (p: typeof selProducts[number]) => (p.verified ? "✓ Verified" : "Pending")],
                  ] as Array<[string, (p: (typeof selProducts)[number]) => string]>
                ).map(([label, fn]) => (
                  <tr key={label} className="border-b border-border last:border-0">
                    <td className="p-3 font-bold text-muted text-xs uppercase">{label}</td>
                    {selProducts.map((p) => (
                      <td key={p.id} className="p-3 font-medium">{fn(p)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold text-lg">Businesses ({selBusinesses.length}/3)</h2>
          {selBusinesses.length > 0 && (
            <button onClick={() => cmpB.set([])} className="text-xs font-bold text-muted underline">Clear</button>
          )}
        </div>
        {selBusinesses.length === 0 ? (
          <p className="mt-3 text-sm bg-surface border border-border rounded-2xl p-4">
            No businesses selected. Use + Compare on business cards.
          </p>
        ) : (
          <div className="mt-3 overflow-auto border border-border rounded-2xl bg-surface">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="p-3 text-muted text-xs uppercase">Field</th>
                  {selBusinesses.map((b) => (
                    <th key={b.id} className="p-3">{b.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-3 font-bold text-muted text-xs uppercase">Trust</td>
                  {selBusinesses.map((b) => (
                    <td key={b.id} className="p-3">
                      {b.verified ? <Badge tone="verified">✓ Verified</Badge> : <Badge tone="neutral">Pending</Badge>}
                    </td>
                  ))}
                </tr>
                {(
                  [
                    ["Location", (b: typeof selBusinesses[number]) => b.location],
                    ["Response", (b: typeof selBusinesses[number]) => b.responseTime],
                    ["Hours", (b: typeof selBusinesses[number]) => b.operatingHours],
                    ["Capabilities", (b: typeof selBusinesses[number]) => b.capabilities.join(", ")],
                    ["Service areas", (b: typeof selBusinesses[number]) => b.serviceAreas.join(" · ")],
                  ] as Array<[string, (b: (typeof selBusinesses)[number]) => string]>
                ).map(([label, fn]) => (
                  <tr key={label} className="border-b border-border last:border-0">
                    <td className="p-3 font-bold text-muted text-xs uppercase">{label}</td>
                    {selBusinesses.map((b) => (
                      <td key={b.id} className="p-3 font-medium">{fn(b)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
