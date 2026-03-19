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

const CampaignBanner = () => {
    const [banners, setBanners] = useState<Banner[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
                const res = await fetch(`${backendUrl}/store/banners`, {
                    headers: {
                        "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""
                    }
                })

                const contentType = res.headers.get("content-type")
                if (!res.ok || !contentType?.includes("application/json")) {
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

    if (loading) return (
        <div className="w-full flex justify-center px-4 md:px-10 py-12 bg-white">
            <div className="w-full max-w-[1340px] h-[300px] bg-gray-100 animate-pulse rounded-2xl" />
        </div>
    )
    
    // Tüm aktif bannerları göster
    const displayBanners = banners

    if (displayBanners.length === 0) return null

    return (
        <div className="w-full flex justify-center px-4 md:px-10 py-12 lg:py-20 bg-background-light dark:bg-background-dark">
            <div className="w-full max-w-[1340px]">
                <div className="flex flex-col gap-y-8">
                    {displayBanners.map((banner, index) => {
                        const link = banner.link_type === 'external'
                            ? banner.external_link
                            : banner.link_type === 'product'
                                ? `/products/${banner.link_id}`
                                : `/collections/${banner.link_id}`

                        return (
                            <Link href={link || "#"} key={banner.id} className="block relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-2xl group shadow-md hover:shadow-xl transition-shadow duration-300">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={banner.image_url}
                                    alt={banner.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent group-hover:from-black/70 transition-colors duration-300" />
                                
                                <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20 text-white">
                                    <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase bg-primary text-white rounded-full w-fit shadow-sm">
                                        Özel Fırsat
                                    </span>
                                    <h2 className="text-3xl md:text-5xl font-bold mb-6 drop-shadow-md max-w-2xl leading-tight">
                                        {banner.title}
                                    </h2>
                                    <Button variant="secondary" className="w-fit px-8 py-3 text-sm md:text-base font-semibold shadow-md hover:shadow-lg transition-all rounded-xl">
                                        Hemen İncele
                                    </Button>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default CampaignBanner
