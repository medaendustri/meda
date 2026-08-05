import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { hasValidCsrf } from "@/lib/auth/csrf";
import { isAdminRequest } from "@/lib/auth/request";
import { requestIpHash, writeAuditLog } from "@/lib/auth/security-store";
import { getProductById, updateProductById } from "@/lib/db";
import { validateProductUpdate } from "@/lib/products/schema";

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
  const product = await getProductById(id);
  return product
    ? NextResponse.json({ product })
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

  const current = await getProductById(id);
  if (!current) {
    return NextResponse.json({ error: "Bulunamadı." }, { status: 404 });
  }

  const validation = validateProductUpdate(
    await request.json().catch(() => null),
  );
  if (!validation.success) {
    return NextResponse.json(
      { error: "Alanları kontrol edin.", issues: validation.error.flatten() },
      { status: 400 },
    );
  }

  const product = await updateProductById(id, validation.data);
  if (!product) {
    return NextResponse.json({ error: "Güncellenemedi." }, { status: 500 });
  }

  await writeAuditLog({
    event: "product_updated",
    entityType: "product",
    entityId: id,
    ipHash: requestIpHash(request),
    details: { name: product.name, slug: product.slug },
  });

  revalidatePath("/urunler");
  revalidatePath(`/urunler/${current.slug}`);
  revalidatePath(`/urunler/${product.slug}`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/");

  return NextResponse.json({ product });
}
