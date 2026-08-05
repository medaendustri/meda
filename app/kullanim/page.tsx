import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kullanım Şartları",
  description:
    "Meda Endüstri web sitesi kullanım şartları. Site içeriği, sorumluluk sınırları ve kullanım koşulları.",
  alternates: { canonical: "/kullanim" },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <article className="max-w-3xl mx-auto px-4 prose prose-gray">
        <h1>Kullanım Şartları</h1>
        <p className="lead text-gray-600">
          Son güncelleme: {new Date().toLocaleDateString("tr-TR")}
        </p>
        <p>
          Bu web sitesini kullanarak aşağıdaki şartları kabul etmiş
          sayılırsınız. Meda Endüstri, Dragon Winch ürünlerinin Türkiye
          distribütörüdür.
        </p>
        <h2>İçerik</h2>
        <p>
          Sitedeki ürün bilgileri, teknik özellikler ve görseller bilgilendirme
          amaçlıdır. Fiyat, stok ve teknik detaylar teklif aşamasında
          doğrulanır. Yanlışlık veya eksiklik halinde{" "}
          <Link href="/iletisim">bizimle iletişime</Link> geçiniz.
        </p>
        <h2>Fikri Mülkiyet</h2>
        <p>
          Site tasarımı, metinler ve Meda Endüstri markası şirketimize aittir.
          Dragon Winch markası ve ürün görselleri ilgili hak sahiplerine aittir.
          İzinsiz kopyalama ve ticari kullanım yasaktır.
        </p>
        <h2>Sorumluluk Sınırı</h2>
        <p>
          Web sitesinin kesintisiz veya hatasız çalışacağı garanti edilmez.
          Sitenin kullanımından doğabilecek dolaylı zararlardan Meda Endüstri
          sorumlu tutulamaz.
        </p>
        <h2>Değişiklikler</h2>
        <p>
          Bu şartlar önceden haber vermeksizin güncellenebilir. Güncel metin her
          zaman bu sayfada yayınlanır.
        </p>
      </article>
    </div>
  );
}
