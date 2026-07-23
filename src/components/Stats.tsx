import { useEffect, useRef, useState } from "react"
import { playedOnce, prefersReducedMotion } from "@/lib/animatedOnce"

type Stat = { value: number; suffix: string; label: string; stars?: boolean }

const stats: Stat[] = [
  { value: 17, suffix: "+", label: "Yıl deneyim" },
  { value: 218, suffix: "+", label: "Doktor Takvimi Yorumu" },
  { value: 37, suffix: "+", label: "Google Yorumu" },
  { value: 5, suffix: "", label: "Ortalama puan", stars: true },
]

function StarIcon({ filled, className }: { filled: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? "#f59e0b" : "#e2e8f0"}
      aria-hidden="true"
    >
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  )
}

function useCountUp(target: number, active: boolean, duration = 1600) {
  // Hareket azaltma açıksa sayaç hiç dönmez; değer doğrudan hedefiyle doğar.
  // (Sayaç ekran dışındayken de hedefte durur — kullanıcı yalnızca son sayıyı görür.)
  const [val, setVal] = useState(() => (prefersReducedMotion() ? target : 0))
  useEffect(() => {
    if (!active) return
    if (prefersReducedMotion()) return // değer zaten hedefte
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
      setVal(target * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
      else setVal(target)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, active, duration])
  return val
}

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const current = Math.round(useCountUp(stat.value, active))
  return (
    <div className="flex flex-col items-center px-4 text-center md:border-l md:border-border md:first:border-l-0">
      <div className="flex h-14 items-center justify-center">
        {stat.stars ? (
          <div className="flex items-center gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <StarIcon key={i} filled={i < current} className="size-7 sm:size-8" />
            ))}
          </div>
        ) : (
          <span className="text-4xl font-semibold tracking-tight sm:text-5xl">
            <span className="text-[#0b2545]">{current}</span>
            <span className="text-primary">{stat.suffix}</span>
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
    </div>
  )
}

export function Stats() {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(() => playedOnce.has("stats"))

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (playedOnce.has("stats")) return // bu oturumda oynadı; tekrar oynamasın
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playedOnce.mark("stats")
          setActive(true)
          obs.disconnect()
        }
      },
      { threshold: 0, rootMargin: "-35% 0px -35% 0px" },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="bg-background py-16 sm:py-20">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-y-10 px-4 sm:px-6 md:grid-cols-4 md:gap-y-0 lg:px-8">
        {stats.map((stat) => (
          <StatItem key={stat.label} stat={stat} active={active} />
        ))}
      </div>
    </section>
  )
}
