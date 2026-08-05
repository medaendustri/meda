import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { permanentRedirect, notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import {
  getPublishedArticleBySlug,
  resolveOldArticleSlug,
  type BlogArticle,
} from "@/lib/blog/repository";
import { sanitizeAndValidateArticleHtml } from "@/lib/blog/content-security";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const revalidate = 3600;
export const dynamicParams = true;

type PageProps = { params: Promise<{ slug: string }> };

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.medaendustri.com";

function readTime(text: string) {
  return `${Math.max(1, Math.ceil(text.split(/\s+/).length / 200))} dk`;
}

function absoluteUrl(pathOrUrl: string) {
  if (!pathOrUrl) return `${siteUrl}/opengraph-image`;
  if (pathOrUrl.startsWith("http")) return pathOrUrl;
  return `${siteUrl}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

function articleSeo(article: BlogArticle) {
  const title = article.seoTitle || article.title;
  const description = article.metaDescription || article.excerpt;
  const image = article.ogImageUrl || article.imageUrl;
  const canonical =
    article.canonicalUrl || `/haberler/${article.slug}`;
  return {
    title,
    description,
    image,
    canonical,
    ogTitle: article.ogTitle || title,
    ogDescription: article.ogDescription || description,
    ogImage: article.ogImageUrl || image,
    twitterTitle: article.twitterTitle || article.ogTitle || title,
    twitterDescription:
      article.twitterDescription || article.ogDescription || description,
    twitterImage: article.twitterImageUrl || article.ogImageUrl || image,
  };
}

export async function generateStaticParams() {
  try {
    const { getPublishedArticles } = await import("@/lib/blog/repository");
    const articles = await getPublishedArticles();
    return articles.map((article) => ({ slug: article.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);
  if (!article) {
    return { title: "Haber Bulunamadı", robots: { index: false, follow: false } };
  }

  const seo = articleSeo(article);
  return {
    title: seo.title,
    description: seo.description,
    keywords: article.keywords.length ? article.keywords : undefined,
    robots: {
      index: article.robotsIndex,
      follow: article.robotsFollow,
    },
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
      type: "article",
      url: seo.canonical,
      publishedTime: article.publishedAt || undefined,
      modifiedTime: article.updatedAt,
      authors: [article.author],
      images: [
        {
          url: seo.ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.twitterTitle,
      description: seo.twitterDescription,
      images: [seo.twitterImage],
    },
    alternates: { canonical: seo.canonical },
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let article = await getPublishedArticleBySlug(slug);
  if (!article) {
    const redirectedSlug = await resolveOldArticleSlug(slug);
    if (redirectedSlug) permanentRedirect(`/haberler/${redirectedSlug}`);
    notFound();
  }

  const seo = articleSeo(article);
  const safeContent = sanitizeAndValidateArticleHtml(article.contentHtml);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: seo.title,
    description: seo.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { "@type": "Organization", name: article.author },
    publisher: {
      "@type": "Organization",
      name: "Meda Endüstri",
      logo: { "@type": "ImageObject", url: `${siteUrl}/meda-logo.webp` },
    },
    image: absoluteUrl(seo.image),
    mainEntityOfPage: absoluteUrl(seo.canonical),
    inLanguage: "tr-TR",
    keywords: article.keywords.join(", ") || undefined,
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
              {new Date(
                article.publishedAt || article.updatedAt,
              ).toLocaleDateString("tr-TR")}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {readTime(article.contentText)}
            </span>
          </div>

          <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-100 mb-10">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>

          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-[#d84948]"
            dangerouslySetInnerHTML={{ __html: safeContent.html }}
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
