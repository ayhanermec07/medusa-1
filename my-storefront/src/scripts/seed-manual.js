const BACKEND_URL = "http://localhost:9000";
const ADMIN_EMAIL = "admin@test.com";
const ADMIN_PASSWORD = "secret";
const PUBLISHABLE_KEY = "pk_3594a4f30a889df48e8f2ae50c19868069c0d2597568b5098aafc40a892f34a0";

async function seed() {
    console.log("Starting Manual Seed...");

    // 1. Login Admin
    const loginRes = await fetch(`${BACKEND_URL}/auth/user/emailpass/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
    });

    if (!loginRes.ok) {
        throw new Error(`Admin Login Failed: ${loginRes.statusText}`);
    }
    const loginData = await loginRes.json();
    const token = loginData.access_token; // v2 auth token
    console.log("Logged in as Admin.");

    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    };

    // 2. Create Default Sales Channel
    // List first
    const scListRes = await fetch(`${BACKEND_URL}/admin/sales-channels?q=Default Sales Channel`, { headers });
    const scList = await scListRes.json();
    let scId;

    if (scList.sales_channels && scList.sales_channels.length > 0) {
        scId = scList.sales_channels[0].id;
        console.log("Found Sales Channel:", scId);
    } else {
        const scCreateRes = await fetch(`${BACKEND_URL}/admin/sales-channels`, {
            method: "POST",
            headers,
            body: JSON.stringify({ name: "Default Sales Channel", description: "Created by seed-manual" })
        });
        const scData = await scCreateRes.json();
        scId = scData.sales_channel.id;
        console.log("Created Sales Channel:", scId);
    }

    // 3. Link Publishable Key to SC
    // First find PK ID
    const pkListRes = await fetch(`${BACKEND_URL}/admin/api-keys?q=${PUBLISHABLE_KEY}`, { headers });
    // Actually q might filter by title? PKs have title?
    // Let's filter manually if list returns many.
    // Or just list all.
    const pkListResAll = await fetch(`${BACKEND_URL}/admin/api-keys`, { headers });
    const pkList = await pkListResAll.json();
    const pk = pkList.api_keys.find(k => k.token === PUBLISHABLE_KEY);

    if (pk) {
        // Link to SC
        // POST /admin/api-keys/:id/sales-channels
        const linkRes = await fetch(`${BACKEND_URL}/admin/api-keys/${pk.id}/sales-channels`, {
            method: "POST",
            headers,
            body: JSON.stringify({ add: [scId] })
        });
        if (linkRes.ok) console.log("Linked PK to SC.");
        else console.warn("Link PK Failed:", await linkRes.text());
    } else {
        console.warn("Publishable Key not found!");
    }

    // 4. Create Product
    let productId;
    let variantId;
    const prodListRes = await fetch(`${BACKEND_URL}/admin/products?q=Test Spice`, { headers });
    const prodList = await prodListRes.json();

    if (prodList.products && prodList.products.length > 0) {
        const p = prodList.products[0];
        productId = p.id;
        variantId = p.variants[0].id;
        console.log("Found Product:", productId);
    } else {
        const prodCreateRes = await fetch(`${BACKEND_URL}/admin/products`, {
            method: "POST",
            headers,
            body: JSON.stringify({
                title: "Test Spice",
                options: [{ title: "Weight", values: ["1kg"] }],
                variants: [
                    {
                        title: "1 kg",
                        prices: [{ currency_code: "try", amount: 1000 }]
                    }
                ],
                sales_channels: [{ id: scId }] // Link to SC
            })
        });
        const prodData = await prodCreateRes.json();
        if (!prodCreateRes.ok) throw new Error("Create Product Failed: " + JSON.stringify(prodData));
        productId = prodData.product.id;
        variantId = prodData.product.variants[0].id;
        console.log("Created Product:", productId);
    }

    // 5. B2B Price List
    // Find Price List "B2B Dealer Prices"
    const plListRes = await fetch(`${BACKEND_URL}/admin/price-lists?q=B2B Dealer Prices`, { headers });
    const plList = await plListRes.json();
    let plId;
    if (plList.price_lists && plList.price_lists.length > 0) {
        plId = plList.price_lists[0].id;
        console.log("Found Price List:", plId);
    } else {
        // Create if not exists ? Usually created by seed.json
        // But if missing, create it.
        const plCreateRes = await fetch(`${BACKEND_URL}/admin/price-lists`, {
            method: "POST",
            headers,
            body: JSON.stringify({
                title: "B2B Dealer Prices",
                description: "Test B2B",
                type: "sale",
                status: "active"
            })
        });
        const plData = await plCreateRes.json();
        plId = plData.price_list.id;
        console.log("Created Price List:", plId);
    }

    // 6. Add B2B Price to Variant
    // POST /admin/price-lists/:id/prices
    // body: { prices: [ { variant_id: ..., amount: 1500, currency_code: 'try' } ] }
    const addPriceRes = await fetch(`${BACKEND_URL}/admin/price-lists/${plId}/prices`, {
        method: "POST",
        headers,
        body: JSON.stringify({
            prices: [
                {
                    variant_id: variantId,
                    amount: 1500, // 15.00 TRY
                    currency_code: "try"
                }
            ]
        })
    });
    if (!addPriceRes.ok) console.warn("Add Price Failed:", await addPriceRes.text());
    else console.log("Added 15.00 TRY Price to B2B List.");

    // 7. Assign User to Group
    // Find User
    const email = "b2b_test@example.com";
    const custRes = await fetch(`${BACKEND_URL}/admin/customers?q=${email}`, { headers });
    const custList = await custRes.json();
    if (custList.customers && custList.customers.length > 0) {
        const customer = custList.customers[0];

        // Find Group
        const grpRes = await fetch(`${BACKEND_URL}/admin/customer-groups?q=B2B_Dealers`, { headers });
        const grpList = await grpRes.json();
        let grpId;
        if (grpList.customer_groups && grpList.customer_groups.length > 0) {
            grpId = grpList.customer_groups[0].id;
        } else {
            const grpCreate = await fetch(`${BACKEND_URL}/admin/customer-groups`, {
                method: "POST",
                headers,
                body: JSON.stringify({ name: "B2B_Dealers" })
            });
            const gData = await grpCreate.json();
            grpId = gData.customer_group.id;
        }

        // Assign
        // POST /admin/customer-groups/:id/customers
        // body: { add: [customer_id] }
        const assignRes = await fetch(`${BACKEND_URL}/admin/customer-groups/${grpId}/customers`, {
            method: "POST",
            headers,
            body: JSON.stringify({ add: [customer.id] })
        });
        if (assignRes.ok) console.log("Assigned User to B2B Group.");
        else console.warn("Assign Group Failed:", await assignRes.text());

    } else {
        console.warn("User 'b2b_test@example.com' not found. Run register-b2b-user.js first.");
    }

    console.log("Seed Manual Complete.");
}

seed().catch(console.error);
