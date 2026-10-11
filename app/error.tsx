"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center bg-[#020914] px-6 text-center">
      <h1 className="text-2xl font-semibold text-white">Something went wrong</h1>
      <p className="mt-2 text-sm text-[#b6c8e2]">
        {error.message || "An unexpected error occurred. Your work is safe — try again."}
      </p>
      <button onClick={() => reset()} className="ocean-btn mt-6">
        Try again
      </button>
    </main>
  );
}
