import type { Metadata } from "next";
import {
  Tractor,
  Wheat,
  TreePine,
  Truck,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tarım Sektörü Vinç Çözümleri | Dragon Winch | Meda Endüstri",
  description:
    "Tarım sektörü için özel tasarlanmış Dragon Winch vinç sistemleri. Traktör, hasat makinesi ve tarım ekipmanları için dayanıklı çözümler.",
  keywords:
    "tarım vinç, traktör vinç, hasat makinesi vinç, dragon winch agriculture, tarım ekipmanı vinç",
};

export default function TarimPage() {
  const applications = [
    {
      icon: <Tractor className="w-8 h-8" />,
      title: "Traktör Vinçleri",
      description: "Tarım traktörleri için güçlü ve dayanıklı vinç sistemleri",
    },
    {
      icon: <Wheat className="w-8 h-8" />,
      title: "Hasat Ekipmanları",
      description:
        "Hasat makineleri ve tarım araçları için özel vinç çözümleri",
    },
    {
      icon: <TreePine className="w-8 h-8" />,
      title: "Orman Ürünleri",
      description:
        "Ağaç kesimi ve orman işletmeciliği için güçlü vinç sistemleri",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Tarım Lojistiği",
      description:
        "Tarım ürünlerinin taşınması ve yüklenmesi için pratik vinçler",
    },
  ];

  const features = [
    "Toz ve nem direnci",
    "Kolay temizlenebilir tasarım",
    "Düşük bakım maliyeti",
    "Güçlü motor performansı",
    "Kompakt boyutlar",
    "Uzun ömürlü kullanım",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-[#d84948]/20 rounded-full">
                <Tractor className="w-16 h-16 text-[#d84948]" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Tarım Sektörü
              <span className="block text-[#d84948]">Vinç Çözümleri</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Tarım ve orman işletmeciliği için dayanıklı Dragon Winch
              sistemleri
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center bg-gradient-to-r from-[#d84948] to-[#c73e3d] text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Tarım Çözümleri
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tarım Uygulamaları
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tarım ve orman işletmeciliği için özel Dragon Winch çözümleri
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {applications.map((app, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="text-[#d84948] mb-4">{app.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {app.title}
                </h3>
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Tarım Koşullarına Uygun
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Dragon Winch tarım vinçleri, zorlu arazi koşullarında güvenilir
                performans sunar.
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
              <div className="aspect-[4/3] bg-gradient-to-br from-green-100 to-green-200 rounded-xl overflow-hidden">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Tarım Vinç Sistemi"
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Tarım Projeleriniz İçin
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Tarım işletmeniz için Dragon Winch uzmanlarımızla görüşün
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/urunler"
              className="bg-white text-[#d84948] px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Tarım Ürünleri
            </Link>
            <Link
              href="/iletisim"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#d84948] transition-all duration-300"
            >
              Çiftlik Ziyareti
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
