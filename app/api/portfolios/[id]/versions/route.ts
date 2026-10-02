import { NextResponse } from "next/server";
import { listVersions } from "@/lib/portfolio/store";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return NextResponse.json({
    versions: listVersions(id).map((v) => ({
      version: v.version,
      note: v.note,
      createdAt: v.createdAt,
    })),
  });
}
