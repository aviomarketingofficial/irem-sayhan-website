// Build sonrası prerender (bun scripts/prerender.ts — bağımlılık yok).
// dist/index.html'i şablon alır; her route için dist/<route>/index.html üretir:
//   - head route'a göre değişir (title, description, canonical, OG/Twitter, JSON-LD)
//   - <div id="root"> içine basit semantik HTML konur (React mount olunca değiştirir)
// Ana sayfa "/" dist/index.html olarak KALIR (sinematik sahne — gövde gömme yok).
// Veri kaynakları sayfa kodlarıyla aynı: pageMeta.ts, treatments.ts, faqs.ts,
// blogMeta.ts ve src/data/blog-content/*.json — şemalar sayfadakiyle bire bir.
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"

import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "../src/lib/seo"
import { staticPageMeta, treatmentPageMeta } from "../src/data/pageMeta"
import { treatments } from "../src/data/treatments"
import { faqs, faqById, HOME_FAQ_IDS, type Faq } from "../src/data/faqs"
import { BLOG_PUBLISH_DATE_ISO } from "../src/data/blogMeta"
import type { BlogContent } from "../src/data/blogContent"
import { HERO_INTRO, HERO_TITLE } from "../src/data/home"
import {
  ABOUT_LEAD,
  ABOUT_PARAGRAPHS,
  INTERESTS,
  TIMELINE,
  VALUES,
} from "../src/data/about"
import {
  ADDRESS,
  EMAIL,
  EMAIL_URL,
  LANDLINE_DISPLAY,
  LANDLINE_TEL,
  PHONE_DISPLAY,
  PHONE_TEL,
  WORKING_HOURS,
} from "../src/lib/links"

const ROOT = join(import.meta.dir, "..")
const DIST = join(ROOT, "dist")
const BLOG_DIR = join(ROOT, "src", "data", "blog-content")

/* ---------- yardımcılar ---------- */

// Metin ve attribute değerleri için HTML kaçışı
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

// Paragraf metni: önce kaçır, sonra [metin](/yol) biçimindeki iç linkleri <a>'ya çevir
function paragraph(s: string): string {
  return esc(s).replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, '<a href="$2">$1</a>')
}

// Şablonda regex eşleşmesi zorunlu — bulunamazsa build'i yüksek sesle kır
function mustReplace(html: string, re: RegExp, replacement: string, what: string): string {
  if (!re.test(html)) throw new Error(`prerender: şablonda bulunamadı: ${what}`)
  return html.replace(re, replacement)
}

type RouteMeta = {
  title: string
  description: string
  path: string // kanonik yol, ör. "/tedaviler/seffaf-plak"
  image?: string // mutlak OG görseli; yoksa varsayılan
  type?: "website" | "article"
  noindex?: boolean
  jsonld?: object[] // sayfa kodundaki şemalarla AYNI içerik
}

// Şablon head'ini route'a göre günceller, gövdeyi <div id="root"> içine koyar
function renderPage(template: string, meta: RouteMeta, body: string): string {
  const url = SITE_URL + meta.path
  const image = meta.image ?? DEFAULT_OG_IMAGE
  let html = template

  html = mustReplace(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`, "<title>")
  html = mustReplace(
    html,
    /(<meta name="description" content=")[^"]*(" \/>)/,
    `$1${esc(meta.description)}$2`,
    "meta description",
  )
  html = mustReplace(
    html,
    /(<link rel="canonical" href=")[^"]*(" \/>)/,
    `$1${esc(url)}$2`,
    "canonical",
  )
  html = mustReplace(
    html,
    /(<meta property="og:title" content=")[^"]*(" \/>)/,
    `$1${esc(meta.title)}$2`,
    "og:title",
  )
  html = mustReplace(
    html,
    /(<meta property="og:description" content=")[^"]*(" \/>)/,
    `$1${esc(meta.description)}$2`,
    "og:description",
  )
  html = mustReplace(
    html,
    /(<meta property="og:url" content=")[^"]*(" \/>)/,
    `$1${esc(url)}$2`,
    "og:url",
  )
  html = mustReplace(
    html,
    /(<meta property="og:type" content=")[^"]*(" \/>)/,
    `$1${meta.type ?? "website"}$2`,
    "og:type",
  )
  html = mustReplace(
    html,
    /(<meta property="og:image" content=")[^"]*(" \/>)/,
    `$1${esc(image)}$2`,
    "og:image",
  )

  // Twitter karşılıkları: şablonda yalnızca twitter:card var, kalanını ekle
  html = mustReplace(
    html,
    /(<meta name="twitter:card" content="summary_large_image" \/>)/,
    `$1\n    <meta name="twitter:title" content="${esc(meta.title)}" />\n    <meta name="twitter:description" content="${esc(meta.description)}" />\n    <meta name="twitter:image" content="${esc(image)}" />`,
    "twitter:card",
  )

  // İndekslenmeyecek sayfalar (404) için robots
  if (meta.noindex) {
    html = mustReplace(
      html,
      /(<meta name="viewport"[^>]*\/>)/,
      `$1\n    <meta name="robots" content="noindex, nofollow" />`,
      "viewport (robots eklemek için)",
    )
  }

  // Sayfaya özel JSON-LD: data-seo-jsonld ile — React mount olunca
  // src/lib/seo.ts bunları silip aynılarını yeniden ekler (çiftlenme olmaz)
  if (meta.jsonld && meta.jsonld.length > 0) {
    const scripts = meta.jsonld
      .map(
        (obj) =>
          `    <script type="application/ld+json" data-seo-jsonld>${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`,
      )
      .join("\n")
    html = mustReplace(html, /(\n\s*<\/head>)/, `\n${scripts}$1`, "</head>")
  }

  // Gövde: root'un İÇİNE basit semantik HTML (inline stil/sınıf yok).
  //
  // GEÇİCİ ÇÖZÜM — display:none neden var:
  // Bu HTML'de CSS sınıfı yok (bilerek; bot temiz metin görsün diye). Ama tarayıcı
  // onu React gelmeden önce boyuyordu ve kullanıcı ~850 ms boyunca stilsiz, txt
  // gibi bir sayfa görüyordu. Gizleyince kullanıcı bu değişiklikten önceki hâline
  // dönüyor (kısa beyaz ekran), bot ise metni okumaya devam ediyor:
  //   - JS çalıştırmayan botlar (AI tarayıcıları) CSS uygulamaz → metni görür
  //   - Googlebot JS çalıştırır → zaten React'in çizdiği asıl sayfayı görür
  //   - Aynı HTML herkese gidiyor; içerik React'in gösterdiğiyle birebir aynı
  // Kalıcı çözüm hydration: prerender React'i gerçekten çalıştırır, çıktı
  // tasarımlı olur ve bu sarmalayıcıya hiç gerek kalmaz.
  html = mustReplace(
    html,
    /<div id="root"><\/div>/,
    `<div id="root"><div data-prerender hidden style="display:none">\n${body}\n    </div></div>`,
    '<div id="root">',
  )

  return html
}

// dist/<route>/index.html olarak yazar
function writeRoute(routePath: string, html: string) {
  const dir = join(DIST, ...routePath.split("/").filter(Boolean))
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, "index.html"), html, "utf8")
}

// Statik sayfalar için ana bağlantı listesi (kendisi hariç)
const MAIN_LINKS: { href: string; label: string }[] = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/tedaviler", label: "Tedaviler" },
  { href: "/blog", label: "Blog" },
  { href: "/sss", label: "Sıkça Sorulan Sorular" },
  { href: "/iletisim", label: "İletişim" },
]

function linkList(items: { href: string; label: string }[]): string {
  return `<ul>\n${items.map((l) => `        <li><a href="${l.href}">${esc(l.label)}</a></li>`).join("\n")}\n      </ul>`
}

function staticBody(
  h1: string,
  summary: string,
  items: { href: string; label: string }[],
  sections: string[] = [],
): string {
  return [
    `      <main>`,
    `      <h1>${esc(h1)}</h1>`,
    `      <p>${esc(summary)}</p>`,
    ...sections,
    `      <nav>${linkList(items)}</nav>`,
    `      </main>`,
  ].join("\n")
}

/* ---------- gövde bölümleri ----------
   KURAL: buradaki tüm METİN veri dosyalarından gelir (faqs.ts, treatments.ts,
   home.ts, about.ts, links.ts). Elle metin yazılmaz — yoksa sitedeki metin
   değişince statik HTML eskir ve bota/insana farklı içerik gitmiş olur.
   Yalnızca <h2> bölüm etiketleri yapısaldır. */

function faqSection(heading: string, list: Faq[]): string[] {
  return [
    `      <section>`,
    `      <h2>${esc(heading)}</h2>`,
    ...list.flatMap((f) => [
      `      <h3>${esc(f.question)}</h3>`,
      `      <p>${esc(f.answer)}</p>`,
    ]),
    `      </section>`,
  ]
}

function treatmentSection(heading: string): string[] {
  return [
    `      <section>`,
    `      <h2>${esc(heading)}</h2>`,
    ...treatments.flatMap((t) => [
      `      <h3><a href="/tedaviler/${t.slug}">${esc(t.title)}</a></h3>`,
      `      <p>${esc(t.short)}</p>`,
    ]),
    `      </section>`,
  ]
}

function contactSection(heading: string): string[] {
  return [
    `      <section>`,
    `      <h2>${esc(heading)}</h2>`,
    `      <p>${esc(ADDRESS)}</p>`,
    `      <p>Telefon: <a href="${PHONE_TEL}">${esc(PHONE_DISPLAY)}</a></p>`,
    `      <p>Sabit hat: <a href="${LANDLINE_TEL}">${esc(LANDLINE_DISPLAY)}</a></p>`,
    `      <p>E-posta: <a href="${EMAIL_URL}">${esc(EMAIL)}</a></p>`,
    `      <ul>`,
    ...WORKING_HOURS.map((h) => `        <li>${esc(h.label)}: ${esc(h.value)}</li>`),
    `      </ul>`,
    `      </section>`,
  ]
}

function aboutSections(): string[] {
  return [
    `      <section>`,
    `      <h2>Kısa bir tanışma</h2>`,
    ...ABOUT_PARAGRAPHS.map((p) => `      <p>${esc(p)}</p>`),
    `      </section>`,
    `      <section>`,
    `      <h2>Eğitim ve deneyim</h2>`,
    ...TIMELINE.flatMap((t) => [
      `      <h3>${esc(t.year)} — ${esc(t.title)}</h3>`,
      `      <p>${esc(t.detail)}</p>`,
    ]),
    `      </section>`,
    `      <section>`,
    `      <h2>İlgi alanları</h2>`,
    `      <ul>`,
    ...INTERESTS.map((i) => `        <li>${esc(i)}</li>`),
    `      </ul>`,
    `      </section>`,
    `      <section>`,
    `      <h2>Yaklaşımım</h2>`,
    ...VALUES.flatMap((v) => [
      `      <h3>${esc(v.title)}</h3>`,
      `      <p>${esc(v.text)}</p>`,
    ]),
    `      </section>`,
  ]
}

/* ---------- veri: blog içerikleri ---------- */

const blogContents: BlogContent[] = readdirSync(BLOG_DIR)
  .filter((f) => f.endsWith(".json"))
  .sort()
  .map((f) => JSON.parse(readFileSync(join(BLOG_DIR, f), "utf8")) as BlogContent)

/* ---------- şablon ---------- */

const template = readFileSync(join(DIST, "index.html"), "utf8")
let count = 0

/* ---------- statik sayfalar ---------- */

// SSS sayfasındaki FAQ_JSONLD ile aynı içerik (src/pages/SSS.tsx)
const faqJsonld = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
}

// Sayfaların gerçek h1 metinleri (sayfa bileşenleriyle uyumlu)
const staticPages: {
  path: string
  h1: string
  links: { href: string; label: string }[]
  jsonld?: object[]
  sections?: string[]
}[] = [
  {
    path: "/hakkimda",
    h1: "Dr. İrem Seyhan Uyarcan",
    links: MAIN_LINKS.filter((l) => l.href !== "/hakkimda"),
    sections: [`      <p>${esc(ABOUT_LEAD)}</p>`, ...aboutSections()],
  },
  {
    path: "/tedaviler",
    h1: "Size uygun ortodontik tedavi",
    links: treatments.map((t) => ({ href: `/tedaviler/${t.slug}`, label: t.title })),
    sections: treatmentSection("Tedaviler"),
  },
  {
    path: "/blog",
    h1: "Blog",
    links: blogContents.map((c) => ({ href: `/blog/${c.slug}`, label: c.title })),
  },
  {
    path: "/sss",
    h1: "Sıkça Sorulan Sorular",
    links: MAIN_LINKS.filter((l) => l.href !== "/sss"),
    jsonld: [faqJsonld],
    sections: faqSection("Sorular ve yanıtları", faqs),
  },
  {
    path: "/iletisim",
    h1: "İletişim",
    links: MAIN_LINKS.filter((l) => l.href !== "/iletisim"),
    sections: contactSection("Muayenehane bilgileri"),
  },
]

for (const page of staticPages) {
  const meta = staticPageMeta[page.path]
  if (!meta) throw new Error(`prerender: staticPageMeta kaydı yok: ${page.path}`)
  const html = renderPage(
    template,
    { ...meta, path: page.path, jsonld: page.jsonld },
    staticBody(page.h1, meta.description, page.links, page.sections),
  )
  writeRoute(page.path, html)
  count++
}

/* ---------- tedavi detay sayfaları ---------- */

for (const t of treatments) {
  const meta = treatmentPageMeta[t.slug] ?? {
    // TedaviDetay.tsx'teki yedek üretimle aynı
    title: `${t.title} | Dr. İrem Seyhan Uyarcan`,
    description: t.short,
  }
  // Kırıntı yolu — TedaviDetay.tsx'teki BreadcrumbList ile aynı
  const jsonld = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Tedaviler", item: `${SITE_URL}/tedaviler` },
        { "@type": "ListItem", position: 3, name: t.title },
      ],
    },
  ]
  const body = [
    `      <main>`,
    `      <h1>${esc(t.title)}</h1>`,
    `      <p>${esc(t.intro)}</p>`,
    `      <section>`,
    `      <h2>Kimler için uygun?</h2>`,
    `      <ul>`,
    ...t.forWhom.map((item) => `        <li>${esc(item)}</li>`),
    `      </ul>`,
    `      </section>`,
    `      <section>`,
    `      <h2>Süreç</h2>`,
    `      <p>${esc(t.process)}</p>`,
    `      </section>`,
    `      <p><a href="/tedaviler">Tüm tedaviler</a></p>`,
    `      </main>`,
  ].join("\n")
  const html = renderPage(
    template,
    {
      ...meta,
      path: `/tedaviler/${t.slug}`,
      image: t.image || undefined, // t.image zaten mutlak jsDelivr URL'i
      jsonld,
    },
    body,
  )
  writeRoute(`/tedaviler/${t.slug}`, html)
  count++
}

/* ---------- blog yazıları ---------- */

for (const c of blogContents) {
  const path = `/blog/${c.slug}`
  // BlogYazi.tsx'teki BlogPosting + BreadcrumbList ile aynı içerik
  const jsonld = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: c.title,
      description: c.metaDescription,
      datePublished: BLOG_PUBLISH_DATE_ISO,
      dateModified: BLOG_PUBLISH_DATE_ISO,
      inLanguage: "tr",
      mainEntityOfPage: `${SITE_URL}${path}`,
      image: DEFAULT_OG_IMAGE,
      author: {
        "@type": "Organization",
        name: "Dr. İrem Seyhan Uyarcan Muayenehanesi Editör Ekibi",
      },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: c.title },
      ],
    },
  ]
  const parts: string[] = [`      <main>`, `      <article>`, `      <h1>${esc(c.title)}</h1>`]
  for (const p of c.intro) parts.push(`      <p>${paragraph(p)}</p>`)
  c.sections.forEach((s, i) => {
    parts.push(`      <section>`)
    // Sayfadaki görünümle aynı: başlıklar numaralı
    parts.push(`      <h2>${i + 1}. ${esc(s.heading)}</h2>`)
    for (const p of s.paragraphs) parts.push(`      <p>${paragraph(p)}</p>`)
    if (s.bullets && s.bullets.length > 0) {
      parts.push(`      <ul>`)
      for (const b of s.bullets) parts.push(`        <li>${paragraph(b)}</li>`)
      parts.push(`      </ul>`)
    }
    parts.push(`      </section>`)
  })
  parts.push(`      <p>${paragraph(c.closing)}</p>`)
  parts.push(`      <p><a href="/blog">Tüm yazılar</a></p>`)
  parts.push(`      </article>`)
  parts.push(`      </main>`)
  const html = renderPage(
    template,
    {
      title: c.title,
      description: c.metaDescription,
      path,
      type: "article",
      jsonld,
    },
    parts.join("\n"),
  )
  writeRoute(path, html)
  count++
}

/* ---------- ana sayfa ---------- */

// "/" şablonun kendisidir (dist/index.html). Gövdesi boş kaldığı için JavaScript
// çalıştırmayan botlar — özellikle AI tarayıcıları — burada hiçbir şey görmüyordu.
// Şablon yukarıda (satır ~178) zaten okunduğu için bu dosyayı şimdi güvenle yazabiliriz.
const homeMeta = staticPageMeta["/"]
if (!homeMeta) throw new Error("prerender: staticPageMeta kaydı yok: /")
const homeBody = [
  `      <main>`,
  `      <h1>${esc(HERO_TITLE)}</h1>`,
  `      <p>${esc(HERO_INTRO)}</p>`,
  ...treatmentSection("Tedavilerimiz"),
  ...faqSection("Merak edilenler", HOME_FAQ_IDS.map(faqById)),
  ...contactSection("Muayenehane"),
  `      <nav>${linkList(MAIN_LINKS.filter((l) => l.href !== "/"))}</nav>`,
  `      </main>`,
].join("\n")
writeFileSync(
  join(DIST, "index.html"),
  renderPage(template, { ...homeMeta, path: "/" }, homeBody),
  "utf8",
)
count++

/* ---------- 404 sayfası ---------- */

// Cloudflare "not_found_handling": "404-page" bu dosyayı döndürür; script'ler
// şablondan geldiği için React yine mount olur ve kendi 404 görünümünü çizer.
const notFoundMeta = staticPageMeta["/404"]
const notFoundBody = [
  `      <main>`,
  `      <h1>Aradığınız sayfa bulunamadı</h1>`,
  `      <p>Aradığınız sayfa taşınmış ya da kaldırılmış olabilir.</p>`,
  `      <p><a href="/">Ana sayfaya dön</a></p>`,
  `      </main>`,
].join("\n")
writeFileSync(
  join(DIST, "404.html"),
  renderPage(template, { ...notFoundMeta, path: "/404", noindex: true }, notFoundBody),
  "utf8",
)

console.log(`prerender: ${count} route + dist/404.html üretildi`)
