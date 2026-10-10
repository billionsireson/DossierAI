import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminRequest } from "@/lib/admin/guard";
import { createTemplateRow, listTemplates } from "@/lib/templates/store";
import { PLAN_IDS, StudioThemeSchema } from "@/lib/templates/studio";

export const runtime = "nodejs";

const CreateSchema = z.object({
  key: z.string().regex(/^[a-z0-9-]{2,40}$/),
  name: z.string().min(2).max(80),
  plans: z.array(z.enum(PLAN_IDS)).default([]),
  theme: StudioThemeSchema.nullable().default(null),
});

export async function GET(req: Request) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }
  return NextResponse.json({ templates: await listTemplates() });
}

export async function POST(req: Request) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const parsed = CreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid template.", issues: parsed.error.issues.map((i) => i.message) }, { status: 400 });
  }
  try {
    const row = await createTemplateRow(parsed.data);
    return NextResponse.json({ template: row }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "A template with this key already exists." }, { status: 409 });
  }
}
