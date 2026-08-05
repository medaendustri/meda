import { config } from "dotenv";
import { createClient } from "@libsql/client";
import sanitizeHtml from "sanitize-html";

config();

if (!process.env.ADMIN_PASSWORD_HASH || !process.env.ADMIN_SESSION_SECRET) {
  console.error("ADMIN_PASSWORD_HASH ve ADMIN_SESSION_SECRET gerekli.");
  process.exit(1);
}

console.log("session_secret_len", process.env.ADMIN_SESSION_SECRET.length);
console.log(
  "password_hash_prefix",
  process.env.ADMIN_PASSWORD_HASH.slice(0, 7),
);

const raw =
  '<p>hi</p><script>alert(1)</script><h1>bad</h1><a href="javascript:alert(1)">x</a>';
const html = sanitizeHtml(raw, {
  allowedTags: ["p", "h2", "h3", "a", "img"],
  allowedAttributes: { a: ["href"], img: ["src", "alt"] },
  allowedSchemes: ["http", "https", "mailto"],
});
console.log("xss_has_script", /script/i.test(html));
console.log("xss_has_js_href", /javascript:/i.test(html));

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});
const rows = await db.execute(
  "SELECT COUNT(*) AS count FROM articles WHERE status = 'published' AND deleted_at IS NULL",
);
console.log("published_count", Number(rows.rows[0]?.count || 0));
db.close();
