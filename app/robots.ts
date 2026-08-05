import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.medaendustri.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/private/",
          "/temp/",
          "/cache/",
          "/drafts/",
          "/test/",
          "/tesekkur",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
