import { balance, history } from "@/lib/credits/ledger";
import { PLANS } from "@/lib/billing/plans";
import { demoUser } from "@/lib/demo";

export const dynamic = "force-dynamic";
export const metadata = { title: "Credits" };

export default async function CreditsPage() {
  const bal = await balance(demoUser.id);
  const txs = await history(demoUser.id);

  return (
    <main className="py-2">
      <h1 className="text-2xl font-bold">Credits</h1>
      <div className="mt-5 rounded-2xl border border-[#E2E8F0] bg-white p-6">
        <p className="text-sm text-[#64748B]">Balance</p>
        <p className="mt-1 text-4xl font-bold">{bal}</p>
        <p className="mt-3 text-sm text-[#64748B]">
          {demoUser.plan} plan · {PLANS[demoUser.plan].creditsPerMonth} credits/month.
          Generation, regeneration and AI rewrites consume credits; manual
          edits never do.
        </p>
      </div>
      <div className="mt-4 rounded-2xl border border-[#E2E8F0] bg-white p-6">
        <h2 className="font-semibold">History</h2>
        {txs.length === 0 ? (
          <p className="mt-2 text-sm text-[#64748B]">
            No transactions yet. Generate a portfolio or claim a demo grant to
            start the ledger.
          </p>
        ) : (
          <ul className="mt-3 space-y-2 text-sm">
            {txs.map((t) => (
              <li key={t.id} className="flex items-center justify-between rounded-lg bg-[#F7FAFC] px-3 py-2">
                <span className="font-medium">{t.type}</span>
                <span className={t.amount < 0 ? "text-[#b91c1c]" : "text-[#166534]"}>
                  {t.amount > 0 ? `+${t.amount}` : t.amount}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
