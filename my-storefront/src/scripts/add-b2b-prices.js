// B2B Price List'e fiyat ekleme scripti
// Medusa v2 batch endpoint kullanır
const BACKEND_URL = "http://localhost:9000";

async function adminLogin() {
    const res = await fetch(`${BACKEND_URL}/auth/user/emailpass`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "admin@medusajs.com", password: "supersecret" })
    });
    if (!res.ok) throw new Error("Admin login failed: " + res.status);
    const data = await res.json();
    return data.token;
}

async function addB2BPrices() {
    console.log("=== B2B Fiyat Ekleme Başlıyor ===\n");

    const token = await adminLogin();
    console.log("✓ Admin girişi başarılı");
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    };

    // Price List ID
    const plList = await fetch(`${BACKEND_URL}/admin/price-lists`, { headers }).then(r => r.json());
    const pl = plList.price_lists?.find(p => p.title === "B2B Dealer Prices");
    if (!pl) throw new Error("Price List bulunamadı!");
    console.log("✓ Price List:", pl.id);

    // Ürün variantları
    const prodList = await fetch(`${BACKEND_URL}/admin/products?fields=*variants.prices`, { headers }).then(r => r.json());
    const product = prodList.products?.[0];
    if (!product) throw new Error("Ürün bulunamadı!");
    console.log("✓ Ürün:", product.title);

    const variants = product.variants || [];
    console.log("  Variant sayısı:", variants.length);

    // Her variant için %40 indirimli B2B fiyat oluştur
    const pricesToCreate = variants.map(v => {
        const originalPrice = v.prices?.find(p => p.currency_code === "try");
        const originalAmount = originalPrice?.amount || 10000;
        const discounted = Math.round(originalAmount * 0.6); // %40 indirim
        console.log(`  - ${v.title}: ${originalAmount / 100} TL → B2B: ${discounted / 100} TL`);
        return {
            variant_id: v.id,
            currency_code: "try",
            amount: discounted
        };
    });

    // Farklı endpoint'ler deneyeceğiz
    const endpoints = [
        { url: `${BACKEND_URL}/admin/price-lists/${pl.id}/prices/batch`, body: { create: pricesToCreate } },
        { url: `${BACKEND_URL}/admin/price-lists/${pl.id}/prices/batch`, body: { prices: pricesToCreate } },
        { url: `${BACKEND_URL}/admin/price-lists/${pl.id}/batch`, body: { create: pricesToCreate } },
    ];

    for (const ep of endpoints) {
        console.log(`\nDeneniyor: POST ${ep.url}`);
        console.log("Body:", JSON.stringify(ep.body).substring(0, 200));

        const res = await fetch(ep.url, {
            method: "POST",
            headers,
            body: JSON.stringify(ep.body)
        });

        const statusCode = res.status;
        const responseText = await res.text();

        if (res.ok) {
            console.log(`✓ BAŞARILI! Status: ${statusCode}`);
            console.log("Response:", responseText.substring(0, 500));
            return;
        } else {
            // HTML'i temizle
            const cleanMsg = responseText.includes("<html")
                ? responseText.match(/<pre>(.*?)<\/pre>/)?.[1] || `Status ${statusCode}`
                : responseText.substring(0, 200);
            console.log(`✗ Başarısız: ${cleanMsg}`);
        }
    }

    // Son çare: Price List'i güncelleme endpoint'i
    console.log("\nSon deneme: Price List güncelleme (POST /admin/price-lists/:id)");
    const updateBody = {
        prices: pricesToCreate
    };
    const updateRes = await fetch(`${BACKEND_URL}/admin/price-lists/${pl.id}`, {
        method: "POST",
        headers,
        body: JSON.stringify(updateBody)
    });

    if (updateRes.ok) {
        console.log("✓ BAŞARILI!");
        console.log("Response:", (await updateRes.text()).substring(0, 500));
    } else {
        const text = await updateRes.text();
        console.log("✗ Son deneme de başarısız:", text.substring(0, 200));

        // API endpoint'lerini listele
        console.log("\nMevcut admin route'ları kontrol ediliyor...");
        // OPTIONS isteği denenebilir
    }
}

addB2BPrices().catch(e => { console.error("HATA:", e.message); });
