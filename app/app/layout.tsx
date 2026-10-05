import Link from "next/link";
import { LogoLockup } from "@/components/logo";
import { getCurrentUser, getCurrentUserId } from "@/lib/auth/current-user";
import { demoUser } from "@/lib/demo";
import { balance } from "@/lib/credits/ledger";

const NAV = [
  { href: "/app/dashboard", label: "Home" },
  { href: "/app/create", label: "Create Portfolio" },
  { href: "/app/portfolios", label: "My Portfolios" },
  { href: "/app/templates", label: "Templates" },
  { href: "/app/credits", label: "Credits" },
  { href: "/app/billing", label: "Billing" },
  { href: "/app/settings", label: "Settings" },
  { href: "/app/admin", label: "Admin" },
];

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  const credits = await balance(await getCurrentUserId());
  const name = user?.name ?? demoUser.name;
  const plan = user?.plan ?? demoUser.plan;
  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      <div className="mx-auto flex w-full max-w-6xl gap-6 px-6 py-6">
        <aside
          aria-label="Account navigation"
          className="hidden w-60 shrink-0 flex-col rounded-2xl bg-[#07142F] p-4 text-white md:flex"
        >
          <LogoLockup className="w-36" />
          <nav className="mt-6 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="rounded-lg px-3 py-2 text-sm text-[#cbd5e1] hover:bg-white/10 hover:text-white"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto rounded-xl bg-white/10 p-3 text-sm">
            <p className="font-semibold text-white">{name}</p>
            <p className="text-xs text-[#94a3b8]">{plan} · {credits} credits</p>
          </div>
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
