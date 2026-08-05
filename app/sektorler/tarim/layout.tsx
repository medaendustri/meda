import type { Metadata } from "next";
import { buildFaqSchema } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Tarım Sektörü Vinç Çözümleri | Meda Endüstri",
  description:
    "Tarım sektörü için özel tasarlanmış vinç sistemleri. Traktör, hasat makinesi ve tarım ekipmanları için dayanıklı Dragon Winch çözümleri.",
  keywords: [
    "tarım vinç",
    "traktör vinç",
    "hasat makinesi vinç",
    "dragon winch tarım",
  ],
  openGraph: {
    title: "Tarım Sektörü Vinç Çözümleri | Meda Endüstri",
    description:
      "Tarım sektörü için özel tasarlanmış Dragon Winch vinç sistemleri.",
    type: "website",
    url: "/sektorler/tarim",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "/sektorler/tarim",
  },
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.medaendustri.com";

export default function AgricultureLayout({
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
            "@type": "WebPage",
            name: "Tarım Sektörü Vinç Çözümleri",
            description:
              "Tarım sektörü için Dragon Winch çekme vinci ve vinç sistemleri",
            url: `${siteUrl}/sektorler/tarim`,
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
