import type { Metadata } from "next";

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
    "ship winch systems",
    "yacht winch systems",
    "marine recovery winch",
  ],
  openGraph: {
    title: "Denizcilik Vinçleri - Dragon Winch Marine Series",
    description:
      "Dragon Winch denizcilik vinçleri ve marine vinç sistemleri. Gemi, yat ve tekne endüstrisi için çözümler.",
    type: "website",
    url: "/sektorler/denizcilik",
  },
  alternates: {
    canonical: "/sektorler/denizcilik",
  },
};

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
            url: `${
              process.env.NEXT_PUBLIC_SITE_URL || "https://www.medaendustri.com"
            }/sektorler/denizcilik`,
            about: {
              "@type": "Thing",
              name: "Denizcilik Vinç Sistemleri",
            },
            audience: {
              "@type": "Audience",
              name: "Denizcilik Sektörü",
            },
          }),
        }}
      />
      {children}
    </>
  );
}
