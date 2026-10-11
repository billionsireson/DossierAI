import Link from "next/link";
import { Spot } from "@/components/motion/spot";
import { Icons } from "@/components/marketing/icons";
import { FREE_REFILL_CREDITS, FREE_REFILL_HOURS, PAYMENTS_ENABLED } from "@/lib/billing/plans";

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
    price: "₦4,998",
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
    price: "₦9,998",
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
  if (!PAYMENTS_ENABLED) {
    return (
      <section aria-labelledby="pricing-heading" className="bg-[#020914] py-20">
        <div className="mx-auto w-full max-w-3xl px-6 text-center">
          <h2 id="pricing-heading" className="text-3xl font-semibold tracking-tight text-[#f4f8ff] md:text-[2.5rem] md:leading-[1.15]">
            Free for everyone
          </h2>
          <p className="mt-2 text-[#b6c8e2]">No cards, no plans. Every template, every feature.</p>
          <Spot className="glass-panel mx-auto mt-8 max-w-md p-8 text-left">
            <p className="text-4xl font-bold text-white">₦0</p>
            <ul className="mt-5 space-y-2.5 text-sm text-[#b6c8e2]">
              {[
                "All portfolio templates",
                "AI generation + extraction",
                `Free credits refill automatically (${FREE_REFILL_CREDITS} every ${FREE_REFILL_HOURS} hours)`,
                "1 credit per portfolio generation",
                "Publish + shareable URL",
              ].map((pt) => (
                <li key={pt} className="flex gap-2.5">
                  <Icons.check className="mt-0.5 h-4 w-4 shrink-0 text-[#00c8ff]" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/app/dashboard"
              className="mt-7 block rounded-full bg-gradient-to-r from-[#0875ff] via-[#0755f5] to-[#4338ff] px-4 py-3 text-center text-sm font-semibold text-white shadow-[0_6px_24px_rgba(0,93,255,0.24)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_48px_rgba(0,112,255,0.32)]"
            >
              Start building free
            </Link>
          </Spot>
        </div>
      </section>
    );
  }
  return (
    <section aria-labelledby="pricing-heading" className="bg-[#020914] py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <h2 id="pricing-heading" className="text-3xl font-semibold tracking-tight text-[#f4f8ff] md:text-[2.5rem] md:leading-[1.15]">
          Pricing
        </h2>
        <p className="mt-2 text-[#b6c8e2]">Choose the plan that fits your goals.</p>
        <ul className="mt-10 grid items-stretch gap-5 md:grid-cols-3">
          {PLANS.map((p) => (
            <li key={p.name} className={p.highlight ? "md:-my-3" : ""}>
              <Spot
                className={`flex h-full flex-col rounded-[24px] transition-transform duration-200 hover:-translate-y-1 ${
                  p.highlight
                    ? "bg-gradient-to-b from-[#00c8ff] via-[#0875ff] to-[#4338ff] p-[1.5px] shadow-[0_0_48px_rgba(0,112,255,0.32)]"
                    : "glass-panel"
                }`}
              >
                <div className="relative flex h-full flex-col rounded-[24px] bg-[rgba(5,24,49,0.9)] p-7">
                  {"badge" in p && p.badge && (
                    <span className="absolute -top-3.5 right-6 rounded-full bg-gradient-to-r from-[#0875ff] to-[#4338ff] px-3 py-1 text-xs font-semibold text-white">
                      {p.badge}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-white">{p.name}</h3>
                  <p className="text-sm text-[#b6c8e2]">{p.desc}</p>
                  <p className="mt-4 text-4xl font-bold tracking-tight text-white">
                    {p.price}
                    {p.per && <span className="text-sm font-normal text-[#b6c8e2]">{p.per}</span>}
                  </p>
                  <ul className="mt-6 flex-1 space-y-2.5 text-sm text-[#b6c8e2]">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-2.5">
                        <Icons.check className="mt-0.5 h-4 w-4 shrink-0 text-[#00c8ff]" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/app/dashboard"
                    className={`mt-8 block rounded-full px-4 py-3 text-center text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                      p.highlight
                        ? "bg-gradient-to-r from-[#0875ff] to-[#4338ff] text-white shadow-[0_6px_24px_rgba(0,93,255,0.24)]"
                        : "border border-[rgba(73,147,255,0.28)] bg-[rgba(7,26,51,0.75)] text-white hover:border-[rgba(0,174,255,0.65)]"
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
          <p className="mt-6 text-center text-sm text-[#7892b5]">
            Plans and credit allocations are configurable — see PRD §25–§27.
          </p>
        )}
      </div>
    </section>
  );
}
