import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { getPublishedArticles } from "@/lib/blog/repository";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function readTime(text: string) {
  return `${Math.max(1, Math.ceil(text.split(/\s+/).length / 200))} dk`;
}

export const revalidate = 3600;

export default async function NewsPage() {
  const articles = await getPublishedArticles();
  const featured = articles.find((article) => article.featured) || articles[0];
  const rest = articles.filter((article) => article.id !== featured?.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-white border-b py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Haberler & Rehberler
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Çekme vinci seçimi, sektör uygulamaları ve Meda Endüstri
            gelişmelerinden güncel içerikler.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {featured ? (
          <Link
            href={`/haberler/${featured.slug}`}
            className="block group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative aspect-[16/10] md:aspect-auto min-h-[240px] bg-gray-100">
                <Image
                  src={featured.imageUrl}
                  alt={featured.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <Badge className="w-fit mb-3 bg-[#d84948]">{featured.category}</Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-[#d84948] transition-colors mb-3">
                  {featured.title}
                </h2>
                <p className="text-gray-600 mb-6">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(featured.publishedAt || featured.updatedAt).toLocaleDateString("tr-TR")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {readTime(featured.contentText)}
                  </span>
                </div>
                <span className="inline-flex items-center text-[#d84948] font-medium">
                  Devamını oku
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-600">
            Henüz yayınlanmış haber bulunmuyor.
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((article) => (
            <Link
              key={article.slug}
              href={`/haberler/${article.slug}`}
              className="block group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[16/10] bg-gray-100">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5">
                <Badge variant="outline" className="mb-2 text-[#d84948] border-[#d84948]/40">
                  {article.category}
                </Badge>
                <h2 className="font-bold text-gray-900 group-hover:text-[#d84948] transition-colors line-clamp-2 mb-2">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>{new Date(article.publishedAt || article.updatedAt).toLocaleDateString("tr-TR")}</span>
                  <span>·</span>
                  <span>{readTime(article.contentText)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link href="/iletisim">
            <Button className="bg-[#d84948] hover:bg-[#c73e3d]">
              Teknik danışmanlık alın
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
