import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Analytics } from "@/components/analytics";

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
    "hydraulic winch",
    "electric winch",
    "capstan winch",
    "anchor winch",
    "mooring winch",
    "tugger winch",
    "winch rope",
    "winch cable",
  ],
  authors: [{ name: "Meda Endüstri", url: "https://www.medaendustri.com" }],
  creator: "Meda Endüstri",
  publisher: "Meda Endüstri",
  category: "Industrial Equipment",
  classification: "Business",
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
      "en-US": "/en",
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
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Meda Endüstri - Dragon Winch Türkiye Distribütörü",
        type: "image/png",
      },
    ],
    countryName: "Turkey",
    emails: ["info@medaendustri.com"],
    phoneNumbers: ["+90 212 555 0123"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@medaendustri",
    creator: "@medaendustri",
    title: "Meda Endüstri - Dragon Winch Türkiye Distribütörü",
    description:
      "Dragon Winch çekme vinci tamburu, kurtarma vinçleri ve endüstriyel vinç sistemleri Türkiye distribütörü.",
    images: [
      {
        url: "/twitter-image",
        alt: "Meda Endüstri - Dragon Winch Türkiye Distribütörü",
        width: 1200,
        height: 600,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
    },
  },
  applicationName: "Meda Endüstri",
  referrer: "origin-when-cross-origin",
  generator: "Next.js",
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: [
      { url: "/icon?<generated>", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-icon?<generated>", type: "image/png", sizes: "180x180" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#d84948" },
    { media: "(prefers-color-scheme: dark)", color: "#c73e3d" },
  ],
  colorScheme: "light",
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
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Favicon Links - Yeni favicon dosyaları */}
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#d84948" />

        {/* Microsoft Tiles */}
        <meta name="msapplication-TileColor" content="#d84948" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#d84948" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Meda Endüstri" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Meda Endüstri" />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${
                process.env.NEXT_PUBLIC_SITE_URL ||
                "https://www.medaendustri.com"
              }/#organization`,
              name: "Meda Endüstri",
              alternateName: ["Meda Endüstri Ltd. Şti.", "MEDA"],
              url:
                process.env.NEXT_PUBLIC_SITE_URL ||
                "https://www.medaendustri.com",
              logo: {
                "@type": "ImageObject",
                url: `${
                  process.env.NEXT_PUBLIC_SITE_URL ||
                  "https://www.medaendustri.com"
                }/meda-logo.webp`,
                width: "400",
                height: "200",
              },
              image: `${
                process.env.NEXT_PUBLIC_SITE_URL ||
                "https://www.medaendustri.com"
              }/meda-logo.webp`,
              description:
                "Dragon Winch çekme vinci tamburu, kurtarma vinçleri ve endüstriyel vinç sistemleri Türkiye distribütörü",
              slogan: "15+ Yıllık Deneyim, Profesyonel Hizmet",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Organize Sanayi Bölgesi",
                addressLocality: "İstanbul",
                addressRegion: "İstanbul",
                postalCode: "34000",
                addressCountry: "TR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "41.0082",
                longitude: "28.9784",
              },
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+90-212-555-0123",
                  contactType: "customer service",
                  availableLanguage: ["Turkish", "English"],
                  areaServed: ["TR", "AZ", "GE", "BG", "GR", "CY"],
                  serviceType: "Dragon Winch Sales and Service",
                  hoursAvailable: {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                    ],
                    opens: "08:00",
                    closes: "18:00",
                  },
                },
                {
                  "@type": "ContactPoint",
                  email: "info@medaendustri.com",
                  contactType: "customer service",
                  availableLanguage: ["Turkish", "English"],
                },
              ],
              sameAs: [
                "https://www.linkedin.com/company/medaendustri",
                "https://www.facebook.com/medaendustri",
                "https://www.instagram.com/medaendustri",
                "https://www.youtube.com/channel/UCxxxxxxx",
              ],
              foundingDate: "2009",
              numberOfEmployees: {
                "@type": "QuantitativeValue",
                minValue: 10,
                maxValue: 50,
              },
              industry: "Industrial Equipment Manufacturing",
              naics: "333924",
              keywords:
                "dragon winch, çekme vinci tamburu, kurtarma vinci, endüstriyel vinç, denizcilik vinçleri",
              serviceArea: {
                "@type": "Country",
                name: "Turkey",
              },
              areaServed: [
                {
                  "@type": "Country",
                  name: "Turkey",
                },
                {
                  "@type": "Country",
                  name: "Azerbaijan",
                },
                {
                  "@type": "Country",
                  name: "Georgia",
                },
              ],
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
                      brand: {
                        "@type": "Brand",
                        name: "Dragon Winch",
                      },
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
                category: "Industrial Equipment Distribution",
                areaServed: {
                  "@type": "Country",
                  name: "Turkey",
                },
              },
            }),
          }}
        />

        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${
                process.env.NEXT_PUBLIC_SITE_URL ||
                "https://www.medaendustri.com"
              }/#website`,
              url:
                process.env.NEXT_PUBLIC_SITE_URL ||
                "https://www.medaendustri.com",
              name: "Meda Endüstri",
              description:
                "Dragon Winch çekme vinci tamburu, kurtarma vinçleri ve endüstriyel vinç sistemleri Türkiye distribütörü",
              publisher: {
                "@id": `${
                  process.env.NEXT_PUBLIC_SITE_URL ||
                  "https://www.medaendustri.com"
                }/#organization`,
              },
              inLanguage: "tr-TR",
              potentialAction: [
                {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate: `${
                      process.env.NEXT_PUBLIC_SITE_URL ||
                      "https://www.medaendustri.com"
                    }/urunler?search={search_term_string}`,
                  },
                  "query-input": "required name=search_term_string",
                },
              ],
            }),
          }}
        />

        {/* Breadcrumb Schema for Home */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Ana Sayfa",
                  item:
                    process.env.NEXT_PUBLIC_SITE_URL ||
                    "https://www.medaendustri.com",
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-gray-900 font-source-sans">
        <Analytics />
        <ScrollToTop />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
