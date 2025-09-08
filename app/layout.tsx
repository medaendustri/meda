import type React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";

// Corporate serif font for headings
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

// Professional sans-serif font for body text
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["300", "400", "600", "700"],
});

// Fallback font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default:
      "Meda Endüstri - Dragon Winch Türkiye Distribütörü | Çekme Vinci Tamburu",
    template: "%s | Meda Endüstri - Dragon Winch Türkiye",
  },
  description:
    "Dragon Winch çekme vinci tamburu, kurtarma vinçleri ve endüstriyel vinç sistemleri Türkiye distribütörü. 15+ yıllık deneyim, profesyonel hizmet ve teknik destek.",
  keywords: [
    "dragon winch",
    "çekme vinci tamburu",
    "kurtarma vinci",
    "endüstriyel vinç",
    "denizcilik vinçleri",
    "liman ekipmanları",
    "vinç sistemi",
    "meda endüstri",
    "türkiye distribütör",
    "winch drum",
    "recovery winch",
    "marine winch",
  ],
  authors: [{ name: "Meda Endüstri" }],
  creator: "Meda Endüstri",
  publisher: "Meda Endüstri",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.medaendustri.com"
  ),
  alternates: {
    canonical: "/",
    languages: {
      "tr-TR": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/",
    title: "Meda Endüstri - Dragon Winch Türkiye Distribütörü",
    description:
      "Dragon Winch çekme vinci tamburu, kurtarma vinçleri ve endüstriyel vinç sistemleri Türkiye distribütörü. 15+ yıllık deneyim, profesyonel hizmet ve teknik destek.",
    siteName: "Meda Endüstri",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Meda Endüstri - Dragon Winch Türkiye Distribütörü",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meda Endüstri - Dragon Winch Türkiye Distribütörü",
    description:
      "Dragon Winch çekme vinci tamburu, kurtarma vinçleri ve endüstriyel vinç sistemleri Türkiye distribütörü.",
    images: ["/og-image.jpg"],
    creator: "@medaendustri",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${playfairDisplay.variable} ${sourceSans.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Meda Endüstri",
              alternateName: "Meda Endüstri",
              url:
                process.env.NEXT_PUBLIC_SITE_URL ||
                "https://www.medaendustri.com",
              logo: `${
                process.env.NEXT_PUBLIC_SITE_URL ||
                "https://www.medaendustri.com"
              }/logo.png`,
              description:
                "Dragon Winch çekme vinci tamburu, kurtarma vinçleri ve endüstriyel vinç sistemleri Türkiye distribütörü",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Organize Sanayi Bölgesi",
                addressLocality: "İstanbul",
                addressCountry: "TR",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+90-212-555-0123",
                contactType: "customer service",
                availableLanguage: ["Turkish", "English"],
                areaServed: ["TR", "AZ", "GE", "BG", "GR"],
                serviceType: "Dragon Winch Sales and Service",
              },
              sameAs: [
                "https://www.linkedin.com/company/medaendustri",
                "https://www.facebook.com/medaendustri",
                "https://www.instagram.com/medaendustri",
              ],
              foundingDate: "2009",
              numberOfEmployees: "10-50",
              industry: "Industrial Equipment",
              keywords:
                "dragon winch, çekme vinci tamburu, kurtarma vinci, endüstriyel vinç, denizcilik vinçleri",
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Dragon Winch Ürün Kataloğu",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Product",
                      name: "Dragon Winch Çekme Vinci Tamburu",
                      category: "Endüstriyel Vinç Sistemi",
                    },
                  },
                ],
              },
              makesOffer: {
                "@type": "Offer",
                name: "Dragon Winch Distribütörlük Hizmetleri",
                description:
                  "Dragon Winch ürünleri satış, servis ve teknik destek hizmetleri",
                seller: {
                  "@type": "Organization",
                  name: "Meda Endüstri",
                },
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-gray-900 font-source-sans">
        <ScrollToTop />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
