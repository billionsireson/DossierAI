import "server-only";
import { getDb } from "@/lib/db";

const GOOGLE_AUTH = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO = "https://www.googleapis.com/oauth2/v3/userinfo";

function baseUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

export function googleConfigured(): boolean {
  return Boolean(
    process.env.AUTH_PROVIDER_CLIENT_ID && process.env.AUTH_PROVIDER_CLIENT_SECRET,
  );
}

export function googleAuthUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: process.env.AUTH_PROVIDER_CLIENT_ID ?? "",
    redirect_uri: `${baseUrl()}/api/auth/google/callback`,
    response_type: "code",
    scope: "openid email profile",
    state,
    access_type: "online",
    prompt: "select_account",
  });
  return `${GOOGLE_AUTH}?${params.toString()}`;
}

export async function exchangeCode(code: string): Promise<{ accessToken: string }> {
  const res = await fetch(GOOGLE_TOKEN, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.AUTH_PROVIDER_CLIENT_ID ?? "",
      client_secret: process.env.AUTH_PROVIDER_CLIENT_SECRET ?? "",
      redirect_uri: `${baseUrl()}/api/auth/google/callback`,
      grant_type: "authorization_code",
    }),
  });
  if (!res.ok) throw new Error("Google token exchange failed.");
  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) throw new Error("Google returned no access token.");
  return { accessToken: data.access_token };
}

export async function googleUserInfo(accessToken: string): Promise<{
  email: string;
  name?: string;
  avatarUrl?: string;
}> {
  const res = await fetch(GOOGLE_USERINFO, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error("Google userinfo fetch failed.");
  const data = (await res.json()) as {
    email?: string;
    email_verified?: boolean;
    name?: string;
    picture?: string;
  };
  if (!data.email) throw new Error("Google returned no email.");
  return { email: data.email.toLowerCase(), name: data.name, avatarUrl: data.picture };
}

export async function findOrCreateOAuthUser(args: {
  email: string;
  name?: string;
  avatarUrl?: string;
}) {
  const db = await getDb();
  const existing = await db.user.findUnique({ where: { email: args.email } });
  if (existing) {
    return db.user.update({
      where: { email: args.email },
      data: {
        name: existing.name ?? args.name,
        avatarUrl: existing.avatarUrl ?? args.avatarUrl,
      },
    });
  }
  return db.user.create({
    data: { email: args.email, name: args.name, avatarUrl: args.avatarUrl, plan: "FREE" },
  });
}
