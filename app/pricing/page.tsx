import Link from "next/link";
import { Navbar } from "@/components/marketing/navbar";
import { Pricing } from "@/components/marketing/pricing";
import { CTA } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";

export const metadata = {
  title: "Pricing",
  description: "DossierAI Free / Pro / Premium plans with credit-based AI usage.",
};

export default function PricingPage() {
  return (
    <div className="bg-[#F4F6FB] text-[#0F172A]">
      <div className="bg-[#180F6E]">
        <Navbar />
      </div>
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <Link href="/" className="text-sm text-[#64748B] hover:text-[#0F172A]">
          ← Back
        </Link>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">Pricing</h1>
        <p className="mt-2 max-w-2xl text-[#64748B]">
          Subscriptions grant monthly credit allocations into an immutable
          ledger wallet. Basic UI actions (recolor, reorder, manual edits) never
          consume credits.
        </p>
      </main>
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}
