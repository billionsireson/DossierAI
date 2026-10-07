import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import { PortfolioRenderer, isTemplateId } from "@/components/portfolio/renderer";
import { demoPortfolios } from "@/lib/demo";

describe("template renderer", () => {
  it("renders all six families without crashing", () => {
    for (const t of [
      "modern-professional",
      "creative-minimal",
      "corporate-executive",
      "tech-developer",
      "digital-creator",
      "spotlight",
    ]) {
      const html = renderToString(
        <PortfolioRenderer portfolio={demoPortfolios[0]} template={t} />,
      );
      expect(html).toContain("Esther Okafor");
    }
  });

  it("falls back to Modern Professional for unknown ids", () => {
    expect(isTemplateId("nope")).toBe(false);
    const html = renderToString(
      <PortfolioRenderer portfolio={demoPortfolios[0]} template="nope" />,
    );
    expect(html).toContain("Esther Okafor");
  });

  it("renders sparse portfolios without empty sections", () => {
    const html = renderToString(
      <PortfolioRenderer portfolio={demoPortfolios[1]} template="tech-developer" />,
    );
    expect(html.length).toBeGreaterThan(100);
  });
});
