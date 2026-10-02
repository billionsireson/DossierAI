import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "dossierai",
    milestone: 0,
    timestamp: new Date().toISOString(),
  });
}
