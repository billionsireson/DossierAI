import Link from "next/link";
import { Logo } from "@/components/logo";
import { demoUser } from "@/lib/demo";

const NAV = [
  { href: "/app/dashboard", label: "Dashboard" },
  { href: "/app/portfolios", label: "My Portfolios" },
  { href: "/app/templates", label: "Templates" },
  { href: "/app/credits", label: "Credits" },
  { href: "/app/settings", label: "Settings" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      <div className="mx-auto flex w-full max-w-6xl gap-6 px-6 py-6">
        <aside
          aria-label="Account navigation"
          className="hidden w-60 shrink-0 flex-col rounded-2xl border border-[#E2E8F0] bg-white p-4 md:flex"
        >
          <Logo />
          <nav className="mt-6 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="rounded-lg px-3 py-2 text-sm text-[#475569] hover:bg-[#F7FAFC] hover:text-[#0F172A]"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto rounded-xl bg-[#F7FAFC] p-3 text-sm">
            <p className="font-semibold text-[#0F172A]">{demoUser.name}</p>
            <p className="text-xs text-[#64748B]">{demoUser.plan} · {demoUser.credits} credits</p>
          </div>
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
