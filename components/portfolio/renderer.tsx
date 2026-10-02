import type { Portfolio } from "@/types/portfolio";
import { ModernProfessional } from "@/templates/modern-professional";

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
    case "modern-professional":
    default:
      return <ModernProfessional portfolio={portfolio} />;
  }
}
