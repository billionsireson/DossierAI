export const siteConfig = {
  name: "DossierAI",
  tagline: "Your CV. Your Story. A Global Portfolio.",
  heroTitle:
    "Turn Your CV, Resume or Project into a Professional Portfolio — Instantly.",
  heroSupporting:
    "Upload your professional material and let DossierAI transform it into a polished, responsive portfolio website.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  brand: {
    royalDeep: "#180F6E",
    navy: "#0d1442",
    royal: "#2563EB",
    cta: "#2E7CF6",
    sky: "#B7CCE3",
    mist: "#E0E4DE",
    steel: "#8DA1B9",
    pebble: "#8C8D88",
    lime: "#B7F000",
    surface: "#F4F6FB",
    ink: "#0F172A",
    muted: "#64748B",
    border: "#E2E8F0",
  },
  templates: [
    "modern-professional",
    "creative-minimal",
    "corporate-executive",
    "tech-developer",
    "digital-creator",
    "spotlight",
  ] as const,
} as const;

export type TemplateId = (typeof siteConfig.templates)[number];
