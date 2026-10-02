export const uploadConfig = {
  maxUploadMB: Number(process.env.MAX_UPLOAD_MB ?? 10),
  acceptedMimeTypes: [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
    "image/jpeg",
    "image/png",
    "image/webp",
  ] as const,
  acceptedExtensions: [".pdf", ".docx", ".txt", ".jpg", ".jpeg", ".png", ".webp"] as const,
} as const;

export type AcceptedMime = (typeof uploadConfig.acceptedMimeTypes)[number];
