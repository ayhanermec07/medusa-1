import { Container, Heading, Table, Button, StatusBadge } from "@medusajs/ui"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { defineRouteConfig } from "@medusajs/admin-sdk"
import { PencilSquare, Trash } from "@medusajs/icons"

// Define the Banner type
type Banner = {
    id: string
    title: string
    image_url: string
    link_type: string
    is_active: boolean
}

const BannersPage = () => {
    const queryClient = useQueryClient()

    // Custom fetch function
    const fetchBanners = async () => {
        // Determine backend URL (assuming relative path works in admin or use window.location.origin)
        // Actually Admin often runs on same origin or configured
        // Let's try relative path
        const res = await fetch("/admin/banners")
        if (!res.ok) throw new Error("Failed to fetch banners")
        return res.json()
    }

    const { data, isLoading } = useQuery({
        queryKey: ["banners"],
        queryFn: fetchBanners
    })

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`/admin/banners/${id}`, { method: "DELETE" })
            if (!res.ok) throw new Error("Failed to delete")
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["banners"] })
        }
    })

    // Handle delete
    const handleDelete = (id: string) => {
        if (confirm("Bu banner'ı silmek istediğinize emin misiniz?")) {
            deleteMutation.mutate(id)
        }
    }

    if (isLoading) return <div>Yükleniyor...</div>

    return (
        <Container>
            <div className="flex justify-between items-center mb-6">
                <Heading level="h1">Banner Yönetimi</Heading>
                <Link to="/app/banners/create">
                    <Button variant="primary">Yeni Banner Oluştur</Button>
                </Link>
            </div>

            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Görsel</Table.HeaderCell>
                        <Table.HeaderCell>Başlık</Table.HeaderCell>
                        <Table.HeaderCell>Link Tipi</Table.HeaderCell>
                        <Table.HeaderCell>Durum</Table.HeaderCell>
                        <Table.HeaderCell>İşlemler</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {data?.banners?.map((banner: Banner) => (
                        <Table.Row key={banner.id}>
                            <Table.Cell>
                                <img src={banner.image_url} alt={banner.title} className="h-12 w-20 object-cover rounded" />
                            </Table.Cell>
                            <Table.Cell>{banner.title}</Table.Cell>
                            <Table.Cell>{banner.link_type}</Table.Cell>
                            <Table.Cell>
                                <StatusBadge color={banner.is_active ? "green" : "grey"}>
                                    {banner.is_active ? "Aktif" : "Pasif"}
                                </StatusBadge>
                            </Table.Cell>
                            <Table.Cell className="flex gap-2">
                                <Link to={`/app/banners/${banner.id}`}>
                                    <Button variant="transparent" size="small">
                                        <PencilSquare />
                                    </Button>
                                </Link>
                                <Button
                                    variant="transparent"
                                    size="small"
                                    className="text-ui-fg-destructive"
                                    onClick={() => handleDelete(banner.id)}
                                >
                                    <Trash />
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                    {data?.banners?.length === 0 && (
                        <Table.Row>
                            <Table.Cell className="text-center py-4">
                                Henüz banner bulunmuyor.
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </Container>
    )
}

export const config = defineRouteConfig({
    label: "Bannerlar",
})

export default BannersPage
