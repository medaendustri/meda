import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Award,
  Shield,
  Globe,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";

export function Footer() {
  const quickLinks = [
    { href: "/kurumsal", label: "Hakkımızda" },
    { href: "/sertifikalar", label: "Sertifikalarımız" },
    { href: "/urunler", label: "Dragon Winch Ürünleri" },
    { href: "/markalar", label: "Stratejik Ortaklarımız" },
    { href: "/haberler", label: "Haberler" },
    { href: "/iletisim", label: "İletişim" },
  ];

  const productCategories = [
    { href: "/urunler?category=marine", label: "Denizcilik Vinçleri" },
    { href: "/urunler?category=industrial", label: "Endüstriyel Vinçler" },
    { href: "/urunler?category=port", label: "Liman Ekipmanları" },
    { href: "/urunler?category=parts", label: "Yedek Parçalar" },
    { href: "/urunler?category=service", label: "Servis Hizmetleri" },
  ];

  const certifications = [
    { name: "Dragon Winch Yetkili", icon: <Award className="w-4 h-4" /> },
    { name: "ISO 9001:2015", icon: <Shield className="w-4 h-4" /> },
    { name: "CE Uygunluk", icon: <Globe className="w-4 h-4" /> },
  ];

  const socialLinks = [
    { href: "#", icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn" },
    { href: "#", icon: <Twitter className="w-5 h-5" />, label: "Twitter" },
    { href: "#", icon: <Youtube className="w-5 h-5" />, label: "YouTube" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center">
              <div className="w-20 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                <img src="/meda-logo.webp" alt="" />
              </div>
              <div className="ml-3">
                <span className="text-xl font-bold text-white">
                  Meda Endüstri
                </span>
                <div className="text-xs text-gray-400">
                  Dragon Winch Yetkili Distribütörü
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              2009&apos;dan beri Dragon Winch çekme vinci tamburlarının Türkiye
              ve bölge ülkeleri distribütörü olarak, denizcilik, endüstri ve
              liman sektörlerinde güvenilir vinç çözümleri sunuyoruz.
            </p>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">
                Sosyal Medya
              </h4>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="p-2 bg-white/10 rounded-lg hover:bg-[#d84948] transition-colors group"
                    aria-label={social.label}
                  >
                    <div className="text-gray-300 group-hover:text-white transition-colors">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Hızlı Erişim</h3>
            <nav className="flex flex-col space-y-3">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-300 hover:text-[#d84948] text-sm transition-colors group flex items-center"
                >
                  <span className="w-1 h-1 bg-[#d84948] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Product Categories */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">
              Dragon Winch Ürünleri
            </h3>
            <nav className="flex flex-col space-y-3">
              {productCategories.map((category, index) => (
                <Link
                  key={index}
                  href={category.href}
                  className="text-gray-300 hover:text-[#d84948] text-sm transition-colors group flex items-center"
                >
                  <span className="w-1 h-1 bg-[#d84948] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {category.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">
              İletişim Bilgileri
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#d84948] mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p>İvedik OSB Matbaacılar Sitesi 1514. Sokak No:22 </p>
                  <p>Yenimahalle/Ankara</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#d84948] flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p>info@medaendustri.com</p>
                  <p className="text-xs text-gray-400">24 saat içinde yanıt</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <p>
                © 2024 Meda Endüstri - Dragon Winch Yetkili Distribütörü. Tüm
                hakları saklıdır.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="/gizlilik"
                  className="hover:text-[#d84948] transition-colors"
                >
                  Gizlilik Politikası
                </Link>
                <Link
                  href="/kullanim"
                  className="hover:text-[#d84948] transition-colors"
                >
                  Kullanım Şartları
                </Link>
                <Link
                  href="/cerez"
                  className="hover:text-[#d84948] transition-colors"
                >
                  Çerez Politikası
                </Link>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              <span>Tasarım: </span>
              <span className="text-[#d84948] font-medium">
                Meda Endüstri Dijital Ekibi
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
