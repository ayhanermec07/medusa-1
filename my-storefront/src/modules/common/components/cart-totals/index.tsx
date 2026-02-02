"use client"

import { convertToLocale } from "@lib/util/money"
import React from "react"

type CartTotalsProps = {
  totals: {
    total?: number | null
    subtotal?: number | null
    tax_total?: number | null
    currency_code: string
    item_subtotal?: number | null
    shipping_subtotal?: number | null
    discount_subtotal?: number | null
  }
}

const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
  const {
    currency_code,
    total,
    tax_total,
    item_subtotal,
    shipping_subtotal,
    discount_subtotal,
  } = totals

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between text-sm font-medium text-stone-500">
        <span>Ara Toplam</span>
        <span data-testid="cart-subtotal" data-value={item_subtotal || 0}>
          {convertToLocale({ amount: item_subtotal ?? 0, currency_code })}
        </span>
      </div>
      <div className="flex justify-between text-sm font-medium text-stone-500">
        <span>Kargo</span>
        <span data-testid="cart-shipping" data-value={shipping_subtotal || 0}>
          {shipping_subtotal === 0 ? (
            <span className="text-accent font-bold">Ücretsiz</span>
          ) : (
            convertToLocale({ amount: shipping_subtotal ?? 0, currency_code })
          )}
        </span>
      </div>
      {!!discount_subtotal && (
        <div className="flex justify-between text-sm font-medium text-stone-500">
          <span>İndirim</span>
          <span
            className="text-primary font-bold"
            data-testid="cart-discount"
            data-value={discount_subtotal || 0}
          >
            -{" "}
            {convertToLocale({
              amount: discount_subtotal ?? 0,
              currency_code,
            })}
          </span>
        </div>
      )}
      <div className="flex justify-between text-sm font-medium text-stone-500">
        <span>KDV (%1)</span>
        <span data-testid="cart-taxes" data-value={tax_total || 0}>
          {convertToLocale({ amount: tax_total ?? 0, currency_code })}
        </span>
      </div>
      <div className="h-px bg-stone-200 my-2"></div>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-text-main">Genel Toplam</span>
        <span
          className="text-3xl font-bold text-primary"
          data-testid="cart-total"
          data-value={total || 0}
        >
          {convertToLocale({ amount: total ?? 0, currency_code })}
        </span>
      </div>
    </div>
  )
}

export default CartTotals
