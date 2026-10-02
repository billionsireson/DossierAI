import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PortfolioRenderer } from "@/components/portfolio/renderer";
import { demoPortfolios } from "@/lib/demo";
import { getPublicationBySlug } from "@/lib/publishing/store";

export const dynamic = "force-dynamic";

async function resolvePortfolio(slug: string) {
  const pub = getPublicationBySlug(slug);
  if (!pub) return null;
  return demoPortfolios.find((p) => p.id === pub.portfolioId) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const portfolio = await resolvePortfolio(slug);
  if (!portfolio) return { title: "Not found" };
  const title = portfolio.seo.title ?? `${portfolio.profile.name} — Portfolio`;
  const description =
    portfolio.seo.description ?? portfolio.profile.summary?.slice(0, 160);
  const url = `/p/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "profile" },
    twitter: { card: "summary", title, description },
  };
}

export default async function PublicPortfolioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const portfolio = await resolvePortfolio(slug);
  if (!portfolio) notFound();

  return (
    <main className="min-h-screen bg-[#F7FAFC]">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <PortfolioRenderer portfolio={portfolio} />
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4 text-sm">
          <p className="text-[#64748B]">
            Built with <Link href="/" className="font-semibold text-[#0F172A]">DossierAI</Link>
          </p>
          <a
            href={`/p/${slug}/resume`}
            className="rounded-lg bg-[#07142F] px-4 py-2 font-medium text-white hover:bg-[#0f2452]"
          >
            Download Resume
          </a>
        </div>
      </div>
    </main>
  );
}
