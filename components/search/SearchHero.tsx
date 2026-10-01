"use client";
import { useState } from "react";

export default function SearchHero() {
  const [query, setQuery] = useState("Modern 3-seater sofa in Lekki under ₦1M");
  return (
    <div className="bg-surface border border-border rounded-[24px] p-3 sm:p-4 shadow-sm">
      <div className="flex items-center gap-2 bg-mist-light border border-border rounded-full pl-4 pr-2 py-2">
        <span>🔍</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe furniture… e.g. Wooden dining table under ₦500,000"
          className="flex-1 bg-transparent outline-none text-sm sm:text-[15px] font-medium placeholder:text-muted"
        />
        <a
          href={`/search?q=${encodeURIComponent(query)}`}
          className="px-4 sm:px-5 py-2.5 rounded-full bg-burgundy text-white text-sm font-bold hover:bg-burgundy-dark"
        >
          Search
        </a>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <a
          href="/search"
          className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-background hover:border-ink py-3 text-sm font-semibold"
        >
          📝 <span className="hidden sm:inline">Search with words</span><span className="sm:hidden">Words</span>
        </a>
        <a
          href="/search?mode=image"
          className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-background hover:border-ink py-3 text-sm font-semibold"
        >
          📤 <span className="hidden sm:inline">Upload a photo</span><span className="sm:hidden">Upload</span>
        </a>
        <a
          href="/search?mode=image"
          className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-background hover:border-ink py-3 text-sm font-semibold"
        >
          📷 <span className="hidden sm:inline">Take a photo</span><span className="sm:hidden">Camera</span>
        </a>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 px-1 pb-1">
        {["Custom TV console", "Dark grey sofa", "Oak lounge chair", "Deliver to Ikeja"].map((s) => (
          <a
            key={s}
            href={`/search?q=${encodeURIComponent(s)}`}
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-sky-light/50 border border-sky/50 hover:bg-sky-light"
          >
            {s}
          </a>
        ))}
      </div>
    </div>
  );
}
