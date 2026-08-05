import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, Download, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Ürün Kataloğu - Dragon Winch PDF",
  description:
    "Dragon Winch ürün kataloğunu indirin. Çekme vinci tamburu, kurtarma vinçleri ve endüstriyel vinç modellerinin teknik özellikleri.",
  openGraph: {
    title: "Ürün Kataloğu - Dragon Winch PDF | Meda Endüstri",
    description:
      "Dragon Winch ürün kataloğunu indirin. Teknik özellikler ve model karşılaştırmaları.",
    url: "/katalog",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "/katalog",
  },
};

const catalogs = [
  {
    title: "Dragon Winch Katalog 2025",
    description: "Güncel ürün yelpazesi, teknik özellikler ve model seçenekleri.",
    href: "/dragon-winch-katalog-2025.pdf",
    year: "2025",
  },
  {
    title: "Dragon Winch Katalog",
    description: "Dragon Winch çekme vinci ve aksesuar kataloğu.",
    href: "/dragon-winch-katalog.pdf",
    year: "Genel",
  },
];

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-[#d84948] text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Ürün Kataloğu</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Dragon Winch ürün kataloglarını doğrudan indirebilirsiniz.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid gap-6 mb-12">
          {catalogs.map((catalog) => (
            <div
              key={catalog.href}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#d84948]/10 rounded-lg">
                  <FileText className="w-8 h-8 text-[#d84948]" />
                </div>
                <div>
                  <div className="text-xs font-medium text-[#d84948] mb-1">
                    {catalog.year}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    {catalog.title}
                  </h2>
                  <p className="text-gray-600 text-sm">{catalog.description}</p>
                </div>
              </div>
              <a href={catalog.href} target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#d84948] hover:bg-[#c73e3d] whitespace-nowrap">
                  <Download className="w-4 h-4 mr-2" />
                  PDF İndir
                </Button>
              </a>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#d84948] to-[#c73e3d] rounded-2xl p-8 text-white text-center">
          <Phone className="w-10 h-10 mx-auto mb-4 opacity-90" />
          <h2 className="text-2xl font-bold mb-3">
            Özel Teklif mi İstiyorsunuz?
          </h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Fiyat ve teslimat için bizi arayın veya WhatsApp’tan yazın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+905387344389">
              <Button
                size="lg"
                className="bg-white text-[#d84948] hover:bg-gray-100"
              >
                <Phone className="w-4 h-4 mr-2" />
                +90 538 734 4389
              </Button>
            </a>
            <Link href="/urunler">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 bg-transparent"
              >
                Ürünleri İncele
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
