import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
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
  const bannerService = req.scope.resolve("banner") as any
  const [banners, count] = await bannerService.listAndCountBanners(req.query)
  res.json({ banners, count })
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const validated = createBannerSchema.parse(req.body)
  const bannerService = req.scope.resolve("banner") as any
  const banner = await bannerService.createBanners(validated)
  res.json({ banner })
}
