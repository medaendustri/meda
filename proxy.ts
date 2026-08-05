import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth/constants";
import { verifySessionToken } from "@/lib/auth/token";

const PUBLIC_AUTH_PATHS = new Set([
  "/admin/login",
  "/api/auth/login",
  "/api/auth/csrf",
]);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  if (PUBLIC_AUTH_PATHS.has(pathname)) {
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  const session = await verifySessionToken(
    request.cookies.get(SESSION_COOKIE)?.value,
  );
  if (session) {
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/auth/logout",
  ],
};
