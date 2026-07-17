import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { playedOnce } from "@/lib/animatedOnce"

type Step = { title: string; text: string }

const steps: Step[] = [
  {
    title: "İlk Görüşme",
    text: "Ağız içi muayene, röntgen ve fotoğraflama ile durumun değerlendirilmesi.",
  },
  {
    title: "Tedavi Planı",
    text: "Size en uygun tedavi seçeneği, süreç ve süre hakkında şeffaf bilgilendirme.",
  },
  {
    title: "Aktif Tedavi",
    text: "Aylık kontroller ile süreç takibi. Aynı hekim, sürecin sonuna kadar.",
  },
  {
    title: "Pekiştirme",
    text: "Tedavinin sonuçlarını uzun vadeli korumak için pekiştirme aşaması.",
  },
]

const INTRO_MS = 1000 // başlık tek başına bekler
const SLIDE_MS = 2100 // her adım ekranda kalma süresi (WhyChooseUs ile aynı)

type Phase = "idle" | "intro" | "slides" | "settle"

function Heading() {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-semibold tracking-tight text-[#0b2545] sm:text-4xl">Süreç</h2>
      <p className="mx-auto mt-3 text-base text-muted-foreground sm:text-lg">
        Konsültasyondan pekiştirmeye, adım adım.
      </p>
    </div>
  )
}

function StepBlock({ step, n, big }: { step: Step; n: number; big?: boolean }) {
  return (
    <div className="flex flex-col items-center px-2 text-center">
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground shadow-sm ring-primary/10",
          big ? "size-20 text-3xl ring-8 sm:size-24" : "size-16 text-xl ring-4 sm:size-20 sm:text-2xl",
        )}
        aria-hidden="true"
      >
        {n}
      </div>
      <h3
        className={cn(
          "mt-5 font-semibold tracking-tight text-[#0b2545]",
          big ? "text-xl sm:text-2xl" : "text-lg sm:text-xl",
        )}
      >
        {step.title}
      </h3>
      <p
        className={cn(
          "mt-2 max-w-xs leading-relaxed text-muted-foreground",
          big ? "text-base sm:text-lg" : "text-sm sm:text-base",
        )}
      >
        {step.text}
      </p>
    </div>
  )
}

export function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const [phase, setPhase] = useState<Phase>(() => (playedOnce.has("process") ? "settle" : "idle"))
  const [slide, setSlide] = useState(0)
  const [settled, setSettled] = useState(() => playedOnce.has("process"))

  // Bölüm görününce başlat (hareket azaltma açıksa doğrudan yerleşmiş hal)
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (playedOnce.has("process")) return // bu oturumda oynadı; tekrar oynamasın
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          playedOnce.mark("process")
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

  // slides: adımlar tek tek; sonuncudan sonra yerleşir
  useEffect(() => {
    if (phase !== "slides") return
    if (slide < steps.length - 1) {
      const t = window.setTimeout(() => setSlide((s) => s + 1), SLIDE_MS)
      return () => window.clearTimeout(t)
    }
    const t = window.setTimeout(() => setPhase("settle"), SLIDE_MS)
    return () => window.clearTimeout(t)
  }, [phase, slide])

  // settle: başlık yukarı çıkar, adımlar tek tek dizilir (bir kare sonra tetikle ki geçiş oynasın)
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
        {/* intro + slides: ortada tek tek (başlık, sonra adımlar) */}
        {centeredStage && (
          <div className="flex min-h-[22rem] items-center justify-center">
            {phase === "intro" ? (
              <div key="intro" className="quiz-pop-in">
                <Heading />
              </div>
            ) : (
              <div key={slide} className="quiz-pop-in w-full max-w-md">
                <StepBlock step={steps[slide]} n={slide + 1} big />
              </div>
            )}
          </div>
        )}

        {/* settle: başlık yukarı doğru çıkar + adımlar tek tek dizilir (Neden bizi... gibi) */}
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
              {steps.map((step, i) => (
                <div
                  key={step.title}
                  className="w-[78%] shrink-0 snap-center sm:w-auto"
                  style={{
                    opacity: settled ? 1 : 0,
                    transform: settled ? "translateY(0)" : "translateY(28px)",
                    transition: "opacity 0.6s ease-in-out, transform 0.6s ease-in-out",
                    transitionDelay: settled ? `${250 + i * 170}ms` : "0ms",
                  }}
                >
                  <StepBlock step={step} n={i + 1} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
