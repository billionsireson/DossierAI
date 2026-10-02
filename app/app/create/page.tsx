import Link from "next/link";

export const metadata = { title: "Create" };

export default function CreatePage() {
  return (
    <main className="py-2">
      <Link href="/app/dashboard" className="text-sm text-[#64748B] hover:text-[#0F172A]">
        ← Dashboard
      </Link>
      <h1 className="mt-3 text-2xl font-bold">What would you like to use?</h1>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {[
          ["Upload CV / Resume", "PDF, DOCX, TXT"],
          ["Upload Project Document", "Briefs, decks, reports"],
          ["Upload Images / Screenshots", "JPG, PNG, WebP + OCR"],
          ["Paste Text", "Notes, bios, descriptions"],
        ].map(([t, d]) => (
          <li key={t} className="rounded-2xl border border-[#E2E8F0] bg-white p-5">
            <h2 className="font-semibold">{t}</h2>
            <p className="mt-1 text-sm text-[#64748B]">{d}</p>
            <p className="mt-3 text-sm text-[#94a3b8]">Upload flow lands in Milestone 3.</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
