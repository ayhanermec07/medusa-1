import { defineRouteConfig } from "@medusajs/admin-sdk"
import { redirect } from "react-router-dom"
import { useEffect } from "react"

const EnvanterPage = () => {
    useEffect(() => {
        window.location.href = "/app/inventory"
    }, [])

    return (
        <div className="flex items-center justify-center h-64">
            <p className="text-white">Envanter sayfasına yönlendiriliyor...</p>
        </div>
    )
}

export const config = defineRouteConfig({
    label: "Envanter",
})

export default EnvanterPage
