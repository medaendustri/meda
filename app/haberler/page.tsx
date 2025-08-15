"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, User, ArrowRight, Search, TrendingUp, Eye, MessageCircle, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tümü")
  const [searchTerm, setSearchTerm] = useState("")

  const featuredNews = {
    id: 1,
    title: "Endüstri 4.0 Dönüşümünde Meda Endüstri'nin Öncü Rolü",
    excerpt:
      "Dijital dönüşüm sürecinde müşterilerimize sunduğumuz yenilikçi çözümler ve gelecek planlarımız hakkında detaylı bilgiler. Yapay zeka ve IoT teknolojileri ile endüstriyel süreçleri optimize ediyoruz.",
    content: "Tam içerik burada olacak...",
    image: "/placeholder.svg?height=500&width=800",
    date: "20 Aralık 2024",
    readTime: "5 dk",
    author: "Meda Endüstri",
    category: "Teknoloji",
    featured: true,
    views: 1250,
    comments: 18,
    trending: true,
  }

  const newsArticles = [
    {
      id: 2,
      title: "Yeni Nesil Servo Motor Kontrol Sistemleri Tanıtıldı",
      excerpt:
        "Gelişmiş algoritmaları ve yüksek hassasiyeti ile öne çıkan yeni servo motor kontrol sistemlerimiz piyasaya sunuldu. Endüstri 4.0 uyumlu özellikler.",
      image: "/placeholder.svg?height=300&width=400",
      date: "18 Aralık 2024",
      readTime: "3 dk",
      author: "Teknik Ekip",
      category: "Ürün",
      views: 890,
      comments: 12,
      trending: false,
    },
    {
      id: 3,
      title: "Avrupa Pazarında Yeni Distribütörlük Anlaşması",
      excerpt:
        "Almanya merkezli teknoloji şirketi ile imzalanan anlaşma ile Avrupa pazarındaki varlığımızı güçlendiriyoruz. Yeni pazarlara açılım stratejimiz.",
      image: "/placeholder.svg?height=300&width=400",
      date: "15 Aralık 2024",
      readTime: "4 dk",
      author: "İş Geliştirme",
      category: "Kurumsal",
      views: 650,
      comments: 8,
      trending: true,
    },
    {
      id: 4,
      title: "ISO 27001 Bilgi Güvenliği Sertifikası Alındı",
      excerpt:
        "Bilgi güvenliği yönetim sistemimiz uluslararası standartlarda onaylanarak müşteri verilerinin güvenliği garanti altına alındı.",
      image: "/placeholder.svg?height=300&width=400",
      date: "12 Aralık 2024",
      readTime: "2 dk",
      author: "Kalite Güvence",
      category: "Sertifika",
      views: 420,
      comments: 5,
      trending: false,
    },
    {
      id: 5,
      title: "Ar-Ge Merkezimizde Yeni Proje Başlatıldı",
      excerpt:
        "Yapay zeka destekli endüstriyel otomasyon sistemleri geliştirme projesi kapsamında yeni ekip kuruldu. İnovasyon odaklı çalışmalarımız.",
      image: "/placeholder.svg?height=300&width=400",
      date: "10 Aralık 2024",
      readTime: "6 dk",
      author: "Ar-Ge Ekibi",
      category: "Araştırma",
      views: 780,
      comments: 15,
      trending: true,
    },
    {
      id: 6,
      title: "Müşteri Memnuniyet Anketi Sonuçları Açıklandı",
      excerpt:
        "2024 yılı müşteri memnuniyet anketimizde %98 memnuniyet oranına ulaştık. Detaylı sonuçlar ve iyileştirme planlarımız.",
      image: "/placeholder.svg?height=300&width=400",
      date: "8 Aralık 2024",
      readTime: "3 dk",
      author: "Müşteri İlişkileri",
      category: "Kurumsal",
      views: 560,
      comments: 9,
      trending: false,
    },
    {
      id: 7,
      title: "Sürdürülebilirlik Raporumuz Yayınlandı",
      excerpt:
        "Çevresel sorumluluklarımız ve sürdürülebilir üretim süreçlerimiz hakkında yıllık raporumuz hazırlandı. Yeşil teknoloji yatırımlarımız.",
      image: "/placeholder.svg?height=300&width=400",
      date: "5 Aralık 2024",
      readTime: "7 dk",
      author: "Sürdürülebilirlik Ekibi",
      category: "Çevre",
      views: 340,
      comments: 6,
      trending: false,
    },
  ]

  const categories = ["Tümü", "Teknoloji", "Ürün", "Kurumsal", "Sertifika", "Araştırma", "Çevre"]

  const filteredArticles = newsArticles.filter((article) => {
    const matchesCategory = selectedCategory === "Tümü" || article.category === selectedCategory
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const trendingArticles = newsArticles.filter((article) => article.trending)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-[#d84948]/5 via-gray-50 to-[#d84948]/10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-[#d84948]/10 rounded-full text-[#d84948] font-medium text-sm mb-6">
              <TrendingUp className="w-4 h-4 mr-2" />
              Son Gelişmeler
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">Haberler</h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Şirketimizden son gelişmeler, yeni ürünler ve sektördeki yeniliklerimiz. Endüstriyel otomasyon dünyasından
              güncel haberler.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Haberlerde ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-3 border-gray-200 focus:border-[#d84948] focus:ring-[#d84948]"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={
                      selectedCategory === category
                        ? "bg-[#d84948] hover:bg-[#c73e3d]"
                        : "hover:bg-[#d84948]/10 hover:text-[#d84948] hover:border-[#d84948] bg-transparent"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured News */}
        <Card className="mb-12 overflow-hidden shadow-2xl border-0">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-auto">
              <Image
                src={featuredNews.image || "/placeholder.svg"}
                alt={featuredNews.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="absolute top-4 left-4 flex space-x-2">
                <Badge className="bg-[#d84948]">Öne Çıkan</Badge>
                {featuredNews.trending && (
                  <Badge className="bg-orange-500">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Trend
                  </Badge>
                )}
              </div>
              <div className="absolute bottom-4 left-4 flex items-center space-x-4 text-white text-sm">
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{featuredNews.views}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{featuredNews.comments}</span>
                </div>
              </div>
            </div>
            <div className="p-8 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50">
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {featuredNews.date}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {featuredNews.readTime}
                </div>
                <Badge variant="outline" className="text-[#d84948] border-[#d84948]">
                  {featuredNews.category}
                </Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">{featuredNews.title}</h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-lg">{featuredNews.excerpt}</p>
              <div className="flex items-center justify-between">
                <Link href={`/haberler/${featuredNews.id}`}>
                  <Button className="bg-[#d84948] hover:bg-[#c73e3d] shadow-lg hover:shadow-xl transition-all duration-300">
                    Devamını Oku
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#d84948]">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="w-4 h-4 mr-1" />
                    {featuredNews.author}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Trending Section */}
        {trendingArticles.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <TrendingUp className="w-6 h-6 text-[#d84948] mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Trend Haberler</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trendingArticles.slice(0, 3).map((article) => (
                <Card
                  key={article.id}
                  className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1"
                >
                  <div className="relative h-32 overflow-hidden">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-orange-500">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trend
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-[#d84948] transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{article.date}</span>
                      <div className="flex items-center space-x-2">
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {article.views}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* News Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Tüm Haberler</h2>
            <p className="text-gray-600">
              <span className="font-semibold text-[#d84948]">{filteredArticles.length}</span> haber bulundu
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <Card
                key={article.id}
                className="group hover:shadow-2xl transition-all duration-300 bg-white border-0 shadow-lg hover:-translate-y-2 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-white/90 text-gray-700">
                      {article.category}
                    </Badge>
                  </div>
                  {article.trending && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-orange-500">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trend
                      </Badge>
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {article.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {article.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-[#d84948] transition-colors line-clamp-2">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500 space-x-3">
                      <div className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {article.author}
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {article.views}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        {article.comments}
                      </div>
                    </div>
                    <Link href={`/haberler/${article.id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#d84948] hover:text-[#c73e3d] p-0 group-hover:translate-x-1 transition-transform"
                      >
                        Devamını Oku →
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-[#d84948] hover:bg-[#c73e3d] shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Daha Fazla Haber Yükle
          </Button>
        </div>
      </div>
    </div>
  )
}
