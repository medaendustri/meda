import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { getNewsBySlug, getAllNews } from "@/lib/news";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const dynamicParams = false;

type PageProps = { params: Promise<{ slug: string }> };

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.medaendustri.com";

export function generateStaticParams() {
  return getAllNews().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) return { title: "Haber Bulunamadı" };

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: `/haberler/${article.slug}`,
      publishedTime: article.date,
      authors: [article.author],
      images: [{ url: article.image, width: 1200, height: 630, alt: article.title }],
    },
    alternates: { canonical: `/haberler/${article.slug}` },
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { "@type": "Organization", name: article.author },
    publisher: {
      "@type": "Organization",
      name: "Meda Endüstri",
      logo: { "@type": "ImageObject", url: `${siteUrl}/meda-logo.webp` },
    },
    image: `${siteUrl}${article.image}`,
    mainEntityOfPage: `${siteUrl}/haberler/${article.slug}`,
    inLanguage: "tr-TR",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <Link
            href="/haberler"
            className="inline-flex items-center text-[#d84948] hover:underline mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tüm haberler
          </Link>

          <Badge className="mb-4 bg-[#d84948]">{article.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8">
            <span>{article.author}</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(article.date).toLocaleDateString("tr-TR")}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </span>
          </div>

          <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-100 mb-10">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>

          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-[#d84948]"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Projeniz için doğru vinçi seçelim
            </h2>
            <p className="text-gray-600 mb-4">
              Ücretsiz teknik danışmanlık ve teklif için bize ulaşın.
            </p>
            <Link href="/iletisim">
              <Button className="bg-[#d84948] hover:bg-[#c73e3d]">
                Teklif Al
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
