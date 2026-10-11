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
    <main id="main" className="py-2">
      <Link href="/app/dashboard" className="text-sm text-[#7892b5] hover:text-white">
        ← Dashboard
      </Link>
      <h1 className="mt-3 text-2xl font-semibold text-white">What would you like to use?</h1>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2">
        {OPTIONS.map((o) => (
          <li key={o.href}>
            <Link
              href={o.href}
              className="glass-panel block h-full p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[rgba(0,174,255,0.65)] hover:shadow-[0_0_30px_rgba(0,102,255,0.2)] focus-visible:outline-2 focus-visible:outline-[#00c8ff]"
            >
              <h2 className="font-semibold text-white">{o.title}</h2>
              <p className="mt-0.5 text-sm text-[#00c8ff]">{o.desc}</p>
              <p className="mt-2 text-sm text-[#b6c8e2]">{o.detail}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
