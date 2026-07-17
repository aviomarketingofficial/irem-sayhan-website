// Sayfa başına SEO meta yönetimi (SPA): route değişince title, description,
// canonical, Open Graph / Twitter etiketleri ve JSON-LD güncellenir.
// Domain tek yerden yönetilir: SITE_URL.
import { useEffect } from "react"
import { PHOTO_CDN } from "@/lib/links"

export const SITE_URL = "https://manisaortodonti.com"
export const SITE_NAME = "Dr. İrem Seyhan Uyarcan"
// OG görseli de jsDelivr'dan (mutlak URL); repo düz kök: anasayfa-hero-074.jpg
export const DEFAULT_OG_IMAGE = `${PHOTO_CDN}/anasayfa-hero-074.jpg`

export type PageMeta = {
  /** Tarayıcı sekmesi + Google başlığı */
  title: string
  /** Google açıklaması (140-160 karakter hedef) */
  description: string
  /** Kanonik yol, ör. "/tedaviler/seffaf-plak" */
  path: string
  /** Mutlak görsel URL'si (OG/Twitter); yoksa varsayılan */
  image?: string
  /** OG tipi; blog yazılarında "article" */
  type?: "website" | "article"
  /** 404 gibi indekslenmeyecek sayfalar için */
  noindex?: boolean
  /** Sayfaya özel yapılandırılmış veri (schema.org JSON-LD) */
  jsonld?: object[]
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
}

/** Kanonik yolu normalize eder: baştaki "/" garanti, kök hariç sondaki "/" atılır. */
function canonicalPath(path: string): string {
  let p = path.startsWith("/") ? path : `/${path}`
  if (p.length > 1) p = p.replace(/\/+$/, "")
  return p === "" ? "/" : p
}

export function applyPageMeta(meta: PageMeta) {
  const url = SITE_URL + canonicalPath(meta.path)
  const image = meta.image ?? DEFAULT_OG_IMAGE

  document.title = meta.title
  upsertMeta("name", "description", meta.description)
  upsertMeta("name", "robots", meta.noindex ? "noindex, nofollow" : "index, follow")

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement("link")
    canonical.rel = "canonical"
    document.head.appendChild(canonical)
  }
  canonical.href = url

  upsertMeta("property", "og:title", meta.title)
  upsertMeta("property", "og:description", meta.description)
  upsertMeta("property", "og:url", url)
  upsertMeta("property", "og:type", meta.type ?? "website")
  upsertMeta("property", "og:image", image)
  upsertMeta("property", "og:site_name", SITE_NAME)
  upsertMeta("property", "og:locale", "tr_TR")

  upsertMeta("name", "twitter:card", "summary_large_image")
  upsertMeta("name", "twitter:title", meta.title)
  upsertMeta("name", "twitter:description", meta.description)
  upsertMeta("name", "twitter:image", image)

  // Sayfaya özel JSON-LD: öncekileri temizle, yenilerini ekle
  document.head.querySelectorAll("script[data-seo-jsonld]").forEach((s) => s.remove())
  for (const obj of meta.jsonld ?? []) {
    const s = document.createElement("script")
    s.type = "application/ld+json"
    s.setAttribute("data-seo-jsonld", "")
    s.textContent = JSON.stringify(obj)
    document.head.appendChild(s)
  }
}

/** Sayfa bileşeninin en üstünde çağrılır; meta değişince yeniden uygular. */
export function usePageMeta(meta: PageMeta) {
  const key = JSON.stringify(meta)
  useEffect(() => {
    applyPageMeta(JSON.parse(key) as PageMeta)
  }, [key])
}
