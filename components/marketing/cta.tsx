import Link from "next/link";

export function CTA() {
  return (
    <section aria-labelledby="cta-heading" className="mx-auto w-full max-w-6xl px-6 pb-16">
      <div className="rounded-3xl bg-gradient-to-br from-[#2563EB] to-[#7c3aed] px-6 py-14 text-center text-white md:px-16">
        <h2 id="cta-heading" className="mx-auto max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
          Your work deserves a world-class stage.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-white/80">
          Professional work deserves professional presentation. Start from the
          CV you already have.
        </p>
        <Link
          href="/app/dashboard"
          className="mt-7 inline-block rounded-xl bg-white px-7 py-3.5 font-semibold text-[#07142F] hover:bg-[#F7FAFC]"
        >
          Build My Portfolio
        </Link>
      </div>
    </section>
  );
}
