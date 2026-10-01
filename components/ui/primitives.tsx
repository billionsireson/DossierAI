import { ReactNode } from "react";

export function Button({
  children,
  variant = "primary",
  href,
  className = "",
}: {
  children: ReactNode;
  variant?: "primary" | "dark" | "outline" | "ghost" | "light";
  href?: string;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition active:scale-[0.98] text-sm px-5 py-3";
  const styles: Record<string, string> = {
    primary: "bg-burgundy text-white hover:bg-burgundy-dark shadow-sm",
    dark: "bg-ink text-white hover:bg-black",
    outline: "border border-border bg-surface hover:border-ink",
    ghost: "hover:bg-mist-light",
    light: "bg-white text-ink hover:bg-mist-light",
  };
  const cls = `${base} ${styles[variant]} ${className}`;
  if (href) return <a href={href} className={cls}>{children}</a>;
  return <button className={cls}>{children}</button>;
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "verified" | "ai" | "burgundy" | "mist";
}) {
  const map: Record<string, string> = {
    neutral: "bg-mist-light text-ink-soft border-border",
    verified: "bg-emerald-50 text-success border-emerald-200",
    ai: "bg-sky-light/60 text-ai border-sky/60",
    burgundy: "bg-burgundy text-white border-burgundy",
    mist: "bg-mist text-ink border-mist",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border ${map[tone]}`}
    >
      {children}
    </span>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-surface border border-border rounded-2xl ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-[11px] font-extrabold tracking-[0.18em] text-steel-dark uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl sm:text-[32px] leading-[1.1] font-extrabold tracking-tight">
        {title}
      </h2>
      {sub && <p className="mt-2 text-ink-soft leading-relaxed">{sub}</p>}
    </div>
  );
}

export function TrustSplit({ ai, verified }: { ai: string[]; verified: string[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      <div className="rounded-2xl border border-sky/60 bg-sky-light/40 p-4">
        <p className="text-[11px] font-extrabold tracking-widest text-ai uppercase">
          ✦ AI detected
        </p>
        <ul className="mt-2 space-y-1 text-sm text-ink-soft">
          {ai.map((a) => (
            <li key={a}>• {a}</li>
          ))}
        </ul>
        <p className="mt-2 text-[11px] text-muted">Inferred from image, not confirmed.</p>
      </div>
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
        <p className="text-[11px] font-extrabold tracking-widest text-success uppercase">
          ✓ Business verified
        </p>
        <ul className="mt-2 space-y-1 text-sm text-ink-soft">
          {verified.map((v) => (
            <li key={v}>• {v}</li>
          ))}
        </ul>
        <p className="mt-2 text-[11px] text-muted">Confirmed by the business.</p>
      </div>
    </div>
  );
}
