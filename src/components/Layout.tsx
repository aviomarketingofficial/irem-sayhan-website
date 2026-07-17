import { useEffect, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { playedOnce } from "@/lib/animatedOnce"

type Phase = "loading" | "expand" | "rise"

export function Layout() {
  const { pathname } = useLocation()
  // Navbar'ın logo/morph intro'su yalnızca ANA SAYFADA ve oturumda bir kez oynar;
  // diğer route'larda navbar doğrudan yerleşik ("rise") başlar.
  const [playIntro] = useState(
    () =>
      pathname === "/" &&
      !playedOnce.has("navintro") &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )
  const [phase, setPhase] = useState<Phase>(playIntro ? "loading" : "rise")

  useEffect(() => {
    if (!playIntro) return
    playedOnce.mark("navintro") // bu oturumda oynadı; tekrar oynamasın
    const t1 = window.setTimeout(() => setPhase("expand"), 1500)
    const t2 = window.setTimeout(() => setPhase("rise"), 2600)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [playIntro])

  // Sayfa değişince yukarı kaydır (intro bir kez oynar, sonra geçişler anında)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const risen = phase === "rise"

  return (
    <div className="flex min-h-svh flex-col">
      <Navbar phase={phase} />
      {/* İçerik perdesiz: her sayfada ilk boyamada görünür (intro içeriği örtmez) */}
      <div className="flex flex-1 flex-col">
        <main className="flex-1">
          <Outlet context={{ risen }} />
        </main>
        <Footer />
      </div>
    </div>
  )
}
