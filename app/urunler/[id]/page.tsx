"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Mail,
  Phone,
  Share2,
  Star,
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
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { FullScreenSlider } from "@/components/full-screen-slider"

interface WooCommerceProduct {
  id: number
  name: string
  slug: string
  description: string
  short_description: string
  images: Array<{
    id: number
    src: string
    alt: string
  }>
  categories: Array<{
    id: number
    name: string
    slug: string
  }>
  price_html: string
  stock_status: string
  average_rating: string
  rating_count: number
  meta_data: Array<{
    key: string
    value: string
  }>
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState("description")
  const [product, setProduct] = useState<WooCommerceProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSliderOpen, setIsSliderOpen] = useState(false)
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  useEffect(() => {
    fetchProduct()
  }, [params.id])

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/products/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setProduct(data)
      }
    } catch (error) {
      console.error("Error fetching product:", error)
    } finally {
      setLoading(false)
    }
  }

  const getCustomTabContent = (tabKey: string) => {
    if (!product) return ""
    const metaItem = product.meta_data.find((item) => item.key === tabKey)
    return metaItem?.value || ""
  }

  const nextImage = () => {
    if (product && product.images.length > 1) {
      setSelectedImage((prev) => (prev + 1) % product.images.length)
    }
  }

  const prevImage = () => {
    if (product && product.images.length > 1) {
      setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)
    }
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareTitle = product?.name || "Dragon Winch Ürünü"
  const shareText = `${shareTitle} - MEDA Savunma Teknolojileri`

  const handleShare = async (platform: string) => {
    const url = encodeURIComponent(shareUrl)
    const title = encodeURIComponent(shareTitle)
    const text = encodeURIComponent(shareText)

    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank")
        break
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank")
        break
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank")
        break
      case "whatsapp":
        window.open(`https://wa.me/?text=${text}%20${url}`, "_blank")
        break
      case "copy":
        try {
          await navigator.clipboard.writeText(shareUrl)
          setCopySuccess(true)
          setTimeout(() => setCopySuccess(false), 2000)
        } catch (err) {
          console.error("Failed to copy: ", err)
        }
        break
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#d84948] mx-auto mb-4" />
          <p className="text-gray-600">Dragon Winch ürünü yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <Card className="text-center p-12 border-0 shadow-xl max-w-md">
          <CardContent>
            <div className="mx-auto mb-6 p-6 bg-gray-100 rounded-full w-fit">
              <FileText className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Ürün Bulunamadı</h1>
            <p className="text-gray-600 mb-6">Aradığınız Dragon Winch ürünü mevcut değil veya kaldırılmış olabilir.</p>
            <Link href="/urunler">
              <Button className="bg-[#d84948] hover:bg-[#c73e3d]">Ürünlere Geri Dön</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

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
            <Link href="/urunler" className="hover:text-[#d84948] transition-colors">
              Dragon Winch Ürünleri
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
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
          {/* Image Gallery - Redesigned with better sizing and full-screen slider */}
          <div className="space-y-4">
            <Card className="border-0 shadow-lg overflow-hidden bg-white">
              <div className="relative aspect-[4/3] bg-gray-50 group">
                <Image
                  src={product.images[selectedImage]?.src || "/placeholder.svg?height=400&width=600"}
                  alt={product.images[selectedImage]?.alt || product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
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
                {product.images.length > 1 && (
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
                {product.images.length > 1 && (
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-black/50 text-white backdrop-blur-sm">
                      {selectedImage + 1} / {product.images.length}
                    </Badge>
                  </div>
                )}
              </div>
            </Card>

            {/* Thumbnails - Better sized thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
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
                      alt={image.alt || `${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="150px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info - More compact and professional layout */}
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Badge variant="outline" className="text-[#d84948] border-[#d84948]">
                  {product.categories[0]?.name || "Dragon Winch"}
                </Badge>
                <Badge className={product.stock_status === "instock" ? "bg-green-600" : "bg-red-600"}>
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {product.stock_status === "instock" ? "Stokta Mevcut" : "Stokta Yok"}
                </Badge>
                {Number.parseFloat(product.average_rating) > 0 && (
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium text-sm">{product.average_rating}</span>
                    <span className="text-gray-500 text-sm">({product.rating_count})</span>
                  </div>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">{product.name}</h1>

              <div
                className="text-gray-600 leading-relaxed mb-6"
                dangerouslySetInnerHTML={{
                  __html: product.short_description || product.description.substring(0, 200) + "...",
                }}
              />
            </div>

            {/* Price */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-[#d84948]/5 to-[#d84948]/10">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-[#d84948] mb-4">
                  {product.price_html ? (
                    <div dangerouslySetInnerHTML={{ __html: product.price_html }} />
                  ) : (
                    "Fiyat için iletişime geçin"
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-[#d84948]" />
                    <span className="text-sm">2 Yıl Garanti</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Truck className="w-4 h-4 text-[#d84948]" />
                    <span className="text-sm">Hızlı Teslimat</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#d84948]" />
                    <span className="text-sm">CE Sertifikalı</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full bg-[#d84948] hover:bg-[#c73e3d] shadow-lg hover:shadow-xl transition-all duration-300"
                    size="lg"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Fiyat Teklifi Al
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full hover:bg-[#d84948]/10 hover:text-[#d84948] hover:border-[#d84948] bg-transparent"
                    size="lg"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Hemen Ara
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-center">
              <div className="relative">
                <Button
                  onClick={() => setIsShareOpen(!isShareOpen)}
                  className="bg-[#d84948] hover:bg-[#c73e3d] shadow-lg hover:shadow-xl transition-all duration-300 px-8"
                  size="lg"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Paylaş
                </Button>

                {/* Share Dropdown */}
                {isShareOpen && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-xl border z-50 p-4">
                    <div className="text-sm font-medium text-gray-900 mb-3">Bu ürünü paylaş</div>
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
                        className={`w-full justify-start ${copySuccess ? "bg-green-50 border-green-200 text-green-700" : "hover:bg-gray-50"}`}
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

        {/* Product Details Tabs - More compact tabs design */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 rounded-none border-b bg-gray-50 h-12">
                <TabsTrigger
                  value="description"
                  className="rounded-none data-[state=active]:bg-[#d84948] data-[state=active]:text-white text-sm"
                >
                  {getCustomTabContent("custom_tab_title1") || "Ürün Açıklaması"}
                </TabsTrigger>
                <TabsTrigger
                  value="technical"
                  className="rounded-none data-[state=active]:bg-[#d84948] data-[state=active]:text-white text-sm"
                >
                  {getCustomTabContent("custom_tab_title2") || "Teknik Özellikler"}
                </TabsTrigger>
                <TabsTrigger
                  value="documents"
                  className="rounded-none data-[state=active]:bg-[#d84948] data-[state=active]:text-white text-sm"
                >
                  Dökümanlar
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="p-6">
                <div
                  className="prose prose-sm max-w-none [&_table]:w-full [&_table]:border-collapse [&_table]:border [&_table]:border-gray-300 [&_table]:rounded-lg [&_table]:overflow-hidden [&_table]:shadow-sm [&_th]:bg-[#d84948] [&_th]:text-white [&_th]:font-semibold [&_th]:p-3 [&_th]:text-left [&_th]:border [&_th]:border-gray-300 [&_td]:p-3 [&_td]:border [&_td]:border-gray-300 [&_td]:bg-white [&_tr:nth-child(even)_td]:bg-gray-50 [&_tr:hover_td]:bg-[#d84948]/5 [&_table]:mb-6 [&_table]:mt-4"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </TabsContent>

              <TabsContent value="technical" className="p-6">
                <div
                  className="prose prose-sm max-w-none [&_table]:w-full [&_table]:border-collapse [&_table]:border [&_table]:border-gray-300 [&_table]:rounded-lg [&_table]:overflow-hidden [&_table]:shadow-sm [&_th]:bg-[#d84948] [&_th]:text-white [&_th]:font-semibold [&_th]:p-3 [&_th]:text-left [&_th]:border [&_th]:border-gray-300 [&_td]:p-3 [&_td]:border [&_td]:border-gray-300 [&_td]:bg-white [&_tr:nth-child(even)_td]:bg-gray-50 [&_tr:hover_td]:bg-[#d84948]/5 [&_table]:mb-6 [&_table]:mt-4"
                  dangerouslySetInnerHTML={{
                    __html:
                      getCustomTabContent("custom_tab_content2") || "<p>Teknik özellikler yakında eklenecektir.</p>",
                  }}
                />
              </TabsContent>

              <TabsContent value="documents" className="p-6">
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Dökümanlar</h3>
                  <p className="text-gray-600 mb-4">Bu Dragon Winch ürünü için dökümanlar yakında eklenecektir.</p>
                  <Button className="bg-[#d84948] hover:bg-[#c73e3d]">
                    <Mail className="w-4 h-4 mr-2" />
                    Döküman Talep Et
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Click outside handler for share dropdown */}
      {isShareOpen && <div className="fixed inset-0 z-40" onClick={() => setIsShareOpen(false)} />}

      {/* Full Screen Slider */}
      <FullScreenSlider
        images={product.images}
        isOpen={isSliderOpen}
        onClose={() => setIsSliderOpen(false)}
        initialIndex={selectedImage}
      />
    </div>
  )
}
