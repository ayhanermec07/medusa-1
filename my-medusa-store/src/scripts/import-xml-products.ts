import { ExecArgs, CreateInventoryLevelInput } from "@medusajs/framework/types";
import {
    ContainerRegistrationKeys,
    Modules,
    ProductStatus,
} from "@medusajs/framework/utils";
import {
    createProductCategoriesWorkflow,
    createProductsWorkflow,
    createInventoryLevelsWorkflow,
} from "@medusajs/medusa/core-flows";

// XML feed URL'si
const XML_FEED_URL = "http://panel.efsanebaharat.com/urunler.xml";

// XML'den ürün alanlarını çıkaran yardımcı fonksiyon
interface XmlProduct {
    productCode: string;
    name: string;
    mainCategory: string;
    mainCategoryId: string;
    category: string;
    categoryId: string;
    price: number;
    tax: number;
    stock: number;
    brand: string;
    images: string[];
    description: string;
}

// Basit XML tag'i parse eden yardımcı fonksiyon (ek bağımlılık gerektirmez)
function getTagValue(xml: string, tag: string): string {
    const regex = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`);
    const match = xml.match(regex);
    return match ? match[1].trim() : "";
}

// XML'deki tüm Product bloklarını ayıklayan fonksiyon
function parseProducts(xmlContent: string): XmlProduct[] {
    const products: XmlProduct[] = [];
    const productBlocks = xmlContent.split("<Product>");

    for (let i = 1; i < productBlocks.length; i++) {
        const block = productBlocks[i];
        const productCode = getTagValue(block, "Product_code");
        const name = getTagValue(block, "Name");
        const mainCategory = getTagValue(block, "mainCategory");
        const mainCategoryId = getTagValue(block, "mainCategory_id");
        const category = getTagValue(block, "category");
        const categoryId = getTagValue(block, "category_id");
        const priceStr = getTagValue(block, "Price");
        const taxStr = getTagValue(block, "Tax");
        const stockStr = getTagValue(block, "Stock");
        const brand = getTagValue(block, "Brand");
        const description = getTagValue(block, "Description");

        // Görselleri topla (boş olmayanlar)
        const images: string[] = [];
        for (let imgIdx = 1; imgIdx <= 5; imgIdx++) {
            const imgUrl = getTagValue(block, `Image${imgIdx}`);
            if (imgUrl && imgUrl.length > 0) {
                images.push(imgUrl);
            }
        }

        // Geçersiz ürünleri atla
        if (!productCode || !name) continue;

        products.push({
            productCode,
            name,
            mainCategory: mainCategory || "Genel",
            mainCategoryId: mainCategoryId || "0",
            category: category || "",
            categoryId: categoryId || "",
            price: parseFloat(priceStr) || 0,
            tax: parseInt(taxStr) || 0,
            stock: parseInt(stockStr) || 0,
            brand,
            images,
            description,
        });
    }

    return products;
}

// Türkçe karakterleri handle-uyumlu slug'a çeviren fonksiyon
function slugify(text: string): string {
    const trMap: Record<string, string> = {
        ç: "c", Ç: "c", ğ: "g", Ğ: "g", ı: "i", İ: "i",
        ö: "o", Ö: "o", ş: "s", Ş: "s", ü: "u", Ü: "u",
    };

    let slug = text.toLowerCase();
    for (const [tr, en] of Object.entries(trMap)) {
        slug = slug.replace(new RegExp(tr, "g"), en);
    }
    slug = slug
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");

    return slug;
}

export default async function importXmlProducts({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    const query = container.resolve(ContainerRegistrationKeys.QUERY);
    const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
    const productModuleService = container.resolve(Modules.PRODUCT);

    logger.info("=== XML Ürün Import İşlemi Başlıyor ===");

    // 1. XML feed'ini çek
    logger.info(`XML feed çekiliyor: ${XML_FEED_URL}`);
    let xmlContent: string;
    try {
        const response = await fetch(XML_FEED_URL);
        if (!response.ok) {
            throw new Error(`HTTP hata: ${response.status}`);
        }
        xmlContent = await response.text();
        logger.info("XML feed başarıyla indirildi.");
    } catch (error) {
        logger.error(`XML feed indirilemedi: ${error}`);
        return;
    }

    // 2. XML'i parse et
    const xmlProducts = parseProducts(xmlContent);
    logger.info(`Toplam ${xmlProducts.length} ürün XML'den parse edildi.`);

    if (xmlProducts.length === 0) {
        logger.warn("Hiç ürün bulunamadı, işlem sonlandırılıyor.");
        return;
    }

    // 3. Mevcut ürünleri SKU bazlı kontrol et (çift kayıt önleme)
    logger.info("Mevcut ürünler kontrol ediliyor...");
    const existingProducts = await productModuleService.listProducts(
        {},
        { take: 5000, select: ["id"] }
    );
    const { data: existingVariants } = await query.graph({
        entity: "product_variant",
        fields: ["sku"],
    });
    const existingSkus = new Set(
        existingVariants
            .filter((v: any) => v.sku)
            .map((v: any) => v.sku)
    );
    logger.info(`Veritabanında ${existingSkus.size} mevcut SKU bulundu.`);

    // Sadece yeni ürünleri filtrele
    const newProducts = xmlProducts.filter(
        (p) => !existingSkus.has(p.productCode)
    );
    logger.info(
        `${xmlProducts.length - newProducts.length} ürün zaten mevcut, ${newProducts.length} yeni ürün eklenecek.`
    );

    if (newProducts.length === 0) {
        logger.info("Tüm ürünler zaten mevcut. İşlem tamamlandı.");
        return;
    }

    // 4. Default Sales Channel'ı bul
    const salesChannels = await salesChannelModuleService.listSalesChannels({
        name: "Default Sales Channel",
    });
    if (!salesChannels.length) {
        logger.error("Default Sales Channel bulunamadı! Önce seed scriptini çalıştırın.");
        return;
    }
    const defaultSalesChannelId = salesChannels[0].id;

    // 5. Shipping profile bul
    const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);
    const shippingProfiles = await fulfillmentModuleService.listShippingProfiles({
        type: "default",
    });
    if (!shippingProfiles.length) {
        logger.error("Varsayılan Shipping Profile bulunamadı!");
        return;
    }
    const shippingProfileId = shippingProfiles[0].id;

    // 6. Kategorileri oluştur
    logger.info("Kategoriler oluşturuluyor...");

    // Mevcut kategorileri kontrol et
    const existingCategories = await productModuleService.listProductCategories(
        {},
        { take: 500, select: ["id", "name", "parent_category_id"] }
    );
    const existingCategoryNames = new Map(
        existingCategories.map((c: any) => [c.name, c.id])
    );

    // Ana kategorileri topla (benzersiz)
    const mainCategoryMap = new Map<string, string>();
    const subCategoryMap = new Map<string, { name: string; parentName: string }>();

    for (const product of newProducts) {
        if (product.mainCategory && !mainCategoryMap.has(product.mainCategory)) {
            mainCategoryMap.set(product.mainCategory, product.mainCategoryId);
        }
        if (product.category && !subCategoryMap.has(`${product.mainCategory}>${product.category}`)) {
            subCategoryMap.set(`${product.mainCategory}>${product.category}`, {
                name: product.category,
                parentName: product.mainCategory,
            });
        }
    }

    // Önce ana kategorileri oluştur (mevcut olmayanları)
    const newMainCategories = Array.from(mainCategoryMap.keys()).filter(
        (name) => !existingCategoryNames.has(name)
    );

    // Ana kategori ID'leri haritası
    const categoryIdMap = new Map<string, string>(existingCategoryNames);

    if (newMainCategories.length > 0) {
        logger.info(`${newMainCategories.length} yeni ana kategori oluşturuluyor...`);
        const { result: mainCatResult } = await createProductCategoriesWorkflow(
            container
        ).run({
            input: {
                product_categories: newMainCategories.map((name) => ({
                    name,
                    is_active: true,
                    is_internal: false,
                })),
            },
        });

        for (const cat of mainCatResult) {
            categoryIdMap.set(cat.name, cat.id);
        }
        logger.info("Ana kategoriler oluşturuldu.");
    }

    // Sonra alt kategorileri oluştur (mevcut olmayanları)
    const newSubCategories = Array.from(subCategoryMap.values()).filter(
        (sub) => !existingCategoryNames.has(sub.name)
    );

    if (newSubCategories.length > 0) {
        logger.info(`${newSubCategories.length} yeni alt kategori oluşturuluyor...`);
        // Alt kategorileri tek tek oluştur (parent_category_id gerekli)
        for (const sub of newSubCategories) {
            const parentId = categoryIdMap.get(sub.parentName);
            if (!parentId) {
                logger.warn(`Üst kategori bulunamadı: ${sub.parentName}, alt kategori: ${sub.name}`);
                continue;
            }

            try {
                const { result: subCatResult } = await createProductCategoriesWorkflow(
                    container
                ).run({
                    input: {
                        product_categories: [
                            {
                                name: sub.name,
                                parent_category_id: parentId,
                                is_active: true,
                                is_internal: false,
                            },
                        ],
                    },
                });
                categoryIdMap.set(sub.name, subCatResult[0].id);
            } catch (err) {
                logger.warn(`Alt kategori oluşturulamadı: ${sub.name} - ${err}`);
            }
        }
        logger.info("Alt kategoriler oluşturuldu.");
    }

    // 7. Ürünleri batch halinde oluştur (her batch'te 10 ürün)
    const BATCH_SIZE = 10;
    const totalBatches = Math.ceil(newProducts.length / BATCH_SIZE);
    let createdCount = 0;

    for (let batchIdx = 0; batchIdx < totalBatches; batchIdx++) {
        const batchStart = batchIdx * BATCH_SIZE;
        const batchEnd = Math.min(batchStart + BATCH_SIZE, newProducts.length);
        const batch = newProducts.slice(batchStart, batchEnd);

        logger.info(
            `Batch ${batchIdx + 1}/${totalBatches} işleniyor (${batch.length} ürün)...`
        );

        // Her ürün için Medusa product objesi oluştur
        const medusaProducts = batch.map((xmlProd) => {
            // Kategori ID'lerini bul
            const categoryIds: string[] = [];
            if (xmlProd.category && categoryIdMap.has(xmlProd.category)) {
                categoryIds.push(categoryIdMap.get(xmlProd.category)!);
            } else if (xmlProd.mainCategory && categoryIdMap.has(xmlProd.mainCategory)) {
                categoryIds.push(categoryIdMap.get(xmlProd.mainCategory)!);
            }

            // Görselleri hazırla
            const images = xmlProd.images.map((url) => ({ url }));

            // Handle oluştur (benzersiz olması için productCode ekle)
            const handle = slugify(`${xmlProd.name}-${xmlProd.productCode}`);

            // Fiyatı kuruş cinsine çevir (Medusa v2 kuruş/pennies kullanır)
            // XML'deki fiyat KG fiyatıdır, TRY cinsinden
            const priceInCents = Math.round(xmlProd.price * 100);

            return {
                title: xmlProd.name,
                handle,
                description: xmlProd.description || `${xmlProd.name} - Efsane Baharat`,
                status: ProductStatus.PUBLISHED,
                shipping_profile_id: shippingProfileId,
                category_ids: categoryIds,
                images,
                // Ürünün meta verilerine kaynak bilgilerini ekle
                metadata: {
                    xml_product_code: xmlProd.productCode,
                    xml_main_category: xmlProd.mainCategory,
                    xml_category: xmlProd.category,
                    xml_brand: xmlProd.brand,
                    xml_tax_rate: xmlProd.tax,
                },
                options: [
                    {
                        title: "Birim",
                        values: ["1 KG"],
                    },
                ],
                variants: [
                    {
                        title: `${xmlProd.name} - 1 KG`,
                        sku: xmlProd.productCode,
                        manage_inventory: true,
                        options: {
                            Birim: "1 KG",
                        },
                        prices: [
                            {
                                amount: priceInCents,
                                currency_code: "try",
                            },
                        ],
                    },
                ],
                sales_channels: [
                    {
                        id: defaultSalesChannelId,
                    },
                ],
            };
        });

        try {
            await createProductsWorkflow(container).run({
                input: {
                    products: medusaProducts,
                },
            });
            createdCount += batch.length;
            logger.info(
                `Batch ${batchIdx + 1} tamamlandı. Toplam ${createdCount}/${newProducts.length} ürün oluşturuldu.`
            );
        } catch (error) {
            logger.error(`Batch ${batchIdx + 1} hatası: ${error}`);
            // Hata olursa tek tek dene
            for (const product of medusaProducts) {
                try {
                    await createProductsWorkflow(container).run({
                        input: {
                            products: [product],
                        },
                    });
                    createdCount++;
                    logger.info(`Ürün oluşturuldu: ${product.title}`);
                } catch (singleError) {
                    logger.error(
                        `Ürün oluşturulamadı: ${product.title} - ${singleError}`
                    );
                }
            }
        }
    }

    // 8. Stok seviyelerini ayarla
    logger.info("Stok seviyeleri güncelleniyor...");

    // Stok lokasyonunu bul
    const storeModuleService = container.resolve(Modules.STORE);
    const [store] = await storeModuleService.listStores();

    let stockLocationId: string | null = null;
    if ((store as any).default_location_id) {
        stockLocationId = (store as any).default_location_id;
    } else {
        // Fallback: ilk stock location'ı kullan
        const stockLocationModule = container.resolve(Modules.STOCK_LOCATION);
        const locations = await stockLocationModule.listStockLocations({});
        if (locations.length > 0) {
            stockLocationId = locations[0].id;
        }
    }

    if (stockLocationId) {
        // Yeni oluşturulan ürünlerin inventory item'larını bul
        const { data: allInventoryItems } = await query.graph({
            entity: "inventory_item",
            fields: ["id", "sku"],
        });

        // XML ürünleriyle eşleştir ve stok seviyelerini oluştur
        const newSkuSet = new Set(newProducts.map((p) => p.productCode));
        const stockMap = new Map(newProducts.map((p) => [p.productCode, p.stock]));

        const inventoryLevels: CreateInventoryLevelInput[] = [];
        for (const item of allInventoryItems) {
            if (item.sku && newSkuSet.has(item.sku)) {
                inventoryLevels.push({
                    location_id: stockLocationId,
                    stocked_quantity: stockMap.get(item.sku) || 0,
                    inventory_item_id: item.id,
                });
            }
        }

        if (inventoryLevels.length > 0) {
            try {
                await createInventoryLevelsWorkflow(container).run({
                    input: {
                        inventory_levels: inventoryLevels,
                    },
                });
                logger.info(`${inventoryLevels.length} ürünün stok seviyesi güncellendi.`);
            } catch (error) {
                logger.error(`Stok güncelleme hatası: ${error}`);
            }
        }
    } else {
        logger.warn("Stock location bulunamadı, stok seviyeleri ayarlanmadı.");
    }

    logger.info("=== XML Ürün Import İşlemi Tamamlandı ===");
    logger.info(`Toplam ${createdCount} yeni ürün eklendi.`);
}
