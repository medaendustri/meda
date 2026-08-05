import { jwtVerify, SignJWT } from "jose";
import {
  getAdminUsername,
  getSessionMaxAge,
  getSessionSecret,
  SESSION_AUDIENCE,
  SESSION_ISSUER,
} from "./constants";

export type AdminSession = {
  username: string;
  expiresAt: number;
};

export async function createSessionToken(): Promise<string> {
  const maxAge = getSessionMaxAge();
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject(getAdminUsername())
    .setIssuer(SESSION_ISSUER)
    .setAudience(SESSION_AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(`${maxAge}s`)
    .sign(getSessionSecret());
}

export async function verifySessionToken(
  token?: string,
): Promise<AdminSession | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSessionSecret(), {
      issuer: SESSION_ISSUER,
      audience: SESSION_AUDIENCE,
      algorithms: ["HS256"],
    });
    if (
      payload.sub !== getAdminUsername() ||
      payload.role !== "admin" ||
      !payload.exp
    ) {
      return null;
    }
    return { username: payload.sub, expiresAt: payload.exp };
  } catch {
    return null;
  }
}
