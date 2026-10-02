// Plan configuration — PRD §25. Single source of truth, editable without
// code changes in production (future admin UI writes this shape to DB).
export type PlanId = "FREE" | "PRO" | "PREMIUM";

export type PlanConfig = {
  id: PlanId;
  name: string;
  priceNGN: number;
  creditsPerMonth: number;
  templates: string[];
  maxPortfolios: number;
  publishing: { durationDays: number | null; label: string };
  features: string[];
};

export const PLANS: Record<PlanId, PlanConfig> = {
  FREE: {
    id: "FREE",
    name: "Free",
    priceNGN: 0,
    creditsPerMonth: 5,
    templates: ["modern-professional"],
    maxPortfolios: 1,
    publishing: { durationDays: 30, label: "1 month hosting" },
    features: ["AI portfolio generation", "1 template", "Basic customization", "1 month hosting"],
  },
  PRO: {
    id: "PRO",
    name: "Pro",
    priceNGN: 4999,
    creditsPerMonth: 50,
    templates: ["modern-professional", "creative-minimal", "corporate-executive"],
    maxPortfolios: 10,
    publishing: { durationDays: 365, label: "1 year publishing" },
    features: [
      "All Free features",
      "Premium templates",
      "Full customization",
      "Edit content & sections",
      "Priority support",
      "1 year publishing",
      "+ 50 credits/month",
    ],
  },
  PREMIUM: {
    id: "PREMIUM",
    name: "Premium",
    priceNGN: 9999,
    creditsPerMonth: 200,
    templates: ["modern-professional", "creative-minimal", "corporate-executive", "tech-developer"],
    maxPortfolios: 50,
    publishing: { durationDays: null, label: "Lifetime publishing" },
    features: [
      "All Pro features",
      "Advanced templates",
      "Custom domain (optional)",
      "Analytics & insights",
      "Lifetime publishing",
      "+ 200 credits/month",
    ],
  },
};

/** AI action costs in credits. Local UI actions (recolor, reorder, manual
 *  edits) never consume credits — PRD §26. */
export const CREDIT_COSTS = {
  generation: 1,
  regeneration: 1,
  ai_rewrite: 1,
  case_study: 2,
  image_enhancement: 1,
} as const;

export type CreditAction = keyof typeof CREDIT_COSTS;
