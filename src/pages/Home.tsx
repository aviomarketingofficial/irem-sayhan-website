import { useOutletContext } from "react-router-dom"
import { usePageMeta } from "@/lib/seo"
import { staticPageMeta } from "@/data/pageMeta"
import { Hero } from "@/components/Hero"
import { Stats } from "@/components/Stats"
import { WhyChooseUs } from "@/components/WhyChooseUs"
import { Quiz } from "@/components/Quiz"
import { OurTreatments } from "@/components/OurTreatments"
import { Process } from "@/components/Process"
import { Clinic } from "@/components/Clinic"
import { HomeFaq } from "@/components/HomeFaq"
import { Visit } from "@/components/Visit"
import { FinalCta } from "@/components/FinalCta"

type LayoutCtx = { risen: boolean }

export function Home() {
  const { risen } = useOutletContext<LayoutCtx>()
  usePageMeta({ ...staticPageMeta["/"], path: "/" })
  return (
    <>
      <Hero revealed={risen} />
      <Stats />
      <Quiz />
      <OurTreatments />
      <WhyChooseUs />
      <Clinic />
      <Process />
      <HomeFaq />
      <Visit />
      <FinalCta />
    </>
  )
}
