import { NextRequest, NextResponse } from "next/server";
import { hasValidCsrf } from "@/lib/auth/csrf";
import { isAdminRequest } from "@/lib/auth/request";
import { sanitizeAndValidateArticleHtml } from "@/lib/blog/content-security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }
  if (!hasValidCsrf(request)) {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 403 });
  }
  const body = await request.json().catch(() => null);
  if (!body || typeof body.html !== "string" || body.html.length > 200_000) {
    return NextResponse.json({ error: "Geçersiz içerik." }, { status: 400 });
  }
  return NextResponse.json(sanitizeAndValidateArticleHtml(body.html));
}
