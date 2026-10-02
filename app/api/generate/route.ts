import { NextResponse } from "next/server";
import { z } from "zod";
import { ExtractedProfileSchema } from "@/types/extracted-profile";
import { buildPortfolio } from "@/lib/portfolio/build";
import { PortfolioSchema, qualityGate } from "@/lib/portfolio/validate";
import { spend } from "@/lib/credits/ledger";
import { checkRateLimit, rateLimitKey } from "@/lib/security/rate-limit";
import { track } from "@/lib/analytics/events";

export const runtime = "nodejs";

const BodySchema = z.object({
  profile: ExtractedProfileSchema,
  templateId: z.string().min(1).max(60).default("modern-professional"),
});

const ALLOWED_TEMPLATES = new Set([
  "modern-professional",
  "creative-minimal",
  "corporate-executive",
  "tech-developer",
]);

export async function POST(req: Request) {
  const limit = checkRateLimit(rateLimitKey(req, "ai"), "ai");
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } },
    );
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "profile is required." }, { status: 400 });
  }

  // Strict retry-style gate (PRD §53): build → validate → quality, no silent repair.
  // Credits are spent only for successful generations (PRD §26).
  const templateId = ALLOWED_TEMPLATES.has(parsed.data.templateId)
    ? parsed.data.templateId
    : "modern-professional";
  const portfolio = buildPortfolio({
    profile: parsed.data.profile,
    userId: "demo-user",
    templateId,
  });

  const schemaCheck = PortfolioSchema.safeParse(portfolio);
  if (!schemaCheck.success) {
    return NextResponse.json(
      { error: "Generated portfolio failed schema validation." },
      { status: 422 },
    );
  }
  const issues = qualityGate(schemaCheck.data);
  if (issues.length > 0) {
    return NextResponse.json(
      { error: "Generated portfolio failed quality gate.", issues },
      { status: 422 },
    );
  }
  const payment = spend("demo-user", "generation");
  if (!payment.ok) {
    track("portfolio_generation_failed", { reason: "insufficient_credits" });
    return NextResponse.json(
      { error: "You don't have enough credits for this AI action.", ...payment },
      { status: 402 },
    );
  }
  track("portfolio_generated", { templateId });
  return NextResponse.json({ status: "generated", portfolio, credits: payment.tx });
}
