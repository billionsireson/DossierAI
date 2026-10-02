import Link from "next/link";
import { Spot } from "@/components/motion/spot";
import { Icons } from "@/components/marketing/icons";

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
    <section aria-labelledby="pricing-heading" className="relative overflow-hidden bg-[#040b1e] py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="animate-glow-pulse absolute left-1/2 top-10 h-72 w-[46rem] -translate-x-1/2 rounded-full bg-[#7c3aed]/15 blur-[130px]" />
      </div>
      <div className="relative mx-auto w-full max-w-6xl px-6">
        <h2 id="pricing-heading" className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          Pricing
        </h2>
        <p className="mt-2 text-[#93a4c4]">Choose the plan that fits your goals.</p>
        <ul className="mt-10 grid items-stretch gap-5 md:grid-cols-3">
          {PLANS.map((p) => (
            <li key={p.name} className={p.highlight ? "md:-my-3" : ""}>
              <Spot
                className={`flex h-full flex-col rounded-3xl p-[1.5px] transition-transform duration-300 hover:-translate-y-1.5 ${
                  p.highlight
                    ? "bg-gradient-to-b from-[#38bdf8] via-[#7c3aed] to-[#38bdf8] shadow-[0_0_60px_rgba(124,58,237,0.45)]"
                    : "border border-white/10 bg-white/10"
                }`}
              >
                <div className={`relative flex h-full flex-col rounded-3xl p-7 ${p.highlight ? "bg-[#0a1730]" : "bg-[#0a1730]/60 backdrop-blur"}`}>
                  {"badge" in p && p.badge && (
                    <span className="absolute -top-3.5 right-6 rounded-full bg-gradient-to-r from-[#2563EB] to-[#7c3aed] px-3 py-1 text-xs font-semibold text-white shadow-[0_0_20px_rgba(124,58,237,0.6)]">
                      {p.badge}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-white">{p.name}</h3>
                  <p className="text-sm text-[#93a4c4]">{p.desc}</p>
                  <p className="mt-4 text-4xl font-bold tracking-tight text-white">
                    {p.price}
                    {p.per && <span className="text-sm font-normal text-[#93a4c4]">{p.per}</span>}
                  </p>
                  <ul className="mt-6 flex-1 space-y-2.5 text-sm text-[#cbd5e1]">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-2.5">
                        <Icons.check className="mt-0.5 h-4 w-4 shrink-0 text-[#B7F000]" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/app/dashboard"
                    className={`mt-8 block rounded-full px-4 py-3 text-center text-sm font-semibold transition-all ${
                      p.highlight
                        ? "bg-[#B7F000] text-[#07142F] shadow-[0_0_30px_rgba(183,240,0,0.4)] hover:shadow-[0_0_46px_rgba(183,240,0,0.6)]"
                        : "border border-white/20 text-white hover:border-[#38bdf8]/60 hover:shadow-[0_0_30px_rgba(56,189,248,0.3)]"
                    }`}
                  >
                    {p.cta}
                  </Link>
                </div>
              </Spot>
            </li>
          ))}
        </ul>
        {!compact && (
          <p className="mt-6 text-center text-sm text-[#7d8aa5]">
            Plans and credit allocations are configurable — see PRD §25–§27.
          </p>
        )}
      </div>
    </section>
  );
}
