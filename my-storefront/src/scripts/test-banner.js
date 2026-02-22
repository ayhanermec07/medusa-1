const BACKEND_URL = "http://localhost:9000";

async function createBanner() {
    console.log("Creating Test Banner...");

    // 1. Admin Login
    const loginRes = await fetch(`${BACKEND_URL}/auth/user/emailpass`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "admin@medusajs.com", password: "supersecret" })
    });

    if (!loginRes.ok) {
        console.error("Login Failed:", await loginRes.text());
        return;
    }

    const { token } = await loginRes.json();
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    };

    // 2. Create Banner
    const bannerData = {
        title: "Büyük Yaz İndirimi",
        image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBst4cf7XZ18jiXPsSfTfCfPXglsrK21FX1xMUBKXXx8GhEzyXUK8SN1bQw_Ia2hzGBeFw21IbkVoso_vY3j3F60KUdfHZBuFmAQ677GjpRmlf9-afArmdFH3Cj1FkzTTrAJsTplI2YQBaYScpjY_6PsRD6ZN70xuEA2kkb242XBs5_nXOGX0-A83Haf5npG1kVqjcSQfYIbIyLDeJdylBmZRj9xximWFUa-s2oStKZQfFKa2nYCH0aMQcJ7wG52p9E4cPILFxBCTU", // Using image from hero
        link_type: "collection",
        link_id: "pcol_01H...", // Needs real ID, but let's try external first to be safe
        external_link: "https://google.com",
        is_active: true
    };

    // Override with external for test because I don't know collection IDs without fetching
    bannerData.link_type = "external";

    const res = await fetch(`${BACKEND_URL}/admin/banners`, {
        method: "POST",
        headers,
        body: JSON.stringify(bannerData)
    });

    if (res.ok) {
        const data = await res.json();
        console.log("Banner Created:", data.banner);
    } else {
        console.error("Failed to create banner:", await res.text());
    }

    // 3. Verify Store API
    const storeRes = await fetch(`${BACKEND_URL}/store/banners`);
    if (storeRes.ok) {
        const storeData = await storeRes.json();
        console.log("Store Banners:", storeData.banners.length);
    } else {
        console.error("Failed to fetch store banners:", await storeRes.text());
    }
}

createBanner().catch(console.error);
