import "server-only";
import { randomBytes, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";
import { CSRF_COOKIE } from "./constants";

export function createCsrfToken(): string {
  return randomBytes(32).toString("base64url");
}

function safeEqual(left: string, right: string): boolean {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function hasValidOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const host =
    request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function hasValidCsrf(request: NextRequest): boolean {
  const cookieToken = request.cookies.get(CSRF_COOKIE)?.value;
  const headerToken = request.headers.get("x-csrf-token");
  return Boolean(
    cookieToken &&
      headerToken &&
      hasValidOrigin(request) &&
      safeEqual(cookieToken, headerToken),
  );
}
