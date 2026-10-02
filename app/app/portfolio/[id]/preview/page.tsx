import Link from "next/link";
import { PortfolioRenderer, TEMPLATE_IDS, isTemplateId } from "@/components/portfolio/renderer";
import { PublishButton } from "@/components/publish/publish-button";
import { getPortfolio } from "@/lib/portfolio/store";
import { demoPortfolios } from "@/lib/demo";

export const metadata = { title: "Preview" };

const TEMPLATE_LABELS: Record<string, string> = {
  "modern-professional": "Modern Professional",
  "creative-minimal": "Creative Minimal",
  "corporate-executive": "Corporate Executive",
  "tech-developer": "Tech / Developer",
};

export default async function PreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ template?: string }>;
}) {
  const { id } = await params;
  const sp = (await searchParams) ?? {};
  const template = sp.template && isTemplateId(sp.template) ? sp.template : undefined;
  const portfolio = getPortfolio(id) ?? demoPortfolios[0];
  const active = template ?? portfolio.theme.templateId;

  return (
    <main className="py-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/app/dashboard" className="text-sm text-[#64748B] hover:text-[#0F172A]">
          ← Dashboard
        </Link>
        <div className="flex gap-2 text-sm">
          <span className="rounded-lg border border-[#E2E8F0] bg-white px-3 py-1.5 text-[#64748B]">
            Desktop · Tablet · Mobile responsive
          </span>
          <Link
            href={`/app/portfolio/${portfolio.id}/edit`}
            className="rounded-lg bg-[#2563EB] px-3 py-1.5 font-medium text-white hover:bg-[#1d4ed8]"
          >
            Edit
          </Link>
        </div>
      </div>
      <h1 className="mt-3 text-2xl font-bold">Preview</h1>
      <p className="mt-1 text-sm text-[#64748B]">
        Faithful to the published result. Template: {portfolio.theme.templateId}.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <PublishButton portfolioId={portfolio.id} />
      </div>
      <nav aria-label="Template" className="mt-4 flex flex-wrap gap-2">
        {TEMPLATE_IDS.map((t) => (
          <Link
            key={t}
            href={`/app/portfolio/${portfolio.id}/preview?template=${t}`}
            aria-current={active === t ? "true" : undefined}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-shadow ${
              active === t
                ? "bg-[#07142F] text-white shadow-[0_0_20px_rgba(7,20,47,0.4)]"
                : "border border-[#E2E8F0] bg-white hover:bg-[#F7FAFC]"
            }`}
          >
            {TEMPLATE_LABELS[t]}
          </Link>
        ))}
      </nav>
      <div className="mt-5">
        <PortfolioRenderer portfolio={portfolio} template={active} />
      </div>
    </main>
  );
}
