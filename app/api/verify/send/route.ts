import { NextResponse } from "next/server";
import { z } from "zod";
import { sendVerificationCode } from "@/lib/auth/actions";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const parsed = z.object({ channel: z.enum(["email", "phone"]) }).safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Channel must be email or phone." }, { status: 400 });
  }
  return NextResponse.json(await sendVerificationCode(parsed.data.channel));
}
