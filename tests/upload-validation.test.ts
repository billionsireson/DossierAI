import { describe, expect, it } from "vitest";
import { validateFileMeta } from "@/lib/documents/validation";

describe("upload validation", () => {
  it("accepts PDF", () => {
    expect(
      validateFileMeta({ fileName: "cv.pdf", mimeType: "application/pdf", sizeBytes: 1000 }),
    ).toEqual({ ok: true });
  });

  it("rejects mismatched mime/extension", () => {
    const r = validateFileMeta({ fileName: "cv.pdf", mimeType: "image/png", sizeBytes: 1000 });
    expect(r.ok).toBe(false);
  });

  it("rejects unsupported type", () => {
    const r = validateFileMeta({ fileName: "run.exe", mimeType: "application/x-msdownload", sizeBytes: 1000 });
    expect(r.ok).toBe(false);
  });

  it("rejects empty file", () => {
    const r = validateFileMeta({ fileName: "cv.pdf", mimeType: "application/pdf", sizeBytes: 0 });
    expect(r).toEqual({ ok: false, error: "empty" });
  });
});
