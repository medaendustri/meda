import type { Metadata } from "next"
import { Shield, Target, Truck, Anchor, ChevronRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Savunma Sanayi Vinç Çözümleri | Dragon Winch | Meda Endüstri",
  description:
    "Savunma sanayi için özel tasarlanmış Dragon Winch vinç sistemleri. Askeri araçlar, tank taşıyıcıları ve savunma ekipmanları için güvenilir çözümler.",
  keywords: "savunma sanayi vinç, askeri vinç, tank taşıyıcı vinç, dragon winch savunma, askeri ekipman vinç",
}

export default function SavunmaSanayiPage() {
  const applications = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Askeri Araç Kurtarma",
      description: "Tank ve zırhlı araç kurtarma operasyonları için yüksek kapasiteli vinç sistemleri",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Taktik Operasyonlar",
      description: "Saha koşullarında hızlı ve güvenilir çekme operasyonları için kompakt çözümler",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Güvenlik Ekipmanları",
      description: "Kritik güvenlik uygulamaları için sertifikalı ve dayanıklı vinç sistemleri",
    },
    {
      icon: <Anchor className="w-8 h-8" />,
      title: "Lojistik Destek",
      description: "Ağır ekipman taşıma ve konuşlandırma operasyonları için özel vinçler",
    },
  ]

  const features = [
    "NATO standartlarına uygun üretim",
    "Ekstrem hava koşullarına dayanıklılık",
    "Yüksek çekme kapasitesi (15-50 ton)",
    "Hızlı kurulum ve bakım",
    "Gürültüsüz çalışma",
    "Uzaktan kumanda desteği",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-[#d84948]/20 rounded-full">
                <Shield className="w-16 h-16 text-[#d84948]" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Savunma Sanayi
              <span className="block text-[#d84948]">Vinç Çözümleri</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Askeri operasyonlar ve savunma sanayi için özel tasarlanmış Dragon Winch sistemleri
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center bg-gradient-to-r from-[#d84948] to-[#c73e3d] text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Teknik Destek Al
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Uygulama Alanları</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Savunma sanayi ihtiyaçlarına özel Dragon Winch çözümleri
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {applications.map((app, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="text-[#d84948] mb-4">{app.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{app.title}</h3>
                <p className="text-gray-600">{app.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Savunma Sanayi Standartları</h2>
              <p className="text-xl text-gray-600 mb-8">
                Dragon Winch savunma sanayi vinçleri, en zorlu koşullarda bile güvenilir performans sunar.
              </p>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-[#d84948] mr-3 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Savunma Sanayi Vinç Sistemi"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#d84948] to-[#c73e3d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Savunma Sanayi Projeleriniz İçin</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Özel gereksinimleriniz için Dragon Winch uzmanlarımızla görüşün
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/urunler"
              className="bg-white text-[#d84948] px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Ürünleri İncele
            </Link>
            <Link
              href="/iletisim"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#d84948] transition-all duration-300"
            >
              İletişime Geç
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
