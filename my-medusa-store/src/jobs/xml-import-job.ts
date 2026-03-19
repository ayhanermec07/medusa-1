import { MedusaContainer } from "@medusajs/framework"
import { IProductModuleService, IPricingModuleService } from "@medusajs/framework/types"
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { createProductsWorkflow } from "@medusajs/medusa/core-flows"

function parseXmlProducts(xmlText: string): any[] {
    const products: any[] = []
    const blockRegex = /<(?:Urun|product|Product|item|Item)>([\s\S]*?)<\/(?:Urun|product|Product|item|Item)>/gi
    let match: RegExpExecArray | null

    while ((match = blockRegex.exec(xmlText)) !== null) {
        const block = match[1]
        const get = (tag: string): string => {
            const r = new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([\\s\\S]*?))</${tag}>`, "i")
            const m = block.match(r)
            if (!m) return ""
            return (m[1] !== undefined ? m[1] : m[2] || "").trim()
        }

        const images: string[] = []
        const imgRegex = /<(?:Resim|image|Image|foto|Foto|img)[^>]*>([^<]+)<\/(?:Resim|image|Image|foto|Foto|img)>/gi
        let imgMatch: RegExpExecArray | null
        while ((imgMatch = imgRegex.exec(block)) !== null) {
            const url = imgMatch[1].trim()
            if (url) images.push(url)
        }

        const title = get("UrunAdi") || get("Ad") || get("title") || get("Title") || get("name") || ""
        if (!title) continue

        const priceStr = get("Fiyat") || get("fiyat") || get("price") || get("SatisFiyati") || "0"
        const price = Math.round(parseFloat(priceStr.replace(",", ".")) * 100) || 0
        const description = get("Aciklama") || get("aciklama") || get("description") || ""
        const sku = get("Kod") || get("SKU") || get("sku") || get("Barkod") || ""
        const barcode = get("Barkod") || get("barcode") || ""
        const stockStr = get("Stok") || get("stock") || get("Adet") || "0"
        const stock = parseInt(stockStr.replace(",", ""), 10) || 0

        products.push({ title, price, description, sku, barcode, stock, images })
    }
    return products
}

const importSettingsStore: Record<string, { xmlUrl: string; interval: string; lastRun?: string }> = (
    global as any
).__xmlImportSettingsStore ||
    ((global as any).__xmlImportSettingsStore = {})

function getIntervalMs(interval: string): number {
    const map: Record<string, number> = {
        "1h": 1 * 60 * 60 * 1000,
        "3h": 3 * 60 * 60 * 1000,
        "6h": 6 * 60 * 60 * 1000,
        "12h": 12 * 60 * 60 * 1000,
        "daily": 24 * 60 * 60 * 1000,
        "weekly": 7 * 24 * 60 * 60 * 1000,
    }
    return map[interval] ?? 24 * 60 * 60 * 1000
}

export default async function xmlImportJob(container: MedusaContainer) {
    const settings = importSettingsStore["default"]

    if (!settings || !settings.xmlUrl || settings.interval === "manual") return

    if (settings.lastRun) {
        const elapsed = Date.now() - new Date(settings.lastRun).getTime()
        const required = getIntervalMs(settings.interval)
        if (elapsed < required) return
    }

    console.log(`[xml-import-job] Zamanlanmış XML import başlıyor: ${settings.xmlUrl}`)

    try {
        const fetchRes = await fetch(settings.xmlUrl, {
            headers: { "Accept": "application/xml, text/xml, */*" },
            signal: AbortSignal.timeout(30_000),
        })
        if (!fetchRes.ok) {
            console.error(`[xml-import-job] XML kaynağına erişilemedi: HTTP ${fetchRes.status}`)
            return
        }
        const xmlText = await fetchRes.text()
        const parsedProducts = parseXmlProducts(xmlText)

        const productService: IProductModuleService = container.resolve(Modules.PRODUCT)
        const pricingService: IPricingModuleService = container.resolve(Modules.PRICING)
        const query = container.resolve(ContainerRegistrationKeys.QUERY)

        const { data: existingProducts } = await query.graph({
            entity: "product",
            fields: [
                "id",
                "title",
                "variants.*",
                "variants.price_set.*",
                "variants.inventory_items.inventory_item_id"
            ],
        })

        const skuMap = new Map<string, any>()
        for (const p of existingProducts) {
            for (const v of (p.variants || [])) {
                if (v.sku) {
                    skuMap.set(v.sku, {
                        productId: p.id,
                        variantId: v.id,
                        priceSetId: v.price_set?.id,
                        inventoryItemId: v.inventory_items?.[0]?.inventory_item_id
                    })
                }
            }
        }

        const inventoryService = container.resolve(Modules.INVENTORY)
        const stockLocationService = container.resolve(Modules.STOCK_LOCATION)
        const storeService = container.resolve(Modules.STORE)

        const [store] = await storeService.listStores()
        let stockLocationId = (store as any).default_location_id

        if (!stockLocationId) {
            const [firstLocation] = await stockLocationService.listStockLocations({}, { take: 1 })
            stockLocationId = firstLocation?.id
        }

        let created = 0, updated = 0, errors = 0

        for (const p of parsedProducts) {
            try {
                const existing = p.sku ? skuMap.get(p.sku) : undefined

                if (existing) {
                    await productService.updateProducts(
                        { id: existing.productId },
                        { title: p.title, description: p.description || undefined }
                    )

                    if (existing.priceSetId && p.price > 0) {
                        try {
                            await pricingService.updatePriceSets(
                                { id: existing.priceSetId },
                                {
                                    prices: [{
                                        currency_code: "try",
                                        amount: p.price,
                                    }]
                                }
                            )
                        } catch (priceErr) {
                            console.error("[xml-import-job] Fiyat güncelleme hatası:", p.title, priceErr)
                        }
                    }

                    if (existing.inventoryItemId && stockLocationId) {
                        try {
                            const existingLevels = await inventoryService.listInventoryLevels({
                                inventory_item_id: [existing.inventoryItemId],
                                location_id: [stockLocationId],
                            })
                            if (existingLevels.length > 0) {
                                await inventoryService.updateInventoryLevels({
                                    inventory_item_id: existing.inventoryItemId,
                                    location_id: stockLocationId,
                                    id: existingLevels[0].id,
                                    stocked_quantity: p.stock,
                                })
                            } else {
                                await inventoryService.createInventoryLevels([{
                                    inventory_item_id: existing.inventoryItemId,
                                    location_id: stockLocationId,
                                    stocked_quantity: p.stock,
                                }])
                            }
                        } catch (stockErr) {
                            console.error("[xml-import-job] Stok güncelleme hatası:", p.title, stockErr)
                        }
                    }
                    updated++
                } else {
                    const { result: createdProducts } = await createProductsWorkflow(container).run({
                        input: {
                            products: [{
                                title: p.title,
                                description: p.description || undefined,
                                status: "published" as any,
                                images: p.images.slice(0, 10).map((url: string) => ({ url })),
                                variants: [{
                                    title: "Varsayılan",
                                    sku: p.sku || undefined,
                                    barcode: p.barcode || undefined,
                                    manage_inventory: true,
                                    prices: [{ amount: p.price, currency_code: "try" }]
                                }]
                            }]
                        }
                    })

                    if (stockLocationId && createdProducts?.[0]?.variants?.[0]?.id) {
                        try {
                            const { data: variants } = await query.graph({
                                entity: "product_variant",
                                fields: ["inventory_items.inventory_item_id"],
                                filters: { id: createdProducts[0].variants[0].id }
                            })
                            const invItemId = variants?.[0]?.inventory_items?.[0]?.inventory_item_id
                            if (invItemId) {
                                await inventoryService.createInventoryLevels([{
                                    inventory_item_id: invItemId,
                                    location_id: stockLocationId,
                                    stocked_quantity: p.stock,
                                }])
                            }
                        } catch (stockErr) {
                            console.error("[xml-import-job] Yeni ürün stok hatası:", p.title, stockErr)
                        }
                    }
                    created++
                }
            } catch (err) {
                console.error("[xml-import-job] İşleme hatası:", p.title, err)
                errors++
            }
        }

        importSettingsStore["default"].lastRun = new Date().toISOString()
        console.log(`[xml-import-job] Tamamlandı - T:${parsedProducts.length} C:${created} U:${updated} E:${errors}`)
    } catch (err) {
        console.error("[xml-import-job] Genel hata:", err)
    }
}

export const config = {
    name: "xml-import-job",
    schedule: "*/30 * * * *",
}
