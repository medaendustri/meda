import { NextResponse } from "next/server";
import { getProductById, getProductBySlug } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idOrSlug } = await params;

    // First try as number (ID)
    const id = parseInt(idOrSlug, 10);

    let product = null;

    if (!isNaN(id)) {
      product = getProductById(id);
    }

    // If not found by ID, try as slug
    if (!product) {
      product = getProductBySlug(idOrSlug);
    }

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
