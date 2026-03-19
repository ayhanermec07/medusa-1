import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { z } from "zod"

const updateBannerSchema = z.object({
  title: z.string().optional(),
  image_url: z.string().optional(),
  link_type: z.enum(["product", "collection", "external"]).optional(),
  link_id: z.string().optional(),
  external_link: z.string().optional(),
  is_active: z.boolean().optional(),
})

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const { id } = req.params
    const pgConnection = req.scope.resolve(ContainerRegistrationKeys.PG_CONNECTION) as any
    const result = await pgConnection.raw("SELECT * FROM banner WHERE id = ? AND deleted_at IS NULL", [id])
    const banner = (result.rows || result[0] || [])[0]
    if (!banner) {
      return res.status(404).json({ message: "Banner bulunamadı" })
    }
    res.json({ banner })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}

export const PUT = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const { id } = req.params
    const validated = updateBannerSchema.parse(req.body)
    const pgConnection = req.scope.resolve(ContainerRegistrationKeys.PG_CONNECTION) as any
    
    // Dinamik güncelleme sorgusu oluştur
    const updates: string[] = []
    const values: any[] = []
    Object.entries(validated).forEach(([key, value]) => {
      if (value !== undefined) {
        updates.push(`"${key}" = ?`)
        values.push(value)
      }
    })
    
    if (updates.length > 0) {
      updates.push('"updated_at" = NOW()')
      values.push(id)
      await pgConnection.raw(`UPDATE banner SET ${updates.join(", ")} WHERE id = ?`, values)
    }
    
    const result = await pgConnection.raw("SELECT * FROM banner WHERE id = ?", [id])
    const banner = (result.rows || result[0] || [])[0]
    res.json({ banner })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const { id } = req.params
    const pgConnection = req.scope.resolve(ContainerRegistrationKeys.PG_CONNECTION) as any
    // Soft delete
    await pgConnection.raw('UPDATE banner SET "deleted_at" = NOW() WHERE id = ?', [id])
    res.json({ success: true })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}
