import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info" className="flex flex-col gap-6">
      {/* Collection Link */}
      {product.collection && (
        <LocalizedClientLink
          href={`/collections/${product.collection.handle}`}
          className="text-sm text-text-muted hover:text-primary transition-colors uppercase tracking-wider font-medium"
        >
          {product.collection.title}
        </LocalizedClientLink>
      )}

      {/* Title */}
      <h1
        className="font-display text-4xl md:text-5xl font-bold text-text-main leading-tight"
        data-testid="product-title"
      >
        {product.title}
      </h1>

      {/* Rating & Stock */}
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1 text-yellow-500">
          <span className="material-symbols-outlined text-lg">star</span>
          <span className="font-bold text-text-main">4.8</span>
        </div>
        <span className="w-1 h-1 rounded-full bg-text-muted"></span>
        <a
          href="#reviews"
          className="text-text-muted hover:text-primary transition-colors underline decoration-dotted"
        >
          124 Değerlendirme
        </a>
        <span className="w-1 h-1 rounded-full bg-text-muted"></span>
        <span className="text-accent font-medium flex items-center gap-1">
          <span className="material-symbols-outlined text-lg">check</span>
          Stokta
        </span>
      </div>

      {/* Description */}
      {product.description && (
        <p
          className="text-lg text-text-main/80 leading-relaxed font-light whitespace-pre-line"
          data-testid="product-description"
        >
          {product.description}
        </p>
      )}
    </div>
  )
}

export default ProductInfo
