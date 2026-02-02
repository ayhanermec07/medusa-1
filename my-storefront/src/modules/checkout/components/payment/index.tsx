"use client"

import { RadioGroup } from "@headlessui/react"
import { isStripeLike, paymentInfoMap } from "@lib/constants"
import { initiatePaymentSession } from "@lib/data/cart"
import { CheckCircleSolid, CreditCard } from "@medusajs/icons"
import PaymentContainer, {
  StripeCardContainer,
} from "@modules/checkout/components/payment-container"
import ErrorMessage from "@modules/checkout/components/error-message"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: any
  availablePaymentMethods: any[]
}) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === "pending"
  )

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardBrand, setCardBrand] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? ""
  )
  const [paymentType, setPaymentType] = useState<"card" | "transfer">("card")

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"

  const setPaymentMethod = async (method: string) => {
    setError(null)
    setSelectedPaymentMethod(method)
    if (isStripeLike(method)) {
      await initiatePaymentSession(cart, {
        provider_id: method,
      })
    }
  }

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const paymentReady =
    (activeSession && cart?.shipping_methods.length !== 0) || paidByGiftcard

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const shouldInputCard =
        isStripeLike(selectedPaymentMethod) && !activeSession

      const checkActiveSession =
        activeSession?.provider_id === selectedPaymentMethod

      if (!checkActiveSession) {
        await initiatePaymentSession(cart, {
          provider_id: selectedPaymentMethod,
        })
      }

      if (!shouldInputCard) {
        return router.push(
          pathname + "?" + createQueryString("step", "review"),
          {
            scroll: false,
          }
        )
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>

      <div className="flex items-center gap-4 mb-8 border-b border-stone-200 pb-6">
        <div className="bg-secondary/10 w-12 h-12 rounded-xl flex items-center justify-center">
          <span className="material-symbols-outlined text-2xl text-yellow-700">
            credit_card
          </span>
        </div>
        <h2 className="text-2xl font-bold text-text-main flex items-center gap-3">
          2. Ödeme Yöntemi
          {!isOpen && paymentReady && (
            <CheckCircleSolid className="text-accent" />
          )}
        </h2>
        {!isOpen && paymentReady && (
          <button
            onClick={handleEdit}
            className="ml-auto text-primary hover:text-primary-hover font-semibold text-sm"
            data-testid="edit-payment-button"
          >
            Düzenle
          </button>
        )}
      </div>

      <div className={isOpen ? "block" : "hidden"}>
        {/* Payment Type Toggle */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setPaymentType("card")}
            className={`flex-1 py-4 px-4 rounded-xl border-2 font-bold flex items-center justify-center gap-2 transition-all ${paymentType === "card"
                ? "border-secondary bg-secondary/10 text-yellow-800 shadow-sm"
                : "border-stone-200 bg-white text-stone-500 hover:bg-stone-50"
              }`}
          >
            <span className="material-symbols-outlined">credit_card</span>
            Kredi Kartı
          </button>
          <button
            onClick={() => setPaymentType("transfer")}
            className={`flex-1 py-4 px-4 rounded-xl border-2 font-bold flex items-center justify-center gap-2 transition-all ${paymentType === "transfer"
                ? "border-secondary bg-secondary/10 text-yellow-800 shadow-sm"
                : "border-stone-200 bg-white text-stone-500 hover:bg-stone-50"
              }`}
          >
            <span className="material-symbols-outlined">account_balance</span>
            Havale / EFT
          </button>
        </div>

        {paymentType === "card" && (
          <div className="bg-stone-50 p-8 rounded-2xl border border-stone-200">
            {!paidByGiftcard && availablePaymentMethods?.length && (
              <RadioGroup
                value={selectedPaymentMethod}
                onChange={(value: string) => setPaymentMethod(value)}
              >
                {availablePaymentMethods.map((paymentMethod) => (
                  <div key={paymentMethod.id}>
                    {isStripeLike(paymentMethod.id) ? (
                      <StripeCardContainer
                        paymentProviderId={paymentMethod.id}
                        selectedPaymentOptionId={selectedPaymentMethod}
                        paymentInfoMap={paymentInfoMap}
                        setCardBrand={setCardBrand}
                        setError={setError}
                        setCardComplete={setCardComplete}
                      />
                    ) : (
                      <PaymentContainer
                        paymentInfoMap={paymentInfoMap}
                        paymentProviderId={paymentMethod.id}
                        selectedPaymentOptionId={selectedPaymentMethod}
                      />
                    )}
                  </div>
                ))}
              </RadioGroup>
            )}

            {paidByGiftcard && (
              <div className="flex items-center gap-3 p-4 bg-accent/10 rounded-xl">
                <span className="material-symbols-outlined text-accent">
                  card_giftcard
                </span>
                <span className="font-medium text-text-main">
                  Hediye kartı ile ödeniyor
                </span>
              </div>
            )}

            {/* Taksit Options */}
            <div className="mt-6">
              <p className="text-sm font-bold text-text-main mb-4 ml-1">
                Taksit Seçenekleri
              </p>
              <div className="border border-stone-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-sm text-left">
                  <thead className="bg-stone-100 text-stone-500 border-b border-stone-200">
                    <tr>
                      <th className="p-4 font-medium">Taksit</th>
                      <th className="p-4 font-medium">Aylık Ödeme</th>
                      <th className="p-4 font-medium text-right">Toplam</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 bg-white">
                    <tr className="bg-secondary/5">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full border-[5px] border-secondary"></div>
                          <span className="font-bold text-text-main">
                            Tek Çekim
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-text-main">
                        {cart?.total ? `${(cart.total / 100).toLocaleString("tr-TR")} TL` : "-"}
                      </td>
                      <td className="p-4 text-right font-bold text-text-main">
                        {cart?.total ? `${(cart.total / 100).toLocaleString("tr-TR")} TL` : "-"}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                          <span className="text-text-main">3 Taksit</span>
                        </div>
                      </td>
                      <td className="p-4 text-text-main">
                        {cart?.total ? `${((cart.total * 1.05) / 100 / 3).toLocaleString("tr-TR", { minimumFractionDigits: 2 })} TL` : "-"}
                      </td>
                      <td className="p-4 text-right text-text-main">
                        {cart?.total ? `${((cart.total * 1.05) / 100).toLocaleString("tr-TR", { minimumFractionDigits: 2 })} TL` : "-"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {paymentType === "transfer" && (
          <div className="bg-stone-50 p-8 rounded-2xl border border-stone-200">
            <div className="flex items-start gap-4 p-4 bg-blue-50 border border-blue-200 rounded-xl mb-6">
              <span className="material-symbols-outlined text-blue-600">
                info
              </span>
              <div>
                <p className="font-semibold text-blue-800 mb-1">
                  Havale/EFT ile Ödeme
                </p>
                <p className="text-sm text-blue-700">
                  Sipariş oluşturulduktan sonra banka hesap bilgileri
                  gönderilecektir. Ödeme onaylandıktan sonra siparişiniz
                  hazırlanacaktır.
                </p>
              </div>
            </div>

            <div className="p-4 bg-white border border-stone-200 rounded-xl">
              <p className="font-semibold text-text-main mb-3">
                Banka Bilgileri
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <span className="text-stone-500">Banka:</span>
                <span className="text-text-main font-medium">
                  Ziraat Bankası
                </span>
                <span className="text-stone-500">Şube:</span>
                <span className="text-text-main font-medium">
                  Merkez Şube
                </span>
                <span className="text-stone-500">IBAN:</span>
                <span className="text-text-main font-medium">
                  TR00 0000 0000 0000 0000 0000 00
                </span>
                <span className="text-stone-500">Hesap Adı:</span>
                <span className="text-text-main font-medium">
                  Efsane Baharat Gıda A.Ş.
                </span>
              </div>
            </div>
          </div>
        )}

        <ErrorMessage error={error} data-testid="payment-method-error-message" />

        <button
          onClick={handleSubmit}
          disabled={
            (isStripeLike(selectedPaymentMethod) && !cardComplete) ||
            (!selectedPaymentMethod && !paidByGiftcard) ||
            isLoading
          }
          className="mt-6 w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="submit-payment-button"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <span>
                {!activeSession && isStripeLike(selectedPaymentMethod)
                  ? "Kart Bilgilerini Gir"
                  : "Siparişi İncele"}
              </span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </>
          )}
        </button>
      </div>

      <div className={isOpen ? "hidden" : "block"}>
        {cart && paymentReady && activeSession ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col p-4 bg-stone-50 rounded-xl">
              <span className="font-semibold text-text-main mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg text-secondary">
                  credit_card
                </span>
                Ödeme Yöntemi
              </span>
              <span
                className="text-stone-600"
                data-testid="payment-method-summary"
              >
                {paymentInfoMap[activeSession?.provider_id]?.title ||
                  activeSession?.provider_id}
              </span>
            </div>
            <div className="flex flex-col p-4 bg-stone-50 rounded-xl">
              <span className="font-semibold text-text-main mb-2 flex items-center gap-2">
                <CreditCard className="text-secondary" />
                Kart Bilgisi
              </span>
              <span
                className="text-stone-600"
                data-testid="payment-details-summary"
              >
                {isStripeLike(selectedPaymentMethod) && cardBrand
                  ? cardBrand
                  : "Sonraki adımda girilecek"}
              </span>
            </div>
          </div>
        ) : paidByGiftcard ? (
          <div className="flex items-center gap-3 p-4 bg-accent/10 rounded-xl">
            <span className="material-symbols-outlined text-accent">
              card_giftcard
            </span>
            <span
              className="font-medium text-text-main"
              data-testid="payment-method-summary"
            >
              Hediye kartı ile ödeniyor
            </span>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default Payment
