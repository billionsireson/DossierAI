import Link from "next/link";
import { Dropzone } from "@/components/upload/dropzone";

export const metadata = { title: "Upload" };

export default function UploadPage() {
  return (
    <main className="py-2">
      <Link href="/app/create" className="text-sm text-[#64748B] hover:text-[#0F172A]">
        ← Create
      </Link>
      <h1 className="mt-3 text-2xl font-bold">Upload your material</h1>
      <p className="mt-1 text-sm text-[#64748B]">
        Files are validated, stored privately, and queued for extraction
        (Milestone 4). Nothing is executed.
      </p>
      <div className="mt-5">
        <Dropzone />
      </div>
    </main>
  );
}
