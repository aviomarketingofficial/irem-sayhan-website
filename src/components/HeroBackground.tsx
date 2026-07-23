import { useEffect, useRef, useState } from "react"
import { HERO_FRAME_COUNT, heroFramePath } from "@/lib/links"
import { playedOnce } from "@/lib/animatedOnce"

const PLAY_DURATION = 2600 // ms — telli → düzgün gülüş

export function HeroBackground({
  play,
  onComplete,
}: {
  play: boolean
  onComplete?: () => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const frameRef = useRef(0)
  const [ready, setReady] = useState(false) // normal akış: tüm kareler yüklendi
  const [finalOnly, setFinalOnly] = useState(false) // atlama modu: yalnızca son kare yüklendi

  const draw = (index: number) => {
    const canvas = canvasRef.current
    const img = imagesRef.current[index]
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx || !img || !img.complete || !img.naturalWidth) return

    const dpr = window.devicePixelRatio || 1
    const cw = canvas.clientWidth
    const ch = canvas.clientHeight
    if (cw === 0 || ch === 0) return
    if (canvas.width !== Math.round(cw * dpr) || canvas.height !== Math.round(ch * dpr)) {
      canvas.width = Math.round(cw * dpr)
      canvas.height = Math.round(ch * dpr)
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    // object-cover
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
    const w = img.naturalWidth * scale
    const h = img.naturalHeight * scale
    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h)
    frameRef.current = index
  }

  // Kareleri katmanlı yükle:
  // - Atlama modunda (oturumda oynadıysa / hareket azaltma açıksa) 74 kare İNDİRİLMEZ,
  //   yalnızca son kare indirilip çizilir.
  // - Normal akışta önce ilk + son kare gelir (ilk kare hemen çizilir), kalan 72 kare
  //   tarayıcı boştayken küçük dilimler hâlinde arka planda yüklenir.
  useEffect(() => {
    let cancelled = false
    const last = HERO_FRAME_COUNT - 1

    // Dar ekranlarda 780px kareler inisin: 74 kare ~4 MB yerine ~1 MB.
    // Kare sayısı değişmediği için geçiş aynı akıcılıkta kalır; kare zaten
    // beyaz degrade bir örtünün altında olduğu için çözünürlük farkı fark edilmez.
    const small = window.matchMedia("(max-width: 768px)").matches

    // 780px kareler CDN'de yoksa (henüz yüklenmediyse) sessizce 1920px'e döner.
    // Böylece kod ile görsel yüklemesinin sırası önemsizleşir; hero hiçbir
    // durumda boş kalmaz.
    const withFallback = (img: HTMLImageElement, i: number) => {
      if (!small) return
      let fellBack = false
      img.onerror = () => {
        if (fellBack) return
        fellBack = true
        img.src = heroFramePath(i, false)
      }
    }

    // Atlama modu: animasyon oynamayacaksa yalnızca sonucu (son kare) indir
    if (playedOnce.has("hero") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const img = new Image()
      img.decoding = "async"
      withFallback(img, HERO_FRAME_COUNT)
      img.src = heroFramePath(HERO_FRAME_COUNT, small)
      img.onload = () => {
        if (cancelled) return
        draw(last) // doğrudan sonuç: düzgün gülüş
        setFinalOnly(true)
      }
      const imgs: HTMLImageElement[] = []
      imgs[last] = img
      imagesRef.current = imgs
      return () => {
        cancelled = true
      }
    }

    // Normal akış
    let loaded = 0
    const imgs: HTMLImageElement[] = new Array(HERO_FRAME_COUNT)
    const loadFrame = (i: number) => {
      const img = new Image()
      img.decoding = "async"
      withFallback(img, i + 1)
      img.src = heroFramePath(i + 1, small)
      img.onload = () => {
        if (cancelled) return
        loaded += 1
        if (i === 0) draw(0) // ilk kareyi hemen göster
        if (loaded === HERO_FRAME_COUNT) setReady(true)
      }
      imgs[i] = img
    }
    imagesRef.current = imgs
    loadFrame(0) // ilk kare — anında görünür
    loadFrame(last) // son kare — animasyonun hedefi

    // Ara kareleri boşta kalınan zamanlarda parça parça yükle
    const queue: number[] = []
    for (let i = 1; i < last; i++) queue.push(i)
    const CHUNK = 8 // her dilimde başlatılacak indirme sayısı
    let idleId = 0
    let timerId = 0
    const pump = () => {
      if (cancelled) return
      for (let n = 0; n < CHUNK && queue.length > 0; n++) loadFrame(queue.shift()!)
      if (queue.length > 0) schedule()
    }
    const schedule = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(pump)
      } else {
        timerId = window.setTimeout(pump, 40) // Safari vb. için küçük dilimli geri dönüş
      }
    }
    schedule()

    return () => {
      cancelled = true
      if (idleId) window.cancelIdleCallback?.(idleId)
      if (timerId) window.clearTimeout(timerId)
    }
  }, [])

  // Yeniden boyutlandırmada mevcut kareyi tekrar çiz
  useEffect(() => {
    const onResize = () => draw(frameRef.current)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  // Hazır + tetiklenince bir kez oynat
  useEffect(() => {
    if (!play) return
    if (finalOnly) {
      draw(HERO_FRAME_COUNT - 1) // atlama modu: son kare zaten çizili, sadece tamamlandı bildir
      onComplete?.()
      return
    }
    if (!ready) return
    if (playedOnce.has("hero") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      draw(HERO_FRAME_COUNT - 1) // güvence: efekt yeniden çalışırsa direkt sonuç: düzgün gülüş
      onComplete?.()
      return
    }
    playedOnce.mark("hero") // animasyon başladı; geri dönünce tekrar oynamasın
    let raf = 0
    let done = false
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / PLAY_DURATION)
      draw(Math.round(t * (HERO_FRAME_COUNT - 1)))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else if (!done) {
        done = true
        onComplete?.()
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [play, ready, finalOnly, onComplete])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 -z-20 h-full w-full"
    />
  )
}
