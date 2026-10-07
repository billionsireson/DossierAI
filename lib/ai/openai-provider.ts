import type { ExtractedProfile } from "@/types/extracted-profile";
import { ExtractedProfileSchema } from "@/types/extracted-profile";
import type { AIProvider } from "@/lib/ai/provider";
import { heuristicProvider } from "@/lib/ai/provider";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = process.env.AI_MODEL ?? "gpt-4o-mini";

const SYSTEM_PROMPT = `You extract a structured professional profile from CV/resume text.
Rules (non-negotiable):
- Return ONLY JSON matching the requested shape. Omit fields you cannot source.
- NEVER invent employers, dates, degrees, metrics, projects, skills or contact details.
- Every value you DO return must include evidence {fact, source, source_location, confidence 0..1}.
- Low confidence (<0.7) is fine — the app asks the user to confirm.
Shape: {name?, title?, summary?, location?, email?, phone?, links[], experience[], education[], skills[], projects[], certifications[], achievements[]} where each *? item is {value, evidence}.`;

/** Vendor-backed provider — OpenAI (integration #1). Falls back to the
 *  heuristic provider on any failure so generation never hard-crashes. */
export const openAIProvider: AIProvider = {
  name: "openai",
  async extractProfile({ text, fileName }): Promise<ExtractedProfile> {
    const apiKey = process.env.AI_PROVIDER_API_KEY;
    if (!apiKey) return heuristicProvider.extractProfile({ text, fileName });
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 60_000);
      const res = await fetch(OPENAI_URL, {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: MODEL,
          response_format: { type: "json_object" },
          temperature: 0.1,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "user",
              content: `Source file: ${fileName}\n\n${text.slice(0, 12_000)}`,
            },
          ],
        }),
      }).finally(() => clearTimeout(timer));
      if (!res.ok) throw new Error(`OpenAI ${res.status}`);
      const data = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const raw = data.choices?.[0]?.message?.content;
      if (!raw) throw new Error("Empty OpenAI response.");
      const parsed = ExtractedProfileSchema.safeParse(JSON.parse(raw));
      if (!parsed.success) throw new Error("OpenAI output failed validation.");
      return parsed.data;
    } catch (e) {
      console.warn("[ai] openai failed, heuristic fallback:", e instanceof Error ? e.message : e);
      return heuristicProvider.extractProfile({ text, fileName });
    }
  },
  async imageAnalysis({ fileName, mimeType }) {
    if (!process.env.AI_PROVIDER_API_KEY) {
      return heuristicProvider.imageAnalysis({ fileName, mimeType });
    }
    return {
      note: `Image ${fileName} needs a vision-capable call — queued for user review until wired.`,
      confidence: 0.3,
    };
  },
};
