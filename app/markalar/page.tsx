"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users,
  Handshake,
  Wrench,
  HeadphonesIcon,
  Award,
  Globe,
  CheckCircle,
  ArrowRight,
  Shield,
  Target,
  Building,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CorporatePage() {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-[#d84948]" />,
      title: "Uzman Ekip",
      description:
        "Meda Savunma, alanında uzmanlaşmış bir ekibe sahiptir. Bu ekip, müşterilerin spesifik ihtiyaçlarını anlar ve en uygun çözümleri sunar.",
    },
    {
      icon: <Handshake className="w-8 h-8 text-[#d84948]" />,
      title: "İş Birliği",
      description:
        "Dünyaca ünlü savunma sanayi markaları ile iş birliği yaparak, en son teknoloji ürünlerini müşterilere sunar. Bu iş birlikleri, güvenilirlik ve kalite açısından firma için bir güvence oluşturur.",
    },
    {
      icon: <Wrench className="w-8 h-8 text-[#d84948]" />,
      title: "Proje Tasarımı",
      description:
        "Her müşterinin ihtiyaçları farklıdır, bu nedenle Meda Savunma, özel projeler tasarlayarak her müşterinin özel taleplerini karşılar.",
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8 text-[#d84948]" />,
      title: "Montaj ve Satış Sonrası Hizmetler",
      description:
        "Firma, ürünlerin montajı konusunda uzmanlaşmış bir ekibe sahiptir ve satış sonrası hizmetlerle müşterilerinin sorunsuz bir deneyim yaşamasını sağlar.",
    },
  ]

  const stats = [
    {
      icon: <Award className="w-8 h-8" />,
      number: "12+",
      label: "Yıllık Deneyim",
      description: "Savunma ve endüstriyel sektörlerde",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      number: "Dragon Winch",
      label: "Yetkili Distribütörü",
      description: "Türkiye ve bölge ülkeleri",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      number: "100%",
      label: "Müşteri Odaklı",
      description: "Kalite ve güvenilirlik",
    },
    {
      icon: <Building className="w-8 h-8" />,
      number: "Tam Hizmet",
      label: "Çözüm Ortağı",
      description: "İthalat'tan montaja kadar",
    },
  ]

  const services = [
    {
      title: "İthalat ve Satış",
      description: "Dragon Winch çekme vinci tamburlarının Türkiye'ye ithalatı ve satışı",
      icon: <Globe className="w-6 h-6 text-[#d84948]" />,
    },
    {
      title: "Proje Tasarımı",
      description: "Müşteri ihtiyaçlarına özel vinç sistemi tasarımı ve mühendislik hizmetleri",
      icon: <Target className="w-6 h-6 text-[#d84948]" />,
    },
    {
      title: "Montaj Hizmetleri",
      description: "Profesyonel ekibimizle Dragon Winch ürünlerinin montaj ve devreye alma işlemleri",
      icon: <Wrench className="w-6 h-6 text-[#d84948]" />,
    },
    {
      title: "Satış Sonrası Destek",
      description: "Teknik servis, bakım, yedek parça temini ve 7/24 müşteri desteği",
      icon: <Shield className="w-6 h-6 text-[#d84948]" />,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#d84948] via-[#dc5a59] to-[#c73e3d] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1400')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-white">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-white font-medium text-sm mb-6 backdrop-blur-sm">
              <Building className="w-4 h-4 mr-2" />
              MEDA Savunma Teknolojileri
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Dragon Winch
              <br />
              <span className="text-red-100">Türkiye Distribütörü</span>
            </h1>
            <p className="text-xl text-red-100 max-w-4xl mx-auto leading-relaxed mb-8">
              MEDA Savunma Teknolojileri, dünya çapında tanınmış elektrikli ve hidrolik çekme ve kurtarma vinçlerinin
              Türkiye distribütörüdür. 12 yıllık deneyimi ve sektörün ihtiyaçlarını anlayan uzman ekibi ile savunma ve
              endüstriyel sektörlere yüksek kalitede hizmet sunmaktadır.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/urunler">
                <Button
                  size="lg"
                  className="bg-white text-[#d84948] hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  Dragon Winch Ürünleri
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/iletisim">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white hover:text-[#d84948] px-8 py-4 text-lg font-semibold bg-white/10 backdrop-blur-sm transition-all duration-300"
                >
                  İletişime Geçin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-[#d84948]/10 to-[#d84948]/20 rounded-2xl w-fit group-hover:from-[#d84948]/20 group-hover:to-[#d84948]/30 transition-all duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-[#d84948] mb-2">{stat.number}</div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Description */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-[#d84948]/10 rounded-full text-[#d84948] text-sm font-semibold mb-6">
                HAKKIMIZDA
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Güvenilir Dragon Winch Çözüm Ortağınız
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                MEDA Savunma Teknolojileri, 12 yıllık deneyimi ve sektörün ihtiyaçlarını anlayan uzman ekibi ile savunma
                ve endüstriyel sektörlere yüksek kalitede hizmet sunan öncü bir firma olarak ön plana çıkmaktadır.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Firma, dünyaca ünlü savunma sanayi markaları ile iş birliği yaparak çekme ve kurtarma vinçlerinin
                ithalat, satış, proje tasarımı, montaj ve satış sonrası hizmetleri sunmaktadır. MEDA Savunma,
                müşterilerine sağladığı hizmetlerde kalite ve güvenilirlik konularına büyük önem verirken, teknoloji ve
                yenilikçilik ile sektörün öncüsü olma yolunda kararlı bir şekilde ilerlemektedir.
              </p>
              <Link href="/iletisim">
                <Button className="bg-[#d84948] hover:bg-[#c73e3d] text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  Detaylı Bilgi Alın
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="MEDA Savunma Teknolojileri Tesisleri"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#d84948] text-white p-6 rounded-2xl shadow-xl">
                <div className="text-2xl font-bold">Dragon Winch</div>
                <div className="text-sm opacity-90">Yetkili Distribütör</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-[#d84948]/10 rounded-full text-[#d84948] text-sm font-semibold mb-4">
              ÖNE ÇIKAN ÖZELLİKLERİMİZ
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">MEDA Savunma'nın Güçlü Yanları</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Dragon Winch distribütörlüğündeki başarımızın arkasındaki temel değerler ve yaklaşımlarımız
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-to-br from-[#d84948]/10 to-[#d84948]/20 rounded-xl group-hover:from-[#d84948]/20 group-hover:to-[#d84948]/30 transition-all duration-300 flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-[#d84948] transition-colors mb-3">
                        {feature.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 pl-20">
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-[#d84948]/10 rounded-full text-[#d84948] text-sm font-semibold mb-4">
              HİZMETLERİMİZ
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Kapsamlı Dragon Winch Hizmetleri</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              İthalattan montaja, satış sonrası desteğe kadar tam hizmet çözüm ortağınız
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
              >
                <CardHeader className="pb-4">
                  <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-[#d84948]/10 to-[#d84948]/20 rounded-2xl w-fit group-hover:from-[#d84948]/20 group-hover:to-[#d84948]/30 transition-all duration-300 group-hover:scale-110">
                    {service.icon}
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-[#d84948] transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#d84948] via-[#dc5a59] to-[#c73e3d] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1400')] opacity-10"></div>
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-8">
            <span className="inline-block px-6 py-3 bg-white/20 border border-white/30 rounded-full text-white text-sm font-semibold backdrop-blur-sm">
              MEDA SAVUNMA TEKNOLOJİLERİ
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
            Dragon Winch Çözümleriniz İçin Bizimle İletişime Geçin
          </h2>
          <p className="text-xl text-red-100 mb-12 leading-relaxed max-w-4xl mx-auto">
            MEDA Savunma Teknolojileri, savunma sanayi ve endüstriyel sektörlerin ihtiyaçlarını karşılamak için en son
            teknoloji Dragon Winch ürünlerini sunan, güvenilir bir iş ortağıdır.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/iletisim">
              <Button
                size="lg"
                className="bg-white text-[#d84948] hover:bg-gray-100 px-12 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                İletişime Geçin
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
  )
}
