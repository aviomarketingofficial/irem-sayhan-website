import { useEffect, useRef, useState } from "react"
import { playedOnce } from "@/lib/animatedOnce"

import { Button } from "@/components/ui/button"
import { WORKING_HOURS } from "@/lib/links"

const ADDRESS =
  "Anafartalar Mah. 1610 Sok. Bakoğlu Apt. No: 1/3, Şehzadeler / Manisa 45020"

// Dr. İrem Seyhan Uyarcan muayenehanesinin gerçek Google Maps konumu (pin tam burada)
const COORDS = "38.6141386,27.4297752"
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${COORDS}`
const embedUrl = `https://maps.google.com/maps?q=${COORDS}&z=17&output=embed`

function ArrowRightIcon({ className }: { className?: string }) {
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

function PinIcon({ className }: { className?: string }) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function ClockIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

export function Visit() {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(() => playedOnce.has("visit"))

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (playedOnce.has("visit")) return // bu oturumda oynadı; tekrar oynamasın
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playedOnce.mark("visit")
          setActive(true)
          obs.disconnect()
        }
      },
      { threshold: 0, rootMargin: "-35% 0px -35% 0px" },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const reveal = (delay: number) => ({
    opacity: active ? 1 : 0,
    transform: active ? "translateY(0)" : "translateY(16px)",
    transition: "opacity 700ms ease-in-out, transform 700ms ease-in-out",
    transitionDelay: `${delay}ms`,
  })

  return (
    <section ref={ref} className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* SOL: bilgi */}
          <div>
            <span
              className="inline-flex items-center gap-2 text-sm font-medium text-primary"
              style={reveal(0)}
            >
              <PinIcon className="size-4" />
              Manisa şehir merkezinde.
            </span>

            <h2
              className="mt-4 text-3xl font-semibold tracking-tight text-[#0b2545] sm:text-4xl"
              style={reveal(80)}
            >
              Dr. İrem Seyhan Uyarcan Muayenehanesi
            </h2>

            <p
              className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground"
              style={reveal(160)}
            >
              {ADDRESS}
            </p>

            <div className="mt-8" style={reveal(240)}>
              <h3 className="flex items-center gap-2 text-base font-semibold text-[#0b2545]">
                <ClockIcon className="size-4 text-primary" />
                Çalışma Saatleri
              </h3>
              <div className="mt-2 space-y-0.5 text-sm leading-relaxed text-muted-foreground">
                {WORKING_HOURS.map((h) => (
                  <p key={h.label}>
                    <span className="text-[#0b2545]">{h.label}:</span> {h.value}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-9" style={reveal(320)}>
              <Button asChild size="lg" className="h-11 px-5 text-sm">
                <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                  Yol Tarifi Al
                  <ArrowRightIcon className="size-4 transition-transform duration-300 ease-in-out group-hover/button:translate-x-0.5" />
                </a>
              </Button>
            </div>
          </div>

          {/* SAG: harita */}
          <div
            className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-border"
            style={reveal(200)}
          >
            <iframe
              title="Dr. İrem Seyhan Uyarcan Muayenehanesi konumu"
              src={embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="aspect-video h-full w-full border-0 sm:aspect-[4/3] lg:aspect-square"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
