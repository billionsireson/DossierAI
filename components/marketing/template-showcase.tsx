import Image from "next/image";
import Link from "next/link";
import { Spot } from "@/components/motion/spot";

const SCREENSHOTS = [
  {
    id: "modern-professional",
    name: "Modern Professional",
    src: "/templates/modern-professional.png",
    alt: "Modern Professional template preview",
  },
  {
    id: "creative-minimal",
    name: "Creative Minimal",
    src: "/templates/creative-minimal.png",
    alt: "Creative Minimal template preview",
  },
  {
    id: "corporate-executive",
    name: "Corporate Executive",
    src: "/templates/corporate-executive.png",
    alt: "Corporate Executive template preview",
  },
  {
    id: "tech-developer",
    name: "Tech / Developer",
    src: "/templates/tech-developer.png",
    alt: "Tech Developer template preview",
  },
];

function CssThumb({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="h-44 overflow-hidden rounded-xl border border-[#E2E8F0]">{children}</div>
      <p className="mt-2.5 text-sm font-semibold text-[#031126]">{label}</p>
    </div>
  );
}

export function TemplateShowcase({ compact = false }: { compact?: boolean }) {
  return (
    <section
      aria-labelledby="templates-heading"
      className="py-20"
      style={{ backgroundColor: "#d6f0fa", backgroundImage: "linear-gradient(rgba(202,237,249,0.35), rgba(202,237,249,0.35))" }}
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="templates-heading" className="text-3xl font-semibold tracking-tight text-[#031126] md:text-[2.5rem] md:leading-[1.15]">
              Portfolio Templates
            </h2>
            <p className="mt-2 text-[#334155]">
              Choose from a range of professional, modern templates — all fully customizable.
            </p>
          </div>
          {!compact && (
            <Link href="/examples" className="text-sm font-semibold text-[#0644db] hover:text-[#031126]">
              See all examples →
            </Link>
          )}
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SCREENSHOTS.map((t) => (
            <Spot
              key={t.id}
              className="group rounded-[18px] border border-[rgba(8,101,255,0.18)] bg-white p-3 shadow-[0_16px_48px_rgba(3,17,38,0.12)] transition-all duration-200 hover:-translate-y-1 hover:border-[#0865ff] hover:shadow-[0_0_30px_rgba(0,102,255,0.2)]"
            >
              <div className="overflow-hidden rounded-xl border border-[#E2E8F0]">
                <Image
                  src={t.src}
                  alt={t.alt}
                  width={270}
                  height={258}
                  className="h-44 w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <p className="mt-2.5 px-1 pb-1 text-sm font-semibold text-[#031126]">{t.name}</p>
            </Spot>
          ))}
          <Spot className="group rounded-[18px] border border-[rgba(8,101,255,0.18)] bg-white p-3 shadow-[0_16px_48px_rgba(3,17,38,0.12)] transition-all duration-200 hover:-translate-y-1 hover:border-[#0865ff] hover:shadow-[0_0_30px_rgba(0,102,255,0.2)]">
            <CssThumb label="Digital Creator">
              <div className="flex h-full flex-col bg-[#0d1442] p-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#f472b6] to-[#7c3aed] text-[10px] font-bold text-white">▶</div>
                  <div className="flex-1">
                    <div className="h-1.5 w-3/4 rounded bg-white" />
                    <div className="mt-1 h-1 w-1/2 rounded bg-[#f472b6]" />
                  </div>
                </div>
                <div className="mt-2 h-16 rounded-lg bg-gradient-to-br from-[#7c3aed] via-[#ec4899] to-[#f59e0b]" />
                <div className="mt-2 grid grid-cols-3 gap-1.5">
                  <div className="h-8 rounded bg-white/15" />
                  <div className="h-8 rounded bg-white/15" />
                  <div className="h-8 rounded bg-white/15" />
                </div>
              </div>
            </CssThumb>
          </Spot>
          <Spot className="group rounded-[18px] border border-[rgba(8,101,255,0.18)] bg-white p-3 shadow-[0_16px_48px_rgba(3,17,38,0.12)] transition-all duration-200 hover:-translate-y-1 hover:border-[#0865ff] hover:shadow-[0_0_30px_rgba(0,102,255,0.2)]">
            <CssThumb label="Spotlight Editorial">
              <div className="flex h-full flex-col bg-white">
                <div className="bg-[#0d1442] px-3 py-2.5">
                  <div className="h-1.5 w-1/2 rounded bg-white" />
                  <div className="mt-1 h-1 w-2/3 rounded bg-[#00c8ff]" />
                </div>
                <div className="flex-1 space-y-1.5 p-2.5">
                  <div className="h-1 w-1/3 rounded bg-[#0865ff]" />
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="h-12 rounded bg-gradient-to-br from-[#1e3a8a] to-[#00c8ff]" />
                    <div className="h-12 rounded bg-gradient-to-br from-[#4338ff] to-[#00c8ff]" />
                  </div>
                  <div className="h-1 w-full rounded bg-[#e2e8f0]" />
                </div>
              </div>
            </CssThumb>
          </Spot>
        </div>
      </div>
    </section>
  );
}
