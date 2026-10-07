import type { ExtractedProfile } from "@/types/extracted-profile";
import { openAIProvider } from "@/lib/ai/openai-provider";
import { geminiProvider } from "@/lib/ai/gemini-provider";

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
const DATE_RANGE_RE = /\b((?:19|20)\d{2})\s*(?:–|—|-|to)\s*((?:19|20)\d{2}|present|current|date)\b/i;
const YEAR_RE = /\b((?:19|20)\d{2})\b/;
const EDU_RE = /universit|college|school|polytechnic|b\.?\s?sc|m\.?\s?sc|mba|ph\.?\s?d|bachelor|master|diploma|hnd|ond|lll\b/i;

type Section = { title: string; lines: string[] };

/** Split CV text into sections at ALL-CAPS/short header lines. */
function splitSections(lines: string[]): Section[] {
  const sections: Section[] = [{ title: "header", lines: [] }];
  for (const line of lines) {
    const isHeader =
      /^[A-Z][A-Z\s&/-]{2,40}$/.test(line) ||
      /^(profile|summary|objective|experience|employment|work history|education|skills|competencies|certifications|achievements|projects|contact|personal)/i.test(
        line.split(/[:\s]/)[0] + " " + line,
      );
    if (isHeader && sections[sections.length - 1].lines.length > 0) {
      sections.push({ title: line.toLowerCase(), lines: [] });
    } else {
      sections[sections.length - 1].lines.push(line);
    }
  }
  return sections;
}

function sectionLines(sections: Section[], match: RegExp): string[] {
  return sections.filter((s) => match.test(s.title)).flatMap((s) => s.lines);
}

function toSkills(lines: string[], fileName: string, location: string) {
  const out: { value: string; evidence: ReturnType<typeof evidence> }[] = [];
  for (const line of lines) {
    const cleaned = line.replace(/^skills?\s*[:\-]/i, "").replace(/^[•·▪▪\-\*]\s*/, "");
    for (const part of cleaned.split(/[,|•·;]/)) {
      const s = part.trim().replace(/^[•·▪\-\*]\s*/, "");
      if (s.length > 1 && s.length <= 45 && !EMAIL_RE.test(s) && out.length < 25) {
        out.push({ value: s, evidence: evidence(s, fileName, 0.6, location) });
      }
    }
  }
  return out;
}

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
    const sections = splitSections(lines);

    // Name: first non-empty line without email/URL — low confidence by design.
    const looksLikeName =
      firstLine.length > 1 &&
      firstLine.length <= 60 &&
      !EMAIL_RE.test(firstLine) &&
      !/^https?:\/\//i.test(firstLine);

    // Skills: explicit skills sections, else legacy "Skills:" lines.
    const skillsSection = sectionLines(sections, /skill|competenc|expertise|capabilit/);
    const skills =
      skillsSection.length > 0
        ? toSkills(skillsSection, fileName, "skills section")
        : toSkills(
            lines.filter((l) => /^skills?\s*[:\-]/i.test(l)),
            fileName,
            "skills line",
          );

    // Experience: date-range lines; the nearest preceding non-date line is
    // treated as role/company, both kept verbatim at modest confidence.
    const experience: {
      company?: { value: string; evidence: ReturnType<typeof evidence> };
      role?: { value: string; evidence: ReturnType<typeof evidence> };
      startDate?: { value: string; evidence: ReturnType<typeof evidence> };
      endDate?: { value: string; evidence: ReturnType<typeof evidence> };
      summary?: { value: string; evidence: ReturnType<typeof evidence> };
    }[] = [];
    lines.forEach((line, i) => {
      const m = line.match(DATE_RANGE_RE);
      if (!m || experience.length >= 12) return;
      const prev = lines
        .slice(Math.max(0, i - 3), i)
        .filter((l) => !DATE_RANGE_RE.test(l) && !YEAR_RE.test(l) && !EMAIL_RE.test(l));
      const label = prev[prev.length - 1];
      experience.push({
        ...(label
          ? { role: { value: label, evidence: evidence(label, fileName, 0.5, `line ${i}`) } }
          : {}),
        startDate: { value: m[1], evidence: evidence(m[1], fileName, 0.85, `line ${i + 1}`) },
        endDate: { value: m[2], evidence: evidence(m[2], fileName, 0.85, `line ${i + 1}`) },
      });
    });

    // Education: lines mentioning institutions or degree keywords.
    const education = lines
      .filter((l) => EDU_RE.test(l) && l.length <= 120)
      .slice(0, 6)
      .map((l, i) => ({
        school: { value: l, evidence: evidence(l, fileName, 0.55, `line ${i + 1}`) },
      }));

    // Title: first short line after the name that reads like a role.
    const titleLine = lines
      .slice(1, 6)
      .find(
        (l) =>
          l.length > 2 &&
          l.length <= 80 &&
          !EMAIL_RE.test(l) &&
          !PHONE_RE.test(l) &&
          !DATE_RANGE_RE.test(l) &&
          /[a-zA-Z]/.test(l) &&
          !EDU_RE.test(l),
      );

    const summaryLines = lines.slice(looksLikeName ? 1 : 0, looksLikeName ? 4 : 3);
    const summary = summaryLines.join(" ").slice(0, 500);

    return {
      name: looksLikeName
        ? { value: firstLine, evidence: evidence(firstLine, fileName, 0.55, "line 1") }
        : undefined,
      title: titleLine
        ? { value: titleLine, evidence: evidence(titleLine, fileName, 0.55, "headline") }
        : undefined,
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
      experience,
      education,
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
  // Priority: Gemini (free tier) → OpenAI (paid key) → heuristic.
  // All paths validate against the same schema.
  if (process.env.GEMINI_API_KEY) return geminiProvider;
  if (process.env.AI_PROVIDER_API_KEY) return openAIProvider;
  return heuristicProvider;
}
