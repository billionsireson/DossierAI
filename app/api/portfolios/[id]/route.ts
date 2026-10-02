import { NextResponse } from "next/server";
import { z } from "zod";
import { buildUpdated, getPortfolio, updatePortfolio } from "@/lib/portfolio/store";
import type { PortfolioSection } from "@/types/portfolio";
import { PortfolioSchema } from "@/lib/portfolio/validate";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const portfolio = getPortfolio(id);
  if (!portfolio) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ portfolio });
}

const PatchSchema = z.object({
  profile: z
    .object({
      name: z.string().min(1).max(120).optional(),
      headline: z.string().max(200).optional(),
      location: z.string().max(120).optional(),
      summary: z.string().max(2000).optional(),
    })
    .optional(),
  theme: z
    .object({
      templateId: z.string().min(1).max(60).optional(),
      mode: z.enum(["light", "dark", "auto"]).optional(),
    })
    .optional(),
  sections: z
    .array(
      z.object({
        id: z.string(),
        type: z.string(),
        order: z.number(),
        visible: z.boolean(),
        content: z.unknown(),
      }),
    )
    .optional(),
  note: z.string().max(200).optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const parsed = PatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid patch body." }, { status: 400 });
  }
  const { note, ...patch } = parsed.data;
  // Sections originate from our own store shape; the union cast is safe here.
  const candidate = buildUpdated(id, {
    ...patch,
    sections: patch.sections as PortfolioSection[] | undefined,
  });
  if (!candidate) return NextResponse.json({ error: "Not found." }, { status: 404 });
  // Full-schema gate BEFORE persisting (PRD §53).
  const gate = PortfolioSchema.safeParse(candidate);
  if (!gate.success) {
    return NextResponse.json(
      { error: "Save failed schema validation.", issues: gate.error.issues.map((i) => i.message) },
      { status: 422 },
    );
  }
  const updated = updatePortfolio(
    id,
    { ...patch, sections: patch.sections as PortfolioSection[] | undefined },
    note,
  );
  if (!updated) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ portfolio: updated });
}
