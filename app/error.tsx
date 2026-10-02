"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 text-center">
      <h1 className="text-2xl font-bold text-[#0F172A]">Something went wrong</h1>
      <p className="mt-2 text-sm text-[#64748B]">
        {error.message || "An unexpected error occurred. Your work is safe — try again."}
      </p>
      <button
        onClick={() => reset()}
        className="mt-6 rounded-xl bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1d4ed8]"
      >
        Try again
      </button>
    </main>
  );
}
