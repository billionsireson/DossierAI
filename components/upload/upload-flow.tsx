"use client";

import { useState } from "react";
import { Dropzone } from "@/components/upload/dropzone";
import { PasteBox } from "@/components/upload/paste-box";

export type UploadKind = "cv" | "project" | "image" | "text";

const COPY: Record<UploadKind, { title: string; desc: string }> = {
  cv: {
    title: "Upload your CV / Resume",
    desc: "PDF, DOCX or TXT. We'll extract experience, skills and education.",
  },
  project: {
    title: "Upload your project document",
    desc: "Briefs, decks or reports. Name the project so extraction tells its story.",
  },
  image: {
    title: "Upload images / screenshots",
    desc: "JPG, PNG or WebP — or take a photo. OCR reads certificates and work shots.",
  },
  text: {
    title: "Paste your text",
    desc: "No file? Type or paste your bio, notes or project description.",
  },
};

export function UploadFlow({ kind }: { kind: UploadKind }) {
  const [projectTitle, setProjectTitle] = useState("");
  const copy = COPY[kind];

  return (
    <div>
      <h1 className="mt-3 text-2xl font-bold">{copy.title}</h1>
      <p className="mt-1 text-sm text-[#64748B]">{copy.desc}</p>
      <div className="mt-5">
        {kind === "text" ? (
          <PasteBox />
        ) : (
          <>
            {kind === "project" && (
              <label className="mb-4 block max-w-md text-sm">
                <span className="mb-1 block font-medium">What is this project?</span>
                <input
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="e.g. Fintech Dashboard"
                  maxLength={120}
                  className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-sm"
                />
              </label>
            )}
            <Dropzone
              accept={
                kind === "image" ? ".jpg,.jpeg,.png,.webp" : ".pdf,.docx,.txt,.jpg,.jpeg,.png,.webp"
              }
              capture={kind === "image" ? "environment" : undefined}
              projectTitle={kind === "project" ? projectTitle || undefined : undefined}
            />
            {kind === "image" && (
              <p className="mt-3 text-xs text-[#64748B]">
                On mobile, browsing files offers the camera (Take a Shot) where the browser supports it.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
