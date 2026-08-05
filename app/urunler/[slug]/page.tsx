import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getAllProductSlugs } from "@/lib/db";
import { ProductDetailClient } from "@/components/product-detail-client";

export const revalidate = 3600;

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.medaendustri.com";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const products = await getAllProductSlugs();
    return products.map((product) => ({ slug: product.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Ürün Bulunamadı",
      robots: { index: false, follow: false },
    };
  }

  const description = `${product.name} - ${product.category_name}. Dragon Winch çekme vinci ve endüstriyel vinç çözümleri. Fiyat ve teklif için Meda Endüstri ile iletişime geçin.`;
  const url = `/urunler/${product.slug}`;
  const image = product.main_image || "/opengraph-image";

  return {
    title: `${product.name} | Dragon Winch`,
    description,
    keywords: [
      product.name,
      product.category_name,
      "dragon winch",
      "çekme vinci",
      "meda endüstri",
      "vinç",
    ],
    openGraph: {
      title: `${product.name} | Meda Endüstri`,
      description,
      type: "website",
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Meda Endüstri`,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const shareUrl = `${siteUrl}/urunler/${product.slug}`;
  const images = [
    product.main_image,
    ...product.gallery.filter(Boolean),
  ].filter(Boolean);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: `${product.name} - ${product.category_name}. Dragon Winch ürünü, Meda Endüstri Türkiye distribütörü.`,
    image: images.length > 0 ? images : undefined,
    sku: String(product.id),
    brand: {
      "@type": "Brand",
      name: "Dragon Winch",
    },
    category: product.category_name,
    url: shareUrl,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Ürünler",
        item: `${siteUrl}/urunler`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: shareUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <ProductDetailClient product={product} shareUrl={shareUrl} />
    </>
  );
}
