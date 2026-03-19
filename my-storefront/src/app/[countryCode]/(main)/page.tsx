import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import CampaignBanner from "@modules/home/components/campaign-banner"
import FeaturedCategories from "@modules/home/components/featured-categories"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Efsane Baharat - Şefler ve Gurmeler için Doğal Lezzetler",
  description:
    "Dünyanın en kaliteli baharatlarını toptan fiyatlarla keşfedin. Katkısız, taze ve doğrudan kaynağından.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <CampaignBanner />
      <FeaturedCategories />
      <div className="w-full flex justify-center px-4 md:px-10 py-16 lg:py-24 bg-white">
        <div className="w-full max-w-[1340px]">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-main tracking-tight mb-2">
                En Çok Satanlar
              </h2>
              <p className="text-text-muted text-lg">
                Profesyonel şeflerin favori seçimleri.
              </p>
            </div>
          </div>
          <ul className="flex flex-col gap-x-6">
            <FeaturedProducts collections={collections} region={region} />
          </ul>
        </div>
      </div>
    </>
  )
}
