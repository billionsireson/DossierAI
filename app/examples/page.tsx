import Link from "next/link";

export default function ExamplesPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <Link href="/" className="text-sm text-[#64748B] hover:text-[#0F172A]">
        ← Back
      </Link>
      <h1 className="mt-4 text-4xl font-bold">Examples</h1>
      <p className="mt-2 text-[#64748B]">
        Template showcase lands in Milestone 1. Four families planned: Modern
        Professional, Creative Minimal, Corporate Executive, Tech / Developer.
      </p>
    </main>
  );
}
