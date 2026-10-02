import Link from "next/link";

const PLANS = [
  {
    name: "Free",
    desc: "Experience the product.",
    points: ["1 portfolio", "Limited generations", "Basic template + edits", "Public DossierAI URL"],
    cta: "Start free",
  },
  {
    name: "Pro",
    desc: "For users who need control.",
    points: ["Premium templates", "Full content + section editing", "AI rewriting", "Extended publishing + analytics"],
    cta: "Go Pro",
    highlight: true,
  },
  {
    name: "Premium",
    desc: "For professionals and personal brands.",
    points: ["Everything in Pro", "Lifetime publishing option", "Advanced customization", "Priority support"],
    cta: "Go Premium",
  },
];

export function Pricing({ compact = false }: { compact?: boolean }) {
  return (
    <section aria-labelledby="pricing-heading" className="mx-auto w-full max-w-6xl px-6 py-16">
      <p className="text-xs font-semibold tracking-[0.2em] text-[#2563EB]">PRICING</p>
      <h2 id="pricing-heading" className="mt-2 text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl">
        Free / Pro / Premium
      </h2>
      <p className="mt-2 max-w-2xl text-[#64748B]">
        Exact pricing is configurable from the admin system rather than
        hard-coded (PRD §24). Credits are a separate abstraction from
        subscriptions.
      </p>
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {PLANS.map((p) => (
          <li
            key={p.name}
            className={`rounded-2xl border p-6 shadow-sm ${
              p.highlight
                ? "border-[#07142F] bg-[#07142F] text-white"
                : "border-[#E2E8F0] bg-white"
            }`}
          >
            <h3 className="text-lg font-bold">{p.name}</h3>
            <p className={`mt-1 text-sm ${p.highlight ? "text-[#cbd5e1]" : "text-[#64748B]"}`}>
              {p.desc}
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {p.points.map((pt) => (
                <li key={pt} className="flex gap-2">
                  <span aria-hidden>✓</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/app/dashboard"
              className={`mt-6 block rounded-xl px-4 py-2.5 text-center font-semibold ${
                p.highlight
                  ? "bg-[#B7F000] text-[#07142F] hover:bg-[#a6e000]"
                  : "bg-[#2563EB] text-white hover:bg-[#1d4ed8]"
              }`}
            >
              {p.cta}
            </Link>
          </li>
        ))}
      </ul>
      {!compact && (
        <p className="mt-4 text-center text-sm text-[#64748B]">
          Full comparison on the <Link href="/pricing" className="text-[#2563EB] hover:underline">pricing page</Link>.
        </p>
      )}
    </section>
  );
}
