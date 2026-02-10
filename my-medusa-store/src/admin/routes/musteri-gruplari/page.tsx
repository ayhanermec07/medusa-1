import { defineRouteConfig } from "@medusajs/admin-sdk"
import { useEffect } from "react"

const MusteriGruplariPage = () => {
    useEffect(() => {
        window.location.href = "/app/customer-groups"
    }, [])

    return (
        <div className="flex items-center justify-center h-64">
            <p className="text-white">Müşteri Grupları sayfasına yönlendiriliyor...</p>
        </div>
    )
}

export const config = defineRouteConfig({
    label: "Müşteri Grupları",
})

export default MusteriGruplariPage
