// DOĞRU ATTRIBUTE İLE Price List fiyatlarını düzelt
// Medusa v2 migration: customer_group_id → customer.groups.id 
const BACKEND_URL = "http://localhost:9000";
const PL_ID = "plist_01KH4QD0ZYVHMFGH2Q7VF08RCF";
const GROUP_ID = "cusgroup_01KH4QD0YG0K65ZF0RV2202JR1";

async function fix() {
    console.log("=== DOĞRU ATTRIBUTE ile Price List Düzeltme ===\n");

    const loginRes = await fetch(`${BACKEND_URL}/auth/user/emailpass`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "admin@medusajs.com", password: "supersecret" })
    });
    const { token } = await loginRes.json();
    const headers = { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" };

    // 1. Eski fiyatları sil
    const plRes = await fetch(`${BACKEND_URL}/admin/price-lists/${PL_ID}?fields=*prices`, { headers });
    const plData = await plRes.json();
    const existingPrices = plData.price_list?.prices || [];

    if (existingPrices.length > 0) {
        console.log(`1. ${existingPrices.length} eski fiyatı siliyorum...`);
        await fetch(`${BACKEND_URL}/admin/price-lists/${PL_ID}/prices/batch`, {
            method: "POST", headers,
            body: JSON.stringify({ delete: existingPrices.map(p => p.id) })
        });
        console.log("   ✓ Silindi\n");
    }

    // 2. Price List kurallarını güncelle - customer.groups.id
    console.log("2. Price List kurallarını güncelliyorum (customer.groups.id)...");
    const updatePlRes = await fetch(`${BACKEND_URL}/admin/price-lists/${PL_ID}`, {
        method: "POST", headers,
        body: JSON.stringify({
            rules: {
                "customer.groups.id": [GROUP_ID]
            }
        })
    });
    if (updatePlRes.ok) {
        const updated = await updatePlRes.json();
        console.log("   ✓ Kurallar güncellendi:", JSON.stringify(updated.price_list?.rules));
    } else {
        console.log("   ✗ Güncelleme başarısız:", (await updatePlRes.text()).substring(0, 300));
    }

    // 3. Ürünleri al
    const prodRes = await fetch(`${BACKEND_URL}/admin/products?fields=*variants.prices`, { headers });
    const product = (await prodRes.json()).products?.[0];
    if (!product) { console.error("Ürün bulunamadı!"); return; }

    const variants = product.variants || [];
    console.log(`\n3. Ürün: ${product.title}, ${variants.length} variant`);

    // 4. Yeni fiyatları DOĞRU ATTRIBUTE ile ekle
    console.log("\n4. Fiyatları 'customer.groups.id' kuralıyla ekliyorum...");
    const newPrices = variants.map(v => {
        const original = v.prices?.find(p => p.currency_code === "try");
        const amount = Math.round((original?.amount || 10000) * 0.6);
        console.log(`   - ${v.title}: ${(original?.amount || 10000) / 100} TL → B2B: ${amount / 100} TL`);
        return {
            variant_id: v.id,
            currency_code: "try",
            amount: amount,
            rules: {
                "customer.groups.id": GROUP_ID
            }
        };
    });

    const createRes = await fetch(`${BACKEND_URL}/admin/price-lists/${PL_ID}/prices/batch`, {
        method: "POST", headers,
        body: JSON.stringify({ create: newPrices })
    });

    if (createRes.ok) {
        const result = await createRes.json();
        console.log("\n   ✓ Fiyatlar eklendi!");
        result.created?.forEach(p => {
            console.log(`   - ${p.currency_code} ${p.amount}, rules:`, JSON.stringify(p.price_rules));
        });
    } else {
        console.log("   ✗ Ekleme başarısız:", (await createRes.text()).substring(0, 500));
    }

    // 5. Son kontrol
    console.log("\n5. Son durum:");
    const final = await fetch(`${BACKEND_URL}/admin/price-lists/${PL_ID}?fields=*prices,*prices.price_rules`, { headers }).then(r => r.json());
    console.log("   Rules:", JSON.stringify(final.price_list?.rules));
    console.log("   Fiyat sayısı:", final.price_list?.prices?.length);
    final.price_list?.prices?.forEach(p => {
        console.log(`   - ${p.amount} ${p.currency_code} | rules: ${JSON.stringify(p.rules)}`);
    });
}

fix().catch(console.error);
