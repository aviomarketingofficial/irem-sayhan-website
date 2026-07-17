import { type CSSProperties, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { faqs, type Faq } from "@/data/faqs"
import { cn } from "@/lib/utils"
import { playedOnce } from "@/lib/animatedOnce"

// Kategori cesitliligi olsun diye her ana kategoriden temsili bir soru seciyoruz.
// (ilk 6-8 yerine farkli baslıklardan secim)
const SELECTED_QUESTIONS: string[] = [
  "Diş teli tedavisi ne kadar sürer?",
  "Şeffaf plak mı diş teli mi, hangisi daha iyi?",
  "Metal braket mi seramik braket mi tercih etmeliyim?",
  "Çocuğumu ilk kez kaç yaşında ortodontiste götürmeliyim?",
  "Çene uyumsuzluğum sadece diş teliyle düzelir mi, yoksa ameliyat şart mı?",
  "Tedavi bittikten sonra dişler eski haline döner mi?",
  "Manisa'da ortodonti tedavisi için nasıl randevu alabilirim?",
]

// Secilen sorulari faqs icindeki sirasini koruyarak topla (eslesmeyen olursa atla)
const selected: Faq[] = SELECTED_QUESTIONS.map((q) => faqs.find((f) => f.question === q)).filter(
  (f): f is Faq => Boolean(f),
)

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span
      className={cn(
        "relative inline-flex size-6 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
        open ? "bg-primary text-white" : "bg-muted text-[#0b2545]",
      )}
      aria-hidden="true"
    >
      {/* yatay cizgi sabit, dikey cizgi acilinca kaybolur -> arti'dan eksi'ye doner */}
      <span className="absolute h-[2px] w-3 rounded-full bg-current" />
      <span
        className="absolute h-[2px] w-3 rounded-full bg-current"
        style={{
          transform: open ? "rotate(0deg) scaleX(0)" : "rotate(90deg) scaleX(1)",
          transition: "transform 0.35s ease-in-out",
        }}
      />
    </span>
  )
}

function FaqRow({ faq, index, inView }: { faq: Faq; index: number; inView: boolean }) {
  const [open, setOpen] = useState(false)
  const [height, setHeight] = useState(0)
  const bodyRef = useRef<HTMLDivElement>(null)

  // Acik panelin yuksekligini icerige gore olc (yumusak yukseklik gecisi icin)
  useEffect(() => {
    const measure = () => {
      if (bodyRef.current) setHeight(bodyRef.current.scrollHeight)
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  // Kutular yukarıdan aşağıya sırayla, ortadan dışarı doğru pop-up ile açılır
  // (merkez orijinli ölçek büyümesi + hafif zıplama). Gecikme, transition
  // kısayolunun içine gömülü (shorthand + transitionDelay karışımı uyarı verir).
  const delay = inView ? `${index * 90}ms` : "0ms"
  const reveal: CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView ? "scale(1)" : "scale(0.85)",
    transformOrigin: "center",
    transition: `opacity 0.4s ease-out ${delay}, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}`,
  }

  const panelId = `home-faq-panel-${index}`
  const buttonId = `home-faq-button-${index}`

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border bg-card shadow-sm transition-colors duration-300",
        open ? "border-primary/40" : "border-border",
      )}
      style={reveal}
    >
      <button
        type="button"
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left outline-none ring-primary/40 focus-visible:ring-2 sm:px-6 sm:py-5"
      >
        <span className="text-base font-semibold text-[#0b2545] sm:text-lg">{faq.question}</span>
        <PlusIcon open={open} />
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        style={{
          height: open ? height : 0,
          opacity: open ? 1 : 0,
          transition: "height 0.4s ease-in-out, opacity 0.4s ease-in-out",
        }}
      >
        <div ref={bodyRef} className="px-5 pb-5 sm:px-6 sm:pb-6">
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{faq.answer}</p>
        </div>
      </div>
    </div>
  )
}

export function HomeFaq() {
  const sectionRef = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(() => playedOnce.has("homefaq"))

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (playedOnce.has("homefaq")) return // bu oturumda oynadı; tekrar oynamasın
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true)
      return
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          playedOnce.mark("homefaq")
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0, rootMargin: "-35% 0px -35% 0px" },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const reveal = (i = 0): CSSProperties => {
    const delay = inView ? `${i * 90}ms` : "0ms"
    return {
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(12px)",
      transition: `opacity 0.6s ease-in-out ${delay}, transform 0.6s ease-in-out ${delay}`,
    }
  }

  return (
    <section ref={sectionRef} className="bg-muted/40 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="text-center" style={reveal(0)}>
          <h2 className="text-3xl font-semibold tracking-tight text-[#0b2545] sm:text-4xl">Merak Edilenler</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
            En çok sorduğunuz sorular.
          </p>
        </div>

        <div className="mt-12 grid gap-3 sm:gap-4">
          {selected.map((faq, i) => (
            <FaqRow key={faq.question} faq={faq} index={i} inView={inView} />
          ))}
        </div>

        <div className="mt-10 text-center" style={reveal(selected.length + 1)}>
          <Link
            to="/sss"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 transition-opacity hover:opacity-80"
          >
            Tüm sorular
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
