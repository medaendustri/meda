"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Award, Shield, CheckCircle, Calendar, FileText, Star, Zap } from "lucide-react"
import Image from "next/image"

export default function CertificatesPage() {
  const certificates = [
    {
      id: 1,
      title: "ISO 9001:2015 Kalite Yönetim Sistemi",
      description: "Uluslararası kalite standartları sertifikası",
      image: "/placeholder.svg?height=300&width=400",
      downloadUrl: "#",
      issueDate: "2024",
      validUntil: "2027",
      category: "Kalite",
      priority: "high",
    },
    {
      id: 2,
      title: "ISO 14001:2015 Çevre Yönetim Sistemi",
      description: "Çevresel sorumluluk ve sürdürülebilirlik sertifikası",
      image: "/placeholder.svg?height=300&width=400",
      downloadUrl: "#",
      issueDate: "2024",
      validUntil: "2027",
      category: "Çevre",
      priority: "high",
    },
    {
      id: 3,
      title: "ISO 45001:2018 İş Sağlığı ve Güvenliği",
      description: "İş sağlığı ve güvenliği yönetim sistemi sertifikası",
      image: "/placeholder.svg?height=300&width=400",
      downloadUrl: "#",
      issueDate: "2024",
      validUntil: "2027",
      category: "Güvenlik",
      priority: "high",
    },
    {
      id: 4,
      title: "CE Uygunluk Beyanı",
      description: "Avrupa Birliği standartlarına uygunluk sertifikası",
      image: "/placeholder.svg?height=300&width=400",
      downloadUrl: "#",
      issueDate: "2024",
      validUntil: "2027",
      category: "Uygunluk",
      priority: "medium",
    },
    {
      id: 5,
      title: "TSE Hizmet Yeterlilik Belgesi",
      description: "Türk Standartları Enstitüsü hizmet yeterlilik belgesi",
      image: "/placeholder.svg?height=300&width=400",
      downloadUrl: "#",
      issueDate: "2024",
      validUntil: "2027",
      category: "Yeterlilik",
      priority: "medium",
    },
    {
      id: 6,
      title: "OHSAS 18001 İş Güvenliği",
      description: "Meslek sağlığı ve güvenliği yönetim sistemi",
      image: "/placeholder.svg?height=300&width=400",
      downloadUrl: "#",
      issueDate: "2023",
      validUntil: "2026",
      category: "Güvenlik",
      priority: "medium",
    },
  ]

  const stats = [
    {
      icon: <Award className="w-10 h-10 text-[#d84948]" />,
      number: "15+",
      label: "Uluslararası Sertifika",
      description: "Kalite güvencesi",
    },
    {
      icon: <Shield className="w-10 h-10 text-[#d84948]" />,
      number: "25",
      label: "Yıllık Deneyim",
      description: "Sektör uzmanlığı",
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-[#d84948]" />,
      number: "100%",
      label: "Uygunluk Oranı",
      description: "Tam uyumluluk",
    },
    {
      icon: <Star className="w-10 h-10 text-[#d84948]" />,
      number: "A+",
      label: "Kalite Notu",
      description: "Mükemmellik seviyesi",
    },
  ]

  const categories = [
    {
      name: "Kalite Yönetimi",
      icon: <Award className="w-6 h-6" />,
      count: 4,
      color: "bg-[#d84948]",
    },
    {
      name: "Çevre & Sürdürülebilirlik",
      icon: <Shield className="w-6 h-6" />,
      count: 3,
      color: "bg-green-500",
    },
    {
      name: "İş Güvenliği",
      icon: <CheckCircle className="w-6 h-6" />,
      count: 5,
      color: "bg-blue-500",
    },
    {
      name: "Teknik Uygunluk",
      icon: <FileText className="w-6 h-6" />,
      count: 3,
      color: "bg-purple-500",
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
              <Award className="w-4 h-4 mr-2" />
              Kalite Güvencesi
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">Sertifikalarımız</h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Kalite, güvenlik ve çevre standartlarında sahip olduğumuz uluslararası sertifikalarımız, müşterilerimize
              sunduğumuz hizmetin güvencesidir.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-[#d84948] to-[#c73e3d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white group">
                <div className="mx-auto mb-6 p-4 bg-white/10 backdrop-blur-sm rounded-2xl w-fit group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
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

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sertifika Kategorileri</h2>
            <p className="text-lg text-gray-600">Farklı alanlardaki uzmanlığımızı belgeleyen sertifikalarımız</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`mx-auto mb-4 p-4 ${category.color} rounded-2xl w-fit text-white group-hover:scale-110 transition-transform duration-300`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <div className="text-2xl font-bold text-[#d84948]">{category.count}</div>
                  <div className="text-sm text-gray-600">Sertifika</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Sertifika Portföyümüz</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Uluslararası standartlarda hizmet kalitemizi belgeleyen sertifikalarımız
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((certificate) => (
              <Card
                key={certificate.id}
                className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  {certificate.priority === "high" && (
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#d84948] text-white text-xs font-semibold rounded-full flex items-center">
                      <Zap className="w-3 h-3 mr-1" />
                      Öncelikli
                    </div>
                  )}
                  <Image
                    src={certificate.image || "/placeholder.svg"}
                    alt={certificate.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-[#d84948]/10 text-[#d84948] text-xs font-medium rounded-full">
                      {certificate.category}
                    </span>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {certificate.validUntil}
                    </div>
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-[#d84948] transition-colors duration-300">
                    {certificate.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600 line-clamp-2">{certificate.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      Geçerlilik: {certificate.issueDate} - {certificate.validUntil}
                    </span>
                  </div>
                  <Button
                    className="w-full bg-[#d84948] hover:bg-[#c73e3d] text-white group-hover:shadow-lg transition-all duration-300"
                    onClick={() => window.open(certificate.downloadUrl, "_blank")}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    İndir
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Commitment Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-[#d84948]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-[#d84948]/10 rounded-full text-[#d84948] font-medium text-sm mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Kalite Taahhüdü
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Kalite Taahhüdümüz</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Meda Endüstri olarak, tüm süreçlerimizde uluslararası kalite standartlarını benimsiyor ve sürekli
              iyileştirme anlayışı ile müşterilerimize en yüksek kalitede hizmet sunmayı taahhüt ediyoruz. Sahip
              olduğumuz sertifikalar, bu taahhüdümüzün somut göstergeleridir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
              <CardContent className="p-8">
                <div className="mx-auto mb-6 p-4 bg-gradient-to-br from-[#d84948] to-[#c73e3d] rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Sürekli İyileştirme</h3>
                <p className="text-gray-600">
                  Kalite yönetim sistemimizi sürekli geliştiriyor, en iyi uygulamaları takip ediyoruz.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
              <CardContent className="p-8">
                <div className="mx-auto mb-6 p-4 bg-gradient-to-br from-[#d84948] to-[#c73e3d] rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Uygunluk Denetimi</h3>
                <p className="text-gray-600">
                  Düzenli iç ve dış denetimlerle standartlara uygunluğumuzu garanti altına alıyoruz.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
              <CardContent className="p-8">
                <div className="mx-auto mb-6 p-4 bg-gradient-to-br from-[#d84948] to-[#c73e3d] rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Güvenilir Hizmet</h3>
                <p className="text-gray-600">
                  Sertifikalarımız, müşterilerimize sunduğumuz hizmetin güvenilirliğinin kanıtıdır.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
