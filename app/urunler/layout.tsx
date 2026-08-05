import type { Metadata } from "next";
import { buildFaqSchema } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Dragon Winch Ürünleri - Çekme Vinci Tamburu Kataloğu | Meda Endüstri",
  description:
    "Dragon Winch çekme vinci tamburu modelleri, kurtarma vinçleri ve endüstriyel vinç sistemleri. Denizcilik, endüstriyel ve liman uygulamaları için Dragon Winch ürün kataloğu.",
  keywords: [
    "dragon winch ürünleri",
    "çekme vinci tamburu modelleri",
    "kurtarma vinci kataloğu",
    "endüstriyel vinç sistemleri",
    "denizcilik vinçleri",
    "liman vinç ekipmanları",
    "dragon winch katalog",
  ],
  openGraph: {
    title: "Dragon Winch Ürünleri - Çekme Vinci Tamburu Kataloğu",
    description:
      "Dragon Winch çekme vinci tamburu modelleri ve endüstriyel vinç sistemleri kataloğu.",
    type: "website",
    url: "/urunler",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Dragon Winch Ürün Kataloğu - Çekme Vinci Tamburu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dragon Winch Ürünleri - Çekme Vinci Tamburu Kataloğu",
    description:
      "Dragon Winch çekme vinci tamburu modelleri ve endüstriyel vinç sistemleri kataloğu.",
    images: ["/twitter-image"],
  },
  alternates: {
    canonical: "/urunler",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProductGroup",
            name: "Dragon Winch Ürün Kataloğu",
            description:
              "Dragon Winch çekme vinci tamburu, kurtarma vinçleri ve endüstriyel vinç sistemleri",
            brand: {
              "@type": "Brand",
              name: "Dragon Winch",
            },
            url: `${
              process.env.NEXT_PUBLIC_SITE_URL || "https://www.medaendustri.com"
            }/urunler`,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqSchema()),
        }}
      />
      {children}
    </>
  );
}
