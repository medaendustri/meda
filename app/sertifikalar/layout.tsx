import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sertifikalar - Dragon Winch Kalite Belgeleri | Meda Endüstri",
  description:
    "Dragon Winch çekme vinci tamburu kalite sertifikaları, CE belgeleri ve uluslararası standart belgeleri. Meda Savunma distribütörlük sertifikaları ve kalite yönetim belgeleri.",
  keywords: [
    "dragon winch sertifikalar",
    "çekme vinci tamburu sertifikalar",
    "dragon winch ce belgesi",
    "vinç sistemi kalite belgeleri",
    "dragon winch iso sertifika",
    "meda endüstri sertifikalar",
    "endüstriyel vinç sertifikaları",
    "winch certificates",
    "industrial winch standards",
    "dragon winch quality certificates",
  ],
  openGraph: {
    title: "Sertifikalar - Dragon Winch Kalite Belgeleri",
    description:
      "Dragon Winch çekme vinci tamburu kalite sertifikaları ve uluslararası standart belgeleri.",
    type: "website",
    url: "/sertifikalar",
    images: [
      {
        url: "/og-dragon-winch-certificates.jpg",
        width: 1200,
        height: 630,
        alt: "Dragon Winch Sertifikalar - Meda Endüstri",
      },
    ],
  },
  alternates: {
    canonical: "/sertifikalar",
  },
};

export default function CertificatesLayout({
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
            name: "Dragon Winch Sertifikalar ve Kalite Belgeleri",
            description:
              "Dragon Winch çekme vinci tamburu sertifikaları ve kalite yönetim belgeleri",
            url: `${
              process.env.NEXT_PUBLIC_SITE_URL || "https://www.medaendustri.com"
            }/sertifikalar`,
            about: {
              "@type": "Thing",
              name: "Dragon Winch Kalite Standartları",
            },
            publisher: {
              "@type": "Organization",
              name: "Meda Endüstri",
            },
            mainEntity: {
              "@type": "ItemList",
              name: "Dragon Winch Sertifika Listesi",
              description:
                "Dragon Winch ürünleri için geçerli kalite sertifikaları",
            },
          }),
        }}
      />
      {children}
    </>
  );
}
