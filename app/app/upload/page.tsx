import Link from "next/link";
import { UploadFlow, type UploadKind } from "@/components/upload/upload-flow";

export const metadata = { title: "Upload" };

const KINDS = ["cv", "project", "image", "text"] as const;

export default async function UploadPage({
  searchParams,
}: {
  searchParams?: Promise<{ type?: string }>;
}) {
  const raw = (await searchParams)?.type;
  const kind: UploadKind = (KINDS as readonly string[]).includes(raw ?? "")
    ? (raw as UploadKind)
    : "cv";
  return (
    <main className="py-2">
      <Link href="/app/create" className="text-sm text-[#64748B] hover:text-[#0F172A]">
        ← Create
      </Link>
      <UploadFlow kind={kind} />
      <p className="mt-4 text-xs text-[#94a3b8]">
        Files are validated, stored privately, and queued for extraction. Nothing is executed.
      </p>
    </main>
  );
}
