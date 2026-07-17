// İlişkili içerik eşleştirmeleri: tedavi, blog ve SSS arasında bağlantı kurar.
// Yalnızca veri ve yardımcı fonksiyonlar içerir, UI yoktur.
import { treatments, type Treatment } from "@/data/treatments"
import { blogTopics, type BlogTopic } from "@/data/blog"
import { faqs, type Faq } from "@/data/faqs"

// Her tedavi slug'i için önerilen diğer tedavi slug'leri.
export const RECOMMENDED_TREATMENTS: Record<string, string[]> = {
  "hareketli-ortodonti": ["braket-tedavisi", "seffaf-plak"],
  "seffaf-plak": ["braket-tedavisi", "lingual-ortodonti", "damon-braket"],
  "braket-tedavisi": ["seffaf-plak", "damon-braket", "pekistirme"],
  "damon-braket": ["braket-tedavisi", "seffaf-plak"],
  "lingual-ortodonti": ["seffaf-plak", "braket-tedavisi"],
  "cerrahi-ortodonti": ["braket-tedavisi", "lingual-ortodonti"],
  "pekistirme": ["braket-tedavisi", "seffaf-plak"],
}

// Tedavi slug'inin karşılık geldiği SSS kategorisi.
export const TREATMENT_FAQ_CATEGORY: Record<string, string> = {
  "hareketli-ortodonti": "Çocuk",
  "seffaf-plak": "Şeffaf Plak",
  "braket-tedavisi": "Braket",
  "damon-braket": "Braket",
  "lingual-ortodonti": "Braket",
  "cerrahi-ortodonti": "Cerrahi",
  "pekistirme": "Süreç",
}

// Bir tedavi slug'i için önerilen diğer tedavileri döndürür.
export function recommendedTreatments(slug: string): Treatment[] {
  const wanted = RECOMMENDED_TREATMENTS[slug] ?? []
  return wanted
    .map((s) => treatments.find((t) => t.slug === s))
    .filter((t): t is Treatment => Boolean(t))
}

// Bir tedaviyle ilişkili blog yazılarını döndürür.
export function relatedBlogForTreatment(slug: string, n = 4): BlogTopic[] {
  return blogTopics.filter((t) => t.relatedTreatment === slug).slice(0, n)
}

// Bir tedaviyle ilişkili SSS'leri döndürür.
export function relatedFaqsForTreatment(slug: string, n = 4): Faq[] {
  const category = TREATMENT_FAQ_CATEGORY[slug]
  if (!category) return []
  return faqs.filter((f) => f.category === category).slice(0, n)
}

// Türkçe duyarlı kelime ayıklama: 3+ harfli kelimeleri küçük harfe çevirir.
const STOP_WORDS = new Set([
  "nedir",
  "nasil",
  "nasıl",
  "için",
  "icin",
  "olur",
  "olur?",
  "kadar",
  "hangi",
  "hangisi",
  "daha",
  "yapilir",
  "yapılır",
  "varken",
  "neden",
  "etkiler",
  "süreci",
  "sureci",
])

function words(text: string): Set<string> {
  return new Set(
    text
      .toLocaleLowerCase("tr-TR")
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .split(/\s+/)
      .filter((w) => w.length >= 3 && !STOP_WORDS.has(w)),
  )
}

function shareWord(a: Set<string>, b: Set<string>): boolean {
  for (const w of a) if (b.has(w)) return true
  return false
}

// Aynı tedaviye ait ya da başlık/anahtar kelimesi ortak olan diğer blog yazıları.
export function relatedBlogForBlog(slug: string, n = 3): BlogTopic[] {
  const current = blogTopics.find((t) => t.slug === slug)
  if (!current) return []
  const currentWords = words(`${current.title} ${current.keyword}`)
  const scored = blogTopics
    .filter((t) => t.slug !== slug)
    .map((t) => {
      const sameTreatment =
        Boolean(current.relatedTreatment) &&
        t.relatedTreatment === current.relatedTreatment
      const overlap = shareWord(words(`${t.title} ${t.keyword}`), currentWords)
      const score = (sameTreatment ? 2 : 0) + (overlap ? 1 : 0)
      return { topic: t, score }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
  return scored.slice(0, n).map((x) => x.topic)
}

// Bir blog yazısının ilgili tedavisine göre SSS'ler; yoksa ilk n "Genel" SSS.
export function relatedFaqsForBlog(slug: string, n = 3): Faq[] {
  const current = blogTopics.find((t) => t.slug === slug)
  const category = current
    ? TREATMENT_FAQ_CATEGORY[current.relatedTreatment]
    : undefined
  if (category) {
    const matches = faqs.filter((f) => f.category === category).slice(0, n)
    if (matches.length > 0) return matches
  }
  return faqs.filter((f) => f.category === "Genel").slice(0, n)
}

// Bir SSS kategorisine uygun blog yazıları (kategori-tedavi ters eşlemesi ya da kelime ortaklığı).
export function relatedBlogForFaqCategory(category: string, n = 3): BlogTopic[] {
  const slugsForCategory = Object.keys(TREATMENT_FAQ_CATEGORY).filter(
    (slug) => TREATMENT_FAQ_CATEGORY[slug] === category,
  )
  const byTreatment = blogTopics.filter((t) =>
    slugsForCategory.includes(t.relatedTreatment),
  )
  if (byTreatment.length > 0) return byTreatment.slice(0, n)
  const catWords = words(category)
  return blogTopics
    .filter((t) => shareWord(words(`${t.title} ${t.keyword}`), catWords))
    .slice(0, n)
}
