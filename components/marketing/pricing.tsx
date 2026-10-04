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
    <section aria-labelledby="pricing-heading" className="bg-[#F4F6FB] py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <h2 id="pricing-heading" className="text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl">
          Pricing
        </h2>
        <p className="mt-2 text-[#64748B]">Choose the plan that fits your goals.</p>
        <ul className="mt-10 grid items-stretch gap-5 md:grid-cols-3">
          {PLANS.map((p) => (
            <li key={p.name} className={p.highlight ? "md:-my-3" : ""}>
              <Spot
                className={`flex h-full flex-col rounded-3xl transition-transform duration-300 hover:-translate-y-1.5 ${
                  p.highlight
                    ? "bg-gradient-to-b from-[#2E7CF6] via-[#2E7CF6] to-[#180F6E] p-[1.5px] shadow-[0_16px_50px_rgba(46,124,246,0.4)]"
                    : "border border-[#E2E8F0] bg-white p-0 shadow-[0_2px_16px_rgba(24,15,110,0.06)]"
                }`}
              >
                <div className={`relative flex h-full flex-col rounded-3xl p-7 ${p.highlight ? "bg-white" : ""}`}>
                  {"badge" in p && p.badge && (
                    <span className="absolute -top-3.5 right-6 rounded-full bg-[#2E7CF6] px-3 py-1 text-xs font-semibold text-white shadow-[0_0_20px_rgba(46,124,246,0.6)]">
                      {p.badge}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-[#0F172A]">{p.name}</h3>
                  <p className="text-sm text-[#64748B]">{p.desc}</p>
                  <p className="mt-4 text-4xl font-bold tracking-tight text-[#0F172A]">
                    {p.price}
                    {p.per && <span className="text-sm font-normal text-[#64748B]">{p.per}</span>}
                  </p>
                  <ul className="mt-6 flex-1 space-y-2.5 text-sm text-[#334155]">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-2.5">
                        <Icons.check className="mt-0.5 h-4 w-4 shrink-0 text-[#2E7CF6]" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/app/dashboard"
                    className={`mt-8 block rounded-full px-4 py-3 text-center text-sm font-semibold transition-all ${
                      p.highlight
                        ? "bg-[#180F6E] text-white shadow-[0_8px_28px_rgba(24,15,110,0.45)] hover:shadow-[0_8px_40px_rgba(24,15,110,0.6)]"
                        : "border border-[#E2E8F0] text-[#0F172A] hover:border-[#2E7CF6]/60 hover:shadow-[0_8px_28px_rgba(46,124,246,0.25)]"
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
          <p className="mt-6 text-center text-sm text-[#94a3b8]">
            Plans and credit allocations are configurable — see PRD §25–§27.
          </p>
        )}
      </div>
    </section>
  );
}
