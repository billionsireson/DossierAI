"use client";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/search", label: "Explore", icon: "🔍" },
  { href: "/request/new", label: "Request", icon: "➕" },
  { href: "/saved", label: "Saved", icon: "♡" },
];

export default function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-surface border-t border-border">
      <div className="grid grid-cols-4 px-2 py-1.5">
        {tabs.map((t) => {
          const active = pathname === t.href;
          return (
            <a
              key={t.href + t.label}
              href={t.href}
              className={`flex flex-col items-center gap-0.5 py-1.5 rounded-xl text-[11px] font-semibold ${
                active ? "text-burgundy" : "text-muted"
              }`}
            >
              <span className="text-[19px] leading-none">{t.icon}</span>
              {t.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
