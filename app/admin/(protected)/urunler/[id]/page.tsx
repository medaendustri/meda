import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { getProductById, getProductCategoryUrls } from "@/lib/db";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: PageProps) {
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id < 1) notFound();

  const [product, categoryUrls] = await Promise.all([
    getProductById(id),
    getProductCategoryUrls(),
  ]);
  if (!product) notFound();

  return (
    <div>
      <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[#e66a68]">
        Ürün düzenleme
      </p>
      <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
      <p className="mb-8 text-sm text-slate-400">
        ID #{product.id} · /urunler/{product.slug}
      </p>
      <ProductForm product={product} categoryUrls={categoryUrls} />
    </div>
  );
}
