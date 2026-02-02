import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  const itemCount = cart?.items?.length || 0

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-stone-200 overflow-hidden ring-1 ring-black/5">
      {/* Header */}
      <div className="p-6 border-b border-stone-200 bg-stone-50">
        <h3 className="text-xl font-bold text-text-main">Sipariş Özeti</h3>
        <p className="text-sm text-stone-500 mt-1">
          Sepetinizde {itemCount} ürün var
        </p>
      </div>

      {/* Items */}
      <div className="p-6 flex flex-col gap-6 max-h-[400px] overflow-y-auto">
        <ItemsPreviewTemplate cart={cart} />
      </div>

      {/* Discount Code */}
      <div className="px-6 pb-6">
        <DiscountCode cart={cart} />
      </div>

      {/* Totals */}
      <div className="p-6 bg-stone-50 border-t border-stone-200">
        <CartTotals totals={cart} />
      </div>

      {/* Terms & Submit */}
      <div className="p-6 border-t border-stone-200 bg-white">
        <div className="mb-5">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              className="mt-1 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
              type="checkbox"
            />
            <span className="text-xs text-stone-500 group-hover:text-stone-700 transition-colors leading-relaxed">
              <a
                className="underline decoration-secondary underline-offset-2 hover:text-primary font-medium"
                href="#"
              >
                Mesafeli Satış Sözleşmesi
              </a>
              &apos;ni ve{" "}
              <a
                className="underline decoration-secondary underline-offset-2 hover:text-primary font-medium"
                href="#"
              >
                Ön Bilgilendirme Formu
              </a>
              &apos;nu okudum, onaylıyorum.
            </span>
          </label>
        </div>

        <button className="w-full bg-primary hover:bg-primary/90 text-white text-lg font-bold py-4 rounded-xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3 group">
          Siparişi Tamamla
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>

        <div className="mt-8 flex justify-center gap-4 text-gray-400 opacity-60">
          <div className="h-8 flex items-center gap-3">
            <span className="material-symbols-outlined text-3xl">lock</span>
            <span className="text-xs font-bold tracking-[0.2em]">
              SSL SECURED
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
