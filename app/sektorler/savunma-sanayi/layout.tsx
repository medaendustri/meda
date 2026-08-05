import type { Metadata } from "next";
import { buildFaqSchema } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Savunma Sanayi Vinç Çözümleri | Meda Endüstri",
  description:
    "Savunma sanayi için güvenilir Dragon Winch vinç sistemleri. Askeri ve güvenlik uygulamalarına özel çekme vinci ve kurtarma çözümleri.",
  keywords: [
    "savunma sanayi vinç",
    "askeri vinç",
    "dragon winch savunma",
    "kurtarma vinci savunma",
  ],
  openGraph: {
    title: "Savunma Sanayi Vinç Çözümleri | Meda Endüstri",
    description:
      "Savunma sanayi için güvenilir Dragon Winch vinç sistemleri ve kurtarma çözümleri.",
    type: "website",
    url: "/sektorler/savunma-sanayi",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "/sektorler/savunma-sanayi",
  },
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.medaendustri.com";

export default function DefenseLayout({
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
            name: "Savunma Sanayi Vinç Çözümleri",
            description:
              "Savunma sanayi için Dragon Winch çekme vinci ve kurtarma sistemleri",
            url: `${siteUrl}/sektorler/savunma-sanayi`,
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
