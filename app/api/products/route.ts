import { NextResponse } from "next/server";

const WOOCOMMERCE_API_URL = "https://medasavunma.com.tr/wp-json/wc/v3/products";
const CONSUMER_KEY = "ck_b0eaf857de93ce145d2f9b69be9fcf51774a843d";
const CONSUMER_SECRET = "cs_8b1469ff7b106bf90dbbb3539e0081d87f3af8db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const per_page = searchParams.get("per_page") || "12";
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const excludeAccessories =
      searchParams.get("exclude_accessories") === "true";
    const featuredByCategory = searchParams.get("featured_by_category") === "true";

    // Anasayfa için kategoriye göre öne çıkan ürünler
    if (featuredByCategory) {
      const targetCategories = [
        { name: "Dragon Winch Hidra SERIES WINCHS", slug: "dragon-winch-hidra-series-winchs" },
        { name: "Dragon Winch Highlander SERIES WINCHS", slug: "dragon-winch-highlander-series-winchs" },
        { name: "Dragon Winch Maverick", slug: "dragon-winch-maverick" },
        { name: "Dragon Winch Move SERIES WINCHS", slug: "dragon-winch-move-series-winchs" },
        { name: "Dragon Winch Truck SERIS WINCHS", slug: "dragon-winch-truck-seris-winchs" }
      ];

      const featuredProducts = [];
      
      for (const cat of targetCategories) {
        try {
          const categoryUrl = `${WOOCOMMERCE_API_URL}?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&category_slug=${cat.slug}&per_page=1&status=publish`;
          const categoryResponse = await fetch(categoryUrl, {
            headers: { "Content-Type": "application/json" },
            next: { revalidate: 300 }
          });
          
          if (categoryResponse.ok) {
            const categoryProducts = await categoryResponse.json();
            if (categoryProducts.length > 0) {
              featuredProducts.push(categoryProducts[0]);
            }
          }
        } catch (error) {
          console.error(`Error fetching from category ${cat.name}:`, error);
        }
      }

      return NextResponse.json({
        products: featuredProducts,
        total: featuredProducts.length,
        totalPages: 1,
      });
    }

    let apiUrl = `${WOOCOMMERCE_API_URL}?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&page=${page}&per_page=${per_page}&status=publish`;

    if (category) {
      apiUrl += `&category=${category}`;
    }

    if (search) {
      apiUrl += `&search=${encodeURIComponent(search)}`;
    }

    // Accessories kategorisini hariç tut (category ID: 94)
    if (excludeAccessories) {
      apiUrl += `&category_not_in=94`;
    }

    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const products = await response.json();

    return NextResponse.json({
      products,
      total: response.headers.get("X-WP-Total") || products.length,
      totalPages: response.headers.get("X-WP-TotalPages") || 1,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
