import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { googleAuthUrl, googleConfigured } from "@/lib/auth/google";

export const runtime = "nodejs";

export async function GET() {
  if (!googleConfigured()) {
    return NextResponse.json(
      { error: "Google sign-in is not configured." },
      { status: 503 },
    );
  }
  const state = randomUUID();
  const res = NextResponse.redirect(googleAuthUrl(state));
  res.cookies.set("dossierai_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });
  return res;
}
