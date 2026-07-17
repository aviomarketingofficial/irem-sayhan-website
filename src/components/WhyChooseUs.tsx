import { type ComponentType, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { playedOnce } from "@/lib/animatedOnce"

type IconProps = { className?: string }

// Çizgi (outline) ikonlar
function ClockIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 1.8" />
    </svg>
  )
}

function DoctorIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
    </svg>
  )
}

function MapPinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M20 10.5c0 5.5-8 11-8 11s-8-5.5-8-11a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10.5" r="2.6" />
    </svg>
  )
}

function SmileIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 14.5s1.3 1.8 3.5 1.8 3.5-1.8 3.5-1.8" />
      <path d="M9 9.5h.01" />
      <path d="M15 9.5h.01" />
    </svg>
  )
}

type Reason = { Icon: ComponentType<IconProps>; title: string; text: string }

const reasons: Reason[] = [
  {
    Icon: ClockIcon,
    title: "17 Yıl, Aynı Klinik",
    text: "2009'dan beri aynı muayenehanede, aynı yaklaşımla. İlk hastasını bugün hala takip ediyor.",
  },
  {
    Icon: DoctorIcon,
    title: "Tek Hekim, Birebir İlgi",
    text: "Her hasta planı bizzat Dr. İrem tarafından hazırlanır. Tedavi süresince aynı hekim, aynı ekip.",
  },
  {
    Icon: MapPinIcon,
    title: "Manisalı, Manisa'da",
    text: "1979 doğumlu, gerçek Manisalı. Şehrin ailelerini iki kuşaktır tanıyor.",
  },
  {
    Icon: SmileIcon,
    title: "Çocuk Dostu Yaklaşım",
    text: "'İrem abla' diyerek korkmadan gelen çocuklar. Renkli oyun köşesi, sabırlı anlatım, iletişim önceliği.",
  },
]

const INTRO_MS = 1000 // başlık tek başına bekler
const SLIDE_MS = 2100 // her sebep ekranda kalma süresi (1400 ile 2800 ortası)

type Phase = "idle" | "intro" | "slides" | "settle"

function Heading() {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-semibold tracking-tight text-[#0b2545] sm:text-4xl">
        Neden bizi tercih ediyorlar?
      </h2>
      <p className="mx-auto mt-3 text-base text-muted-foreground sm:text-lg">
        Yıllar içinde değişmeyen tek şey, hastalarına gösterdiği özen.
      </p>
    </div>
  )
}

function ReasonBlock({ reason, big }: { reason: Reason; big?: boolean }) {
  const { Icon } = reason
  return (
    <div className="flex flex-col items-center px-2 text-center">
      <span
        className={cn(
          "flex items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/15",
          big ? "size-20 sm:size-24" : "size-16 sm:size-20",
        )}
        aria-hidden="true"
      >
        <Icon className={big ? "size-9 sm:size-11" : "size-7 sm:size-9"} />
      </span>
      <h3
        className={cn(
          "mt-5 font-semibold tracking-tight text-[#0b2545]",
          big ? "text-xl sm:text-2xl" : "text-lg sm:text-xl",
        )}
      >
        {reason.title}
      </h3>
      <p
        className={cn(
          "mt-2 max-w-xs leading-relaxed text-muted-foreground",
          big ? "text-base sm:text-lg" : "text-sm sm:text-base",
        )}
      >
        {reason.text}
      </p>
    </div>
  )
}

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null)
  const [phase, setPhase] = useState<Phase>(() => (playedOnce.has("whychooseus") ? "settle" : "idle"))
  const [slide, setSlide] = useState(0)
  const [settled, setSettled] = useState(() => playedOnce.has("whychooseus"))

  // Bölüm görününce başlat (hareket azaltma açıksa doğrudan yerleşmiş hal)
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (playedOnce.has("whychooseus")) return // bu oturumda oynadı; tekrar oynamasın
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          playedOnce.mark("whychooseus")
          setPhase(reduce ? "settle" : "intro")
          obs.disconnect()
        }
      },
      { threshold: 0, rootMargin: "-35% 0px -35% 0px" },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // intro: başlık tek başına -> slayt gösterisi başlar
  useEffect(() => {
    if (phase !== "intro") return
    const t = window.setTimeout(() => setPhase("slides"), INTRO_MS)
    return () => window.clearTimeout(t)
  }, [phase])

  // slides: sebepler tek tek; sonuncudan sonra yerleşir
  useEffect(() => {
    if (phase !== "slides") return
    if (slide < reasons.length - 1) {
      const t = window.setTimeout(() => setSlide((s) => s + 1), SLIDE_MS)
      return () => window.clearTimeout(t)
    }
    const t = window.setTimeout(() => setPhase("settle"), SLIDE_MS)
    return () => window.clearTimeout(t)
  }, [phase, slide])

  // settle: başlık yukarı çıkar, sebepler tek tek dizilir (bir kare sonra tetikle ki geçiş oynasın)
  useEffect(() => {
    if (phase !== "settle") {
      setSettled(false)
      return
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSettled(true)
      return
    }
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setSettled(true)))
    return () => cancelAnimationFrame(r)
  }, [phase])

  const centeredStage = phase === "intro" || phase === "slides"

  return (
    <section ref={sectionRef} className="overflow-hidden bg-background px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        {/* intro + slides: ortada tek tek (başlık, sonra sebepler) */}
        {centeredStage && (
          <div className="flex min-h-[22rem] items-center justify-center">
            {phase === "intro" ? (
              <div key="intro" className="quiz-pop-in">
                <Heading />
              </div>
            ) : (
              <div key={slide} className="quiz-pop-in w-full max-w-md">
                <ReasonBlock reason={reasons[slide]} big />
              </div>
            )}
          </div>
        )}

        {/* settle: başlık yukarı doğru çıkar + sebepler tek tek dizilir (Yaşam boyu gibi) */}
        {phase === "settle" && (
          <div>
            <div
              style={{
                opacity: settled ? 1 : 0,
                transform: settled ? "translateY(0)" : "translateY(44px)",
                transition: "opacity 0.6s ease-in-out, transform 0.7s ease-in-out",
              }}
            >
              <Heading />
            </div>
            <div className="mt-14 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible lg:grid-cols-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {reasons.map((reason, i) => (
                <div
                  key={reason.title}
                  className="w-[78%] shrink-0 snap-center sm:w-auto"
                  style={{
                    opacity: settled ? 1 : 0,
                    transform: settled ? "translateY(0)" : "translateY(28px)",
                    transition: "opacity 0.6s ease-in-out, transform 0.6s ease-in-out",
                    transitionDelay: settled ? `${250 + i * 170}ms` : "0ms",
                  }}
                >
                  <ReasonBlock reason={reason} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
