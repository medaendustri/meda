import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, Award, Users, Globe, Lightbulb } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kurumsal - Hakkımızda | Meda Endüstri",
  description:
    "Meda Endüstri olarak 2023 yılından bu yana endüstriyel vinç sistemleri ve ekipman çözümleri sunuyoruz.",
  keywords: [
    "meda endüstri kurumsal",
    "meda endüstri hakkında",
    "endüstriyel vinç",
  ],
  openGraph: {
    title: "Kurumsal - Hakkımızda | Meda Endüstri",
    description:
      "Meda Endüstri olarak endüstriyel vinç sistemleri ve ekipman çözümleri sunuyoruz.",
    type: "website",
    url: "/kurumsal",
  },
  alternates: {
    canonical: "/kurumsal",
  },
};

export default function AboutPage() {
  const values = [
    {
      icon: <Award className="w-7 h-7" />,
      title: "Orijinallik",
      description:
        "Avrupa'nın önde gelen markalarının yetkili distribütörü olarak sadece orijinal ürünler sunuyoruz.",
    },
    {
      icon: <Lightbulb className="w-7 h-7" />,
      title: "Uzmanlık",
      description:
        "Vinç teknolojisi deneyimimiz ile en doğru çözümleri öneriyoruz.",
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: "Güvenilirlik",
      description:
        "Endüstriyel ekipman sektöründeki başarılı geçmişimizle güven veriyoruz.",
    },
    {
      icon: <Globe className="w-7 h-7" />,
      title: "Geniş Erişim",
      description:
        "Türkiye ve bölge ülkelerinde yüksek kaliteli vinç ürünlerine kolay erişim sağlıyoruz.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Hakkımızda
            </h1>
          </div>

          {/* About Text */}
          <div className="text-gray-600 space-y-5 text-lg leading-relaxed">
            <p>
              <strong className="text-gray-900">Meda Endüstri</strong>, 2023
              yılında İstanbul'da kurulmuş, endüstriyel ekipman ve vinç
              sistemleri alanında faaliyet gösteren bir tedarikçidir.
            </p>
            <p>
              Firmamız, denizcilik, savunma sanayi, endüstriyel üretim ve tarım
              sektörlerinde faaliyet gösteren işletmelere yüksek kaliteli çekme
              vinci tamburu ve vinç sistemleri sunmaktadır. Avrupa
              standartlarında üretilen ürün portföyümüzü Türkiye pazarına
              taşıyarak, müşterilerimizin operasyonel verimliliğini artırmayı
              hedefliyoruz.
            </p>
            <p>
              Genç ve dinamik ekibimizle, satış öncesi teknik danışmanlıktan
              satış sonrası servis desteğine kadar kapsamlı hizmetler sunuyoruz.
              Geniş stok kapasitemiz sayesinde müşterilerimizin acil
              ihtiyaçlarını hızlı bir şekilde karşılayabilecek altyapıya
              sahibiz.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vision */}
            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center pb-3">
                <div className="mx-auto mb-3 p-3 bg-[#d84948] rounded-xl w-fit">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Vizyonumuz
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center px-6 pb-6">
                <p className="text-gray-600 leading-relaxed">
                  Çekme vinci tamburları ve vinç sistemlerinde bölgenin en
                  güvenilir ve tercih edilen tedarikçisi olmak. Vinç
                  teknolojilerinde uzmanlaşarak, müşterilerimize en kaliteli
                  ürünler ve hizmetler sunmak.
                </p>
              </CardContent>
            </Card>

            {/* Mission */}
            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center pb-3">
                <div className="mx-auto mb-3 p-3 bg-[#d84948] rounded-xl w-fit">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Misyonumuz
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center px-6 pb-6">
                <p className="text-gray-600 leading-relaxed">
                  Müşterilerimizin çekme vinci ihtiyaçlarını kaliteli ürünlerle
                  karşılamak. Satış öncesi danışmanlık ve satış sonrası teknik
                  destek ile müşteri memnuniyetini en üst düzeyde tutmak.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Değerlerimiz
            </h2>
            <p className="text-gray-600">Benimsediğimiz temel değerler</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
              >
                <CardHeader className="pb-2 pt-5">
                  <div className="mx-auto mb-3 p-3 bg-[#d84948]/10 rounded-lg w-fit group-hover:bg-[#d84948] transition-all duration-300">
                    <div className="text-[#d84948] group-hover:text-white transition-colors duration-300">
                      {value.icon}
                    </div>
                  </div>
                  <CardTitle className="text-base font-semibold text-gray-900">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-5">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
