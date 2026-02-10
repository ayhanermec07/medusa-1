// B2B Tam Kurulum Scripti
// Admin API kullanarak: Sales Channel, Ürün, Price List, Customer Group oluşturur
const BACKEND_URL = "http://localhost:9000";
const PK = "pk_3594a4f30a889df48e8f2ae50c19868069c0d2597568b5098aafc40a892f34a0";

async function adminLogin() {
    // Admin auth token al
    const res = await fetch(`${BACKEND_URL}/auth/user/emailpass`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "admin@medusajs.com", password: "supersecret" })
    });
    if (!res.ok) throw new Error("Admin login failed: " + res.status + " " + await res.text());
    const data = await res.json();
    return data.token;
}

async function seed() {
    console.log("=== B2B Tam Kurulum Başlıyor ===\n");

    // 1. Admin Login
    const token = await adminLogin();
    console.log("✓ Admin girişi başarılı");
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    };

    // 2. Sales Channel bul veya oluştur
    let scId;
    const scList = await fetch(`${BACKEND_URL}/admin/sales-channels`, { headers }).then(r => r.json());
    if (scList.sales_channels && scList.sales_channels.length > 0) {
        scId = scList.sales_channels[0].id;
        console.log("✓ Mevcut Sales Channel bulundu:", scId);
    } else {
        const scRes = await fetch(`${BACKEND_URL}/admin/sales-channels`, {
            method: "POST", headers,
            body: JSON.stringify({ name: "Default Sales Channel", description: "Varsayılan kanal" })
        }).then(r => r.json());
        scId = scRes.sales_channel.id;
        console.log("✓ Sales Channel oluşturuldu:", scId);
    }

    // 3. Publishable Key'i Sales Channel'a bağla
    const pkList = await fetch(`${BACKEND_URL}/admin/api-keys`, { headers }).then(r => r.json());
    const pk = pkList.api_keys?.find(k => k.token === PK);
    if (pk) {
        try {
            await fetch(`${BACKEND_URL}/admin/api-keys/${pk.id}/sales-channels`, {
                method: "POST", headers,
                body: JSON.stringify({ add: [scId] })
            });
            console.log("✓ Publishable Key → Sales Channel bağlantısı yapıldı");
        } catch (e) {
            console.log("⚠ PK-SC bağlantısı zaten mevcut olabilir");
        }
    } else {
        console.log("⚠ Publishable Key bulunamadı, store API çalışmayabilir");
    }

    // 4. Region kontrol et (Türkiye)
    const regionList = await fetch(`${BACKEND_URL}/admin/regions`, { headers }).then(r => r.json());
    let regionId;
    if (regionList.regions && regionList.regions.length > 0) {
        const trRegion = regionList.regions.find(r => r.currency_code === "try") || regionList.regions[0];
        regionId = trRegion.id;
        console.log("✓ Region bulundu:", trRegion.name, "(", trRegion.currency_code, ")");
    } else {
        console.log("⚠ Region bulunamadı! Ürün fiyatlandırması çalışmayabilir.");
    }

    // 5. Ürün oluştur
    let productId, variantId;
    const prodList = await fetch(`${BACKEND_URL}/admin/products`, { headers }).then(r => r.json());
    if (prodList.products && prodList.products.length > 0) {
        const p = prodList.products[0];
        productId = p.id;
        variantId = p.variants?.[0]?.id;
        console.log("✓ Mevcut ürün bulundu:", p.title, "/ Variant:", variantId);
    } else {
        const prodBody = {
            title: "Karabiber - Premium",
            handle: "karabiber-premium",
            status: "published",
            options: [{ title: "Ağırlık", values: ["250g", "500g", "1kg"] }],
            variants: [
                {
                    title: "250g",
                    options: { "Ağırlık": "250g" },
                    prices: [{ currency_code: "try", amount: 7500 }], // 75 TL
                    manage_inventory: false
                },
                {
                    title: "500g",
                    options: { "Ağırlık": "500g" },
                    prices: [{ currency_code: "try", amount: 14000 }], // 140 TL
                    manage_inventory: false
                },
                {
                    title: "1kg",
                    options: { "Ağırlık": "1kg" },
                    prices: [{ currency_code: "try", amount: 25000 }], // 250 TL
                    manage_inventory: false
                }
            ],
            sales_channels: [{ id: scId }]
        };
        const prodRes = await fetch(`${BACKEND_URL}/admin/products`, {
            method: "POST", headers,
            body: JSON.stringify(prodBody)
        });
        const prodData = await prodRes.json();
        if (!prodRes.ok) {
            console.error("✗ Ürün oluşturulamadı:", JSON.stringify(prodData));
            return;
        }
        productId = prodData.product.id;
        variantId = prodData.product.variants?.[0]?.id;
        console.log("✓ Ürün oluşturuldu:", prodData.product.title, "/ Variant:", variantId);
    }

    // 6. Customer Group oluştur
    let groupId;
    const grpList = await fetch(`${BACKEND_URL}/admin/customer-groups`, { headers }).then(r => r.json());
    const existingGrp = grpList.customer_groups?.find(g => g.name === "B2B_Dealers");
    if (existingGrp) {
        groupId = existingGrp.id;
        console.log("✓ Mevcut Customer Group bulundu:", groupId);
    } else {
        const grpRes = await fetch(`${BACKEND_URL}/admin/customer-groups`, {
            method: "POST", headers,
            body: JSON.stringify({ name: "B2B_Dealers" })
        }).then(r => r.json());
        groupId = grpRes.customer_group.id;
        console.log("✓ Customer Group oluşturuldu:", groupId);
    }

    // 7. Price List oluştur (B2B indirimli fiyat)
    let plId;
    const plList = await fetch(`${BACKEND_URL}/admin/price-lists`, { headers }).then(r => r.json());
    const existingPl = plList.price_lists?.find(p => p.title === "B2B Dealer Prices");
    if (existingPl) {
        plId = existingPl.id;
        console.log("✓ Mevcut Price List bulundu:", plId);
    } else {
        // Price List oluştur - Customer Group'a bağlı
        const plBody = {
            title: "B2B Dealer Prices",
            description: "B2B bayi fiyatları - %40 indirimli",
            type: "sale",
            status: "active",
            rules: {
                customer_group_id: [groupId] // Bu price list sadece B2B müşterilerine uygulanır
            }
        };
        const plRes = await fetch(`${BACKEND_URL}/admin/price-lists`, {
            method: "POST", headers,
            body: JSON.stringify(plBody)
        });
        const plData = await plRes.json();
        if (!plRes.ok) {
            console.error("✗ Price List oluşturulamadı:", JSON.stringify(plData));
        } else {
            plId = plData.price_list.id;
            console.log("✓ Price List oluşturuldu:", plId);
        }
    }

    // 8. Price List'e B2B fiyat ekle
    if (plId && variantId) {
        // Tüm variantlar için B2B fiyat ekle
        const prodDetail = await fetch(`${BACKEND_URL}/admin/products/${productId}`, { headers }).then(r => r.json());
        const variants = prodDetail.product?.variants || [];

        const b2bPrices = variants.map(v => {
            // Orijinal fiyatın %40 indirimi            
            const originalPrice = v.prices?.find(p => p.currency_code === "try");
            const discountedAmount = originalPrice ? Math.round(originalPrice.amount * 0.6) : 5000;
            return {
                variant_id: v.id,
                currency_code: "try",
                amount: discountedAmount
            };
        });

        const addPriceRes = await fetch(`${BACKEND_URL}/admin/price-lists/${plId}/prices`, {
            method: "POST", headers,
            body: JSON.stringify({ prices: b2bPrices })
        });

        if (addPriceRes.ok) {
            console.log("✓ B2B fiyatları eklendi:");
            b2bPrices.forEach(p => {
                console.log(`  - Variant ${p.variant_id}: ${(p.amount / 100).toFixed(2)} TL`);
            });
        } else {
            const errText = await addPriceRes.text();
            console.error("✗ B2B fiyat eklenemedi:", errText);
        }
    }

    // 9. Test B2B kullanıcısı kontrol et ve gruba ekle
    const custList = await fetch(`${BACKEND_URL}/admin/customers?q=b2b_test@example.com`, { headers }).then(r => r.json());
    if (custList.customers && custList.customers.length > 0) {
        const customer = custList.customers[0];
        // Gruba ekle
        const assignRes = await fetch(`${BACKEND_URL}/admin/customer-groups/${groupId}/customers`, {
            method: "POST", headers,
            body: JSON.stringify({ add: [customer.id] })
        });
        if (assignRes.ok) {
            console.log("✓ Kullanıcı B2B grubuna eklendi:", customer.email);
        } else {
            console.log("⚠ Kullanıcı gruba eklenemedi (zaten ekli olabilir)");
        }
    } else {
        console.log("⚠ b2b_test@example.com bulunamadı. Önce register-b2b-user.js çalıştırın.");
    }

    console.log("\n=== B2B Kurulum Tamamlandı ===");
    console.log("\nÖzet:");
    console.log(`  Sales Channel: ${scId}`);
    console.log(`  Ürün: ${productId}`);
    console.log(`  Customer Group: ${groupId}`);
    console.log(`  Price List: ${plId}`);
}

seed().catch(e => { console.error("HATA:", e.message); process.exit(1); });
