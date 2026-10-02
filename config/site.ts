export const siteConfig = {
  name: "DossierAI",
  tagline: "Your CV. Your Story. A Global Portfolio.",
  heroTitle:
    "Turn Your CV, Resume or Project into a Professional Portfolio — Instantly.",
  heroSupporting:
    "Upload your professional material and let DossierAI transform it into a polished, responsive portfolio website.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  brand: {
    navy: "#07142F",
    royal: "#2563EB",
    lime: "#B7F000",
    surface: "#F7FAFC",
    ink: "#0F172A",
    muted: "#64748B",
    border: "#E2E8F0",
  },
  templates: [
    "modern-professional",
    "creative-minimal",
    "corporate-executive",
    "tech-developer",
  ] as const,
} as const;

export type TemplateId = (typeof siteConfig.templates)[number];
