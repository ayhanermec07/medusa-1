import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
    const bannerService = req.scope.resolve("banner") as any
    // Only list active banners
    const [banners, count] = await bannerService.listAndCountBanners({
        is_active: true
    })
    res.json({ banners, count })
}
