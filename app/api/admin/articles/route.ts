import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { hasValidCsrf } from "@/lib/auth/csrf";
import { isAdminRequest } from "@/lib/auth/request";
import { requestIpHash, writeAuditLog } from "@/lib/auth/security-store";
import {
  createArticle,
  getAdminArticles,
} from "@/lib/blog/repository";
import { validateArticleInput } from "@/lib/blog/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }
  return NextResponse.json({ articles: await getAdminArticles() });
}

export async function POST(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }
  if (!hasValidCsrf(request)) {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 403 });
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
    const id = await createArticle(validation.data);
    await writeAuditLog({
      event: "article_created",
      entityType: "article",
      entityId: id,
      ipHash: requestIpHash(request),
      details: { slug: validation.data.slug, status: validation.data.status },
    });
    revalidatePath("/haberler");
    revalidatePath(`/haberler/${validation.data.slug}`);
    revalidatePath("/sitemap.xml");
    return NextResponse.json(
      { id, warnings: validation.warnings },
      { status: 201 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    const duplicate = /unique|constraint/i.test(message);
    return NextResponse.json(
      { error: duplicate ? "Bu slug zaten kullanılıyor." : "Kayıt oluşturulamadı." },
      { status: duplicate ? 409 : 500 },
    );
  }
}
