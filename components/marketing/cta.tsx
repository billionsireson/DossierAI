import Link from "next/link";
import { Icons } from "@/components/marketing/icons";

export function CTA() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden border-y border-[rgba(73,147,255,0.28)] px-6 py-16 md:py-24"
      style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(0,100,255,0.22), transparent 65%), linear-gradient(120deg, #04152e, #061a3d 55%, #031027)" }}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="max-w-xl">
          <h2 id="cta-heading" className="text-3xl font-semibold tracking-tight text-[#f4f8ff] md:text-[2.5rem] md:leading-[1.15]">
            Your work deserves a world-class stage.
          </h2>
          <p className="mt-3 text-[#b6c8e2]">
            Professional work deserves professional presentation. Start from the
            CV you already have.
          </p>
        </div>
        <Link
          href="/app/dashboard"
          className="inline-flex min-h-[46px] shrink-0 items-center gap-3 rounded-full bg-gradient-to-r from-[#0875ff] via-[#0755f5] to-[#4338ff] px-[22px] py-3 text-sm font-semibold text-white shadow-[0_6px_24px_rgba(0,93,255,0.24)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_48px_rgba(0,112,255,0.32)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00c8ff]"
        >
          Start Your Journey Here
          <Icons.arrow className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
