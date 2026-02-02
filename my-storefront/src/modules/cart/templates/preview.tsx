"use client"

import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { convertToLocale } from "@lib/util/money"
import { clx } from "@medusajs/ui"

import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"
import Thumbnail from "@modules/products/components/thumbnail"

type ItemsTemplateProps = {
  cart: HttpTypes.StoreCart
}

const ItemsPreviewTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart.items
  const hasOverflow = items && items.length > 4

  return (
    <div
      className={clx("flex flex-col gap-6", {
        "overflow-y-auto max-h-[400px] pr-2": hasOverflow,
      })}
      data-testid="items-table"
    >
      {items
        ? items
          .sort((a, b) => {
            return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
          })
          .map((item) => (
            <div
              key={item.id}
              className="flex gap-4 items-start group"
              data-testid="cart-item"
            >
              <div className="w-20 h-20 rounded-xl bg-gray-100 flex-shrink-0 overflow-hidden relative border border-stone-200 group-hover:border-primary/30 transition-colors">
                <Thumbnail
                  thumbnail={item.thumbnail}
                  size="square"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4
                  className="text-sm font-bold text-text-main leading-tight"
                  data-testid="product-title"
                >
                  {item.product_title}
                </h4>
                {item.variant?.title && item.variant.title !== "Default" && (
                  <p className="text-xs text-stone-500 mt-1 font-medium bg-gray-100 w-fit px-2 py-0.5 rounded">
                    {item.variant.title}
                  </p>
                )}
                <div className="flex justify-between items-end mt-3">
                  <span
                    className="text-xs font-semibold text-stone-500"
                    data-testid="product-quantity"
                  >
                    x{item.quantity} Adet
                  </span>
                  <span
                    className="text-base font-bold text-text-main"
                    data-testid="product-price"
                  >
                    {convertToLocale({
                      amount: item.total ?? 0,
                      currency_code: cart.currency_code,
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))
        : repeat(3).map((i) => <SkeletonLineItem key={i} />)}
    </div>
  )
}

export default ItemsPreviewTemplate
