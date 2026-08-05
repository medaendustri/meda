import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, ArrowRight, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Teşekkürler - Talebiniz Alındı",
  description:
    "Teklif talebiniz başarıyla alındı. Meda Endüstri ekibi en kısa sürede sizinle iletişime geçecek.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/tesekkur" },
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center">
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Talebiniz Alındı
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Teşekkür ederiz. Uzman ekibimiz talebinizi inceleyerek en kısa sürede
          sizinle iletişime geçecektir.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <a href="tel:+905387344389">
            <Button size="lg" className="bg-[#d84948] hover:bg-[#c73e3d] w-full sm:w-auto">
              <Phone className="w-4 h-4 mr-2" />
              Hemen Ara
            </Button>
          </a>
          <Link href="/urunler">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Ürünlere Dön
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
        <Link
          href="/katalog"
          className="inline-flex items-center text-[#d84948] hover:underline font-medium"
        >
          <Download className="w-4 h-4 mr-2" />
          Katalogları inceleyin
        </Link>
      </div>
    </div>
  );
}
