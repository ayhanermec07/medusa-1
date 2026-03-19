import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import { IProductModuleService, IPricingModuleService } from "@medusajs/framework/types"
import { createProductsWorkflow } from "@medusajs/medusa/core-flows"

// XML'i parse eden yardımcı fonksiyon
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

        const singleImg = get("Resim") || get("ResimUrl") || get("image_url") || get("thumbnail")
        if (singleImg && !images.includes(singleImg)) {
            images.push(singleImg)
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

const importSettings: Record<string, { xmlUrl: string; interval: string; lastRun?: string }> =
    (global as any).__xmlImportSettingsStore ||
    ((global as any).__xmlImportSettingsStore = {})

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
    res.json({ settings: importSettings["default"] || null })
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
    const body = req.body as { xmlUrl?: string; interval?: string; save?: boolean }
    const xmlUrl = body?.xmlUrl

    if (!xmlUrl) {
        return res.status(400).json({ error: "xmlUrl alanı zorunludur." })
    }

    if (body?.save) {
        importSettings["default"] = {
            xmlUrl,
            interval: body.interval || "daily",
            lastRun: importSettings["default"]?.lastRun,
        }
    }

    try {
        const fetchRes = await fetch(xmlUrl, {
            headers: { "Accept": "application/xml, text/xml, */*" },
            signal: AbortSignal.timeout(30_000),
        })
        if (!fetchRes.ok) {
            return res.status(502).json({ error: `XML kaynağına erişilemedi: HTTP ${fetchRes.status}` })
        }
        const xmlText = await fetchRes.text()
        const parsedProducts = parseXmlProducts(xmlText)

        if (parsedProducts.length === 0) {
            return res.status(422).json({ error: "XML'den hiç ürün okunamadı." })
        }

        const productService: IProductModuleService = req.scope.resolve(Modules.PRODUCT)
        const pricingService: IPricingModuleService = req.scope.resolve(Modules.PRICING)
        const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

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

        // 6. Stok lokasyonunu bul
        const inventoryService = req.scope.resolve(Modules.INVENTORY)
        const stockLocationService = req.scope.resolve(Modules.STOCK_LOCATION)
        const storeService = req.scope.resolve(Modules.STORE)

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
                    // 1. Ürünü güncelle
                    await productService.updateProducts(
                        { id: existing.productId },
                        { title: p.title, description: p.description || undefined }
                    )

                    // 2. Fiyatı güncelle
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
                            console.error("Fiyat güncelleme hatası:", p.title, priceErr)
                        }
                    }

                    // 3. Stoğu güncelle (IInventoryService API'sine uygun)
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
                            console.error("Stok güncelleme hatası:", p.title, stockErr)
                        }
                    }
                    updated++
                } else {
                    // Yeni ürün oluştur
                    const { result: createdProducts } = await createProductsWorkflow(req.scope).run({
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

                    // Yeni ürünün stoğunu ayarla
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
                            console.error("Yeni ürün stok hatası:", p.title, stockErr)
                        }
                    }
                    created++
                }
            } catch (err) {
                console.error("Ürün işleme hatası:", p.title, err)
                errors++
            }
        }

        if (importSettings["default"]) {
            importSettings["default"].lastRun = new Date().toISOString()
        }

        return res.json({
            success: true,
            summary: { total: parsedProducts.length, created, updated, errors }
        })
    } catch (error) {
        console.error("XML import hatası:", error)
        return res.status(500).json({
            error: "XML import sırasında bir hata oluştu.",
            details: error instanceof Error ? error.message : String(error)
        })
    }
}

export const PUT = async (req: MedusaRequest, res: MedusaResponse) => {
    const body = req.body as { xmlUrl?: string; interval?: string }
    if (!body?.xmlUrl) return res.status(400).json({ error: "xmlUrl zorunludur." })

    importSettings["default"] = {
        xmlUrl: body.xmlUrl,
        interval: body.interval || "daily",
        lastRun: importSettings["default"]?.lastRun,
    }
    res.json({ success: true, settings: importSettings["default"] })
}
