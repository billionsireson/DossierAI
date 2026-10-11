import { PAYMENTS_ENABLED } from "@/lib/billing/plans";
import { CheckoutButtons } from "@/components/billing/checkout-buttons";

export const dynamic = "force-dynamic";
export const metadata = { title: "Billing" };

export default function BillingPage() {
  if (!PAYMENTS_ENABLED) {
    return (
      <main id="main" className="py-2">
        <h1 className="text-2xl font-semibold text-white">Billing</h1>
        <div className="glass-panel mt-5 max-w-md p-6">
          <h2 className="font-semibold text-white">Free for everyone</h2>
          <p className="mt-2 text-sm text-[#b6c8e2]">
            Payments are paused — DossierAI is free to use. You get 15 credits
            every 12 hours, and 1 portfolio generation costs 1 credit.
          </p>
        </div>
      </main>
    );
  }
  return (
    <main id="main" className="py-2">
      <h1 className="text-2xl font-semibold text-white">Billing</h1>
      <p className="mt-1 text-sm text-[#b6c8e2]">
        Subscriptions are handled by Paystack; webhooks apply your plan and monthly credits automatically.
      </p>
      <div className="glass-panel mt-5 max-w-md p-6">
        <h2 className="font-semibold text-white">Upgrade</h2>
        <CheckoutButtons />
      </div>
    </main>
  );
}
