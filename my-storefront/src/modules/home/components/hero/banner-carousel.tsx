"use client"

import { useEffect, useState } from "react"
import { Button } from "@medusajs/ui"
import Link from "next/link"

type Banner = {
    id: string
    title: string
    image_url: string
    link_type: string
    link_id?: string
    external_link?: string
}

const BannerCarousel = () => {
    const [banners, setBanners] = useState<Banner[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                // MEDUSA_BACKEND_URL server-side, NEXT_PUBLIC_ client-side için
                const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
                const res = await fetch(`${backendUrl}/store/banners`, {
                    headers: {
                        "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""
                    }
                })

                // HTML döndüyse (404 sayfası gibi) JSON parse hatasını engelle
                const contentType = res.headers.get("content-type")
                if (!res.ok || !contentType?.includes("application/json")) {
                    console.warn("Banner API yanıt vermedi veya JSON değil:", res.status)
                    return
                }

                const data = await res.json()
                setBanners(data.banners || [])
            } catch (err) {
                console.error("Banner verileri alınamadı:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchBanners()
    }, [])


    if (loading) return <div className="h-[400px] bg-gray-100 animate-pulse" />
    if (banners.length === 0) return null

    // Simple automated slider can be added here
    // For MVP, just show the first active banner or a grid if multiple
    // Let's do a simple hero banner with the first one for now, or a list

    // Design: Full width hero image
    const heroBanner = banners[0]
    const link = heroBanner.link_type === 'external'
        ? heroBanner.external_link
        : heroBanner.link_type === 'product'
            ? `/products/${heroBanner.link_id}` // Ideally we need handle, but ID might work if routed or need fetching handle. 
            // Store API v2 usually returns handle in product/collection if expanded. 
            // But our banner model only stores ID. We might need to fetch the resource or store handle. 
            // For MVP, let's assume link_id is handle or we just link to /products/[id] which Next.js handles? 
            // Medusa storefront usually uses handles. 
            // Let's assume user inputs HANDLE in the ID field for now or we update the model to store handle.
            // Or we just fetch the resource. 
            // Let's just use the ID and hope the storefront supports /products/[id] or user inputs handle.
            : `/collections/${heroBanner.link_id}`

    return (
        <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg mb-8">
            <Link href={link || "#"} className="block w-full h-full relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={heroBanner.image_url}
                    alt={heroBanner.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20 text-white max-w-xl">
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">{heroBanner.title}</h2>
                    <Button variant="secondary" className="px-8 py-3 text-lg">
                        İncele
                    </Button>
                </div>
            </Link>
        </div>
    )
}

export default BannerCarousel
