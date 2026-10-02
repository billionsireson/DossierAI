import type { Portfolio } from "@/types/portfolio";
import { ModernProfessional } from "@/templates/modern-professional";
import { CreativeMinimal } from "@/templates/creative-minimal";
import { CorporateExecutive } from "@/templates/corporate-executive";
import { TechDeveloper } from "@/templates/tech-developer";

export const TEMPLATE_IDS = [
  "modern-professional",
  "creative-minimal",
  "corporate-executive",
  "tech-developer",
] as const;

export type TemplateId = (typeof TEMPLATE_IDS)[number];

export function isTemplateId(value: string): value is TemplateId {
  return (TEMPLATE_IDS as readonly string[]).includes(value);
}

/**
 * Data-driven renderer (PRD §15, §20): same portfolio JSON, any template.
 * Unknown template ids fall back to Modern Professional — never a blank page.
 */
export function PortfolioRenderer({
  portfolio,
  template,
}: {
  portfolio: Portfolio;
  template?: string;
}) {
  const id = template ?? portfolio.theme.templateId;
  switch (id) {
    case "creative-minimal":
      return <CreativeMinimal portfolio={portfolio} />;
    case "corporate-executive":
      return <CorporateExecutive portfolio={portfolio} />;
    case "tech-developer":
      return <TechDeveloper portfolio={portfolio} />;
    case "modern-professional":
    default:
      return <ModernProfessional portfolio={portfolio} />;
  }
}
