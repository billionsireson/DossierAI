import Link from "next/link";
import { Spot } from "@/components/motion/spot";

function ThumbShell({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div>
      <div className="h-44 overflow-hidden rounded-xl border border-white/10">
        {children}
      </div>
      <p className="mt-2.5 text-sm font-semibold text-white">{label}</p>
    </div>
  );
}

function ModernProfessionalThumb() {
  return (
    <ThumbShell label="Modern Professional">
      <div className="flex h-full flex-col">
        <div className="bg-[#07142F] px-3 py-2.5">
          <div className="h-1.5 w-1/2 rounded bg-white" />
          <div className="mt-1 h-1 w-2/3 rounded bg-[#38bdf8]" />
        </div>
        <div className="flex-1 space-y-1.5 bg-white p-2.5">
          <div className="h-1 w-1/3 rounded bg-[#cbd5e1]" />
          <div className="grid grid-cols-3 gap-1.5">
            <div className="h-9 rounded bg-gradient-to-br from-[#1e3a8a] to-[#0ea5e9]" />
            <div className="h-9 rounded bg-gradient-to-br from-[#7c3aed] to-[#ec4899]" />
            <div className="h-9 rounded bg-gradient-to-br from-[#0f766e] to-[#84cc16]" />
          </div>
          <div className="h-1 w-full rounded bg-[#e2e8f0]" />
          <div className="h-1 w-4/5 rounded bg-[#e2e8f0]" />
        </div>
      </div>
    </ThumbShell>
  );
}

function CreativeMinimalThumb() {
  return (
    <ThumbShell label="Creative Minimal">
      <div className="flex h-full flex-col bg-[#faf9f7] p-3">
        <div className="h-2 w-3/4 rounded bg-[#0F172A]" />
        <div className="mt-1 h-2 w-1/2 rounded bg-[#0F172A]/70" />
        <div className="mt-2 grid flex-1 grid-cols-2 gap-1.5">
          <div className="rounded bg-gradient-to-br from-[#f59e0b] to-[#ef4444]" />
          <div className="rounded bg-gradient-to-br from-[#0F172A] to-[#475569]" />
          <div className="rounded bg-gradient-to-br from-[#0ea5e9] to-[#6366f1]" />
          <div className="rounded bg-gradient-to-br from-[#ec4899] to-[#f59e0b]" />
        </div>
      </div>
    </ThumbShell>
  );
}

function CorporateExecutiveThumb() {
  return (
    <ThumbShell label="Corporate Executive">
      <div className="flex h-full flex-col items-center bg-[#0b1226] px-4 py-3 text-center">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#c9a227] to-[#f5e08c]" />
        <div className="mt-2 h-1.5 w-2/3 rounded bg-white" />
        <div className="mt-1 h-1 w-1/3 rounded bg-[#c9a227]" />
        <div className="mt-2 w-full space-y-1 border-t border-white/15 pt-2">
          <div className="h-1 rounded bg-white/25" />
          <div className="h-1 rounded bg-white/25" />
          <div className="h-1 w-3/4 rounded bg-white/25" />
        </div>
      </div>
    </ThumbShell>
  );
}

function TechDeveloperThumb() {
  return (
    <ThumbShell label="Tech / Developer">
      <div className="flex h-full flex-col bg-[#020617] p-2.5 font-mono">
        <div className="flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#f59e0b]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
        </div>
        <div className="mt-2 space-y-1.5">
          <div className="h-1 w-11/12 rounded bg-[#38bdf8]/80" />
          <div className="ml-2 h-1 w-3/4 rounded bg-[#a78bfa]/80" />
          <div className="ml-2 h-1 w-2/3 rounded bg-[#22c55e]/80" />
          <div className="h-1 w-1/2 rounded bg-[#f59e0b]/80" />
          <div className="ml-2 h-1 w-4/5 rounded bg-[#38bdf8]/60" />
        </div>
        <div className="mt-auto flex gap-1">
          <div className="h-5 flex-1 rounded bg-[#2563EB]/40" />
          <div className="h-5 flex-1 rounded bg-[#7c3aed]/40" />
        </div>
      </div>
    </ThumbShell>
  );
}

export function TemplateShowcase({ compact = false }: { compact?: boolean }) {
  return (
    <section aria-labelledby="templates-heading" className="bg-[#040b1e] py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="templates-heading" className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Portfolio Templates
            </h2>
            <p className="mt-2 text-[#93a4c4]">
              Choose from a range of professional, modern templates — all fully customizable.
            </p>
          </div>
          {!compact && (
            <Link href="/examples" className="text-sm font-medium text-[#38bdf8] hover:text-white">
              See all examples →
            </Link>
          )}
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            <ModernProfessionalThumb key="mp" />,
            <CreativeMinimalThumb key="cm" />,
            <CorporateExecutiveThumb key="ce" />,
            <TechDeveloperThumb key="td" />,
          ].map((t, i) => (
            <Spot
              key={i}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-[#38bdf8]/40 hover:shadow-[0_16px_50px_rgba(37,99,235,0.35)]"
            >
              {t}
            </Spot>
          ))}
        </div>
      </div>
    </section>
  );
}
