import { Container, Heading, Input, Button, Label, Select, Switch } from "@medusajs/ui"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { defineRouteConfig } from "@medusajs/admin-sdk"

const CreateBannerPage = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: "",
        image_url: "",
        link_type: "product",
        link_id: "",
        external_link: "",
        is_active: true
    })

    // Simple handler
    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await fetch("/admin/banners", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            if (res.ok) {
                navigate("/app/banners")
            } else {
                alert("Banner oluşturulamadı")
            }
        } catch (err) {
            console.error(err)
            alert("Hata oluştu")
        }
    }

    return (
        <Container>
            <Heading level="h1" className="mb-6">Yeni Banner Oluştur</Heading>
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
                    <p className="text-xs text-ui-fg-subtle">Şimdilik manuel URL girin. Daha sonra upload eklenecek.</p>
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

                <Button type="submit" variant="primary" className="mt-4">
                    Oluştur
                </Button>
            </form>
        </Container>
    )
}

export const config = defineRouteConfig({
    label: "Yeni Banner",
})

export default CreateBannerPage
