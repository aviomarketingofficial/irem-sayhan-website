import { type ReactNode, useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { blogTopics } from "@/data/blog"
import { type BlogContent, hasBlogContent, loadBlogContent } from "@/data/blogContent"
import { BLOG_PUBLISH_DATE, BLOG_PUBLISH_DATE_ISO, blogMeta, categoryLabel } from "@/data/blogMeta"
import { type Faq } from "@/data/faqs"
import { relatedBlogForBlog, relatedFaqsForBlog } from "@/data/related"
import { APPOINTMENT_URL, WHATSAPP_URL } from "@/lib/links"
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, usePageMeta } from "@/lib/seo"
import { staticPageMeta } from "@/data/pageMeta"
import { BackToTop } from "@/components/BackToTop"
import { cn } from "@/lib/utils"

/* ---------- ikonlar ---------- */

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-4", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-4", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 2v4M16 2v4M3 10h18" />
      <rect x="3" y="4" width="18" height="18" rx="2" />
    </svg>
  )
}

function LinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
      <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1.2 2h6.4l4.4 5.9L18.9 2Zm-1.1 18h1.7L7.1 3.8H5.3L17.8 20Z" />
    </svg>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn("size-4", className)} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  )
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-4", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-4", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

/* ---------- yardımcılar ---------- */

// Gövde metnindeki "[metin](/yol)" kalıplarını dahili react-router <Link>'e çevirir.
// SADECE "/" ile başlayan site içi yollar linklenir; dış URL/HTML işlenmez.
// Kalıp yoksa metin olduğu gibi (düz string) döner.
function renderWithLinks(text: string): ReactNode {
  // split, her eşleşme için [öncesi, metin, yol] üçlüsü üretir.
  // (?!\/) — "//host" protokol-göreli dış adresleri dahili link sanmasın
  const parts = text.split(/\[([^\]]+)\]\((\/(?!\/)[^\s)]*)\)/g)
  if (parts.length === 1) return text
  const nodes: ReactNode[] = []
  for (let i = 0; i < parts.length; i += 3) {
    if (parts[i]) nodes.push(parts[i])
    const label = parts[i + 1]
    const path = parts[i + 2]
    if (label !== undefined && path !== undefined) {
      nodes.push(
        <Link key={i} to={path} className="text-primary underline-offset-4 hover:underline">
          {label}
        </Link>,
      )
    }
  }
  return nodes
}

// Yazı içi dönüşüm kartının bağlamsal başlığı (ilgili tedaviye göre)
const CTA_BY_TREATMENT: Record<string, string> = {
  "seffaf-plak": "Şeffaf plak tedavisi sizin için uygun mu?",
  "braket-tedavisi": "Diş teli tedavisi sizin için uygun mu?",
  "cerrahi-ortodonti": "Çene yapınız için net bir değerlendirme ister misiniz?",
  "damon-braket": "Damon Sistem sizin için uygun mu?",
  "lingual-ortodonti": "İçten takılan diş teli sizin için uygun mu?",
  "hareketli-ortodonti": "Çocuğunuz için doğru zamanı birlikte belirleyelim",
  "pekistirme": "Tedavi sonrası pekiştirme planınızı birlikte yapalım",
}

// Sayfa içi SSS: cevap yerinde açılır (SSS sayfasına gitmeden)
function InlineFaq({ faq }: { faq: Faq }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)
  const [maxH, setMaxH] = useState(0)

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    setMaxH(open ? el.scrollHeight : 0)
  }, [open])

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span
          className={cn(
            "text-sm font-medium leading-relaxed transition-colors sm:text-base",
            open ? "text-primary" : "text-[#0b2545]",
          )}
        >
          {faq.question}
        </span>
        <ChevronDownIcon
          className={cn(
            "shrink-0 text-muted-foreground transition-transform duration-300",
            open && "rotate-180 text-primary",
          )}
        />
      </button>
      <div
        style={{
          maxHeight: maxH,
          opacity: open ? 1 : 0,
          transition: "max-height 0.35s ease-in-out, opacity 0.3s ease-in-out",
        }}
      >
        <div ref={bodyRef} className="px-5 pb-5">
          <p className="text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
        </div>
      </div>
    </div>
  )
}

/* ---------- sayfa ---------- */

export function BlogYazi() {
  const { slug } = useParams<{ slug: string }>()
  const topic = blogTopics.find((t) => t.slug === slug)
  const meta = slug ? blogMeta[slug] : undefined

  // Tam içerik tembel yüklenir (her yazı kendi küçük chunk'ı)
  const [content, setContent] = useState<BlogContent | null>(null)
  const [contentReady, setContentReady] = useState(false)
  // Scroll-spy: görünürdeki bölüm
  const [activeSection, setActiveSection] = useState("")
  // Okuma ilerlemesi (0-1) ve bağlantı kopyalama geri bildirimi
  const [progress, setProgress] = useState(0)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let alive = true
    setContent(null)
    setContentReady(false)
    if (!hasBlogContent(slug)) {
      setContentReady(true)
      return
    }
    loadBlogContent(slug).then((c) => {
      if (!alive) return
      setContent(c ?? null)
      setContentReady(true)
    })
    return () => {
      alive = false
    }
  }, [slug])

  // Okuma ilerleme çubuğu
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [slug])

  // Scroll-spy: bölüm başlıklarını izle, aktif olanı vurgula
  useEffect(() => {
    if (!content) return
    const sections = Array.from(document.querySelectorAll("[data-toc-section]"))
    if (sections.length === 0) return
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveSection(visible[0].target.id)
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 },
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [content])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    })
  }

  const share = (kind: "whatsapp" | "copy" | "x") => {
    const url = window.location.href
    const title = content?.title ?? topic?.title ?? ""
    if (kind === "whatsapp") {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`,
        "_blank",
        "noopener,noreferrer",
      )
    } else if (kind === "x") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
        "_blank",
        "noopener,noreferrer",
      )
    } else {
      navigator.clipboard?.writeText(url).then(() => {
        setCopied(true)
        window.setTimeout(() => setCopied(false), 2000)
      })
    }
  }


  // Sayfa meta: içerik yüklendiyse gerçek title/description; konu yoksa noindex 404
  usePageMeta(
    topic
      ? {
          title: content?.title ?? topic.title,
          description: content?.metaDescription ?? topic.audience,
          path: `/blog/${topic.slug}`,
          type: "article",
          // Yapılandırılmış veri: yazı (kurumsal editör içeriği — hekime yazarlık atfı yok) + kırıntı yolu
          jsonld: [
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: content?.title ?? topic.title,
              description: content?.metaDescription ?? topic.audience,
              datePublished: BLOG_PUBLISH_DATE_ISO,
              dateModified: BLOG_PUBLISH_DATE_ISO,
              inLanguage: "tr",
              mainEntityOfPage: `${SITE_URL}/blog/${topic.slug}`,
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
                { "@type": "ListItem", position: 3, name: content?.title ?? topic.title },
              ],
            },
          ],
        }
      : { ...staticPageMeta["/404"], path: "/404", noindex: true },
  )

  if (!topic) {
    return (
      <section className="mx-auto flex min-h-[60svh] max-w-2xl flex-col items-center justify-center px-4 pb-20 pt-28 text-center sm:pt-36">
        <h1 className="text-2xl font-semibold tracking-tight text-[#0b2545] sm:text-3xl">
          Yazı bulunamadı
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base text-muted-foreground">
          Aradığınız yazı taşınmış ya da kaldırılmış olabilir. Diğer yazılara göz
          atmak ister misiniz?
        </p>
        <Button asChild className="mt-8 rounded-full">
          <Link to="/blog">Tüm yazılar</Link>
        </Button>
      </section>
    )
  }

  const relatedFaqs = relatedFaqsForBlog(topic.slug)
  const relatedPosts = relatedBlogForBlog(topic.slug)
  const title = content?.title ?? topic.title
  const ctaTitle =
    CTA_BY_TREATMENT[topic.relatedTreatment] ?? "Size uygun tedaviyi birlikte belirleyelim"

  const toc =
    content?.sections.map((s, i) => ({ id: `bolum-${i + 1}`, label: s.heading, n: i + 1 })) ?? []

  return (
    <>
      {/* Okuma ilerleme çubuğu */}
      <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-1">
        <div
          className="h-full bg-primary transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6 sm:pt-36 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm">
          <Link to="/" className="text-muted-foreground transition-colors hover:text-primary">
            Ana Sayfa
          </Link>
          <ChevronRightIcon className="size-3.5 text-muted-foreground/60" />
          <Link to="/blog" className="text-muted-foreground transition-colors hover:text-primary">
            Blog
          </Link>
          {meta && (
            <>
              <ChevronRightIcon className="size-3.5 text-muted-foreground/60" />
              <Link
                to={`/blog?kategori=${meta.category}`}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                {categoryLabel(meta.category)}
              </Link>
            </>
          )}
          <ChevronRightIcon className="size-3.5 text-muted-foreground/60" />
          <span className="line-clamp-1 max-w-[16rem] font-medium text-[#0b2545]">{title}</span>
        </nav>

        {/* Başlık + meta */}
        <header className="mt-8 max-w-3xl">
          <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {topic.keyword}
          </span>
          <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#0b2545] sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{topic.audience}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground">
            {meta && (
              <span className="inline-flex items-center gap-1.5">
                <ClockIcon />
                {meta.minutes} dk okuma
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <CalendarIcon />
              {BLOG_PUBLISH_DATE}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="text-sm">Paylaş:</span>
              <button
                type="button"
                onClick={() => share("whatsapp")}
                aria-label="WhatsApp'ta paylaş"
                className="inline-flex size-8 items-center justify-center rounded-full border border-border text-[#25D366] transition-colors hover:bg-muted"
              >
                <WhatsAppIcon />
              </button>
              <button
                type="button"
                onClick={() => share("copy")}
                aria-label="Bağlantıyı kopyala"
                className={cn(
                  "inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-border px-2.5 transition-colors hover:bg-muted",
                  copied ? "text-primary" : "text-[#0b2545]",
                )}
              >
                <LinkIcon />
                {copied && <span className="text-xs font-medium">Kopyalandı</span>}
              </button>
              <button
                type="button"
                onClick={() => share("x")}
                aria-label="X'te paylaş"
                className="inline-flex size-8 items-center justify-center rounded-full border border-border text-[#0b2545] transition-colors hover:bg-muted"
              >
                <XIcon />
              </button>
            </span>
          </div>
        </header>

        {/* Gövde: masaüstünde solda yapışkan içindekiler + sağda açık akış */}
        <div className="mt-10 lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
          {/* İçindekiler — masaüstü (yapışkan, scroll-spy) */}
          {toc.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-28 rounded-2xl border border-border bg-card p-5">
                <p className="text-sm font-semibold text-[#0b2545]">Bu yazıda</p>
                <ul className="mt-4 space-y-1">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => scrollToSection(item.id)}
                        className={cn(
                          "flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm leading-snug transition-colors",
                          activeSection === item.id
                            ? "bg-accent font-medium text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-[#0b2545]",
                        )}
                      >
                        <span
                          className={cn(
                            "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
                            activeSection === item.id
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground",
                          )}
                        >
                          {item.n}
                        </span>
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}

          <article className="max-w-3xl">
            {/* İçindekiler — mobil (bağlantı kartı) */}
            {toc.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-5 lg:hidden">
                <p className="text-sm font-semibold text-[#0b2545]">Bu yazıda</p>
                <ol className="mt-3 space-y-2">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => scrollToSection(item.id)}
                        className="flex items-start gap-2.5 text-left text-sm leading-snug text-muted-foreground transition-colors hover:text-primary"
                      >
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                          {item.n}
                        </span>
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Yazı gövdesi: tam içerik varsa açık akış, yoksa plan iskeleti */}
            {content ? (
              <div className="mt-8 lg:mt-0">
                {content.intro.map((p, i) => (
                  <p key={i} className="mt-4 text-base leading-relaxed text-foreground/90 first:mt-0">
                    {renderWithLinks(p)}
                  </p>
                ))}
                {content.sections.map((s, i) => (
                  <section
                    key={s.heading}
                    id={`bolum-${i + 1}`}
                    data-toc-section
                    className="mt-10 scroll-mt-28"
                  >
                    <h2 className="text-xl font-semibold tracking-tight text-[#0b2545] sm:text-2xl">
                      {i + 1}. {s.heading}
                    </h2>
                    {s.paragraphs.map((p, j) => (
                      <p key={j} className="mt-4 text-base leading-relaxed text-muted-foreground">
                        {renderWithLinks(p)}
                      </p>
                    ))}
                    {s.bullets && s.bullets.length > 0 && (
                      <ul className="mt-4 space-y-2.5">
                        {s.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-3 text-base leading-relaxed text-muted-foreground"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary"
                            />
                            <span>{renderWithLinks(b)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
                {/* Kapanış: muayene notu (normal paragraf olarak akar) */}
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                  {renderWithLinks(content.closing)}
                </p>
              </div>
            ) : contentReady ? (
              <section className="mt-8 lg:mt-0">
                <h2 className="text-xl font-semibold text-[#0b2545]">Bu yazıda</h2>
                <ol className="mt-6 space-y-4">
                  {topic.outline.map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {i + 1}
                      </span>
                      <p className="pt-1 text-base leading-relaxed text-[#0b2545]">{item}</p>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}

            {/* Yazı içi dönüşüm kartı */}
            <div className="mt-12 rounded-3xl border border-primary/20 bg-accent p-6 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <CalendarIcon className="size-5" />
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight text-[#0b2545] sm:text-xl">
                      {ctaTitle}
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Kişiye özel değerlendirme için randevunuzu alın ya da WhatsApp'tan yazın.
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col gap-2.5 sm:items-end">
                  <div className="flex flex-col gap-2.5 sm:flex-row">
                    <Button asChild className="h-10 rounded-full px-5 text-sm">
                      <a href={APPOINTMENT_URL} target="_blank" rel="noopener noreferrer">
                        Randevu Al
                      </a>
                    </Button>
                    <Button
                      asChild
                      className="h-10 rounded-full bg-[#25D366] px-4 text-sm text-white hover:bg-[#1fae57]"
                    >
                      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                        <WhatsAppIcon />
                        WhatsApp
                      </a>
                    </Button>
                  </div>
                  <Link
                    to={topic.relatedTreatment ? `/tedaviler/${topic.relatedTreatment}` : "/tedaviler"}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {topic.relatedTreatment ? "Tedavi sayfasını incele" : "Tedavilerimizi inceleyin"}
                    <ChevronRightIcon />
                  </Link>
                </div>
              </div>
            </div>

            {/* İlgili sorular: cevap sayfa içinde açılır */}
            {relatedFaqs.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xl font-semibold text-[#0b2545]">İlgili sorular</h2>
                <div className="mt-6 space-y-3">
                  {relatedFaqs.map((faq) => (
                    <InlineFaq key={faq.question} faq={faq} />
                  ))}
                </div>
                <Link
                  to="/sss"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  Tüm soruları gör
                  <ChevronRightIcon />
                </Link>
              </section>
            )}

            {/* İlgili yazılar (iç linkleme) */}
            {relatedPosts.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xl font-semibold text-[#0b2545]">İlgili yazılar</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {relatedPosts.map((post) => {
                    const postMeta = blogMeta[post.slug]
                    return (
                      <Link
                        key={post.slug}
                        to={`/blog/${post.slug}`}
                        className="group flex flex-col rounded-2xl border border-border bg-background p-5 transition-colors hover:border-primary/40 hover:bg-muted/40"
                      >
                        {postMeta && (
                          <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                            {categoryLabel(postMeta.category)}
                          </span>
                        )}
                        <p className="mt-3 text-base font-medium leading-snug text-[#0b2545] group-hover:text-primary">
                          {post.title}
                        </p>
                        {postMeta && (
                          <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                            <ClockIcon className="size-3.5" />
                            {postMeta.minutes} dk okuma
                          </span>
                        )}
                      </Link>
                    )
                  })}
                </div>
              </section>
            )}

            {/* Bilgilendirme uyarısı (editör içeriği) */}
            {contentReady && (
              <p className="mt-10 text-center text-sm text-muted-foreground">
                {content
                  ? "Bu yazı bilgilendirme amaçlı bir editör içeriğidir; hekim muayenesinin ve size özel tıbbi değerlendirmenin yerine geçmez."
                  : "Detaylı içerik yakında eklenecek. Bu arada merak ettiklerinizi bize sorabilirsiniz."}
              </p>
            )}
          </article>
        </div>
      </div>

      <BackToTop />
    </>
  )
}
