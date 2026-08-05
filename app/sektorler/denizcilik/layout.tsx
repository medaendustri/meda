import type { Metadata } from "next";
import { buildFaqSchema } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Denizcilik Vinçleri - Dragon Winch Marine Series | Meda Endüstri",
  description:
    "Dragon Winch denizcilik vinçleri, gemi çekme vinci tamburu ve marine vinç sistemleri. Yat, tekne ve gemi endüstrisi için paslanmaz çelik Dragon Winch çözümleri.",
  keywords: [
    "dragon winch denizcilik",
    "gemi çekme vinci tamburu",
    "marine vinç sistemi",
    "yat vinç sistemi",
    "tekne vinçleri",
    "deniz vinç ekipmanları",
    "dragon winch marine",
  ],
  openGraph: {
    title: "Denizcilik Vinçleri - Dragon Winch Marine Series",
    description:
      "Dragon Winch denizcilik vinçleri ve marine vinç sistemleri. Gemi, yat ve tekne endüstrisi için çözümler.",
    type: "website",
    url: "/sektorler/denizcilik",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "/sektorler/denizcilik",
  },
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.medaendustri.com";

export default function MarineLayout({
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
            name: "Dragon Winch Denizcilik Vinçleri",
            description:
              "Denizcilik sektörü için Dragon Winch çekme vinci tamburu ve marine vinç sistemleri",
            url: `${siteUrl}/sektorler/denizcilik`,
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
