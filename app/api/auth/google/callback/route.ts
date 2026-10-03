import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSession } from "@/lib/auth/session";
import {
  exchangeCode,
  findOrCreateOAuthUser,
  googleConfigured,
  googleUserInfo,
} from "@/lib/auth/google";
import { grant, balance } from "@/lib/credits/ledger";
import { PLANS } from "@/lib/billing/plans";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const fail = (reason: string) =>
    NextResponse.redirect(new URL(`/login?oauth=${reason}`, req.url));
  if (!googleConfigured()) return fail("unconfigured");

  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const store = await cookies();
  const expected = store.get("dossierai_oauth_state")?.value;
  store.delete("dossierai_oauth_state");
  if (!code || !state || state !== expected) return fail("invalid-state");

  try {
    const { accessToken } = await exchangeCode(code);
    const info = await googleUserInfo(accessToken);
    const user = await findOrCreateOAuthUser(info);
    if ((await balance(user.id)) === 0) {
      await grant(user.id, PLANS.FREE.creditsPerMonth, "bonus", "welcome");
    }
    await createSession(user.id);
  } catch {
    return fail("failed");
  }
  return NextResponse.redirect(new URL("/app/dashboard", req.url));
}
