import { useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { APPOINTMENT_URL } from "@/lib/links"

const navLinks = [
  { label: "Ana Sayfa", to: "/" },
  { label: "Hakkımda", to: "/hakkimda" },
  { label: "Tedaviler", to: "/tedaviler" },
  { label: "Blog", to: "/blog" },
  { label: "SSS", to: "/sss" },
  { label: "İletişim", to: "/iletisim" },
]

// Clockwise from top-left: TL -> TR -> BR -> BL
const logoQuads = [
  { src: "/genel/logo-tl.png", order: 0, col: 1, row: 1 },
  { src: "/genel/logo-tr.png", order: 1, col: 2, row: 1 },
  { src: "/genel/logo-br.png", order: 2, col: 2, row: 2 },
  { src: "/genel/logo-bl.png", order: 3, col: 1, row: 2 },
]
const LOGO_STAGGER = 220
const ITEM_STAGGER = 90
const ITEM_STEP = 100 // w-24 (96px) + gap-1 (4px)

type Phase = "loading" | "expand" | "rise"

export function Navbar({ phase = "rise" }: { phase?: Phase }) {
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const [slideX, setSlideX] = useState(0)
  const [morphDone, setMorphDone] = useState(false)
  const barRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const { pathname } = useLocation()

  const loading = phase === "loading"
  const activeIndex = (() => {
    const i = navLinks.findIndex((l) => l.to !== "/" && pathname.startsWith(l.to))
    return i === -1 ? 0 : i
  })()

  const openMenu = () => {
    const bar = barRef.current?.getBoundingClientRect()
    const btn = btnRef.current?.getBoundingClientRect()
    if (bar && btn) {
      setSlideX(bar.left + bar.width / 2 - (btn.left + btn.width / 2))
    }
    setOpen(true)
  }

  const closeMenu = () => {
    setClosing(true)
    window.setTimeout(() => setSlideX(0), 780)
    window.setTimeout(() => {
      setOpen(false)
      setClosing(false)
    }, 920)
  }

  const toggleMenu = () => {
    if (closing) return
    if (open) closeMenu()
    else openMenu()
  }

  // Buttons pop in one by one while the navbar opens
  const itemAnim = (idx: number): { className?: string; style?: React.CSSProperties } => {
    if (phase === "loading") return { style: { opacity: 0 } }
    if (phase === "expand")
      return { className: "item-pop", style: { animationDelay: `${idx * ITEM_STAGGER}ms` } }
    return {}
  }

  const lastIndex = navLinks.length - 1

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <div
        ref={barRef}
        onTransitionEnd={(e) => {
          if (e.propertyName === "max-width") setMorphDone(true)
        }}
        style={{
          maxWidth: loading ? "76px" : "64rem",
          transform:
            phase === "rise"
              ? "translateY(0) scale(1)"
              : `translateY(calc(50svh - 50% - 1rem)) scale(${loading ? 1.35 : 1})`,
          transformOrigin: "center",
          overflow: morphDone ? "visible" : "hidden",
          transition: "max-width 0.85s ease-in-out, transform 0.75s ease-in-out",
        }}
        className="mx-auto flex w-full items-center justify-between gap-4 rounded-full border border-border bg-background/80 py-2 pl-5 pr-2 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/70"
      >
        <Link
          to="/"
          style={{
            opacity: slideX !== 0 ? 0 : 1,
            pointerEvents: slideX !== 0 ? "none" : "auto",
            transition: "opacity 0.25s ease-in-out",
          }}
          className="flex shrink-0 items-center gap-2.5"
        >
          <div className="grid w-9 shrink-0 grid-cols-2" aria-hidden="true">
            {logoQuads.map((q) => (
              <img
                key={q.src}
                src={q.src}
                alt=""
                aria-hidden="true"
                className="square-pop block w-full"
                style={{
                  gridColumn: q.col,
                  gridRow: q.row,
                  animationDelay: `${q.order * LOGO_STAGGER}ms`,
                }}
              />
            ))}
          </div>
          <span
            className={cn("flex flex-col leading-tight", itemAnim(0).className)}
            style={itemAnim(0).style}
          >
            <span className="whitespace-nowrap text-sm font-semibold tracking-tight text-foreground">
              Dr. İrem Seyhan Uyarcan
            </span>
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Ortodonti Uzmanı
            </span>
          </span>
        </Link>

        <nav className="relative hidden items-center gap-1 lg:flex">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-0 h-9 w-24 rounded-full bg-secondary transition-[transform,opacity] duration-300 ease-in-out"
            style={{
              transform: `translateX(${activeIndex * ITEM_STEP}px)`,
              opacity: loading ? 0 : 1,
            }}
          />
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              to={link.to}
              aria-current={i === activeIndex ? "page" : undefined}
              style={itemAnim(1 + i).style}
              className={cn(
                "relative z-10 flex h-9 w-24 items-center justify-center rounded-full text-sm font-medium transition-colors duration-300 ease-in-out",
                itemAnim(1 + i).className,
                i === activeIndex
                  ? "text-secondary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div
          className={cn("hidden lg:block", itemAnim(1 + navLinks.length).className)}
          style={itemAnim(1 + navLinks.length).style}
        >
          <Button asChild className="h-9 w-28 rounded-full">
            <a href={APPOINTMENT_URL} target="_blank" rel="noopener noreferrer">
              Randevu Al
            </a>
          </Button>
        </div>

        <button
          ref={btnRef}
          type="button"
          onClick={toggleMenu}
          aria-label="Menüyü aç/kapat"
          aria-expanded={open}
          style={{
            transform: `translateX(${slideX}px)`,
            opacity: loading ? 0 : 1,
            transition: "transform 0.35s ease-in-out, opacity 0.4s ease-in-out",
            transitionDelay: loading ? "0s" : "0.15s",
          }}
          className="relative inline-flex items-center justify-center rounded-full p-2 text-foreground transition-colors hover:bg-accent lg:hidden"
        >
          <span className="relative flex size-5 flex-col items-center justify-center gap-[3px]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={cn(
                  "ham-bar",
                  open && !closing && "ham-bar--drop",
                  closing && "ham-bar--rise",
                )}
                style={{ animationDelay: closing ? `${420 + i * 30}ms` : `${300 + i * 35}ms` }}
              />
            ))}
            {open && (
              <>
                <span
                  className={cn("x-stroke", closing ? "x-stroke-a-out" : "x-stroke-a-in")}
                  style={{ animationDelay: closing ? "0ms" : "650ms" }}
                />
                <span
                  className={cn("x-stroke", closing ? "x-stroke-b-out" : "x-stroke-b-in")}
                  style={{ animationDelay: closing ? "0ms" : "650ms" }}
                />
              </>
            )}
          </span>
        </button>
      </div>

      {open && (
        <div
          className={cn(
            "mx-auto mt-2 w-full max-w-5xl rounded-3xl border border-border bg-background p-3 shadow-sm lg:hidden",
            closing ? "menu-card-out" : "menu-card-in",
          )}
          style={{ animationDelay: closing ? "560ms" : "600ms" }}
        >
          <nav className="flex flex-col items-center gap-2">
            {navLinks.map((link, i) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={closeMenu}
                aria-current={i === activeIndex ? "page" : undefined}
                style={{ animationDelay: closing ? `${(lastIndex - i) * 55}ms` : `${580 + i * 60}ms` }}
                className={cn(
                  "flex h-11 w-full items-center justify-center overflow-hidden rounded-full text-sm font-medium",
                  closing ? "menu-pill-out" : "menu-pill-in",
                  i === activeIndex
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-muted text-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <span
                  className={cn("whitespace-nowrap", closing ? "menu-label-out" : "menu-label-in")}
                  style={{
                    animationDelay: closing
                      ? `${(lastIndex - i) * 55}ms`
                      : `${580 + i * 60 + 150}ms`,
                  }}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <Button
              asChild
              className={cn("mt-1 h-11 w-full rounded-full", closing ? "menu-cta-out" : "menu-cta-in")}
              style={{ animationDelay: closing ? "0ms" : `${580 + navLinks.length * 60 + 70}ms` }}
            >
              <a href={APPOINTMENT_URL} target="_blank" rel="noopener noreferrer">
                Randevu Al
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
