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
    <div className="bg-[#040b1e]">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <Link href="/" className="text-sm text-[#93a4c4] hover:text-white">
          ← Back
        </Link>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white">Template showcase</h1>
        <p className="mt-2 max-w-2xl text-[#93a4c4]">
          Every template implements the same portfolio schema — data stays the
          same while presentation changes. Full interactive previews land with
          the portfolio renderer (Milestone 5).
        </p>
      </main>
      <TemplateShowcase compact />
      <CTA />
      <Footer />
    </div>
  );
}
