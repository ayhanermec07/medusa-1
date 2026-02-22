"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

import SortProducts, { SortOptions } from "./sort-products"

import { HttpTypes } from "@medusajs/types"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  "data-testid"?: string
  categories?: HttpTypes.StoreProductCategory[]
}

const RefinementList = ({
  sortBy,
  "data-testid": dataTestId,
  categories,
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

  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    // Currently PaginatedProducts only supports single category filtering via props, 
    // but we can pass it as query param.
    // If we want multiple, we need to handle arrays. 
    // For now, let's assume single selection for simplicity or use the query param approach.
    // Ideally, we redirect to /categories/[handle] OR we use ?category_id=...

    // If the requirement is "filters", usually ?category_id=... 
    // Let's toggle it.

    const current = searchParams.get("category_id")
    if (current === id) {
      // Remove
      const params = new URLSearchParams(searchParams)
      params.delete("category_id")
      router.push(`${pathname}?${params.toString()}`)
    } else {
      setQueryParams("category_id", id)
    }
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
            <button
              onClick={() => router.push(pathname)}
              className="text-xs text-primary font-medium hover:underline bg-primary/5 px-2 py-1 rounded"
            >
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
            {categories?.map((c) => (
              <label key={c.id} className="flex items-center gap-3 cursor-pointer group p-1 hover:bg-background-cream rounded transition-colors">
                <input
                  checked={searchParams.get("category_id") === c.id}
                  onChange={(e) => handleCategoryChange(e, c.id)}
                  className="rounded border-stone-300 text-primary focus:ring-primary bg-white"
                  type="checkbox"
                />
                <span className="text-sm text-stone-600 group-hover:text-primary transition-colors">
                  {c.name}
                </span>
              </label>
            ))}
          </div>

          {/* Form - Geliştirme Aşamasında */}
          {/* 
          <div className="flex flex-col gap-3">
            ...
          </div> 
          */}

          {/* Menşei - Geliştirme Aşamasında */}
          {/* 
          <div className="flex flex-col gap-3">
             ...
          </div> 
          */}

          {/* Fiyat Aralığı - Geliştirme Aşamasında */}
          {/* 
          <div className="flex flex-col gap-3">
             ...
          </div> 
          */}

          {/* Sertifikalar - Geliştirme Aşamasında */}
          {/* 
          <div className="flex flex-col gap-3">
             ...
          </div> 
          */}

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
