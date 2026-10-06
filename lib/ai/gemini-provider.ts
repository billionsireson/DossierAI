import type { ExtractedProfile } from "@/types/extracted-profile";
import { ExtractedProfileSchema } from "@/types/extracted-profile";
import type { AIProvider } from "@/lib/ai/provider";
import { heuristicProvider } from "@/lib/ai/provider";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const MODEL_NOTE = "gemini-2.0-flash (free tier)";

const SYSTEM_PROMPT = `Extract a structured professional profile from the CV/resume text below.
Rules (non-negotiable):
- Reply with ONLY a JSON object, no markdown fences.
- Omit anything you cannot source. NEVER invent employers, dates, degrees, metrics, projects, skills or contact details.
- Every returned value must be {value, evidence: {fact, source, source_location, confidence 0..1}}.
- Shape: {name?, title?, summary?, location?, email?, phone?, links[], experience[], education[], skills[], projects[], certifications[], achievements[]}.`;

/** Gemini vendor path (free tier). Falls back to heuristic on any failure. */
export const geminiProvider: AIProvider = {
  name: "gemini",
  async extractProfile({ text, fileName }): Promise<ExtractedProfile> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return heuristicProvider.extractProfile({ text, fileName });
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 60_000);
      const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
        method: "POST",
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          generationConfig: { response_mime_type: "application/json", temperature: 0.1 },
          contents: [
            { parts: [{ text: `Source file: ${fileName}\n\n${text.slice(0, 12_000)}` }] },
          ],
        }),
      }).finally(() => clearTimeout(timer));
      if (!res.ok) throw new Error(`Gemini ${res.status}`);
      const data = (await res.json()) as {
        candidates?: { content?: { parts?: { text?: string }[] } }[];
      };
      const raw = data.candidates?.[0]?.content?.parts
        ?.map((p) => p.text ?? "")
        .join("");
      if (!raw) throw new Error("Empty Gemini response.");
      const parsed = ExtractedProfileSchema.safeParse(JSON.parse(raw));
      if (!parsed.success) throw new Error("Gemini output failed validation.");
      return parsed.data;
    } catch {
      return heuristicProvider.extractProfile({ text, fileName });
    }
  },
  async imageAnalysis({ fileName, mimeType }) {
    if (!process.env.GEMINI_API_KEY) {
      return heuristicProvider.imageAnalysis({ fileName, mimeType });
    }
    return {
      note: `Image ${fileName} via ${MODEL_NOTE} vision is queued — user confirms before use.`,
      confidence: 0.3,
    };
  },
};
