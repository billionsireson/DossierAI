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
    <main id="main" className="py-2">
      <Link href="/app/upload" className="text-sm text-[#7892b5] hover:text-white">
        ← Upload
      </Link>
      <h1 className="mt-3 text-2xl font-semibold text-white">We found your professional story</h1>
      <p className="mt-1 text-sm text-[#b6c8e2]">
        {live
          ? `Extracted from ${sp.fileName ?? "your file"} — correct anything wrong before generation.`
          : "Correct anything wrong before generation. Upload a file for live extraction."}
      </p>
      {project && (
        <p className="mt-3 inline-block rounded-full border border-[rgba(0,174,255,0.65)] bg-[rgba(0,95,255,0.12)] px-3 py-1 text-sm font-medium text-[#00c8ff]">
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
