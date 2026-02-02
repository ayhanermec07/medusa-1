"use client"

import { setAddresses } from "@lib/data/cart"
import compareAddresses from "@lib/util/compare-addresses"
import { CheckCircleSolid } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { useToggleState } from "@medusajs/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState } from "react"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useActionState(setAddresses, null)

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>

      <div className="flex items-center gap-4 mb-8 border-b border-stone-200 pb-6">
        <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-2xl">
            local_shipping
          </span>
        </div>
        <h2 className="text-2xl font-bold text-text-main flex items-center gap-3">
          1. Teslimat ve Fatura Bilgileri
          {!isOpen && cart?.shipping_address && (
            <CheckCircleSolid className="text-accent" />
          )}
        </h2>
        {!isOpen && cart?.shipping_address && (
          <button
            onClick={handleEdit}
            className="ml-auto text-primary hover:text-primary-hover font-semibold text-sm"
            data-testid="edit-address-button"
          >
            Düzenle
          </button>
        )}
      </div>

      {isOpen ? (
        <form action={formAction}>
          <div className="pb-8">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {!sameAsBilling && (
              <div className="mt-8 pt-8 border-t border-stone-200">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-secondary text-2xl">
                    receipt_long
                  </span>
                  <h3 className="text-xl font-bold text-text-main">
                    Fatura Adresi
                  </h3>
                </div>
                <BillingAddress cart={cart} />
              </div>
            )}

            <SubmitButton
              className="mt-6 w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
              data-testid="submit-address-button"
            >
              <span>Teslimat Yöntemine Devam Et</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </SubmitButton>
            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        <div>
          {cart && cart.shipping_address ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div
                className="flex flex-col p-4 bg-stone-50 rounded-xl"
                data-testid="shipping-address-summary"
              >
                <span className="font-semibold text-text-main mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg text-primary">
                    home
                  </span>
                  Teslimat Adresi
                </span>
                <span className="text-stone-600">
                  {cart.shipping_address.first_name}{" "}
                  {cart.shipping_address.last_name}
                </span>
                <span className="text-stone-600">
                  {cart.shipping_address.address_1}{" "}
                  {cart.shipping_address.address_2}
                </span>
                <span className="text-stone-600">
                  {cart.shipping_address.postal_code},{" "}
                  {cart.shipping_address.city}
                </span>
                <span className="text-stone-600">
                  {cart.shipping_address.country_code?.toUpperCase()}
                </span>
              </div>

              <div
                className="flex flex-col p-4 bg-stone-50 rounded-xl"
                data-testid="shipping-contact-summary"
              >
                <span className="font-semibold text-text-main mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg text-primary">
                    call
                  </span>
                  İletişim
                </span>
                <span className="text-stone-600">
                  {cart.shipping_address.phone}
                </span>
                <span className="text-stone-600">{cart.email}</span>
              </div>

              <div
                className="flex flex-col p-4 bg-stone-50 rounded-xl"
                data-testid="billing-address-summary"
              >
                <span className="font-semibold text-text-main mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg text-primary">
                    receipt_long
                  </span>
                  Fatura Adresi
                </span>

                {sameAsBilling ? (
                  <span className="text-stone-600">
                    Teslimat adresi ile aynı.
                  </span>
                ) : (
                  <>
                    <span className="text-stone-600">
                      {cart.billing_address?.first_name}{" "}
                      {cart.billing_address?.last_name}
                    </span>
                    <span className="text-stone-600">
                      {cart.billing_address?.address_1}{" "}
                      {cart.billing_address?.address_2}
                    </span>
                    <span className="text-stone-600">
                      {cart.billing_address?.postal_code},{" "}
                      {cart.billing_address?.city}
                    </span>
                    <span className="text-stone-600">
                      {cart.billing_address?.country_code?.toUpperCase()}
                    </span>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default Addresses
