import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import { Layout } from "@/components/Layout"
// Ana sayfa TEMBEL DEĞİL: ziyaretlerin çoğu buraya düşüyor ve sinematik hero'nun
// ilk boyamada hazır olması gerekiyor; ayrı parçaya alsak kısa bir boşluk oluşurdu.
import { Home } from "@/pages/Home"

// Diğer sayfalar ayrı parçalara bölünür — ana sayfaya gelen ziyaretçi
// girmeyeceği sayfaların kodunu indirmez.
const Hakkimda = lazy(() => import("@/pages/Hakkimda").then((m) => ({ default: m.Hakkimda })))
const Tedaviler = lazy(() => import("@/pages/Tedaviler").then((m) => ({ default: m.Tedaviler })))
const TedaviDetay = lazy(() => import("@/pages/TedaviDetay").then((m) => ({ default: m.TedaviDetay })))
const Blog = lazy(() => import("@/pages/Blog").then((m) => ({ default: m.Blog })))
const BlogYazi = lazy(() => import("@/pages/BlogYazi").then((m) => ({ default: m.BlogYazi })))
const SSS = lazy(() => import("@/pages/SSS").then((m) => ({ default: m.SSS })))
const Iletisim = lazy(() => import("@/pages/Iletisim").then((m) => ({ default: m.Iletisim })))
const NotFound = lazy(() => import("@/pages/NotFound").then((m) => ({ default: m.NotFound })))

// Parça inerken gösterilen boşluk: spinner YOK. Ekranın yüksekliğini koruyan sessiz
// bir alan — böylece sayfa zıplamaz ve kullanıcı "yükleniyor" gürültüsü görmez.
function RouteFallback() {
  return <div className="min-h-svh" aria-hidden="true" />
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/hakkimda"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Hakkimda />
            </Suspense>
          }
        />
        <Route
          path="/tedaviler"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Tedaviler />
            </Suspense>
          }
        />
        <Route
          path="/tedaviler/:slug"
          element={
            <Suspense fallback={<RouteFallback />}>
              <TedaviDetay />
            </Suspense>
          }
        />
        <Route
          path="/blog"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Blog />
            </Suspense>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <Suspense fallback={<RouteFallback />}>
              <BlogYazi />
            </Suspense>
          }
        />
        <Route
          path="/sss"
          element={
            <Suspense fallback={<RouteFallback />}>
              <SSS />
            </Suspense>
          }
        />
        <Route
          path="/iletisim"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Iletisim />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<RouteFallback />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
