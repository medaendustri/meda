import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Haberler - Dragon Winch Türkiye | Meda Savunma",
  description:
    "Dragon Winch ürünleri, çekme vinci tamburu sektörü haberleri ve Meda Savunma şirket gelişmeleri. Vinç teknolojisi, ürün lansmanları ve sektörel güncellemeler.",
  keywords: [
    "dragon winch haberler",
    "çekme vinci tamburu haberleri",
    "vinç sektörü haberler",
    "dragon winch yenilikler",
    "meda savunma haberler",
    "endüstriyel vinç haberleri",
    "dragon winch türkiye haberler",
    "winch industry news",
    "industrial winch news",
    "dragon winch updates",
  ],
  openGraph: {
    title: "Haberler - Dragon Winch Türkiye",
    description:
      "Dragon Winch ürünleri ve çekme vinci tamburu sektöründen son haberler.",
    type: "website",
    url: "/haberler",
    images: [
      {
        url: "/og-dragon-winch-news.jpg",
        width: 1200,
        height: 630,
        alt: "Dragon Winch Haberler - Meda Savunma",
      },
    ],
  },
  alternates: {
    canonical: "/haberler",
  },
};

export default function NewsLayout({
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
            "@type": "Blog",
            name: "Dragon Winch Türkiye Haberler",
            description:
              "Dragon Winch ürünleri ve çekme vinci tamburu sektöründen haberler",
            url: `${
              process.env.NEXT_PUBLIC_SITE_URL || "https://medasavunma.com.tr"
            }/haberler`,
            publisher: {
              "@type": "Organization",
              name: "Meda Savunma Teknolojileri",
              logo: {
                "@type": "ImageObject",
                url: `${
                  process.env.NEXT_PUBLIC_SITE_URL ||
                  "https://medasavunma.com.tr"
                }/logo.png`,
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${
                process.env.NEXT_PUBLIC_SITE_URL || "https://medasavunma.com.tr"
              }/haberler`,
            },
            inLanguage: "tr-TR",
          }),
        }}
      />
      {children}
    </>
  );
}
