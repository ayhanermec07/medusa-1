import { Dialog, Transition } from "@headlessui/react"
import { clx } from "@medusajs/ui"
import React, { Fragment, useMemo } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import ChevronDown from "@modules/common/icons/chevron-down"
import X from "@modules/common/icons/x"

import { getProductPrice } from "@lib/util/get-product-price"
import OptionSelect from "./option-select"
import { HttpTypes } from "@medusajs/types"
import { isSimpleProduct } from "@lib/util/product"

type MobileActionsProps = {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
  options: Record<string, string | undefined>
  updateOptions: (title: string, value: string) => void
  inStock?: boolean
  handleAddToCart: () => void
  isAdding?: boolean
  show: boolean
  optionsDisabled: boolean
}

const MobileActions: React.FC<MobileActionsProps> = ({
  product,
  variant,
  options,
  updateOptions,
  inStock,
  handleAddToCart,
  isAdding,
  show,
  optionsDisabled,
}) => {
  const { state, open, close } = useToggleState()

  const price = getProductPrice({
    product: product,
    variantId: variant?.id,
  })

  const selectedPrice = useMemo(() => {
    if (!price) {
      return null
    }
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  const isSimple = isSimpleProduct(product)

  return (
    <>
      <div
        className={clx("lg:hidden inset-x-0 bottom-0 fixed z-50", {
          "pointer-events-none": !show,
        })}
      >
        <Transition
          as={Fragment}
          show={show}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0 translate-y-full"
          enterTo="opacity-100 translate-y-0"
          leave="ease-in duration-300"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-full"
        >
          <div
            className="bg-white flex flex-col gap-y-3 justify-center items-center p-4 w-full border-t border-input-border shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]"
            data-testid="mobile-actions"
          >
            <div className="flex items-center gap-x-2 w-full truncate">
              <span className="font-bold text-text-main truncate" data-testid="mobile-title">
                {product.title}
              </span>
              <span className="text-text-muted">—</span>
              {selectedPrice ? (
                <div className="flex items-end gap-x-2 text-text-main flex-shrink-0">
                  {selectedPrice.price_type === "sale" && (
                    <span className="line-through text-xs text-text-muted">
                      {selectedPrice.original_price}
                    </span>
                  )}
                  <span
                    className={clx("font-bold text-lg", {
                      "text-primary": selectedPrice.price_type === "sale",
                    })}
                  >
                    {selectedPrice.calculated_price}
                  </span>
                </div>
              ) : (
                <div className="h-6 w-20 bg-gray-100 animate-pulse rounded"></div>
              )}
            </div>
            <div
              className={clx("grid grid-cols-2 w-full gap-x-4", {
                "!grid-cols-1": isSimple,
              })}
            >
              {!isSimple && (
                <button
                  onClick={open}
                  className="w-full bg-surface-off border border-input-border text-text-main font-medium py-3 rounded-xl flex items-center justify-between px-4 transition-colors hover:bg-gray-100"
                  data-testid="mobile-actions-button"
                >
                  <span className="truncate">
                    {variant ? Object.values(options).join(" / ") : "Seçenekler"}
                  </span>
                  <ChevronDown />
                </button>
              )}
              <button
                onClick={handleAddToCart}
                disabled={!inStock || !variant}
                className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                data-testid="mobile-cart-button"
              >
                {isAdding ? "Ekleniyor..." : !variant ? "Seçim Yapın" : !inStock ? "Stok Yok" : "Sepete Ekle"}
              </button>
            </div>
          </div>
        </Transition>
      </div>
      <Transition appear show={state} as={Fragment}>
        <Dialog as="div" className="relative z-[75]" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed bottom-0 inset-x-0">
            <div className="flex min-h-full h-full items-end justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300 transform"
                enterFrom="translate-y-full"
                enterTo="translate-y-0"
                leave="ease-in duration-200 transform"
                leaveFrom="translate-y-0"
                leaveTo="translate-y-full"
              >
                <Dialog.Panel
                  className="w-full max-h-[80vh] overflow-y-auto bg-white rounded-t-2xl shadow-xl flex flex-col"
                  data-testid="mobile-actions-modal"
                >
                  <div className="sticky top-0 z-10 bg-white border-b border-input-border px-6 py-4 flex items-center justify-between">
                    <h3 className="font-bold text-lg text-text-main">
                      Seçenekleri Düzenle
                    </h3>
                    <button
                      onClick={close}
                      className="text-text-muted hover:text-text-main transition-colors p-2"
                      data-testid="close-modal-button"
                    >
                      <X />
                    </button>
                  </div>

                  <div className="px-6 py-8 pb-12">
                    {(product.variants?.length ?? 0) > 1 && (
                      <div className="flex flex-col gap-y-6">
                        {(product.options || []).map((option) => {
                          return (
                            <div key={option.id}>
                              <OptionSelect
                                option={option}
                                current={options[option.id]}
                                updateOption={updateOptions}
                                title={option.title ?? ""}
                                disabled={optionsDisabled}
                              />
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileActions
