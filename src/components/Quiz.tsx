import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { playedOnce } from "@/lib/animatedOnce"
import { APPOINTMENT_URL, WHATSAPP_URL } from "@/lib/links"

type Option = { label: string; value: string }
type Question = { id: string; q: string; options: Option[] }

const questions: Question[] = [
  {
    id: "who",
    q: "Tedavi kimin için?",
    options: [
      { label: "Kendim (yetişkin)", value: "adult" },
      { label: "Gencim (13-18)", value: "teen" },
      { label: "Çocuğum için (12 yaş altı)", value: "child" },
    ],
  },
  {
    id: "concern",
    q: "Seni en çok ne rahatsız ediyor?",
    options: [
      { label: "Çapraşıklık", value: "crowding" },
      { label: "Dişlerde boşluk", value: "spacing" },
      { label: "Kapanış veya çene uyumsuzluğu", value: "jaw" },
      { label: "Daha güzel bir gülüş", value: "aesthetic" },
    ],
  },
  {
    id: "visibility",
    q: "Görünürlük senin için önemli mi?",
    options: [
      { label: "Mümkün olduğunca görünmez olsun", value: "invisible" },
      { label: "Fark etmez, en etkili yöntem olsun", value: "any" },
      { label: "Emin değilim, hekim önersin", value: "unsure" },
    ],
  },
]

type ResultKey = "child" | "aligner" | "braces" | "surgical"
type ResultInfo = { title: string; image?: string; text: string }

const results: Record<ResultKey, ResultInfo> = {
  child: {
    title: "Çocuk (erken) ortodonti",
    image: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/anasayfa-quiz-cocuk.jpg",
    text: "Çocuklarda doğru zamanlama önemli. Erken bir değerlendirme, ileride daha kısa ve kolay bir tedavi için fırsat yaratabilir.",
  },
  aligner: {
    title: "Şeffaf plak tedavisi",
    text: "Günlük hayatta fark edilmeyen, çıkarılabilen şeffaf plaklarla diş dizilimini düzeltmeye yönelik bir seçenek olabilir.",
  },
  braces: {
    title: "Sabit ortodontik tedavi (braketli tedavi)",
    text: "Metal veya daha az belirgin seramik braketlerle etkili bir diş dizilimi tedavisi.",
  },
  surgical: {
    title: "Ortognatik cerrahi değerlendirmesi",
    image: "https://cdn.jsdelivr.net/gh/aviomarketingofficial/irem-sayhan-website-photos@main/anasayfa-quiz-cerrahi.jpg",
    text: "Çene uyumsuzluğu belirginse tedavi, ortodonti ve çene cerrahisinin birlikte planlanmasını (ortognatik yaklaşım) gerektirebilir.",
  },
}

function resolveResult(answers: string[]): ResultKey {
  const [who, concern, visibility] = answers
  if (who === "child") return "child"
  if (concern === "jaw") return "surgical"
  if (visibility === "invisible") return "aligner"
  return "braces"
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  )
}

function DoktorTakvimiIcon({ className }: { className?: string }) {
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

export function Quiz() {
  const sectionRef = useRef<HTMLElement>(null)
  const skipQuiz = playedOnce.has("quiz") // bu oturumda oynadı; girişi atla, hazır göster
  const [inView, setInView] = useState(skipQuiz)
  const [showQuestion, setShowQuestion] = useState(skipQuiz)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [advanced, setAdvanced] = useState(skipQuiz) // ilk soru sinematik, sonrası normal geçiş

  const isResult = step >= questions.length

  // Görününce başlat
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (playedOnce.has("quiz")) return // bu oturumda oynadı; tekrar oynamasın
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          playedOnce.mark("quiz")
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0, rootMargin: "-35% 0px -35% 0px" },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Önce başlık, sonra ilk soru sinematik pop ile gelir
  useEffect(() => {
    if (!inView) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const t = window.setTimeout(() => setShowQuestion(true), reduce ? 0 : 900)
    return () => window.clearTimeout(t)
  }, [inView])

  const choose = (value: string) => {
    setAnswers((prev) => {
      const next = [...prev]
      next[step] = value
      return next
    })
    setAdvanced(true)
    window.setTimeout(() => setStep((s) => s + 1), 180)
  }

  const back = () => setStep((s) => Math.max(0, s - 1))
  const restart = () => {
    setAnswers([])
    setStep(0)
    setAdvanced(false)
  }

  const current = questions[step]
  const progress = Math.min(1, (step + 1) / questions.length)
  const resultKey = isResult ? resolveResult(answers) : null
  const result = resultKey ? results[resultKey] : null

  return (
    <section
      ref={sectionRef}
      className="flex min-h-[40rem] flex-col items-center justify-center bg-muted/40 px-4 py-20 sm:py-28"
    >
      <div className="w-full max-w-3xl">
        {/* Başlık */}
        <div
          className="text-center"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.6s ease-in-out, transform 0.6s ease-in-out",
          }}
        >
          <h2 className="text-3xl font-semibold tracking-tight text-[#0b2545] sm:text-4xl">
            Sana uygun tedaviyi bul
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
            Birkaç kısa soruyla sana en uygun tedaviyi önerelim.
          </p>
        </div>

        {/* Soru / sonuç alanı */}
        <div className="mt-10">
          {showQuestion && !isResult && current && (
            <div className="mx-auto max-w-2xl">
              {/* İlerleme */}
              <div className="mb-7">
                <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
                  <button
                    type="button"
                    onClick={back}
                    disabled={step === 0}
                    className="inline-flex items-center gap-1 transition-opacity hover:text-[#0b2545] disabled:opacity-0"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                    Geri
                  </button>
                  <span>
                    {step + 1}/{questions.length}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500 ease-in-out"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
              </div>

              {/* Soru */}
              <div key={step} className={advanced ? "quiz-q-in" : "quiz-pop-in"}>
                <h3 className="text-center text-2xl font-semibold text-[#0b2545] sm:text-3xl">{current.q}</h3>
                <div className="mt-8 grid gap-3">
                  {current.options.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => choose(opt.value)}
                      className={cn(
                        "w-full rounded-2xl border bg-card px-6 py-4 text-left text-base font-medium text-[#0b2545] shadow-sm transition-all duration-200",
                        "hover:border-primary hover:bg-accent hover:shadow-md",
                        answers[step] === opt.value ? "border-primary ring-2 ring-primary/30" : "border-border",
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sonuç */}
          {isResult && result && (
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              {/* Sol: önerilen tedavi kartı (görsel gelene kadar sade lacivert kart) */}
              <div className="quiz-result-card relative flex aspect-[3/2] items-end overflow-hidden rounded-3xl shadow-sm">
                {result.image ? (
                  <>
                    <img
                      src={result.image}
                      alt={result.title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b2545]/85 via-[#0b2545]/15 to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0b2545] to-[#13335c]" />
                )}
                <div className="relative p-6 text-left sm:p-8">
                  <h3 className="text-2xl font-semibold text-white sm:text-3xl">{result.title}</h3>
                </div>
              </div>

              {/* Sağ: açıklama + butonlar */}
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-primary">Sana en uygun tedavi</p>
                <h3 className="mt-2 text-2xl font-semibold text-[#0b2545] sm:text-3xl">{result.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{result.text}</p>

                <div className="mt-7 flex flex-col items-start gap-3">
                  <Button asChild className="item-pop h-11 rounded-full px-6 text-sm" style={{ animationDelay: "0ms" }}>
                    <a href={APPOINTMENT_URL} target="_blank" rel="noopener noreferrer">
                      <DoktorTakvimiIcon className="size-4" />
                      Randevu Al
                    </a>
                  </Button>
                  <Button
                    asChild
                    className="item-pop h-11 rounded-full bg-[#25D366] px-5 text-sm text-white hover:bg-[#1fae57]"
                    style={{ animationDelay: "120ms" }}
                  >
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                      <WhatsAppIcon className="size-4" />
                      WhatsApp
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="item-pop h-11 rounded-full px-6 text-sm"
                    style={{ animationDelay: "240ms" }}
                  >
                    <a href="#tedaviler">Tedavileri İncele</a>
                  </Button>
                </div>

                <div className="mt-6 text-sm text-muted-foreground">
                  <button type="button" onClick={restart} className="underline-offset-4 hover:text-[#0b2545] hover:underline">
                    Testi baştan çöz
                  </button>
                </div>
                <p className="mt-3 text-xs font-bold text-primary">
                  Bu öneri bilgilendirme amaçlıdır, kesin karar muayene ile netleşir.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
