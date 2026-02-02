"use client"

import { Radio, RadioGroup } from "@headlessui/react"
import { setShippingMethod } from "@lib/data/cart"
import { calculatePriceForShippingOption } from "@lib/data/fulfillment"
import { convertToLocale } from "@lib/util/money"
import { CheckCircleSolid, Loader } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import ErrorMessage from "@modules/checkout/components/error-message"
import MedusaRadio from "@modules/common/components/radio"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const PICKUP_OPTION_ON = "__PICKUP_ON"
const PICKUP_OPTION_OFF = "__PICKUP_OFF"

type ShippingProps = {
  cart: HttpTypes.StoreCart
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null
}

function formatAddress(address: HttpTypes.StoreCartAddress) {
  if (!address) {
    return ""
  }

  let ret = ""

  if (address.address_1) {
    ret += ` ${address.address_1}`
  }

  if (address.address_2) {
    ret += `, ${address.address_2}`
  }

  if (address.postal_code) {
    ret += `, ${address.postal_code} ${address.city}`
  }

  if (address.country_code) {
    ret += `, ${address.country_code.toUpperCase()}`
  }

  return ret
}

const Shipping: React.FC<ShippingProps> = ({
  cart,
  availableShippingMethods,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPrices, setIsLoadingPrices] = useState(true)

  const [showPickupOptions, setShowPickupOptions] =
    useState<string>(PICKUP_OPTION_OFF)
  const [calculatedPricesMap, setCalculatedPricesMap] = useState<
    Record<string, number>
  >({})
  const [error, setError] = useState<string | null>(null)
  const [shippingMethodId, setShippingMethodId] = useState<string | null>(
    cart.shipping_methods?.at(-1)?.shipping_option_id || null
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "delivery"

  const _shippingMethods = availableShippingMethods?.filter(
    (sm) => sm.service_zone?.fulfillment_set?.type !== "pickup"
  )

  const _pickupMethods = availableShippingMethods?.filter(
    (sm) => sm.service_zone?.fulfillment_set?.type === "pickup"
  )

  const hasPickupOptions = !!_pickupMethods?.length

  useEffect(() => {
    setIsLoadingPrices(true)

    if (_shippingMethods?.length) {
      const promises = _shippingMethods
        .filter((sm) => sm.price_type === "calculated")
        .map((sm) => calculatePriceForShippingOption(sm.id, cart.id))

      if (promises.length) {
        Promise.allSettled(promises).then((res) => {
          const pricesMap: Record<string, number> = {}
          res
            .filter((r) => r.status === "fulfilled")
            .forEach((p) => (pricesMap[p.value?.id || ""] = p.value?.amount!))

          setCalculatedPricesMap(pricesMap)
          setIsLoadingPrices(false)
        })
      }
    }

    if (_pickupMethods?.find((m) => m.id === shippingMethodId)) {
      setShowPickupOptions(PICKUP_OPTION_ON)
    }
  }, [availableShippingMethods])

  const handleEdit = () => {
    router.push(pathname + "?step=delivery", { scroll: false })
  }

  const handleSubmit = () => {
    router.push(pathname + "?step=payment", { scroll: false })
  }

  const handleSetShippingMethod = async (
    id: string,
    variant: "shipping" | "pickup"
  ) => {
    setError(null)

    if (variant === "pickup") {
      setShowPickupOptions(PICKUP_OPTION_ON)
    } else {
      setShowPickupOptions(PICKUP_OPTION_OFF)
    }

    let currentId: string | null = null
    setIsLoading(true)
    setShippingMethodId((prev) => {
      currentId = prev
      return id
    })

    await setShippingMethod({ cartId: cart.id, shippingMethodId: id })
      .catch((err) => {
        setShippingMethodId(currentId)

        setError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  const hasShippingMethod = (cart.shipping_methods?.length ?? 0) > 0

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>

      <div className="flex items-center gap-4 mb-8 border-b border-stone-200 pb-6">
        <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center text-accent">
          <span className="material-symbols-outlined text-2xl">
            local_shipping
          </span>
        </div>
        <h2
          className={clx(
            "text-2xl font-bold text-text-main flex items-center gap-3",
            {
              "opacity-50 pointer-events-none select-none":
                !isOpen && cart.shipping_methods?.length === 0,
            }
          )}
        >
          Teslimat Yöntemi
          {!isOpen && hasShippingMethod && (
            <CheckCircleSolid className="text-accent" />
          )}
        </h2>
        {!isOpen &&
          cart?.shipping_address &&
          cart?.billing_address &&
          cart?.email && (
            <button
              onClick={handleEdit}
              className="ml-auto text-primary hover:text-primary-hover font-semibold text-sm"
              data-testid="edit-delivery-button"
            >
              Düzenle
            </button>
          )}
      </div>

      {isOpen ? (
        <>
          <div className="grid">
            <div className="flex flex-col mb-6">
              <span className="font-semibold text-text-main">
                Kargo Yöntemi
              </span>
              <span className="text-sm text-stone-500">
                Siparişinizin nasıl teslim edilmesini istersiniz?
              </span>
            </div>

            <div data-testid="delivery-options-container">
              <div className="pb-8 md:pt-0 pt-2 space-y-3">
                {hasPickupOptions && (
                  <RadioGroup
                    value={showPickupOptions}
                    onChange={(value) => {
                      const id = _pickupMethods.find(
                        (option) => !option.insufficient_inventory
                      )?.id

                      if (id) {
                        handleSetShippingMethod(id, "pickup")
                      }
                    }}
                  >
                    <Radio
                      value={PICKUP_OPTION_ON}
                      data-testid="delivery-option-radio"
                      className={clx(
                        "flex items-center justify-between cursor-pointer py-4 border-2 rounded-xl px-6 hover:border-accent/50 transition-colors",
                        {
                          "border-accent bg-accent/5":
                            showPickupOptions === PICKUP_OPTION_ON,
                          "border-stone-200 bg-white":
                            showPickupOptions !== PICKUP_OPTION_ON,
                        }
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <MedusaRadio
                          checked={showPickupOptions === PICKUP_OPTION_ON}
                        />
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-accent">
                            store
                          </span>
                          <span className="font-medium text-text-main">
                            Mağazadan Teslim Al
                          </span>
                        </div>
                      </div>
                      <span className="font-bold text-accent">Ücretsiz</span>
                    </Radio>
                  </RadioGroup>
                )}

                <RadioGroup
                  value={shippingMethodId}
                  onChange={(v) => {
                    if (v) {
                      return handleSetShippingMethod(v, "shipping")
                    }
                  }}
                >
                  {_shippingMethods?.map((option) => {
                    const isDisabled =
                      option.price_type === "calculated" &&
                      !isLoadingPrices &&
                      typeof calculatedPricesMap[option.id] !== "number"

                    return (
                      <Radio
                        key={option.id}
                        value={option.id}
                        data-testid="delivery-option-radio"
                        disabled={isDisabled}
                        className={clx(
                          "flex items-center justify-between cursor-pointer py-4 border-2 rounded-xl px-6 hover:border-accent/50 transition-colors",
                          {
                            "border-accent bg-accent/5":
                              option.id === shippingMethodId,
                            "border-stone-200 bg-white":
                              option.id !== shippingMethodId,
                            "opacity-50 cursor-not-allowed": isDisabled,
                          }
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <MedusaRadio
                            checked={option.id === shippingMethodId}
                          />
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">
                              local_shipping
                            </span>
                            <span className="font-medium text-text-main">
                              {option.name}
                            </span>
                          </div>
                        </div>
                        <span className="font-bold text-text-main">
                          {option.price_type === "flat" ? (
                            option.amount === 0 ? (
                              <span className="text-accent">Ücretsiz</span>
                            ) : (
                              convertToLocale({
                                amount: option.amount!,
                                currency_code: cart?.currency_code,
                              })
                            )
                          ) : calculatedPricesMap[option.id] ? (
                            convertToLocale({
                              amount: calculatedPricesMap[option.id],
                              currency_code: cart?.currency_code,
                            })
                          ) : isLoadingPrices ? (
                            <Loader className="animate-spin" />
                          ) : (
                            "-"
                          )}
                        </span>
                      </Radio>
                    )
                  })}
                </RadioGroup>
              </div>
            </div>
          </div>

          {showPickupOptions === PICKUP_OPTION_ON && (
            <div className="grid mt-6 pt-6 border-t border-stone-200">
              <div className="flex flex-col mb-6">
                <span className="font-semibold text-text-main">
                  Mağaza Seçin
                </span>
                <span className="text-sm text-stone-500">
                  Size en yakın mağazayı seçin
                </span>
              </div>
              <div data-testid="delivery-options-container">
                <div className="pb-8 md:pt-0 pt-2 space-y-3">
                  <RadioGroup
                    value={shippingMethodId}
                    onChange={(v) => {
                      if (v) {
                        return handleSetShippingMethod(v, "pickup")
                      }
                    }}
                  >
                    {_pickupMethods?.map((option) => {
                      return (
                        <Radio
                          key={option.id}
                          value={option.id}
                          disabled={option.insufficient_inventory}
                          data-testid="delivery-option-radio"
                          className={clx(
                            "flex items-center justify-between cursor-pointer py-4 border-2 rounded-xl px-6 hover:border-accent/50 transition-colors",
                            {
                              "border-accent bg-accent/5":
                                option.id === shippingMethodId,
                              "border-stone-200 bg-white":
                                option.id !== shippingMethodId,
                              "opacity-50 cursor-not-allowed":
                                option.insufficient_inventory,
                            }
                          )}
                        >
                          <div className="flex items-start gap-4">
                            <MedusaRadio
                              checked={option.id === shippingMethodId}
                            />
                            <div className="flex flex-col">
                              <span className="font-medium text-text-main">
                                {option.name}
                              </span>
                              <span className="text-sm text-stone-500">
                                {formatAddress(
                                  option.service_zone?.fulfillment_set?.location
                                    ?.address
                                )}
                              </span>
                            </div>
                          </div>
                          <span className="font-bold text-accent">
                            {option.amount === 0
                              ? "Ücretsiz"
                              : convertToLocale({
                                amount: option.amount!,
                                currency_code: cart?.currency_code,
                              })}
                          </span>
                        </Radio>
                      )
                    })}
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          <div>
            <ErrorMessage
              error={error}
              data-testid="delivery-option-error-message"
            />
            <button
              onClick={handleSubmit}
              disabled={!cart.shipping_methods?.[0] || isLoading}
              className="mt-6 w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="submit-delivery-option-button"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <span>Ödeme Yöntemine Devam Et</span>
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </>
              )}
            </button>
          </div>
        </>
      ) : (
        <div>
          {cart && hasShippingMethod && (
            <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-xl">
              <span className="material-symbols-outlined text-accent text-2xl">
                local_shipping
              </span>
              <div>
                <span className="font-semibold text-text-main block">
                  {cart.shipping_methods!.at(-1)!.name}
                </span>
                <span className="text-sm text-stone-500">
                  {cart.shipping_methods!.at(-1)!.amount === 0
                    ? "Ücretsiz Kargo"
                    : convertToLocale({
                      amount: cart.shipping_methods!.at(-1)!.amount!,
                      currency_code: cart?.currency_code,
                    })}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default Shipping
