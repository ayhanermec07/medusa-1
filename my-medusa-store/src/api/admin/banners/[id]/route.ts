import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
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
  const { id } = req.params
  const bannerService = req.scope.resolve("banner") as any
  const banner = await bannerService.retrieveBanner(id)
  res.json({ banner })
}

export const PUT = async (req: MedusaRequest, res: MedusaResponse) => {
  const { id } = req.params
  const bannerService = req.scope.resolve("banner") as any
  const validated = updateBannerSchema.parse(req.body)
  const banner = await bannerService.updateBanners(id, validated)
  res.json({ banner })
}

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const { id } = req.params
  const bannerService = req.scope.resolve("banner") as any
  await bannerService.deleteBanners(id)
  res.json({ success: true })
}
