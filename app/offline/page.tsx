import Link from "next/link";
import { Logo } from "@/components/logo";

export const metadata = { title: "Offline" };

export default function OfflinePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center bg-[#020914] px-6 text-center">
      <Logo tone="dark" />
      <h1 className="mt-6 text-2xl font-semibold text-white">You&apos;re offline</h1>
      <p className="mt-2 text-sm text-[#b6c8e2]">
        DossierAI needs a connection to generate and publish. Reconnect to continue.
      </p>
      <Link href="/" className="ocean-btn mt-6">
        Try again
      </Link>
    </main>
  );
}
