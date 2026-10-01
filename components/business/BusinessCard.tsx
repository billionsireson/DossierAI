import { Business } from "@/lib/data";
import { Badge } from "@/components/ui/primitives";
import {
  SaveBusinessButton,
  ShortlistButton,
  CompareBusinessToggle,
} from "@/components/save/StoreButtons";

export default function BusinessCard({ b }: { b: Business }) {
  return (
    <a
      href={`/business/${b.id}`}
      className="flex gap-4 bg-surface border border-border rounded-2xl p-4 hover:shadow-md transition"
    >
      <img
        src={b.image}
        alt={b.name}
        className="w-20 h-20 rounded-xl object-cover bg-mist-light shrink-0"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-bold truncate">{b.name}</h3>
          {b.verified && <Badge tone="verified">✓ Verified</Badge>}
        </div>
        <p className="text-[13px] text-muted mt-0.5">{b.location} · {b.responseTime} response</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {b.capabilities.slice(0, 3).map((c) => (
            <span key={c} className="text-[11px] font-semibold px-2 py-1 rounded-full bg-mist-light border border-border">
              {c}
            </span>
          ))}
          <span className="text-[11px] font-semibold px-2 py-1 rounded-full bg-sky-light/60 border border-sky/50">
            {b.products} products
          </span>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          <SaveBusinessButton id={b.id} />
          <ShortlistButton id={b.id} />
          <CompareBusinessToggle id={b.id} />
        </div>
      </div>
    </a>
  );
}
