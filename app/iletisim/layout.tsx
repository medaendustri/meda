import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim - Dragon Winch Türkiye Distribütörü | Meda Endüstri",
  description:
    "Dragon Winch çekme vinci tamburu ihtiyaçlarınız için bizimle iletişime geçin. 7/24 teknik destek, ücretsiz danışmanlık ve hızlı teklif hizmeti. İstanbul merkez ofis bilgileri.",
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
      "Dragon Winch çekme vinci tamburu ihtiyaçlarınız için bizimle iletişime geçin. 7/24 teknik destek ve ücretsiz danışmanlık.",
    type: "website",
    url: "/iletisim",
    images: [
      {
        url: "/og-dragon-winch-contact.jpg",
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
                streetAddress: "Organize Sanayi Bölgesi, 1. Cadde No: 123",
                addressLocality: "İstanbul",
                addressCountry: "TR",
                postalCode: "34000",
              },
              telephone: "+90 212 555 0123",
              email: "info@medaendustri.com",
              openingHours: ["Mo-Fr 08:00-18:00", "Sa 09:00-13:00"],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+90 212 555 0125",
                  contactType: "sales",
                  availableLanguage: "Turkish",
                  areaServed: "TR",
                },
                {
                  "@type": "ContactPoint",
                  telephone: "+90 212 555 0126",
                  contactType: "technical support",
                  availableLanguage: ["Turkish", "English"],
                  hoursAvailable: "24/7",
                },
              ],
            },
          }),
        }}
      />
      {children}
    </>
  );
}
