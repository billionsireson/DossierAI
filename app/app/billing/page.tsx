import { getCurrentUser } from "@/lib/auth/current-user";
import { CheckoutButtons } from "@/components/billing/checkout-buttons";

export const dynamic = "force-dynamic";
export const metadata = { title: "Billing" };

export default async function BillingPage() {
  const user = await getCurrentUser();
  return (
    <main className="py-2">
      <h1 className="text-2xl font-bold">Billing</h1>
      <p className="mt-1 text-sm text-[#64748B]">
        Current plan: <span className="font-semibold text-[#0F172A]">{user?.plan ?? "FREE"}</span>.
        Subscriptions are handled by Paystack; webhooks apply your plan and monthly credits automatically.
      </p>
      <div className="mt-5 max-w-md rounded-2xl border border-[#E2E8F0] bg-white p-6">
        <h2 className="font-semibold">Upgrade</h2>
        <CheckoutButtons />
      </div>
    </main>
  );
}
