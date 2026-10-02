import { uploadConfig } from "@/config/uploads";

export type FileValidationError =
  | "unsupported-type"
  | "too-large"
  | "empty";

export type ValidationResult = { ok: true } | { ok: false; error: FileValidationError };

const EXT_TO_MIME: Record<string, string> = {
  ".pdf": "application/pdf",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".txt": "text/plain",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

export function getExtension(fileName: string): string {
  const dot = fileName.lastIndexOf(".");
  return dot >= 0 ? fileName.slice(dot).toLowerCase() : "";
}

export function validateFileMeta(args: {
  fileName: string;
  mimeType: string;
  sizeBytes: number;
}): ValidationResult {
  const ext = getExtension(args.fileName);
  const mimeOk = (uploadConfig.acceptedMimeTypes as readonly string[]).includes(
    args.mimeType,
  );
  const extOk = (uploadConfig.acceptedExtensions as readonly string[]).includes(ext);
  // Require both MIME and extension to agree (prevents spoofed uploads).
  const mapped = EXT_TO_MIME[ext];
  if (!mimeOk || !extOk || (mapped && mapped !== args.mimeType)) {
    return { ok: false, error: "unsupported-type" };
  }
  if (args.sizeBytes <= 0) return { ok: false, error: "empty" };
  const maxBytes = uploadConfig.maxUploadMB * 1024 * 1024;
  if (args.sizeBytes > maxBytes) return { ok: false, error: "too-large" };
  return { ok: true };
}

export function validationMessage(error: FileValidationError): string {
  switch (error) {
    case "unsupported-type":
      return "This file type isn't supported yet. Try PDF, DOCX, TXT, JPG or PNG.";
    case "too-large":
      return `File is too large. Maximum is ${uploadConfig.maxUploadMB}MB.`;
    case "empty":
      return "This file appears to be empty.";
  }
}
