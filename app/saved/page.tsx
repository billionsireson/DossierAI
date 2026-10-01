"use client";

import ProductCard from "@/components/product/ProductCard";
import BusinessCard from "@/components/business/BusinessCard";
import { KEYS, useLocalStorage } from "@/lib/store";
import { businesses, products } from "@/lib/data";

export default function SavedPage() {
  const savedP = useLocalStorage<string[]>(KEYS.savedProducts, []);
  const savedB = useLocalStorage<string[]>(KEYS.savedBusinesses, []);
  const short = useLocalStorage<string[]>(KEYS.shortlist, []);

  const savedProducts = products.filter((p) => savedP.value.includes(p.id));
  const savedBusinesses = businesses.filter((b) => savedB.value.includes(b.id));
  const shortlisted = businesses.filter((b) => short.value.includes(b.id));

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-12">
      <p className="text-[11px] font-extrabold tracking-[0.18em] text-steel-dark uppercase">
        My Space · local only
      </p>
      <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight">
        Saved & shortlisted
      </h1>
      <p className="mt-1 text-sm text-muted">
        Stored in this browser (localStorage). No account yet — DB/auth comes later.
      </p>

      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold text-lg">Saved furniture ({savedProducts.length})</h2>
          {savedProducts.length > 0 && (
            <button onClick={() => savedP.set([])} className="text-xs font-bold text-muted underline">
              Clear
            </button>
          )}
        </div>
        {savedProducts.length === 0 ? (
          <p className="mt-3 text-sm bg-surface border border-border rounded-2xl p-4">
            Nothing saved yet. Tap ♡ Save on any product in <a className="font-bold text-burgundy" href="/search">Search</a>.
          </p>
        ) : (
          <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedProducts.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold text-lg">Saved businesses ({savedBusinesses.length})</h2>
          {savedBusinesses.length > 0 && (
            <button onClick={() => savedB.set([])} className="text-xs font-bold text-muted underline">
              Clear
            </button>
          )}
        </div>
        {savedBusinesses.length === 0 ? (
          <p className="mt-3 text-sm bg-surface border border-border rounded-2xl p-4">
            No saved businesses yet.
          </p>
        ) : (
          <div className="mt-3 grid md:grid-cols-2 gap-4">
            {savedBusinesses.map((b) => (
              <BusinessCard key={b.id} b={b} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-8">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-extrabold text-lg">Shortlist — ready to enquire ({shortlisted.length})</h2>
          <a href="/compare" className="text-sm font-bold text-burgundy">Compare →</a>
        </div>
        {shortlisted.length === 0 ? (
          <p className="mt-3 text-sm bg-surface border border-border rounded-2xl p-4">
            Shortlist makers you want quotes from. Use + Shortlist on business cards.
          </p>
        ) : (
          <div className="mt-3 grid md:grid-cols-2 gap-4">
            {shortlisted.map((b) => (
              <BusinessCard key={b.id} b={b} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
