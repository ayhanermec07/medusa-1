// Doğrudan pg ile banner tablosuna test verisi ekle
const { Client } = require("pg")

async function seedBanners() {
    const client = new Client({
        connectionString: "postgres://postgres:postgres@localhost:5432/medusa_db"
    })
    
    try {
        await client.connect()
        console.log("Veritabanına bağlandı.")
        
        // Mevcut bannerları kontrol et
        const existing = await client.query("SELECT count(*) FROM banner")
        console.log("Mevcut banner sayısı:", existing.rows[0].count)
        
        if (parseInt(existing.rows[0].count) === 0) {
            await client.query(`
                INSERT INTO banner (id, title, image_url, link_type, external_link, is_active, created_at, updated_at) 
                VALUES 
                    ('banner_test_01', 'Taze Baharatlarda Buyuk Indirim', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1400&h=600&fit=crop', 'external', '#', true, NOW(), NOW()),
                    ('banner_test_02', 'Yeni Sezon Karisim Koleksiyonu', 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=1400&h=600&fit=crop', 'external', '#', true, NOW(), NOW())
            `)
            console.log("2 adet test banner eklendi!")
        } else {
            console.log("Bannerlar zaten mevcut, ekleme yapılmadı.")
        }
        
        // Doğrulama
        const result = await client.query("SELECT id, title, is_active FROM banner")
        console.log("Bannerlar:", result.rows)
        
    } catch (err) {
        console.error("Hata:", err.message)
    } finally {
        await client.end()
    }
}

seedBanners()
