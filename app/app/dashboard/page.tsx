import Link from "next/link";
import { PortfolioCard } from "@/components/dashboard/portfolio-card";
import { EmptyPortfolios } from "@/components/dashboard/empty-state";
import { demoPortfolios, demoUser } from "@/lib/demo";

export const metadata = { title: "Dashboard" };

export default function DashboardPage({
  searchParams,
}: {
  searchParams?: Promise<{ empty?: string }>;
}) {
  void searchParams;
  // ?empty=1 previews the empty state. Real data wiring lands with auth + DB.
  const showEmpty = false;
  const portfolios = showEmpty ? [] : demoPortfolios;

  return (
    <main className="py-2">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">
            Ready to build your next portfolio?
          </h1>
          <p className="mt-1 text-sm text-[#64748B]">
            {demoUser.credits} credits · {demoUser.plan} plan · sample data for
            development
          </p>
        </div>
        <Link
          href="/app/create"
          className="rounded-xl bg-[#2563EB] px-5 py-2.5 font-semibold text-white hover:bg-[#1d4ed8]"
        >
          Create Portfolio
        </Link>
      </div>

      <section aria-label="Portfolios" className="mt-6">
        {portfolios.length === 0 ? (
          <EmptyPortfolios />
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {portfolios.map((p) => (
              <li key={p.id}>
                <PortfolioCard portfolio={p} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-label="Generation history" className="mt-6 rounded-2xl border border-[#E2E8F0] bg-white p-5">
        <h2 className="font-semibold text-[#0F172A]">Generation history</h2>
        <p className="mt-1 text-sm text-[#64748B]">
          AI jobs, credit usage and version notes will appear here once upload +
          extraction land (Milestones 3–5).
        </p>
      </section>
    </main>
  );
}
