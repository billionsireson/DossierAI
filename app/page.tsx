import { Hero } from "@/components/marketing/hero";
import { Features } from "@/components/marketing/features";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { TemplateShowcase } from "@/components/marketing/template-showcase";
import { Pricing } from "@/components/marketing/pricing";
import { CTA } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";

export default function HomePage() {
  return (
    <div className="bg-[#020914] text-[#f4f8ff]">
      <main id="main">
        <Hero />
        <Features />
        <HowItWorks />
        <TemplateShowcase />
        <Pricing compact />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
