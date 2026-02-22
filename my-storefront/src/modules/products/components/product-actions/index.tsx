"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"
import { useRouter } from "next/navigation"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const countryCode = useParams().countryCode as string

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  //check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const value = isValidVariant ? selectedVariant?.id : null

    if (params.get("v_id") === value) {
      return
    }

    if (value) {
      params.set("v_id", value)
    } else {
      params.delete("v_id")
    }

    router.replace(pathname + "?" + params.toString())
  }, [selectedVariant, isValidVariant])

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    try {
      await addToCart({
        variantId: selectedVariant.id,
        quantity: quantity,
        countryCode,
      })
      // Optional: Add toast success here if UI library supports it
      // alert("Ürün sepete eklendi!") 
    } catch (e: any) {
      alert("Ürün sepete eklenirken bir hata oluştu: " + e.message)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <>
      <div
        className="bg-white p-6 lg:p-8 rounded-2xl border border-input-border shadow-sm flex flex-col gap-6"
        ref={actionsRef}
      >
        {/* Variant Options */}
        {(product.variants?.length ?? 0) > 1 && (
          <div className="flex flex-col gap-4">
            {(product.options || []).map((option) => {
              return (
                <div key={option.id}>
                  <OptionSelect
                    option={option}
                    current={options[option.id]}
                    updateOption={setOptionValue}
                    title={option.title ?? ""}
                    data-testid="product-options"
                    disabled={!!disabled || isAdding}
                  />
                </div>
              )
            })}
          </div>
        )}

        {/* Quantity and Price */}
        <div className="flex items-end justify-between">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">
              Miktar
            </label>
            <div className="flex items-center rounded-xl bg-surface-off border border-input-border shadow-sm w-40">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 text-text-muted hover:text-primary transition-colors"
                disabled={quantity <= 1}
              >
                <span className="material-symbols-outlined text-sm">
                  remove
                </span>
              </button>
              <input
                className="w-full text-center border-none bg-transparent p-0 font-bold text-lg text-text-main focus:ring-0"
                type="number"
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value)
                  if (!isNaN(val) && val > 0) setQuantity(val)
                }}
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 text-text-muted hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-text-muted mb-1">Toplam Tutar</p>
            <ProductPrice product={product} variant={selectedVariant} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleAddToCart}
            disabled={
              !inStock ||
              !selectedVariant ||
              !!disabled ||
              isAdding ||
              !isValidVariant
            }
            className="flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-4 px-6 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="add-product-button"
          >
            {isAdding ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <span className="material-symbols-outlined">shopping_cart</span>
                {!selectedVariant && !options
                  ? "Varyant Seçin"
                  : !inStock || !isValidVariant
                    ? "Stokta Yok"
                    : "Sepete Ekle"}
              </>
            )}
          </button>
          <button className="flex-1 bg-transparent border border-input-border hover:border-primary text-text-main hover:text-primary font-medium py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 text-lg">
            <span className="material-symbols-outlined">request_quote</span>
            Teklif Al
          </button>
        </div>

        {/* Free Shipping Note */}
        <p className="text-xs text-center text-text-muted flex items-center justify-center gap-1">
          <span className="material-symbols-outlined text-sm">
            local_shipping
          </span>
          100kg+ siparişlerde ücretsiz kargo.
        </p>
      </div>

      <MobileActions
        product={product}
        variant={selectedVariant}
        options={options}
        updateOptions={setOptionValue}
        inStock={inStock}
        handleAddToCart={handleAddToCart}
        isAdding={isAdding}
        show={!inView}
        optionsDisabled={!!disabled || isAdding}
      />
    </>
  )
}
