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
      // 👇 DEĞİŞİKLİK 1: await eklendi
      const featuredProducts = await getFeaturedProducts();
      return NextResponse.json({
        products: featuredProducts,
        total: featuredProducts.length, // Buradaki await kalktı çünkü yukarıda bekledik zaten
        totalPages: 1,
      });
    }

    // Arama
    if (search) {
      // 👇 DEĞİŞİKLİK 2: await eklendi
      const result = await searchProducts(search, { page, perPage });
      return NextResponse.json({
        products: result.products,
        total: result.total,
        totalPages: result.totalPages,
      });
    }

    // Kategoriye göre filtreleme
    if (category) {
      // 👇 DEĞİŞİKLİK 3: await eklendi
      const result = await getProductsByCategory(category, { page, perPage });
      return NextResponse.json({
        products: result.products,
        total: result.total,
        totalPages: result.totalPages,
      });
    }

    // Tüm ürünler
    // 👇 DEĞİŞİKLİK 4: await eklendi
    const result = await getAllProducts({ page, perPage });
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