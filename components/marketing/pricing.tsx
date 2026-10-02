import Link from "next/link";

const PLANS = [
  {
    name: "Free",
    desc: "Get started",
    price: "₦0",
    per: "",
    points: ["AI portfolio generation", "1 template", "Basic customization", "1 month hosting"],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    desc: "For growing professionals",
    price: "₦4,999",
    per: "/month",
    badge: "Most Popular",
    points: [
      "All Free features",
      "Premium templates",
      "Full customization",
      "Edit content & sections",
      "Priority support",
      "1 year publishing",
      "+ 50 credits/month",
    ],
    cta: "Upgrade to Pro",
    highlight: true,
  },
  {
    name: "Premium",
    desc: "For career & brand builders",
    price: "₦9,999",
    per: "/month",
    points: [
      "All Pro features",
      "Advanced templates",
      "Custom domain (optional)",
      "Analytics & insights",
      "Lifetime publishing",
      "+ 200 credits/month",
    ],
    cta: "Upgrade to Premium",
    highlight: false,
  },
];

export function Pricing({ compact = false }: { compact?: boolean }) {
  return (
    <section aria-labelledby="pricing-heading" className="mx-auto w-full max-w-6xl px-6 py-16">
      <h2 id="pricing-heading" className="text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">
        Pricing
      </h2>
      <p className="mt-1 text-[#64748B]">Choose the plan that fits your goals.</p>
      <ul className="mt-8 grid items-stretch gap-4 md:grid-cols-3">
        {PLANS.map((p) => (
          <li
            key={p.name}
            className={`relative flex flex-col rounded-2xl border p-6 shadow-sm ${
              p.highlight
                ? "border-[#2563EB] bg-white ring-2 ring-[#2563EB]"
                : "border-[#E2E8F0] bg-white"
            }`}
          >
            {"badge" in p && p.badge && (
              <span className="absolute -top-3 right-4 rounded-full bg-[#2563EB] px-2.5 py-0.5 text-xs font-semibold text-white">
                {p.badge}
              </span>
            )}
            <h3 className="text-lg font-bold text-[#0F172A]">{p.name}</h3>
            <p className="text-sm text-[#64748B]">{p.desc}</p>
            <p className="mt-3 text-3xl font-bold text-[#0F172A]">
              {p.price}
              {p.per && <span className="text-sm font-normal text-[#64748B]">{p.per}</span>}
            </p>
            <ul className="mt-4 flex-1 space-y-2 text-sm text-[#334155]">
              {p.points.map((pt) => (
                <li key={pt} className="flex gap-2">
                  <span aria-hidden className="text-[#2563EB]">✓</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/app/dashboard"
              className={`mt-6 block rounded-full px-4 py-2.5 text-center text-sm font-semibold ${
                p.highlight
                  ? "bg-[#07142F] text-white hover:bg-[#0f2452]"
                  : "border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F7FAFC]"
              }`}
            >
              {p.cta}
            </Link>
          </li>
        ))}
      </ul>
      {!compact && (
        <p className="mt-4 text-center text-sm text-[#64748B]">
          Plans and credit allocations are configurable — see PRD §25–§27.
        </p>
      )}
    </section>
  );
}
