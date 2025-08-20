import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Markalar - Dragon Winch ve İş Ortakları | Meda Endüstri",
  description:
    "Dragon Winch çekme vinci tamburu markası ve Meda Endüstri'nin temsil ettiği endüstriyel vinç markaları. Distribütörlük anlaşmaları ve iş ortaklıkları hakkında bilgi.",
  keywords: [
    "dragon winch marka",
    "çekme vinci tamburu markalar",
    "dragon winch distribütör",
    "endüstriyel vinç markaları",
    "vinç sistemi markalar",
    "meda endüstri markalar",
    "dragon winch türkiye",
    "winch brands turkey",
    "industrial winch brands",
    "recovery winch brands",
  ],
  openGraph: {
    title: "Markalar - Dragon Winch ve İş Ortakları",
    description:
      "Dragon Winch çekme vinci tamburu markası ve Meda Endüstri'nin temsil ettiği endüstriyel vinç markaları.",
    type: "website",
    url: "/markalar",
    images: [
      {
        url: "/og-dragon-winch-brands.jpg",
        width: 1200,
        height: 630,
        alt: "Dragon Winch Markalar - Meda Endüstri",
      },
    ],
  },
  alternates: {
    canonical: "/markalar",
  },
};

export default function BrandsLayout({
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
            name: "Dragon Winch ve İş Ortağı Markalar",
            description:
              "Meda Endüstri'nin temsil ettiği Dragon Winch ve diğer endüstriyel vinç markaları",
            url: `${
              process.env.NEXT_PUBLIC_SITE_URL || "https://www.medaendustri.com"
            }/markalar`,
            mainEntity: {
              "@type": "ItemList",
              name: "Temsil Edilen Markalar",
              itemListElement: [
                {
                  "@type": "Brand",
                  name: "Dragon Winch",
                  description:
                    "Çekme vinci tamburu ve endüstriyel vinç sistemleri",
                  logo: `${
                    process.env.NEXT_PUBLIC_SITE_URL ||
                    "https://www.medaendustri.com"
                  }/dragon-winch-logo.png`,
                },
              ],
            },
            publisher: {
              "@type": "Organization",
              name: "Meda Endüstri",
            },
          }),
        }}
      />
      {children}
    </>
  );
}
