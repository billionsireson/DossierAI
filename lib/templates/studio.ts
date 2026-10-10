import { z } from "zod";

// Studio theme tokens — the safe design surface admins edit. No raw CSS or
// HTML is ever stored: every token is validated against an allowlist, so a
// template can never inject scripts into someone else's portfolio.

export const HeroStyle = z.enum(["midnight", "royal", "sunset", "forest", "mono"]);
export const FontStyle = z.enum(["jakarta", "serif", "mono"]);
export const RadiusStyle = z.enum(["soft", "sharp", "pill"]);

export const StudioThemeSchema = z.object({
  hero: HeroStyle,
  font: FontStyle,
  radius: RadiusStyle,
  accent: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Accent must be a hex color like #2E7CF6."),
  darkSections: z.boolean().default(false),
});

export type StudioTheme = z.infer<typeof StudioThemeSchema>;

export const HERO_GRADIENTS: Record<string, string> = {
  midnight: "from-[#0d1442] to-[#1e1b4b]",
  royal: "from-[#1e3a8a] to-[#0ea5e9]",
  sunset: "from-[#7c3aed] to-[#f59e0b]",
  forest: "from-[#0f766e] to-[#84cc16]",
  mono: "from-[#0F172A] to-[#475569]",
};

export const FONTS: Record<string, string> = {
  jakarta: "Plus Jakarta Sans, sans-serif",
  serif: "Georgia, serif",
  mono: "ui-monospace, monospace",
};

export type TemplateRow = {
  key: string;
  name: string;
  plans: string[];
  theme: StudioTheme | null;
  active: boolean;
};

// The six code families, mirrored as manageable rows.
export const CODE_TEMPLATES: Omit<TemplateRow, "active">[] = [
  { key: "modern-professional", name: "Modern Professional", plans: [], theme: null },
  { key: "creative-minimal", name: "Creative Minimal", plans: [], theme: null },
  { key: "corporate-executive", name: "Corporate Executive", plans: [], theme: null },
  { key: "tech-developer", name: "Tech / Developer", plans: [], theme: null },
  { key: "digital-creator", name: "Digital Creator", plans: [], theme: null },
  { key: "spotlight", name: "Spotlight", plans: [], theme: null },
];

export const PLAN_IDS = ["FREE", "PRO", "PREMIUM"] as const;
