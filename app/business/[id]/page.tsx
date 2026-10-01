import { notFound } from "next/navigation";
import { businesses, products } from "@/lib/data";
import { Badge, Button } from "@/components/ui/primitives";
import ProductCard from "@/components/product/ProductCard";

// MVP §16 — profile carries: name, logo, description, location, service
// areas, verification, capabilities, catalogue, portfolio, operating hours,
// contact, response info. No invented sections.
export default async function BusinessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const b = businesses.find((x) => x.id === id);
  if (!b) return notFound();
  const catalogue = products.filter((p) => p.businessId === b.id);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-12">
      <div className="rounded-3xl overflow-hidden border border-border bg-surface">
        <img src={b.image} alt={b.name} className="w-full h-48 sm:h-64 object-cover" />
        <div className="p-5 sm:p-7 flex flex-col sm:flex-row gap-5">
          <img src="/brand/logo-mark.svg" alt={`${b.name} logo`} className="w-14 h-14 rounded-2xl border border-border bg-mist-light p-1.5 shrink-0" />
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-extrabold tracking-tight">{b.name}</h1>
              {b.verified ? (
                <Badge tone="verified">✓ Verified business</Badge>
              ) : (
                <Badge tone="neutral">Pending verification</Badge>
              )}
            </div>
            <p className="mt-2 text-[15px] text-ink-soft leading-relaxed">{b.description}</p>
            <p className="text-sm text-muted mt-2">{b.location}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {b.capabilities.map((c) => (
                <span key={c} className="text-xs font-bold px-3 py-1.5 rounded-full bg-mist-light border border-border">{c}</span>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted">Service areas: {b.serviceAreas.join(" · ")}</p>
          </div>
          <div className="flex sm:flex-col gap-2 shrink-0">
            <Button variant="primary">Ask business</Button>
            <Button variant="outline">Request quote</Button>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-3 px-5 sm:px-7 pb-6 text-sm">
          <div className="bg-background border border-border rounded-2xl p-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted">Operating hours</p>
            <p className="mt-1 font-semibold">{b.operatingHours}</p>
          </div>
          <div className="bg-background border border-border rounded-2xl p-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted">Contact</p>
            <p className="mt-1 font-semibold">{b.contact}</p>
          </div>
          <div className="bg-background border border-border rounded-2xl p-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted">Response information</p>
            <p className="mt-1 font-semibold">{b.responseTime} response · {b.products} products</p>
          </div>
        </div>
      </div>

      <h2 className="mt-8 font-extrabold text-lg">Product catalogue {catalogue.length ? `(${catalogue.length})` : ""}</h2>
      <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(catalogue.length ? catalogue : products.slice(0, 3)).map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>

      <h2 className="mt-8 font-extrabold text-lg">Portfolio</h2>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {b.portfolio.map((src) => (
          <img key={src} src={src} alt={`${b.name} portfolio`} className="rounded-2xl border border-border aspect-square object-cover" loading="lazy" />
        ))}
      </div>
    </main>
  );
}
