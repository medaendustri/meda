import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Meda Endüstri - Dragon Winch Türkiye Distribütörü",
    short_name: "Meda Endüstri",
    description:
      "Dragon Winch çekme vinci tamburu, kurtarma vinçleri ve endüstriyel vinç sistemleri Türkiye distribütörü",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#d84948",
    orientation: "portrait-primary",
    scope: "/",
    lang: "tr",
    categories: ["business", "productivity", "utilities"],
    icons: [
      {
        src: "/favicon/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/favicon/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Ürünler",
        short_name: "Ürünler",
        description: "Dragon Winch ürünlerini inceleyin",
        url: "/urunler",
      },
      {
        name: "İletişim",
        short_name: "İletişim",
        description: "Bizimle iletişime geçin",
        url: "/iletisim",
      },
      {
        name: "Kurumsal",
        short_name: "Kurumsal",
        description: "Hakkımızda bilgi alın",
        url: "/kurumsal",
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
  };
}
