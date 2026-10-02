import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <Link href="/" className="text-sm text-[#64748B] hover:text-[#0F172A]">
        ← Back
      </Link>
      <h1 className="mt-4 text-4xl font-bold">Pricing</h1>
      <p className="mt-2 text-[#64748B]">
        Free / Pro / Premium. Exact pricing is configurable — see PRD §25.
        Billing lands in Milestone 9.
      </p>
    </main>
  );
}
