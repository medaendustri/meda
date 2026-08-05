import { Anchor, Ship, Waves, Compass, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SectorProducts } from "@/components/sector-products";
import { FaqSection } from "@/components/faq-section";
import { getAllProducts } from "@/lib/db";

const sectorProductNames = [
  "DWM 13000 HD",
  "DWM 12000 HD",
  "DWP 5000",
  "DWP 3500",
  "DWK-O 12 HD",
];

export default async function DenizcilikPage() {
  const { products: allProducts } = await getAllProducts({ perPage: 500 });
  const matchedProducts = allProducts.filter((product) =>
    sectorProductNames.includes(product.name),
  );
  const sectorProducts = (matchedProducts.length
    ? matchedProducts
    : allProducts
  ).slice(0, 5);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero/hidrolik-vinc.jpg"
            alt="Denizcilik"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-800/50 to-blue-700/30"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Denizcilik
            <span className="block text-[#d84948]">Vinç Çözümleri</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Deniz koşullarına dayanıklı vinç sistemleri ile güvenli seyir
          </p>
          <Link href="/iletisim">
            <Button
              size="lg"
              className="bg-[#d84948] hover:bg-[#c73e3d] text-white px-8 py-4"
            >
              Marine Çözümler
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <SectorProducts
        products={sectorProducts}
        title="Denizcilik Ürünleri"
        description="Deniz koşullarına dayanıklı, korozyona dirençli vinç sistemleri"
      />

      {/* Applications Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Denizcilik Uygulamaları
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Her türlü deniz aracı için özel çözümler
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

      <FaqSection />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#d84948] to-[#c73e3d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Denizcilik Projeleriniz İçin
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Deniz koşullarına uygun çözümler için uzmanlarımızla görüşün
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/urunler">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-[#d84948] hover:bg-gray-100 px-8"
              >
                Marine Ürünler
              </Button>
            </Link>
            <Link href="/iletisim">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#d84948] px-8"
              >
                Teklif Al
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
