import { usePageMeta } from "@/lib/seo"
import { staticPageMeta } from "@/data/pageMeta"
import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { blogTopics } from "@/data/blog"
import { cn } from "@/lib/utils"

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-4", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

export function Blog() {
  usePageMeta({ ...staticPageMeta["/blog"], path: "/blog" })
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return blogTopics
    return blogTopics.filter((topic) =>
      [topic.title, topic.keyword, topic.audience]
        .join(" ")
        .toLowerCase()
        .includes(q),
    )
  }, [query])

  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:pt-36">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-[#0b2545] sm:text-4xl">
          Blog
        </h1>
        <p className="mx-auto mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Diş teli, şeffaf plak, çocuk ortodontisi ve çene tedavileri hakkında merak
          ettiğiniz konuları sade bir dille anlatıyoruz. Aklınızdaki soruya yakın bir
          başlık seçin, okumaya başlayın.
        </p>
      </div>

      {/* Arama kutusu */}
      <div className="mx-auto mt-8 max-w-md">
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-muted-foreground">
            <SearchIcon />
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Konu ara"
            aria-label="Yazılarda ara"
            className="h-12 w-full rounded-full border border-border bg-background pl-12 pr-4 text-base text-[#0b2545] outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-3 focus:ring-primary/15"
          />
        </div>
      </div>

      {/* Kart grid */}
      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-base text-muted-foreground">
          Aramanıza uygun bir yazı bulamadık. Farklı bir kelime deneyebilirsiniz.
        </p>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((topic) => (
            <Link
              key={topic.slug}
              to={`/blog/${topic.slug}`}
              className="group flex flex-col rounded-3xl border border-border bg-background p-6 text-left shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/30"
            >
              <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {topic.keyword}
              </span>
              <h2 className="mt-4 text-lg font-semibold leading-snug text-[#0b2545]">
                {topic.title}
              </h2>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                {topic.audience}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Devamını oku
                <ArrowRight className="transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
