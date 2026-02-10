import { defineRouteConfig } from "@medusajs/admin-sdk"
import { useEffect } from "react"

const MusterilerPage = () => {
    useEffect(() => {
        window.location.href = "/app/customers"
    }, [])

    return (
        <div className="flex items-center justify-center h-64">
            <p className="text-white">Müşteriler sayfasına yönlendiriliyor...</p>
        </div>
    )
}

export const config = defineRouteConfig({
    label: "Müşteriler",
})

export default MusterilerPage
