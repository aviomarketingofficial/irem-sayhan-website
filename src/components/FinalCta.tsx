import { useEffect, useRef, useState } from "react"
import { playedOnce } from "@/lib/animatedOnce"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { APPOINTMENT_URL, WHATSAPP_URL } from "@/lib/links"

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
    </svg>
  )
}

function CalendarIcon() {
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
      <path d="M8 2v4M16 2v4M3 10h18" />
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  )
}

export function FinalCta() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(() => playedOnce.has("finalcta"))

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (playedOnce.has("finalcta")) return // bu oturumda oynadı; tekrar oynamasın
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playedOnce.mark("finalcta")
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0, rootMargin: "-35% 0px -35% 0px" },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const rise = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 700ms ease-in-out ${delay}ms, transform 700ms ease-in-out ${delay}ms`,
  })

  return (
    <section ref={ref} className="bg-background px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-[#0b2545] px-6 py-16 text-center shadow-lg sm:px-12 sm:py-20">
        {/* yumuşak ışık dokunuşları */}
        <div
          className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-28 -left-20 size-72 rounded-full bg-primary/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-2xl">
          <p
            className="text-sm font-medium tracking-wide text-white uppercase"
            style={rise(0)}
          >
            Hazırsanız
          </p>
          <h2
            className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl"
            style={rise(120)}
          >
            Randevu almaya hazır mısınız?
          </h2>
          <p className="mt-5 text-base text-white/70 sm:text-lg" style={rise(220)}>
            Sorularınızı yanıtlamak ve size en uygun tedavi planını birlikte belirlemek için
            buradayız.
          </p>

          <div
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
            style={rise(320)}
          >
            <Button
              asChild
              size="lg"
              className={cn(
                "h-12 w-full rounded-full px-7 text-base font-medium",
                "bg-[#25D366] text-white shadow-sm transition-colors hover:bg-[#1fae57] sm:w-auto",
              )}
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                WhatsApp ile Yazın
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              className="h-12 w-full rounded-full bg-primary px-7 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/85 sm:w-auto"
            >
              <a href={APPOINTMENT_URL} target="_blank" rel="noopener noreferrer">
                <CalendarIcon />
                Online Randevu Al
              </a>
            </Button>
          </div>

          <p className="mt-8 text-sm text-white/50" style={rise(420)}>
            Doktortakvimi üzerinden 24/7 randevu alabilir, WhatsApp ile dilediğiniz saat
            yazabilirsiniz.
          </p>
        </div>
      </div>
    </section>
  )
}
