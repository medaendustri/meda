import Link from "next/link";
import { Edit3, ExternalLink, FilePlus2 } from "lucide-react";
import { DeleteArticleButton } from "@/components/admin/delete-article-button";
import { getAdminArticles } from "@/lib/blog/repository";

export default async function AdminArticlesPage() {
  const articles = await getAdminArticles();

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[#e66a68]">
            Haber yönetimi
          </p>
          <h1 className="text-3xl font-bold">Tüm içerikler</h1>
        </div>
        <Link
          href="/admin/haberler/yeni"
          className="inline-flex items-center gap-2 rounded-lg bg-[#d84948] px-4 py-3 font-semibold hover:bg-[#c73e3d]"
        >
          <FilePlus2 className="h-5 w-5" />
          Yeni haber
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
        {articles.length === 0 ? (
          <p className="p-8 text-center text-slate-400">Henüz içerik yok.</p>
        ) : (
          <div className="divide-y divide-slate-800">
            {articles.map((article) => (
              <article
                key={article.id}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                        article.status === "published"
                          ? "bg-emerald-950 text-emerald-300"
                          : "bg-amber-950 text-amber-300"
                      }`}
                    >
                      {article.status === "published" ? "Yayında" : "Taslak"}
                    </span>
                    <span className="text-xs text-slate-500">
                      {article.category}
                    </span>
                  </div>
                  <h2 className="truncate font-bold text-white">{article.title}</h2>
                  <p className="truncate text-sm text-slate-400">/{article.slug}</p>
                </div>
                <div className="flex items-center gap-2">
                  {article.status === "published" && (
                    <Link
                      href={`/haberler/${article.slug}`}
                      target="_blank"
                      aria-label={`${article.title} haberini görüntüle`}
                      className="rounded-lg border border-slate-700 p-2 text-slate-300 hover:bg-slate-800"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  )}
                  <Link
                    href={`/admin/haberler/${article.id}`}
                    aria-label={`${article.title} haberini düzenle`}
                    className="rounded-lg border border-slate-700 p-2 text-slate-300 hover:bg-slate-800"
                  >
                    <Edit3 className="h-4 w-4" />
                  </Link>
                  <DeleteArticleButton id={article.id} title={article.title} />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
