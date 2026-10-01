import SearchHero from "@/components/search/SearchHero";
import ProductCard from "@/components/product/ProductCard";
import BusinessCard from "@/components/business/BusinessCard";
import { SectionHeading, Button, TrustSplit } from "@/components/ui/primitives";
import { products, businesses, categories } from "@/lib/data";

export default function Home() {
  return (
    <main>
      {/* MVP §8 Screen 1 — Landing. Copy is verbatim from the rundown. */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 md:pt-14 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-[11px] font-extrabold tracking-[0.2em] text-steel-dark uppercase">
            GREGREY · DISCOVER → MATCH → CONNECT
          </p>
          <h1 className="mt-3 text-[34px] sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Find the furniture you have in mind.
          </h1>
          <p className="mt-4 text-ink-soft leading-relaxed max-w-md">
            Find it. Match with the right business. Get it. Upload a photo, take a
            picture or describe what you want — we&apos;ll help you find relevant
            options and the businesses that can supply or make them.
          </p>
          <div className="mt-6">
            <SearchHero />
          </div>
          <div className="mt-4 flex items-center gap-3 text-xs text-muted">
            <span className="font-bold text-ink">DISCOVER → MATCH → CONNECT</span>
            <span>·</span>
            <span>Find it. Match with the right business. Get it.</span>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-[28px] overflow-hidden border border-border shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80&auto=format&fit=crop"
              alt="Modern living room"
              className="w-full h-[320px] sm:h-[440px] object-cover"
            />
          </div>
          <div className="absolute -bottom-5 left-5 right-5 sm:left-8 sm:right-auto bg-surface border border-border rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-emerald-50 grid place-items-center">✓</span>
            <div className="text-sm">
              <p className="font-bold">3 capable makers found in Lekki</p>
              <p className="text-muted text-[13px]">Image understood · 96% top match</p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
        <SectionHeading
          eyebrow="Browse"
          title={<>Shop by space, not jargon.</>}
          sub="Search naturally — we map your words and photos to categories, materials and makers."
        />
        <div className="mt-6 grid grid-cols-3 sm:grid-cols-6 gap-3">
          {categories.map((c) => (
            <a
              key={c.label}
              href={`/search?q=${c.label}`}
              className="bg-surface border border-border rounded-2xl py-5 flex flex-col items-center gap-2 hover:border-burgundy hover:shadow-md transition"
            >
              <span className="text-3xl">{c.icon}</span>
              <span className="text-sm font-bold">{c.label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* RESULTS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-14">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Match engine · Level 1–3"
            title={<>Exact, similar, and capable makers.</>}
          />
          <a href="/search" className="hidden sm:inline-flex text-sm font-bold text-burgundy whitespace-nowrap">
            View all →
          </a>
        </div>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.slice(0, 3).map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-14">
        <div className="rounded-[28px] overflow-hidden grid md:grid-cols-2 bg-ink text-white">
          <div className="p-8 sm:p-10">
            <p className="text-[11px] font-extrabold tracking-[0.2em] text-sky uppercase">
              Why Gregrey
            </p>
            <h2 className="mt-2 text-3xl font-extrabold leading-tight">
              Better furniture connections. Real people. Real spaces.
            </h2>
            <p className="mt-3 text-white/70 leading-relaxed">
              We never mix guesses with facts. AI inferences are labelled. Business
              facts are verified. That distinction is a trust feature.
            </p>
            <div className="mt-6">
              <Button href="/search" variant="light">Explore now →</Button>
            </div>
          </div>
          <div className="bg-surface text-ink p-6 sm:p-8">
            <TrustSplit
              ai={[
                "Possible category: Sofa",
                "Possible style: Contemporary",
                "Possible colour: Charcoal",
              ]}
              verified={[
                "Price: ₦850,000",
                "Available: Made to order · 14 days",
                "Delivery: Lagos",
              ]}
            />
          </div>
        </div>
      </section>

      {/* BUSINESSES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-14 mb-16">
        <SectionHeading
          eyebrow="Lagos pilot"
          title={<>Trusted businesses that can make it.</>}
          sub="50–100 pilot businesses across Lekki, Ikeja, Yaba and Surulere."
        />
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {businesses.slice(0, 2).map((b) => (
            <BusinessCard key={b.id} b={b} />
          ))}
        </div>
      </section>
    </main>
  );
}
