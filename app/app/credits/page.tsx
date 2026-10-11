import { balance, history } from "@/lib/credits/ledger";
import { getCurrentUser, getCurrentUserId } from "@/lib/auth/current-user";
import { PLANS } from "@/lib/billing/plans";
import { demoUser } from "@/lib/demo";

export const dynamic = "force-dynamic";
export const metadata = { title: "Credits" };

export default async function CreditsPage() {
  const userId = await getCurrentUserId();
  const user = await getCurrentUser();
  const bal = await balance(userId);
  const txs = await history(userId);
  return (
    <main id="main" className="py-2">
      <h1 className="text-2xl font-semibold text-white">Credits</h1>
      <div className="glass-panel mt-5 p-6">
        <p className="text-sm text-[#7892b5]">Balance</p>
        <p className="mt-1 text-4xl font-bold text-white">{bal}</p>
        <p className="mt-3 text-sm text-[#b6c8e2]">
          {user?.plan ?? demoUser.plan} plan · {PLANS[(user?.plan ?? demoUser.plan) as keyof typeof PLANS].creditsPerMonth} credits/month.
          Generation, regeneration and AI rewrites consume credits; manual
          edits never do.
        </p>
      </div>
      <div className="glass-panel mt-4 p-6">
        <h2 className="font-semibold text-white">History</h2>
        {txs.length === 0 ? (
          <p className="mt-2 text-sm text-[#b6c8e2]">
            No transactions yet. Generate a portfolio or claim a demo grant to
            start the ledger.
          </p>
        ) : (
          <ul className="mt-3 space-y-2 text-sm">
            {txs.map((t) => (
              <li key={t.id} className="flex items-center justify-between rounded-lg bg-[rgba(7,26,51,0.75)] px-3 py-2 text-white">
                <span className="font-medium">{t.type}</span>
                <span className={t.amount < 0 ? "text-[#ff8a8a]" : "text-[#64ddff]"}>
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
