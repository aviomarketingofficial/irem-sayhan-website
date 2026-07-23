import { usePageMeta } from "@/lib/seo"
import { staticPageMeta } from "@/data/pageMeta"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { APPOINTMENT_URL, PHOTO_CDN } from "@/lib/links"
import { cn } from "@/lib/utils"

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          obs.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 700ms ease, transform 700ms ease",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

type TimelineEntry = { year: string; title: string; detail: string }

const timeline: TimelineEntry[] = [
  {
    year: "2003",
    title: "Diş Hekimliği mezuniyeti",
    detail: "Ege Üniversitesi Diş Hekimliği Fakültesi'nden mezun oldu.",
  },
  {
    year: "2009",
    title: "Ortodonti uzmanlığı",
    detail:
      "Ege Üniversitesi Diş Hekimliği Fakültesi Ortodonti Ana Bilim Dalı'nda uzmanlık eğitimini tamamladı.",
  },
  {
    year: "2009'dan bugüne",
    title: "Manisa'da kendi muayenehanesi",
    detail:
      "Şehzadeler, Manisa'daki kendi muayenehanesinde ortodonti uzmanı olarak hasta kabul ediyor.",
  },
]

const interests: string[] = [
  "Diş çapraşıklığı",
  "Sınıf 3 maloklüzyonlar",
  "Çene problemleri",
  "Gömülü dişler",
  "Dudak ve damak yarıkları",
  "Şeffaf plak tedavisi",
  "Lingual (görünmez) ortodonti",
  "Ortognatik (cerrahi destekli) ortodonti",
]

type Value = { title: string; text: string }

const values: Value[] = [
  {
    title: "Anlaşılır anlatım",
    text: "Tedavi sürecini, seçenekleri ve nedenlerini sade bir dille anlatır. Her aşamada ne olduğunu bilirsiniz.",
  },
  {
    title: "Kişiye özel planlama",
    text: "Her ağız yapısı farklıdır. Tedavi, sizin diş ve çene yapınıza göre tek tek planlanır.",
  },
  {
    title: "Uzun soluklu takip",
    text: "Tedavi bitince iş bitmez. Sonucun kalıcı olması için kontroller ve pekiştirme aşaması özenle yürütülür.",
  },
]

const ministats: { value: string; label: string }[] = [
  { value: "17+", label: "Yıl deneyim" },
  { value: "2009", label: "Kendi muayenehanesi" },
  { value: "Manisa", label: "Şehzadeler" },
]

export function Hakkimda() {
  usePageMeta({ ...staticPageMeta["/hakkimda"], path: "/hakkimda" })
  return (
    <section className="bg-background pt-28 sm:pt-36">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr] md:gap-14">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
              Hakkımda
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#0b2545] sm:text-5xl">
              Dr. İrem Seyhan Uyarcan
            </h1>
            <p className="mt-3 text-lg font-medium text-primary sm:text-xl">
              Ortodonti Uzmanı, Manisa
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              2009 yılından bu yana Manisa'daki kendi muayenehanesinde
              yetişkinler ve çocuklar için ortodontik tedaviler uyguluyor. Diş
              ve çene düzensizliklerinde, sizi dinleyerek ve süreci açıkça
              anlatarak yola çıkmayı önemsiyor.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="overflow-hidden rounded-3xl bg-muted shadow-sm ring-1 ring-border">
              <img
                src={`${PHOTO_CDN}/hakkimda-portre.webp`}
                alt="Dr. İrem Seyhan Uyarcan, Manisa'daki muayenehanesinde"
                width={1200}
                height={1125}
                loading="eager"
                decoding="async"
                className="block h-auto w-full"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Hakkımda anlatımı */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-14">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-[#0b2545] sm:text-3xl">
              Kısa bir tanışma
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                1979'da Manisa'da doğdu. Lisans eğitimini Ege Üniversitesi Diş
                Hekimliği Fakültesi'nde tamamladıktan sonra aynı üniversitenin
                Ortodonti Ana Bilim Dalı'nda uzmanlığını aldı.
              </p>
              <p>
                2009'dan bu yana Şehzadeler, Manisa'daki kendi muayenehanesinde
                yalnızca ortodonti üzerine çalışıyor. Tel tedavisinden şeffaf
                plak ve görünmez ortodontiye kadar farklı yöntemleri, kişinin
                ihtiyacına göre değerlendiriyor.
              </p>
              <p>
                Ortodontinin yalnızca düzgün dişler değil, sağlıklı bir kapanış
                ve rahat bir gülümseme meselesi olduğuna inanıyor. Bu yüzden
                tedaviye başlamadan önce muayene ve ölçümlerle hangi yolun size
                uygun olduğunu birlikte konuşmayı tercih ediyor.
              </p>
            </div>
          </Reveal>

          {/* İlgi alanları */}
          <Reveal delay={120}>
            <div className="rounded-2xl border border-border bg-muted/30 p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-[#0b2545]">
                İlgi alanları
              </h3>
              <ul className="mt-5 space-y-3">
                {interests.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mini istatistik şeridi */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-y-8 px-4 py-12 sm:grid-cols-3 sm:gap-y-0 sm:px-6 sm:py-14 lg:px-8">
          {ministats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <div
                className={cn(
                  "flex flex-col items-center text-center sm:px-4",
                  "sm:border-l sm:border-border sm:first:border-l-0",
                )}
              >
                <span className="text-3xl font-semibold tracking-tight text-[#0b2545] sm:text-4xl">
                  {s.value}
                </span>
                <span className="mt-2 text-sm text-muted-foreground">
                  {s.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Eğitim ve deneyim zaman çizelgesi */}
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight text-[#0b2545] sm:text-3xl">
            Eğitim ve deneyim
          </h2>
        </Reveal>
        <div className="mt-10 space-y-0">
          {timeline.map((entry, i) => (
            <Reveal key={entry.year} delay={i * 90}>
              <div className="relative grid grid-cols-[auto_1fr] gap-x-6 pb-10 last:pb-0">
                {/* Çizgi + nokta */}
                <div className="flex flex-col items-center">
                  <span className="mt-1.5 size-3 shrink-0 rounded-full border-2 border-primary bg-background" />
                  {i < timeline.length - 1 && (
                    <span className="mt-1 w-px flex-1 bg-border" />
                  )}
                </div>
                <div className="pb-2">
                  <span className="text-sm font-semibold text-primary">
                    {entry.year}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold text-[#0b2545]">
                    {entry.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {entry.detail}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Yaklaşım ve değerler */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-[#0b2545] sm:text-3xl">
              Yaklaşımım
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Tedavi kararını birlikte vermeyi, her adımı anlaşılır kılmayı ve
              sonuca kadar yanınızda olmayı önemsiyorum.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 90}>
                <div className="h-full rounded-2xl border border-border bg-background p-6 sm:p-7">
                  <h3 className="text-lg font-semibold text-[#0b2545]">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Randevu CTA */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <Reveal>
          <div className="rounded-3xl border border-border bg-[#0b2545] px-6 py-12 text-center sm:px-12 sm:py-16">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Gülümsemeniz için doğru yolu birlikte bulalım
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75">
              Diş ve çene yapınıza uygun seçenekleri muayenede netleştirelim.
              Süreç, beklentiler ve ücret konusundaki sorularınızı görüşmede
              yanıtlıyoruz.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <a href={APPOINTMENT_URL} target="_blank" rel="noopener noreferrer">
                  Randevu Al
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link to="/tedaviler">Tedavileri İncele</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </section>
  )
}
