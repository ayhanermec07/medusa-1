"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

import SortProducts, { SortOptions } from "./sort-products"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  "data-testid"?: string
}

const RefinementList = ({
  sortBy,
  "data-testid": dataTestId,
}: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  return (
    <aside className="hidden lg:flex w-72 flex-col shrink-0 gap-8 h-fit sticky top-44">
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <h3 className="font-bold text-lg text-text-main flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">
                tune
              </span>
              Filtreler
            </h3>
            <button className="text-xs text-primary font-medium hover:underline bg-primary/5 px-2 py-1 rounded">
              Temizle
            </button>
          </div>

          {/* Kategori */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-text-main mb-1">
              <span className="material-symbols-outlined text-[20px] text-accent">
                category
              </span>
              <span className="font-semibold text-sm">Kategori</span>
            </div>
            <label className="flex items-center gap-3 cursor-pointer group p-1 hover:bg-background-cream rounded transition-colors">
              <input
                defaultChecked
                className="rounded border-stone-300 text-primary focus:ring-primary bg-white"
                type="checkbox"
              />
              <span className="text-sm text-stone-600 group-hover:text-primary transition-colors">
                Tane Baharatlar (84)
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group p-1 hover:bg-background-cream rounded transition-colors">
              <input
                className="rounded border-stone-300 text-primary focus:ring-primary bg-white"
                type="checkbox"
              />
              <span className="text-sm text-stone-600 group-hover:text-primary transition-colors">
                Toz Baharatlar (45)
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group p-1 hover:bg-background-cream rounded transition-colors">
              <input
                className="rounded border-stone-300 text-primary focus:ring-primary bg-white"
                type="checkbox"
              />
              <span className="text-sm text-stone-600 group-hover:text-primary transition-colors">
                Özel Karışımlar (12)
              </span>
            </label>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-text-main mb-1">
              <span className="material-symbols-outlined text-[20px] text-secondary">
                grain
              </span>
              <span className="font-semibold text-sm">Form</span>
            </div>
            <label className="flex items-center gap-3 cursor-pointer group p-1 hover:bg-background-cream rounded transition-colors">
              <input
                className="rounded border-stone-300 text-primary focus:ring-primary bg-white"
                type="checkbox"
              />
              <span className="text-sm text-stone-600 group-hover:text-primary transition-colors">
                Bütün / Tane
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group p-1 hover:bg-background-cream rounded transition-colors">
              <input
                className="rounded border-stone-300 text-primary focus:ring-primary bg-white"
                type="checkbox"
              />
              <span className="text-sm text-stone-600 group-hover:text-primary transition-colors">
                Kırılmış / Pul
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group p-1 hover:bg-background-cream rounded transition-colors">
              <input
                className="rounded border-stone-300 text-primary focus:ring-primary bg-white"
                type="checkbox"
              />
              <span className="text-sm text-stone-600 group-hover:text-primary transition-colors">
                İnce Toz
              </span>
            </label>
          </div>

          {/* Menşei */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-text-main mb-1">
              <span className="material-symbols-outlined text-[20px] text-accent">
                public
              </span>
              <span className="font-semibold text-sm">Menşei</span>
            </div>
            <label className="flex items-center gap-3 cursor-pointer group p-1 hover:bg-background-cream rounded transition-colors">
              <input
                className="rounded border-stone-300 text-primary focus:ring-primary bg-white"
                type="checkbox"
              />
              <span className="text-sm text-stone-600 group-hover:text-primary transition-colors">
                Hindistan
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group p-1 hover:bg-background-cream rounded transition-colors">
              <input
                className="rounded border-stone-300 text-primary focus:ring-primary bg-white"
                type="checkbox"
              />
              <span className="text-sm text-stone-600 group-hover:text-primary transition-colors">
                Vietnam
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group p-1 hover:bg-background-cream rounded transition-colors">
              <input
                className="rounded border-stone-300 text-primary focus:ring-primary bg-white"
                type="checkbox"
              />
              <span className="text-sm text-stone-600 group-hover:text-primary transition-colors">
                Türkiye
              </span>
            </label>
          </div>

          {/* Fiyat Aralığı */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-text-main mb-1">
              <span className="material-symbols-outlined text-[20px] text-secondary">
                attach_money
              </span>
              <span className="font-semibold text-sm">Fiyat Aralığı (kg)</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="w-full rounded-lg border-stone-300 bg-background-cream text-sm py-2 focus:ring-primary focus:border-primary"
                placeholder="Min"
                type="number"
              />
              <span className="text-stone-500">-</span>
              <input
                className="w-full rounded-lg border-stone-300 bg-background-cream text-sm py-2 focus:ring-primary focus:border-primary"
                placeholder="Maks"
                type="number"
              />
            </div>
          </div>

          {/* Sertifikalar */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-text-main mb-1">
              <span className="material-symbols-outlined text-[20px] text-accent">
                verified
              </span>
              <span className="font-semibold text-sm">Sertifikalar</span>
            </div>
            <div className="flex flex-col gap-2">
              <label className="inline-flex items-center cursor-pointer p-1">
                <input type="checkbox" className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                <span className="ms-3 text-sm font-medium text-stone-600">
                  Organik Sertifikalı
                </span>
              </label>
              <label className="inline-flex items-center cursor-pointer p-1">
                <input type="checkbox" className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                <span className="ms-3 text-sm font-medium text-stone-600">
                  GDO&apos;suz
                </span>
              </label>
            </div>
          </div>

          {/* Sort - Desktop */}
          <div className="pt-4 border-t border-stone-200">
            <SortProducts
              sortBy={sortBy}
              setQueryParams={setQueryParams}
              data-testid={dataTestId}
            />
          </div>
        </div>
      </div>
    </aside>
  )
}

export default RefinementList
