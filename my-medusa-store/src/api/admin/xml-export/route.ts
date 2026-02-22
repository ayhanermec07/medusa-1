import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
    try {
        // Get query parameter to check if preview mode
        const isPreview = req.query.preview === "true"

        // Fetch products from the database using the container
        const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

        const { data: products } = await query.graph({
            entity: "product",
            fields: [
                "id",
                "title",
                "description",
                "handle",
                "status",
                "thumbnail",
                "created_at",
                "updated_at",
                "variants.*",
                "images.*",
                "categories.*"
            ]
        })

        // Generate XML
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
        xml += '<products>\n'

        for (const product of products) {
            // Check if product has variants
            if (product.variants && Array.isArray(product.variants) && product.variants.length > 0) {
                // Flatten: Create a product node for EACH variant
                for (const variant of product.variants) {
                    xml += '  <product>\n'

                    // Identity
                    xml += `    <id>${variant.id}</id>\n`
                    xml += `    <parent_id>${product.id}</parent_id>\n`

                    // Title: Product Title - Variant Title
                    const variantTitle = variant.title === "Default Variant" ? "" : ` - ${variant.title}`
                    xml += `    <title><![CDATA[${product.title || ''}${variantTitle}]]></title>\n`

                    // Handle and SKU
                    const variantHandle = variant.sku ? `${product.handle}-${variant.sku}` : `${product.handle}-${variant.id}`
                    xml += `    <handle>${variantHandle}</handle>\n`
                    xml += `    <sku>${variant.sku || ''}</sku>\n`
                    xml += `    <barcode>${variant.barcode || ''}</barcode>\n`

                    // Stock (Medusa Variant Inventory)
                    xml += `    <stock>${(variant as any).inventory_quantity || 0}</stock>\n`

                    // Description (From Parent)
                    xml += `    <description><![CDATA[${product.description || ''}]]></description>\n`

                    // Status (From Payment)
                    xml += `    <status>${product.status || ''}</status>\n`

                    // Images (From Parent)
                    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
                        xml += '    <images>\n'
                        for (const image of product.images) {
                            xml += `      <image>${image.url || ''}</image>\n`
                        }
                        xml += '    </images>\n'
                    }

                    // Categories (From Parent)
                    if (product.categories && Array.isArray(product.categories) && product.categories.length > 0) {
                        xml += '    <categories>\n'
                        for (const category of product.categories) {
                            xml += `      <category><![CDATA[${category.name || ''}]]></category>\n`
                        }
                        xml += '    </categories>\n'
                    }

                    xml += '  </product>\n'
                }
            } else {
                // Fallback: If no variants (simple product?), output as single node
                // Note: Medusa products usually have at least 1 default variant, but handling edge case.
                xml += '  <product>\n'
                xml += `    <id>${product.id}</id>\n`
                xml += `    <title><![CDATA[${product.title || ''}]]></title>\n`
                xml += `    <handle>${product.handle || ''}</handle>\n`
                xml += `    <stock>0</stock>\n` // No variant = no stock info easily available
                xml += `    <description><![CDATA[${product.description || ''}]]></description>\n`
                if (product.images && Array.isArray(product.images) && product.images.length > 0) {
                    xml += '    <images>\n'
                    for (const image of product.images) {
                        xml += `      <image>${image.url || ''}</image>\n`
                    }
                    xml += '    </images>\n'
                }
                xml += '  </product>\n'
            }
        }

        xml += '</products>'

        if (isPreview) {
            // Return as text for preview
            res.setHeader("Content-Type", "text/xml; charset=utf-8")
            res.send(xml)
        } else {
            // Return as downloadable file
            const filename = `products-${new Date().toISOString().split("T")[0]}.xml`
            res.setHeader("Content-Type", "application/xml")
            res.setHeader("Content-Disposition", `attachment; filename="${filename}"`)
            res.send(xml)
        }
    } catch (error) {
        console.error("XML Export Error:", error)
        res.status(500).json({
            error: "XML dışa aktarımı sırasında bir hata oluştu",
            details: error instanceof Error ? error.message : "Unknown error",
        })
    }
}
