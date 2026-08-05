import { NextRequest, NextResponse } from "next/server";
import { hasValidCsrf } from "@/lib/auth/csrf";
import { SESSION_COOKIE } from "@/lib/auth/constants";
import { verifySessionToken } from "@/lib/auth/token";
import { writeAuditLog, requestIpHash } from "@/lib/auth/security-store";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const session = await verifySessionToken(
    request.cookies.get(SESSION_COOKIE)?.value,
  );
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }
  if (!hasValidCsrf(request)) {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 403 });
  }

  await writeAuditLog({
    event: "logout",
    ipHash: requestIpHash(request),
  });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return response;
}
