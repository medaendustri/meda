import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import type { ParsedProduct } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SectorProductsProps = {
  products: ParsedProduct[];
  title: string;
  description: string;
};

export function SectorProducts({
  products,
  title,
  description,
}: SectorProductsProps) {
  return (
    <section className="bg-white py-16" aria-labelledby="sector-products-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2
            id="sector-products-title"
            className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl"
          >
            {title}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            {description}
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {products.map((product) => (
              <Card
                key={product.id}
                className="group border-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-50">
                  <Image
                    src={product.main_image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                </div>
                <CardHeader className="pb-2 pt-3">
                  <span className="text-xs font-medium text-[#d84948]">
                    {product.category_name}
                  </span>
                  <CardTitle className="line-clamp-2 text-sm font-semibold text-gray-900">
                    {product.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-3 pt-0">
                  <Button
                    asChild
                    size="sm"
                    className="w-full bg-[#d84948] text-xs text-white hover:bg-[#c73e3d]"
                  >
                    <Link href={`/urunler/${product.slug}`}>
                      <Eye className="mr-1 h-3 w-3" />
                      İncele
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
            <p className="mb-4 text-gray-600">
              Bu sektör için ürünler şu anda listelenemiyor.
            </p>
            <Button asChild className="bg-[#d84948] hover:bg-[#c73e3d]">
              <Link href="/urunler">Tüm ürünleri inceleyin</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
