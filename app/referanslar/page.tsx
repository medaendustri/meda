import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2, Ship, Shield, Factory, Tractor, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Referanslar ve Uygulamalar",
  description:
    "Meda Endüstri’nin denizcilik, savunma, endüstriyel sanayi ve tarım sektörlerindeki Dragon Winch uygulama alanları ve referans sektörleri.",
  openGraph: {
    title: "Referanslar ve Uygulamalar | Meda Endüstri",
    description:
      "Denizcilik, savunma, endüstriyel sanayi ve tarımda Dragon Winch uygulama alanları.",
    url: "/referanslar",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  alternates: { canonical: "/referanslar" },
};

const cases = [
  {
    icon: Ship,
    sector: "Denizcilik",
    title: "Marine vinç ve liman ekipmanları",
    summary:
      "Yat, tekne ve liman operasyonlarında korozyona dayanıklı çekme ve bağlama çözümleri.",
    href: "/sektorler/denizcilik",
  },
  {
    icon: Shield,
    sector: "Savunma Sanayi",
    title: "Askeri ve güvenlik uygulamaları",
    summary:
      "Ağır hizmet kurtarma ve taşıma senaryoları için yüksek kapasiteli vinç sistemleri.",
    href: "/sektorler/savunma-sanayi",
  },
  {
    icon: Factory,
    sector: "Endüstriyel Sanayi",
    title: "Üretim ve fabrika hatları",
    summary:
      "Sürekli iş döngüsüne uygun endüstriyel çekme vinçleri ve montaj aksesuarları.",
    href: "/sektorler/endustriyel-sanayi",
  },
  {
    icon: Tractor,
    sector: "Tarım",
    title: "Tarım ve arazi ekipmanları",
    summary:
      "Traktör ve tarım makineleri için dayanıklı recovery ve çekme çözümleri.",
    href: "/sektorler/tarim",
  },
];

export default function ReferencesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-[#d84948] text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Building2 className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Referanslar</h1>
          <p className="text-xl text-white/80">
            Dragon Winch uygulamalarımızın öne çıktığı sektörler ve çözüm
            alanları.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {cases.map((item) => (
            <Link
              key={item.sector}
              href={item.href}
              className="block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-[#d84948]/30 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#d84948]/10 rounded-lg">
                  <item.icon className="w-6 h-6 text-[#d84948]" />
                </div>
                <span className="text-sm font-medium text-[#d84948]">
                  {item.sector}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#d84948] transition-colors">
                {item.title}
              </h2>
              <p className="text-gray-600 mb-4">{item.summary}</p>
              <span className="inline-flex items-center text-sm font-medium text-[#d84948]">
                Sektör sayfası
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center bg-white rounded-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Projenizi konuşalım
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Benzer bir uygulama ihtiyacınız varsa teknik ekibimiz doğru modeli
            seçmenize yardımcı olur.
          </p>
          <Link href="/iletisim">
            <Button size="lg" className="bg-[#d84948] hover:bg-[#c73e3d]">
              Teklif Alın
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
