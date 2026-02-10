import { defineRouteConfig } from "@medusajs/admin-sdk"
import { useEffect } from "react"

const FiyatListeleriPage = () => {
    useEffect(() => {
        window.location.href = "/app/price-lists"
    }, [])

    return (
        <div className="flex items-center justify-center h-64">
            <p className="text-white">Fiyat Listeleri sayfasına yönlendiriliyor...</p>
        </div>
    )
}

export const config = defineRouteConfig({
    label: "Fiyat Listeleri",
})

export default FiyatListeleriPage
