import Link from "next/link";
import { EditorForm } from "@/components/editor/editor-form";
import { getPortfolio, listVersions } from "@/lib/portfolio/store";
import { getCurrentUser } from "@/lib/auth/current-user";

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
  // Editing unlocks after email + phone verification (first-generation guard).
  const user = await getCurrentUser();
  const unverified =
    user && (!user.emailVerified || !user.phoneVerified)
      ? [
          !user.emailVerified ? "email" : null,
          !user.phoneVerified ? "phone number" : null,
        ].filter(Boolean) as string[]
      : [];

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
        {unverified.length > 0 ? (
          <div className="rounded-2xl border border-[#fcd34d] bg-[#fffbeb] p-6">
            <h2 className="font-semibold">Verify to unlock editing</h2>
            <p className="mt-1 text-sm text-[#92400e]">
              Please verify your {unverified.join(" and ")} to continue editing.
            </p>
            <Link
              href="/app/verify"
              className="mt-4 inline-block rounded-xl bg-[#180F6E] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Verify now →
            </Link>
          </div>
        ) : (
          <EditorForm initial={portfolio} />
        )}
      </div>
    </main>
  );
}
