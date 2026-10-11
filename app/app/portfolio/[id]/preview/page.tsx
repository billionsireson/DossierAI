import Link from "next/link";
import { PortfolioRenderer, TEMPLATE_IDS } from "@/components/portfolio/renderer";
import { getTemplate } from "@/lib/templates/store";
import { PublishButton } from "@/components/publish/publish-button";
import { getPortfolio } from "@/lib/portfolio/store";
import { demoPortfolios } from "@/lib/demo";

export const metadata = { title: "Preview" };

const TEMPLATE_LABELS: Record<string, string> = {
  "modern-professional": "Modern Professional",
  "creative-minimal": "Creative Minimal",
  "corporate-executive": "Corporate Executive",
  "tech-developer": "Tech / Developer",
  "digital-creator": "Digital Creator",
  "spotlight": "Spotlight",
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
  const requested = typeof sp.template === "string" && /^[a-z0-9-]{1,60}$/.test(sp.template) ? sp.template : undefined;
  const portfolio = await getPortfolio(id) ?? demoPortfolios[0];
  const active = requested ?? portfolio.theme.templateId;
  const row = await getTemplate(active).catch(() => null);
  const studioTheme = row?.active ? row.theme : null;

  return (
    <main id="main" className="py-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/app/dashboard" className="text-sm text-[#7892b5] hover:text-white">
          ← Dashboard
        </Link>
        <div className="flex gap-2 text-sm">
          <span className="rounded-full border border-[rgba(73,147,255,0.28)] bg-[rgba(7,26,51,0.75)] px-3 py-1.5 text-[#b6c8e2]">
            Desktop · Tablet · Mobile responsive
          </span>
          <Link
            href={`/app/portfolio/${portfolio.id}/edit`}
            className="rounded-full bg-gradient-to-r from-[#0875ff] to-[#4338ff] px-4 py-1.5 font-semibold text-white"
          >
            Edit
          </Link>
        </div>
      </div>
      <h1 className="mt-3 text-2xl font-semibold text-white">Preview</h1>
      <p className="mt-1 text-sm text-[#b6c8e2]">
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
            className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all focus-visible:outline-2 focus-visible:outline-[#00c8ff] ${
              active === t
                ? "bg-gradient-to-r from-[#0875ff] to-[#4338ff] text-white shadow-[0_0_24px_rgba(0,102,255,0.35)]"
                : "border border-[rgba(73,147,255,0.28)] bg-[rgba(7,26,51,0.75)] text-[#b6c8e2] hover:border-[rgba(0,174,255,0.65)] hover:text-white"
            }`}
          >
            {TEMPLATE_LABELS[t]}
          </Link>
        ))}
      </nav>
      <div className="mt-5">
        <PortfolioRenderer portfolio={portfolio} template={active} studioTheme={studioTheme} />
      </div>
    </main>
  );
}
