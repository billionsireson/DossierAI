import { readDocumentBytes } from "@/lib/documents/store";
import {
  ExtractedProfileSchema,
  type ExtractedProfile,
} from "@/types/extracted-profile";
import { getProvider } from "@/lib/ai/provider";

export type ParsedDocument =
  | { kind: "text"; text: string }
  | { kind: "needs-provider"; reason: string };

const TEXT_MIMES = new Set(["text/plain"]);
const IMAGE_MIMES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function parseStoredFile(args: {
  storageKey: string;
  fileName: string;
  mimeType: string;
}): Promise<ParsedDocument> {
  const lower = args.fileName.toLowerCase();
  if (TEXT_MIMES.has(args.mimeType) || lower.endsWith(".txt")) {
    const buf = await readDocumentBytes(args.storageKey);
    const text = (buf?.toString("utf8") ?? "").slice(0, 200_000);
    return { kind: "text", text };
  }
  if (IMAGE_MIMES.has(args.mimeType)) {
    const provider = getProvider();
    const r = await provider.imageAnalysis({
      fileName: args.fileName,
      mimeType: args.mimeType,
    });
    return { kind: "needs-provider", reason: r.note };
  }
  return {
    kind: "needs-provider",
    reason: `${args.fileName}: ${args.mimeType} parsing needs a document AI provider. Upload TXT for instant heuristic extraction, or confirm details manually in review.`,
  };
}

export async function extractFromText(args: {
  text: string;
  fileName: string;
}): Promise<{ profile: ExtractedProfile; warnings: string[] }> {
  const provider = getProvider();
  const raw = await provider.extractProfile({
    text: args.text,
    fileName: args.fileName,
  });
  const parsed = ExtractedProfileSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error("Extraction output failed schema validation.");
  }
  const warnings: string[] = [];
  if (!parsed.data.name) warnings.push("Name not found — please confirm.");
  if (!parsed.data.email) warnings.push("No email detected.");
  if (parsed.data.skills.length === 0)
    warnings.push("No skills line detected (try a `Skills: a, b, c` line).");
  if (parsed.data.experience.length === 0)
    warnings.push("No experience blocks extracted yet — manual review recommended.");
  return { profile: parsed.data, warnings };
}
