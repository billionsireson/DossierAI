import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PortfolioRenderer } from "@/components/portfolio/renderer";
import { getPortfolio } from "@/lib/portfolio/store";
import { getPublicationBySlug } from "@/lib/publishing/store";

export const dynamic = "force-dynamic";

async function resolvePortfolio(slug: string) {
  const pub = await getPublicationBySlug(slug);
  if (!pub) return null;
  return getPortfolio(pub.portfolioId);
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
    <main className="min-h-screen bg-[#020914]">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <PortfolioRenderer portfolio={portfolio} />
        <div className="glass-panel mt-6 flex flex-wrap items-center justify-between gap-3 p-4 text-sm">
          <p className="text-[#b6c8e2]">
            Built with <Link href="/" className="font-semibold text-white">DossierAI</Link>
          </p>
          <a
            href={`/p/${slug}/resume`}
            className="ocean-btn !min-h-0 px-4 py-2"
          >
            Download Resume
          </a>
        </div>
      </div>
    </main>
  );
}
