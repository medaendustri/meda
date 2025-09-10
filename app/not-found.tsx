import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sayfa Bulunamadı - 404",
  description:
    "Aradığınız sayfa bulunamadı. Ana sayfaya dönerek devam edebilirsiniz.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Sayfa Bulunamadı
          </h2>
          <p className="text-gray-600 mb-8">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            Ana Sayfaya Dön
          </Link>

          <div className="text-sm">
            <p className="text-gray-500 mb-2">Popüler Sayfalar:</p>
            <div className="space-x-4">
              <Link href="/urunler" className="text-red-600 hover:underline">
                Ürünler
              </Link>
              <Link href="/kurumsal" className="text-red-600 hover:underline">
                Kurumsal
              </Link>
              <Link href="/iletisim" className="text-red-600 hover:underline">
                İletişim
              </Link>
            </div>
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "404 - Sayfa Bulunamadı",
              description: "Aradığınız sayfa bulunamadı",
              url: `${
                process.env.NEXT_PUBLIC_SITE_URL ||
                "https://www.medaendustri.com"
              }/404`,
              isPartOf: {
                "@type": "WebSite",
                name: "Meda Endüstri",
                url:
                  process.env.NEXT_PUBLIC_SITE_URL ||
                  "https://www.medaendustri.com",
              },
              potentialAction: {
                "@type": "ReadAction",
                target:
                  process.env.NEXT_PUBLIC_SITE_URL ||
                  "https://www.medaendustri.com",
              },
            }),
          }}
        />
      </div>
    </div>
  );
}
