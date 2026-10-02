import Link from "next/link";
import { PortfolioRenderer } from "@/components/portfolio/renderer";
import { demoPortfolios } from "@/lib/demo";

export const metadata = { title: "Preview" };

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const portfolio = demoPortfolios.find((p) => p.id === id) ?? demoPortfolios[0];

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
      <div className="mt-5">
        <PortfolioRenderer portfolio={portfolio} />
      </div>
    </main>
  );
}
