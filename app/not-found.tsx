import Link from "next/link";
import { Logo } from "@/components/logo";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center bg-[#020914] px-6 text-center">
      <Logo tone="dark" />
      <h1 className="mt-6 text-4xl font-semibold text-white">404</h1>
      <p className="mt-2 text-[#b6c8e2]">
        This page isn&apos;t published yet. Try a public portfolio URL or head back.
      </p>
      <Link href="/" className="ocean-btn mt-6">
        Back home
      </Link>
    </main>
  );
}
