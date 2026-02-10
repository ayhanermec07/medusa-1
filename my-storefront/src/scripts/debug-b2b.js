// Price List ve Customer Group durumunu kontrol et
const BACKEND_URL = "http://localhost:9000";

async function debug() {
    const loginRes = await fetch(`${BACKEND_URL}/auth/user/emailpass`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "admin@medusajs.com", password: "supersecret" })
    });
    const { token } = await loginRes.json();
    const headers = { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" };

    // 1. Price List detayları
    const plRes = await fetch(`${BACKEND_URL}/admin/price-lists?fields=*rules,*prices`, { headers });
    const plData = await plRes.json();
    console.log("=== Price Lists ===");
    plData.price_lists?.forEach(pl => {
        console.log(`ID: ${pl.id}`);
        console.log(`Title: ${pl.title}`);
        console.log(`Status: ${pl.status}`);
        console.log(`Type: ${pl.type}`);
        console.log(`Rules:`, JSON.stringify(pl.rules));
        console.log(`Price Sayısı: ${pl.prices?.length || 0}`);
        pl.prices?.forEach(p => {
            console.log(`  - ${p.currency_code} ${p.amount} (variant: ${p.price_set?.variant?.id || 'N/A'})`);
        });
        console.log();
    });

    // 2. Customer Group detayları  
    const grpRes = await fetch(`${BACKEND_URL}/admin/customer-groups?fields=*customers`, { headers });
    const grpData = await grpRes.json();
    console.log("=== Customer Groups ===");
    grpData.customer_groups?.forEach(g => {
        console.log(`ID: ${g.id}`);
        console.log(`Name: ${g.name}`);
        console.log(`Customers:`, g.customers?.map(c => c.email) || 'N/A');
        console.log();
    });

    // 3. Customer detayları (grupları göster)
    const custRes = await fetch(`${BACKEND_URL}/admin/customers?q=b2b_test&fields=*groups`, { headers });
    const custData = await custRes.json();
    console.log("=== B2B Test Customer ===");
    custData.customers?.forEach(c => {
        console.log(`ID: ${c.id}`);
        console.log(`Email: ${c.email}`);
        console.log(`Groups:`, JSON.stringify(c.groups));
        console.log();
    });
}

debug().catch(console.error);
