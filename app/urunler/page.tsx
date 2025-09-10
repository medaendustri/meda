"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Eye,
  Grid,
  List,
  Star,
  Anchor,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface WooCommerceProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  images: Array<{
    id: number;
    src: string;
    alt: string;
  }>;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  price_html: string;
  stock_status: string;
  average_rating: string;
  rating_count: number;
}

interface WooCommerceCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  description: string;
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("name");
  const [products, setProducts] = useState<WooCommerceProduct[]>([]);
  const [categories, setCategories] = useState<WooCommerceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [currentPage, selectedCategory, searchTerm]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = `/api/products?page=${currentPage}&per_page=12`;

      if (selectedCategory !== "all") {
        url += `&category=${selectedCategory}`;
      }

      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
        setTotalPages(Number.parseInt(data.totalPages) || 1);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const allCategories = [
    {
      id: "all",
      name: "Tüm Dragon Winch Ürünleri",
      count: products.length,
      icon: <Grid className="w-4 h-4" />,
      description: "Tüm çekme vinci kategorileri",
    },
    ...categories.map((cat) => ({
      id: cat.id.toString(),
      name: cat.name,
      count: cat.count,
      icon: <Anchor className="w-4 h-4" />,
      description: cat.description || "Dragon Winch çekme vinci kategorisi",
    })),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "rating":
        return (
          Number.parseFloat(b.average_rating) -
          Number.parseFloat(a.average_rating)
        );
      case "reviews":
        return b.rating_count - a.rating_count;
      default:
        return 0;
    }
  });

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
    if (value === "") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - More compact and professional hero */}
      <section className="relative py-16 bg-gradient-to-br from-[#d84948] via-[#dc5a59] to-[#c73e3d] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1400')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-white">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-white font-medium text-sm mb-4 backdrop-blur-sm">
              <Anchor className="w-4 h-4 mr-2" />
              Dragon Winch Kataloğu
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Dragon Winch Ürünleri
            </h1>
            <p className="text-lg text-red-100 max-w-3xl mx-auto leading-relaxed">
              Dragon Winch çekme vinci tamburlarının geniş ürün portföyünü
              keşfedin. Denizcilik, endüstri ve liman sektörleri için
              profesyonel vinç çözümleri.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories - More compact sidebar design */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-0 shadow-xl bg-white">
              <CardHeader className="bg-gradient-to-r from-[#d84948] to-[#c73e3d] text-white rounded-t-lg p-4">
                <CardTitle className="flex items-center text-base font-semibold">
                  <Filter className="w-4 h-4 mr-2" />
                  Vinç Kategorileri
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {allCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`w-full text-left p-3 transition-all duration-300 border-b border-gray-100 last:border-b-0 group ${
                      selectedCategory === category.id
                        ? "bg-[#d84948]/10 border-l-4 border-l-[#d84948]"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`p-1.5 rounded-lg transition-colors ${
                            selectedCategory === category.id
                              ? "bg-[#d84948] text-white"
                              : "bg-gray-100 text-gray-600 group-hover:bg-[#d84948]/10 group-hover:text-[#d84948]"
                          }`}
                        >
                          {category.icon}
                        </div>
                        <span
                          className={`font-medium text-sm ${
                            selectedCategory === category.id
                              ? "text-[#d84948]"
                              : "text-gray-900"
                          }`}
                        >
                          {category.name}
                        </span>
                      </div>
                      <Badge
                        variant={
                          selectedCategory === category.id
                            ? "default"
                            : "secondary"
                        }
                        className={`text-xs ${
                          selectedCategory === category.id ? "bg-[#d84948]" : ""
                        }`}
                      >
                        {category.count}
                      </Badge>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Controls - More compact controls */}
            <Card className="mb-6 border-0 shadow-lg bg-white">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Dragon Winch ürünlerinde ara..."
                      value={searchTerm}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="pl-9 py-2 border-gray-200 focus:border-[#d84948] focus:ring-[#d84948] text-sm"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border border-gray-200 rounded-lg focus:border-[#d84948] focus:ring-[#d84948] text-sm"
                    >
                      <option value="name">İsme Göre</option>
                      <option value="rating">Puana Göre</option>
                      <option value="reviews">Yoruma Göre</option>
                    </select>
                    <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 transition-colors ${
                          viewMode === "grid"
                            ? "bg-[#d84948] text-white"
                            : "bg-white text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <Grid className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 transition-colors ${
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
              </CardContent>
            </Card>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-600 text-sm">
                  <span className="font-semibold text-[#d84948]">
                    {sortedProducts.length}
                  </span>{" "}
                  Dragon Winch ürünü bulundu
                  {selectedCategory !== "all" && (
                    <span className="ml-2">
                      -{" "}
                      {
                        allCategories.find((c) => c.id === selectedCategory)
                          ?.name
                      }
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-[#d84948]" />
                <span className="ml-2 text-gray-600">
                  Dragon Winch ürünleri yükleniyor...
                </span>
              </div>
            )}

            {/* Products Grid/List - Better image sizing and layout */}
            {!loading && (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {sortedProducts.map((product) => (
                  <Card
                    key={product.id}
                    className={`group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1 overflow-hidden bg-white ${
                      viewMode === "list" ? "flex flex-row" : ""
                    }`}
                  >
                    <div
                      className={`relative overflow-hidden ${
                        viewMode === "list"
                          ? "w-48 h-32 flex-shrink-0"
                          : "aspect-[4/3]"
                      }`}
                    >
                      <Image
                        src={
                          product.images[0]?.src ||
                          "/placeholder.svg?height=240&width=320&query=dragon winch product"
                        }
                        alt={product.images[0]?.alt || product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes={
                          viewMode === "list"
                            ? "192px"
                            : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        }
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-2 left-2">
                        <Badge
                          className={`text-xs ${
                            product.stock_status === "instock"
                              ? "bg-green-600"
                              : "bg-red-600"
                          }`}
                        >
                          {product.stock_status === "instock"
                            ? "Stokta"
                            : "Stokta Yok"}
                        </Badge>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-[#d84948] text-white text-xs">
                          Dragon Winch
                        </Badge>
                      </div>
                    </div>

                    <div
                      className={`flex-1 ${viewMode === "list" ? "p-4" : ""}`}
                    >
                      <CardHeader
                        className={`${
                          viewMode === "list" ? "p-0 pb-2" : "p-4 pb-2"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Badge
                            variant="outline"
                            className="text-[#d84948] border-[#d84948] text-xs"
                          >
                            {product.categories[0]?.name || "Çekme Vinci"}
                          </Badge>
                          {Number.parseFloat(product.average_rating) > 0 && (
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-xs font-medium">
                                {product.average_rating}
                              </span>
                              <span className="text-xs text-gray-500">
                                ({product.rating_count})
                              </span>
                            </div>
                          )}
                        </div>
                        <CardTitle className="text-base font-semibold text-gray-900 group-hover:text-[#d84948] transition-colors line-clamp-2 leading-tight">
                          {product.name}
                        </CardTitle>
                        <div
                          className="text-xs text-gray-600 line-clamp-2 leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html:
                              product.short_description ||
                              product.description.substring(0, 100) + "...",
                          }}
                        />
                      </CardHeader>

                      <CardContent
                        className={`${
                          viewMode === "list" ? "p-0" : "p-4 pt-0"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-medium text-[#d84948]">
                            {product.price_html ? (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: product.price_html,
                                }}
                              />
                            ) : (
                              "Fiyat için iletişime geçin"
                            )}
                          </div>
                          <Link href={`/urunler/${product.id}`}>
                            <Button
                              size="sm"
                              className="bg-[#d84948] hover:bg-[#c73e3d] group-hover:shadow-md transition-all duration-300 text-xs px-3 py-1.5"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              Detay
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* No Results */}
            {!loading && sortedProducts.length === 0 && (
              <Card className="text-center py-12 border-0 shadow-lg bg-white">
                <CardContent>
                  <div className="mx-auto mb-4 p-4 bg-gray-100 rounded-full w-fit">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Dragon Winch Ürünü Bulunamadı
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Aradığınız kriterlere uygun Dragon Winch ürünü bulunamadı.
                  </p>
                  <Button
                    onClick={() => {
                      setSelectedCategory("all");
                      setSearchTerm("");
                      setCurrentPage(1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="bg-[#d84948] hover:bg-[#c73e3d]"
                  >
                    Filtreleri Temizle
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Pagination - More compact pagination */}
            {!loading && totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
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
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
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
      </div>
    </div>
  );
}
