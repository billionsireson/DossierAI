import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Brand logo — mark cropped from the official DossierAI lockup
 * (public/brand/dossier-mark.png). Full lockup lives at
 * public/brand/dossier-logo.png for dark surfaces.
 */
export function Logo({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2", className)}
      aria-label="DossierAI home"
    >
      <Image
        src="/brand/dossier-mark.png"
        alt="DossierAI mark"
        width={36}
        height={36}
        className="h-9 w-9"
        priority
      />
      <span
        className={cn(
          "text-lg font-semibold tracking-tight",
          tone === "dark" ? "text-white" : "text-[#0F172A]",
        )}
      >
        Dossier<span className="text-[#2563EB]">AI</span>
      </span>
    </Link>
  );
}

export function LogoLockup({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/dossier-logo.png"
      alt="DossierAI"
      width={220}
      height={110}
      className={cn("h-auto w-44", className)}
      priority
    />
  );
}
