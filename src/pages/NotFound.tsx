import { usePageMeta } from "@/lib/seo"
import { staticPageMeta } from "@/data/pageMeta"
import { PagePlaceholder } from "@/components/PagePlaceholder"

export function NotFound() {
  usePageMeta({ ...staticPageMeta["/404"], path: "/404", noindex: true })
  return <PagePlaceholder title="Sayfa bulunamadı" note="Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir." />
}
