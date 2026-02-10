import { defineRouteConfig } from "@medusajs/admin-sdk"
import { useEffect } from "react"

const KoleksiyonlarPage = () => {
    useEffect(() => {
        window.location.href = "/app/collections"
    }, [])

    return (
        <div className="flex items-center justify-center h-64">
            <p className="text-white">Koleksiyonlar sayfasına yönlendiriliyor...</p>
        </div>
    )
}

export const config = defineRouteConfig({
    label: "Koleksiyonlar",
})

export default KoleksiyonlarPage
