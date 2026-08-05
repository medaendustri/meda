import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { hasValidCsrf } from "@/lib/auth/csrf";
import {
  getAdminUsername,
  getSessionMaxAge,
  SESSION_COOKIE,
} from "@/lib/auth/constants";
import { verifyAdminPassword } from "@/lib/auth/password";
import { createSessionToken } from "@/lib/auth/token";
import {
  checkLoginRateLimit,
  clearLoginAttempts,
  recordFailedLogin,
  writeAuditLog,
} from "@/lib/auth/security-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const loginSchema = z.object({
  username: z.string().trim().min(1).max(80),
  password: z.string().min(1).max(256),
});

export async function POST(request: NextRequest) {
  if (!hasValidCsrf(request)) {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 403 });
  }

  if (
    !process.env.ADMIN_PASSWORD_HASH ||
    !process.env.ADMIN_SESSION_SECRET
  ) {
    return NextResponse.json(
      { error: "Admin yapılandırması tamamlanmamış." },
      { status: 503 },
    );
  }

  const rate = await checkLoginRateLimit(request);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Çok fazla deneme. Lütfen daha sonra tekrar deneyin." },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfter) },
      },
    );
  }

  const parsed = loginSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    await recordFailedLogin(rate.ipHash);
    return NextResponse.json(
      { error: "Kullanıcı adı veya parola hatalı." },
      { status: 401 },
    );
  }

  const passwordValid = await verifyAdminPassword(parsed.data.password);
  const usernameValid = parsed.data.username === getAdminUsername();
  if (!passwordValid || !usernameValid) {
    await recordFailedLogin(rate.ipHash);
    await writeAuditLog({ event: "login_failed", ipHash: rate.ipHash });
    return NextResponse.json(
      { error: "Kullanıcı adı veya parola hatalı." },
      { status: 401 },
    );
  }

  await clearLoginAttempts(rate.ipHash);
  await writeAuditLog({ event: "login_success", ipHash: rate.ipHash });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: getSessionMaxAge(),
  });
  return response;
}
