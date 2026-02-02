"use client"

import CartTotals from "@modules/common/components/cart-totals"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div className="bg-white border border-input-border rounded-xl p-6 shadow-sm sticky top-28">
      <h2 className="text-xl font-bold text-text-main mb-6">Sipariş Özeti</h2>

      {/* Totals */}
      <div className="mb-6">
        <CartTotals totals={cart} />
      </div>

      {/* Discount Code */}
      <div className="mb-6 pt-2">
        <DiscountCode cart={cart} />
      </div>

      {/* Checkout Button */}
      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
      >
        <button className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-lg">
          Ödemeye Geç
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </LocalizedClientLink>

      {/* Trust Badges */}
      <div className="mt-6 flex justify-center gap-6 text-text-muted">
        <div className="flex flex-col items-center gap-1">
          <span className="material-symbols-outlined text-[24px]">lock</span>
          <span className="text-[10px] font-medium uppercase tracking-wide">
            Güvenli Ödeme
          </span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="material-symbols-outlined text-[24px]">
            local_shipping
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wide">
            Hızlı Kargo
          </span>
        </div>
      </div>
    </div>
  )
}

export default Summary
