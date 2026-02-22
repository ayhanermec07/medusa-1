import { MedusaService } from "@medusajs/framework/utils"
import { Banner } from "./models/banner"

class BannerService extends MedusaService({
    Banner,
}) { }

export default BannerService
