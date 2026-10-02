import { PortfolioCard } from "@/components/dashboard/portfolio-card";
import { listPortfolios } from "@/lib/portfolio/store";

export const dynamic = "force-dynamic";
export const metadata = { title: "My Portfolios" };

export default function PortfoliosPage() {
  const portfolios = listPortfolios();
  return (
    <main className="py-2">
      <h1 className="text-2xl font-bold">My Portfolios</h1>
      <ul className="mt-5 grid gap-4 md:grid-cols-2">
        {portfolios.map((p) => (
          <li key={p.id}>
            <PortfolioCard portfolio={p} />
          </li>
        ))}
      </ul>
    </main>
  );
}
