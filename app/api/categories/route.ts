import { NextResponse } from "next/server"

const WOOCOMMERCE_API_URL = "https://medasavunma.com.tr/wp-json/wc/v3/products/categories"
const CONSUMER_KEY = "ck_b0eaf857de93ce145d2f9b69be9fcf51774a843d"
const CONSUMER_SECRET = "cs_8b1469ff7b106bf90dbbb3539e0081d87f3af8db"

export async function GET() {
  try {
    const apiUrl = `${WOOCOMMERCE_API_URL}?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&per_page=100&hide_empty=true`

    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 600 }, // Cache for 10 minutes
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const categories = await response.json()

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}
