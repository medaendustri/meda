import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth/request";
import { getAdminProducts } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || undefined;
  const page = Number(searchParams.get("page") || "1");
  const result = await getAdminProducts({ search, page, perPage: 40 });
  return NextResponse.json(result);
}
