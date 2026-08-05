"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, Loader2, Save } from "lucide-react";
import type { ParsedProduct } from "@/lib/db";

const fieldClass =
  "w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none transition focus:border-[#d84948] focus:ring-2 focus:ring-[#d84948]/20";

const STOCK_LABELS: Record<string, string> = {
  high: "Yüksek",
  medium: "Orta",
  low: "Düşük",
  out: "Tükendi",
};

function specsToText(specs: Record<string, string>) {
  return Object.entries(specs)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
}

function textToSpecs(value: string): Record<string, string> {
  const specs: Record<string, string> = {};
  for (const line of value.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const sep = trimmed.includes(":") ? ":" : trimmed.includes("=") ? "=" : null;
    if (!sep) continue;
    const index = trimmed.indexOf(sep);
    const key = trimmed.slice(0, index).trim();
    const val = trimmed.slice(index + 1).trim();
    if (key) specs[key] = val;
  }
  return specs;
}

function downloadsToText(downloads: Array<{ text: string; link: string }>) {
  return downloads.map((item) => `${item.text}|${item.link}`).join("\n");
}

function textToDownloads(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [text, ...rest] = line.split("|");
      return { text: text.trim(), link: rest.join("|").trim() };
    })
    .filter((item) => item.text && item.link);
}

function lines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function ProductForm({
  product,
  categoryUrls,
}: {
  product: ParsedProduct;
  categoryUrls: string[];
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [specsText, setSpecsText] = useState(specsToText(product.specs || {}));
  const [galleryText, setGalleryText] = useState(
    (product.gallery || []).join("\n"),
  );
  const [kitText, setKitText] = useState(
    (product.kit_components || []).join("\n"),
  );
  const [downloadsText, setDownloadsText] = useState(
    downloadsToText(product.downloads || []),
  );

  async function getCsrf() {
    const response = await fetch("/api/auth/csrf", { cache: "no-store" });
    const data = await response.json();
    return data.token as string;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get("name"),
      url: form.get("url"),
      category_url: form.get("category_url"),
      stock_status: form.get("stock_status"),
      main_image: form.get("main_image"),
      specs: textToSpecs(specsText),
      kit_components: lines(kitText),
      gallery: lines(galleryText),
      downloads: textToDownloads(downloadsText),
      performance_data: form.get("performance_data"),
    };

    const response = await fetch(`/api/admin/products/${product.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": await getCsrf(),
      },
      body: JSON.stringify(payload),
    });
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

    router.push("/admin/urunler");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      {error && (
        <p className="rounded-lg border border-red-900 bg-red-950/50 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-slate-300">Ürün adı</span>
          <input
            name="name"
            required
            defaultValue={product.name}
            className={fieldClass}
          />
          <span className="text-xs text-slate-500">
            Slug adıdan üretilir: /urunler/{product.slug}
          </span>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-300">Stok durumu</span>
          <select
            name="stock_status"
            defaultValue={product.stock_status || "high"}
            className={fieldClass}
          >
            {Object.entries(STOCK_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-300">Kategori URL</span>
          <input
            name="category_url"
            required
            list="category-urls"
            defaultValue={product.category_url}
            className={fieldClass}
          />
          <datalist id="category-urls">
            {categoryUrls.map((url) => (
              <option key={url} value={url} />
            ))}
          </datalist>
        </label>

        <label className="block space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-slate-300">
            Ana görsel URL
          </span>
          <input
            name="main_image"
            defaultValue={product.main_image || ""}
            placeholder="https://..."
            className={fieldClass}
          />
        </label>

        <label className="block space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-slate-300">
            Kaynak / katalog URL
          </span>
          <input
            name="url"
            defaultValue={product.url || ""}
            placeholder="https://..."
            className={fieldClass}
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-300">
          Teknik özellikler (satır başına: Anahtar: Değer)
        </span>
        <textarea
          value={specsText}
          onChange={(event) => setSpecsText(event.target.value)}
          rows={8}
          className={`${fieldClass} font-mono`}
          placeholder={"Çekiş kuvveti: 12000 lbs\nMotor: 6.0 HP"}
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-300">
          Kit içeriği (satır başına bir madde)
        </span>
        <textarea
          value={kitText}
          onChange={(event) => setKitText(event.target.value)}
          rows={5}
          className={fieldClass}
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-300">
          Galeri görselleri (satır başına URL)
        </span>
        <textarea
          value={galleryText}
          onChange={(event) => setGalleryText(event.target.value)}
          rows={5}
          className={`${fieldClass} font-mono`}
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-300">
          İndirmeler (satır başına: Başlık|URL)
        </span>
        <textarea
          value={downloadsText}
          onChange={(event) => setDownloadsText(event.target.value)}
          rows={4}
          className={`${fieldClass} font-mono`}
          placeholder="Katalog PDF|https://..."
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-300">
          Performans / ek açıklama
        </span>
        <textarea
          name="performance_data"
          defaultValue={product.performance_data || ""}
          rows={6}
          className={fieldClass}
        />
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-lg bg-[#d84948] px-5 py-3 font-semibold hover:bg-[#c73e3d] disabled:opacity-60"
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Kaydet
        </button>
        <a
          href={`/urunler/${product.slug}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-3 text-slate-300 hover:bg-slate-800"
        >
          <ExternalLink className="h-4 w-4" />
          Sitede gör
        </a>
      </div>
    </form>
  );
}
