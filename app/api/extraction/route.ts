import { NextResponse } from "next/server";
import { z } from "zod";
import {
  extractFromText,
  parseStoredFile,
} from "@/lib/extraction/extract";
import { needsReview } from "@/types/extracted-profile";

export const runtime = "nodejs";

const BodySchema = z.object({
  storageKey: z.string().min(1).max(200),
  fileName: z.string().min(1).max(200),
  mimeType: z.string().min(1).max(150),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "storageKey, fileName and mimeType are required." }, { status: 400 });
  }

  const { storageKey, fileName, mimeType } = parsed.data;
  if (storageKey.includes("..") || storageKey.includes("/") || storageKey.includes("\\")) {
    return NextResponse.json({ error: "Invalid storageKey." }, { status: 400 });
  }

  const doc = await parseStoredFile({ storageKey, fileName, mimeType });
  if (doc.kind === "needs-provider") {
    return NextResponse.json(
      { status: "needs-provider", reason: doc.reason, review: [doc.reason] },
      { status: 200 },
    );
  }

  const { profile, warnings } = await extractFromText({ text: doc.text, fileName });
  return NextResponse.json({
    status: "ok",
    profile,
    review: [...warnings, ...needsReview(profile).map((p) => `Low confidence: ${p} — please confirm.`)],
  });
}
