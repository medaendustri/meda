import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Haberler - Dragon Winch Türkiye | Meda Endüstri",
  description:
    "Dragon Winch ürünleri, çekme vinci tamburu sektörü haberleri ve Meda Endüstri şirket gelişmeleri. Vinç teknolojisi, ürün lansmanları ve sektörel güncellemeler.",
  keywords: [
    "dragon winch haberler",
    "çekme vinci tamburu haberleri",
    "vinç sektörü haberler",
    "dragon winch yenilikler",
    "meda endüstri haberler",
    "endüstriyel vinç haberleri",
    "dragon winch türkiye haberler",
  ],
  openGraph: {
    title: "Haberler - Dragon Winch Türkiye | Meda Endüstri",
    description:
      "Dragon Winch ürünleri ve çekme vinci tamburu sektöründen son haberler.",
    type: "website",
    url: "/haberler",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Dragon Winch Haberler - Meda Endüstri",
      },
    ],
  },
  alternates: {
    canonical: "/haberler",
  },
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.medaendustri.com";

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
            name: "Meda Endüstri Haberler",
            description:
              "Dragon Winch ürünleri ve çekme vinci tamburu sektöründen haberler",
            url: `${siteUrl}/haberler`,
            publisher: {
              "@type": "Organization",
              name: "Meda Endüstri",
              logo: {
                "@type": "ImageObject",
                url: `${siteUrl}/meda-logo.webp`,
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${siteUrl}/haberler`,
            },
            inLanguage: "tr-TR",
          }),
        }}
      />
      {children}
    </>
  );
}
