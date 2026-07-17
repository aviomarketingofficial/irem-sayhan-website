import { type CSSProperties, type MouseEvent, useCallback, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { morphFrom } from "@/lib/treatmentMorph"
import { playedOnce } from "@/lib/animatedOnce"

type Item = { title: string; slug: string; image?: string; video?: string }

// Etiketler kısa tutuldu (dikey yazıda taşmasın). slug, Tedaviler sayfasındaki
// kartla eşleşerek paylaşılan-element geçişini (view transition) sağlar.
const items: Item[] = [
  { title: "Hareketli aparey", slug: "hareketli-ortodonti", image: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/paylasimli-hareketli-ortodonti.jpg" },
  { title: "Braketli tedavi", slug: "braket-tedavisi", image: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/paylasimli-braket-tedavisi.jpg", video: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/paylasimli-braket-tedavisi.mp4" },
  { title: "Damon sistem", slug: "damon-braket", image: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/paylasimli-damon-braket.jpg" },
  { title: "Şeffaf plak", slug: "seffaf-plak", image: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/paylasimli-seffaf-plak.jpg", video: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/paylasimli-seffaf-plak.mp4" },
  { title: "Lingual ortodonti", slug: "lingual-ortodonti", image: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/paylasimli-lingual-ortodonti.jpg", video: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/paylasimli-lingual-ortodonti.mp4" },
  { title: "Ortognatik cerrahi", slug: "cerrahi-ortodonti", image: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/paylasimli-cerrahi-ortodonti.jpg", video: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/paylasimli-cerrahi-ortodonti.mp4" },
  { title: "Pekiştirme", slug: "pekistirme", image: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/anasayfa-hero-074.jpg" },
]

const AUTOPLAY_MS = 3000 // aktif panelin kendiliğinden ilerleme aralığı

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={dir === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
    </svg>
  )
}

// Panel arka planı: video varsa aktifken oynar (poster = durağan kare),
// yoksa görsel ya da lacivert placeholder. Sessiz + loop + inline (autoplay kuralı).
function PanelMedia({ item, active }: { item: Item; active: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (active) {
      v.play().catch(() => {})
    } else {
      v.pause()
      v.currentTime = 0
    }
  }, [active])
  if (item.video) {
    return (
      <video
        ref={videoRef}
        src={item.video}
        poster={item.image}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
    )
  }
  if (item.image) {
    return (
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
    )
  }
  return <div className="absolute inset-0 bg-gradient-to-br from-[#0b2545] to-[#13335c]" />
}

export function OurTreatments() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const panelRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [inView, setInView] = useState(() => playedOnce.has("ourtreatments"))
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  // Sol/sağ ok görünürlüğü (yalnızca içerik ekrana sığmadığında)
  const [canScroll, setCanScroll] = useState({ left: false, right: false })

  // Bölüm görününce giriş animasyonunu ve otomatik dönmeyi başlat
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (playedOnce.has("ourtreatments")) return // bu oturumda oynadı; tekrar oynamasın
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          playedOnce.mark("ourtreatments")
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0, rootMargin: "-35% 0px -35% 0px" },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Hareket azaltma tercihini izle
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduceMotion(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  // Aktif paneli yatay şeritte ortala. Ölçümle (anlık genişlik) değil, panelin
  // AÇILMIŞ (geniş) halindeki SON konumuna göre tek seferde kaydırılır; böylece
  // panel büyürken aynı anda ortaya kayar (önce sola açılıp sonra "toplanmaz").
  // Değerler CSS ile uyumlu: kapalı = 5.5rem, gap = 0.5rem (gap-2),
  // aktif = min(78vw, 26rem), şeritte yatay padding yok.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const rootPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
    const step = 5.5 * rootPx + 0.5 * rootPx // kapalı panel + gap
    const activeW = Math.min(0.78 * window.innerWidth, 26 * rootPx)
    const target = active * step - (track.clientWidth - activeW) / 2
    track.scrollTo({ left: Math.max(0, target), behavior: reduceMotion ? "auto" : "smooth" })
  }, [active, reduceMotion])

  // Okların görünürlüğünü hesapla (taşma var mı, neredeyiz)
  const updateArrows = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setCanScroll({
      left: el.scrollLeft > 4,
      right: el.scrollLeft < max - 4,
    })
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    updateArrows()
    el.addEventListener("scroll", updateArrows, { passive: true })
    const ro = new ResizeObserver(() => updateArrows())
    ro.observe(el)
    return () => {
      el.removeEventListener("scroll", updateArrows)
      ro.disconnect()
    }
  }, [updateArrows])

  // Otomatik dönme: ~3 sn'de bir sonraki panele geç, sona gelince başa sar.
  // Hover/focus/dokunma (paused) veya hareket azaltma açıkken durur.
  useEffect(() => {
    if (!inView || paused || reduceMotion) return
    const t = window.setInterval(() => {
      setActive((i) => (i + 1) % items.length)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(t)
  }, [inView, paused, reduceMotion])

  const reveal = (i = 0): CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(12px)",
    transition: "opacity 0.6s ease-in-out, transform 0.6s ease-in-out",
    transitionDelay: inView ? `${i * 90}ms` : "0ms",
  })

  const go = (i: number) => setActive(((i % items.length) + items.length) % items.length)

  // "Tüm Tedaviler": tıklama anında her panelin viewport konumunu kaydet. Link
  // normal gezinir; Tedaviler sayfası bu konumlardan kartları grid'e uçurur (FLIP).
  const goAllTreatments = (e: MouseEvent<HTMLAnchorElement>) => {
    morphFrom.clear()
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return // yeni sekmede animasyon yok
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    panelRefs.current.forEach((el, i) => {
      const slug = items[i]?.slug
      if (!el || !slug) return
      const r = el.getBoundingClientRect()
      morphFrom.set(slug, { left: r.left, top: r.top, width: r.width, height: r.height })
    })
  }

  return (
    <section ref={sectionRef} id="tedaviler" className="bg-background px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center" style={reveal(0)}>
          <h2 className="text-3xl font-semibold tracking-tight text-[#0b2545] sm:text-4xl">Tedavilerimiz</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Çocukluktan yetişkinliğe, ihtiyacına en uygun ortodonti tedavisi.
          </p>
        </div>

        {/* Akordeon + slider: sabit genişlikli paneller; biri açılınca yatay genişler,
            isim dikeyden yataya döner. Ekrana sığmazsa yatayda kaydırılır. */}
        <div className="relative mt-12">
          {/* Sol ok: yalnızca sola kaydırılabilirken görünür */}
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Önceki tedavi"
            className="absolute left-1 top-1/2 z-20 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-[#0b2545] shadow-sm backdrop-blur transition-all hover:bg-muted"
            style={{
              opacity: canScroll.left ? 1 : 0,
              pointerEvents: canScroll.left ? "auto" : "none",
            }}
          >
            <Chevron dir="left" />
          </button>

          {/* Sağ ok: yalnızca sağa kaydırılabilirken görünür */}
          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label="Sonraki tedavi"
            className="absolute right-1 top-1/2 z-20 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-[#0b2545] shadow-sm backdrop-blur transition-all hover:bg-muted"
            style={{
              opacity: canScroll.right ? 1 : 0,
              pointerEvents: canScroll.right ? "auto" : "none",
            }}
          >
            <Chevron dir="right" />
          </button>

          {/* Kaydırılabilir şerit: parmakla/sürükleyerek kayar */}
          <div
            ref={trackRef}
            className="flex h-[22rem] gap-2 overflow-x-auto scroll-smooth pb-1 sm:h-[30rem] [justify-content:safe_center] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
          >
            {items.map((it, i) => {
              const isActive = i === active
              return (
                <button
                  key={it.title}
                  ref={(el) => {
                    panelRefs.current[i] = el
                  }}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-label={it.title}
                  aria-pressed={isActive}
                  className="relative h-full shrink-0 snap-center overflow-hidden rounded-3xl border-0 bg-[#0b2545] text-left shadow-sm outline-none ring-primary/50 focus-visible:ring-2"
                  style={{
                    // Sabit genişlik: pasif dar, aktif geniş (slider mantığı)
                    width: isActive ? "min(78vw, 26rem)" : "5.5rem",
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(16px)",
                    transition: `width 0.6s ease-in-out, opacity 0.6s ease-in-out ${
                      inView ? i * 80 : 0
                    }ms, transform 0.6s ease-in-out ${inView ? i * 80 : 0}ms`,
                  }}
                >
                  {/* Arka plan: video (aktifte oynar) / görsel / lacivert placeholder */}
                  <PanelMedia item={it} active={isActive} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b2545]/85 via-[#0b2545]/25 to-transparent" />

                  {/* Tek etiket: kapalıyken panelin tam ortasında dikey; açılınca
                      dönerek (dikeyden yataya) alt-sol konuma gider. */}
                  <div
                    className="pointer-events-none absolute"
                    style={{
                      top: isActive ? "calc(100% - 3.5rem)" : "50%",
                      left: isActive ? "1.5rem" : "50%",
                      transform: isActive ? "translate(0, 0)" : "translate(-50%, -50%)",
                      transition:
                        "top 0.6s ease-in-out, left 0.6s ease-in-out, transform 0.6s ease-in-out",
                    }}
                  >
                    <span
                      className="block whitespace-nowrap text-base font-semibold text-white sm:text-xl"
                      style={{
                        transformOrigin: "center",
                        transform: isActive ? "rotate(0deg)" : "rotate(-90deg)",
                        transition: "transform 0.6s ease-in-out",
                        textShadow: "0 1px 10px rgba(11, 37, 69, 0.5)",
                      }}
                    >
                      {it.title}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-10 text-center" style={reveal(1)}>
          <Button asChild className="h-11 rounded-full px-7 text-sm">
            <Link to="/tedaviler" onClick={goAllTreatments}>Tüm Tedaviler</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
