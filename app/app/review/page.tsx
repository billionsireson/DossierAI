import Link from "next/link";
import { ReviewForm } from "@/components/review/review-form";
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

export default function ReviewPage() {
  return (
    <main className="py-2">
      <Link href="/app/upload" className="text-sm text-[#64748B] hover:text-[#0F172A]">
        ← Upload
      </Link>
      <h1 className="mt-3 text-2xl font-bold">We found your professional story</h1>
      <p className="mt-1 text-sm text-[#64748B]">
        Correct anything wrong before generation. Sample data — live extraction
        via <code className="rounded bg-white px-1">POST /api/extraction</code>.
      </p>
      <div className="mt-5">
        <ReviewForm
          initial={sample}
          warnings={["Sample data for development — upload a TXT file for live extraction."]}
        />
      </div>
    </main>
  );
}
