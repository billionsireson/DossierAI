import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)} aria-label="DossierAI home">
      <span
        aria-hidden
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg bg-[#07142F] text-lg font-bold text-[#B7F000]",
          markClassName,
        )}
        style={{ fontFamily: "Inter, Plus Jakarta Sans, sans-serif" }}
      >
        D
      </span>
      <span className="text-lg font-semibold tracking-tight text-[#0F172A]">
        DossierAI
      </span>
    </Link>
  );
}
