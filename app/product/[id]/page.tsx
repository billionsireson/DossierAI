import { notFound } from "next/navigation";
import { products } from "@/lib/data";
import { Badge, TrustSplit } from "@/components/ui/primitives";
import ProductCard from "@/components/product/ProductCard";
import EnquiryPanel from "@/components/enquiry/EnquiryPanel";

// MVP §14 — every field rendered: images, name, category, price/range,
// material, colour, dimensions, availability, customisation, production time,
// delivery, business name, business location, verification. CTA: Ask Business.
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = products.find((x) => x.id === id);
  if (!p) return notFound();

  const specs: Array<[string, string]> = [
    ["Category", p.category],
    ["Price / range", p.priceLabel],
    ["Material", p.material],
    ["Colour", p.colour],
    ["Dimensions", p.dimensions],
    ["Availability", p.availability],
    ["Customisation", p.customization],
    ["Production time", p.productionTime],
    ["Delivery", p.delivery],
    ["Business name", p.business],
    ["Business location", p.location],
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-12 grid lg:grid-cols-2 gap-8">
      <div>
        <div className="rounded-3xl overflow-hidden border border-border bg-surface">
          <img src={p.image} alt={p.name} className="w-full aspect-[4/3] object-cover" />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <img key={i} src={p.image} alt="" className="rounded-2xl border border-border aspect-square object-cover opacity-80" />
          ))}
        </div>
      </div>
      <div>
        <div className="flex flex-wrap gap-2">
          {p.verified ? <Badge tone="verified">✓ Business verified</Badge> : <Badge tone="neutral">Unverified</Badge>}
          <Badge tone="ai">✦ {p.matchScore}% AI match</Badge>
          {p.customizable && <Badge tone="mist">Customisable</Badge>}
        </div>
        <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">{p.name}</h1>
        <p className="mt-1 text-sm text-muted">{p.category} · {p.material} · {p.colour}</p>
        <p className="mt-3 text-3xl font-extrabold text-burgundy">{p.priceLabel}</p>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          {specs.map(([k, v]) => (
            <div key={k} className="bg-surface border border-border rounded-2xl p-3">
              <dt className="text-[11px] font-bold uppercase tracking-wider text-muted">{k}</dt>
              <dd className="mt-1 font-semibold">{v}</dd>
            </div>
          ))}
          <div className="bg-surface border border-border rounded-2xl p-3">
            <dt className="text-[11px] font-bold uppercase tracking-wider text-muted">Verification</dt>
            <dd className="mt-1 font-semibold">{p.verified ? "✓ Verified business" : "Pending verification"}</dd>
          </div>
        </dl>
        {/* MVP §6 — AI-detected vs business-verified is a trust feature */}
        <div className="mt-5">
          <TrustSplit
            ai={[
              "Possible category: Sofa",
              "Possible style: Contemporary",
              `Possible colour: ${p.colour}`,
              `Possible material: ${p.material}`,
            ]}
            verified={[
              `Price: ${p.priceLabel}`,
              `Dimensions: ${p.dimensions}`,
              `Available: ${p.availability}`,
              `Production: ${p.productionTime}`,
              `Delivery: ${p.delivery}`,
            ]}
          />
        </div>
        {/* MVP §15 — structured enquiry, verbatim prompts + local thread */}
        <EnquiryPanel product={p} />
      </div>
      <div className="lg:col-span-2">
        <h2 className="font-extrabold text-lg">You may also like</h2>
        <div className="mt-3 grid sm:grid-cols-3 gap-4">
          {products.filter((x) => x.id !== p.id).slice(0, 3).map((x) => (
            <ProductCard key={x.id} p={x} />
          ))}
        </div>
      </div>
    </main>
  );
}
