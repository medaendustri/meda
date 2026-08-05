export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  image: string;
  featured?: boolean;
}

export const newsArticles: NewsArticle[] = [
  {
    slug: "cekme-vinci-tamburu-nasil-secilir",
    title: "Çekme Vinci Tamburu Nasıl Seçilir? Teknik Rehber",
    excerpt:
      "Çekme kapasitesi, halat tipi, voltaj ve montaj seçeneklerine göre doğru Dragon Winch modelini seçmek için pratik bir rehber.",
    content: `
<p>Doğru çekme vinci tamburu seçimi, güvenlik ve operasyonel verimlilik için kritiktir. Meda Endüstri olarak Dragon Winch ürün yelpazesinde model seçerken şu kriterlere bakmanızı öneririz.</p>
<h2>1. Çekme kapasitesi</h2>
<p>Aracınızın veya yükünüzün ağırlığına göre en az %1,5 güvenlik payı bırakın. Off-road kurtarma için araç ağırlığının 1,5 katı; ağır sanayi için uygulama spesifik hesaplama gerekir.</p>
<h2>2. Halat tipi: çelik tel vs sentetik</h2>
<p>Çelik tel yüksek aşınma dayanımı sunar; sentetik halat daha hafif ve daha güvenlidir. Denizcilik ve tarımda sentetik tercih artmaktadır.</p>
<h2>3. Güç kaynağı</h2>
<p>12V / 24V elektrik vinçler araç uygulamalarında yaygındır. Hidrolik sistemler sürekli ağır yük için uygundur.</p>
<h2>4. Montaj ve aksesuarlar</h2>
<p>Montaj plakası, makara, kanca ve koruma kılıfı gibi aksesuarlar güvenli kullanım için tamamlayıcıdır. Stok ve teslimat için bizimle iletişime geçin.</p>
<p>Ürün karşılaştırması için <a href="/urunler">ürün kataloğumuzu</a> inceleyin veya <a href="/iletisim">teklif formu</a> doldurun.</p>
`,
    date: "2025-11-12",
    readTime: "6 dk",
    author: "Meda Endüstri Teknik Ekip",
    category: "Rehber",
    image: "/opengraph-image",
    featured: true,
  },
  {
    slug: "dragon-winch-turkiye-distributorluk",
    title: "Dragon Winch Türkiye Distribütörlüğü: Meda Endüstri",
    excerpt:
      "Meda Endüstri, Dragon Winch markasının Türkiye’deki yetkili distribütörüdür. Satış, stok ve teknik destek tek çatı altında.",
    content: `
<p>Meda Endüstri, Dragon Winch çekme vinci tamburu ve kurtarma vinçlerinin Türkiye yetkili distribütörüdür. Ankara İvedik OSB’deki merkezimizden ülke çapında satış ve servis desteği sunuyoruz.</p>
<h2>Neden yetkili distribütör?</h2>
<ul>
<li>Orijinal ürün ve yedek parça garantisi</li>
<li>Teknik seçim ve uygulama danışmanlığı</li>
<li>Hızlı stok ve teslimat</li>
<li>Satış sonrası destek</li>
</ul>
<p>Marka ortaklığımız hakkında detay için <a href="/markalar">Markalar</a> sayfamızı ziyaret edin.</p>
`,
    date: "2025-10-03",
    readTime: "4 dk",
    author: "Meda Endüstri",
    category: "Kurumsal",
    image: "/opengraph-image",
  },
  {
    slug: "denizcilik-vinc-sistemleri",
    title: "Denizcilik Vinç Sistemleri: Marine Uygulamalar",
    excerpt:
      "Yat, tekne ve liman uygulamalarında marine vinç seçiminde dikkat edilmesi gereken korozyon, IP koruma ve montaj unsurları.",
    content: `
<p>Deniz ortamı, vinç sistemleri için tuz, nem ve sürekli titreşim gibi zorlu koşullar getirir. Dragon Winch marine serisi bu koşullara göre tasarlanmıştır.</p>
<h2>Öne çıkan noktalar</h2>
<ul>
<li>Korozyona dayanıklı malzemeler</li>
<li>Güvenilir fren ve kontrol sistemleri</li>
<li>Gemi, yat ve liman ekipmanı uyumu</li>
</ul>
<p>Detaylı çözümler için <a href="/sektorler/denizcilik">Denizcilik sektörü</a> sayfamıza bakın.</p>
`,
    date: "2025-09-18",
    readTime: "5 dk",
    author: "Meda Endüstri",
    category: "Sektör",
    image: "/opengraph-image",
  },
  {
    slug: "kurtarma-vinci-vs-cekme-vinci",
    title: "Kurtarma Vinci ile Çekme Vinci Arasındaki Farklar",
    excerpt:
      "Recovery winch ve standart çekme vinci arasındaki farkları, kullanım senaryolarını ve doğru seçim kriterlerini özetliyoruz.",
    content: `
<p>Kurtarma (recovery) vinçleri genellikle arazi ve acil çekme senaryoları için optimize edilirken, endüstriyel çekme vinçleri sürekli iş döngüsü ve ağır yük için tasarlanır.</p>
<h2>Ne zaman recovery?</h2>
<p>Off-road, tarım ve araç kurtarma uygulamalarında recovery winch tercih edilir.</p>
<h2>Ne zaman endüstriyel çekme?</h2>
<p>Fabrika, liman, savunma ve sabit montajlı sürekli kullanımda endüstriyel seriler daha uygundur.</p>
<p><a href="/urunler">Ürün listemizden</a> modelleri karşılaştırabilir veya <a href="/iletisim">uzman desteği</a> alabilirsiniz.</p>
`,
    date: "2025-08-22",
    readTime: "5 dk",
    author: "Teknik Ekip",
    category: "Rehber",
    image: "/opengraph-image",
  },
  {
    slug: "iso-ce-kalite-standartlari",
    title: "ISO ve CE: Vinç Sistemlerinde Kalite Standartları",
    excerpt:
      "CE uygunluk ve kalite yönetim standartlarının endüstriyel vinç tedarikinde neden kritik olduğunu açıklıyoruz.",
    content: `
<p>Endüstriyel ekipman tedarikinde CE işaretlemesi ve kalite yönetim süreçleri, hem yasal uyum hem de operasyonel güvenlik için önemlidir.</p>
<p>Meda Endüstri olarak temsil ettiğimiz Dragon Winch ürünlerinde kalite belgelerini ve uygulama uygunluğunu müşterilerimizle şeffaf şekilde paylaşıyoruz. Sertifikalarımız için <a href="/sertifikalar">Sertifikalar</a> sayfamızı inceleyin.</p>
`,
    date: "2025-07-10",
    readTime: "3 dk",
    author: "Kalite",
    category: "Sertifika",
    image: "/opengraph-image",
  },
];

export function getAllNews(): NewsArticle[] {
  return [...newsArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((article) => article.slug === slug);
}

export function getFeaturedNews(): NewsArticle | undefined {
  return getAllNews().find((a) => a.featured) || getAllNews()[0];
}
