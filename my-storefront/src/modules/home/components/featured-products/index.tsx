import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function FeaturedProducts({
  collections,
  region,
}: {
  collections: HttpTypes.StoreCollection[]
  region: HttpTypes.StoreRegion
}) {
  // TODO: Connect to actual Medusa products. Currently displaying static design as requested.
  // When products are available, we should map them here or use ProductRail with custom styling.

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Product 1 */}
      <div className="group flex flex-col bg-white rounded-2xl border border-[#e8e4dc] overflow-hidden hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
          <div className="absolute top-4 left-4 z-10 bg-turmeric text-[#2c241f] text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
            Çok Satan
          </div>
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAo7DiUEOdADwNtbG6isyydAu6upaqQEGMHOizMewbBQ7TWYWRGqG4aughGDH4AlYf0OyDTe8Bp3OE_bpsvZ4UWqpz95y4a7JWNCSKZCBm-IfkwASSN9-neanTooJNsy99npbttfSVocPO_eHpPdF4atzPsD9XX8zelrelibHkA571QK5v5kDhn5-PqLNkKhjQaZsK4j2hDKrYm53aV9Szx9amwdtthSSgAmRCvl_23D5VYxK01q5RLI6UkLcl7L9_qq50Ja227jAQ"
            alt="Smoked paprika"
          />
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button className="w-full h-10 bg-white/90 backdrop-blur text-primary font-bold rounded-lg shadow-lg hover:bg-primary hover:text-white transition-colors">
              Hızlı İncele
            </button>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="mb-4">
            <h3 className="font-bold text-lg text-text-main mb-1 group-hover:text-primary transition-colors">
              İsli Toz Biber
            </h3>
            <p className="text-sm text-text-muted flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">
                public
              </span>{" "}
              İspanya
            </p>
          </div>
          <div className="mt-auto pt-4 border-t border-[#f0ede6] flex items-end justify-between">
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wide">
                Kg Fiyatı
              </p>
              <p className="font-black text-xl text-primary">₺285,00</p>
            </div>
            <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[22px]">add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product 2 */}
      <div className="group flex flex-col bg-white rounded-2xl border border-[#e8e4dc] overflow-hidden hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
          <div className="absolute top-4 left-4 z-10 bg-sage text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
            Yeni Hasat
          </div>
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO9D-ciWi0NqS1H7fNdOJeXjSvjR8MqThOBuT_cvL5bC-gest8gsv1SWpYgd1uYBzQZoBUD9R2OzedFzsNI7RvvJRR4XTni6lCMOjwV1CLVCxtHw5l-Fxoi-htm4ijQ9H3eD2bcc2KMwfwmiy3hacT-5Akfl45dJuyYwWxmGJH0C-VRHWIANn85AAWf90iKeHHNNynl_rVL9AW6uaOZzmjzsYC6AR1dpBL97xLY1WpUHgbxCkgCZ0WeB7DkdS1WtxqNsF4ANlwEHk"
            alt="Black peppercorns"
          />
        </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="mb-4">
            <h3 className="font-bold text-lg text-text-main mb-1 group-hover:text-primary transition-colors">
              Tane Karabiber
            </h3>
            <p className="text-sm text-text-muted flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">
                public
              </span>{" "}
              Vietnam
            </p>
          </div>
          <div className="mt-auto pt-4 border-t border-[#f0ede6] flex items-end justify-between">
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wide">
                Kg Fiyatı
              </p>
              <p className="font-black text-xl text-primary">₺450,00</p>
            </div>
            <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[22px]">add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product 3 */}
      <div className="group flex flex-col bg-white rounded-2xl border border-[#e8e4dc] overflow-hidden hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKVCxtQqQ5ckmdxhm5knkM0-ih_9x2dhRTPA9ZtdgfbbmQDNw3shdRifLRBDn4pg4Lx6dufQcSSukjS3cWilMyyR8aRk_ZChFwxVpZ9l-nP_c9x0o7Rtf-e8ktC0-3dtWwmp03tfPGjE-Mjt3_YtOXJWhPEbzmUxqJa9jP6vbVkLRX6CYJM6nzEQR9gBwK_ib259BjiO6R1-q8J7EbmdCoKjAazjmY5vP_jQS3wDsL9r3vCOhHtpEGCNj4K3JKqCyU9V2q3zretmo"
            alt="Turmeric powder"
          />
        </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="mb-4">
            <h3 className="font-bold text-lg text-text-main mb-1 group-hover:text-primary transition-colors">
              Toz Zerdeçal
            </h3>
            <p className="text-sm text-text-muted flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">
                public
              </span>{" "}
              Hindistan
            </p>
          </div>
          <div className="mt-auto pt-4 border-t border-[#f0ede6] flex items-end justify-between">
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wide">
                Kg Fiyatı
              </p>
              <p className="font-black text-xl text-primary">₺310,00</p>
            </div>
            <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[22px]">add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product 4 */}
      <div className="group flex flex-col bg-white rounded-2xl border border-[#e8e4dc] overflow-hidden hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6sxNd1N0RqcFtseSl7XQtVPCqUGugwOF96-t15o07pHUhyrDsMk1TxjoGbp-6QLG5gt-P3JIMBxMKmtqGSGxjung6NwcULzLDOhJfqry-DDXZpxdosOP7R41fmeM6rnThXtn_EB4e-tg-FH9N_kGGJv7R_KFB0kLjgbUlu97-AFqaJhvqYL9mk0Js2kjzWFfFh__OGblSaGtX92F3arz0nSG2Y6Rn4W1Z2Y8frbDM1s4TK8vYJOqCcg0qUPT55Wj1RAoANfMlPEo"
            alt="Cumin seeds"
          />
        </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="mb-4">
            <h3 className="font-bold text-lg text-text-main mb-1 group-hover:text-primary transition-colors">
              Tane Kimyon
            </h3>
            <p className="text-sm text-text-muted flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">
                public
              </span>{" "}
              Türkiye
            </p>
          </div>
          <div className="mt-auto pt-4 border-t border-[#f0ede6] flex items-end justify-between">
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wide">
                Kg Fiyatı
              </p>
              <p className="font-black text-xl text-primary">₺265,00</p>
            </div>
            <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[22px]">add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
