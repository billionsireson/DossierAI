import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
