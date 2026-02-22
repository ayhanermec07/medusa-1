const BACKEND_URL = "http://localhost:9000";

async function verifyBannerSystem() {
    console.log("Starting Verification...");

    // 1. Admin Login
    const loginRes = await fetch(`${BACKEND_URL}/auth/user/emailpass`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "admin@medusajs.com", password: "supersecret" })
    });

    if (!loginRes.ok) {
        throw new Error(`Login Failed: ${await loginRes.text()}`);
    }

    const { token } = await loginRes.json();
    const adminHeaders = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    };

    // 2. Create Publishable API Key (if needed for Store API)
    // We'll try to create one or list existing to use
    console.log("Fetching/Creating Publishable API Key...");
    let pubKey = "";

    // List keys
    const keysRes = await fetch(`${BACKEND_URL}/admin/publishable-api-keys`, { headers: adminHeaders });
    if (keysRes.ok) {
        const keysData = await keysRes.json();
        const existing = keysData.publishable_api_keys.find(k => !k.revoked_at);
        if (existing) {
            pubKey = existing.token;
            console.log("Using existing API Key:", existing.id);
        }
    }

    if (!pubKey) {
        // Create new
        const createKeyRes = await fetch(`${BACKEND_URL}/admin/publishable-api-keys`, {
            method: "POST",
            headers: adminHeaders,
            body: JSON.stringify({ title: "Auto Test Key" })
        });
        if (createKeyRes.ok) {
            const keyData = await createKeyRes.json();
            pubKey = keyData.publishable_api_key.token;
            // Need to add sales channel to key? Usually yes for it to work with sales channels.
            // Medusa v2 might default to default SC.
            console.log("Created new API Key");
        } else {
            console.warn("Could not create API key, Store API test might fail.");
        }
    }

    // 3. Create Banner
    console.log("Creating Banner...");
    const bannerData = {
        title: "Verified Banner",
        image_url: "https://example.com/image.png",
        link_type: "external",
        external_link: "https://medusajs.com",
        is_active: true
    };

    const createRes = await fetch(`${BACKEND_URL}/admin/banners`, {
        method: "POST",
        headers: adminHeaders,
        body: JSON.stringify(bannerData)
    });

    if (!createRes.ok) {
        throw new Error(`Failed to create banner: ${await createRes.text()}`);
    }

    const { banner } = await createRes.json();
    console.log("Banner Created:", banner.id);

    // 4. Verify Store API
    console.log("Verifying Store API...");
    const storeHeaders = {
        "x-publishable-api-key": pubKey
    };

    const storeRes = await fetch(`${BACKEND_URL}/store/banners`, { headers: storeHeaders });
    if (!storeRes.ok) {
        throw new Error(`Store API Failed: ${await storeRes.text()}`);
    }

    const storeData = await storeRes.json();
    const found = storeData.banners.find(b => b.id === banner.id);

    if (found) {
        console.log("SUCCESS: Banner found in Store API!");
    } else {
        console.error("FAILURE: Banner created but not found in Store API.");
    }
}

verifyBannerSystem().catch(console.error);
