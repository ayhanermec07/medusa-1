import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
    try {
        // Banner modülü DI container'da çözümlenemediği için doğrudan veritabanı sorgusu kullanıyoruz
        const pgConnection = req.scope.resolve(ContainerRegistrationKeys.PG_CONNECTION) as any
        const result = await pgConnection.raw(
            "SELECT id, title, image_url, link_type, link_id, external_link, is_active, created_at FROM banner WHERE is_active = true AND deleted_at IS NULL ORDER BY created_at DESC"
        )
        const banners = result.rows || result[0] || []
        res.json({ banners, count: banners.length })
    } catch (err: any) {
        console.error("Banner store error:", err.message)
        res.json({ banners: [], count: 0 })
    }
}
