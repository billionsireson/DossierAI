"use client";

import { KEYS, toggleInList, useLocalStorage } from "@/lib/store";

function baseBtn(active: boolean) {
  return `text-[11px] font-bold px-2.5 py-1.5 rounded-full border transition active:scale-95 ${
    active
      ? "bg-burgundy text-white border-burgundy"
      : "bg-surface/90 backdrop-blur border-border hover:border-ink"
  }`;
}

export function SaveProductButton({ id }: { id: string }) {
  const { value, set, hydrated } = useLocalStorage<string[]>(
    KEYS.savedProducts,
    []
  );
  const active = value.includes(id);
  if (!hydrated) return null;
  return (
    <button
      type="button"
      aria-pressed={active}
      title={active ? "Saved" : "Save furniture"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        set((p) => toggleInList(p, id));
      }}
      className={baseBtn(active)}
    >
      {active ? "♥ Saved" : "♡ Save"}
    </button>
  );
}

export function SaveBusinessButton({ id }: { id: string }) {
  const { value, set, hydrated } = useLocalStorage<string[]>(
    KEYS.savedBusinesses,
    []
  );
  const active = value.includes(id);
  if (!hydrated) return null;
  return (
    <button
      type="button"
      aria-pressed={active}
      title={active ? "Saved" : "Save business"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        set((p) => toggleInList(p, id));
      }}
      className={baseBtn(active)}
    >
      {active ? "♥ Saved" : "♡ Save"}
    </button>
  );
}

export function ShortlistButton({ id }: { id: string }) {
  const { value, set, hydrated } = useLocalStorage<string[]>(KEYS.shortlist, []);
  const active = value.includes(id);
  if (!hydrated) return null;
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        set((p) => toggleInList(p, id));
      }}
      className={`text-[11px] font-bold px-2.5 py-1.5 rounded-full border transition active:scale-95 ${
        active
          ? "bg-ink text-white border-ink"
          : "bg-surface/90 border-border hover:border-ink"
      }`}
    >
      {active ? "✓ Shortlisted" : "+ Shortlist"}
    </button>
  );
}

export function CompareProductToggle({ id }: { id: string }) {
  const { value, set, hydrated } = useLocalStorage<string[]>(
    KEYS.compareProducts,
    []
  );
  const active = value.includes(id);
  if (!hydrated) return null;
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        set((p) => {
          if (p.includes(id)) return p.filter((x) => x !== id);
          if (p.length >= 3) return p; // cap at 3
          return [...p, id];
        });
      }}
      className={baseBtn(active)}
      title="Add to compare (max 3)"
    >
      {active ? "✓ Compare" : "+ Compare"}
    </button>
  );
}

export function CompareBusinessToggle({ id }: { id: string }) {
  const { value, set, hydrated } = useLocalStorage<string[]>(
    KEYS.compareBusinesses,
    []
  );
  const active = value.includes(id);
  if (!hydrated) return null;
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        set((p) => {
          if (p.includes(id)) return p.filter((x) => x !== id);
          if (p.length >= 3) return p;
          return [...p, id];
        });
      }}
      className={baseBtn(active)}
      title="Add to compare (max 3)"
    >
      {active ? "✓ Compare" : "+ Compare"}
    </button>
  );
}
