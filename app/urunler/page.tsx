import {
  getAllProducts,
  getAllCategories,
  getProductsByCategory,
  searchProducts,
  isDatabaseConfigured,
} from "@/lib/db";
import { ProductsCatalog } from "@/components/products-catalog";
import { FaqSection } from "@/components/faq-section";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export const revalidate = 3600;

type PageProps = {
  searchParams: Promise<{
    category?: string;
    search?: string;
    page?: string;
  }>;
};

async function ProductsContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = params.category || "all";
  const search = params.search || "";
  const page = Math.max(1, Number.parseInt(params.page || "1", 10) || 1);
  const perPage = 16;

  if (!isDatabaseConfigured()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-lg text-center bg-white border border-amber-200 rounded-xl p-8 shadow-sm">
          <h1 className="text-xl font-bold text-gray-900 mb-3">
            Veritabanı bağlantısı yok
          </h1>
          <p className="text-gray-600 text-sm mb-4">
            Ürünler Turso üzerinden geliyor. Proje kökündeki{" "}
            <code className="bg-gray-100 px-1 rounded">.env</code> dosyası şu an
            boş. Aşağıdaki değişkenleri ekleyip{" "}
            <code className="bg-gray-100 px-1 rounded">bun run dev</code>{" "}
            komutunu yeniden başlatın:
          </p>
          <pre className="text-left text-xs bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            {`TURSO_DATABASE_URL=libsql://....turso.io
TURSO_AUTH_TOKEN=...`}
          </pre>
          <p className="text-gray-500 text-xs mt-4">
            Örnek: <code>.env.example</code>
          </p>
        </div>
      </div>
    );
  }

  const categories = await getAllCategories();
  const allProductsCount = categories.reduce((sum, cat) => sum + cat.count, 0);

  let result: {
    products: Awaited<ReturnType<typeof getAllProducts>>["products"];
    total: number;
    totalPages: number;
  };

  if (search) {
    result = await searchProducts(search, { page, perPage });
  } else if (category !== "all") {
    result = await getProductsByCategory(category, { page, perPage });
  } else {
    result = await getAllProducts({ page, perPage });
  }

  return (
    <ProductsCatalog
      initialProducts={result.products}
      initialCategories={categories}
      initialTotal={result.total}
      initialTotalPages={result.totalPages}
      initialCategory={category}
      initialSearch={search}
      initialPage={page}
      allProductsCount={allProductsCount}
    />
  );
}

export default function ProductsPage(props: PageProps) {
  return (
    <>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Loader2 className="w-10 h-10 animate-spin text-[#d84948]" />
            <span className="ml-3 text-gray-600">Ürünler yükleniyor...</span>
          </div>
        }
      >
        <ProductsContent {...props} />
      </Suspense>
      <FaqSection />
    </>
  );
}
