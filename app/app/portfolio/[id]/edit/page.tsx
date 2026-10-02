import Link from "next/link";
import { demoPortfolios } from "@/lib/demo";

export const metadata = { title: "Edit" };

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const portfolio = demoPortfolios.find((p) => p.id === id) ?? demoPortfolios[0];

  return (
    <main className="py-2">
      <Link
        href={`/app/portfolio/${portfolio.id}/preview`}
        className="text-sm text-[#64748B] hover:text-[#0F172A]"
      >
        ← Preview
      </Link>
      <h1 className="mt-3 text-2xl font-bold">Make it yours.</h1>
      <p className="mt-1 text-sm text-[#64748B]">
        Structured section editing (content · order · visibility). Full editor
        lands in Milestone 7.
      </p>
      <ul className="mt-5 space-y-2">
        {[...portfolio.sections]
          .sort((a, b) => a.order - b.order)
          .map((s) => (
            <li
              key={s.id}
              className="flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm"
            >
              <span className="font-medium capitalize">{s.type}</span>
              <span className="text-[#64748B]">
                {s.visible ? "visible" : "hidden"} · order {s.order}
              </span>
            </li>
          ))}
      </ul>
    </main>
  );
}
