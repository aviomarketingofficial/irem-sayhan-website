// Blog yazılarının tam içerikleri. Kaynak: src/data/blog-content/*.json
// Her dosya yazım hattında üretildi; slug, blog.ts'teki konu slug'ıyla eşleşir.
// İçerikler TEMBEL yüklenir: her yazı kendi küçük chunk'ı olur, ana pakete girmez.
// Not: paragraph/bullet stringleri "[metin](/mutlak/yol)" biçiminde markdown linki
// içerebilir; BlogYazi.tsx yalnızca "/" ile başlayan dahili yolları <Link>'e çevirir.
export type BlogSection = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export type BlogContent = {
  slug: string
  title: string
  metaDescription: string
  intro: string[]
  sections: BlogSection[]
  closing: string
}

const modules = import.meta.glob("./blog-content/*.json") as Record<
  string,
  () => Promise<{ default: BlogContent }>
>

// path ("./blog-content/<slug>.json") -> slug eşlemesi
const loaders: Record<string, () => Promise<{ default: BlogContent }>> = {}
for (const path in modules) {
  const slug = path.split("/").pop()!.replace(/\.json$/, "")
  loaders[slug] = modules[path]
}

export function hasBlogContent(slug: string | undefined): boolean {
  return Boolean(slug && loaders[slug])
}

export async function loadBlogContent(
  slug: string | undefined,
): Promise<BlogContent | undefined> {
  if (!slug) return undefined
  const loader = loaders[slug]
  if (!loader) return undefined
  return (await loader()).default
}
