import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminRequest } from "@/lib/admin/guard";
import { saveTemplate } from "@/lib/templates/store";
import { PLAN_IDS, StudioThemeSchema } from "@/lib/templates/studio";

export const runtime = "nodejs";

const PatchSchema = z.object({
  name: z.string().min(2).max(80).optional(),
  plans: z.array(z.enum(PLAN_IDS)).optional(),
  theme: StudioThemeSchema.nullable().optional(),
  active: z.boolean().optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }
  const { key } = await params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const parsed = PatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid patch." }, { status: 400 });
  }
  const row = await saveTemplate(key, parsed.data);
  if (!row) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ template: row });
}
