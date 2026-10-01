export default function Logo({
  light = false,
  compact = false,
}: {
  light?: boolean;
  compact?: boolean;
}) {
  return (
    <a href="/" className="flex items-center gap-2 shrink-0" aria-label="GREGREY home">
      {/* Brand mark — from identity deck (burgundy interlocked mark) */}
      <img
        src="/brand/logo-mark.svg"
        alt="GREGREY mark"
        width={36}
        height={36}
        className="w-9 h-9 shrink-0"
      />
      {!compact && (
        <span className="leading-none">
          <span
            className={`block font-extrabold tracking-tight text-[19px] ${
              light ? "text-white" : "text-ink"
            }`}
          >
            GREGREY<span className="text-[10px] align-super">™</span>
          </span>
          <span
            className={`hidden sm:block text-[8.5px] tracking-[0.14em] font-semibold ${
              light ? "text-white/70" : "text-muted"
            }`}
          >
            CONNECTING SPACES. CREATING POSSIBILITIES.
          </span>
        </span>
      )}
    </a>
  );
}
