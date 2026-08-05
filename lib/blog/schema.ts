import { z } from "zod";
import {
  isAllowedImageUrl,
  sanitizeAndValidateArticleHtml,
} from "./content-security";

const optionalText = (max: number) =>
  z.string().trim().max(max).optional().default("");

export const articleInputSchema = z.object({
  title: z.string().trim().min(10).max(140),
  slug: z
    .string()
    .trim()
    .min(3)
    .max(160)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug biçimi geçersiz."),
  excerpt: z.string().trim().min(40).max(320),
  contentHtml: z.string().min(1).max(200_000),
  author: z.string().trim().min(2).max(100),
  category: z.string().trim().min(2).max(80),
  imageUrl: z.string().trim().refine(isAllowedImageUrl, "Görsel URL’si izinli değil."),
  featured: z.boolean().default(false),
  status: z.enum(["draft", "published"]).default("draft"),
  publishedAt: optionalText(40),
  seoTitle: optionalText(70),
  metaDescription: optionalText(170),
  keywords: z.array(z.string().trim().min(1).max(80)).max(20).default([]),
  canonicalUrl: optionalText(300).refine(
    (value) =>
      !value ||
      (value.startsWith("/") && !value.startsWith("//")) ||
      /^https:\/\/(www\.)?medaendustri\.com\//i.test(value),
    "Canonical yalnızca Meda Endüstri alan adında olabilir.",
  ),
  robotsIndex: z.boolean().default(true),
  robotsFollow: z.boolean().default(true),
  ogTitle: optionalText(100),
  ogDescription: optionalText(240),
  ogImageUrl: optionalText(500).refine(
    (value) => !value || isAllowedImageUrl(value),
    "OG görsel URL’si izinli değil.",
  ),
  twitterTitle: optionalText(100),
  twitterDescription: optionalText(240),
  twitterImageUrl: optionalText(500).refine(
    (value) => !value || isAllowedImageUrl(value),
    "Twitter görsel URL’si izinli değil.",
  ),
});

export type ArticleInput = z.infer<typeof articleInputSchema>;

export function validateArticleInput(input: unknown) {
  const parsed = articleInputSchema.safeParse(input);
  if (!parsed.success) return { success: false as const, error: parsed.error };

  const content = sanitizeAndValidateArticleHtml(parsed.data.contentHtml);
  if (content.errors.length > 0) {
    return {
      success: false as const,
      error: new z.ZodError(
        content.errors.map((message) => ({
          code: "custom",
          path: ["contentHtml"],
          message,
        })),
      ),
    };
  }

  return {
    success: true as const,
    data: {
      ...parsed.data,
      contentHtml: content.html,
      contentText: content.text,
    },
    warnings: content.warnings,
  };
}
