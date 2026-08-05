import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description:
    "Meda Endüstri gizlilik politikası. Kişisel verilerinizin nasıl toplandığı, kullanıldığı ve korunduğu hakkında bilgi.",
  alternates: { canonical: "/gizlilik" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <article className="max-w-3xl mx-auto px-4 prose prose-gray">
        <h1>Gizlilik Politikası</h1>
        <p className="lead text-gray-600">
          Son güncelleme: {new Date().toLocaleDateString("tr-TR")}
        </p>
        <p>
          Meda Endüstri olarak,{" "}
          <Link href="/iletisim">iletişim formumuz</Link> ve web sitemiz
          aracılığıyla paylaştığınız kişisel verilerin gizliliğine önem
          veriyoruz. Bu politika, 6698 sayılı Kişisel Verilerin Korunması
          Kanunu (KVKK) kapsamında bilgilendirme amaçlıdır.
        </p>
        <h2>Toplanan Veriler</h2>
        <p>
          Teklif ve iletişim taleplerinde ad, şirket adı, e-posta, telefon ve
          mesaj içeriği gibi bilgileri toplarız. Bu veriler yalnızca talebinize
          yanıt vermek ve ticari ilişki kurmak için kullanılır.
        </p>
        <h2>Verilerin Kullanımı</h2>
        <ul>
          <li>Teklif ve destek taleplerinin yanıtlanması</li>
          <li>Ürün ve hizmet bilgilendirmesi (açık rızanız varsa)</li>
          <li>Yasal yükümlülüklerin yerine getirilmesi</li>
        </ul>
        <h2>Veri Güvenliği</h2>
        <p>
          Verileriniz yetkisiz erişime karşı makul teknik ve idari önlemlerle
          korunur. Üçüncü taraflarla paylaşım yalnızca hizmet sunumu için gerekli
          olduğunda veya yasal zorunluluk halinde yapılır.
        </p>
        <h2>Haklarınız</h2>
        <p>
          KVKK kapsamında verilerinize erişim, düzeltme, silme ve itiraz
          haklarınızı kullanmak için{" "}
          <a href="mailto:info@medaendustri.com.tr">info@medaendustri.com.tr</a>{" "}
          adresinden bize ulaşabilirsiniz.
        </p>
        <h2>İletişim</h2>
        <p>
          Meda Endüstri — İvedik OSB Matbaacılar Sitesi 1514. Sokak No:22,
          Yenimahalle/Ankara —{" "}
          <a href="tel:+905387344389">+90 538 734 4389</a>
        </p>
      </article>
    </div>
  );
}
