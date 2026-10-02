import { demoUser } from "@/lib/demo";

export const metadata = { title: "Credits" };

export default function CreditsPage() {
  return (
    <main className="py-2">
      <h1 className="text-2xl font-bold">Credits</h1>
      <div className="mt-5 rounded-2xl border border-[#E2E8F0] bg-white p-6">
        <p className="text-sm text-[#64748B]">Balance (sample data)</p>
        <p className="mt-1 text-4xl font-bold">{demoUser.credits}</p>
        <p className="mt-3 text-sm text-[#64748B]">
          Subscriptions grant monthly allocations into an immutable ledger.
          Generation, regeneration and AI rewrites consume credits; manual
          edits never do. Ledger + purchase flow land in Milestone 9.
        </p>
      </div>
    </main>
  );
}
