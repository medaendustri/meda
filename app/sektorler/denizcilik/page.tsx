import type { Metadata } from "next";
import {
  Anchor,
  Ship,
  Waves,
  Compass,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Denizcilik Vinç Çözümleri | Dragon Winch | Meda Endüstri",
  description:
    "Denizcilik sektörü için özel tasarlanmış Dragon Winch vinç sistemleri. Gemi, yat ve deniz platformları için korozyona dayanıklı çözümler.",
  keywords:
    "denizcilik vinç, gemi vinç, yat vinç, dragon winch marine, deniz platformu vinç",
};

export default function DenizcilikPage() {
  const applications = [
    {
      icon: <Ship className="w-8 h-8" />,
      title: "Gemi Vinçleri",
      description:
        "Ticari gemiler ve kargo gemileri için yüksek kapasiteli vinç sistemleri",
    },
    {
      icon: <Anchor className="w-8 h-8" />,
      title: "Çapa Vinçleri",
      description:
        "Güvenli demirleme için dayanıklı ve güvenilir çapa vinç çözümleri",
    },
    {
      icon: <Waves className="w-8 h-8" />,
      title: "Offshore Platformlar",
      description:
        "Deniz platformları ve petrol kulelerinde kullanım için özel vinçler",
    },
    {
      icon: <Compass className="w-8 h-8" />,
      title: "Yat ve Tekne",
      description:
        "Özel yatlar ve tekneler için kompakt ve estetik vinç sistemleri",
    },
  ];

  const features = [
    "Korozyona dayanıklı paslanmaz çelik",
    "Deniz suyu direnci",
    "IP67 su geçirmezlik sınıfı",
    "Otomatik fren sistemi",
    "Kablosuz uzaktan kumanda",
    "Düşük bakım gereksinimi",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-[#d84948]/20 rounded-full">
                <Anchor className="w-16 h-16 text-[#d84948]" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Denizcilik
              <span className="block text-[#d84948]">Vinç Çözümleri</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Deniz koşullarına dayanıklı Dragon Winch sistemleri ile güvenli
              seyir
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center bg-gradient-to-r from-[#d84948] to-[#c73e3d] text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Marine Çözümler
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
              Denizcilik Uygulamaları
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Her türlü deniz aracı için özel Dragon Winch çözümleri
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
                Deniz Koşullarına Dayanıklılık
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Dragon Winch denizcilik vinçleri, tuzlu su ve zorlu deniz
                koşullarında uzun ömürlü performans sunar.
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
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl overflow-hidden">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Denizcilik Vinç Sistemi"
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
            Denizcilik Projeleriniz İçin
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Deniz koşullarına uygun Dragon Winch çözümleri için uzmanlarımızla
            görüşün
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/urunler"
              className="bg-white text-[#d84948] px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Marine Ürünler
            </Link>
            <Link
              href="/iletisim"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#d84948] transition-all duration-300"
            >
              Teklif Al
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
