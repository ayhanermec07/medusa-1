import { defineRouteConfig } from "@medusajs/admin-sdk"
import { useEffect } from "react"

const PromosyonlarPage = () => {
    useEffect(() => {
        window.location.href = "/app/promotions"
    }, [])

    return (
        <div className="flex items-center justify-center h-64">
            <p className="text-white">Promosyonlar sayfasına yönlendiriliyor...</p>
        </div>
    )
}

export const config = defineRouteConfig({
    label: "Promosyonlar",
})

export default PromosyonlarPage
