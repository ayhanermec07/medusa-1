import { defineRouteConfig } from "@medusajs/admin-sdk"
import { useEffect } from "react"

const KategorilerPage = () => {
    useEffect(() => {
        window.location.href = "/app/categories"
    }, [])

    return (
        <div className="flex items-center justify-center h-64">
            <p className="text-white">Kategoriler sayfasına yönlendiriliyor...</p>
        </div>
    )
}

export const config = defineRouteConfig({
    label: "Kategoriler",
})

export default KategorilerPage
