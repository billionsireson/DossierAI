import Link from "next/link";
import type { Portfolio } from "@/types/portfolio";

const TEMPLATE_NAMES: Record<string, string> = {
  "modern-professional": "Modern Professional",
  "creative-minimal": "Creative Minimal",
  "corporate-executive": "Corporate Executive",
  "tech-developer": "Tech / Developer",
};

export function PortfolioCard({ portfolio }: { portfolio: Portfolio }) {
  const status = portfolio.publishing.status;
  return (
    <article className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
      <div
        aria-hidden
        className="h-24 rounded-xl bg-gradient-to-br from-[#07142F] to-[#2563EB]"
      />
      <h3 className="mt-4 font-semibold text-[#0F172A]">
        {portfolio.seo.title ?? portfolio.profile.name}
      </h3>
      <p className="mt-1 text-sm text-[#64748B]">
        {TEMPLATE_NAMES[portfolio.theme.templateId] ?? portfolio.theme.templateId} · v
        {portfolio.version} · {status}
      </p>
      <div className="mt-4 flex gap-2">
        <Link
          href={`/app/portfolio/${portfolio.id}/preview`}
          className="rounded-lg bg-[#2563EB] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#1d4ed8]"
        >
          View
        </Link>
        <Link
          href={`/app/portfolio/${portfolio.id}/edit`}
          className="rounded-lg border border-[#E2E8F0] px-3 py-1.5 text-sm font-medium hover:bg-[#F7FAFC]"
        >
          Edit
        </Link>
        <span className="rounded-lg border border-[#E2E8F0] px-3 py-1.5 text-sm text-[#64748B]">
          {status === "published" ? "Published" : "Publish →"}
        </span>
      </div>
    </article>
  );
}
