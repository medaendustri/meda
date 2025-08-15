import { NextResponse } from "next/server"

const WOOCOMMERCE_API_URL = "https://medasavunma.com.tr/wp-json/wc/v3/products"
const CONSUMER_KEY = "ck_b0eaf857de93ce145d2f9b69be9fcf51774a843d"
const CONSUMER_SECRET = "cs_8b1469ff7b106bf90dbbb3539e0081d87f3af8db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get("page") || "1"
    const per_page = searchParams.get("per_page") || "12"
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    let apiUrl = `${WOOCOMMERCE_API_URL}?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&page=${page}&per_page=${per_page}&status=publish`

    if (category) {
      apiUrl += `&category=${category}`
    }

    if (search) {
      apiUrl += `&search=${encodeURIComponent(search)}`
    }

    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const products = await response.json()

    return NextResponse.json({
      products,
      total: response.headers.get("X-WP-Total") || products.length,
      totalPages: response.headers.get("X-WP-TotalPages") || 1,
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
