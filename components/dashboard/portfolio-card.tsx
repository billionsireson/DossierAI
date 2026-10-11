import Link from "next/link";
import type { Portfolio } from "@/types/portfolio";

const COVERS: Record<string, string> = {
  "modern-professional": "from-[#0644db] via-[#0865ff] to-[#00c8ff]",
  "creative-minimal": "from-[#4338ff] via-[#7c3aed] to-[#00c8ff]",
  "corporate-executive": "from-[#0b1226] via-[#334155] to-[#c9a227]",
  "tech-developer": "from-[#020617] via-[#0644db] to-[#00c8ff]",
  "digital-creator": "from-[#4338ff] via-[#ec4899] to-[#00c8ff]",
  "spotlight": "from-[#0644db] via-[#0865ff] to-[#4338ff]",
};

const TEMPLATE_NAMES: Record<string, string> = {
  "modern-professional": "Modern Professional",
  "creative-minimal": "Creative Minimal",
  "corporate-executive": "Corporate Executive",
  "tech-developer": "Tech / Developer",
  "digital-creator": "Digital Creator",
  "spotlight": "Spotlight",
};

export function PortfolioCard({ portfolio }: { portfolio: Portfolio }) {
  const status = portfolio.publishing.status;
  const cover = COVERS[portfolio.theme.templateId] ?? COVERS["modern-professional"];
  const initial = (portfolio.profile.name || "D").slice(0, 1).toUpperCase();
  return (
    <article className="group flex flex-col overflow-hidden rounded-[18px] border border-[rgba(73,147,255,0.28)] bg-[rgba(5,24,49,0.78)] shadow-[0_16px_48px_rgba(0,0,0,0.28)] backdrop-blur-[18px] transition-all duration-200 hover:-translate-y-1 hover:border-[rgba(0,174,255,0.65)] hover:shadow-[0_0_30px_rgba(0,102,255,0.2)]">
      <div className={`relative h-28 bg-gradient-to-br ${cover}`}>
        <span className="absolute bottom-3 left-4 flex h-11 w-11 items-center justify-center rounded-xl bg-black/30 text-lg font-bold text-white backdrop-blur">
          {initial}
        </span>
        <span
          className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur ${
            status === "published" ? "bg-[#00c8ff]/90 text-[#031126]" : "bg-black/40 text-white"
          }`}
        >
          {status === "published" ? "● Published" : "○ Draft"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-semibold text-white">
          {portfolio.seo.title ?? portfolio.profile.name}
        </h3>
        <p className="mt-1 text-sm text-[#7892b5]">
          {TEMPLATE_NAMES[portfolio.theme.templateId] ?? portfolio.theme.templateId} · v
          {portfolio.version}
        </p>
        <div className="mt-4 flex gap-2">
          <Link
            href={`/app/portfolio/${portfolio.id}/preview`}
            className="rounded-full bg-gradient-to-r from-[#0875ff] to-[#4338ff] px-4 py-1.5 text-sm font-semibold text-white shadow-[0_6px_24px_rgba(0,93,255,0.24)] hover:shadow-[0_0_30px_rgba(0,102,255,0.2)]"
          >
            View
          </Link>
          <Link
            href={`/app/portfolio/${portfolio.id}/edit`}
            className="rounded-full border border-[rgba(73,147,255,0.28)] bg-[rgba(7,26,51,0.75)] px-4 py-1.5 text-sm font-semibold text-white hover:border-[rgba(0,174,255,0.65)]"
          >
            Edit
          </Link>
        </div>
      </div>
    </article>
  );
}
