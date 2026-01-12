import type { Metadata } from "next";
import {
  Tractor,
  Wheat,
  TreePine,
  Truck,
  ChevronRight,
  Eye,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Tarım Sektörü Vinç Çözümleri | Meda Endüstri",
  description:
    "Tarım sektörü için özel tasarlanmış vinç sistemleri. Traktör, hasat makinesi ve tarım ekipmanları için dayanıklı çözümler.",
  keywords:
    "tarım vinç, traktör vinç, hasat makinesi vinç, tarım ekipmanı vinç",
};

// Sektöre uygun ürünler - sonra değiştirilecek
const sectorProducts = [
  {
    id: 1,
    name: "DWM 3500",
    category: "ATV/UTV Vinçler",
    image: "https://www.dragonwinch.com/en/gfx/1706790734.5068.jpg",
  },
  {
    id: 2,
    name: "DWM 4500",
    category: "ATV/UTV Vinçler",
    image: "https://www.dragonwinch.com/en/gfx/1706790836.8079.jpg",
  },
  {
    id: 3,
    name: "DWK-O 8 HD",
    category: "Manuel Vinçler",
    image: "https://www.dragonwinch.com/en/gfx/1744036066.5817.jpg",
  },
  {
    id: 4,
    name: "DWK 16 V",
    category: "Manuel Vinçler",
    image: "https://www.dragonwinch.com/en/gfx/1744096229.4355.jpg",
  },
  {
    id: 5,
    name: "DWP 3500",
    category: "Portatif Vinçler",
    image: "https://www.dragonwinch.com/en/gfx/1706790734.5068.jpg",
  },
];

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/sektorler/tarim-hero.jpg"
            alt="Tarım Sektörü"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 via-green-800/50 to-green-700/30"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Tarım Sektörü
            <span className="block text-[#d84948]">Vinç Çözümleri</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Tarım ve orman işletmeciliği için dayanıklı vinç sistemleri
          </p>
          <Link href="/iletisim">
            <Button
              size="lg"
              className="bg-[#d84948] hover:bg-[#c73e3d] text-white px-8 py-4"
            >
              Tarım Çözümleri
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
              Tarım Ürünleri
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Zorlu arazi koşulları için tasarlanmış dayanıklı vinç sistemleri
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
              Tarım Uygulamaları
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Tarım ve orman işletmeciliği için özel çözümler
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
            Tarım Projeleriniz İçin
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Tarım işletmeniz için uzmanlarımızla görüşün
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/urunler">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-[#d84948] hover:bg-gray-100 px-8"
              >
                Tarım Ürünleri
              </Button>
            </Link>
            <Link href="/iletisim">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#d84948] px-8"
              >
                Çiftlik Ziyareti
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
