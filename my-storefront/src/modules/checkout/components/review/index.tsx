"use client"

import { clx } from "@medusajs/ui"
import PaymentButton from "../payment-button"
import { useSearchParams } from "next/navigation"

const Review = ({ cart }: { cart: any }) => {
  const searchParams = useSearchParams()

  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    (cart.payment_collection || paidByGiftcard)

  return (
    <section
      className={clx(
        "bg-white rounded-2xl shadow-sm border border-stone-200 p-8 relative overflow-hidden",
        {
          "opacity-50 pointer-events-none select-none": !isOpen,
        }
      )}
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>

      <div className="flex items-center gap-4 mb-8 border-b border-stone-200 pb-6">
        <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-2xl">
            fact_check
          </span>
        </div>
        <h2 className="text-2xl font-bold text-text-main">
          Siparişi İncele ve Onayla
        </h2>
      </div>

      {isOpen && previousStepsCompleted && (
        <>
          <div className="bg-stone-50 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-xl mt-0.5">
                info
              </span>
              <p className="text-sm text-stone-600 leading-relaxed">
                &quot;Siparişi Tamamla&quot; butonuna tıklayarak{" "}
                <a
                  href="#"
                  className="text-primary hover:underline font-medium"
                >
                  Kullanım Koşulları
                </a>
                ,{" "}
                <a
                  href="#"
                  className="text-primary hover:underline font-medium"
                >
                  Satış Koşulları
                </a>{" "}
                ve{" "}
                <a
                  href="#"
                  className="text-primary hover:underline font-medium"
                >
                  İade Politikası
                </a>
                &apos;nı okuduğunuzu, anladığınızı ve kabul ettiğinizi onaylıyorsunuz.
              </p>
            </div>
          </div>

          <PaymentButton cart={cart} data-testid="submit-order-button" />
        </>
      )}

      {!isOpen && (
        <div className="text-center py-4 text-stone-500">
          <span className="material-symbols-outlined text-4xl mb-2 block">
            hourglass_empty
          </span>
          <p className="text-sm">
            Önce teslimat ve ödeme adımlarını tamamlayın
          </p>
        </div>
      )}
    </section>
  )
}

export default Review
