import { NextResponse } from "next/server";
import { publish, unpublish } from "@/lib/publishing/store";
import { checkRateLimit, rateLimitKey } from "@/lib/security/rate-limit";
import { track } from "@/lib/analytics/events";

export const runtime = "nodejs";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const limit = checkRateLimit(rateLimitKey(req, "publish"), "publish");
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } },
    );
  }
  const { id } = await params;
  try {
    const record = await publish(id);
    track("portfolio_published", { portfolioId: id });
    return NextResponse.json(record);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Publish failed." },
      { status: 400 },
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return NextResponse.json(await unpublish(id));
}
