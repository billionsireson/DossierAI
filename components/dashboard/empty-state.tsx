import Link from "next/link";

export function EmptyPortfolios() {
  return (
    <div className="rounded-2xl border border-dashed border-[#cbd5e1] bg-white p-10 text-center">
      <h3 className="font-semibold text-[#0F172A]">No portfolios yet</h3>
      <p className="mx-auto mt-1 max-w-sm text-sm text-[#64748B]">
        Upload your CV or project files and DossierAI will build your first
        portfolio in minutes.
      </p>
      <Link
        href="/app/create"
        className="mt-5 inline-block rounded-xl bg-[#2563EB] px-5 py-2.5 font-semibold text-white hover:bg-[#1d4ed8]"
      >
        Create Portfolio
      </Link>
    </div>
  );
}
