// Price List'teki fiyatları ve price_rules kontrolü
const BACKEND_URL = "http://localhost:9000";

async function check() {
    const loginRes = await fetch(`${BACKEND_URL}/auth/user/emailpass`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "admin@medusajs.com", password: "supersecret" })
    });
    const { token } = await loginRes.json();
    const headers = { "Authorization": `Bearer ${token}` };

    const plId = "plist_01KH4QD0ZYVHMFGH2Q7VF08RCF";

    // Price list fiyatları - detaylı 
    console.log("--- Price List Detay (fiyatlar dahil) ---");
    const plRes = await fetch(`${BACKEND_URL}/admin/price-lists/${plId}?fields=*prices,*prices.price_rules`, { headers });
    const plData = await plRes.json();
    console.log(JSON.stringify(plData, null, 2));

    // Price Set ve Prices kontrolü - raw pricing
    console.log("\n--- Ürün Variant Price Sets ---");
    const prodRes = await fetch(`${BACKEND_URL}/admin/products?fields=*variants.prices`, { headers });
    const prodData = await prodRes.json();
    const product = prodData.products?.[0];
    if (product) {
        product.variants?.forEach(v => {
            console.log(`\nVariant: ${v.title} (${v.id})`);
            v.prices?.forEach(p => {
                console.log(`  Price: ${p.amount} ${p.currency_code} (id: ${p.id}, price_set_id: ${p.price_set_id})`);
                console.log(`  Rules:`, JSON.stringify(p.rules || p.price_rules || 'none'));
            });
        });
    }
}

check().catch(console.error);
