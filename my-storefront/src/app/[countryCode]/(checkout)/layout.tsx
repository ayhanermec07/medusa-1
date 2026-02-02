import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-background-cream relative min-h-screen font-display">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-center justify-between whitespace-nowrap border-b border-solid border-stone-200 px-8 lg:px-16 py-8 bg-white relative z-50 shadow-sm">
        <LocalizedClientLink
          href="/"
          className="flex items-center gap-5 text-text-main"
          data-testid="store-link"
        >
          <div className="size-14 text-primary bg-primary/10 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-[36px]">
              local_fire_department
            </span>
          </div>
          <div>
            <h1 className="text-text-main text-3xl font-bold leading-tight tracking-tight">
              Efsane Baharat
            </h1>
            <p className="text-stone-500 text-sm font-medium tracking-wide">
              Toptan &amp; Doğal Lezzetler
            </p>
          </div>
        </LocalizedClientLink>
        <div className="mt-4 md:mt-0 flex items-center gap-3 text-accent font-semibold bg-accent/10 px-4 py-2 rounded-full border border-accent/20">
          <span className="material-symbols-outlined text-lg">lock</span>
          <span className="text-sm uppercase tracking-wide">
            Güvenli Ödeme Sayfası
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 py-12 lg:px-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-10 mt-16">
        <div className="max-w-[1280px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm font-medium text-stone-500">
            © 2024 Efsane Baharat Toptan Gıda A.Ş.
          </p>
          <div className="flex gap-6">
            <a
              className="text-sm font-medium text-stone-500 hover:text-primary transition-colors"
              href="#"
            >
              Gizlilik Politikası
            </a>
            <a
              className="text-sm font-medium text-stone-500 hover:text-primary transition-colors"
              href="#"
            >
              İptal ve İade
            </a>
            <a
              className="text-sm font-medium text-stone-500 hover:text-primary transition-colors"
              href="#"
            >
              Yardım
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
