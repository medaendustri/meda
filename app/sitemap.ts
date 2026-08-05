import type { MetadataRoute } from "next";
import { getAllProductSlugs } from "@/lib/db";
import { getAllNews } from "@/lib/news";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.medaendustri.com";

  // Sabit tarihler yalnızca ilgili içerik gerçekten güncellendiğinde değiştirilir.
  const contentUpdatedAt = new Date("2026-08-05T00:00:00.000Z");
  const legalUpdatedAt = new Date("2026-07-01T00:00:00.000Z");
  const latestNewsDate = getAllNews()[0]?.date;

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: contentUpdatedAt,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/kurumsal`,
      lastModified: contentUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/urunler`,
      lastModified: contentUpdatedAt,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/haberler`,
      lastModified: latestNewsDate
        ? new Date(latestNewsDate)
        : contentUpdatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/referanslar`,
      lastModified: contentUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: contentUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/katalog`,
      lastModified: contentUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/gizlilik`,
      lastModified: legalUpdatedAt,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/kullanim`,
      lastModified: legalUpdatedAt,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/cerez`,
      lastModified: legalUpdatedAt,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/sektorler`,
      lastModified: contentUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...[
      "denizcilik",
      "endustriyel-sanayi",
      "savunma-sanayi",
      "tarim",
    ].map((slug) => ({
      url: `${baseUrl}/sektorler/${slug}`,
      lastModified: contentUpdatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  const newsPages: MetadataRoute.Sitemap = getAllNews().map((article) => ({
    url: `${baseUrl}/haberler/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  let productPages: MetadataRoute.Sitemap = [];
  try {
    const products = await getAllProductSlugs();
    productPages = products.map((product) => ({
      url: `${baseUrl}/urunler/${product.slug}`,
      lastModified: product.created_at
        ? new Date(product.created_at)
        : contentUpdatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Error generating product pages for sitemap:", error);
  }

  return [...staticPages, ...newsPages, ...productPages];
}
