import { NextResponse } from "next/server";
import {
  getAllProducts,
  getFeaturedProducts,
  searchProducts,
  getProductsByCategory,
} from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const perPage = parseInt(searchParams.get("per_page") || "12", 10);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const featuredByCategory =
      searchParams.get("featured_by_category") === "true";

    // Anasayfa için kategoriye göre öne çıkan ürünler
    if (featuredByCategory) {
      const featuredProducts = getFeaturedProducts();
      return NextResponse.json({
        products: featuredProducts,
        total: featuredProducts.length,
        totalPages: 1,
      });
    }

    // Arama
    if (search) {
      const result = searchProducts(search, { page, perPage });
      return NextResponse.json({
        products: result.products,
        total: result.total,
        totalPages: result.totalPages,
      });
    }

    // Kategoriye göre filtreleme
    if (category) {
      const result = getProductsByCategory(category, { page, perPage });
      return NextResponse.json({
        products: result.products,
        total: result.total,
        totalPages: result.totalPages,
      });
    }

    // Tüm ürünler
    const result = getAllProducts({ page, perPage });
    return NextResponse.json({
      products: result.products,
      total: result.total,
      totalPages: result.totalPages,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
