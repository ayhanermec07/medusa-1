import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="bg-background-cream min-h-screen">
      {/* Promo Banner */}
      <div className="bg-primary/10 py-2 text-center text-xs font-medium text-primary">
        🚚 2.500₺ üzeri toptan siparişlerde ücretsiz kargo
      </div>

      {/* Category Navigation */}
      <div className="border-t border-b border-stone-200 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <nav className="flex items-center gap-8 h-12 overflow-x-auto">
            <LocalizedClientLink
              href="/store"
              className="text-sm font-medium text-primary border-b-2 border-primary h-full flex items-center px-1 whitespace-nowrap"
            >
              Tüm Ürünler
            </LocalizedClientLink>
            <a
              href="#"
              className="text-sm font-medium text-stone-500 hover:text-primary transition-colors whitespace-nowrap"
            >
              Tane Baharatlar
            </a>
            <a
              href="#"
              className="text-sm font-medium text-stone-500 hover:text-primary transition-colors whitespace-nowrap"
            >
              Toz Baharatlar
            </a>
            <a
              href="#"
              className="text-sm font-medium text-stone-500 hover:text-primary transition-colors whitespace-nowrap"
            >
              Özel Karışımlar
            </a>
            <a
              href="#"
              className="text-sm font-medium text-stone-500 hover:text-primary transition-colors whitespace-nowrap"
            >
              Organik Serisi
            </a>
            <div className="ml-auto hidden lg:flex items-center gap-2 text-xs font-medium text-accent whitespace-nowrap">
              <span className="material-symbols-outlined text-sm">
                verified
              </span>
              %100 Doğal Ürün Garantisi
            </div>
          </nav>
        </div>
      </div>

      <main className="max-w-[1440px] mx-auto w-full px-4 lg:px-8 py-8 flex gap-10">
        <RefinementList sortBy={sort} />

        <section className="flex flex-col flex-1 gap-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <LocalizedClientLink
                  href="/"
                  className="inline-flex items-center text-sm font-medium text-stone-500 hover:text-primary"
                >
                  Anasayfa
                </LocalizedClientLink>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-stone-500 text-lg">
                    chevron_right
                  </span>
                  <span className="ms-1 text-sm font-medium text-text-main md:ms-2">
                    Katalog
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Page Title */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1
                className="text-3xl md:text-4xl font-bold text-text-main tracking-tight flex items-center gap-3"
                data-testid="store-page-title"
              >
                <span className="w-2 h-8 bg-primary rounded-full inline-block"></span>
                Ürün Kataloğu
              </h1>
              <p className="text-stone-500 mt-2 ml-5">
                Çiftlikten doğrudan tedarik edilen birinci sınıf baharatlar.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex h-11 items-center rounded-xl bg-white p-1 border border-stone-200">
                <button className="h-full px-3 rounded-lg bg-stone-100 shadow-sm text-primary">
                  <span className="material-symbols-outlined text-[20px] leading-none">
                    grid_view
                  </span>
                </button>
                <button className="h-full px-3 rounded-lg text-stone-500 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px] leading-none">
                    view_list
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium shadow-sm">
              <span>Stokta Var</span>
              <button className="ml-1 hover:text-green-700 hover:bg-green-100 rounded-full w-5 h-5 flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-[14px]">
                  close
                </span>
              </button>
            </div>
            <button className="text-sm text-stone-500 hover:text-primary underline decoration-dotted ml-2">
              Tüm filtreleri temizle
            </button>
          </div>

          {/* Products */}
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              countryCode={countryCode}
            />
          </Suspense>
        </section>
      </main>
    </div>
  )
}

export default StoreTemplate
