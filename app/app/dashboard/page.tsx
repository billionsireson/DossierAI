import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <Link href="/" className="text-sm text-[#64748B] hover:text-[#0F172A]">
        ← Back
      </Link>
      <h1 className="mt-4 text-3xl font-bold">Ready to build your next portfolio?</h1>
      <p className="mt-2 text-[#64748B]">
        Dashboard shell (Milestone 0). Full auth + portfolio cards land in
        Milestone 2.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {["My Portfolios", "Templates", "Credits"].map((t) => (
          <Card key={t}>
            <h2 className="font-semibold">{t}</h2>
            <p className="mt-1 text-sm text-[#64748B]">Coming soon.</p>
          </Card>
        ))}
      </div>
    </main>
  );
}
