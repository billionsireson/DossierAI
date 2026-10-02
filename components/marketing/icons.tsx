type P = { className?: string };

function base(className?: string) {
  return className ?? "h-5 w-5";
}

export const Icons = {
  upload: ({ className }: P) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden>
      <path d="M12 16V4m0 0 4 4m-4-4-4 4" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  ),
  spark: ({ className }: P) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden>
      <path d="M12 3v3m0 12v3M3 12h3m12 0h3M6.3 6.3l2 2m7.4 7.4 2 2m0-11.4-2 2M8.3 15.7l-2 2" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  ),
  layout: ({ className }: P) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 9.5h18M9.5 9.5V20" />
    </svg>
  ),
  layers: ({ className }: P) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </svg>
  ),
  globe: ({ className }: P) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" />
    </svg>
  ),
  users: ({ className }: P) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c.8-3.2 3.4-5 6.5-5s5.7 1.8 6.5 5" />
      <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M17.5 15.4c2 .7 3.5 2.2 4 4.6" />
    </svg>
  ),
  photo: ({ className }: P) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <circle cx="9" cy="10" r="1.8" />
      <path d="m5 18 5-5 3 3 2.5-2.5L21 18" />
    </svg>
  ),
  brief: ({ className }: P) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden>
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12.5h18" />
    </svg>
  ),
  check: ({ className }: P) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  ),
  arrow: ({ className }: P) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden>
      <path d="M4 12h15m-6-7 7 7-7 7" />
    </svg>
  ),
  bolt: ({ className }: P) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={base(className)} aria-hidden>
      <path d="M13 2 4.5 13.5H11L9.5 22 19 10h-6.5L13 2Z" />
    </svg>
  ),
};
