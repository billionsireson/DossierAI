import { headers } from "next/headers";
import { adminBanner } from "@/lib/admin/guard";
import { listPortfolios } from "@/lib/portfolio/store";
import { balance, history } from "@/lib/credits/ledger";
import { demoUser } from "@/lib/demo";
import { CreditGrantForm } from "@/components/admin/credit-grant-form";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin" };

export default async function AdminPage() {
  void headers();
  const mode = adminBanner();
  if (mode === "locked") {
    return (
      <main className="py-2">
        <h1 className="text-2xl font-bold">Admin</h1>
        <p className="mt-2 rounded-xl bg-[#fef2f2] p-4 text-sm text-[#b91c1c]">
          Locked. Set ADMIN_API_TOKEN and pass it as x-admin-token.
        </p>
      </main>
    );
  }
  const portfolios = await listPortfolios();
  const bal = await balance(demoUser.id);
  const txs = await history(demoUser.id, 10);

  return (
    <main className="py-2">
      <h1 className="text-2xl font-bold">Admin</h1>
      {mode === "open-dev" && (
        <p className="mt-2 rounded-xl bg-[#fffbeb] p-3 text-sm text-[#92400e]">
          Dev mode: no ADMIN_API_TOKEN set. This panel denies everything in production until a token is configured.
        </p>
      )}

      <section className="mt-5 rounded-2xl border border-[#E2E8F0] bg-white p-5">
        <h2 className="font-semibold">Portfolios ({portfolios.length})</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {portfolios.map((p) => (
            <li key={p.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-[#F7FAFC] px-3 py-2">
              <span className="font-medium">{p.profile.name} <span className="text-[#64748B]">· {p.slug} · v{p.version} · {p.publishing.status}</span></span>
              <span className="text-[#64748B]">{p.theme.templateId}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4 rounded-2xl border border-[#E2E8F0] bg-white p-5">
        <h2 className="font-semibold">Credits — {demoUser.id} (balance {bal})</h2>
        <CreditGrantForm />
        <ul className="mt-3 space-y-1.5 text-sm">
          {txs.map((t) => (
            <li key={t.id} className="flex items-center justify-between rounded-lg bg-[#F7FAFC] px-3 py-1.5">
              <span>{t.type} <span className="text-[#94a3b8]">{t.createdAt.slice(0, 10)}</span></span>
              <span className={t.amount < 0 ? "text-[#b91c1c]" : "text-[#166534]"}>
                {t.amount > 0 ? `+${t.amount}` : t.amount}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
