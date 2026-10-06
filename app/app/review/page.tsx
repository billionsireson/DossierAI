import Link from "next/link";
import { ReviewLoader } from "@/components/review/review-loader";
import type { ExtractedProfile } from "@/types/extracted-profile";

// Sample extraction so the review step is clickable before upload wiring lands.
const sample: ExtractedProfile = {
  name: {
    value: "Esther Okafor",
    evidence: { fact: "Esther Okafor", source: "sample.txt", confidence: 0.55, sourceLocation: "line 1" },
  },
  email: {
    value: "esther@example.com",
    evidence: { fact: "esther@example.com", source: "sample.txt", confidence: 0.95, sourceLocation: "contact" },
  },
  links: [],
  experience: [],
  education: [],
  skills: [
    { value: "Product Design", evidence: { fact: "Product Design", source: "sample.txt", confidence: 0.6 } },
    { value: "UX Research", evidence: { fact: "UX Research", source: "sample.txt", confidence: 0.6 } },
  ],
  projects: [],
  certifications: [],
  achievements: [],
};

export const metadata = { title: "Review" };

export default async function ReviewPage({
  searchParams,
}: {
  searchParams?: Promise<{ storageKey?: string; fileName?: string; mimeType?: string; project?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const live = Boolean(sp.storageKey);
  const project = sp.project?.slice(0, 120);
  return (
    <main className="py-2">
      <Link href="/app/upload" className="text-sm text-[#64748B] hover:text-[#0F172A]">
        ← Upload
      </Link>
      <h1 className="mt-3 text-2xl font-bold">We found your professional story</h1>
      <p className="mt-1 text-sm text-[#64748B]">
        {live
          ? `Extracted from ${sp.fileName ?? "your file"} — correct anything wrong before generation.`
          : "Correct anything wrong before generation. Upload a file for live extraction."}
      </p>
      {project && (
        <p className="mt-3 inline-block rounded-full bg-[#e8f1fd] px-3 py-1 text-sm font-medium text-[#1e3a8a]">
          Project: {project}
        </p>
      )}
      <div className="mt-5">
        <ReviewLoader
          storageKey={sp.storageKey}
          fileName={sp.fileName}
          mimeType={sp.mimeType}
          fallback={{
            profile: sample,
            warnings: live ? [] : ["Sample data for development — upload a TXT file for live extraction."],
          }}
        />
      </div>
    </main>
  );
}
