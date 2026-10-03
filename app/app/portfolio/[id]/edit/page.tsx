import Link from "next/link";
import { EditorForm } from "@/components/editor/editor-form";
import { getPortfolio, listVersions } from "@/lib/portfolio/store";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit" };

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const portfolio = await getPortfolio(id);
  if (!portfolio) {
    return (
      <main className="py-2">
        <p>Portfolio not found.</p>
        <Link href="/app/dashboard" className="text-sm text-[#2563EB] hover:underline">
          ← Dashboard
        </Link>
      </main>
    );
  }
  const versions = await listVersions(id);

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
        Content · sections · design. {versions.length} version{versions.length === 1 ? "" : "s"} saved.
      </p>
      <div className="mt-5">
        <EditorForm initial={portfolio} />
      </div>
    </main>
  );
}
