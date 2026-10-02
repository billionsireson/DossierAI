import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ variant = "primary", className, ...rest }: Props) {
  return (
    <button
      {...rest}
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors",
        variant === "primary" && "bg-[#2563EB] text-white hover:bg-[#1d4ed8]",
        variant === "secondary" &&
          "border border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F7FAFC]",
        variant === "ghost" && "text-[#64748B] hover:text-[#0F172A]",
        className,
      )}
    />
  );
}
