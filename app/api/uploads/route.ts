import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getStorageDriver } from "@/lib/storage";
import {
  validateFileMeta,
  validationMessage,
} from "@/lib/documents/validation";
import { getDb } from "@/lib/db";
import { ensureDemoUser } from "@/lib/db/ensure";
import { checkRateLimit, rateLimitKey } from "@/lib/security/rate-limit";
import { getCurrentUserId } from "@/lib/auth/current-user";
import { track } from "@/lib/analytics/events";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const limit = checkRateLimit(rateLimitKey(req, "upload"), "upload");
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many uploads. Please slow down and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } },
    );
  }
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid upload request." }, { status: 400 });
  }

  const files = form.getAll("files").filter((f): f is File => f instanceof File);
  if (files.length === 0) {
    return NextResponse.json({ error: "No files provided." }, { status: 400 });
  }

  const driver = getStorageDriver();
  const results = [];

  for (const file of files) {
    const check = validateFileMeta({
      fileName: file.name,
      mimeType: file.type,
      sizeBytes: file.size,
    });
    if (!check.ok) {
      results.push({
        fileName: file.name,
        ok: false as const,
        error: validationMessage(check.error),
      });
      continue;
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    // Never execute uploads; store bytes + record metadata only.
    const stored = await driver.put({
      fileName: file.name,
      mimeType: file.type,
      data: bytes,
    });

    // Best-effort DB record. Works without DATABASE_URL (dev preview).
    let documentId: string | null = null;
    try {
      const userId = await getCurrentUserId();
      if (userId === "demo-user") await ensureDemoUser();
      const db = await getDb();
      const doc = await db.sourceDocument.create({
        data: {
          userId,
          fileName: file.name,
          mimeType: file.type,
          sizeBytes: stored.sizeBytes,
          storageKey: stored.storageKey,
        },
      });
      documentId = doc.id;
    } catch {
      documentId = null;
    }

    results.push({
      fileName: file.name,
      ok: true as const,
      documentId,
      storageKey: stored.storageKey,
      sizeBytes: stored.sizeBytes,
      // Extraction job stub — full pipeline lands in Milestone 4.
      extractionJobId: `job_${randomUUID()}`,
    });
    track("file_uploaded", { mimeType: file.type });
  }

  return NextResponse.json({ files: results });
}
