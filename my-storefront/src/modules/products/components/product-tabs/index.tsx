"use client"

import { HttpTypes } from "@medusajs/types"
import { useState } from "react"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

type TabType = "description" | "specs" | "shipping" | "certificates"

const ProductTabs = ({ product }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("description")

  const tabs = [
    { id: "description" as TabType, label: "Ürün Açıklaması" },
    { id: "specs" as TabType, label: "Teknik Özellikler" },
    { id: "shipping" as TabType, label: "Kargo & Depolama" },
    { id: "certificates" as TabType, label: "Sertifikalar" },
  ]

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="border-b border-input-border mb-10">
        <nav aria-label="Tabs" className="flex gap-10 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 text-lg whitespace-nowrap transition-all border-b-2 ${activeTab === tab.id
                  ? "border-primary text-primary font-display font-bold"
                  : "border-transparent text-text-muted hover:text-text-main hover:border-text-muted font-medium"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-8 text-text-main/90 leading-relaxed">
          {activeTab === "description" && (
            <DescriptionTab product={product} />
          )}
          {activeTab === "specs" && <SpecsTab product={product} />}
          {activeTab === "shipping" && <ShippingTab />}
          {activeTab === "certificates" && <CertificatesTab />}
        </div>

        {/* Documents Sidebar */}
        <div className="lg:col-span-1">
          <DocumentsSidebar />
        </div>
      </div>
    </div>
  )
}

const DescriptionTab = ({ product }: { product: HttpTypes.StoreProduct }) => {
  return (
    <>
      <h3 className="text-2xl font-display font-bold text-text-main">
        Doğal Lezzet, Geleneksel Hasat
      </h3>
      <p>
        Güneydoğu Anadolu'nun kayalık arazilerindeki yabani bitkilerden hasat
        edilen ürünümüz, canlı rengi ve parlak, ekşimsi asiditesiyle bilinen
        temel bir baharattır. Piyasadaki sıradan ürünlerin aksine, ürünümüz
        %100 saf meyvedir; ağırlığı artırmak için tuzla karıştırılmaz. Uçucu
        yağlarını ve lezzet bütünlüğünü koruyacak şekilde özenle işlenir.
      </p>

      <div className="grid md:grid-cols-2 gap-8 my-8">
        <div className="bg-white p-6 rounded-2xl border border-input-border">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
            <span className="material-symbols-outlined">restaurant</span>
          </div>
          <h4 className="font-display font-bold text-lg mb-2 text-text-main">
            Mutfak Kullanımı
          </h4>
          <ul className="space-y-2 text-sm text-text-muted">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span> Kuzu ve balık
              marinasyonları
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span> Orijinal Za'atar karışımı
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span> Salata ve meze süslemeleri
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-input-border">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
            <span className="material-symbols-outlined">verified</span>
          </div>
          <h4 className="font-display font-bold text-lg mb-2 text-text-main">
            Kalite Standartları
          </h4>
          <ul className="space-y-2 text-sm text-text-muted">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span> GDO'suz & Doğal
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span> Helal ve Koşer Sertifikalı
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span> Tuz ve katkı maddesi
              içermez
            </li>
          </ul>
        </div>
      </div>

      <p>
        Mükemmel bir asidite dengeleyicidir; genellikle limon suyu veya sirke
        yerine doğal bir alternatif olarak kullanılır. Humus, ızgara etler ve
        özellikle soğan salatalarında o imza lezzeti yaratır.
      </p>
    </>
  )
}

const SpecsTab = ({ product }: { product: HttpTypes.StoreProduct }) => {
  return (
    <>
      <h3 className="text-2xl font-display font-bold text-text-main">
        Teknik Özellikler
      </h3>
      <div className="bg-white rounded-2xl border border-input-border overflow-hidden">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-input-border">
            <tr>
              <td className="px-6 py-4 text-text-muted font-medium">Ürün Adı</td>
              <td className="px-6 py-4 text-text-main font-medium">
                {product.title}
              </td>
            </tr>
            {product.origin_country && (
              <tr>
                <td className="px-6 py-4 text-text-muted font-medium">Menşei</td>
                <td className="px-6 py-4 text-text-main font-medium">
                  {product.origin_country}
                </td>
              </tr>
            )}
            {product.material && (
              <tr>
                <td className="px-6 py-4 text-text-muted font-medium">
                  Malzeme
                </td>
                <td className="px-6 py-4 text-text-main font-medium">
                  {product.material}
                </td>
              </tr>
            )}
            {product.weight && (
              <tr>
                <td className="px-6 py-4 text-text-muted font-medium">
                  Ağırlık
                </td>
                <td className="px-6 py-4 text-text-main font-medium">
                  {product.weight}g
                </td>
              </tr>
            )}
            <tr>
              <td className="px-6 py-4 text-text-muted font-medium">Raf Ömrü</td>
              <td className="px-6 py-4 text-text-main font-medium">24 Ay</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-text-muted font-medium">
                Saklama Koşulları
              </td>
              <td className="px-6 py-4 text-text-main font-medium">
                Serin ve kuru ortamda saklayın
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

const ShippingTab = () => {
  return (
    <>
      <h3 className="text-2xl font-display font-bold text-text-main">
        Kargo & Depolama
      </h3>

      <div className="space-y-6">
        <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-input-border">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent shrink-0">
            <span className="material-symbols-outlined">local_shipping</span>
          </div>
          <div>
            <h4 className="font-bold text-text-main mb-1">Hızlı Teslimat</h4>
            <p className="text-text-muted text-sm">
              Siparişleriniz 1-3 iş günü içinde kargoya verilir. Türkiye
              genelinde 3-5 iş günü içinde teslimat sağlanır.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-input-border">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent shrink-0">
            <span className="material-symbols-outlined">inventory_2</span>
          </div>
          <div>
            <h4 className="font-bold text-text-main mb-1">Güvenli Paketleme</h4>
            <p className="text-text-muted text-sm">
              Tüm ürünlerimiz nem ve ışıktan koruyucu ambalajlarda, hava
              geçirmez kutularda gönderilir.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-input-border">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent shrink-0">
            <span className="material-symbols-outlined">cached</span>
          </div>
          <div>
            <h4 className="font-bold text-text-main mb-1">Kolay İade</h4>
            <p className="text-text-muted text-sm">
              Hasarlı veya beklentilerinizi karşılamayan ürünleri 14 gün içinde
              iade edebilirsiniz. Ücretsiz iade kargo hizmeti sunuyoruz.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

const CertificatesTab = () => {
  return (
    <>
      <h3 className="text-2xl font-display font-bold text-text-main">
        Sertifikalar
      </h3>
      <p className="text-text-muted">
        Tüm ürünlerimiz uluslararası gıda güvenliği standartlarına uygundur ve
        düzenli olarak denetlenmektedir.
      </p>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-input-border text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-3xl text-green-600">
              eco
            </span>
          </div>
          <h4 className="font-bold text-text-main mb-1">Organik Sertifika</h4>
          <p className="text-sm text-text-muted">
            Avrupa Organik Tarım Standartları
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-input-border text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-3xl text-blue-600">
              verified
            </span>
          </div>
          <h4 className="font-bold text-text-main mb-1">ISO 22000</h4>
          <p className="text-sm text-text-muted">Gıda Güvenliği Yönetim Sistemi</p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-input-border text-center">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-3xl text-emerald-600">
              mosque
            </span>
          </div>
          <h4 className="font-bold text-text-main mb-1">Helal Sertifika</h4>
          <p className="text-sm text-text-muted">Uluslararası Helal Standartları</p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-input-border text-center">
          <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-3xl text-purple-600">
              star_of_david
            </span>
          </div>
          <h4 className="font-bold text-text-main mb-1">Koşer Sertifika</h4>
          <p className="text-sm text-text-muted">Yahudi Dini Standartları</p>
        </div>
      </div>
    </>
  )
}

const DocumentsSidebar = () => {
  return (
    <div className="bg-white p-8 rounded-2xl border border-input-border sticky top-32">
      <h4 className="font-display font-bold text-lg mb-6 text-text-main">
        Dokümanlar
      </h4>
      <div className="space-y-4">
        <a
          href="#"
          className="flex items-center gap-4 p-4 bg-surface-off rounded-xl hover:shadow-md transition-all group border border-transparent hover:border-primary/20"
        >
          <div className="w-10 h-10 bg-red-50 text-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined">picture_as_pdf</span>
          </div>
          <div>
            <p className="font-bold text-sm text-text-main group-hover:text-primary transition-colors">
              Teknik Bilgi Formu
            </p>
            <p className="text-xs text-text-muted">PDF • 1.2 MB</p>
          </div>
        </a>
        <a
          href="#"
          className="flex items-center gap-4 p-4 bg-surface-off rounded-xl hover:shadow-md transition-all group border border-transparent hover:border-primary/20"
        >
          <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined">science</span>
          </div>
          <div>
            <p className="font-bold text-sm text-text-main group-hover:text-primary transition-colors">
              Analiz Sertifikası
            </p>
            <p className="text-xs text-text-muted">PDF • 850 KB</p>
          </div>
        </a>
      </div>
    </div>
  )
}

export default ProductTabs
