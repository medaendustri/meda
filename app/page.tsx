import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Anchor,
  Truck,
  Ship,
  Users,
  CheckCircle,
  Wrench,
  Shield,
  Zap,
  Eye,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { HeroSlider } from "@/components/hero-slider";
import { VideoPopupContainer } from "@/components/video-popup-container";
import type { Metadata } from "next";
import { getFeaturedProducts as getDbFeaturedProducts } from "@/lib/db";

interface Product {
  id: number;
  name: string;
  url: string;
  category_url: string;
  category_name: string;
  main_image: string;
  specs: Record<string, string>;
}

export const metadata: Metadata = {
  title: "Meda Endüstri - Endüstriyel Vinç Çözümleri | Çekme Vinci Tamburu",
  description:
    "Çekme vinci tamburu, kurtarma vinçleri ve endüstriyel vinç sistemleri. Denizcilik, savunma sanayi ve endüstriyel sektörlerde güvenilir vinç çözümleri.",
  keywords: [
    "meda endüstri",
    "çekme vinci tamburu",
    "kurtarma vinci",
    "endüstriyel vinç",
    "denizcilik vinçleri",
    "savunma sanayi vinç",
    "vinç sistemi türkiye",
    "winch drum turkey",
    "recovery winch turkey",
    "marine winch systems",
    "industrial winch solutions",
    "vinç tamiri",
    "yedek parça vinç",
  ],
  openGraph: {
    title: "Meda Endüstri - Endüstriyel Vinç Çözümleri | Çekme Vinci Tamburu",
    description:
      "Çekme vinci tamburu, kurtarma vinçleri ve endüstriyel vinç sistemleri. Denizcilik, savunma sanayi ve endüstriyel sektörlerde güvenilir çözümler.",
    type: "website",
    locale: "tr_TR",
    url: "/",
    images: [
      {
        url: "/og-meda-homepage.jpg",
        width: 1200,
        height: 630,
        alt: "Meda Endüstri - Endüstriyel Vinç Çözümleri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meda Endüstri - Endüstriyel Vinç Çözümleri",
    description:
      "Çekme vinci tamburu ve endüstriyel vinç sistemleri. Güvenilir çözümler.",
    images: ["/og-meda-homepage.jpg"],
  },
  alternates: {
    canonical: "/",
  },
};

function getFeaturedProducts() {
  try {
    return getDbFeaturedProducts();
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  const productCategories = [
    {
      icon: <Anchor className="w-8 h-8 text-[#d84948]" />,
      title: "Denizcilik Vinçleri",
      description:
        "Gemi ve yat endüstrisi için özel tasarım çekme vinci tamburları",
      features: [
        "Paslanmaz Çelik Yapı",
        "Yüksek Çekme Kapasitesi",
        "Deniz Suyu Dayanımı",
      ],
    },
    {
      icon: <Truck className="w-8 h-8 text-[#d84948]" />,
      title: "Endüstriyel Vinçler",
      description:
        "Ağır sanayi ve inşaat sektörü için güçlü ve dayanıklı vinç sistemleri",
      features: [
        "Yüksek Tonaj Kapasitesi",
        "Çift Hızlı Sistem",
        "Güvenlik Fren Sistemi",
      ],
    },
    {
      icon: <Shield className="w-8 h-8 text-[#d84948]" />,
      title: "Savunma Sanayi",
      description: "Savunma sanayi projeleri için özel vinç çözümleri",
      features: ["Yüksek Güvenlik", "Askeri Standartlar", "Dayanıklı Yapı"],
    },
  ];

  const whyChooseUs = [
    {
      title: "Yetkili Distribütör",
      description:
        "Avrupa'nın önde gelen vinç markalarının Türkiye distribütörüyüz. Orijinal ürün garantisi sunuyoruz.",
      icon: <Shield className="w-6 h-6 text-[#d84948]" />,
    },
    {
      title: "Teknik Uzmanlık",
      description:
        "15 yıllık vinç teknolojisi deneyimimiz ile en uygun çekme vinci çözümünü sunuyoruz.",
      icon: <Wrench className="w-6 h-6 text-[#d84948]" />,
    },
    {
      title: "Hızlı Teslimat",
      description:
        "Geniş stok kapasitemiz ile ürünleri hızlı bir şekilde teslim ediyoruz.",
      icon: <Zap className="w-6 h-6 text-[#d84948]" />,
    },
    {
      title: "Servis Desteği",
      description:
        "Satış sonrası teknik servis, yedek parça temini ve bakım hizmetleri sunuyoruz.",
      icon: <Users className="w-6 h-6 text-[#d84948]" />,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Video Popup */}
      <VideoPopupContainer />

      {/* Hero Section - Enhanced Corporate Style */}
      <HeroSlider />

      {/* Added JSON-LD structured data for homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Meda Endüstri",
            url:
              process.env.NEXT_PUBLIC_SITE_URL ||
              "https://www.medaendustri.com",
            description:
              "Çekme vinci tamburu, kurtarma vinçleri ve endüstriyel vinç sistemleri. Denizcilik, savunma sanayi ve endüstriyel sektörlerde güvenilir çözümler.",
            publisher: {
              "@type": "Organization",
              name: "Meda Endüstri",
            },
            potentialAction: {
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
          }),
        }}
      />

      {featuredProducts.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Öne Çıkan Ürünler",
              description: "En popüler çekme vinci tamburu modelleri",
              numberOfItems: featuredProducts.length,
              itemListElement: featuredProducts
                .slice(0, 6)
                .map((product: Product, index: number) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  item: {
                    "@type": "Product",
                    name: product.name,
                    description: product.name,
                    image: product.main_image || "",
                    url: `${
                      process.env.NEXT_PUBLIC_SITE_URL ||
                      "https://www.medaendustri.com"
                    }/urunler/${product.slug}`,
                    brand: {
                      "@type": "Brand",
                      name: "Meda Endüstri",
                    },
                    manufacturer: {
                      "@type": "Organization",
                      name: "Meda Endüstri",
                    },
                    category: product.category_name || "Çekme Vinci Tamburu",
                  },
                })),
            }),
          }}
        />
      )}

      {featuredProducts.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="inline-block px-4 py-2 bg-[#d84948]/10 rounded-full text-[#d84948] text-sm font-semibold mb-4">
                ÖNE ÇIKAN ÜRÜNLER
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 corporate-heading">
                Ürünlerimiz
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed corporate-text">
                En popüler çekme vinci tamburu modelleri ve endüstriyel vinç
                çözümleri
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {featuredProducts.slice(0, 5).map((product: Product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 shadow-lg hover:-translate-y-2 bg-white relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#d84948] to-[#ff6b6a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    {product.main_image ? (
                      <Image
                        src={product.main_image}
                        alt={product.name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                        <Anchor className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <CardHeader className="pb-2 pt-4">
                    {product.category_name && (
                      <span className="text-xs font-medium text-[#d84948] mb-1 block">
                        {product.category_name}
                      </span>
                    )}
                    <CardTitle className="text-base font-semibold text-gray-900 group-hover:text-[#d84948] transition-colors line-clamp-2 leading-snug">
                      {product.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="pt-0 pb-4">
                    <Link href={`/urunler/${product.slug}`}>
                      <Button className="w-full bg-gradient-to-r from-[#d84948] to-[#c73e3d] hover:from-[#c73e3d] hover:to-[#b83332] text-white text-sm font-medium transition-all duration-300">
                        <Eye className="w-4 h-4 mr-2" />
                        İncele
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/urunler">
                <Button className="bg-[#d84948] hover:bg-[#c73e3d] text-white px-8 py-3 font-medium">
                  Tüm Ürünleri Gör
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Çekme Vinci Çözümlerimiz
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Geniş ürün yelpazemiz ile ihtiyaçlarınıza uygun çözümler
              sunuyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productCategories.map((category, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 shadow-lg hover:-translate-y-3 bg-white relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#d84948] to-[#ff6b6a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <CardHeader className="text-center pb-8 pt-8">
                  <div className="mx-auto mb-8 p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl w-fit group-hover:from-red-100 group-hover:to-red-200 transition-all duration-300 group-hover:scale-110">
                    {category.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-[#d84948] transition-colors mb-4 corporate-subheading">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed text-base corporate-text">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 pb-8">
                  <div className="space-y-3">
                    {category.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center text-sm text-gray-700 bg-gray-50 rounded-lg p-3"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-20">
            <Link href="/urunler">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#d84948] to-[#c73e3d] hover:from-[#c73e3d] hover:to-[#b83332] text-white px-12 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Tüm Ürünleri Gör
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Neden Meda Endüstri?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Deneyimimiz ve müşteri odaklı yaklaşımımızla fark yaratıyoruz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="group p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start space-x-6">
                  <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl group-hover:from-red-100 group-hover:to-red-200 transition-all duration-300 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#d84948] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        {/* Arka plan resmi - tam sığacak şekilde */}
        <div
          className="absolute inset-0 bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/back-image.webp')",
            backgroundSize: "100% 100%",
          }}
        ></div>
        {/* Overlay - karartma azaltıldı */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-8">
            <span className="inline-block px-6 py-3 bg-[#d84948]/20 border border-[#d84948]/30 rounded-full text-white text-sm font-semibold backdrop-blur-sm">
              ÜCRETSİZ TEKNİK DANIŞMANLIK
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight corporate-heading drop-shadow-lg">
            İhtiyacınıza Uygun Vinç Çözümü
          </h2>
          <p className="text-xl text-gray-100 mb-12 leading-relaxed max-w-4xl mx-auto corporate-text drop-shadow-md">
            Uzman ekibimizle birlikte ihtiyacınıza en uygun çekme vinci
            tamburunu seçin. Ücretsiz teknik danışmanlık için hemen iletişime
            geçin.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/iletisim">
              <Button
                size="lg"
                className="bg-[#d84948] text-white hover:bg-[#c73e3d] px-12 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Teknik Danışmanlık
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/katalog">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/50 text-white hover:bg-white hover:text-[#d84948] px-12 py-6 text-lg font-semibold bg-white/10 backdrop-blur-sm transition-all duration-300 shadow-lg"
              >
                Ürün Kataloğu
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
