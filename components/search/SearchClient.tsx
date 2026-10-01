"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import BusinessCard from "@/components/business/BusinessCard";
import { Badge, TrustSplit } from "@/components/ui/primitives";
import { KEYS, useLocalStorage } from "@/lib/store";
import { businesses, products } from "@/lib/data";

type FilterKey = "Lekki" | "Under ₦1M" | "Fabric" | "Customisable" | "Verified only";

const FILTERS: FilterKey[] = ["Lekki", "Under ₦1M", "Fabric", "Customisable", "Verified only"];

function matchesQuery(
  hay: string,
  q: string
): boolean {
  const query = q.trim().toLowerCase();
  if (!query || query === "modern 3-seater sofa in lekki under ₦1m") return true;
  const tokens = query.split(/\s+/).filter(Boolean);
  const lower = hay.toLowerCase();
  return tokens.every((t) => lower.includes(t));
}

function applyFilters(
  active: FilterKey[],
  q: string
): typeof products {
  return products.filter((p) => {
    const hay = `${p.name} ${p.category} ${p.material} ${p.colour} ${p.business} ${p.location} ${p.availability}`;
    if (!matchesQuery(hay, q)) return false;
    for (const f of active) {
      if (f === "Lekki" && !`${p.location} ${p.business}`.toLowerCase().includes("lekki")) return false;
      if (f === "Under ₦1M" && !(p.price < 1000000)) return false;
      if (f === "Fabric" && !p.material.toLowerCase().includes("fabric")) return false;
      if (f === "Customisable" && !p.customizable) return false;
      if (f === "Verified only" && !p.verified) return false;
    }
    return true;
  });
}

export default function SearchClient({
  initialQuery,
  isImage,
}: {
  initialQuery: string;
  isImage: boolean;
}) {
  const [active, setActive] = useState<FilterKey[]>(["Lekki", "Under ₦1M"]);
  const [showFilters, setShowFilters] = useState(false);
  const { value: compareProducts } = useLocalStorage<string[]>(KEYS.compareProducts, []);
  const { value: compareBusinesses } = useLocalStorage<string[]>(KEYS.compareBusinesses, []);

  const filtered = useMemo(() => applyFilters(active, initialQuery), [active, initialQuery]);
  const exact = filtered.filter((p) => p.match === "exact");
  const similar = filtered.filter((p) => p.match === "similar");
  const capable = filtered.filter((p) => p.match === "capable");

  const toggle = (f: FilterKey) =>
    setActive((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  const compareCount = compareProducts.length + compareBusinesses.length;

  return (
    <div>
      <div className="bg-surface border border-border rounded-3xl p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          <Badge tone="burgundy">DISCOVER → MATCH</Badge>
          <span className="text-muted">Search session · Lagos · ₦ · English</span>
          {compareCount > 0 && (
            <a href="/compare" className="ml-auto text-burgundy font-extrabold">
              Compare ({compareCount}) →
            </a>
          )}
        </div>
        <h1 className="mt-2 text-xl sm:text-2xl font-extrabold tracking-tight">
          Results for “{initialQuery}”
        </h1>
        <div className="mt-3 flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const on = active.includes(f);
            return (
              <button
                key={f}
                aria-pressed={on}
                onClick={() => toggle(f)}
                className={`text-[13px] font-semibold px-3.5 py-2 rounded-full border transition active:scale-95 ${
                  on
                    ? "bg-ink text-white border-ink"
                    : "border-border bg-background hover:border-ink"
                }`}
              >
                {f} {on ? "✕" : "+"}
              </button>
            );
          })}
          <button
            onClick={() => setShowFilters((s) => !s)}
            className="text-[13px] font-bold px-3.5 py-2 rounded-full bg-ink text-white"
          >
            Filters {showFilters ? "▴" : "⏷"}
          </button>
          {active.length > 0 && (
            <button
              onClick={() => setActive([])}
              className="text-[13px] font-bold px-3.5 py-2 rounded-full border border-dashed border-border text-muted"
            >
              Clear all
            </button>
          )}
        </div>
        {showFilters && (
          <p className="mt-3 text-[13px] text-muted leading-relaxed">
            Filters apply instantly to Level 1–3 below using business-verified fields
            (location, price, material, customisation, verification). Query matches
            name, category, material, colour, business and location.
          </p>
        )}
        {isImage && (
          <div className="mt-4">
            <TrustSplit
              ai={[
                "Possible category: Sofa",
                "Possible style: Contemporary",
                "Possible colour: Charcoal",
                "Possible material: Fabric",
              ]}
              verified={[
                "Price: ₦850,000",
                "Dimensions: 220cm × 90cm",
                "Available: Made to order",
                "Production: 14 days",
                "Delivery: Lagos",
              ]}
            />
          </div>
        )}
      </div>

      <section className="mt-8">
        <h2 className="font-extrabold text-lg">Level 1 — Exact / catalogue match</h2>
        <p className="text-sm text-muted">
          Closest registered listings to your request{active.length ? ` · ${exact.length} after filters` : ""}.
        </p>
        {exact.length === 0 ? (
          <p className="mt-3 text-sm bg-surface border border-border rounded-2xl p-4">
            No exact matches with current filters. Try clearing a filter or view similar below.
          </p>
        ) : (
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {exact.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-8">
        <h2 className="font-extrabold text-lg">Level 2 — Similar product</h2>
        <p className="text-sm text-muted">Visually or semantically similar furniture.</p>
        {similar.length === 0 ? (
          <p className="mt-3 text-sm bg-surface border border-border rounded-2xl p-4">
            No similar items match these filters.
          </p>
        ) : (
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {similar.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-8 grid lg:grid-cols-[1fr_360px] gap-4">
        <div>
          <h2 className="font-extrabold text-lg">Level 3 — Capable business</h2>
          <p className="text-sm text-muted">Makers who can manufacture or customise something similar.</p>
          <div className="mt-4 grid gap-4">
            {businesses.map((b) => (
              <BusinessCard key={b.id} b={b} />
            ))}
          </div>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            {capable.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="mt-4 text-sm bg-burgundy text-white rounded-2xl p-4">
              All results filtered out. Clear filters to see capable makers, or request this item.
            </p>
          )}
        </div>
        <aside className="bg-burgundy text-white rounded-3xl p-6 h-fit lg:sticky lg:top-20">
          <p className="text-[11px] font-extrabold tracking-[0.18em] text-white/70 uppercase">
            No exact match? Never dead-end
          </p>
          <h3 className="mt-2 text-xl font-extrabold">We couldn&apos;t find an exact match.</h3>
          <p className="mt-2 text-sm text-white/80">
            We found businesses that may be able to make or supply something similar.
          </p>
          <div className="mt-4 space-y-2">
            <a href="#similar" className="block text-center text-sm font-bold bg-white text-burgundy rounded-full py-2.5">View similar furniture</a>
            <a href="#similar" className="block text-center text-sm font-bold border border-white/40 rounded-full py-2.5">Find capable makers</a>
            <a href="/request/new" className="block text-center text-sm font-bold bg-ink text-white rounded-full py-2.5">Request this item →</a>
          </div>
        </aside>
      </section>
    </div>
  );
}
