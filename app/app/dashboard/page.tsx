import Link from "next/link";
import { PortfolioCard } from "@/components/dashboard/portfolio-card";
import { EmptyPortfolios } from "@/components/dashboard/empty-state";
import { getCurrentUser, getCurrentUserId } from "@/lib/auth/current-user";
import { demoUser } from "@/lib/demo";
import { balance, history } from "@/lib/credits/ledger";
import { listPortfolios } from "@/lib/portfolio/store";

export const dynamic = "force-dynamic";
export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const userId = await getCurrentUserId();
  const user = await getCurrentUser();
  const portfolios = await listPortfolios(userId);
  const credits = await balance(userId);
  const name = user?.name ?? demoUser.name;
  const published = portfolios.filter((p) => p.publishing.status === "published").length;
  const recentTx = await history(userId, 4);
  const stats = [
    { label: "Portfolios", value: String(portfolios.length) },
    { label: "Published", value: String(published) },
    { label: "Credits", value: String(credits) },
  ];

  return (
    <main className="py-2">
      <div className="relative overflow-hidden rounded-2xl bg-[#07142F] p-6 text-white md:p-8">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-10 -top-16 h-48 w-72 rounded-full bg-[#2563EB]/40 blur-[80px]" />
          <div className="absolute -bottom-20 left-1/4 h-40 w-72 rounded-full bg-[#7c3aed]/30 blur-[80px]" />
        </div>
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Ready to build your next portfolio{user ? `, ${name.split(" ")[0]}` : ""}?
            </h1>
            <p className="mt-1.5 text-sm text-[#93a4c4]">
              {credits} credits · {user?.plan ?? demoUser.plan} plan
              {!user && " · sample data for development"}
            </p>
          </div>
          <Link
            href="/app/create"
            className="rounded-full bg-[#B7F000] px-5 py-2.5 text-sm font-semibold text-[#07142F] shadow-[0_0_28px_rgba(183,240,0,0.35)] transition-shadow hover:shadow-[0_0_44px_rgba(183,240,0,0.55)]"
          >
            Create Portfolio
          </Link>
        </div>
      </div>

      <section aria-label="Stats" className="mt-6 grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-[#E2E8F0] bg-white p-4">
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-[#64748B]">{s.label}</p>
          </div>
        ))}
      </section>

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

      <section aria-label="Recent activity" className="mt-6 rounded-2xl border border-[#E2E8F0] bg-white p-5">
        <h2 className="font-semibold text-[#0F172A]">Recent activity</h2>
        {recentTx.length === 0 ? (
          <p className="mt-1 text-sm text-[#64748B]">
            No credit activity yet — generate a portfolio to start the ledger.
          </p>
        ) : (
          <ul className="mt-3 space-y-1.5 text-sm">
            {recentTx.map((t) => (
              <li key={t.id} className="flex items-center justify-between rounded-lg bg-[#F7FAFC] px-3 py-1.5">
                <span className="font-medium">{t.type}</span>
                <span className={t.amount < 0 ? "text-[#b91c1c]" : "text-[#166534]"}>
                  {t.amount > 0 ? `+${t.amount}` : t.amount}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
