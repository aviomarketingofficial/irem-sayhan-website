import { usePageMeta } from "@/lib/seo"
import { staticPageMeta } from "@/data/pageMeta"
import { useEffect, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { APPOINTMENT_URL, WHATSAPP_URL } from "@/lib/links"
import { faqs, faqCategories, type Faq } from "@/data/faqs"
import { blogTopics } from "@/data/blog"
import { relatedBlogForFaqCategory } from "@/data/related"

// Turkce buyuk/kucuk harf duyarsiz normalize: locale-aware kucult + aksan/uzanti sadelestir
function norm(s: string): string {
  return s
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/ş/g, "s")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/â/g, "a")
    .replace(/î/g, "i")
    .replace(/û/g, "u")
    .trim()
}

// Yapılandırılmış veri: tüm soru-cevaplar (statik liste, bir kez üretilir)
const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  )
}

function DoktorTakvimiIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  )
}

function FaqItem({ faq, isOpen, onToggle }: { faq: Faq; isOpen: boolean; onToggle: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [maxH, setMaxH] = useState(0)

  // Acik durumda gercek yuksekligi olcerek yumusak gecis saglar
  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    setMaxH(isOpen ? el.scrollHeight : 0)
  }, [isOpen, faq.answer])

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card transition-colors">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          "flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors sm:px-6 sm:py-5",
          isOpen ? "text-primary" : "text-[#0b2545] hover:text-primary",
        )}
      >
        <span className="text-base font-medium sm:text-lg">{faq.question}</span>
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
            isOpen ? "rotate-180 border-primary/30 bg-primary/10 text-primary" : "border-border text-[#0b2545]",
          )}
        >
          <ChevronIcon className="size-4" />
        </span>
      </button>
      <div
        style={{
          maxHeight: maxH,
          opacity: isOpen ? 1 : 0,
          transition: "max-height 0.35s ease-in-out, opacity 0.3s ease-in-out",
        }}
      >
        <div ref={contentRef} className="px-5 pb-5 sm:px-6 sm:pb-6">
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{faq.answer}</p>
        </div>
      </div>
    </div>
  )
}

export function SSS() {
  usePageMeta({ ...staticPageMeta["/sss"], path: "/sss", jsonld: [FAQ_JSONLD] })
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("Tümü")
  const [openKey, setOpenKey] = useState<string | null>(null)

  const categories = useMemo(() => ["Tümü", ...faqCategories], [])

  // Aktif kategoriye gore ilgili blog yazilari; "Tümü" ise genel oneriler.
  const relatedPosts = useMemo(() => {
    if (activeCategory === "Tümü") {
      const general = relatedBlogForFaqCategory("Genel", 3)
      return general.length > 0 ? general : blogTopics.slice(0, 3)
    }
    return relatedBlogForFaqCategory(activeCategory, 3)
  }, [activeCategory])

  const filtered = useMemo(() => {
    const q = norm(query)
    return faqs.filter((f) => {
      const inCategory = activeCategory === "Tümü" || f.category === activeCategory
      if (!inCategory) return false
      if (!q) return true
      return norm(f.question).includes(q) || norm(f.answer).includes(q)
    })
  }, [query, activeCategory])

  // Her soru icin benzersiz anahtar (kategori + soru); ayni anda tek cevap acik
  const keyOf = (f: Faq) => `${f.category}|${f.question}`

  // Filtre degisince acik olan kart artik gorunmuyorsa kapat
  useEffect(() => {
    if (openKey && !filtered.some((f) => keyOf(f) === openKey)) {
      setOpenKey(null)
    }
  }, [filtered, openKey])

  return (
    <section className="px-4 pb-24 pt-28 sm:pt-36">
      <div className="mx-auto max-w-3xl">
        {/* Baslik */}
        <header className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">Yardım Merkezi</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#0b2545] sm:text-4xl">
            Sıkça Sorulan Sorular
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Tedavi süreci, şeffaf plak, braketler, çocuk ortodontisi ve daha fazlası hakkında en çok merak edilenleri
            bir araya getirdik. Aradığınızı bulamazsanız bize ulaşmaktan çekinmeyin.
          </p>
        </header>

        {/* Canli arama */}
        <div className="mt-10">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Soru veya konu ara..."
              aria-label="Sorularda ara"
              className="h-13 w-full rounded-full border border-border bg-card py-3.5 pl-12 pr-12 text-base text-[#0b2545] shadow-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-3 focus:ring-primary/20"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Aramayı temizle"
                className="absolute right-3 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-[#0b2545]"
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Kategori cipleri */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => {
              const isActive = cat === activeCategory
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-card text-[#0b2545] hover:border-primary hover:text-primary",
                  )}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        {/* Accordion liste */}
        <div className="mt-10">
          {filtered.length > 0 ? (
            <div className="space-y-3">
              {filtered.map((faq) => {
                const k = keyOf(faq)
                return (
                  <FaqItem
                    key={k}
                    faq={faq}
                    isOpen={openKey === k}
                    onToggle={() => setOpenKey((prev) => (prev === k ? null : k))}
                  />
                )
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-muted/40 px-6 py-14 text-center">
              <h3 className="text-lg font-semibold text-[#0b2545]">Aradığınıza uygun bir soru bulamadık</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                Farklı bir kelimeyle aramayı veya kategori seçiminizi değiştirmeyi deneyebilirsiniz. Merak ettiğiniz
                konuyu doğrudan bize de sorabilirsiniz.
              </p>
              {(query || activeCategory !== "Tümü") && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("")
                    setActiveCategory("Tümü")
                  }}
                  className="mt-5 text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  Filtreleri temizle
                </button>
              )}
            </div>
          )}
        </div>

        {/* İlgili yazılar */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-primary">Blog</p>
                <h2 className="mt-1 text-xl font-semibold tracking-tight text-[#0b2545] sm:text-2xl">
                  İlgili yazılar
                </h2>
              </div>
              <Link
                to="/blog"
                className="hidden shrink-0 text-sm font-medium text-primary underline-offset-4 transition-colors hover:underline sm:inline"
              >
                Tüm yazılar
              </Link>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary hover:shadow-sm"
                >
                  <h3 className="text-base font-medium leading-snug text-[#0b2545] transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{post.audience}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Yazıyı oku
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA seridi */}
        <div className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b2545] to-[#13335c] px-6 py-10 text-center sm:px-10 sm:py-12">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">Aklınıza takılan başka bir şey mi var?</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
            Size özel net yanıtlar için bir muayene randevusu oluşturabilir ya da hızlıca WhatsApp üzerinden
            yazabilirsiniz.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild className="h-11 w-full rounded-full px-6 text-sm sm:w-auto">
              <a href={APPOINTMENT_URL} target="_blank" rel="noopener noreferrer">
                <DoktorTakvimiIcon className="size-4" />
                Randevu Al
              </a>
            </Button>
            <Button
              asChild
              className="h-11 w-full rounded-full bg-[#25D366] px-5 text-sm text-white hover:bg-[#1fae57] sm:w-auto"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-4" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
