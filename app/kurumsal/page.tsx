import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Eye, Award, Users, Globe, Lightbulb, Anchor, TrendingUp, Shield, Clock } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const values = [
    {
      icon: <Award className="w-8 h-8 text-[#d84948]" />,
      title: "Orijinallik",
      description: "Dragon Winch'in yetkili distribütörü olarak sadece orijinal ürünler sunuyoruz.",
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-[#d84948]" />,
      title: "Uzmanlık",
      description: "15 yıllık vinç teknolojisi deneyimimiz ile en doğru çözümleri öneriyoruz.",
    },
    {
      icon: <Users className="w-8 h-8 text-[#d84948]" />,
      title: "Güvenilirlik",
      description: "Dragon Winch distribütörlüğündeki başarılı geçmişimizle güven veriyoruz.",
    },
    {
      icon: <Globe className="w-8 h-8 text-[#d84948]" />,
      title: "Geniş Erişim",
      description: "Türkiye ve bölge ülkelerinde Dragon Winch ürünlerine kolay erişim sağlıyoruz.",
    },
  ]

  const stats = [
    {
      icon: <Anchor className="w-10 h-10 text-[#d84948]" />,
      number: "15+",
      label: "Yıllık Dragon Winch Deneyimi",
      description: "Vinç sektöründe köklü geçmiş",
    },
    {
      icon: <Users className="w-10 h-10 text-[#d84948]" />,
      number: "200+",
      label: "Mutlu Müşteri",
      description: "Güvenilir vinç çözümleri",
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-[#d84948]" />,
      number: "1000+",
      label: "Kurulu Vinç Sistemi",
      description: "Başarılı uygulamalar",
    },
    {
      icon: <Shield className="w-10 h-10 text-[#d84948]" />,
      number: "25+",
      label: "Ülkede Hizmet",
      description: "Geniş distribütörlük ağı",
    },
  ]

  const milestones = [
    {
      year: "2009",
      title: "Dragon Winch Ortaklığı",
      description: "Dragon Winch ile distribütörlük anlaşması imzalandı",
    },
    {
      year: "2012",
      title: "İlk Büyük Proje",
      description: "Denizcilik sektöründe ilk büyük vinç projesi",
    },
    {
      year: "2015",
      title: "Bölgesel Genişleme",
      description: "Karadeniz ve Akdeniz bölgelerinde distribütörlük",
    },
    {
      year: "2018",
      title: "Teknik Servis Merkezi",
      description: "Dragon Winch yetkili servis merkezi açıldı",
    },
    {
      year: "2021",
      title: "Endüstriyel Vinçler",
      description: "Endüstriyel vinç segmentinde uzmanlaşma",
    },
    {
      year: "2024",
      title: "Dijital Dönüşüm",
      description: "Online katalog ve e-ticaret platformu",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-[#d84948]/5 via-gray-50 to-[#d84948]/10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-[#d84948]/10 rounded-full text-[#d84948] font-medium text-sm mb-6">
              <Clock className="w-4 h-4 mr-2" />
              15 Yıllık Dragon Winch Deneyimi
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">Hakkımızda</h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Dragon Winch çekme vinci tamburlarının Türkiye ve bölge ülkeleri distribütörü olarak, 15 yıllık
              deneyimimizle vinç sektöründe güvenilir çözümler sunuyoruz.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-white rounded-lg shadow-md border border-gray-100">
                <span className="text-2xl font-bold text-[#d84948]">200+</span>
                <span className="text-gray-600 ml-2">Müşteri</span>
              </div>
              <div className="px-6 py-3 bg-white rounded-lg shadow-md border border-gray-100">
                <span className="text-2xl font-bold text-[#d84948]">1000+</span>
                <span className="text-gray-600 ml-2">Kurulu Vinç</span>
              </div>
              <div className="px-6 py-3 bg-white rounded-lg shadow-md border border-gray-100">
                <span className="text-2xl font-bold text-[#d84948]">25+</span>
                <span className="text-gray-600 ml-2">Ülke</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Statistics */}
      <section className="py-20 bg-gradient-to-r from-[#d84948] to-[#c73e3d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white group">
                <div className="mx-auto mb-6 p-4 bg-white/10 backdrop-blur-sm rounded-2xl w-fit group-hover:bg-white/20 transition-all duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-xl font-semibold mb-1">{stat.label}</div>
                <div className="text-white/80 text-sm">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Profile Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-[#d84948]/10 rounded-full text-[#d84948] font-medium text-sm mb-6">
                <Anchor className="w-4 h-4 mr-2" />
                Dragon Winch Distribütörü
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">Çekme Vinci Uzmanı</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  Meda Endüstri, 2009 yılından bu yana Dragon Winch markasının Türkiye ve bölge ülkeleri distribütörü
                  olarak faaliyet göstermektedir. 15 yıllık deneyimimizle çekme vinci tamburu teknolojilerinde
                  uzmanlaşmış kadromuz, sektörün en zorlu projelerinde başarılı çözümler sunmaktadır.
                </p>
                <p>
                  Denizcilik, endüstriyel üretim, liman işletmeciliği ve inşaat sektörlerinde faaliyet gösteren 200'den
                  fazla müşteriye Dragon Winch ürünleri tedarik etmekteyiz. Geniş stok kapasitemiz ve hızlı lojistik
                  ağımız ile müşterilerimizin acil ihtiyaçlarını karşılayabilecek altyapıya sahibiz.
                </p>
                <p>
                  Dragon Winch'in yetkili distribütörü olarak, sadece orijinal ürünler sunuyor, satış sonrası teknik
                  destek ve yedek parça hizmetleri sağlıyoruz. Müşteri memnuniyeti odaklı yaklaşımımızla sektörde
                  güvenilir bir partner konumundayız.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#d84948] rounded-full"></div>
                  <span className="text-gray-700 font-medium">Dragon Winch Yetkili Distribütör</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#d84948] rounded-full"></div>
                  <span className="text-gray-700 font-medium">7/24 Teknik Destek</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#d84948] rounded-full"></div>
                  <span className="text-gray-700 font-medium">Hızlı Teslimat</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#d84948] rounded-full"></div>
                  <span className="text-gray-700 font-medium">Yetkili Servis Ağı</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#d84948]/20 to-transparent rounded-2xl"></div>
              <Image
                src="/placeholder.svg?height=500&width=700"
                alt="Dragon Winch distribütörlük merkezi"
                width={700}
                height={500}
                className="rounded-2xl shadow-2xl relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Dragon Winch Yolculuğumuz</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              15 yıllık Dragon Winch distribütörlüğümüzde attığımız önemli adımlar
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#d84948]/20"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-[#d84948] mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-[#d84948] rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Vision */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <CardHeader className="text-center pb-6 bg-gradient-to-br from-[#d84948]/5 to-transparent">
                <div className="mx-auto mb-6 p-6 bg-gradient-to-br from-[#d84948] to-[#c73e3d] rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900">Vizyonumuz</CardTitle>
              </CardHeader>
              <CardContent className="text-center p-8">
                <p className="text-gray-600 leading-relaxed text-lg">
                  Dragon Winch çekme vinci tamburlarının bölgedeki en güvenilir ve tercih edilen distribütörü olmak.
                  Vinç teknolojilerinde uzmanlaşarak, müşterilerimize en kaliteli ürünler ve hizmetler sunmak. Sektörde
                  öncü konumumuzu koruyarak Dragon Winch markasını daha geniş coğrafyalara yaymak.
                </p>
              </CardContent>
            </Card>

            {/* Mission */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <CardHeader className="text-center pb-6 bg-gradient-to-br from-[#d84948]/5 to-transparent">
                <div className="mx-auto mb-6 p-6 bg-gradient-to-br from-[#d84948] to-[#c73e3d] rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900">Misyonumuz</CardTitle>
              </CardHeader>
              <CardContent className="text-center p-8">
                <p className="text-gray-600 leading-relaxed text-lg">
                  Müşterilerimizin çekme vinci ihtiyaçlarını Dragon Winch'in kaliteli ürünleriyle karşılamak.
                  Denizcilik, endüstri ve liman sektörlerinde güvenilir vinç çözümleri sunarak operasyonel verimliliği
                  artırmak. Satış öncesi danışmanlık ve satış sonrası teknik destek ile müşteri memnuniyetini en üst
                  düzeyde tutmak.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-[#d84948]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Değerlerimiz</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dragon Winch distribütörlüğümüzde benimsediğimiz temel değerler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
              >
                <CardHeader className="pb-4">
                  <div className="mx-auto mb-6 p-6 bg-gradient-to-br from-[#d84948]/10 to-[#d84948]/5 rounded-2xl w-fit group-hover:bg-gradient-to-br group-hover:from-[#d84948] group-hover:to-[#c73e3d] transition-all duration-300">
                    <div className="group-hover:text-white transition-colors duration-300">{value.icon}</div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">{value.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-8">
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
