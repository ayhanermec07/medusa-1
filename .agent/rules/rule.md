---
trigger: always_on
---

# Efsane Baharat Projesi Kuralları ve Standartları

Bu dosya, **Efsane Baharat** e-ticaret platformunda görev alan Senior Full-Stack Developer'ların uyması gereken teknik ve iş mantığı standartlarını içerir.

## 1. Dil ve İletişim Kuralları
- **İletişim Dili:** Tüm iç yazışmalar, açıklamalar ve yönlendirmeler **TÜRKÇE** olmalıdır.
- **Kullanıcı Arayüzü (UI):** Sitedeki tüm metinler, butonlar, hata mesajları ve placeholderlar **TÜRKÇE** olmalıdır.
- **Kod Yazımı:** - Değişken, fonksiyon ve dosya isimleri İngilizce (industry standard) olmalıdır.
  - Kod içi yorumlar (comments) karmaşık mantığı açıklamak için **Türkçe** yazılmalıdır.

## 2. Teknoloji Yığını (Strict Stack)
- **Frontend:** Next.js 14+ (App Router), React Server Components (RSC).
- **Backend:** MedusaJS v2 (Headless Commerce).
- **Styling:** Tailwind CSS + Shadcn/ui.
- **State Management:** TanStack Query (React Query) ve Medusa React Hooks.

## 3. Mimari Kurallar
- **Production-Ready Kod:** Kodlar asla yarım bırakılmamalıdır (`// TODO:` veya `// rest of the code` yasaktır). Sunulan kodlar doğrudan kopyala-yapıştır ile çalışabilir olmalıdır.
- **B2B / B2C Hibrit Yapı:** - Fiyatlandırma ve sepet mantığı her zaman `customer_group` kontrolü içermelidir.
  - Kurumsal müşteriler (B2B) için farklı, son kullanıcı (B2C) için farklı fiyat politikaları uygulanır.
- **Server Components:** Veri çekme işlemleri SEO ve performans optimizasyonu için öncelikli olarak **Server Components** seviyesinde yapılmalıdır.
- **SEO:** Her sayfa için `generateMetadata` fonksiyonu kullanılmalı ve ürün sayfalarına mutlaka **JSON-LD** structured data eklenmelidir.

## 4. İş Kuralları ve Birim Yönetimi (Spice Logic)
Baharat satışına özel olarak birim ve fiyatlandırma mantığı şu şekilde kurgulanmıştır:

- **Birimler:** Satışlar **Adet**, **Kilogram (kg)** ve **Gram (g)** üzerinden yapılır.
- **Dönüşüm Mantığı:** Gram ve Kilogram geçişleri dinamik olmalıdır. 
  - Fiyat hesaplaması: $$Unit\_Price \times (Selected\_Weight / 1000)$$
- **Para Birimi:** Varsayılan TRY (₺). Format: `1.250,00 TL`.
- **KDV Yönetimi:** - **B2C:** Fiyatlar her zaman KDV dahil gösterilir.
  - **B2B:** Fiyatlar KDV hariç/dahil opsiyonuyla gösterilmeli, varsayılan görünüm KDV hariç olmalıdır.
- **Hata Yönetimi:** Boş beyaz sayfa yerine her zaman "error boundaries" ve anlamlı Türkçe hata mesajları kullanılmalıdır.



## 5. Dosya Yapısı
Proje hiyerarşisi aşağıdaki düzende korunmalıdır:

| Klasör | İçerik |
| :--- | :--- |
| `@/components/ui` | Temel atomik bileşenler (Shadcn). |
| `@/components/layout` | Sayfa iskeletleri (Header, Footer, Navbar). |
| `@/components/modules` | Karmaşık iş mantığı içeren bileşenler (ProductGrid, CartItem). |
| `@/hooks` | Özel React hook'ları ve birim dönüştürücüler. |
| `@/lib/medusa` | Medusa v2 API konfigürasyonu ve servis katmanı. |
| `@/types` | TypeScript tanımlamaları ve Interface'ler. |

---

**Not:** Bu kurallar dışına çıkıldığında sistem uyarı verecek ve geliştirme standartları korunacaktır.