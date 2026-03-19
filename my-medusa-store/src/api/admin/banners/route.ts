import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { z } from "zod"

const createBannerSchema = z.object({
  title: z.string(),
  image_url: z.string(),
  link_type: z.enum(["product", "collection", "external"]),
  link_id: z.string().optional(),
  external_link: z.string().optional(),
  is_active: z.boolean().optional(),
})

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const pgConnection = req.scope.resolve(ContainerRegistrationKeys.PG_CONNECTION) as any
    const result = await pgConnection.raw(
      "SELECT id, title, image_url, link_type, link_id, external_link, is_active, created_at FROM banner WHERE deleted_at IS NULL ORDER BY created_at DESC"
    )
    const banners = result.rows || result[0] || []
    res.json({ banners, count: banners.length })
  } catch (err: any) {
    console.error("Admin banner GET error:", err.message)
    res.json({ banners: [], count: 0 })
  }
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const validated = createBannerSchema.parse(req.body)
    const pgConnection = req.scope.resolve(ContainerRegistrationKeys.PG_CONNECTION) as any
    
    const id = `banner_${Date.now()}`
    await pgConnection.raw(
      `INSERT INTO banner (id, title, image_url, link_type, link_id, external_link, is_active, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [id, validated.title, validated.image_url, validated.link_type, validated.link_id || null, validated.external_link || null, validated.is_active !== false]
    )
    
    const result = await pgConnection.raw("SELECT * FROM banner WHERE id = ?", [id])
    const banner = (result.rows || result[0] || [])[0]
    res.json({ banner })
  } catch (err: any) {
    console.error("Admin banner POST error:", err.message)
    res.status(500).json({ error: err.message })
  }
}
