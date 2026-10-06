import mammoth from "mammoth";

// Local, $0 document parsing — no AI provider needed for text extraction.
// PDF via pdf-parse, DOCX via mammoth. Anything unparseable returns a
// needs-provider reason instead of invented content.

export async function extractPdfText(data: Buffer): Promise<string> {
  const { extractText } = (await import("unpdf")) as unknown as {
    extractText: (
      data: Uint8Array,
      options?: { mergePages?: boolean },
    ) => Promise<{ text?: string | string[]; totalPages?: number }>;
  };
  const result = await extractText(new Uint8Array(data), { mergePages: true });
  const text = Array.isArray(result.text) ? result.text.join("\n") : (result.text ?? "");
  if (!text.trim()) throw new Error("No text layer found.");
  return text.slice(0, 200_000);
}

export async function extractDocxText(data: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer: data });
  return result.value.slice(0, 200_000);
}
