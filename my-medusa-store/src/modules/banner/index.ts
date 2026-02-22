import BannerService from "./service"
import { Module } from "@medusajs/framework/utils"

export const BANNER_MODULE = "banner"

export default Module(BANNER_MODULE, {
    service: BannerService,
})
