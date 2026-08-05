import "server-only";
import { db } from "@/lib/db";
import type { ArticleInput } from "./schema";

export type ArticleStatus = "draft" | "published";

export interface BlogArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  contentText: string;
  author: string;
  category: string;
  imageUrl: string;
  featured: boolean;
  status: ArticleStatus;
  publishedAt: string | null;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

function text(value: unknown): string {
  return value == null ? "" : String(value);
}

function parseArticle(row: Record<string, unknown>): BlogArticle {
  let keywords: string[] = [];
  try {
    const parsed = JSON.parse(text(row.keywords_json));
    if (Array.isArray(parsed)) keywords = parsed.map(String);
  } catch {
    keywords = [];
  }
  return {
    id: Number(row.id),
    slug: text(row.slug),
    title: text(row.title),
    excerpt: text(row.excerpt),
    contentHtml: text(row.content_html),
    contentText: text(row.content_text),
    author: text(row.author),
    category: text(row.category),
    imageUrl: text(row.image_url),
    featured: Boolean(row.featured),
    status: text(row.status) as ArticleStatus,
    publishedAt: row.published_at ? text(row.published_at) : null,
    seoTitle: text(row.seo_title),
    metaDescription: text(row.meta_description),
    keywords,
    canonicalUrl: text(row.canonical_url),
    robotsIndex: Boolean(row.robots_index),
    robotsFollow: Boolean(row.robots_follow),
    ogTitle: text(row.og_title),
    ogDescription: text(row.og_description),
    ogImageUrl: text(row.og_image_url),
    twitterTitle: text(row.twitter_title),
    twitterDescription: text(row.twitter_description),
    twitterImageUrl: text(row.twitter_image_url),
    createdAt: text(row.created_at),
    updatedAt: text(row.updated_at),
  };
}

const ARTICLE_COLUMNS = `
  id, slug, title, excerpt, content_html, content_text, author, category,
  image_url, featured, status, published_at, seo_title, meta_description,
  keywords_json, canonical_url, robots_index, robots_follow, og_title,
  og_description, og_image_url, twitter_title, twitter_description,
  twitter_image_url, created_at, updated_at
`;

export async function getPublishedArticles(): Promise<BlogArticle[]> {
  try {
    const result = await db.execute(`
      SELECT ${ARTICLE_COLUMNS} FROM articles
      WHERE status = 'published' AND deleted_at IS NULL
        AND published_at IS NOT NULL AND published_at <= datetime('now')
      ORDER BY featured DESC, published_at DESC
    `);
    return result.rows.map((row) =>
      parseArticle(row as unknown as Record<string, unknown>),
    );
  } catch {
    return [];
  }
}

export async function getPublishedArticleBySlug(
  slug: string,
): Promise<BlogArticle | null> {
  try {
    const result = await db.execute({
      sql: `SELECT ${ARTICLE_COLUMNS} FROM articles
        WHERE slug = ? AND status = 'published' AND deleted_at IS NULL
          AND published_at IS NOT NULL AND published_at <= datetime('now')
        LIMIT 1`,
      args: [slug],
    });
    return result.rows[0]
      ? parseArticle(result.rows[0] as unknown as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

export async function resolveOldArticleSlug(
  slug: string,
): Promise<string | null> {
  try {
    const result = await db.execute({
      sql: `SELECT a.slug FROM article_slug_history h
        JOIN articles a ON a.id = h.article_id
        WHERE h.old_slug = ? AND a.status = 'published' AND a.deleted_at IS NULL
        LIMIT 1`,
      args: [slug],
    });
    return result.rows[0]?.slug ? String(result.rows[0].slug) : null;
  } catch {
    return null;
  }
}

export async function getAdminArticles(): Promise<BlogArticle[]> {
  try {
    const result = await db.execute(`
      SELECT ${ARTICLE_COLUMNS} FROM articles
      WHERE deleted_at IS NULL
      ORDER BY updated_at DESC
    `);
    return result.rows.map((row) =>
      parseArticle(row as unknown as Record<string, unknown>),
    );
  } catch {
    return [];
  }
}

export async function getAdminArticleById(
  id: number,
): Promise<BlogArticle | null> {
  const result = await db.execute({
    sql: `SELECT ${ARTICLE_COLUMNS} FROM articles
      WHERE id = ? AND deleted_at IS NULL LIMIT 1`,
    args: [id],
  });
  return result.rows[0]
    ? parseArticle(result.rows[0] as unknown as Record<string, unknown>)
    : null;
}

function articleValues(input: ArticleInput & { contentText: string }) {
  const publishedAt =
    input.status === "published"
      ? input.publishedAt || new Date().toISOString()
      : input.publishedAt || null;
  return [
    input.slug,
    input.title,
    input.excerpt,
    input.contentHtml,
    input.contentText,
    input.author,
    input.category,
    input.imageUrl,
    input.featured ? 1 : 0,
    input.status,
    publishedAt,
    input.seoTitle || null,
    input.metaDescription || null,
    JSON.stringify(input.keywords),
    input.canonicalUrl || null,
    input.robotsIndex ? 1 : 0,
    input.robotsFollow ? 1 : 0,
    input.ogTitle || null,
    input.ogDescription || null,
    input.ogImageUrl || null,
    input.twitterTitle || null,
    input.twitterDescription || null,
    input.twitterImageUrl || null,
  ] as Array<string | number | null>;
}

export async function createArticle(
  input: ArticleInput & { contentText: string },
): Promise<number> {
  const queries: Array<{ sql: string; args: Array<string | number | null> }> =
    [];
  if (input.featured) {
    queries.push({
      sql: "UPDATE articles SET featured = 0 WHERE deleted_at IS NULL",
      args: [],
    });
  }
  queries.push({
    sql: `INSERT INTO articles (
      slug, title, excerpt, content_html, content_text, author, category,
      image_url, featured, status, published_at, seo_title, meta_description,
      keywords_json, canonical_url, robots_index, robots_follow, og_title,
      og_description, og_image_url, twitter_title, twitter_description,
      twitter_image_url, updated_at
    ) VALUES (${Array(23).fill("?").join(", ")}, datetime('now'))`,
    args: articleValues(input),
  });
  const results = await db.batch(queries as never, "write");
  return Number(results.at(-1)?.lastInsertRowid);
}

export async function updateArticle(
  id: number,
  input: ArticleInput & { contentText: string },
): Promise<void> {
  const current = await getAdminArticleById(id);
  if (!current) throw new Error("ARTICLE_NOT_FOUND");

  const queries: Array<{ sql: string; args: Array<string | number | null> }> = [
    {
      sql: `INSERT INTO article_revisions (article_id, snapshot_json)
        VALUES (?, ?)`,
      args: [id, JSON.stringify(current)],
    },
  ];
  if (input.featured) {
    queries.push({
      sql: "UPDATE articles SET featured = 0 WHERE id <> ? AND deleted_at IS NULL",
      args: [id],
    });
  }
  if (current.slug !== input.slug) {
    queries.push({
      sql: `INSERT OR REPLACE INTO article_slug_history (old_slug, article_id)
        VALUES (?, ?)`,
      args: [current.slug, id],
    });
  }
  queries.push({
    sql: `UPDATE articles SET
      slug = ?, title = ?, excerpt = ?, content_html = ?, content_text = ?,
      author = ?, category = ?, image_url = ?, featured = ?, status = ?,
      published_at = ?, seo_title = ?, meta_description = ?, keywords_json = ?,
      canonical_url = ?, robots_index = ?, robots_follow = ?, og_title = ?,
      og_description = ?, og_image_url = ?, twitter_title = ?,
      twitter_description = ?, twitter_image_url = ?, updated_at = datetime('now')
      WHERE id = ? AND deleted_at IS NULL`,
    args: [...articleValues(input), id],
  });
  await db.batch(queries as never, "write");
}

export async function softDeleteArticle(id: number): Promise<void> {
  await db.execute({
    sql: `UPDATE articles
      SET deleted_at = datetime('now'), featured = 0, updated_at = datetime('now')
      WHERE id = ?`,
    args: [id],
  });
}
