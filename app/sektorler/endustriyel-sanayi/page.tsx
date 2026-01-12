import type { Metadata } from "next";
import {
  Factory,
  Cog,
  Wrench,
  Settings,
  ChevronRight,
  Eye,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Endüstriyel Sanayi Vinç Çözümleri | Meda Endüstri",
  description:
    "Endüstriyel sanayi için özel tasarlanmış vinç sistemleri. Fabrika, imalat ve sanayi tesisleri için güçlü çözümler.",
  keywords: "endüstriyel vinç, sanayi vinç, fabrika vinç, imalat vinç",
};

// Sektöre uygun ürünler - sonra değiştirilecek
const sectorProducts = [
  {
    id: 1,
    name: "DWH 9000 HD",
    category: "Hidrolik Vinçler",
    image: "https://www.dragonwinch.com/en/gfx/1706791030.9927.jpg",
  },
  {
    id: 2,
    name: "DWH 12000 HD",
    category: "Hidrolik Vinçler",
    image: "https://www.dragonwinch.com/en/gfx/1741597545.1839.jpg",
  },
  {
    id: 3,
    name: "DWI CB 1T",
    category: "Zincirli Vinçler",
    image: "https://www.dragonwinch.com/en/gfx/1733917660.7782.png",
  },
  {
    id: 4,
    name: "DWI CB 2T",
    category: "Zincirli Vinçler",
    image: "https://www.dragonwinch.com/en/gfx/1733917660.7782.png",
  },
  {
    id: 5,
    name: "DWK 25 V",
    category: "Manuel Vinçler",
    image: "https://www.dragonwinch.com/en/gfx/1744096345.7437.jpg",
  },
];

export default function EndustriyelSanayiPage() {
  const applications = [
    {
      icon: <Factory className="w-8 h-8" />,
      title: "Fabrika Üretimi",
      description:
        "Üretim hatlarında ağır malzeme taşıma ve konumlandırma işlemleri",
    },
    {
      icon: <Cog className="w-8 h-8" />,
      title: "Makine Montajı",
      description:
        "Ağır makinelerin kurulumu ve bakım operasyonları için vinç sistemleri",
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Bakım Onarım",
      description:
        "Endüstriyel ekipmanların bakım ve onarım işlemleri için özel vinçler",
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Otomasyon",
      description:
        "Otomatik üretim sistemleri ile entegre çalışabilen akıllı vinçler",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/sektorler/endustriyel-hero.jpg"
            alt="Endüstriyel Sanayi"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/70 via-orange-800/50 to-orange-700/30"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Endüstriyel Sanayi
            <span className="block text-[#d84948]">Vinç Çözümleri</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Endüstriyel üretim ve sanayi tesisleri için güçlü vinç sistemleri
          </p>
          <Link href="/iletisim">
            <Button
              size="lg"
              className="bg-[#d84948] hover:bg-[#c73e3d] text-white px-8 py-4"
            >
              Endüstriyel Çözümler
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Endüstriyel Ürünler
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Yoğun çalışma koşulları için tasarlanmış dayanıklı vinç sistemleri
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {sectorProducts.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-50 rounded-t-lg">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-2 pt-3">
                  <span className="text-xs font-medium text-[#d84948]">
                    {product.category}
                  </span>
                  <CardTitle className="text-sm font-semibold text-gray-900 line-clamp-2">
                    {product.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 pb-3">
                  <Link href={`/urunler/${product.slug}`}>
                    <Button
                      size="sm"
                      className="w-full bg-[#d84948] hover:bg-[#c73e3d] text-white text-xs"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      İncele
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Endüstriyel Uygulamalar
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Sanayi tesisleri için özel çözümler
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {applications.map((app, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="text-[#d84948] mb-4">{app.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {app.title}
                </h3>
                <p className="text-gray-600 text-sm">{app.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#d84948] to-[#c73e3d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Endüstriyel Projeleriniz İçin
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Sanayi tesisleriniz için uzmanlarımızla görüşün
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/urunler">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-[#d84948] hover:bg-gray-100 px-8"
              >
                Endüstriyel Ürünler
              </Button>
            </Link>
            <Link href="/iletisim">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#d84948] px-8"
              >
                Proje Danışmanlığı
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
