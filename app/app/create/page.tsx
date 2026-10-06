import Link from "next/link";

export const metadata = { title: "Create" };

const OPTIONS = [
  {
    href: "/app/upload?type=cv",
    title: "Upload CV / Resume",
    desc: "PDF, DOCX, TXT",
    detail: "We'll extract your experience, skills and education.",
  },
  {
    href: "/app/upload?type=project",
    title: "Upload Project Document",
    desc: "Briefs, decks, reports",
    detail: "Tell us the project title — we'll pull out the story.",
  },
  {
    href: "/app/upload?type=image",
    title: "Upload Images / Screenshots",
    desc: "JPG, PNG, WebP + camera",
    detail: "OCR reads certificates, screenshots and photos of work.",
  },
  {
    href: "/app/upload?type=text",
    title: "Paste Text",
    desc: "Notes, bios, descriptions",
    detail: "No file? Type or paste straight in.",
  },
];

export default function CreatePage() {
  return (
    <main className="py-2">
      <Link href="/app/dashboard" className="text-sm text-[#64748B] hover:text-[#0F172A]">
        ← Dashboard
      </Link>
      <h1 className="mt-3 text-2xl font-bold">What would you like to use?</h1>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2">
        {OPTIONS.map((o) => (
          <li key={o.href}>
            <Link
              href={o.href}
              className="block h-full rounded-2xl border border-[#E2E8F0] bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[#2E7CF6]/50 hover:shadow-[0_12px_36px_rgba(46,124,246,0.2)]"
            >
              <h2 className="font-semibold">{o.title}</h2>
              <p className="mt-0.5 text-sm text-[#64748B]">{o.desc}</p>
              <p className="mt-2 text-sm text-[#334155]">{o.detail}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
