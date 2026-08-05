import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { config as loadEnv } from "dotenv";
import { createClient } from "@libsql/client";
import { seedArticles } from "./blog-seed-data.mjs";

loadEnv();

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
if (!url || !authToken) {
  console.error("TURSO_DATABASE_URL ve TURSO_AUTH_TOKEN gerekli.");
  process.exit(1);
}

const here = dirname(fileURLToPath(import.meta.url));
const sql = await readFile(
  join(here, "migrations", "001_blog_admin.sql"),
  "utf8",
);
const db = createClient({ url, authToken });

try {
  await db.executeMultiple(sql);
  for (const article of seedArticles) {
    const contentText = article.content
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    await db.execute({
      sql: `INSERT OR IGNORE INTO articles (
        slug, title, excerpt, content_html, content_text, author, category,
        image_url, featured, status, published_at, seo_title, meta_description,
        keywords_json, robots_index, robots_follow, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'published', ?, ?, ?, '[]', 1, 1, ?, ?)`,
      args: [
        article.slug,
        article.title,
        article.excerpt,
        article.content,
        contentText,
        article.author,
        article.category,
        article.image,
        article.featured,
        article.date,
        article.title,
        article.excerpt,
        article.date,
        article.date,
      ],
    });
  }
  console.log(`Blog şeması hazır; ${seedArticles.length} kayıt kontrol edildi.`);
} finally {
  db.close();
}
