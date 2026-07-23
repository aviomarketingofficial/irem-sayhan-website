import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { APPOINTMENT_URL, WHATSAPP_URL } from "@/lib/links"
import { HeroBackground } from "@/components/HeroBackground"
import { playedOnce } from "@/lib/animatedOnce"

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

export function Hero({ revealed = true }: { revealed?: boolean }) {
  // Yazı + scrim İLK BOYAMADA görünür; kare animasyonu arkada oynar, LCP beklemez
  const skipHero = playedOnce.has("hero") // bu oturumda oynadı; geri dönünce pop tekrar oynamasın

  // Butonlarda kısa pop — ilk boyamayla birlikte başlar, görünürlüğü geciktirmez
  const buttonPop = (i: number): { className?: string; style?: React.CSSProperties } => {
    if (skipHero) return {} // hazır gel, pop animasyonu oynamasın
    return { className: "item-pop", style: { animationDelay: `${i * 100}ms` } }
  }

  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden">
      {/* Arka plan: telli → düzgün gülüş kare dizisi (yazının arkasında oynar) */}
      <HeroBackground play={revealed} />
      {/* Beyaz degrade scrim baştan görünür — yazı her an okunur */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/85 to-white/30" />

      <div className="mx-auto w-full max-w-5xl px-4 pt-28 pb-16 sm:px-6 sm:pt-32 lg:px-8">
        <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">
          Ortodonti Uzmanı · Manisa
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-[#0b2545] sm:text-5xl lg:text-6xl">
          Manisa'nın gülüşüne 17 yıldır aynı el dokunuyor.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#0b2545]/75 sm:text-lg">
          Dr. İrem Seyhan Uyarcan, 2009 yılından bu yana Manisa'da kendi
          muayenehanesinde ortodonti tedavisi sunuyor. Çocukluğunuzda başlayan bir
          tedavi de olsa, yetişkinlikte verdiğiniz yeni bir karar da olsa; süreç
          boyunca aynı hekim sizinle ilgilenir.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Button
            asChild
            className={cn("h-11 rounded-full px-6 text-sm", buttonPop(0).className)}
            style={buttonPop(0).style}
          >
            <a href={APPOINTMENT_URL} target="_blank" rel="noopener noreferrer">
              <DoktorTakvimiIcon className="size-4" />
              Randevu Al
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className={cn("h-11 rounded-full px-6 text-sm", buttonPop(1).className)}
            style={buttonPop(1).style}
          >
            <a href="#tedaviler">Tedavileri İncele</a>
          </Button>
          <Button
            asChild
            className={cn(
              "h-11 rounded-full bg-[#25D366] px-6 text-sm text-white hover:bg-[#1fae57]",
              buttonPop(2).className,
            )}
            style={buttonPop(2).style}
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-4" />
              WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
