import Link from "next/link";
import { redirect } from "next/navigation";
import { VerifyPanel } from "@/components/auth/verify-panel";
import { getCurrentUser } from "@/lib/auth/current-user";

export const dynamic = "force-dynamic";
export const metadata = { title: "Verify" };

export default async function VerifyPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return (
    <main id="main" className="py-2">
      <Link href="/app/dashboard" className="text-sm text-[#7892b5] hover:text-white">
        ← Dashboard
      </Link>
      <h1 className="mt-3 text-2xl font-semibold text-white">Verify it&apos;s really you</h1>
      <p className="mt-1 text-sm text-[#b6c8e2]">
        Confirm your email and phone to unlock editing. Codes expire in 15 minutes.
      </p>
      <div className="mt-5">
        <VerifyPanel
          email={user.email}
          emailVerified={user.emailVerified?.toISOString() ?? null}
          phone={user.phone}
          phoneVerified={user.phoneVerified?.toISOString() ?? null}
        />
      </div>
    </main>
  );
}
