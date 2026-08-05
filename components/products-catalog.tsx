"use client";

import { useState, useEffect, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Grid,
  List,
  Loader2,
  ChevronRight,
  Package,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ParsedProduct, Category } from "@/lib/db";

interface ProductsCatalogProps {
  initialProducts: ParsedProduct[];
  initialCategories: Category[];
  initialTotal: number;
  initialTotalPages: number;
  initialCategory: string;
  initialSearch: string;
  initialPage: number;
  allProductsCount: number;
}

export function ProductsCatalog({
  initialProducts,
  initialCategories,
  initialTotal,
  initialTotalPages,
  initialCategory,
  initialSearch,
  initialPage,
  allProductsCount,
}: ProductsCatalogProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [products, setProducts] = useState(initialProducts);
  const [categories] = useState(initialCategories);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [totalCount, setTotalCount] = useState(initialTotal);

  useEffect(() => {
    setProducts(initialProducts);
    setTotalPages(initialTotalPages);
    setTotalCount(initialTotal);
    setSelectedCategory(initialCategory);
    setSearchTerm(initialSearch);
    setCurrentPage(initialPage);
  }, [
    initialProducts,
    initialTotalPages,
    initialTotal,
    initialCategory,
    initialSearch,
    initialPage,
  ]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const fetchProducts = async (
    category: string,
    search: string,
    page: number,
  ) => {
    setLoading(true);
    try {
      let url = `/api/products?page=${page}&per_page=16`;
      if (category !== "all") {
        url += `&category=${category}`;
      }
      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
        setTotalPages(Number.parseInt(data.totalPages) || 1);
        setTotalCount(Number.parseInt(data.total) || 0);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUrl = (category: string, search: string, page: number) => {
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (search) params.set("search", search);
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    startTransition(() => {
      router.push(qs ? `/urunler?${qs}` : "/urunler", { scroll: false });
    });
  };

  const allCategories = [
    {
      id: "all",
      name: "Tüm Ürünler",
      count: allProductsCount,
      slug: "all",
    },
    ...categories.map((cat) => ({
      id: cat.slug,
      name: cat.name,
      count: cat.count,
      slug: cat.slug,
    })),
  ];

  const sortedProducts = [...products].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const getStockBadge = (status: string) => {
    switch (status) {
      case "high":
        return { text: "Stokta", color: "bg-green-500" };
      case "medium":
        return { text: "Sınırlı Stok", color: "bg-yellow-500" };
      case "low":
        return { text: "Son Stoklar", color: "bg-orange-500" };
      case "out":
        return { text: "Stokta Yok", color: "bg-red-500" };
      default:
        return { text: "Stok Bilgisi Yok", color: "bg-gray-500" };
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    updateUrl(categoryId, searchTerm, 1);
    fetchProducts(categoryId, searchTerm, 1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
    updateUrl(selectedCategory, value, 1);
    fetchProducts(selectedCategory, value, 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateUrl(selectedCategory, searchTerm, page);
    fetchProducts(selectedCategory, searchTerm, page);
  };

  const isLoading = loading || isPending;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="breadcrumb" className="py-3">
            <ol className="flex items-center text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-[#d84948]">
                  Ana Sayfa
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-4 h-4 mx-2" />
              </li>
              <li className="text-gray-900 font-medium" aria-current="page">
                Ürünler
              </li>
            </ol>
          </nav>

          <div className="pb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Dragon Winch Ürünleri
            </h1>
          </div>

          <nav aria-label="Ürün kategorileri" className="pb-4 flex flex-wrap gap-2">
            {allCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-[#d84948] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                aria-current={selectedCategory === category.id ? "page" : undefined}
              >
                {category.name}
                <span
                  className={`ml-2 ${
                    selectedCategory === category.id
                      ? "text-white/80"
                      : "text-gray-500"
                  }`}
                >
                  ({category.count})
                </span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:max-w-md relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="search"
                placeholder="Ürün ara..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 py-2.5 border-gray-200 focus:border-[#d84948] focus:ring-[#d84948] rounded-lg"
                aria-label="Ürün ara"
              />
            </div>
            <div className="flex items-center gap-4">
              <p className="text-gray-600 text-sm">
                <span className="font-semibold text-[#d84948]">
                  {totalCount}
                </span>{" "}
                ürün
              </p>
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  aria-label="Izgara görünümü"
                  className={`p-2.5 transition-colors ${
                    viewMode === "grid"
                      ? "bg-[#d84948] text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  aria-label="Liste görünümü"
                  className={`p-2.5 transition-colors ${
                    viewMode === "list"
                      ? "bg-[#d84948] text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-[#d84948]" />
            <span className="ml-3 text-gray-600 text-lg">
              Ürünler yükleniyor...
            </span>
          </div>
        )}

        {!isLoading && (
          <section
            aria-label="Ürün listesi"
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                : "space-y-4"
            }
          >
            {sortedProducts.map((product) => {
              const stockBadge = getStockBadge(product.stock_status);
              return (
                <Link
                  key={product.id}
                  href={`/urunler/${product.slug}`}
                  className="block group"
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-[#d84948]/30 overflow-hidden bg-white">
                    <div className="relative aspect-square bg-gray-50">
                      <div className="absolute top-2 left-2 z-10">
                        <Badge
                          className={`${stockBadge.color} text-white text-xs flex items-center gap-1`}
                        >
                          <Package className="w-3 h-3" />
                          {stockBadge.text}
                        </Badge>
                      </div>
                      <Image
                        src={
                          product.main_image ||
                          "/placeholder.svg?height=300&width=300"
                        }
                        alt={product.name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <CardContent className="p-4">
                      <Badge
                        variant="outline"
                        className="text-[#d84948] border-[#d84948]/30 text-xs mb-2"
                      >
                        {product.category_name || "Ürün"}
                      </Badge>
                      <h2 className="font-semibold text-gray-900 group-hover:text-[#d84948] transition-colors line-clamp-2 text-sm leading-snug">
                        {product.name}
                      </h2>
                      {Object.keys(product.specs || {}).length > 0 && (
                        <div className="text-xs text-gray-500 mt-2 space-y-0.5">
                          {Object.entries(product.specs)
                            .slice(0, 2)
                            .map(([key, value]) => (
                              <div key={key} className="truncate">
                                <span className="text-gray-600">
                                  {key.trim()}:
                                </span>{" "}
                                {value}
                              </div>
                            ))}
                        </div>
                      )}
                      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                          Detaylar için tıklayın
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#d84948] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </section>
        )}

        {!isLoading && sortedProducts.length === 0 && (
          <Card className="text-center py-12 border-0 shadow-lg bg-white">
            <CardContent>
              <div className="mx-auto mb-4 p-4 bg-gray-100 rounded-full w-fit">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Ürün Bulunamadı
              </h2>
              <p className="text-gray-500 mb-4">
                Aradığınız kriterlere uygun ürün bulunamadı.
              </p>
              <Button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchTerm("");
                  setCurrentPage(1);
                  updateUrl("all", "", 1);
                  fetchProducts("all", "", 1);
                }}
                className="bg-[#d84948] hover:bg-[#c73e3d]"
              >
                Filtreleri Temizle
              </Button>
            </CardContent>
          </Card>
        )}

        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="hover:bg-[#d84948]/10 hover:text-[#d84948] hover:border-[#d84948]"
              >
                Önceki
              </Button>
              <span className="px-3 py-1 text-sm text-gray-600 bg-gray-50 rounded">
                {currentPage} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="hover:bg-[#d84948]/10 hover:text-[#d84948] hover:border-[#d84948]"
              >
                Sonraki
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
