import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description:
    "Meda Endüstri çerez politikası. Web sitemizde kullanılan çerezler ve analitik araçlar hakkında bilgi.",
  alternates: { canonical: "/cerez" },
};

export default function CookiePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <article className="max-w-3xl mx-auto px-4 prose prose-gray">
        <h1>Çerez Politikası</h1>
        <p className="lead text-gray-600">
          Son güncelleme: {new Date().toLocaleDateString("tr-TR")}
        </p>
        <p>
          Bu site, deneyimi iyileştirmek ve site kullanımını ölçmek için çerezler
          ve benzer teknolojiler kullanabilir.
        </p>
        <h2>Kullanılan Çerez Türleri</h2>
        <ul>
          <li>
            <strong>Zorunlu çerezler:</strong> Sitenin temel işlevleri için
            gereklidir.
          </li>
          <li>
            <strong>Analitik çerezler:</strong> Google Analytics gibi araçlarla
            (yapılandırıldığında) ziyaret istatistikleri toplanabilir.
          </li>
        </ul>
        <h2>Kontrol</h2>
        <p>
          Tarayıcı ayarlarından çerezleri silebilir veya engelleyebilirsiniz.
          Bazı özellikler çerezler olmadan düzgün çalışmayabilir.
        </p>
        <h2>Daha Fazla Bilgi</h2>
        <p>
          Kişisel verilerin işlenmesi hakkında{" "}
          <Link href="/gizlilik">Gizlilik Politikası</Link> sayfamıza bakınız.
          Sorularınız için{" "}
          <a href="mailto:info@medaendustri.com.tr">info@medaendustri.com.tr</a>
        </p>
      </article>
    </div>
  );
}
