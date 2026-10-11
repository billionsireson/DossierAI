import Link from "next/link";
import { LogoLockup } from "@/components/logo";
import { SignOutButton } from "@/components/auth/signout-button";
import { getCurrentUser, getCurrentUserId } from "@/lib/auth/current-user";
import { demoUser } from "@/lib/demo";
import { balance } from "@/lib/credits/ledger";

const NAV = [
  { href: "/app/dashboard", label: "Home" },
  { href: "/app/create", label: "Create Portfolio" },
  { href: "/app/portfolios", label: "My Portfolios" },
  { href: "/app/templates", label: "Templates" },
  { href: "/app/credits", label: "Credits" },
  { href: "/app/settings", label: "Settings" },
  { href: "/app/admin", label: "Admin" },
];

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  const credits = await balance(await getCurrentUserId());
  const name = user?.name ?? demoUser.name;
  const plan = user?.plan ?? demoUser.plan;
  return (
    <div className="min-h-screen bg-[#020914] text-[#f4f8ff]">
      <div className="mx-auto flex w-full max-w-[1680px] gap-6 px-4 py-6 md:px-8">
        <aside
          aria-label="Account navigation"
          className="hidden w-60 shrink-0 flex-col self-start rounded-[18px] border border-[rgba(73,147,255,0.28)] bg-[rgba(5,24,49,0.78)] p-4 text-white backdrop-blur-[18px] md:sticky md:top-6 md:flex md:min-h-[calc(100vh-3rem)]"
        >
          <LogoLockup className="w-36" />
          <nav className="mt-6 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="rounded-xl px-3 py-2 text-sm text-[#b6c8e2] transition-colors hover:bg-[rgba(0,104,255,0.12)] hover:text-white focus-visible:outline-2 focus-visible:outline-[#00c8ff]"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto space-y-1 rounded-xl border border-[rgba(73,147,255,0.14)] bg-[rgba(7,26,51,0.75)] p-3 text-sm">
            <p className="font-semibold text-white">{name}</p>
            <p className="text-xs text-[#7892b5]">{plan} · {credits} credits</p>
            {user && <SignOutButton />}
          </div>
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
