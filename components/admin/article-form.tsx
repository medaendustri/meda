"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Loader2, Save } from "lucide-react";
import type { BlogArticle } from "@/lib/blog/repository";

const fieldClass =
  "w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none transition focus:border-[#d84948] focus:ring-2 focus:ring-[#d84948]/20";

function dateTimeLocal(value?: string | null) {
  return value ? new Date(value).toISOString().slice(0, 16) : "";
}

function slugify(value: string) {
  return value
    .toLocaleLowerCase("tr")
    .replace(/[çÇ]/g, "c")
    .replace(/[ğĞ]/g, "g")
    .replace(/[ıİ]/g, "i")
    .replace(/[öÖ]/g, "o")
    .replace(/[şŞ]/g, "s")
    .replace(/[üÜ]/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function ArticleForm({ article }: { article?: BlogArticle }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [warnings, setWarnings] = useState<string[]>([]);
  const [content, setContent] = useState(article?.contentHtml || "");
  const [preview, setPreview] = useState("");
  const [slug, setSlug] = useState(article?.slug || "");
  const [slugTouched, setSlugTouched] = useState(Boolean(article));

  async function getCsrf() {
    const response = await fetch("/api/auth/csrf", { cache: "no-store" });
    const data = await response.json();
    return data.token as string;
  }

  async function showPreview() {
    setError("");
    const response = await fetch("/api/admin/articles/preview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": await getCsrf(),
      },
      body: JSON.stringify({ html: content }),
    });
    const data = await response.json();
    if (!response.ok || data.errors?.length) {
      setError(data.error || data.errors.join(" "));
      return;
    }
    setWarnings(data.warnings || []);
    setPreview(data.html || "");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const publishedAt = String(form.get("publishedAt") || "");
    const payload = {
      title: form.get("title"),
      slug: form.get("slug"),
      excerpt: form.get("excerpt"),
      contentHtml: content,
      author: form.get("author"),
      category: form.get("category"),
      imageUrl: form.get("imageUrl"),
      featured: form.get("featured") === "on",
      status: form.get("status"),
      publishedAt: publishedAt ? new Date(publishedAt).toISOString() : "",
      seoTitle: form.get("seoTitle"),
      metaDescription: form.get("metaDescription"),
      keywords: String(form.get("keywords") || "")
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean),
      canonicalUrl: form.get("canonicalUrl"),
      robotsIndex: form.get("robotsIndex") === "on",
      robotsFollow: form.get("robotsFollow") === "on",
      ogTitle: form.get("ogTitle"),
      ogDescription: form.get("ogDescription"),
      ogImageUrl: form.get("ogImageUrl"),
      twitterTitle: form.get("twitterTitle"),
      twitterDescription: form.get("twitterDescription"),
      twitterImageUrl: form.get("twitterImageUrl"),
    };
    const response = await fetch(
      article ? `/api/admin/articles/${article.id}` : "/api/admin/articles",
      {
        method: article ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": await getCsrf(),
        },
        body: JSON.stringify(payload),
      },
    );
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const fieldErrors = data.issues?.fieldErrors;
      const details = fieldErrors
        ? Object.values(fieldErrors).flat().filter(Boolean).join(" ")
        : "";
      setError([data.error, details].filter(Boolean).join(" "));
      setPending(false);
      return;
    }
    setWarnings(data.warnings || []);
    router.push("/admin/haberler");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-8">
      <section className="grid gap-5 rounded-xl border border-slate-800 bg-slate-900 p-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold" htmlFor="title">
            Başlık
          </label>
          <input
            id="title"
            name="title"
            required
            minLength={10}
            maxLength={140}
            defaultValue={article?.title}
            onChange={(event) => {
              if (!slugTouched) setSlug(slugify(event.target.value));
            }}
            className={fieldClass}
          />
        </div>
        <Field label="Slug">
          <input
            name="slug"
            required
            value={slug}
            onChange={(event) => {
              setSlugTouched(true);
              setSlug(slugify(event.target.value));
            }}
            className={fieldClass}
          />
        </Field>
        <Field label="Kategori">
          <input
            name="category"
            required
            defaultValue={article?.category || "Rehber"}
            className={fieldClass}
          />
        </Field>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold" htmlFor="excerpt">
            Özet
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            required
            minLength={40}
            maxLength={320}
            rows={3}
            defaultValue={article?.excerpt}
            className={fieldClass}
          />
        </div>
        <Field label="Yazar">
          <input
            name="author"
            required
            defaultValue={article?.author || "Meda Endüstri"}
            className={fieldClass}
          />
        </Field>
        <Field label="Kapak görsel URL’si">
          <input
            name="imageUrl"
            required
            defaultValue={article?.imageUrl || "/hero/cekme-vinci.jpg"}
            className={fieldClass}
          />
        </Field>
        <Field label="Durum">
          <select
            name="status"
            defaultValue={article?.status || "draft"}
            className={fieldClass}
          >
            <option value="draft">Taslak</option>
            <option value="published">Yayında</option>
          </select>
        </Field>
        <Field label="Yayın tarihi">
          <input
            name="publishedAt"
            type="datetime-local"
            defaultValue={dateTimeLocal(article?.publishedAt)}
            className={fieldClass}
          />
        </Field>
        <label className="flex items-center gap-3 text-sm">
          <input
            name="featured"
            type="checkbox"
            defaultChecked={article?.featured}
            className="h-4 w-4 accent-[#d84948]"
          />
          Öne çıkan haber
        </label>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-bold">Semantic HTML içerik</h2>
            <p className="text-xs text-slate-400">
              H1 kullanmayın. Başlıklar H2 ile başlamalıdır.
            </p>
          </div>
          <button
            type="button"
            onClick={showPreview}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800"
          >
            <Eye className="h-4 w-4" />
            Güvenli önizleme
          </button>
        </div>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={20}
          spellCheck={false}
          className={`${fieldClass} font-mono leading-relaxed`}
          placeholder="<p>Giriş paragrafı...</p>&#10;<h2>Alt başlık</h2>"
        />
        {preview && (
          <iframe
            title="Sanitize edilmiş haber önizlemesi"
            sandbox=""
            srcDoc={`<!doctype html><html lang="tr"><head><style>body{font:16px/1.7 sans-serif;padding:24px;color:#172033}img{max-width:100%}h2,h3,h4{margin-top:1.5em}</style></head><body>${preview}</body></html>`}
            className="mt-4 h-96 w-full rounded-lg border border-slate-700 bg-white"
          />
        )}
      </section>

      <SeoFields article={article} />

      {(error || warnings.length > 0) && (
        <div className="space-y-2">
          {error && (
            <p role="alert" className="rounded-lg bg-red-950 p-3 text-red-200">
              {error}
            </p>
          )}
          {warnings.map((warning) => (
            <p key={warning} className="rounded-lg bg-amber-950 p-3 text-amber-200">
              {warning}
            </p>
          ))}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-lg bg-[#d84948] px-5 py-3 font-bold hover:bg-[#c73e3d] disabled:opacity-50"
      >
        {pending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
        Kaydet
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm font-semibold">
      <span className="mb-2 block">{label}</span>
      {children}
    </label>
  );
}

function SeoFields({ article }: { article?: BlogArticle }) {
  return (
    <section className="grid gap-5 rounded-xl border border-slate-800 bg-slate-900 p-5 md:grid-cols-2">
      <div className="md:col-span-2">
        <h2 className="font-bold">SEO ve sosyal paylaşım</h2>
        <p className="text-xs text-slate-400">
          Boş alanlarda başlık, özet ve kapak görseli otomatik kullanılır.
        </p>
      </div>
      {[
        ["SEO başlığı", "seoTitle", article?.seoTitle || ""],
        ["Meta açıklama", "metaDescription", article?.metaDescription || ""],
        [
          "Anahtar kelimeler (virgülle)",
          "keywords",
          article?.keywords.join(", ") || "",
        ],
        ["Canonical URL", "canonicalUrl", article?.canonicalUrl || ""],
        ["OG başlığı", "ogTitle", article?.ogTitle || ""],
        ["OG açıklaması", "ogDescription", article?.ogDescription || ""],
        ["OG görsel URL’si", "ogImageUrl", article?.ogImageUrl || ""],
        ["Twitter başlığı", "twitterTitle", article?.twitterTitle || ""],
        [
          "Twitter açıklaması",
          "twitterDescription",
          article?.twitterDescription || "",
        ],
        [
          "Twitter görsel URL’si",
          "twitterImageUrl",
          article?.twitterImageUrl || "",
        ],
      ].map(([label, name, value]) => (
        <Field key={name} label={label}>
          <input name={name} defaultValue={value} className={fieldClass} />
        </Field>
      ))}
      <label className="flex items-center gap-3 text-sm">
        <input
          name="robotsIndex"
          type="checkbox"
          defaultChecked={article?.robotsIndex ?? true}
          className="h-4 w-4 accent-[#d84948]"
        />
        Arama motorları indeksleyebilir
      </label>
      <label className="flex items-center gap-3 text-sm">
        <input
          name="robotsFollow"
          type="checkbox"
          defaultChecked={article?.robotsFollow ?? true}
          className="h-4 w-4 accent-[#d84948]"
        />
        Bağlantıları takip edebilir
      </label>
    </section>
  );
}
