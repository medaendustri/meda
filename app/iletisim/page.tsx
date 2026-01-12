"use client";

import type React from "react";
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
  CheckCircle,
  Building2,
  Headphones,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
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
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          subject: "",
          message: "",
        });
        setIsSubmitted(true);
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-[#d84948] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center text-white">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white font-medium text-sm mb-6">
              <MessageCircle className="w-4 h-4 mr-2" />
              Bize Ulaşın
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              İletişim
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Vinç ve endüstriyel ekipman ihtiyaçlarınız için uzman ekibimizle
              hemen iletişime geçin
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-8 -mt-12 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Phone Card - Highlighted */}
            <a href="tel:+905387344389" className="group">
              <Card className="border-0 shadow-xl bg-[#d84948] text-white hover:scale-105 transition-transform duration-300 h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Phone className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Hemen Arayın</h3>
                  <p className="text-2xl font-bold">+90 538 734 4389</p>
                  <p className="text-white/80 text-sm mt-2">
                    Uzman Desteği İçin
                  </p>
                </CardContent>
              </Card>
            </a>

            {/* Email Card */}
            <a href="mailto:info@medaendustri.com" className="group">
              <Card className="border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-300 h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-[#d84948]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#d84948]/20 transition-colors">
                    <Mail className="w-7 h-7 text-[#d84948]" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    E-posta Gönderin
                  </h3>
                  <p className="text-[#d84948] font-semibold">
                    info@medaendustri.com
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    24 Saat İçinde Yanıt
                  </p>
                </CardContent>
              </Card>
            </a>

            {/* Address Card */}
            <Card className="border-0 shadow-xl bg-white h-full">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-[#d84948]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-7 h-7 text-[#d84948]" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Adres</h3>
                <p className="text-gray-600 text-sm">
                  İvedik OSB Matbaacılar Sitesi
                </p>
                <p className="text-gray-600 text-sm">
                  1514. Sokak No:22 Yenimahalle/Ankara
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Form - Takes 3 columns */}
            <div className="lg:col-span-3">
              <Card className="shadow-2xl border-0 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8">
                  <CardTitle className="text-2xl font-bold flex items-center mb-2">
                    <Send className="w-6 h-6 mr-3" />
                    Teklif Formu
                  </CardTitle>
                  <p className="text-white/80">
                    İhtiyacınızı belirtin, size en kısa sürede dönüş yapalım
                  </p>
                </CardHeader>
                <CardContent className="p-8">
                  {isSubmitted && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <div>
                        <p className="text-green-800 font-medium">
                          Mesajınız başarıyla gönderildi!
                        </p>
                        <p className="text-green-600 text-sm">
                          En kısa sürede size dönüş yapacağız.
                        </p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="name"
                          className="text-gray-700 font-medium"
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
                          placeholder="Adınız ve soyadınız"
                          className="border-gray-200 focus:border-[#d84948] focus:ring-[#d84948]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="company"
                          className="text-gray-700 font-medium"
                        >
                          Şirket
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Şirket adı"
                          className="border-gray-200 focus:border-[#d84948] focus:ring-[#d84948]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-gray-700 font-medium"
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
                          placeholder="E-posta adresiniz"
                          className="border-gray-200 focus:border-[#d84948] focus:ring-[#d84948]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="phone"
                          className="text-gray-700 font-medium"
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
                        htmlFor="subject"
                        className="text-gray-700 font-medium"
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
                        placeholder="Mesajınızın konusu"
                        className="border-gray-200 focus:border-[#d84948] focus:ring-[#d84948]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="message"
                        className="text-gray-700 font-medium"
                      >
                        Mesajınız *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="İhtiyacınızı detaylı olarak açıklayın..."
                        rows={5}
                        className="resize-none border-gray-200 focus:border-[#d84948] focus:ring-[#d84948]"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#d84948] hover:bg-[#c73e3d] text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {isSubmitting ? (
                        "Gönderiliyor..."
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Mesaj Gönder
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Takes 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Company Info Card */}
              <Card className="border-0 shadow-xl overflow-hidden">
                <CardHeader className="bg-gray-50 p-6">
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                    <Building2 className="w-5 h-5 mr-2 text-[#d84948]" />
                    Şirket Bilgileri
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      Meda Vinç Sanayi ve Kontrol Sistemleri A.Ş.
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Endüstriyel vinç ve ekipman çözümleri
                    </p>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex items-start space-x-3 mb-3">
                      <MapPin className="w-5 h-5 text-[#d84948] mt-0.5" />
                      <div className="text-sm text-gray-600">
                        <p>İvedik OSB Matbaacılar Sitesi</p>
                        <p>1514. Sokak No:22</p>
                        <p>Yenimahalle/Ankara</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 mb-3">
                      <Clock className="w-5 h-5 text-[#d84948]" />
                      <div className="text-sm text-gray-600">
                        <p>Pazartesi - Cuma: 09:00 - 18:00</p>
                        <p>Cumartesi: 09:00 - 14:00</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Why Contact Us Card */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-[#d84948] to-[#c73e3d] text-white">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Headphones className="w-8 h-8 mr-3" />
                    <h3 className="text-xl font-bold">
                      Neden Bizi Seçmelisiniz?
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Uzman teknik ekip desteği</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Hızlı teklif ve teslimat</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Rekabetçi fiyat garantisi</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Satış sonrası destek</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-2xl border-0 overflow-hidden">
            <CardHeader className="bg-gray-900 text-white p-6">
              <CardTitle className="text-xl font-bold flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Konum
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d238.92195177206747!2d32.76380703558084!3d39.997087281039576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1str!2str!4v1757484161013!5m2!1str!2str"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Meda Endüstri Konum"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
