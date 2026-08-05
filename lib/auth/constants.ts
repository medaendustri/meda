export const SESSION_COOKIE = "meda_admin_session";
export const CSRF_COOKIE = "meda_admin_csrf";
export const SESSION_ISSUER = "meda-admin";
export const SESSION_AUDIENCE = "meda-admin-panel";

export function getAdminUsername(): string {
  return process.env.ADMIN_USERNAME || "admin";
}

export function getSessionMaxAge(): number {
  const configured = Number(process.env.ADMIN_SESSION_MAX_AGE);
  return Number.isFinite(configured) && configured >= 900
    ? configured
    : 8 * 60 * 60;
}

export function getSessionSecret(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET en az 32 karakter olmalıdır.");
  }
  return new TextEncoder().encode(secret);
}
