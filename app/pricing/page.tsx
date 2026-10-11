import Link from "next/link";
import { Navbar } from "@/components/marketing/navbar";
import { Pricing } from "@/components/marketing/pricing";
import { CTA } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";

export const metadata = {
  title: "Pricing",
  description: "DossierAI is free for everyone — 15 credits every 12 hours.",
};

export default function PricingPage() {
  return (
    <div className="bg-[#020914] text-[#f4f8ff]">
      <div className="border-b border-[rgba(73,147,255,0.14)] bg-[rgba(2,9,20,0.72)]">
        <Navbar />
      </div>
      <main id="main" className="mx-auto w-full max-w-6xl px-6 py-10">
        <Link href="/" className="text-sm text-[#b6c8e2] hover:text-white">
          ← Back
        </Link>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Pricing</h1>
        <p className="mt-2 max-w-2xl text-[#b6c8e2]">
          Free for everyone. Credits refill automatically — 15 every 12 hours.
          Basic UI actions (recolor, reorder, manual edits) never consume credits.
        </p>
      </main>
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}
