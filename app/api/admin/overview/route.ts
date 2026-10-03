import { NextResponse } from "next/server";
import { readdir, stat } from "fs/promises";
import path from "path";
import { isAdminRequest } from "@/lib/admin/guard";
import { listPortfolios } from "@/lib/portfolio/store";
import { balance, history } from "@/lib/credits/ledger";
import { demoUser } from "@/lib/demo";

export const runtime = "nodejs";

export async function GET(req: Request) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }
  const portfolios = await listPortfolios();
  let uploads: { file: string; bytes: number }[] = [];
  try {
    const dir = path.join(process.cwd(), ".uploads");
    const files = await readdir(dir);
    uploads = await Promise.all(
      files.slice(0, 50).map(async (file) => ({
        file,
        bytes: (await stat(path.join(dir, file))).size,
      })),
    );
  } catch {
    uploads = [];
  }
  return NextResponse.json({
    portfolios: portfolios.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.profile.name,
      template: p.theme.templateId,
      version: p.version,
      status: p.publishing.status,
    })),
    credits: { userId: demoUser.id, balance: await balance(demoUser.id), recent: await history(demoUser.id, 10) },
    uploads: uploads.sort((a, b) => b.bytes - a.bytes).slice(0, 20),
  });
}
