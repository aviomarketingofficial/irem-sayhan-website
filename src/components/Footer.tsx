import { Link } from "react-router-dom"
import { FACEBOOK_URL, INSTAGRAM_URL } from "@/lib/links"

const footerLinks = [
  { label: "Ana Sayfa", to: "/" },
  { label: "Hakkımda", to: "/hakkimda" },
  { label: "Tedaviler", to: "/tedaviler" },
  { label: "Blog", to: "/blog" },
  { label: "SSS", to: "/sss" },
  { label: "İletişim", to: "/iletisim" },
]

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4.5 shrink-0"
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
      className="size-4.5 shrink-0"
      aria-hidden="true"
    >
      <path d="M14 8.5V7c0-.8.5-1.3 1.3-1.3H17V3h-2.3C12.6 3 11 4.6 11 6.8v1.7H9V11h2v10h3V11h2.2l.5-2.5H14Z" />
    </svg>
  )
}

// Sosyal hesaplar — adresler lib/links.ts'te (tek kaynak)
const socials = [
  { label: "Instagram'da takip edin", Icon: InstagramIcon, href: INSTAGRAM_URL },
  { label: "Facebook'ta takip edin", Icon: FacebookIcon, href: FACEBOOK_URL },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src="/genel/logo-mark.png"
            alt=""
            aria-hidden="true"
            width={1268}
            height={1241}
            loading="lazy"
            decoding="async"
            className="w-8 shrink-0"
          />
          <span className="flex flex-col leading-tight">
            <span className="text-base font-semibold tracking-tight text-foreground">
              Dr. İrem Seyhan Uyarcan
            </span>
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Ortodonti Uzmanı
            </span>
          </span>
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-3 lg:items-end">
          <div className="flex items-center gap-2">
            {socials.map(({ label, Icon, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-[#0b2545] transition-colors hover:bg-muted hover:text-primary"
              >
                <Icon />
              </a>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Dr. İrem Seyhan Uyarcan. Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-muted-foreground">
            Tasarım ve geliştirme:{" "}
            <span className="font-medium text-[#0b2545]">Avio Marketing</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
