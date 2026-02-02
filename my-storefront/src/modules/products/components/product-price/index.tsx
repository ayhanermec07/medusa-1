import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse rounded" />
  }

  return (
    <div className="flex flex-col items-end">
      <span
        className={`text-3xl md:text-4xl font-display font-bold ${selectedPrice.price_type === "sale" ? "text-primary" : "text-text-main"
          }`}
        data-testid="product-price"
        data-value={selectedPrice.calculated_price_number}
      >
        {!variant && (
          <span className="text-sm font-normal text-text-muted mr-1">
            en düşük
          </span>
        )}
        {selectedPrice.calculated_price}
      </span>
      {selectedPrice.price_type === "sale" && (
        <div className="flex items-center gap-2 mt-1">
          <span
            className="line-through text-text-muted text-lg"
            data-testid="original-product-price"
            data-value={selectedPrice.original_price_number}
          >
            {selectedPrice.original_price}
          </span>
          <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded">
            -%{selectedPrice.percentage_diff}
          </span>
        </div>
      )}
    </div>
  )
}
