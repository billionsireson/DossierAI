"use client";

import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw) as T);
    } catch {
      // ignore corrupt storage
    } finally {
      setHydrated(true);
    }
  }, [key]);

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved =
          typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          // storage full / unavailable
        }
        return resolved;
      });
    },
    [key]
  );

  return { value, set, hydrated } as const;
}

export const KEYS = {
  savedProducts: "gregrey:saved-products",
  savedBusinesses: "gregrey:saved-businesses",
  shortlist: "gregrey:shortlist-businesses",
  compareProducts: "gregrey:compare-products",
  compareBusinesses: "gregrey:compare-businesses",
  enquiries: "gregrey:enquiries",
  requests: "gregrey:requests",
} as const;

export interface ThreadMessage {
  from: "customer" | "business";
  text: string;
  at: string;
  structured?: {
    price?: string;
    availability?: string;
    customization?: string;
    material?: string;
    delivery?: string;
    timeframe?: string;
  };
}

export interface Enquiry {
  id: string;
  productId: string;
  productName: string;
  business: string;
  businessId: string;
  prompts: string[];
  message: string;
  createdAt: string;
  thread: ThreadMessage[];
}

export interface FurnitureRequest {
  id: string;
  fields: Record<string, string>;
  imageName?: string;
  imagePreview?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export function uid(prefix = "id"): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}

export function toggleInList(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}
