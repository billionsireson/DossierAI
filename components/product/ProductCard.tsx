import { Product } from "@/lib/data";
import { Badge } from "@/components/ui/primitives";
import {
  SaveProductButton,
  CompareProductToggle,
} from "@/components/save/StoreButtons";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <a
      href={`/product/${p.id}`}
      className="group bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-mist-light">
        <img
          src={p.image}
          alt={p.name}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition"
          loading="lazy"
        />
        <div className="absolute top-2.5 left-2.5 flex gap-1.5">
          {p.verified ? (
            <Badge tone="verified">✓ Verified</Badge>
          ) : (
            <Badge tone="neutral">Unverified</Badge>
          )}
          {p.customizable && <Badge tone="mist">Customisable</Badge>}
        </div>
        <div className="absolute top-2.5 right-2.5">
          <span className="inline-flex text-[11px] font-extrabold px-2 py-1 rounded-full bg-ink/85 text-white backdrop-blur">
            {p.matchScore}% match
          </span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
          {p.category} · {p.match}
        </p>
        <h3 className="mt-1 font-bold leading-snug clamp-2">{p.name}</h3>
        <p className="mt-1.5 font-extrabold text-burgundy">{p.priceLabel}</p>
        <p className="mt-1 text-[13px] text-muted">
          {p.business} · {p.location}
        </p>
        <p className="mt-1 text-[13px] text-ink-soft">{p.availability}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <SaveProductButton id={p.id} />
          <CompareProductToggle id={p.id} />
        </div>
      </div>
    </a>
  );
}
