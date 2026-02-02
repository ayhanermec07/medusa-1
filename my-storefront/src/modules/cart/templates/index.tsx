import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const itemCount = cart?.items?.length || 0

  return (
    <div className="bg-background-cream min-h-screen">
      <main className="max-w-[1200px] mx-auto py-8 md:py-12 px-4 md:px-10">
        <div className="flex flex-col gap-8">
          {/* Breadcrumb */}
          <div className="flex flex-wrap gap-2 items-center">
            <LocalizedClientLink
              href="/"
              className="text-text-muted text-sm md:text-base font-medium hover:text-primary hover:underline"
            >
              Anasayfa
            </LocalizedClientLink>
            <span className="text-text-muted text-sm md:text-base font-medium">
              /
            </span>
            <span className="text-text-main text-sm md:text-base font-medium">
              Sepetim
            </span>
          </div>

          {/* Page Title */}
          <div className="flex flex-col md:flex-row md:items-baseline gap-4 border-b border-input-border pb-5">
            <h1 className="text-text-main tracking-tight text-3xl md:text-4xl font-bold">
              Alışveriş Sepeti
            </h1>
            {itemCount > 0 && (
              <span className="text-text-muted text-lg font-normal">
                {itemCount} Ürün
              </span>
            )}
          </div>

          {cart?.items?.length ? (
            <div
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              data-testid="cart-container"
            >
              {/* Cart Items */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                {!customer && <SignInPrompt />}
                <ItemsTemplate cart={cart} />

                {/* Continue Shopping */}
                <div className="flex pt-4">
                  <LocalizedClientLink
                    href="/store"
                    className="flex items-center gap-2 text-primary font-semibold hover:text-primary-hover transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      arrow_back
                    </span>
                    Alışverişe Devam Et
                  </LocalizedClientLink>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-4 space-y-4">
                {cart && cart.region && (
                  <Summary cart={cart as any} />
                )}
              </div>
            </div>
          ) : (
            <div data-testid="cart-container">
              <EmptyCartMessage />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default CartTemplate
