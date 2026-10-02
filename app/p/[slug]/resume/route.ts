import { NextResponse } from "next/server";
import { demoPortfolios } from "@/lib/demo";
import { getPublicationBySlug } from "@/lib/publishing/store";

export const runtime = "nodejs";

/** Plain-text resume generated only from portfolio facts (no invention). */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const pub = getPublicationBySlug(slug);
  const portfolio = pub
    ? (demoPortfolios.find((p) => p.id === pub.portfolioId) ?? null)
    : null;
  if (!portfolio) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const lines: string[] = [
    portfolio.profile.name,
    portfolio.profile.headline ?? "",
    portfolio.profile.location ?? "",
    "",
  ];
  if (portfolio.profile.summary) lines.push(portfolio.profile.summary, "");
  for (const s of [...portfolio.sections]
    .sort((a, b) => a.order - b.order)
    .filter((s) => s.visible)) {
    const c = s.content as Record<string, unknown>;
    if (s.type === "skills" && Array.isArray(c.skills)) {
      lines.push("SKILLS", (c.skills as string[]).join(", "), "");
    }
    if (s.type === "about" && typeof c.body === "string") {
      lines.push("ABOUT", c.body, "");
    }
    if (s.type === "contact") {
      const email = typeof c.email === "string" ? c.email : "";
      if (email) lines.push("CONTACT", email, "");
    }
  }
  for (const l of portfolio.socialLinks) lines.push(`${l.label}: ${l.url}`);
  lines.push("", "Built with DossierAI");

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${slug}-resume.txt"`,
    },
  });
}
