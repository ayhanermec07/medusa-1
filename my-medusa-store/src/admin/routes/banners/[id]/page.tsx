import { Container, Heading, Input, Button, Label, Select, Switch } from "@medusajs/ui"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { defineRouteConfig } from "@medusajs/admin-sdk"
import { useQuery } from "@tanstack/react-query"

const UpdateBannerPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: "",
        image_url: "",
        link_type: "product",
        link_id: "",
        external_link: "",
        is_active: true
    })

    // Fetch existing banner
    // Using direct fetch for simplicity in this MVP
    useEffect(() => {
        const fetchBanner = async () => {
            // In a real app, GET /admin/banners/:id should return the banner
            // Since I didn't create GET /:id route in previous step (only PUT and DELETE), I should probably add GET there too or filter from list
            // Let's assume list is small and I can filter or I missed GET in [id]/route.ts

            // Wait, I only created PUT and DELETE in [id]/route.ts
            // I need to add GET there to fetch single banner details!
            // For now, I'll fetch list and find. Or I'll fix the route.
            // Let's fix the route in a parallel step.

            const res = await fetch(`/admin/banners`)
            if (res.ok) {
                const data = await res.json()
                const banner = data.banners.find((b: any) => b.id === id)
                if (banner) {
                    setFormData({
                        title: banner.title,
                        image_url: banner.image_url,
                        link_type: banner.link_type,
                        link_id: banner.link_id || "",
                        external_link: banner.external_link || "",
                        is_active: banner.is_active
                    })
                }
            }
        }
        fetchBanner()
    }, [id])

    // Simple handler
    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await fetch(`/admin/banners/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            if (res.ok) {
                navigate("/app/banners")
            } else {
                alert("Banner güncellenemedi")
            }
        } catch (err) {
            console.error(err)
            alert("Hata oluştu")
        }
    }

    return (
        <Container>
            <Heading level="h1" className="mb-6">Banner Düzenle</Heading>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg">

                <div className="flex flex-col gap-2">
                    <Label>Başlık</Label>
                    <Input
                        required
                        placeholder="Örn: Yaz İndirimi"
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Label>Görsel URL</Label>
                    <Input
                        required
                        placeholder="https://example.com/banner.jpg"
                        value={formData.image_url}
                        onChange={(e) => handleChange("image_url", e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Label>Link Tipi</Label>
                    <Select
                        value={formData.link_type}
                        onValueChange={(val) => handleChange("link_type", val)}
                    >
                        <Select.Trigger>
                            <Select.Value />
                        </Select.Trigger>
                        <Select.Content>
                            <Select.Item value="product">Ürün</Select.Item>
                            <Select.Item value="collection">Koleksiyon</Select.Item>
                            <Select.Item value="external">Harici Link</Select.Item>
                        </Select.Content>
                    </Select>
                </div>

                {formData.link_type !== "external" && (
                    <div className="flex flex-col gap-2">
                        <Label>{formData.link_type === "product" ? "Ürün ID" : "Koleksiyon ID"}</Label>
                        <Input
                            placeholder={formData.link_type === "product" ? "prod_..." : "pcol_..."}
                            value={formData.link_id}
                            onChange={(e) => handleChange("link_id", e.target.value)}
                        />
                    </div>
                )}

                {formData.link_type === "external" && (
                    <div className="flex flex-col gap-2">
                        <Label>Harici Link (URL)</Label>
                        <Input
                            placeholder="https://google.com"
                            value={formData.external_link}
                            onChange={(e) => handleChange("external_link", e.target.value)}
                        />
                    </div>
                )}

                <div className="flex items-center gap-2 mt-2">
                    <Switch
                        checked={formData.is_active}
                        onCheckedChange={(val) => handleChange("is_active", val)}
                    />
                    <Label>Aktif mi?</Label>
                </div>

                <div className="flex gap-2 mt-4">
                    <Button type="submit" variant="primary">
                        Güncelle
                    </Button>
                    <Button type="button" variant="transparent" onClick={() => navigate("/app/banners")}>
                        İptal
                    </Button>
                </div>
            </form>
        </Container>
    )
}

export default UpdateBannerPage
