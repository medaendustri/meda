"use client";

import { useState, useEffect, use } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Phone,
  Share2,
  Shield,
  Truck,
  CheckCircle,
  FileText,
  Loader2,
  Expand,
  ChevronLeft,
  ChevronRight,
  Copy,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Download,
  Package,
  Mail,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FullScreenSlider } from "@/components/full-screen-slider";

// Database product interface
interface DbProduct {
  id: number;
  name: string;
  slug: string;
  url: string;
  category_url: string;
  category_name: string;
  price_net: number;
  price_gross: number;
  currency: string;
  stock_status: string;
  main_image: string;
  specs: Record<string, string>;
  kit_components: string[];
  gallery: string[];
  downloads: Array<{ text: string; link: string }>;
  performance_data: string;
  created_at: string;
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("specs");
  const [product, setProduct] = useState<DbProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [resolvedParams.slug]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/products/${resolvedParams.slug}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get all images (main + gallery)
  const getAllImages = () => {
    if (!product) return [];
    const images = [{ id: 0, src: product.main_image, alt: product.name }];
    product.gallery.forEach((img, index) => {
      images.push({
        id: index + 1,
        src: img,
        alt: `${product.name} - ${index + 2}`,
      });
    });
    return images;
  };

  const images = getAllImages();

  const nextImage = () => {
    if (images.length > 1) {
      setSelectedImage((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images.length > 1) {
      setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = product?.name || "Meda Endüstri Ürünü";
  const shareText = `${shareTitle} - Meda Endüstri`;

  const handleShare = async (platform: string) => {
    const url = encodeURIComponent(shareUrl);
    const text = encodeURIComponent(shareText);

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${url}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
          "_blank"
        );
        break;
      case "whatsapp":
        window.open(`https://wa.me/?text=${text}%20${url}`, "_blank");
        break;
      case "copy":
        try {
          await navigator.clipboard.writeText(shareUrl);
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
          console.error("Failed to copy: ", err);
        }
        break;
    }
  };

  const getStockStatusBadge = (status: string) => {
    switch (status) {
      case "high":
        return { text: "Stokta Mevcut", color: "bg-green-600" };
      case "medium":
        return { text: "Sınırlı Stok", color: "bg-yellow-600" };
      case "low":
        return { text: "Son Stoklar", color: "bg-orange-600" };
      case "out":
        return { text: "Stokta Yok", color: "bg-red-600" };
      default:
        return { text: "Stok Durumu Bilinmiyor", color: "bg-gray-600" };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#d84948] mx-auto mb-4" />
          <p className="text-gray-600">Ürün yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <Card className="text-center p-12 border-0 shadow-xl max-w-md">
          <CardContent>
            <div className="mx-auto mb-6 p-6 bg-gray-100 rounded-full w-fit">
              <FileText className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Ürün Bulunamadı
            </h1>
            <p className="text-gray-600 mb-6">
              Aradığınız ürün mevcut değil veya kaldırılmış olabilir.
            </p>
            <Link href="/urunler">
              <Button className="bg-[#d84948] hover:bg-[#c73e3d]">
                Ürünlere Geri Dön
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stockBadge = getStockStatusBadge(product.stock_status);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#d84948] transition-colors">
              Ana Sayfa
            </Link>
            <span>/</span>
            <Link
              href="/urunler"
              className="hover:text-[#d84948] transition-colors"
            >
              Ürünler
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <Link
          href="/urunler"
          className="inline-flex items-center text-[#d84948] hover:text-[#c73e3d] mb-6 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Ürünlere Geri Dön
        </Link>

        {/* Product Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <Card className="border-0 shadow-lg overflow-hidden bg-white">
              <div className="relative aspect-[4/3] bg-gray-50 group">
                <Image
                  src={
                    images[selectedImage]?.src ||
                    "/placeholder.svg?height=400&width=600"
                  }
                  alt={images[selectedImage]?.alt || product.name}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Full Screen Button */}
                <Button
                  onClick={() => setIsSliderOpen(true)}
                  className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
                  size="sm"
                >
                  <Expand className="w-4 h-4" />
                </Button>

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <Button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
                      size="sm"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
                      size="sm"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-black/50 text-white backdrop-blur-sm">
                      {selectedImage + 1} / {images.length}
                    </Badge>
                  </div>
                )}
              </div>
            </Card>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.slice(0, 8).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-[4/3] bg-white rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index
                        ? "border-[#d84948] shadow-lg scale-105"
                        : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                    }`}
                  >
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-contain"
                      sizes="150px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              <div className="flex items-center space-x-3 mb-4 flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="text-[#d84948] border-[#d84948]"
                >
                  {product.category_name}
                </Badge>
                <Badge className={stockBadge.color}>
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {stockBadge.text}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Quick specs preview */}
              {Object.keys(product.specs).length > 0 && (
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                  {Object.entries(product.specs)
                    .slice(0, 4)
                    .map(([key, value]) => (
                      <div key={key} className="flex items-start gap-1">
                        <span className="font-medium text-gray-700">
                          {key.trim()}:
                        </span>
                        <span>{value}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Price & Contact Info */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-[#d84948] to-[#c73e3d] text-white overflow-hidden">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                    <Phone className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    Fiyat ve Teklif İçin
                  </h3>
                  <p className="text-white/80">
                    Ürün fiyatı ve detaylı bilgi için bizimle iletişime geçin
                  </p>
                </div>

                <a
                  href="tel:+905387344389"
                  className="block w-full p-4 bg-white rounded-xl text-center hover:bg-gray-50 transition-colors group mb-4"
                >
                  <p className="text-3xl font-bold text-[#d84948] group-hover:scale-105 transition-transform">
                    +90 538 734 4389
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    Hemen Arayın - Uzman Desteği
                  </p>
                </a>

                <div className="flex gap-3">
                  <a
                    href="mailto:info@medaendustri.com"
                    className="flex-1 flex items-center justify-center gap-2 p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span className="font-medium">E-posta Gönder</span>
                  </a>
                  <Link
                    href="/iletisim"
                    className="flex-1 flex items-center justify-center gap-2 p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">İletişim Formu</span>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg text-center">
                <Shield className="w-6 h-6 text-[#d84948] mb-2" />
                <span className="text-sm font-medium text-gray-700">
                  2 Yıl Garanti
                </span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg text-center">
                <Truck className="w-6 h-6 text-[#d84948] mb-2" />
                <span className="text-sm font-medium text-gray-700">
                  Hızlı Teslimat
                </span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg text-center">
                <CheckCircle className="w-6 h-6 text-[#d84948] mb-2" />
                <span className="text-sm font-medium text-gray-700">
                  CE Sertifikalı
                </span>
              </div>
            </div>

            {/* Share Button */}
            <div className="flex justify-center">
              <div className="relative">
                <Button
                  onClick={() => setIsShareOpen(!isShareOpen)}
                  variant="outline"
                  className="px-8 hover:bg-[#d84948]/10 hover:text-[#d84948] hover:border-[#d84948]"
                  size="lg"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Paylaş
                </Button>

                {/* Share Dropdown */}
                {isShareOpen && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-xl border z-50 p-4">
                    <div className="text-sm font-medium text-gray-900 mb-3">
                      Bu ürünü paylaş
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare("facebook")}
                        className="justify-start hover:bg-blue-50 hover:border-blue-200"
                      >
                        <Facebook className="w-4 h-4 mr-2 text-blue-600" />
                        Facebook
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare("twitter")}
                        className="justify-start hover:bg-sky-50 hover:border-sky-200"
                      >
                        <Twitter className="w-4 h-4 mr-2 text-sky-500" />
                        Twitter
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare("linkedin")}
                        className="justify-start hover:bg-blue-50 hover:border-blue-200"
                      >
                        <Linkedin className="w-4 h-4 mr-2 text-blue-700" />
                        LinkedIn
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare("whatsapp")}
                        className="justify-start hover:bg-green-50 hover:border-green-200"
                      >
                        <MessageCircle className="w-4 h-4 mr-2 text-green-600" />
                        WhatsApp
                      </Button>
                    </div>
                    <div className="mt-3 pt-3 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare("copy")}
                        className={`w-full justify-start ${
                          copySuccess
                            ? "bg-green-50 border-green-200 text-green-700"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        {copySuccess ? "Kopyalandı!" : "Linki Kopyala"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-0">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4 rounded-none border-b bg-gray-50 h-12">
                <TabsTrigger
                  value="specs"
                  className="rounded-none data-[state=active]:bg-[#d84948] data-[state=active]:text-white text-sm"
                >
                  Teknik Özellikler
                </TabsTrigger>
                <TabsTrigger
                  value="performance"
                  className="rounded-none data-[state=active]:bg-[#d84948] data-[state=active]:text-white text-sm"
                >
                  Performans Verileri
                </TabsTrigger>
                <TabsTrigger
                  value="kit"
                  className="rounded-none data-[state=active]:bg-[#d84948] data-[state=active]:text-white text-sm"
                >
                  Kit İçeriği
                </TabsTrigger>
                <TabsTrigger
                  value="downloads"
                  className="rounded-none data-[state=active]:bg-[#d84948] data-[state=active]:text-white text-sm"
                >
                  Dökümanlar
                </TabsTrigger>
              </TabsList>

              {/* Teknik Özellikler Tab */}
              <TabsContent value="specs" className="p-6">
                {Object.keys(product.specs).length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="bg-[#d84948] text-white font-semibold p-3 text-left border border-gray-300">
                            Özellik
                          </th>
                          <th className="bg-[#d84948] text-white font-semibold p-3 text-left border border-gray-300">
                            Değer
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(product.specs).map(
                          ([key, value], index) => (
                            <tr
                              key={key}
                              className={
                                index % 2 === 0 ? "bg-white" : "bg-gray-50"
                              }
                            >
                              <td className="p-3 border border-gray-300 font-medium text-gray-700">
                                {key.trim()}
                              </td>
                              <td className="p-3 border border-gray-300 text-gray-600">
                                {value}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      Teknik özellikler yakında eklenecektir.
                    </p>
                  </div>
                )}
              </TabsContent>

              {/* Performans Verileri Tab */}
              <TabsContent value="performance" className="p-6">
                {product.performance_data ? (
                  <div
                    className="prose prose-sm max-w-none [&_table]:w-full [&_table]:border-collapse [&_table]:border [&_table]:border-gray-300 [&_table]:rounded-lg [&_table]:overflow-hidden [&_table]:shadow-sm [&_th]:bg-[#d84948] [&_th]:text-white [&_th]:font-semibold [&_th]:p-3 [&_th]:text-left [&_th]:border [&_th]:border-gray-300 [&_td]:p-3 [&_td]:border [&_td]:border-gray-300 [&_td]:bg-white [&_tr:nth-child(even)_td]:bg-gray-50 [&_tr:hover_td]:bg-[#d84948]/5 [&_table]:mb-6 [&_table]:mt-4 [&_.custom-title]:text-lg [&_.custom-title]:font-bold [&_.custom-title]:text-gray-900 [&_.custom-title]:mb-4 [&_.custom-title]:mt-6"
                    dangerouslySetInnerHTML={{
                      __html: product.performance_data,
                    }}
                  />
                ) : (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      Performans verileri yakında eklenecektir.
                    </p>
                  </div>
                )}
              </TabsContent>

              {/* Kit İçeriği Tab */}
              <TabsContent value="kit" className="p-6">
                {product.kit_components.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {product.kit_components.map((component, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="p-2 bg-[#d84948]/10 rounded-full">
                          <Package className="w-5 h-5 text-[#d84948]" />
                        </div>
                        <span className="text-gray-700 font-medium">
                          {component}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      Kit içeriği bilgisi yakında eklenecektir.
                    </p>
                  </div>
                )}
              </TabsContent>

              {/* Dökümanlar Tab */}
              <TabsContent value="downloads" className="p-6">
                {product.downloads.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {product.downloads.map((doc, index) => (
                      <a
                        key={index}
                        href={doc.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-[#d84948]/5 hover:border-[#d84948] transition-all duration-300 group"
                      >
                        <div className="p-2 bg-[#d84948]/10 rounded-full group-hover:bg-[#d84948]/20 transition-colors">
                          <Download className="w-5 h-5 text-[#d84948]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-gray-700 font-medium block truncate">
                            {doc.text}
                          </span>
                          <span className="text-xs text-gray-500">
                            İndirmek için tıklayın
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Dökümanlar
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Bu ürün için dökümanlar yakında eklenecektir.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Click outside handler for share dropdown */}
      {isShareOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsShareOpen(false)}
        />
      )}

      {/* Full Screen Slider */}
      <FullScreenSlider
        images={images}
        isOpen={isSliderOpen}
        onClose={() => setIsSliderOpen(false)}
        initialIndex={selectedImage}
      />
    </div>
  );
}
