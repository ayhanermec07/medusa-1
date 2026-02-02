import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Ödeme - Efsane Baharat",
  description: "Siparişinizi tamamlayın",
}

// Checkout Steps Component
function CheckoutSteps() {
  return (
    <div className="mb-14 w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between relative px-4">
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-stone-200 -z-10 rounded-full"></div>
        <div className="absolute top-1/2 left-0 w-1/2 h-[2px] bg-primary/60 -z-10 rounded-full transition-all duration-500"></div>

        <div className="flex flex-col items-center gap-3 group cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 ring-4 ring-background-cream transition-all duration-300 transform group-hover:scale-110">
            <span className="material-symbols-outlined text-xl font-bold">
              check
            </span>
          </div>
          <span className="text-sm font-bold text-primary tracking-wide">
            Teslimat
          </span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-secondary text-text-main flex items-center justify-center font-bold text-lg shadow-lg shadow-secondary/20 ring-4 ring-background-cream">
            2
          </div>
          <span className="text-sm font-bold text-text-main">Ödeme</span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white border-2 border-stone-200 text-stone-500 flex items-center justify-center font-bold text-lg shadow-sm ring-4 ring-background-cream">
            3
          </div>
          <span className="text-sm font-medium text-stone-500">Onay</span>
        </div>
      </div>
    </div>
  )
}

export default async function Checkout() {
  const cart = await retrieveCart()

  if (!cart) {
    return notFound()
  }

  const customer = await retrieveCustomer()

  return (
    <>
      <CheckoutSteps />
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        <div className="flex-1 w-full flex flex-col gap-10">
          <PaymentWrapper cart={cart}>
            <CheckoutForm cart={cart} customer={customer} />
          </PaymentWrapper>
        </div>
        <div className="w-full lg:w-[400px] flex-shrink-0 lg:sticky lg:top-32">
          <CheckoutSummary cart={cart} />
        </div>
      </div>
    </>
  )
}
