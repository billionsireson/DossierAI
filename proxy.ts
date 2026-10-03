import { NextRequest, NextResponse } from "next/server";
import { decryptSession } from "@/lib/auth/session";
import { cookies } from "next/headers";

const PUBLIC = ["/", "/login", "/signup", "/examples", "/pricing"];

/** Optimistic route guard — DAL checks remain the source of truth near data. */
export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isAppRoute = path.startsWith("/app");
  const isPublicRoute =
    PUBLIC.includes(path) ||
    path.startsWith("/p/") ||
    path.startsWith("/api/health");
  if (!isAppRoute || isPublicRoute) return NextResponse.next();

  const cookie = (await cookies()).get("dossierai_session")?.value;
  const session = await decryptSession(cookie);
  if (!session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
