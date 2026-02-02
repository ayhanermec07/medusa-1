"use client"

import React from "react"
import { applyPromotions } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import ErrorMessage from "../error-message"

type DiscountCodeProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
  const [errorMessage, setErrorMessage] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const { promotions = [] } = cart

  const removePromotionCode = async (code: string) => {
    const validPromotions = promotions.filter(
      (promotion) => promotion.code !== code
    )

    await applyPromotions(
      validPromotions.filter((p) => p.code !== undefined).map((p) => p.code!)
    )
  }

  const addPromotionCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")

    const code = inputRef.current?.value
    if (!code) {
      return
    }

    setIsLoading(true)
    const codes = promotions
      .filter((p) => p.code !== undefined)
      .map((p) => p.code!)
    codes.push(code)

    try {
      await applyPromotions(codes)
      if (inputRef.current) {
        inputRef.current.value = ""
      }
    } catch (e: any) {
      setErrorMessage(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Input Form */}
      <form onSubmit={addPromotionCode} className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          name="code"
          placeholder="İndirim Kodu"
          className="flex-1 rounded-lg border border-input-border bg-white px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text-main placeholder:text-gray-400"
          data-testid="discount-input"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-surface-off text-text-main text-sm font-semibold px-4 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          data-testid="discount-apply-button"
        >
          {isLoading ? "..." : "Uygula"}
        </button>
      </form>

      <ErrorMessage error={errorMessage} data-testid="discount-error-message" />

      {/* Applied Promotions */}
      {promotions.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
            Uygulanan İndirimler
          </span>
          {promotions.map((promotion) => (
            <div
              key={promotion.id}
              className="flex items-center justify-between bg-accent/10 border border-accent/30 rounded-lg px-3 py-2"
              data-testid="discount-row"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-accent text-lg">
                  {promotion.is_automatic ? "auto_awesome" : "confirmation_number"}
                </span>
                <span
                  className="text-sm font-bold text-text-main"
                  data-testid="discount-code"
                >
                  {promotion.code}
                </span>
                {promotion.application_method?.value !== undefined &&
                  promotion.application_method.currency_code !== undefined && (
                    <span className="text-xs text-accent font-semibold">
                      (
                      {promotion.application_method.type === "percentage"
                        ? `%${promotion.application_method.value}`
                        : convertToLocale({
                          amount: +promotion.application_method.value,
                          currency_code:
                            promotion.application_method.currency_code,
                        })}
                      )
                    </span>
                  )}
              </div>
              {!promotion.is_automatic && (
                <button
                  onClick={() => {
                    if (promotion.code) {
                      removePromotionCode(promotion.code)
                    }
                  }}
                  className="text-text-muted hover:text-red-500 transition-colors p-1"
                  data-testid="remove-discount-button"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                  <span className="sr-only">İndirim kodunu kaldır</span>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DiscountCode
