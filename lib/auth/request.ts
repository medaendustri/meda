import "server-only";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE } from "./constants";
import { verifySessionToken } from "./token";

export async function isAdminRequest(request: NextRequest): Promise<boolean> {
  return Boolean(
    await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value),
  );
}
