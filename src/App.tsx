import { Routes, Route } from "react-router-dom"
import { Layout } from "@/components/Layout"
import { Home } from "@/pages/Home"
import { Hakkimda } from "@/pages/Hakkimda"
import { Tedaviler } from "@/pages/Tedaviler"
import { TedaviDetay } from "@/pages/TedaviDetay"
import { Blog } from "@/pages/Blog"
import { BlogYazi } from "@/pages/BlogYazi"
import { SSS } from "@/pages/SSS"
import { Iletisim } from "@/pages/Iletisim"
import { NotFound } from "@/pages/NotFound"

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/hakkimda" element={<Hakkimda />} />
        <Route path="/tedaviler" element={<Tedaviler />} />
        <Route path="/tedaviler/:slug" element={<TedaviDetay />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogYazi />} />
        <Route path="/sss" element={<SSS />} />
        <Route path="/iletisim" element={<Iletisim />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
