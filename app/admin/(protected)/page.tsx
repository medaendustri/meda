import type { Metadata } from "next";
import Link from "next/link";
import { FilePlus2, FileText, Package, Send } from "lucide-react";
import { getAdminArticles } from "@/lib/blog/repository";
import { getAdminProducts } from "@/lib/db";

export const metadata: Metadata = {
  title: "Admin Paneli",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const [articles, productsResult] = await Promise.all([
    getAdminArticles(),
    getAdminProducts({ perPage: 1 }),
  ]);
  const published = articles.filter((article) => article.status === "published");

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[#e66a68]">
            Genel bakış
          </p>
          <h1 className="text-3xl font-bold">İçerik durumu</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/urunler"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-3 font-semibold text-slate-200 hover:bg-slate-800"
          >
            <Package className="h-5 w-5" />
            Ürünler
          </Link>
          <Link
            href="/admin/haberler/yeni"
            className="inline-flex items-center gap-2 rounded-lg bg-[#d84948] px-4 py-3 font-semibold hover:bg-[#c73e3d]"
          >
            <FilePlus2 className="h-5 w-5" />
            Yeni haber
          </Link>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Haber (toplam)", value: articles.length, icon: FileText },
          { label: "Yayında", value: published.length, icon: Send },
          {
            label: "Taslak",
            value: articles.length - published.length,
            icon: FilePlus2,
          },
          {
            label: "Ürün",
            value: productsResult.total,
            icon: Package,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-800 bg-slate-900 p-5"
          >
            <stat.icon className="mb-4 h-5 w-5 text-[#e66a68]" />
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-sm text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
