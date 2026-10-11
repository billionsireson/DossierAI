import Link from "next/link";
import { Navbar } from "@/components/marketing/navbar";
import { TemplateShowcase } from "@/components/marketing/template-showcase";
import { CTA } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";

export const metadata = {
  title: "Examples",
  description:
    "Explore DossierAI template families: Modern Professional, Creative Minimal, Corporate Executive, Tech / Developer.",
};

export default function ExamplesPage() {
  return (
    <div className="bg-[#020914] text-[#f4f8ff]">
      <div className="border-b border-[rgba(73,147,255,0.14)] bg-[rgba(2,9,20,0.72)]">
        <Navbar />
      </div>
      <main id="main" className="mx-auto w-full max-w-6xl px-6 py-10">
        <Link href="/" className="text-sm text-[#b6c8e2] hover:text-white">
          ← Back
        </Link>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Template showcase</h1>
        <p className="mt-2 max-w-2xl text-[#b6c8e2]">
          Every template implements the same portfolio schema — data stays the
          same while presentation changes.
        </p>
      </main>
      <TemplateShowcase compact />
      <CTA />
      <Footer />
    </div>
  );
}
