import { NextResponse } from "next/server"

const WOOCOMMERCE_API_URL = "https://medasavunma.com.tr/wp-json/wc/v3/products"
const CONSUMER_KEY = "ck_b0eaf857de93ce145d2f9b69be9fcf51774a843d"
const CONSUMER_SECRET = "cs_8b1469ff7b106bf90dbbb3539e0081d87f3af8db"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const apiUrl = `${WOOCOMMERCE_API_URL}/${params.id}?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`

    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const product = await response.json()

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}
