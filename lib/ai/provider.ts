import type { ExtractedProfile } from "@/types/extracted-profile";

/**
 * AI provider abstraction — PRD §47.
 * Business logic depends on this interface, never on a vendor SDK directly.
 */
export interface AIProvider {
  readonly name: string;
  extractProfile(args: {
    text: string;
    fileName: string;
  }): Promise<ExtractedProfile>;
  imageAnalysis(args: {
    fileName: string;
    mimeType: string;
  }): Promise<{ note: string; confidence: number }>;
}

function evidence(
  fact: string,
  source: string,
  confidence: number,
  sourceLocation?: string,
) {
  return { fact, source, confidence, sourceLocation };
}

const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const PHONE_RE = /(\+?\d[\d\s\-().]{7,}\d)/;
const URL_RE = /https?:\/\/[^\s)]+/gi;
const LINKEDIN_RE = /linkedin\.com\/[^\s)]+/i;

/**
 * Heuristic provider: deterministic, no API key, no fabrication.
 * Extracts only what is literally present in the text. Anything uncertain
 * gets low confidence so the review step asks the user (PRD §14).
 */
export const heuristicProvider: AIProvider = {
  name: "heuristic",
  async extractProfile({ text, fileName }) {
    const lines = text
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    const email = text.match(EMAIL_RE)?.[0];
    const phone = text.match(PHONE_RE)?.[0];
    const links = [...new Set(text.match(URL_RE) ?? [])].slice(0, 10);
    const firstLine = lines[0] ?? "";

    // Name heuristic: first non-empty line without email/URL, capped — low
    // confidence by design so the user confirms it.
    const looksLikeName =
      firstLine.length > 1 &&
      firstLine.length <= 60 &&
      !EMAIL_RE.test(firstLine) &&
      !/^https?:\/\//i.test(firstLine);

    const skillsLine = lines.find((l) => /^skills?\s*[:\-]/i.test(l));
    const skills = skillsLine
      ? skillsLine
          .replace(/^skills?\s*[:\-]/i, "")
          .split(/[,|•·]/)
          .map((s) => s.trim())
          .filter((s) => s.length > 0 && s.length <= 40)
          .slice(0, 20)
          .map((s) => ({
            value: s,
            evidence: evidence(s, fileName, 0.6, "skills line"),
          }))
      : [];

    const summaryLines = lines.slice(looksLikeName ? 1 : 0, looksLikeName ? 4 : 3);
    const summary = summaryLines.join(" ").slice(0, 500);

    return {
      name: looksLikeName
        ? { value: firstLine, evidence: evidence(firstLine, fileName, 0.55, "line 1") }
        : undefined,
      title: undefined,
      summary: summary
        ? { value: summary, evidence: evidence(summary, fileName, 0.5, "header") }
        : undefined,
      location: undefined,
      email: email
        ? { value: email, evidence: evidence(email, fileName, 0.95, "contact") }
        : undefined,
      phone: phone
        ? { value: phone, evidence: evidence(phone, fileName, 0.8, "contact") }
        : undefined,
      links: links.length > 0 || LINKEDIN_RE.test(text) ? links : [],
      experience: [],
      education: [],
      skills,
      projects: [],
      certifications: [],
      achievements: [],
    };
  },
  async imageAnalysis({ fileName }) {
    return {
      note: `Image ${fileName} queued for OCR/vision review. No facts extracted without a vision provider — user confirms.`,
      confidence: 0.3,
    };
  },
};

export function getProvider(): AIProvider {
  // Vendor-backed provider plugs in here when AI_PROVIDER_API_KEY is set.
  // Until then the heuristic keeps the pipeline demonstrable and honest.
  return heuristicProvider;
}
