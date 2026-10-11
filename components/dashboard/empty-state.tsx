import Link from "next/link";

export function EmptyPortfolios() {
  return (
    <div className="glass-panel p-10 text-center">
      <h3 className="font-semibold text-white">No portfolios yet</h3>
      <p className="mx-auto mt-1 max-w-sm text-sm text-[#b6c8e2]">
        Upload your CV or project files and DossierAI will build your first
        portfolio in minutes.
      </p>
      <Link href="/app/create" className="ocean-btn mt-5">
        Create Portfolio
      </Link>
    </div>
  );
}
