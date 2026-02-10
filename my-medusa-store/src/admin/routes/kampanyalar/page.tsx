import { defineRouteConfig } from "@medusajs/admin-sdk"
import { useEffect } from "react"

const KampanyalarPage = () => {
    useEffect(() => {
        window.location.href = "/app/campaigns"
    }, [])

    return (
        <div className="flex items-center justify-center h-64">
            <p className="text-white">Kampanyalar sayfasına yönlendiriliyor...</p>
        </div>
    )
}

export const config = defineRouteConfig({
    label: "Kampanyalar",
})

export default KampanyalarPage
