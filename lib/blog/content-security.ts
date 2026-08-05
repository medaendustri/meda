import "server-only";
import sanitizeHtml from "sanitize-html";

const ALLOWED_IMAGE_HOSTS = new Set([
  "medaendustri.com",
  "www.medaendustri.com",
  "dragonwinch.com",
  "www.dragonwinch.com",
]);

export type SanitizedContent = {
  html: string;
  text: string;
  errors: string[];
  warnings: string[];
};

export function isAllowedImageUrl(value: string): boolean {
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && ALLOWED_IMAGE_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

export function sanitizeAndValidateArticleHtml(
  rawHtml: string,
): SanitizedContent {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (/<\s*h1(?:\s|>)/i.test(rawHtml)) {
    errors.push("İçerikte H1 kullanmayın; sayfa başlığı zaten H1 olarak üretilir.");
  }
  if (/<\s*(script|iframe|object|embed|form|input|button|style|svg)\b/i.test(rawHtml)) {
    errors.push("İçerik güvenli olmayan HTML etiketleri içeriyor.");
  }

  const html = sanitizeHtml(rawHtml, {
    allowedTags: [
      "p",
      "h2",
      "h3",
      "h4",
      "ul",
      "ol",
      "li",
      "a",
      "strong",
      "em",
      "b",
      "i",
      "br",
      "hr",
      "blockquote",
      "code",
      "pre",
      "figure",
      "figcaption",
      "img",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "width", "height", "loading"],
      th: ["scope"],
      td: ["colspan", "rowspan"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowProtocolRelative: false,
    exclusiveFilter(frame) {
      return frame.tag === "img" && !isAllowedImageUrl(frame.attribs.src || "");
    },
    transformTags: {
      a: (_tagName, attribs) => {
        const external = /^https?:\/\//i.test(attribs.href || "");
        return {
          tagName: "a",
          attribs: {
            ...attribs,
            ...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {}),
          },
        };
      },
      img: (_tagName, attribs) => ({
        tagName: "img",
        attribs: { ...attribs, loading: "lazy" },
      }),
    },
  });

  const text = sanitizeHtml(html, {
    allowedTags: [],
    allowedAttributes: {},
  })
    .replace(/\s+/g, " ")
    .trim();

  if (!text) errors.push("İçerik boş olamaz.");
  if (text.split(/\s+/).length < 100) {
    warnings.push("İçerik 100 kelimeden kısa; SEO açısından zayıf kalabilir.");
  }

  const headings = [...html.matchAll(/<h([2-4])\b/gi)].map((match) =>
    Number(match[1]),
  );
  for (let index = 1; index < headings.length; index += 1) {
    if (headings[index] - headings[index - 1] > 1) {
      warnings.push("Başlık hiyerarşisinde seviye atlaması var.");
      break;
    }
  }

  for (const image of html.matchAll(/<img\b([^>]*)>/gi)) {
    if (!/\balt\s*=\s*["'][^"']+["']/i.test(image[1])) {
      errors.push("Tüm içerik görsellerinde açıklayıcı alt metni zorunludur.");
      break;
    }
  }

  return { html, text, errors, warnings };
}
