import SearchClient from "@/components/search/SearchClient";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; mode?: string }>;
}) {
  const { q, mode } = await searchParams;
  const query = q ?? "Modern 3-seater sofa in Lekki under ₦1M";
  const isImage = mode === "image";

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-10">
      <SearchClient initialQuery={query} isImage={isImage} />
    </main>
  );
}
