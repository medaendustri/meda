import { ArticleForm } from "@/components/admin/article-form";

export default function NewArticlePage() {
  return (
    <div>
      <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[#e66a68]">
        Yeni içerik
      </p>
      <h1 className="mb-8 text-3xl font-bold">Haber oluştur</h1>
      <ArticleForm />
    </div>
  );
}
