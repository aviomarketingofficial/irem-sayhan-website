import { SITE_URL, usePageMeta } from "@/lib/seo"
import { staticPageMeta, treatmentPageMeta } from "@/data/pageMeta"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { treatments } from "@/data/treatments"
import {
  recommendedTreatments,
  relatedBlogForTreatment,
  relatedFaqsForTreatment,
} from "@/data/related"
import { APPOINTMENT_URL, WHATSAPP_URL } from "@/lib/links"

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  )
}

function CalendarIcon({ className }: { className?: string }) {
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

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
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

export function TedaviDetay() {
  const { slug } = useParams()
  const treatment = treatments.find((t) => t.slug === slug)
  // İlgili sorular akordeonu: açık olan sorunun metni (tek seferde bir tanesi açık)
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  // Sayfa meta: özel kayıt varsa onu, yoksa tedavi verisinden üret; bulunamadıysa noindex
  const tMeta = slug ? treatmentPageMeta[slug] : undefined
  // Yapılandırılmış veri: kırıntı yolu (Ana Sayfa > Tedaviler > tedavi)
  const jsonld = treatment
    ? [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Tedaviler", item: `${SITE_URL}/tedaviler` },
            { "@type": "ListItem", position: 3, name: treatment.title },
          ],
        },
      ]
    : undefined
  // OG/Twitter görseli: tedavinin kendi görseli (zaten mutlak jsDelivr URL'i) varsa onu kullan
  const ogImage = treatment?.image ? { image: treatment.image } : undefined
  usePageMeta(
    treatment
      ? tMeta
        ? { ...tMeta, path: `/tedaviler/${treatment.slug}`, jsonld, ...ogImage }
        : {
            title: `${treatment.title} | Dr. İrem Seyhan Uyarcan`,
            description: treatment.short,
            path: `/tedaviler/${treatment.slug}`,
            jsonld,
            ...ogImage,
          }
      : { ...staticPageMeta["/404"], path: "/404", noindex: true },
  )

  // Tedavi bulunamazsa nazik mesaj
  if (!treatment) {
    return (
      <section className="mx-auto flex min-h-[60svh] max-w-3xl flex-col items-center justify-center px-4 pb-20 pt-28 text-center sm:pt-36">
        <h1 className="text-3xl font-semibold tracking-tight text-[#0b2545] sm:text-4xl">
          Tedaviyi bulamadık
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
          Aradığınız tedavi sayfasına ulaşamadık. Tüm tedavileri inceleyerek size uygun olanı
          bulabilirsiniz.
        </p>
        <Button asChild className="mt-8 h-11 rounded-full px-6 text-sm">
          <Link to="/tedaviler">Tüm tedavilere dön</Link>
        </Button>
      </section>
    )
  }

  const relatedFaqs = relatedFaqsForTreatment(treatment.slug, 4)
  const relatedPosts = relatedBlogForTreatment(treatment.slug, 4)
  const recommended = recommendedTreatments(treatment.slug)

  return (
    <article className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6 sm:pt-36 lg:px-8">
      {/* Breadcrumb: Ana Sayfa > Tedaviler > tedavi (JSON-LD ile aynı yol) */}
      <nav aria-label="breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm">
        <Link to="/" className="text-muted-foreground transition-colors hover:text-primary">
          Ana Sayfa
        </Link>
        <ChevronRightIcon className="size-3.5 text-muted-foreground/60" />
        <Link
          to="/tedaviler"
          className="text-muted-foreground transition-colors hover:text-primary"
        >
          Tedaviler
        </Link>
        <ChevronRightIcon className="size-3.5 text-muted-foreground/60" />
        <span className="line-clamp-1 max-w-[16rem] font-medium text-[#0b2545]">
          {treatment.title}
        </span>
      </nav>

      {/* Hero */}
      <header className="mt-8">
        <h1 className="text-3xl font-semibold tracking-tight text-[#0b2545] sm:text-4xl">
          {treatment.title}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{treatment.short}</p>
      </header>

      {/* Medya: video varsa açılınca otomatik oynar (sessiz, loop); yoksa görsel */}
      {(treatment.video || treatment.image) && (
        <div className="mt-8 overflow-hidden rounded-3xl bg-[#0b2545] shadow-sm">
          {treatment.video ? (
            <video
              src={treatment.video}
              poster={treatment.image}
              autoPlay
              muted
              loop
              playsInline
              className="aspect-video w-full object-cover"
            />
          ) : (
            <img
              src={treatment.image}
              alt={treatment.title}
              className="aspect-video w-full object-cover"
            />
          )}
        </div>
      )}

      {/* Giriş */}
      <p className="mt-8 text-base leading-relaxed text-foreground/90">{treatment.intro}</p>

      {/* Kimler için uygun */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-[#0b2545]">Kimler için uygun?</h2>
        <ul className="mt-4 grid gap-3">
          {treatment.forWhom.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckIcon className="size-3.5" />
              </span>
              <span className="text-base leading-relaxed text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Süreç */}
      <section className="mt-10 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-[#0b2545]">Süreç</h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{treatment.process}</p>
      </section>

      {/* Not */}
      <p className="mt-8 text-sm font-medium text-primary">{treatment.note}</p>

      {/* CTA */}
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button asChild className="h-12 rounded-full px-7 text-sm">
          <a href={APPOINTMENT_URL} target="_blank" rel="noopener noreferrer">
            <CalendarIcon className="size-4" />
            Randevu Al
          </a>
        </Button>
        <Button
          asChild
          className="h-12 rounded-full bg-[#25D366] px-6 text-sm text-white hover:bg-[#1fae57]"
        >
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="size-4" />
            WhatsApp
          </a>
        </Button>
      </div>

      {/* İlgili sorular */}
      {relatedFaqs.length > 0 && (
        <section className="mt-16 border-t border-border pt-10">
          <h2 className="text-lg font-semibold text-[#0b2545]">İlgili sorular</h2>
          <ul className="mt-5 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {relatedFaqs.map((faq) => {
              const open = openFaq === faq.question
              return (
                <li key={faq.question}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : faq.question)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-accent"
                  >
                    <span className="text-sm font-medium leading-relaxed text-[#0b2545]">
                      {faq.question}
                    </span>
                    <ChevronRightIcon
                      className={cn(
                        "size-4 shrink-0 text-muted-foreground transition-transform duration-300",
                        open ? "rotate-90 text-primary" : "",
                      )}
                    />
                  </button>
                  {/* Cevap: grid-rows hilesiyle yumuşak yükseklik geçişi */}
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-in-out",
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
          <Link
            to="/sss"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Tüm sorular
            <ChevronRightIcon className="size-4" />
          </Link>
        </section>
      )}

      {/* İlgili yazılar */}
      {relatedPosts.length > 0 && (
        <section className="mt-16 border-t border-border pt-10">
          <h2 className="text-lg font-semibold text-[#0b2545]">İlgili yazılar</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group flex items-start justify-between gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-accent hover:shadow-md"
              >
                <span className="text-sm font-medium leading-relaxed text-[#0b2545]">
                  {post.title}
                </span>
                <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            ))}
          </div>
          <Link
            to="/blog"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Tüm yazılar
            <ChevronRightIcon className="size-4" />
          </Link>
        </section>
      )}

      {/* İlgili tedaviler */}
      {recommended.length > 0 && (
        <section className="mt-16 border-t border-border pt-10">
          <h2 className="text-lg font-semibold text-[#0b2545]">İlgili tedaviler</h2>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {recommended.map((t) => (
              <Link
                key={t.slug}
                to={`/tedaviler/${t.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-[#0b2545] shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-accent hover:shadow-md"
              >
                {t.title}
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
