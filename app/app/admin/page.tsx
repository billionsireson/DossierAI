import { headers } from "next/headers";
import { adminBanner } from "@/lib/admin/guard";
import { listPortfolios } from "@/lib/portfolio/store";
import { balance, history } from "@/lib/credits/ledger";
import { demoUser } from "@/lib/demo";
import { CreditGrantForm } from "@/components/admin/credit-grant-form";
import { TemplateDesigner } from "@/components/admin/template-designer";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin" };

export default async function AdminPage() {
  void headers();
  const mode = adminBanner();
  if (mode === "locked") {
    return (
      <main id="main" className="py-2">
        <h1 className="text-2xl font-semibold text-white">Admin</h1>
        <p className="mt-2 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
          Locked. Set ADMIN_API_TOKEN and pass it as x-admin-token.
        </p>
      </main>
    );
  }
  const portfolios = await listPortfolios();
  const bal = await balance(demoUser.id);
  const txs = await history(demoUser.id, 10);

  return (
    <main id="main" className="py-2">
      <h1 className="text-2xl font-semibold text-white">Admin</h1>
      {mode === "open-dev" && (
        <p className="mt-2 rounded-xl border border-amber-400/40 bg-amber-400/10 p-3 text-sm text-amber-100">
          Dev mode: no ADMIN_API_TOKEN set. This panel denies everything in production until a token is configured.
        </p>
      )}

      <section className="glass-panel mt-5 p-5 text-white">
        <h2 className="font-semibold">Portfolios ({portfolios.length})</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {portfolios.map((p) => (
            <li key={p.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-[rgba(7,26,51,0.75)] px-3 py-2">
              <span className="font-medium">{p.profile.name} <span className="text-[#7892b5]">· {p.slug} · v{p.version} · {p.publishing.status}</span></span>
              <span className="text-[#7892b5]">{p.theme.templateId}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="glass-panel mt-4 p-5 text-white">
        <h2 className="font-semibold">Templates — design once, gate by plan</h2>
        <p className="mt-1 text-sm text-[#b6c8e2]">
          Colors, hero, font and corners only — never raw code. Empty plans means every user.
        </p>
        <div className="mt-3">
          <TemplateDesigner />
        </div>
      </section>

      <section className="glass-panel mt-4 p-5 text-white">
        <h2 className="font-semibold">Credits — {demoUser.id} (balance {bal})</h2>
        <CreditGrantForm />
        <ul className="mt-3 space-y-1.5 text-sm">
          {txs.map((t) => (
            <li key={t.id} className="flex items-center justify-between rounded-lg bg-[rgba(7,26,51,0.75)] px-3 py-1.5">
              <span>{t.type} <span className="text-[#7892b5]">{t.createdAt.slice(0, 10)}</span></span>
              <span className={t.amount < 0 ? "text-[#ff8a8a]" : "text-[#64ddff]"}>
                {t.amount > 0 ? `+${t.amount}` : t.amount}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
