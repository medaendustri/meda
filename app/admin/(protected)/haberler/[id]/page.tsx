import { notFound } from "next/navigation";
import { ArticleForm } from "@/components/admin/article-form";
import { getAdminArticleById } from "@/lib/blog/repository";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditArticlePage({ params }: PageProps) {
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id < 1) notFound();
  const article = await getAdminArticleById(id);
  if (!article) notFound();

  return (
    <div>
      <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[#e66a68]">
        İçerik düzenleme
      </p>
      <h1 className="mb-8 text-3xl font-bold">{article.title}</h1>
      <ArticleForm article={article} />
    </div>
  );
}
