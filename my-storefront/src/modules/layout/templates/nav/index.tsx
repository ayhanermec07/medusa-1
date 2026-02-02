import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 z-50 group">
      <header className="bg-background-cream/95 backdrop-blur-md border-b border-[#e8e4dc] transition-all duration-300">
        <div className="flex justify-center w-full px-4 md:px-10 py-6 lg:py-8">
          <div className="flex items-center justify-between w-full max-w-[1340px]">
            {/* Logo Area */}
            <div className="flex items-center gap-4 lg:gap-8 flex-1">
              <LocalizedClientLink
                href="/"
                className="flex items-center gap-3 text-primary hover:opacity-90 transition-opacity"
                data-testid="nav-store-link"
              >
                <span className="material-symbols-outlined text-5xl drop-shadow-sm">
                  local_florist
                </span>
                <div className="flex flex-col">
                  <h1 className="text-text-main text-3xl font-black tracking-tight leading-none">
                    Efsane
                  </h1>
                  <h2 className="text-text-muted text-lg font-medium tracking-wide leading-none -mt-1">
                    Baharat
                  </h2>
                </div>
              </LocalizedClientLink>

              {/* Search Bar (Desktop) */}
              <div className="hidden md:flex flex-1 max-w-md ml-8">
                <div className="flex w-full items-center rounded-xl bg-white border border-[#e0dad2] h-14 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-sm">
                  <div className="pl-5 flex items-center justify-center text-text-muted">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input
                    className="w-full bg-transparent border-none focus:ring-0 text-text-main placeholder:text-text-muted/70 h-full px-4 text-base focus:outline-none"
                    placeholder="Baharat, bitki veya karışım arayın..."
                  />
                </div>
              </div>
            </div>

            {/* Navigation & Actions */}
            <div className="flex items-center gap-6 lg:gap-10 justify-end">
              <nav className="hidden lg:flex items-center gap-8">
                <LocalizedClientLink
                  href="/store"
                  className="text-base font-bold text-text-main hover:text-primary transition-colors"
                >
                  Ürünler
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/hakkimizda"
                  className="text-base font-bold text-text-main hover:text-primary transition-colors"
                >
                  Hakkımızda
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/b2b"
                  className="text-base font-bold text-text-main hover:text-primary transition-colors"
                >
                  Toptan Satış
                </LocalizedClientLink>
              </nav>

              <div className="flex gap-4 items-center">
                <LocalizedClientLink
                  href="/account"
                  className="hidden sm:flex items-center justify-center h-12 px-6 rounded-xl bg-primary text-white text-base font-bold shadow-soft hover:bg-primary-dark transition-all transform hover:-translate-y-0.5"
                >
                  <span>Bayi Girişi</span>
                </LocalizedClientLink>

                <Suspense
                  fallback={
                    <LocalizedClientLink
                      className="flex items-center justify-center h-12 w-12 rounded-xl bg-white border border-[#e0dad2] text-text-main hover:bg-[#fcfbf9] hover:border-primary/50 transition-colors relative shadow-sm group"
                      href="/cart"
                      data-testid="nav-cart-link"
                    >
                      <span className="material-symbols-outlined text-[24px] group-hover:text-primary transition-colors">
                        shopping_bag
                      </span>
                    </LocalizedClientLink>
                  }
                >
                  <CartButton />
                </Suspense>

                {/* Mobile Menu Trigger (SideMenu) */}
                <div className="lg:hidden">
                  <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
