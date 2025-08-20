import type { Metadata } from "next";

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
    "winch drum models",
    "recovery winch catalog",
    "marine winch products",
    "industrial winch catalogue",
    "truck winch series",
    "atv winch systems",
  ],
  openGraph: {
    title: "Dragon Winch Ürünleri - Çekme Vinci Tamburu Kataloğu",
    description:
      "Dragon Winch çekme vinci tamburu modelleri ve endüstriyel vinç sistemleri kataloğu. Türkiye'nin en kapsamlı Dragon Winch ürün yelpazesi.",
    type: "website",
    url: "/urunler",
    images: [
      {
        url: "/og-dragon-winch-products.jpg",
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
    images: ["/og-dragon-winch-products.jpg"],
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
            manufacturer: {
              "@type": "Organization",
              name: "Dragon Winch",
            },
            category: "Çekme Vinci Tamburu",
            url: `${
              process.env.NEXT_PUBLIC_SITE_URL || "https://www.medaendustri.com"
            }/urunler`,
            hasVariant: [
              {
                "@type": "Product",
                name: "Dragon Winch Denizcilik Vinçleri",
                category: "Marine Winch",
              },
              {
                "@type": "Product",
                name: "Dragon Winch Endüstriyel Vinçler",
                category: "Industrial Winch",
              },
              {
                "@type": "Product",
                name: "Dragon Winch Truck Series",
                category: "Truck Winch",
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
