import { model } from "@medusajs/framework/utils"

export const Banner = model.define("banner", {
    id: model.id().primaryKey(),
    title: model.text(),
    image_url: model.text(),
    link_type: model.enum(["product", "collection", "external"]),
    link_id: model.text().nullable(),
    external_link: model.text().nullable(),
    is_active: model.boolean().default(true),
})
