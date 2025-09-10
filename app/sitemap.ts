import type { MetadataRoute } from "next";

interface Product {
  id: number;
  date_modified?: string;
  date_created: string;
}

async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_SITE_URL || "https://www.medaendustri.com"
      }/api/products?per_page=100&exclude_accessories=true`,
      {
        cache: "no-store",
        next: { revalidate: 3600 }, // 1 hour cache
      }
    );
    if (!response.ok) return [];
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error("Error fetching products for sitemap:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.medaendustri.com";

  // Ana sayfalar
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/kurumsal`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/urunler`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sertifikalar`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/markalar`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/haberler`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    // Sektör sayfaları
    {
      url: `${baseUrl}/sektorler/denizcilik`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sektorler/endustriyel-sanayi`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sektorler/savunma-sanayi`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sektorler/tarim`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  // Ürün sayfaları
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const products = await getProducts();
    productPages = products.map((product: Product) => ({
      url: `${baseUrl}/urunler/${product.id}`,
      lastModified: new Date(product.date_modified || product.date_created),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Error generating product pages for sitemap:", error);
  }

  return [...staticPages, ...productPages];
}
