"use client"

import { HttpTypes } from "@medusajs/types"
import { updateLineItem } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import DeleteButton from "@modules/common/components/delete-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"
import ErrorMessage from "@modules/checkout/components/error-message"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(item.quantity)

  const changeQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return
    setError(null)
    setUpdating(true)
    setQuantity(newQuantity)

    await updateLineItem({
      lineId: item.id,
      quantity: newQuantity,
    })
      .catch((err) => {
        setQuantity(item.quantity)
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  const unitPrice = item.unit_price || 0
  const totalPrice = item.total || 0

  if (type === "preview") {
    // Preview mode için basit görünüm
    return (
      <div className="flex gap-4 items-start group" data-testid="cart-item">
        <div className="w-20 h-20 rounded-xl bg-gray-100 flex-shrink-0 overflow-hidden relative border border-stone-200">
          <Thumbnail
            thumbnail={item.thumbnail}
            size="square"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-text-main leading-tight" data-testid="product-title">
            {item.product_title}
          </h4>
          {item.variant?.title && item.variant.title !== "Default" && (
            <p className="text-xs text-stone-500 mt-1 font-medium bg-gray-100 w-fit px-2 py-0.5 rounded">
              {item.variant.title}
            </p>
          )}
          <div className="flex justify-between items-end mt-3">
            <span className="text-xs font-semibold text-stone-500" data-testid="product-quantity">
              x{item.quantity} Adet
            </span>
            <span className="text-base font-bold text-text-main" data-testid="product-price">
              {convertToLocale({
                amount: totalPrice,
                currency_code: currencyCode,
              })}
            </span>
          </div>
        </div>
      </div>
    )
  }

  // Full mode - kart görünümü
  return (
    <div
      className="bg-white border border-input-border rounded-xl p-5 shadow-sm flex flex-col sm:flex-row gap-6 relative group"
      data-testid="product-row"
    >
      {/* Product Image */}
      <LocalizedClientLink
        href={`/products/${item.product_handle}`}
        className="w-full sm:w-40 h-40 rounded-lg shrink-0 overflow-hidden border border-gray-100 shadow-inner block"
      >
        <Thumbnail
          thumbnail={item.thumbnail}
          images={item.variant?.product?.images}
          size="full"
          className="w-full h-full object-cover"
        />
      </LocalizedClientLink>

      {/* Product Info */}
      <div className="flex flex-col flex-1 gap-2">
        <div className="flex justify-between items-start pr-8">
          <LocalizedClientLink href={`/products/${item.product_handle}`}>
            <h3
              className="text-text-main font-bold text-xl leading-snug hover:text-primary transition-colors"
              data-testid="product-title"
            >
              {item.product_title}
            </h3>
          </LocalizedClientLink>

          {/* Delete Button */}
          <div className="absolute top-4 right-4">
            <DeleteButton
              id={item.id}
              data-testid="product-delete-button"
              className="text-text-muted hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50"
            >
              <span className="material-symbols-outlined text-[24px]">
                delete
              </span>
            </DeleteButton>
          </div>
        </div>

        {/* Variant */}
        {item.variant?.title && item.variant.title !== "Default" && (
          <span className="text-sm text-text-muted" data-testid="product-variant">
            {item.variant.title}
          </span>
        )}

        <div className="flex flex-col gap-4 mt-1">
          {/* Unit Price */}
          <div className="flex flex-col gap-0.5">
            <span className="text-text-muted text-xs font-semibold uppercase tracking-wider">
              Birim Fiyat
            </span>
            <span className="text-text-main text-base font-medium">
              {convertToLocale({
                amount: unitPrice,
                currency_code: currencyCode,
              })}
            </span>
          </div>

          {/* Quantity */}
          <div className="flex flex-col gap-1.5">
            <span className="text-text-muted text-xs font-semibold uppercase tracking-wider">
              Miktar
            </span>
            <div className="flex items-center border border-input-border rounded-lg w-fit bg-surface-off">
              <button
                onClick={() => changeQuantity(quantity - 1)}
                disabled={updating || quantity <= 1}
                className="px-3 py-1.5 text-gray-600 hover:text-primary active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-[20px]">
                  remove
                </span>
              </button>
              <input
                className="w-14 bg-transparent border-none text-center p-0 text-text-main font-bold focus:ring-0 appearance-none"
                type="number"
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value)
                  if (!isNaN(val) && val > 0) {
                    changeQuantity(val)
                  }
                }}
                data-testid="product-select-button"
              />
              <button
                onClick={() => changeQuantity(quantity + 1)}
                disabled={updating}
                className="px-3 py-1.5 text-gray-600 hover:text-primary active:scale-95 transition-transform disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[20px]">
                  add
                </span>
              </button>
            </div>
            {updating && (
              <span className="text-xs text-text-muted">Güncelleniyor...</span>
            )}
          </div>

          {/* Total */}
          <div className="flex flex-col gap-0.5 pt-2 border-t border-input-border">
            <span className="text-text-muted text-xs font-semibold uppercase tracking-wider">
              Bireysel Toplam
            </span>
            <span className="text-primary font-bold text-xl">
              {convertToLocale({
                amount: totalPrice,
                currency_code: currencyCode,
              })}
            </span>
          </div>
        </div>

        <ErrorMessage error={error} data-testid="product-error-message" />
      </div>
    </div>
  )
}

export default Item
