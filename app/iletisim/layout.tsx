import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim - Dragon Winch Türkiye Distribütörü | Meda Endüstri",
  description:
    "Dragon Winch çekme vinci tamburu ihtiyaçlarınız için bizimle iletişime geçin. Teknik destek, ücretsiz danışmanlık ve hızlı teklif hizmeti. Ankara merkez ofis bilgileri.",
  keywords: [
    "dragon winch iletişim",
    "çekme vinci tamburu teklif",
    "dragon winch türkiye iletişim",
    "endüstriyel vinç teklif",
    "vinç sistemi danışmanlık",
    "dragon winch distribütör iletişim",
    "meda endüstri iletişim",
    "winch contact turkey",
    "industrial winch quote",
    "dragon winch support",
  ],
  openGraph: {
    title: "İletişim - Dragon Winch Türkiye Distribütörü",
    description:
      "Dragon Winch çekme vinci tamburu ihtiyaçlarınız için bizimle iletişime geçin. Teknik destek ve ücretsiz danışmanlık.",
    type: "website",
    url: "/iletisim",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Dragon Winch İletişim - Meda Endüstri",
      },
    ],
  },
  alternates: {
    canonical: "/iletisim",
  },
};

export default function ContactLayout({
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
            "@type": "ContactPage",
            name: "Dragon Winch İletişim - Meda Endüstri",
            description:
              "Dragon Winch çekme vinci tamburu ihtiyaçlarınız için iletişim bilgileri",
            url: `${
              process.env.NEXT_PUBLIC_SITE_URL || "https://www.medaendustri.com"
            }/iletisim`,
            mainEntity: {
              "@type": "Organization",
              name: "Meda Endüstri",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "İvedik OSB Matbaacılar Sitesi 1514. Sokak No:22",
                addressLocality: "Yenimahalle",
                addressRegion: "Ankara",
                addressCountry: "TR",
                postalCode: "06378",
              },
              telephone: "+90 538 734 4389",
              email: "info@medaendustri.com.tr",
              openingHours: ["Mo-Fr 09:00-18:00", "Sa 09:00-14:00"],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+90 538 734 4389",
                contactType: "customer service",
                availableLanguage: "Turkish",
                areaServed: "TR",
              },
            },
          }),
        }}
      />
      {children}
    </>
  );
}
