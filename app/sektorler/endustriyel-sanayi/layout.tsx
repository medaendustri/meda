import type { Metadata } from "next";
import { buildFaqSchema } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Endüstriyel Sanayi Vinç Çözümleri | Meda Endüstri",
  description:
    "Endüstriyel sanayi için Dragon Winch vinç sistemleri. Fabrika, üretim hattı ve ağır sanayi uygulamalarına özel çekme vinci çözümleri.",
  keywords: [
    "endüstriyel vinç",
    "fabrika vinç",
    "sanayi çekme vinci",
    "dragon winch endüstriyel",
  ],
  openGraph: {
    title: "Endüstriyel Sanayi Vinç Çözümleri | Meda Endüstri",
    description:
      "Endüstriyel sanayi için Dragon Winch vinç sistemleri ve çekme vinci çözümleri.",
    type: "website",
    url: "/sektorler/endustriyel-sanayi",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "/sektorler/endustriyel-sanayi",
  },
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.medaendustri.com";

export default function IndustrialLayout({
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
            name: "Endüstriyel Sanayi Vinç Çözümleri",
            description:
              "Endüstriyel sanayi için Dragon Winch çekme vinci ve vinç sistemleri",
            url: `${siteUrl}/sektorler/endustriyel-sanayi`,
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
