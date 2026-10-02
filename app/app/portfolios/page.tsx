import { PortfolioCard } from "@/components/dashboard/portfolio-card";
import { demoPortfolios } from "@/lib/demo";

export const metadata = { title: "My Portfolios" };

export default function PortfoliosPage() {
  return (
    <main className="py-2">
      <h1 className="text-2xl font-bold">My Portfolios</h1>
      <ul className="mt-5 grid gap-4 md:grid-cols-2">
        {demoPortfolios.map((p) => (
          <li key={p.id}>
            <PortfolioCard portfolio={p} />
          </li>
        ))}
      </ul>
    </main>
  );
}
