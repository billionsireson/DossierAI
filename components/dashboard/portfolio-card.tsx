import Link from "next/link";
import type { Portfolio } from "@/types/portfolio";

const COVERS: Record<string, string> = {
  "modern-professional": "from-[#07142F] via-[#1e3a8a] to-[#0ea5e9]",
  "creative-minimal": "from-[#7c3aed] via-[#ec4899] to-[#f59e0b]",
  "corporate-executive": "from-[#0b1226] via-[#334155] to-[#c9a227]",
  "tech-developer": "from-[#020617] via-[#1e3a8a] to-[#22c55e]",
};

const TEMPLATE_NAMES: Record<string, string> = {
  "modern-professional": "Modern Professional",
  "creative-minimal": "Creative Minimal",
  "corporate-executive": "Corporate Executive",
  "tech-developer": "Tech / Developer",
};

export function PortfolioCard({ portfolio }: { portfolio: Portfolio }) {
  const status = portfolio.publishing.status;
  const cover = COVERS[portfolio.theme.templateId] ?? COVERS["modern-professional"];
  const initial = (portfolio.profile.name || "D").slice(0, 1).toUpperCase();
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(37,99,235,0.25)]">
      <div className={`relative h-28 bg-gradient-to-br ${cover}`}>
        <div className="absolute inset-0 bg-blueprint opacity-40" aria-hidden />
        <span className="absolute bottom-3 left-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-lg font-bold text-white backdrop-blur">
          {initial}
        </span>
        <span
          className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur ${
            status === "published" ? "bg-[#B7F000]/90 text-[#07142F]" : "bg-black/40 text-white"
          }`}
        >
          {status === "published" ? "● Published" : "○ Draft"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-semibold text-[#0F172A]">
          {portfolio.seo.title ?? portfolio.profile.name}
        </h3>
        <p className="mt-1 text-sm text-[#64748B]">
          {TEMPLATE_NAMES[portfolio.theme.templateId] ?? portfolio.theme.templateId} · v
          {portfolio.version}
        </p>
        <div className="mt-4 flex gap-2">
          <Link
            href={`/app/portfolio/${portfolio.id}/preview`}
            className="rounded-lg bg-[#2563EB] px-3.5 py-1.5 text-sm font-medium text-white transition-shadow hover:bg-[#1d4ed8] hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]"
          >
            View
          </Link>
          <Link
            href={`/app/portfolio/${portfolio.id}/edit`}
            className="rounded-lg border border-[#E2E8F0] px-3.5 py-1.5 text-sm font-medium hover:bg-[#F7FAFC]"
          >
            Edit
          </Link>
        </div>
      </div>
    </article>
  );
}
