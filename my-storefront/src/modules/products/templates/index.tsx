import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <div className="bg-background-cream min-h-screen">
      <main className="w-full max-w-7xl mx-auto px-6 md:px-12 py-10">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 mb-8 text-sm text-text-muted">
          <LocalizedClientLink
            href="/"
            className="hover:text-primary transition-colors"
          >
            Anasayfa
          </LocalizedClientLink>
          <span className="material-symbols-outlined text-xs">
            chevron_right
          </span>
          <LocalizedClientLink
            href="/store"
            className="hover:text-primary transition-colors"
          >
            Baharatlar
          </LocalizedClientLink>
          <span className="material-symbols-outlined text-xs">
            chevron_right
          </span>
          <span className="text-primary font-medium">{product.title}</span>
        </nav>

        {/* Main Product Section */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20"
          data-testid="product-container"
        >
          {/* Image Gallery */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <ImageGallery images={images} />
          </div>

          {/* Product Info & Actions */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <ProductInfo product={product} />

            {/* Product Actions */}
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>

            {/* Product Details Grid */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm pt-4 border-t border-input-border">
              {product.origin_country && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">Menşei</span>
                    <span className="font-medium text-text-main">
                      {product.origin_country}
                    </span>
                  </div>
                </>
              )}
              {product.material && (
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Malzeme</span>
                  <span className="font-medium text-text-main">
                    {product.material}
                  </span>
                </div>
              )}
              {product.weight && (
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Ağırlık</span>
                  <span className="font-medium text-text-main">
                    {product.weight}g
                  </span>
                </div>
              )}
              {product.type && (
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Tip</span>
                  <span className="font-medium text-text-main">
                    {product.type.value}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mb-24">
          <ProductTabs product={product} />
        </div>

        {/* Related Products */}
        <div className="mb-20" data-testid="related-products-container">
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </div>
      </main>
    </div>
  )
}

export default ProductTemplate
