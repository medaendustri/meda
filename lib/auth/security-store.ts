import "server-only";
import { createHmac } from "node:crypto";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
let schemaReady = false;

async function ensureAuthSchema() {
  if (schemaReady) return;
  await db.executeMultiple(`
    CREATE TABLE IF NOT EXISTS auth_login_attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ip_hash TEXT NOT NULL,
      attempted_at INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_auth_attempts_ip_time
      ON auth_login_attempts(ip_hash, attempted_at);
    CREATE TABLE IF NOT EXISTS admin_audit_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event TEXT NOT NULL,
      entity_type TEXT,
      entity_id TEXT,
      ip_hash TEXT,
      details_json TEXT NOT NULL DEFAULT '{}',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
  schemaReady = true;
}

export function requestIpHash(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for") || "unknown";
  const ip = forwarded.split(",")[0]?.trim() || "unknown";
  const secret = process.env.ADMIN_SESSION_SECRET || "missing-secret";
  return createHmac("sha256", secret).update(ip).digest("hex");
}

export async function checkLoginRateLimit(
  request: NextRequest,
): Promise<{ allowed: boolean; ipHash: string; retryAfter: number }> {
  await ensureAuthSchema();
  const ipHash = requestIpHash(request);
  const now = Date.now();
  const since = now - WINDOW_MS;

  await db.execute({
    sql: "DELETE FROM auth_login_attempts WHERE attempted_at < ?",
    args: [now - 24 * 60 * 60 * 1000],
  });
  const result = await db.execute({
    sql: "SELECT COUNT(*) AS count, MIN(attempted_at) AS oldest FROM auth_login_attempts WHERE ip_hash = ? AND attempted_at >= ?",
    args: [ipHash, since],
  });
  const count = Number(result.rows[0]?.count || 0);
  const oldest = Number(result.rows[0]?.oldest || now);
  return {
    allowed: count < MAX_ATTEMPTS,
    ipHash,
    retryAfter: Math.max(1, Math.ceil((oldest + WINDOW_MS - now) / 1000)),
  };
}

export async function recordFailedLogin(ipHash: string) {
  await ensureAuthSchema();
  await db.execute({
    sql: "INSERT INTO auth_login_attempts (ip_hash, attempted_at) VALUES (?, ?)",
    args: [ipHash, Date.now()],
  });
}

export async function clearLoginAttempts(ipHash: string) {
  await ensureAuthSchema();
  await db.execute({
    sql: "DELETE FROM auth_login_attempts WHERE ip_hash = ?",
    args: [ipHash],
  });
}

export async function writeAuditLog(input: {
  event: string;
  ipHash?: string;
  entityType?: string;
  entityId?: string | number;
  details?: Record<string, unknown>;
}) {
  await ensureAuthSchema();
  await db.execute({
    sql: `INSERT INTO admin_audit_log
      (event, entity_type, entity_id, ip_hash, details_json)
      VALUES (?, ?, ?, ?, ?)`,
    args: [
      input.event.slice(0, 80),
      input.entityType || null,
      input.entityId === undefined ? null : String(input.entityId),
      input.ipHash || null,
      JSON.stringify(input.details || {}).slice(0, 4000),
    ],
  });
}
