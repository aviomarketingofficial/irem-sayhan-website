import { usePageMeta } from "@/lib/seo"
import { staticPageMeta } from "@/data/pageMeta"
import { useLayoutEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { treatments } from "@/data/treatments"
import { type MorphRect, morphFrom } from "@/lib/treatmentMorph"

function ArrowIcon({ className }: { className?: string }) {
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

export function Tedaviler() {
  usePageMeta({ ...staticPageMeta["/tedaviler"], path: "/tedaviler" })
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map())
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map())

  // FLIP: slider'dan "Tüm Tedaviler" ile gelindiyse, kartlar slider panellerinin
  // konumundan kendi grid konumlarına uçar (dağılır). morphFrom boşsa (doğrudan
  // ziyaret veya hareket azaltma) atlanır. useLayoutEffect: boyamadan önce konumla.
  useLayoutEffect(() => {
    if (morphFrom.size === 0) return
    window.scrollTo(0, 0) // grid konumlarını sayfanın en üstünde ölç
    const flips: { el: HTMLElement; first: MorphRect; last: DOMRect }[] = []
    cardRefs.current.forEach((el, slug) => {
      const first = morphFrom.get(slug)
      if (el && first) flips.push({ el, first, last: el.getBoundingClientRect() })
    })
    morphFrom.clear()
    if (flips.length === 0) return

    // Invert: kartı eski panel konumuna/boyutuna taşı. transition:none ŞART —
    // yoksa kartın class'ındaki hover geçişi (transition-transform) devreye girer
    // ve inverted konum anında oturmaz, "from" yakalanmaz (morph no-op olur).
    for (const { el, first, last } of flips) {
      const dx = first.left - last.left
      const dy = first.top - last.top
      const sx = Math.max(0.04, first.width / last.width)
      const sy = Math.max(0.04, first.height / last.height)
      el.style.transition = "none"
      el.style.transformOrigin = "top left"
      el.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`
      el.style.opacity = "0.5"
      el.style.willChange = "transform, opacity"
    }
    // reflow: invert konumu uygulansın
    void document.documentElement.offsetWidth
    // Play: doğal grid konumuna uç (hafif kademe = dağılma hissi)
    flips.forEach(({ el }, i) => {
      const delay = i * 35
      el.style.transition = `transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, opacity 0.45s ease-out ${delay}ms`
      el.style.transform = "none"
      el.style.opacity = "1"
      const cleanup = (ev: TransitionEvent) => {
        if (ev.propertyName !== "transform") return
        el.style.transition = ""
        el.style.transform = ""
        el.style.transformOrigin = ""
        el.style.opacity = ""
        el.style.willChange = ""
        el.removeEventListener("transitionend", cleanup)
      }
      el.addEventListener("transitionend", cleanup)
    })
  }, [])

  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6 sm:pt-36 lg:px-8">
      {/* Başlık */}
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">Tedaviler</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#0b2545] sm:text-4xl">
          Size uygun ortodontik tedavi
        </h1>
        <p className="mx-auto mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Çocuktan yetişkine, her ihtiyaca yönelik tedavi seçeneklerini bir arada bulun. Hangisinin
          size uygun olduğu, dilerseniz kısa bir muayenede netleşir.
        </p>
      </div>

      {/* Açılmış panel kartları: anasayfa slider'ıyla aynı görsel dil. "Tüm Tedaviler"e
          basınca paneller bu konumlara FLIP ile uçar. Başlık altında açıklama (gradient üzerinde). */}
      <div className="mt-14 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {treatments.map((t) => (
          <Link
            key={t.slug}
            ref={(el) => {
              if (el) cardRefs.current.set(t.slug, el)
              else cardRefs.current.delete(t.slug)
            }}
            to={`/tedaviler/${t.slug}`}
            aria-label={`${t.title} – detaylar`}
            onMouseEnter={() => videoRefs.current.get(t.slug)?.play().catch(() => {})}
            onMouseLeave={() => {
              const v = videoRefs.current.get(t.slug)
              if (v) {
                v.pause()
                v.currentTime = 0
              }
            }}
            className="group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-[#0b2545] shadow-sm outline-none ring-primary/50 transition-transform duration-300 hover:-translate-y-1.5 focus-visible:ring-2"
          >
            {/* Arka plan: video (hover'da oynar) / görsel / lacivert placeholder */}
            {t.video ? (
              <video
                ref={(el) => {
                  if (el) videoRefs.current.set(t.slug, el)
                  else videoRefs.current.delete(t.slug)
                }}
                src={t.video}
                poster={t.image}
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            ) : t.image ? (
              <img
                src={t.image}
                alt={t.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#0b2545] to-[#13335c]" />
            )}

            {/* Alt gradient: başlık + açıklamanın okunabilmesi için */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b2545] via-[#0b2545]/75 to-transparent" />

            {/* Başlık + açıklama (gradient üzerinde) */}
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
              <h2 className="text-xl font-semibold text-white sm:text-2xl">{t.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{t.short}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white">
                Detay
                <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Alt not */}
      <p className="mx-auto mt-12 max-w-xl text-center text-xs font-medium text-primary">
        Tedavi seçimi kişiye özeldir; sizin için en uygun yöntem muayenede netleşir.
      </p>
    </section>
  )
}
