import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Sektörel Vinç Çözümleri",
  description:
    "Denizcilik, savunma sanayi, endüstriyel üretim ve tarım için Dragon Winch vinç çözümlerini inceleyin.",
  alternates: { canonical: "/sektorler" },
  openGraph: {
    title: "Sektörel Vinç Çözümleri | Meda Endüstri",
    description:
      "Farklı çalışma koşullarına uygun Dragon Winch vinç ve kurtarma sistemleri.",
    url: "/sektorler",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

const sectors = [
  {
    title: "Savunma Sanayi",
    description: "Askeri araçlar ve kritik saha operasyonları için çözümler.",
    href: "/sektorler/savunma-sanayi",
    image: "/hero/kurtarma-vinci.jpg",
  },
  {
    title: "Denizcilik",
    description: "Gemi, yat, tekne ve liman uygulamalarına uygun sistemler.",
    href: "/sektorler/denizcilik",
    image: "/hero/hidrolik-vinc.jpg",
  },
  {
    title: "Endüstriyel Sanayi",
    description: "Üretim, bakım ve ağır hizmet operasyonları için vinçler.",
    href: "/sektorler/endustriyel-sanayi",
    image: "/hero/elektrikli-vinc.jpg",
  },
  {
    title: "Tarım",
    description: "Tarım araçları ve zorlu arazi koşulları için çözümler.",
    href: "/sektorler/tarim",
    image: "/hero/off-road.jpg",
  },
];

export default function SectorsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="border-b bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#d84948]">
            Uygulama alanları
          </p>
          <h1 className="mb-5 text-4xl font-bold text-gray-900 md:text-5xl">
            Sektörel Vinç Çözümleri
          </h1>
          <p className="text-lg leading-relaxed text-gray-600">
            Operasyon koşullarınıza uygun Dragon Winch ürünlerini sektörünüze
            göre keşfedin.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2">
          {sectors.map((sector) => (
            <Link
              key={sector.href}
              href={sector.href}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[16/8] overflow-hidden">
                <Image
                  src={sector.image}
                  alt={sector.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/75 via-gray-900/20 to-transparent" />
              </div>
              <div className="p-6">
                <h2 className="mb-2 text-2xl font-bold text-gray-900">
                  {sector.title}
                </h2>
                <p className="mb-5 text-gray-600">{sector.description}</p>
                <span className="inline-flex items-center font-semibold text-[#d84948]">
                  Çözümleri incele
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
