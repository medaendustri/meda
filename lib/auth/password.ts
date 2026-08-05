import "server-only";
import bcrypt from "bcryptjs";

const DUMMY_HASH =
  "$2b$12$GAvPAqBdEZuGiUQldPBJXe3pH6U6FUDY0Gz.fDlQy1WQdVGwq7m0K";

/**
 * Next.js dotenv-expand `$` karakterlerini değişken sanıp bcrypt hash'ini bozar.
 * Bu yüzden ADMIN_PASSWORD_HASH base64 olarak da kabul edilir.
 */
export function resolveAdminPasswordHash(): string | undefined {
  const raw = process.env.ADMIN_PASSWORD_HASH?.trim();
  if (!raw) return undefined;
  if (raw.startsWith("$2")) return raw;
  try {
    const decoded = Buffer.from(raw, "base64").toString("utf8").trim();
    if (decoded.startsWith("$2")) return decoded;
  } catch {
    // ignore invalid base64
  }
  return undefined;
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const hash = resolveAdminPasswordHash();
  const candidateHash = hash || DUMMY_HASH;
  const valid = await bcrypt.compare(password, candidateHash);
  return Boolean(hash) && valid;
}
