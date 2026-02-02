import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items

  return (
    <div className="flex flex-col gap-4">
      {items
        ? items
          .sort((a, b) => {
            return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
          })
          .map((item) => {
            return (
              <Item
                key={item.id}
                item={item}
                currencyCode={cart?.currency_code ?? "TRY"}
              />
            )
          })
        : repeat(3).map((i) => {
          return (
            <div
              key={i}
              className="bg-white border border-input-border rounded-xl p-5 shadow-sm"
            >
              <SkeletonLineItem />
            </div>
          )
        })}
    </div>
  )
}

export default ItemsTemplate
