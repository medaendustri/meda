import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { hasValidCsrf } from "@/lib/auth/csrf";
import { isAdminRequest } from "@/lib/auth/request";
import { requestIpHash, writeAuditLog } from "@/lib/auth/security-store";
import {
  getAdminArticleById,
  softDeleteArticle,
  updateArticle,
} from "@/lib/blog/repository";
import { validateArticleInput } from "@/lib/blog/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteProps = { params: Promise<{ id: string }> };

function parseId(value: string): number | null {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function GET(request: NextRequest, { params }: RouteProps) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }
  const id = parseId((await params).id);
  if (!id) return NextResponse.json({ error: "Geçersiz ID." }, { status: 400 });
  const article = await getAdminArticleById(id);
  return article
    ? NextResponse.json({ article })
    : NextResponse.json({ error: "Bulunamadı." }, { status: 404 });
}

export async function PUT(request: NextRequest, { params }: RouteProps) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }
  if (!hasValidCsrf(request)) {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 403 });
  }
  const id = parseId((await params).id);
  if (!id) return NextResponse.json({ error: "Geçersiz ID." }, { status: 400 });
  const current = await getAdminArticleById(id);
  if (!current) {
    return NextResponse.json({ error: "Bulunamadı." }, { status: 404 });
  }

  const validation = validateArticleInput(
    await request.json().catch(() => null),
  );
  if (!validation.success) {
    return NextResponse.json(
      { error: "Alanları kontrol edin.", issues: validation.error.flatten() },
      { status: 400 },
    );
  }

  try {
    await updateArticle(id, validation.data);
    await writeAuditLog({
      event: "article_updated",
      entityType: "article",
      entityId: id,
      ipHash: requestIpHash(request),
      details: { slug: validation.data.slug, status: validation.data.status },
    });
    revalidatePath("/haberler");
    revalidatePath(`/haberler/${current.slug}`);
    revalidatePath(`/haberler/${validation.data.slug}`);
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ ok: true, warnings: validation.warnings });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    const duplicate = /unique|constraint/i.test(message);
    return NextResponse.json(
      { error: duplicate ? "Bu slug zaten kullanılıyor." : "Kayıt güncellenemedi." },
      { status: duplicate ? 409 : 500 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteProps) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }
  if (!hasValidCsrf(request)) {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 403 });
  }
  const id = parseId((await params).id);
  if (!id) return NextResponse.json({ error: "Geçersiz ID." }, { status: 400 });
  const current = await getAdminArticleById(id);
  if (!current) {
    return NextResponse.json({ error: "Bulunamadı." }, { status: 404 });
  }

  await softDeleteArticle(id);
  await writeAuditLog({
    event: "article_deleted",
    entityType: "article",
    entityId: id,
    ipHash: requestIpHash(request),
    details: { slug: current.slug },
  });
  revalidatePath("/haberler");
  revalidatePath(`/haberler/${current.slug}`);
  revalidatePath("/sitemap.xml");
  return NextResponse.json({ ok: true });
}
