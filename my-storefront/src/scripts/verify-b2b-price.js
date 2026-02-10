// B2B Fiyat Doğrulama Scripti
// B2B kullanıcıyla store API'den ürün fiyatlarını kontrol eder
const BACKEND_URL = "http://localhost:9000";
const PK = "pk_3594a4f30a889df48e8f2ae50c19868069c0d2597568b5098aafc40a892f34a0";

async function verify() {
    console.log("=== B2B Fiyat Doğrulama ===\n");

    // 1. B2B kullanıcıyla giriş yap
    const loginRes = await fetch(`${BACKEND_URL}/auth/customer/emailpass`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-publishable-api-key": PK },
        body: JSON.stringify({ email: "b2b_test@example.com", password: "password123" })
    });
    if (!loginRes.ok) throw new Error("B2B Login failed: " + await loginRes.text());
    const { token: b2bToken } = await loginRes.json();
    console.log("✓ B2B kullanıcı girişi başarılı\n");

    // 2. Region bul (TRY)
    const regionRes = await fetch(`${BACKEND_URL}/store/regions`, {
        headers: { "x-publishable-api-key": PK }
    });
    const { regions } = await regionRes.json();
    const trRegion = regions.find(r => r.currency_code === "try");
    if (!trRegion) throw new Error("TRY bölgesi bulunamadı!");
    console.log("✓ Region:", trRegion.name, `(${trRegion.id})\n`);

    // 3. B2B OLARAK ürünleri çek (auth header ile)
    const b2bProdRes = await fetch(
        `${BACKEND_URL}/store/products?region_id=${trRegion.id}&fields=*variants.calculated_price`,
        {
            headers: {
                "x-publishable-api-key": PK,
                "Authorization": `Bearer ${b2bToken}`
            }
        }
    );
    const b2bProdData = await b2bProdRes.json();

    console.log("--- B2B Kullanıcı Fiyatları ---");
    const b2bProduct = b2bProdData.products?.[0];
    if (!b2bProduct) {
        console.log("⚠ Ürün bulunamadı! Store API'den ürün dönmüyor.");
        console.log("Debug: Response:", JSON.stringify(b2bProdData).substring(0, 500));
        return;
    }

    console.log(`Ürün: ${b2bProduct.title}`);
    b2bProduct.variants?.forEach(v => {
        const cp = v.calculated_price;
        if (cp) {
            console.log(`  ${v.title}: ${(cp.calculated_amount / 100).toFixed(2)} TL (Orijinal: ${(cp.original_amount / 100).toFixed(2)} TL) [${cp.price_type || 'default'}]`);
        } else {
            console.log(`  ${v.title}: Fiyat hesaplanamadı`);
        }
    });

    // 4. ANONIM OLARAK ürünleri çek (auth header OLMADAN)
    console.log("\n--- Anonim (B2C) Kullanıcı Fiyatları ---");
    const anonProdRes = await fetch(
        `${BACKEND_URL}/store/products?region_id=${trRegion.id}&fields=*variants.calculated_price`,
        {
            headers: { "x-publishable-api-key": PK }
        }
    );
    const anonProdData = await anonProdRes.json();
    const anonProduct = anonProdData.products?.[0];

    if (!anonProduct) {
        console.log("⚠ Ürün bulunamadı!");
        return;
    }

    console.log(`Ürün: ${anonProduct.title}`);
    anonProduct.variants?.forEach(v => {
        const cp = v.calculated_price;
        if (cp) {
            console.log(`  ${v.title}: ${(cp.calculated_amount / 100).toFixed(2)} TL (Orijinal: ${(cp.original_amount / 100).toFixed(2)} TL) [${cp.price_type || 'default'}]`);
        } else {
            console.log(`  ${v.title}: Fiyat hesaplanamadı`);
        }
    });

    // 5. Karşılaştırma
    console.log("\n--- KARŞILAŞTIRMA ---");
    if (b2bProduct.variants && anonProduct.variants) {
        let success = true;
        for (let i = 0; i < b2bProduct.variants.length; i++) {
            const b2bV = b2bProduct.variants[i];
            const anonV = anonProduct.variants.find(v => v.id === b2bV.id);
            if (!anonV) continue;

            const b2bPrice = b2bV.calculated_price?.calculated_amount;
            const anonPrice = anonV.calculated_price?.calculated_amount;

            if (b2bPrice && anonPrice && b2bPrice < anonPrice) {
                const discount = ((1 - b2bPrice / anonPrice) * 100).toFixed(0);
                console.log(`✓ ${b2bV.title}: B2B ${b2bPrice / 100} TL < B2C ${anonPrice / 100} TL (%${discount} indirim)`);
            } else if (b2bPrice === anonPrice) {
                console.log(`⚠ ${b2bV.title}: B2B ve B2C fiyatları aynı: ${b2bPrice / 100} TL`);
                success = false;
            } else {
                console.log(`✗ ${b2bV.title}: B2B=${b2bPrice} B2C=${anonPrice} - Beklenmeyen durum`);
                success = false;
            }
        }

        if (success) {
            console.log("\n🎉 B2B FİYATLANDIRMA BAŞARILI! B2B müşteriler indirimli fiyatları görüyor.");
        } else {
            console.log("\n⚠ B2B fiyatlandırma tam çalışmıyor. Price list kurallarını kontrol edin.");
        }
    }
}

verify().catch(e => { console.error("HATA:", e.message); process.exit(1); });
