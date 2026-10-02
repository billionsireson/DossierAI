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
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <Link href="/" className="text-sm text-[#64748B] hover:text-[#0F172A]">
          ← Back
        </Link>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">Template showcase</h1>
        <p className="mt-2 max-w-2xl text-[#64748B]">
          Every template implements the same portfolio schema — data stays the
          same while presentation changes. Full interactive previews land with
          the portfolio renderer (Milestone 5).
        </p>
      </main>
      <TemplateShowcase compact />
      <CTA />
      <Footer />
    </>
  );
}
