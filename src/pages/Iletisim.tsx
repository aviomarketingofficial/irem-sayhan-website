import { usePageMeta } from "@/lib/seo"
import { staticPageMeta } from "@/data/pageMeta"
import { Button } from "@/components/ui/button"
import {
  APPOINTMENT_URL,
  WHATSAPP_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  LANDLINE_DISPLAY,
  LANDLINE_TEL,
  EMAIL,
  EMAIL_URL,
  WORKING_HOURS,
  ADDRESS,
  MAP_EMBED_URL,
  DIRECTIONS_URL,
  INSTAGRAM_URL,
  FACEBOOK_URL,
} from "@/lib/links"

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 shrink-0"
      aria-hidden="true"
    >
      <path d="M12 21s-6.5-5.6-6.5-10.5a6.5 6.5 0 1 1 13 0C18.5 15.4 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.4" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 shrink-0"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 shrink-0"
      aria-hidden="true"
    >
      <path d="M4 5c0-.6.4-1 1-1h2.5c.5 0 .9.3 1 .8l.8 3a1 1 0 0 1-.3 1l-1.4 1.3a12 12 0 0 0 5.3 5.3l1.3-1.4a1 1 0 0 1 1-.3l3 .8c.5.1.8.5.8 1V19c0 .6-.4 1-1 1A15 15 0 0 1 4 5Z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 shrink-0"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 shrink-0"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 shrink-0"
      aria-hidden="true"
    >
      <path d="M14 8.5V7c0-.8.5-1.3 1.3-1.3H17V3h-2.3C12.6 3 11 4.6 11 6.8v1.7H9V11h2v10h3V11h2.2l.5-2.5H14Z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1c-.2.3-.7 1-.9 1.1-.2.2-.3.2-.6.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.4.1-.6l.5-.5c.1-.2.2-.3.3-.5 0-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5 0-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.2 3.4 5.3 4.7.7.3 1.3.5 1.8.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3Z" />
      <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.1-.4-4.5-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2Z" />
    </svg>
  )
}

export function Iletisim() {
  usePageMeta({ ...staticPageMeta["/iletisim"], path: "/iletisim" })
  return (
    <section className="mx-auto max-w-6xl px-4 pt-28 pb-20 sm:px-6 sm:pt-36">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-[#0b2545] sm:text-4xl">
          İletişim
        </h1>
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">
          Randevu, soru ve yönlendirme için bize ulaşabilirsiniz. Aşağıdaki
          haritadan muayenehanenin konumuna kolayca göz atabilir, yol tarifi
          alabilirsiniz.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Bilgiler */}
        <div className="flex flex-col">
          <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight text-[#0b2545]">
              Dr. İrem Seyhan Uyarcan Muayenehanesi
            </h2>

            <div className="mt-6 space-y-5">
              {/* Adres */}
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-primary">
                  <PinIcon />
                </span>
                <div>
                  <p className="text-sm font-medium text-[#0b2545]">Adres</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {ADDRESS}
                  </p>
                  <a
                    href={DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Yol Tarifi Al
                  </a>
                </div>
              </div>

              {/* Çalışma Saatleri */}
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-primary">
                  <ClockIcon />
                </span>
                <div>
                  <p className="text-sm font-medium text-[#0b2545]">
                    Çalışma Saatleri
                  </p>
                  <div className="mt-1 space-y-0.5 text-sm leading-relaxed text-muted-foreground">
                    {WORKING_HOURS.map((h) => (
                      <p key={h.label}>
                        <span className="text-[#0b2545]">{h.label}:</span> {h.value}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Telefon */}
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-primary">
                  <PhoneIcon />
                </span>
                <div>
                  <p className="text-sm font-medium text-[#0b2545]">Telefon</p>
                  <div className="mt-1 space-y-0.5 text-sm leading-relaxed">
                    <p>
                      <a href={PHONE_TEL} className="text-muted-foreground transition-colors hover:text-primary">
                        {PHONE_DISPLAY}
                      </a>
                      <span className="text-muted-foreground"> (cep / WhatsApp)</span>
                    </p>
                    <p>
                      <a href={LANDLINE_TEL} className="text-muted-foreground transition-colors hover:text-primary">
                        {LANDLINE_DISPLAY}
                      </a>
                      <span className="text-muted-foreground"> (sabit hat)</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* E-posta */}
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-primary">
                  <MailIcon />
                </span>
                <div>
                  <p className="text-sm font-medium text-[#0b2545]">E-posta</p>
                  <p className="mt-1 text-sm leading-relaxed">
                    <a href={EMAIL_URL} className="text-muted-foreground transition-colors hover:text-primary">
                      {EMAIL}
                    </a>
                  </p>
                </div>
              </div>

              {/* Sosyal medya — adresler lib/links.ts'te */}
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-primary">
                  <InstagramIcon />
                </span>
                <div className="w-full">
                  <p className="text-sm font-medium text-[#0b2545]">
                    Sosyal Medya
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram'da takip edin"
                      className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-[#0b2545] transition-colors hover:bg-muted hover:text-primary"
                    >
                      <InstagramIcon />
                    </a>
                    <a
                      href={FACEBOOK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook'ta takip edin"
                      className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-[#0b2545] transition-colors hover:bg-muted hover:text-primary"
                    >
                      <FacebookIcon />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Aksiyon butonları */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <a href={APPOINTMENT_URL} target="_blank" rel="noopener noreferrer">
                  Online Randevu Al
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="w-full bg-[#25D366] text-white shadow-sm transition-colors hover:bg-[#1fae57] sm:w-auto"
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon />
                  WhatsApp ile Yaz
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Harita */}
        <div className="overflow-hidden rounded-2xl border border-border bg-muted">
          <iframe
            title="Dr. İrem Seyhan Uyarcan Muayenehanesi konumu"
            src={MAP_EMBED_URL}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="h-[320px] w-full border-0 sm:h-full sm:min-h-[480px]"
          />
        </div>
      </div>
    </section>
  )
}
