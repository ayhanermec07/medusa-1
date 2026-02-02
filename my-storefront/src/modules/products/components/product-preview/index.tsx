import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:border-primary/40 transition-all duration-300 flex flex-col"
    >
      <div data-testid="product-wrapper" className="flex flex-col h-full">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-background-cream">
          <div className="w-full h-full group-hover:scale-110 transition-transform duration-700">
            <Thumbnail
              thumbnail={product.thumbnail}
              images={product.images}
              size="full"
              isFeatured={isFeatured}
            />
          </div>
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {isFeatured && (
              <span className="bg-secondary text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-lg shadow-sm tracking-wide">
                Çok Satan
              </span>
            )}
          </div>
          {/* Favorite Button */}
          <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-stone-500 hover:bg-primary hover:text-white transition-colors opacity-0 group-hover:opacity-100 shadow-sm">
            <span className="material-symbols-outlined text-[18px]">
              favorite
            </span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1 gap-3">
          <div>
            <h3
              className="font-bold text-base text-text-main leading-tight group-hover:text-primary transition-colors line-clamp-2"
              data-testid="product-title"
            >
              {product.title}
            </h3>
            {product.subtitle && (
              <p className="text-xs text-stone-500 mt-1">{product.subtitle}</p>
            )}
          </div>

          <div className="mt-auto pt-3 border-t border-dashed border-stone-200">
            <div className="flex items-baseline gap-1 mb-3">
              {cheapestPrice && (
                <>
                  <span className="text-xl font-bold text-primary">
                    <PreviewPrice price={cheapestPrice} />
                  </span>
                  <span className="text-sm text-stone-500">/ kg</span>
                </>
              )}
            </div>
            <button className="w-full flex items-center justify-center gap-2 bg-text-main hover:bg-primary text-white font-bold py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg hover:shadow-primary/20 text-sm">
              <span className="material-symbols-outlined text-[18px]">
                add_shopping_cart
              </span>
              <span>Sepete Ekle</span>
            </button>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
