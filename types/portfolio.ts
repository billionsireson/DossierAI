// DossierAI portfolio JSON schema — PRD §16–§17.
// LLM output must validate against these types before rendering.
// Raw LLM HTML is never rendered directly.

export type ThemeMode = "light" | "dark" | "auto";

export type SocialLink = {
  id: string;
  label: string;
  url: string;
};

export type BaseSection = {
  id: string;
  type: string;
  order: number;
  visible: boolean;
};

export type HeroSection = BaseSection & {
  type: "hero";
  content: {
    headline?: string;
    subheadline?: string;
    ctaLabel?: string;
  };
};

export type AboutSection = BaseSection & {
  type: "about";
  content: { body?: string };
};

export type ExperienceItem = {
  id: string;
  company?: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
};

export type ExperienceSection = BaseSection & {
  type: "experience";
  content: { items: ExperienceItem[] };
};

export type ProjectItem = {
  id: string;
  title: string;
  summary?: string;
  role?: string;
  tools?: string[];
  imageUrl?: string;
  linkUrl?: string;
};

export type ProjectsSection = BaseSection & {
  type: "projects";
  content: { items: ProjectItem[] };
};

export type SkillsSection = BaseSection & {
  type: "skills";
  content: { skills: string[] };
};

export type EducationItem = {
  id: string;
  school?: string;
  degree?: string;
  startDate?: string;
  endDate?: string;
};

export type EducationSection = BaseSection & {
  type: "education";
  content: { items: EducationItem[] };
};

export type CertificationsSection = BaseSection & {
  type: "certifications";
  content: { items: Array<{ id: string; name?: string; issuer?: string }> };
};

export type AchievementsSection = BaseSection & {
  type: "achievements";
  content: { items: Array<{ id: string; title?: string; detail?: string }> };
};

export type ContactSection = BaseSection & {
  type: "contact";
  content: { email?: string; location?: string };
};

export type CustomSection = BaseSection & {
  type: "custom";
  content: { title?: string; body?: string };
};

export type PortfolioSection =
  | HeroSection
  | AboutSection
  | ExperienceSection
  | ProjectsSection
  | SkillsSection
  | EducationSection
  | CertificationsSection
  | AchievementsSection
  | ContactSection
  | CustomSection;

export type Portfolio = {
  id: string;
  userId: string;
  slug: string;
  profile: {
    name: string;
    headline?: string;
    location?: string;
    summary?: string;
    avatarUrl?: string;
    resumeUrl?: string;
  };
  socialLinks: SocialLink[];
  sections: PortfolioSection[];
  theme: {
    templateId: string;
    mode: ThemeMode;
    primaryColor?: string;
    accentColor?: string;
    fontFamily?: string;
  };
  seo: {
    title?: string;
    description?: string;
    imageUrl?: string;
  };
  publishing: {
    status: "draft" | "published" | "unpublished";
    publishedAt?: string;
  };
  version: number;
};

export const RESERVED_SLUGS = [
  "admin",
  "app",
  "login",
  "signup",
  "api",
  "pricing",
  "templates",
  "settings",
  "support",
] as const;

export function isReservedSlug(slug: string): boolean {
  return (RESERVED_SLUGS as readonly string[]).includes(slug.toLowerCase());
}

export function toSlug(input: string): string {
  const slug = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  if (!slug || isReservedSlug(slug)) return `u-${slug || "portfolio"}`;
  return slug;
}
