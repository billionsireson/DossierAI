import Link from "next/link";
import { PortfolioCard } from "@/components/dashboard/portfolio-card";
import { EmptyPortfolios } from "@/components/dashboard/empty-state";
import { PasskeyModal } from "@/components/auth/passkey-modal";
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
    <main id="main" className="py-2">
      {user && !user.passkeyHash && <PasskeyModal />}
      <div className="relative overflow-hidden rounded-[24px] border border-[rgba(0,174,255,0.65)] bg-gradient-to-br from-[#0d2f56] to-[#031020] p-6 text-white shadow-[0_0_30px_rgba(0,102,255,0.2)] md:p-8">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-10 -top-16 h-48 w-72 rounded-full bg-[#0865ff]/40 blur-[80px]" />
          <div className="absolute -bottom-20 left-1/4 h-40 w-72 rounded-full bg-[#00c8ff]/25 blur-[80px]" />
        </div>
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Ready to build your next portfolio{user ? `, ${name.split(" ")[0]}` : ""}?
            </h1>
            <p className="mt-1.5 text-sm text-[#b6c8e2]">
              {credits} credits · {user?.plan ?? demoUser.plan} plan
              {!user && " · sample data for development"}
            </p>
          </div>
          <Link href="/app/create" className="ocean-btn">
            Create Portfolio
          </Link>
        </div>
      </div>

      <section aria-label="Stats" className="mt-6 grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="glass-panel p-4">
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-[#7892b5]">{s.label}</p>
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

      <section aria-label="Recent activity" className="glass-panel mt-6 p-5">
        <h2 className="font-semibold text-white">Recent activity</h2>
        {recentTx.length === 0 ? (
          <p className="mt-1 text-sm text-[#b6c8e2]">
            No credit activity yet — generate a portfolio to start the ledger.
          </p>
        ) : (
          <ul className="mt-3 space-y-1.5 text-sm">
            {recentTx.map((t) => (
              <li key={t.id} className="flex items-center justify-between rounded-lg bg-[rgba(7,26,51,0.75)] px-3 py-1.5 text-white">
                <span className="font-medium">{t.type}</span>
                <span className={t.amount < 0 ? "text-[#ff8a8a]" : "text-[#64ddff]"}>
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
