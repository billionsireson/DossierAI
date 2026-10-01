import { Badge } from "@/components/ui/primitives";
import { requestStatuses } from "@/lib/data";
import RequestForm from "@/components/request/RequestForm";

// MVP §13 — fields + status flow verbatim. Image first, then the ten
// text fields. Delivery requirement is a field, not a checkbox extra.
export default function RequestNew() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-12">
      <Badge tone="burgundy">REQUEST → MATCH → CONNECT</Badge>
      <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight">Request this furniture</h1>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {requestStatuses.map((s, i) => (
          <span key={s} className="inline-flex items-center gap-1.5">
            <span className={`text-[10px] font-extrabold px-2 py-1 rounded-full border ${i === 0 ? "bg-burgundy text-white border-burgundy" : "bg-surface border-border text-muted"}`}>
              {s}
            </span>
            {i < requestStatuses.length - 1 && <span className="text-muted text-[10px]">→</span>}
          </span>
        ))}
      </div>

      <RequestForm />
    </main>
  );
}
