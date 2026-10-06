"use client";

import { useCallback, useRef, useState } from "react";
import { uploadConfig } from "@/config/uploads";

type UploadState = "idle" | "uploading" | "done" | "error";

type FileRow = {
  name: string;
  size: number;
  status: string;
  reviewHref?: string;
};

function formatMB(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export function Dropzone({
  accept,
  capture,
  projectTitle,
}: {
  accept?: string;
  capture?: string;
  projectTitle?: string;
}) {
  const [dragging, setDragging] = useState(false);
  const [state, setState] = useState<UploadState>("idle");
  const [rows, setRows] = useState<FileRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = useCallback(
    async (fileList: FileList | File[]) => {
      const files = Array.from(fileList);
      if (files.length === 0) return;
      setState("uploading");
      setError(null);
      setRows(files.map((f) => ({ name: f.name, size: f.size, status: "Uploading…" })));

      const form = new FormData();
      for (const f of files) form.append("files", f);

      try {
        const res = await fetch("/api/uploads", { method: "POST", body: form });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error ?? "Upload failed.");
        setRows(
          (data.files ?? []).map(
            (f: {
              fileName: string;
              ok: boolean;
              error?: string;
              sizeBytes?: number;
              storageKey?: string;
              mimeType?: string;
            }) => {
              const params = new URLSearchParams({
                storageKey: f.storageKey ?? "",
                fileName: f.fileName,
                mimeType: f.mimeType ?? "",
              });
              if (projectTitle) params.set("project", projectTitle);
              return {
                name: f.fileName,
                size: f.sizeBytes ?? 0,
                status: f.ok ? "Uploaded — queued for extraction" : (f.error ?? "Rejected"),
                reviewHref: f.ok && f.storageKey ? `/app/review?${params.toString()}` : undefined,
              };
            },
          ),
        );
        setState("done");
      } catch (e) {
        setState("error");
        setError(e instanceof Error ? e.message : "Upload failed.");
      }
    },
    [projectTitle],
  );

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload files by dropping or browsing"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          void upload(e.dataTransfer.files);
        }}
        className={`rounded-2xl border-2 border-dashed p-10 text-center transition-colors ${
          dragging ? "border-[#2563EB] bg-[#eff6ff]" : "border-[#cbd5e1] bg-white"
        }`}
      >
        <p className="font-semibold text-[#0F172A]">Drag files here</p>
        <p className="mt-1 text-sm text-[#64748B]">or</p>
        <span className="mt-3 inline-block rounded-xl bg-[#2563EB] px-5 py-2.5 font-semibold text-white">
          Browse files
        </span>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept ?? uploadConfig.acceptedExtensions.join(",")}
          {...(capture ? { capture: capture as "user" | "environment" } : {})}
          className="hidden"
          onChange={(e) => {
            if (e.target.files) void upload(e.target.files);
          }}
        />
        <p className="mt-4 text-xs text-[#64748B]">
          Accepted: PDF, DOCX, TXT, JPG, PNG, WebP · Max {uploadConfig.maxUploadMB}MB per file
        </p>
      </div>

      {state === "uploading" && <p className="mt-4 text-sm text-[#64748B]">Uploading…</p>}
      {error && (
        <p role="alert" className="mt-4 rounded-xl bg-[#fef2f2] p-3 text-sm text-[#b91c1c]">
          {error}
        </p>
      )}

      {rows.length > 0 && (
        <ul className="mt-4 space-y-2">
          {rows.map((r) => (
            <li
              key={r.name}
              className="flex items-center justify-between gap-3 rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm"
            >
              <span className="font-medium text-[#0F172A]">{r.name}</span>
              <span className="flex items-center gap-3 text-[#64748B]">
                {r.size > 0 ? `${formatMB(r.size)} · ` : ""}{r.status}
                {r.reviewHref && (
                  <a href={r.reviewHref} className="font-semibold text-[#2E7CF6] hover:underline">
                    Review →
                  </a>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
