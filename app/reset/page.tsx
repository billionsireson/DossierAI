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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020914] px-6 py-12">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="wave-background" />
      </div>
      <div className="glass-panel relative w-full max-w-md p-8">
        <Logo tone="dark" />
        <h1 className="mt-6 text-3xl font-semibold text-white">Set a new password</h1>
        {!token ? (
          <p className="mt-2 text-sm text-[#b6c8e2]">
            This link is missing its token. Request a fresh one from{" "}
            <Link href="/forgot" className="font-semibold text-[#00c8ff] hover:underline focus-visible:outline-2 focus-visible:outline-[#00c8ff]">
              forgot password
            </Link>
            .
          </p>
        ) : (
          <ResetForm token={token} />
        )}
      </div>
    </main>
  );
}
