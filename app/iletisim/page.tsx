"use client";

import type React from "react";
import type { Metadata } from "next";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Anchor,
  Headphones,
  CheckCircle,
  Globe,
  Shield,
  Wrench,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
    department: "genel",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Reset form
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          subject: "",
          message: "",
          department: "genel",
        });
        setIsSubmitted(true);

        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        const errorData = await response.json();
        alert(`Hata: ${errorData.error || "E-posta gönderilemedi"}`);
      }
    } catch (error) {
      console.error("Form gönderme hatası:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-[#d84948]" />,
      title: "Meda Vinç Sanayi ve Kontrol Sistemleri A.Ş.",
      details: [
        "İvedik OSB Matbaacılar Sitesi  ",
        "1514. Sokak No:22",
        "Yenimahalle Ankara",
      ],
      highlight: "Ana Distribütör",
    },
    {
      icon: <Phone className="w-6 h-6 text-[#d84948]" />,
      title: "Telefon",
      details: ["+90 538 734 4389"],
      highlight: "Anında Ulaşım",
    },
    {
      icon: <Mail className="w-6 h-6 text-[#d84948]" />,
      title: "E-posta",
      details: ["info@medaendustri.com"],
      highlight: "Hızlı Yanıt",
    },
  ];

  const departments = [
    {
      name: "Dragon Winch Satış",
      phone: "+90 212 555 0125",
      email: "dragonwinch@medaendustri.com",
      description: "Dragon Winch ürün bilgileri ve fiyat teklifleri",
      icon: <Anchor className="w-5 h-5" />,
      color: "bg-[#d84948]",
    },
    {
      name: "Teknik Destek & Servis",
      phone: "+90 212 555 0126",
      email: "destek@medaendustri.com",
      description: "7/24 vinç teknik yardım ve bakım hizmetleri",
      icon: <Headphones className="w-5 h-5" />,
      color: "bg-blue-500",
    },
    {
      name: "Yedek Parça",
      phone: "+90 212 555 0127",
      email: "yedekparca@medaendustri.com",
      description: "Dragon Winch orijinal yedek parça temini",
      icon: <Wrench className="w-5 h-5" />,
      color: "bg-green-500",
    },
  ];

  const features = [
    {
      icon: <CheckCircle className="w-6 h-6 text-[#d84948]" />,
      title: "24 Saat İçinde Yanıt",
      description:
        "Dragon Winch sorularınıza en geç 24 saat içinde dönüş yapıyoruz",
    },
    {
      icon: <Shield className="w-6 h-6 text-[#d84948]" />,
      title: "Yetkili Distribütör Garantisi",
      description:
        "Dragon Winch yetkili distribütörü olarak orijinal ürün garantisi",
    },
    {
      icon: <Globe className="w-6 h-6 text-[#d84948]" />,
      title: "Bölgesel Hizmet Ağı",
      description: "Türkiye ve bölge ülkelerinde Dragon Winch servis desteği",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-[#d84948]/5 via-gray-50 to-[#d84948]/10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-[#d84948]/10 rounded-full text-[#d84948] font-medium text-sm mb-6">
              <MessageCircle className="w-4 h-4 mr-2" />
              Dragon Winch Distribütörü
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              İletişim
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Dragon Winch çekme vinci tamburu ihtiyaçlarınız için bizimle
              iletişime geçin. Uzman ekibimiz size en uygun vinç çözümünü bulmak
              için hazır.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="shadow-2xl border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#d84948] to-[#c73e3d] text-white p-8">
                <CardTitle className="text-2xl font-bold flex items-center mb-3">
                  <MessageCircle className="w-6 h-6 mr-3" />
                  Meda Endüstri Winch Teklif Formu
                </CardTitle>
                <p className="text-white/90 text-base">
                  Vinç ihtiyaçlarınızı belirtin, size en uygun Meda Endüstri
                  Vinç çözümünü önerelim.
                </p>
              </CardHeader>
              <CardContent className="p-8">
                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <div>
                      <p className="text-green-800 font-medium">
                        Talebiniz başarıyla gönderildi!
                      </p>
                      <p className="text-green-600 text-sm">
                        Meda Endüstri uzmanımız en kısa sürede size dönüş
                        yapacak.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-sm font-medium text-gray-700"
                      >
                        Ad Soyad *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Adınızı ve soyadınızı girin"
                        className="border-gray-200 focus:border-[#d84948] focus:ring-[#d84948]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="company"
                        className="text-sm font-medium text-gray-700"
                      >
                        Şirket / Sektör
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Şirket adı ve sektör"
                        className="border-gray-200 focus:border-[#d84948] focus:ring-[#d84948]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700"
                      >
                        E-posta *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="E-posta adresinizi girin"
                        className="border-gray-200 focus:border-[#d84948] focus:ring-[#d84948]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-sm font-medium text-gray-700"
                      >
                        Telefon
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Telefon numaranız"
                        className="border-gray-200 focus:border-[#d84948] focus:ring-[#d84948]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="department"
                      className="text-sm font-medium text-gray-700"
                    >
                      Vinç Türü / İhtiyaç
                    </Label>
                    <select
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-[#d84948] focus:ring-[#d84948] focus:outline-none"
                    >
                      <option value="genel">Genel Bilgi</option>
                      <option value="denizcilik">Denizcilik Vinçleri</option>
                      <option value="endustriyel">Endüstriyel Vinçler</option>
                      <option value="liman">Liman Ekipmanları</option>
                      <option value="yedekparca">Yedek Parça</option>
                      <option value="servis">Teknik Servis</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="subject"
                      className="text-sm font-medium text-gray-700"
                    >
                      Konu *
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Dragon Winch talebi konusu"
                      className="border-gray-200 focus:border-[#d84948] focus:ring-[#d84948]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-sm font-medium text-gray-700"
                    >
                      Vinç İhtiyacınız *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Çekme kapasitesi, kullanım alanı, teknik özellikler gibi detayları belirtin..."
                      rows={6}
                      className="resize-none border-gray-200 focus:border-[#d84948] focus:ring-[#d84948]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#d84948] hover:bg-[#c73e3d] text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isSubmitting ? (
                      "Gönderiliyor..."
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Teklif Talep Et
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="shadow-2xl border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-[#d84948]/5 p-8">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-3">
                  Meda Endüstri İletişim
                </CardTitle>
                <p className="text-gray-600 text-base">
                  Yetkili distribütör iletişim bilgileri
                </p>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="group">
                    <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                      <div className="flex-shrink-0 p-3 bg-[#d84948]/10 rounded-xl group-hover:bg-[#d84948]/20 transition-colors duration-300">
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {info.title}
                          </h3>
                          <span className="text-xs px-2 py-1 bg-[#d84948]/10 text-[#d84948] rounded-full">
                            {info.highlight}
                          </span>
                        </div>
                        {info.details.map((detail, detailIndex) => (
                          <p
                            key={detailIndex}
                            className="text-gray-600 text-sm mb-1"
                          >
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card className="shadow-2xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#d84948] to-[#c73e3d] text-white p-8">
              <CardTitle className="text-2xl font-bold flex items-center mb-3">
                <MapPin className="w-6 h-6 mr-3" />
                Meda Vinç Sanayi ve Kontrol Sistemleri A.Ş.
              </CardTitle>
              <p className="text-white/90 text-base">
                Meda Vinç ürünlerini görmek ve teknik destek almak için
                merkezimizi ziyaret edebilirsiniz.
              </p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative h-96 bg-gray-200 overflow-hidden">
                {/* Google Maps Embed - Replace with actual coordinates */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d238.92195177206747!2d32.76380703558084!3d39.997087281039576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1str!2str!4v1757484161013!5m2!1str!2str"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Dragon Winch Distribütör Merkezi"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
