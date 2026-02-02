import LocalizedClientLink from "@modules/common/components/localized-client-link"

const EmptyCartMessage = () => {
  return (
    <div
      className="py-20 px-6 flex flex-col justify-center items-center text-center bg-white rounded-xl border border-input-border"
      data-testid="empty-cart-message"
    >
      <div className="w-24 h-24 bg-surface-off rounded-full flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-5xl text-text-muted">
          shopping_cart
        </span>
      </div>
      <h2 className="text-2xl font-bold text-text-main mb-3">
        Sepetiniz Boş
      </h2>
      <p className="text-base text-text-muted mb-8 max-w-md">
        Sepetinizde henüz ürün bulunmuyor. Hemen alışverişe başlayın ve
        eşsiz baharatlarımızı keşfedin!
      </p>
      <LocalizedClientLink
        href="/store"
        className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2"
      >
        <span className="material-symbols-outlined">storefront</span>
        Alışverişe Başla
      </LocalizedClientLink>
    </div>
  )
}

export default EmptyCartMessage
