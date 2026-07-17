import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { playedOnce } from "@/lib/animatedOnce"

type Room = { name: string; image?: string }

// Sadece oda adı etiketlenir. Görseller sonradan "image" alanına eklenebilir.
const rooms: Room[] = [
  { name: "Giriş", image: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/anasayfa-klinik-giris.jpg" },
  { name: "Bekleme Salonu", image: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/anasayfa-klinik-bekleme.jpg" },
  { name: "Bekleme Salonu 2", image: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/anasayfa-klinik-bekleme-2.jpg" },
  { name: "Bekleme Salonu 3", image: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/anasayfa-klinik-gorusme.jpg" },
  { name: "Diplomalar", image: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/anasayfa-klinik-diploma.jpg" },
  { name: "Koridor", image: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/anasayfa-klinik-koridor.jpg" },
  { name: "Muayene Odası", image: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/anasayfa-klinik-muayene.jpg" },
  { name: "Röntgen Odası", image: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/anasayfa-klinik-rontgen.jpg" },
  { name: "Çocuk Köşesi", image: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/anasayfa-klinik-cocuk-kosesi.jpg" },
  { name: "Lavabo", image: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/anasayfa-klinik-lavabo.jpg" },
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

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

function ExpandIcon() {
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
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  )
}

// Lacivert placeholder (görsel gelene kadar). Modalde de panelde de aynı dil.
function RoomVisual({ room, large = false }: { room: Room; large?: boolean }) {
  if (room.image) {
    return (
      <img
        src={room.image}
        alt={room.name}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
    )
  }
  return (
    <div
      className={
        large
          ? "absolute inset-0 bg-gradient-to-br from-[#0b2545] to-[#16406f]"
          : "absolute inset-0 bg-gradient-to-br from-[#0b2545] to-[#13335c]"
      }
    />
  )
}

function Lightbox({ room, onClose }: { room: Room; onClose: () => void }) {
  // ESC ile kapat + arka plan scroll kilidi
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  const reduce =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

  // Portal ile doğrudan body'ye: Layout sarmalayıcısındaki transform bir containing
  // block oluşturuyor; portal olmadan fixed konumlama ona göre olup yukarı kaçar.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={room.name}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
      style={{
        backgroundColor: "rgba(11, 37, 69, 0.82)",
        backdropFilter: "blur(4px)",
        opacity: reduce ? 1 : 0,
        animation: reduce ? undefined : "clinicFade 0.25s ease-in-out forwards",
      }}
    >
      {/* Kapatma butonu (overlay'in üstünde) */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Kapat"
        className="absolute right-4 top-4 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white outline-none ring-white/60 transition-colors hover:bg-white/20 focus-visible:ring-2 sm:right-6 sm:top-6"
      >
        <CloseIcon />
      </button>

      {/* Büyük görünüm: overlay'e tıklayınca kapanmasın diye stopPropagation */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl overflow-hidden rounded-3xl shadow-2xl"
        style={{
          aspectRatio: "16 / 10",
          transform: reduce ? "none" : "scale(0.96)",
          opacity: reduce ? 1 : 0,
          animation: reduce ? undefined : "clinicZoom 0.3s ease-in-out 0.05s forwards",
        }}
      >
        <RoomVisual room={room} large />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b2545]/85 via-[#0b2545]/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <h3 className="text-2xl font-semibold text-white sm:text-3xl">{room.name}</h3>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export function Clinic() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const panelRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [inView, setInView] = useState(() => playedOnce.has("clinic"))
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  // Sol/sağ ok görünürlüğü (yalnızca içerik ekrana sığmadığında)
  const [canScroll, setCanScroll] = useState({ left: false, right: false })
  // Büyütülmüş (lightbox) görsel; null ise kapalı
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Bölüm görününce giriş animasyonunu ve otomatik dönmeyi başlat
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (playedOnce.has("clinic")) return // bu oturumda oynadı; tekrar oynamasın
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          playedOnce.mark("clinic")
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
  // Hover/focus/dokunma (paused), hareket azaltma veya büyütme açıkken durur.
  useEffect(() => {
    if (!inView || paused || reduceMotion || openIndex !== null) return
    const t = window.setInterval(() => {
      setActive((i) => (i + 1) % rooms.length)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(t)
  }, [inView, paused, reduceMotion, openIndex])

  const reveal = (i = 0): CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(12px)",
    transition: "opacity 0.6s ease-in-out, transform 0.6s ease-in-out",
    transitionDelay: inView ? `${i * 90}ms` : "0ms",
  })

  const go = (i: number) => setActive(((i % rooms.length) + rooms.length) % rooms.length)

  return (
    <section ref={sectionRef} className="bg-background px-4 py-20 sm:py-28">
      {/* Lightbox için kullanılan keyframe'ler (index.css'e dokunmadan, scoped) */}
      <style>{`
        @keyframes clinicFade { to { opacity: 1; } }
        @keyframes clinicZoom { to { opacity: 1; transform: scale(1); } }
      `}</style>

      <div className="mx-auto max-w-6xl">
        <div className="text-center" style={reveal(0)}>
          <h2 className="text-3xl font-semibold tracking-tight text-[#0b2545] sm:text-4xl">
            Sağlığa rahat bir alan.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Manisa'nın merkezinde, modern bir muayene deneyimi. Bir görsele tıklayın, büyütün ve
            detayları keşfedin.
          </p>
        </div>

        {/* Akordeon + slider: sabit genişlikli paneller; biri açılınca yatay genişler,
            isim dikeyden yataya döner. Aktif panele tıklayınca görsel büyütülür. */}
        <div className="relative mt-12">
          {/* Sol ok: yalnızca sola kaydırılabilirken görünür */}
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Önceki görsel"
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
            aria-label="Sonraki görsel"
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
            {rooms.map((room, i) => {
              const isActive = i === active
              return (
                <button
                  key={room.name}
                  ref={(el) => {
                    panelRefs.current[i] = el
                  }}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => (isActive ? setOpenIndex(i) : setActive(i))}
                  aria-label={isActive ? `${room.name} görselini büyüt` : room.name}
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
                  {/* Arka plan: görsel gelene kadar lacivert placeholder */}
                  <RoomVisual room={room} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b2545]/85 via-[#0b2545]/25 to-transparent" />

                  {/* Büyütme ikonu: yalnızca aktif panelde yumuşakça belirir */}
                  <span
                    className="pointer-events-none absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full bg-white/15 text-white sm:right-5 sm:top-5"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "scale(1)" : "scale(0.85)",
                      transition: "opacity 0.4s ease-in-out, transform 0.4s ease-in-out",
                    }}
                  >
                    <ExpandIcon />
                  </span>

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
                      {room.name}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {openIndex !== null && <Lightbox room={rooms[openIndex]} onClose={() => setOpenIndex(null)} />}
    </section>
  )
}
