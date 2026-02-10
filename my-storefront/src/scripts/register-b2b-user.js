// Native fetch

const BACKEND_URL = "http://localhost:9000";
const PUBLISHABLE_KEY = "pk_3594a4f30a889df48e8f2ae50c19868069c0d2597568b5098aafc40a892f34a0"; // From .env.local

async function register() {
    const email = "b2b_test@example.com";
    const password = "password123";

    console.log("Registering user...", email);

    // 1. Auth Register
    const authRes = await fetch(`${BACKEND_URL}/auth/customer/emailpass/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-publishable-api-key": PUBLISHABLE_KEY
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    const authData = await authRes.json();
    if (!authRes.ok) {
        console.error("Auth Register Failed:", authData);
        return;
    }
    console.log("Auth Registered. Token received.");
    const token = authData.token;

    // 2. Create Customer Profile
    const customerRes = await fetch(`${BACKEND_URL}/store/customers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-publishable-api-key": PUBLISHABLE_KEY,
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            email,
            first_name: "B2B",
            last_name: "Tester",
            phone: "+905551234567"
        })
    });

    const customerData = await customerRes.json();
    if (!customerRes.ok) {
        // If customer likely exists, we are good.
        console.warn("Customer Creation Warning (might exist):", customerData);
    } else {
        console.log("Customer Profile Created:", customerData.customer?.id);
    }

    console.log("Registration Complete.");
}

register();
