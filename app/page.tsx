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
  Calendar,
  ChevronRight,
  Award,
  Users,
  Globe,
  CheckCircle,
  Star,
  Quote,
  Wrench,
  Shield,
  Zap,
  Eye,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { HeroSlider } from "@/components/hero-slider";

async function getFeaturedProducts() {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      }/api/products?featured_by_category=true`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) return [];
    const data = await response.json();
    return data.products || [];
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
        "Gemi ve yat endüstrisi için özel tasarlanmış Dragon Winch çekme vinci tamburları",
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
      icon: <Ship className="w-8 h-8 text-[#d84948]" />,
      title: "Liman Ekipmanları",
      description:
        "Liman operasyonları için özel Dragon Winch çekme vinci çözümleri",
      features: ["Konteyner Vinçleri", "Kargo Yükleme", "Otomatik Kontrol"],
    },
  ];

  const companyStats = [
    {
      number: "15+",
      label: "Yıllık Dragon Winch Deneyimi",
      icon: <Award className="w-6 h-6" />,
    },
    {
      number: "1000+",
      label: "Kurulu Vinç Sistemi",
      icon: <CheckCircle className="w-6 h-6" />,
    },
    {
      number: "200+",
      label: "Mutlu Müşteri",
      icon: <Users className="w-6 h-6" />,
    },
    {
      number: "25+",
      label: "Ülkede Distribütörlük",
      icon: <Globe className="w-6 h-6" />,
    },
  ];

  const whyChooseUs = [
    {
      title: "Yetkili Distribütör",
      description:
        "Dragon Winch'in Türkiye ve bölge ülkeleri için resmi distribütörüyüz. Orijinal ürün garantisi sunuyoruz.",
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
        "Geniş stok kapasitemiz ile Dragon Winch ürünlerini hızlı bir şekilde teslim ediyoruz.",
      icon: <Zap className="w-6 h-6 text-[#d84948]" />,
    },
    {
      title: "Servis Desteği",
      description:
        "Satış sonrası teknik servis, yedek parça temini ve bakım hizmetleri sunuyoruz.",
      icon: <Users className="w-6 h-6 text-[#d84948]" />,
    },
  ];

  const testimonials = [
    {
      name: "Kaptan Mehmet Özkan",
      company: "Teknik Direktör, Özkan Denizcilik",
      content:
        "Dragon Winch vinçlerini 5 yıldır kullanıyoruz. Meda Endüstri'nin profesyonel yaklaşımı ve kaliteli hizmeti sayesinde hiç sorun yaşamadık.",
      rating: 5,
    },
    {
      name: "Mühendis Ayşe Kaya",
      company: "Proje Yöneticisi, Kaya İnşaat",
      content:
        "İnşaat projelerimizde Dragon Winch vinçlerinin güvenilirliği ve Meda Endüstri'nin teknik desteği çok önemli.",
      rating: 5,
    },
    {
      name: "Ahmet Demir",
      company: "Liman İşletmecisi, Demir Lojistik",
      content:
        "Liman operasyonlarımızda Dragon Winch sistemleri mükemmel performans gösteriyor. Meda Endüstri'ye teşekkürler.",
      rating: 5,
    },
  ];

  const recentNews = [
    {
      id: 1,
      title: "Yeni Dragon Winch Serisi Türkiye'de",
      excerpt:
        "Dragon Winch'in en yeni nesil çekme vinci tamburları artık Türkiye'de. Gelişmiş teknoloji ve arttırılmış kapasiteyle tanışın.",
      date: "15 Aralık 2024",
      image: "/placeholder.svg?height=200&width=300",
      category: "Ürün Lansmanı",
    },
    {
      id: 2,
      title: "Karadeniz Bölgesi Distribütörlük Anlaşması",
      excerpt:
        "Dragon Winch Karadeniz bölgesi distribütörlük anlaşması imzalandı. Bölgedeki müşterilerimize daha yakın hizmet.",
      date: "10 Aralık 2024",
      image: "/placeholder.svg?height=200&width=300",
      category: "Kurumsal",
    },
    {
      id: 3,
      title: "Denizcilik Fuarı'nda Dragon Winch Standı",
      excerpt:
        "İstanbul Denizcilik Fuarı'nda Dragon Winch ürünlerini sergiledik. Yoğun ilgi gören standımızı ziyaret edenler teşekkür ederiz.",
      date: "5 Aralık 2024",
      image: "/placeholder.svg?height=200&width=300",
      category: "Etkinlik",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Enhanced Corporate Style */}
      <HeroSlider />

      {/* Added JSON-LD structured data for homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Meda Savunma",
            alternateName: "Dragon Winch Türkiye",
            url:
              process.env.NEXT_PUBLIC_SITE_URL || "https://medasavunma.com.tr",
            description:
              "Dragon Winch çekme vinci tamburu, kurtarma vinçleri ve endüstriyel vinç sistemleri Türkiye distribütörü",
            publisher: {
              "@type": "Organization",
              name: "Meda Savunma Teknolojileri",
            },
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: `${
                  process.env.NEXT_PUBLIC_SITE_URL ||
                  "https://medasavunma.com.tr"
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
              name: "Dragon Winch Öne Çıkan Ürünler",
              description:
                "En popüler Dragon Winch çekme vinci tamburu modelleri",
              numberOfItems: featuredProducts.length,
              itemListElement: featuredProducts
                .slice(0, 6)
                .map((product: any, index: number) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  item: {
                    "@type": "Product",
                    name: product.name,
                    description:
                      product.short_description?.replace(/<[^>]*>/g, "") ||
                      product.name,
                    image: product.images?.[0]?.src || "",
                    url: `${
                      process.env.NEXT_PUBLIC_SITE_URL ||
                      "https://medasavunma.com.tr"
                    }/urunler/${product.id}`,
                    brand: {
                      "@type": "Brand",
                      name: "Dragon Winch",
                    },
                    manufacturer: {
                      "@type": "Organization",
                      name: "Dragon Winch",
                    },
                    category:
                      product.categories?.[0]?.name || "Çekme Vinci Tamburu",
                  },
                })),
            }),
          }}
        />
      )}

      {featuredProducts.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="inline-block px-4 py-2 bg-[#d84948]/10 rounded-full text-[#d84948] text-sm font-semibold mb-4">
                ÖNE ÇIKAN ÜRÜNLER
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Dragon Winch Ürünleri
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                En popüler Dragon Winch çekme vinci tamburu modelleri ve
                endüstriyel vinç çözümleri
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.slice(0, 6).map((product: any) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 shadow-lg hover:-translate-y-3 bg-white relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#d84948] to-[#ff6b6a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                  <div className="relative h-64 overflow-hidden bg-gray-50">
                    {product.images && product.images.length > 0 ? (
                      <Image
                        src={product.images[0].src || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                        <Anchor className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className="bg-gradient-to-r from-[#d84948] to-[#c73e3d] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        Dragon Winch
                      </span>
                    </div>
                  </div>

                  <CardHeader className="pb-4 pt-6">
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-[#d84948] transition-colors line-clamp-2 leading-tight mb-3">
                      {product.name}
                    </CardTitle>
                    {product.categories && product.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {product.categories.slice(0, 2).map((category: any) => (
                          <span
                            key={category.id}
                            className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs font-medium"
                          >
                            {category.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardHeader>

                  <CardContent className="pt-0 pb-6">
                    {product.short_description && (
                      <CardDescription
                        className="text-gray-600 leading-relaxed line-clamp-3 text-sm mb-6"
                        dangerouslySetInnerHTML={{
                          __html: product.short_description,
                        }}
                      />
                    )}

                    <div className="flex gap-3">
                      <Link href={`/urunler/${product.id}`} className="flex-1">
                        <Button className="w-full bg-gradient-to-r from-[#d84948] to-[#c73e3d] hover:from-[#c73e3d] hover:to-[#b83332] text-white font-semibold transition-all duration-300">
                          <Eye className="w-4 h-4 mr-2" />
                          İncele
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-16">
              <Link href="/urunler">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#d84948] to-[#c73e3d] hover:from-[#c73e3d] hover:to-[#b83332] text-white px-12 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  Tüm Dragon Winch Ürünleri
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Company Stats Section */}
      <section className="py-20 bg-gradient-to-r from-[#d84948] via-[#dc5a59] to-[#d84948] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1400')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {companyStats.map((stat, index) => (
              <div key={index} className="text-center text-white group">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-3 group-hover:scale-105 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-red-100 font-medium text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-[#d84948]/10 rounded-full text-[#d84948] text-sm font-semibold mb-4">
              DRAGON WINCH ÜRÜNLERİ
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Çekme Vinci Çözümlerimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Dragon Winch markasının geniş ürün yelpazesi ile her sektörden
              ihtiyaçlarınıza uygun çekme vinci tamburu çözümleri sunuyoruz.
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
                  <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-[#d84948] transition-colors mb-4">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed text-base">
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
                Tüm Dragon Winch Ürünleri
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1400')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-[#d84948]/10 rounded-full text-[#d84948] text-sm font-semibold mb-4">
              NEDEN BİZ?
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Neden Meda Endüstri?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Dragon Winch distribütörlüğündeki deneyimimiz ve müşteri odaklı
              yaklaşımımızla fark yaratıyoruz
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

      <section className="py-24 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-[#d84948]/10 rounded-full text-[#d84948] text-sm font-semibold mb-4">
              REFERANSLAR
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Müşterilerimiz Ne Diyor?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Dragon Winch ürünleri kullanan müşterilerimizden gelen
              değerlendirmeler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 shadow-xl bg-white relative overflow-hidden group hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#d84948] to-[#ff6b6a]"></div>
                <CardContent className="p-10">
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <Quote className="w-10 h-10 text-[#d84948] mb-6 opacity-60" />
                  <p className="text-gray-700 leading-relaxed mb-8 italic text-lg">
                    "{testimonial.content}"
                  </p>
                  <div className="border-t border-gray-100 pt-6">
                    <div className="font-bold text-gray-900 text-lg">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-[#d84948] font-medium">
                      {testimonial.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-[#d84948]/10 rounded-full text-[#d84948] text-sm font-semibold mb-4">
              HABERLER
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Dragon Winch Haberleri
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Dragon Winch ürünleri ve vinç sektöründen son gelişmeler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {recentNews.map((news) => (
              <Card
                key={news.id}
                className="group hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border-0 shadow-lg hover:-translate-y-2 bg-white"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={news.image || "/placeholder.svg"}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <span className="bg-gradient-to-r from-[#d84948] to-[#c73e3d] text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg">
                      {news.category}
                    </span>
                  </div>
                </div>
                <CardHeader className="pb-4 pt-6">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    {news.date}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-[#d84948] transition-colors line-clamp-2 leading-tight mb-3">
                    {news.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 pb-8">
                  <CardDescription className="text-gray-600 leading-relaxed line-clamp-3 text-base mb-6">
                    {news.excerpt}
                  </CardDescription>
                  <div className="border-t border-gray-100 pt-6">
                    <span className="text-[#d84948] font-semibold text-sm group-hover:underline flex items-center">
                      Devamını Oku
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-20">
            <Link href="/haberler">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#d84948] text-[#d84948] hover:bg-[#d84948] hover:text-white bg-transparent px-12 py-6 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Tüm Haberleri Görüntüle
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-[#d84948] via-[#dc5a59] to-[#c73e3d] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1400')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-8">
            <span className="inline-block px-6 py-3 bg-white/20 border border-white/30 rounded-full text-white text-sm font-semibold backdrop-blur-sm">
              ÜCRETSİZ TEKNİK DANIŞMANLIK
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Dragon Winch Çözümünüzü Bulalım
          </h2>
          <p className="text-xl text-red-100 mb-12 leading-relaxed max-w-4xl mx-auto">
            Uzman ekibimizle birlikte ihtiyacınıza en uygun Dragon Winch çekme
            vinci tamburunu seçin. Ücretsiz teknik danışmanlık için hemen
            iletişime geçin.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/iletisim">
              <Button
                size="lg"
                className="bg-white text-[#d84948] hover:bg-gray-100 px-12 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Teknik Danışmanlık
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/urunler">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white hover:text-[#d84948] px-12 py-6 text-lg font-semibold bg-white/10 backdrop-blur-sm transition-all duration-300"
              >
                Dragon Winch Kataloğu
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
