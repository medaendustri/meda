"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    id: 1,
    image: "/hero/off-road.jpg",
    title: "El Vinçleri ile Hassas Kontrol",
    subtitle: "Küçük İşler için Büyük Güç",
    description:
      "Dragon Winch el vinçleri, hafif ve orta yük kaldırma işlemlerinde hassas kontrol ve güvenilir performans sağlar.",
    cta: "Ürün Kataloğu",
    ctaLink: "/urunler",
  },
  {
    id: 2,
    image: "/hero/dragon-vinc-elektrikli.jpg",
    title: "Profesyonel Vinç Sistemleri",
    subtitle: "Endüstriyel Güç ve Dayanıklılık",
    description:
      "Ağır sanayi, inşaat ve liman operasyonları için özel tasarlanmış Dragon Winch çekme vinci tamburları ile güvenli ve verimli çalışın.",
    cta: "Teknik Destek",
    ctaLink: "/iletisim",
  },
  {
    id: 3,
    image: "/hero/hidrolik-vinc.jpg",
    title: "Denizcilik Vinç Çözümleri",
    subtitle: "Denizde Güvenilir Performans",
    description:
      "Gemi, yat ve denizcilik sektörü için özel tasarlanmış Dragon Winch ürünleri ile denizde güvenli operasyonlar gerçekleştirin.",
    cta: "Ürün Kataloğu",
    ctaLink: "/urunler",
  },
  {
    id: 4,
    image: "/hero/kurtarma-vinci.jpg",
    title: "Kurtarma Vinç Çözümleri",
    subtitle: "Acil Durumlar için Güçlü Destek",
    description:
      "Dragon Winch kurtarma vinçleri, zorlu koşullarda güvenilir performans sunar. Acil durumlar için ideal çözümler.",
    cta: "Ürün Kataloğu",
    ctaLink: "/urunler",
  },
  {
    id: 5,
    image: "/hero/elektrikli-vinc.jpg",
    title: "Elektrikli Vinç Çözümleri",
    subtitle: "Yüksek Performans, Düşük Bakım",
    description:
      "Dragon Winch elektrikli vinçleri, endüstriyel uygulamalar için enerji verimli ve dayanıklı çözümler sunar.",
    cta: "Ürün Kataloğu",
    ctaLink: "/urunler",
  },
  {
    id: 6,
    image: "/hero/cekme-vinci.jpg",
    title: "Dragon Winch Türkiye Distribütörü",
    subtitle: "Güçlü Çekme, Güvenli Operasyon",
    description:
      "Dragon Winch çekme vinci tamburlarının Türkiye distribütörüyüz. Denizcilik, endüstri ve liman sektörlerinde güvenilir vinç çözümleri sunuyoruz.",
    cta: "Dragon Winch Ürünleri",
    ctaLink: "/urunler",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section
      className="relative h-[700px] flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-slate-700/40" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-[#d84948]/20 border border-[#d84948]/30 rounded-full text-[#ff6b6a] text-sm font-medium backdrop-blur-sm">
            Dragon Winch Yetkili Distribütörü
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          {slides[currentSlide].title.split(" ").slice(0, 2).join(" ")}
          <br />
          <span className="bg-gradient-to-r from-[#d84948] to-[#ff6b6a] bg-clip-text text-transparent">
            {slides[currentSlide].subtitle}
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-4xl mx-auto leading-relaxed font-light">
          {slides[currentSlide].description}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link href={slides[currentSlide].ctaLink}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#d84948] to-[#c73e3d] hover:from-[#c73e3d] hover:to-[#b83332] text-white px-10 py-5 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 border-0"
            >
              {slides[currentSlide].cta}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/iletisim">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 px-10 py-5 text-lg font-semibold bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              Teknik Destek
            </Button>
          </Link>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all duration-300 group"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all duration-300 group"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-[#d84948] scale-125"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
