import { Navbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { Features } from "@/components/marketing/features";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { TemplateShowcase } from "@/components/marketing/template-showcase";
import { Pricing } from "@/components/marketing/pricing";
import { CTA } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <TemplateShowcase />
        <Pricing compact />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
