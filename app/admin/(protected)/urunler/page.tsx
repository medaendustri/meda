import Link from "next/link";
import { Edit3, ExternalLink, Package, Search } from "lucide-react";
import { getAdminProducts } from "@/lib/db";

type PageProps = {
  searchParams: Promise<{ search?: string; page?: string }>;
};

const STOCK_LABELS: Record<string, string> = {
  high: "Yüksek",
  medium: "Orta",
  low: "Düşük",
  out: "Tükendi",
};

export default async function AdminProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search?.trim() || "";
  const page = Math.max(1, Number(params.page || "1") || 1);
  const { products, total, totalPages } = await getAdminProducts({
    search: search || undefined,
    page,
    perPage: 40,
  });

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[#e66a68]">
            Ürün yönetimi
          </p>
          <h1 className="text-3xl font-bold">Tüm ürünler</h1>
          <p className="mt-2 text-sm text-slate-400">{total} ürün</p>
        </div>
      </div>

      <form className="mb-6 flex gap-2" action="/admin/urunler" method="get">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            name="search"
            defaultValue={search}
            placeholder="Ürün adı, kategori veya ID ara…"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-3 text-sm text-white outline-none focus:border-[#d84948]"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-semibold hover:bg-slate-700"
        >
          Ara
        </button>
      </form>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
        {products.length === 0 ? (
          <p className="flex flex-col items-center gap-3 p-10 text-center text-slate-400">
            <Package className="h-8 w-8 opacity-40" />
            Ürün bulunamadı.
          </p>
        ) : (
          <div className="divide-y divide-slate-800">
            {products.map((product) => (
              <article
                key={product.id}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-start gap-4">
                  {product.main_image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.main_image}
                      alt=""
                      className="h-14 w-14 shrink-0 rounded-lg object-cover bg-slate-800"
                    />
                  ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-slate-800">
                      <Package className="h-5 w-5 text-slate-500" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-300">
                        #{product.id}
                      </span>
                      <span className="text-xs text-slate-500">
                        {product.category_name}
                      </span>
                      <span className="text-xs text-slate-500">
                        Stok:{" "}
                        {STOCK_LABELS[product.stock_status] ||
                          product.stock_status}
                      </span>
                    </div>
                    <h2 className="truncate font-bold text-white">
                      {product.name}
                    </h2>
                    <p className="truncate text-sm text-slate-400">
                      /urunler/{product.slug}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/urunler/${product.slug}`}
                    target="_blank"
                    aria-label={`${product.name} ürününü görüntüle`}
                    className="rounded-lg border border-slate-700 p-2 text-slate-300 hover:bg-slate-800"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/admin/urunler/${product.id}`}
                    aria-label={`${product.name} ürününü düzenle`}
                    className="rounded-lg border border-slate-700 p-2 text-slate-300 hover:bg-slate-800"
                  >
                    <Edit3 className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => {
              const query = new URLSearchParams();
              if (search) query.set("search", search);
              query.set("page", String(pageNumber));
              return (
                <Link
                  key={pageNumber}
                  href={`/admin/urunler?${query.toString()}`}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                    pageNumber === page
                      ? "bg-[#d84948] text-white"
                      : "border border-slate-700 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {pageNumber}
                </Link>
              );
            },
          )}
        </div>
      )}
    </div>
  );
}
