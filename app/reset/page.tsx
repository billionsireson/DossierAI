import Link from "next/link";
import { Logo } from "@/components/logo";
import { ResetForm } from "@/components/auth/reset-form";

export const metadata = { title: "Set a new password" };

export default async function ResetPage({
  searchParams,
}: {
  searchParams?: Promise<{ token?: string }>;
}) {
  const token = (await searchParams)?.token ?? "";
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
      <Logo />
      <h1 className="mt-6 text-3xl font-bold">Set a new password</h1>
      {!token ? (
        <p className="mt-2 text-sm text-[#64748B]">
          This link is missing its token. Request a fresh one from{" "}
          <Link href="/forgot" className="font-semibold text-[#2563EB] hover:underline">
            forgot password
          </Link>
          .
        </p>
      ) : (
        <ResetForm token={token} />
      )}
    </main>
  );
}
