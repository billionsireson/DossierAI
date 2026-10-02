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
    <div className="bg-[#040b1e]">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <Link href="/" className="text-sm text-[#93a4c4] hover:text-white">
          ← Back
        </Link>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white">Pricing</h1>
        <p className="mt-2 max-w-2xl text-[#93a4c4]">
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
