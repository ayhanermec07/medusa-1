import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  return (
    <footer className="bg-background-dark text-white py-20 px-4 md:px-10 border-t-4 border-primary">
      <div className="w-full max-w-[1340px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 text-primary mb-8">
              <span className="material-symbols-outlined text-4xl">
                local_florist
              </span>
              <div>
                <h2 className="text-white text-2xl font-black tracking-tight leading-none">
                  Efsane
                </h2>
                <p className="text-white/60 text-sm tracking-wide">Baharat</p>
              </div>
            </div>
            <p className="text-[#a89b92] text-sm leading-7 mb-8">
              Toptan baharat, otlar ve çeşniler için güvenilir iş ortağınız.
              1998'den beri kaliteden ödün vermeden sofralara lezzet katıyoruz.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="h-10 w-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-primary transition-colors border border-white/10 hover:border-transparent"
              >
                <span className="text-xs font-bold">IG</span>
              </a>
              <a
                href="#"
                className="h-10 w-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-primary transition-colors border border-white/10 hover:border-transparent"
              >
                <span className="text-xs font-bold">FB</span>
              </a>
              <a
                href="#"
                className="h-10 w-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-primary transition-colors border border-white/10 hover:border-transparent"
              >
                <span className="text-xs font-bold">LI</span>
              </a>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-turmeric">Ürünlerimiz</h4>
            <ul className="space-y-3 text-sm text-[#a89b92]">
              <li>
                <LocalizedClientLink
                  href="/store"
                  className="hover:text-primary transition-colors"
                >
                  Tane Baharatlar
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/store"
                  className="hover:text-primary transition-colors"
                >
                  Toz Baharatlar
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/store"
                  className="hover:text-primary transition-colors"
                >
                  Kurutulmuş Otlar
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/store"
                  className="hover:text-primary transition-colors"
                >
                  Özel Karışımlar
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/store"
                  className="hover:text-primary transition-colors"
                >
                  Pastacılık Ürünleri
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* Corporate Column */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-turmeric">Kurumsal</h4>
            <ul className="space-y-3 text-sm text-[#a89b92]">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Hakkımızda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Kalite Politikamız
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Toptan Satış Başvurusu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Kargo ve Teslimat
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  İletişim
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-turmeric">E-Bülten</h4>
            <p className="text-[#a89b92] text-sm mb-4 leading-relaxed">
              Yeni ürünler, hasat zamanları ve özel indirimlerden haberdar olun.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              <button
                type="button"
                className="bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors text-sm shadow-lg shadow-primary/20"
              >
                Kayıt Ol
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#a89b92] text-xs">
            © {new Date().getFullYear()} Efsane Baharat A.Ş. Tüm hakları
            saklıdır.
          </p>
          <div className="flex gap-8 text-xs text-[#a89b92]">
            <a href="#" className="hover:text-white transition-colors">
              Gizlilik Politikası
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Mesafeli Satış Sözleşmesi
            </a>
            <a href="#" className="hover:text-white transition-colors">
              KVKK Aydınlatma Metni
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
