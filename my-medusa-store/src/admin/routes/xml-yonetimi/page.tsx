import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Button, Text } from "@medusajs/ui"
import { useState } from "react"
import "../../index.css"

const XMLYonetimiPage = () => {
    const [isExporting, setIsExporting] = useState(false)
    const [xmlPreview, setXmlPreview] = useState<string | null>(null)
    const [scheduleInterval, setScheduleInterval] = useState("daily")

    const handleExport = async () => {
        setIsExporting(true)
        try {
            const response = await fetch("/admin/xml-export")
            if (response.ok) {
                const blob = await response.blob()
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement("a")
                a.href = url
                a.download = `products-${new Date().toISOString().split("T")[0]}.xml`
                document.body.appendChild(a)
                a.click()
                window.URL.revokeObjectURL(url)
                a.remove()
            }
        } catch (error) {
            console.error("XML export error:", error)
        } finally {
            setIsExporting(false)
        }
    }

    const handlePreview = async () => {
        try {
            const response = await fetch("/admin/xml-export?preview=true")
            if (response.ok) {
                const text = await response.text()
                setXmlPreview(text)
            }
        } catch (error) {
            console.error("XML preview error:", error)
        }
    }

    return (
        <div className="flex flex-col gap-y-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <Heading level="h1" className="text-white text-2xl font-bold">
                        XML Yönetimi
                    </Heading>
                    <Text className="text-[#bba79b] mt-1">
                        Ürün verilerinizi XML formatında dışa aktarın
                    </Text>
                </div>
            </div>

            {/* Export Actions */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Instant Export Card */}
                <div className="rounded-xl bg-[#231e1a] p-6 ring-1 ring-[#3a2e27]">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="rounded-lg bg-[#3a2e27] p-2">
                            <span className="material-symbols-outlined text-[#f05b05]">
                                download
                            </span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Anlık Dışa Aktarım</h3>
                            <p className="text-sm text-[#bba79b]">XML dosyasını hemen indirin</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            variant="primary"
                            onClick={handleExport}
                            disabled={isExporting}
                            className="bg-[#f05b05] hover:bg-[#d14d04] text-black font-medium"
                        >
                            {isExporting ? "İndiriliyor..." : "XML İndir"}
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={handlePreview}
                            className="bg-[#3a2e27] hover:bg-[#4a3b32] text-white"
                        >
                            Önizle
                        </Button>
                    </div>
                </div>

                {/* Scheduled Export Card */}
                <div className="rounded-xl bg-[#231e1a] p-6 ring-1 ring-[#3a2e27]">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="rounded-lg bg-[#3a2e27] p-2">
                            <span className="material-symbols-outlined text-[#FCC85A]">
                                schedule
                            </span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Zamanlanmış Dışa Aktarım</h3>
                            <p className="text-sm text-[#bba79b]">Otomatik XML üretimi ayarlayın</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <select
                            value={scheduleInterval}
                            onChange={(e) => setScheduleInterval(e.target.value)}
                            className="rounded-lg bg-[#3a2e27] py-2 px-3 text-sm text-white ring-1 ring-white/10 focus:ring-[#f05b05]"
                        >
                            <option value="daily">Günlük</option>
                            <option value="weekly">Haftalık</option>
                            <option value="monthly">Aylık</option>
                        </select>
                        <Button
                            variant="secondary"
                            className="bg-[#3a2e27] hover:bg-[#4a3b32] text-white"
                        >
                            Kaydet
                        </Button>
                    </div>
                    <p className="mt-3 text-xs text-[#8c7b72]">
                        Not: Zamanlanmış dışa aktarım için bir cron job yapılandırması gereklidir.
                    </p>
                </div>
            </div>

            {/* XML Preview */}
            {xmlPreview && (
                <div className="rounded-xl bg-[#231e1a] p-6 ring-1 ring-[#3a2e27]">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-white">XML Önizleme</h3>
                        <Button
                            variant="secondary"
                            size="small"
                            onClick={() => setXmlPreview(null)}
                            className="bg-[#3a2e27] hover:bg-[#4a3b32] text-white"
                        >
                            Kapat
                        </Button>
                    </div>
                    <pre className="overflow-auto max-h-96 rounded-lg bg-[#181311] p-4 text-sm text-[#bba79b] font-mono">
                        {xmlPreview}
                    </pre>
                </div>
            )}

            {/* Info Section */}
            <div className="rounded-xl bg-[#231e1a]/50 p-4 ring-1 ring-[#3a2e27]">
                <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#f05b05]">info</span>
                    <div>
                        <h4 className="text-sm font-medium text-white">XML Formatı Hakkında</h4>
                        <p className="text-sm text-[#bba79b] mt-1">
                            Dışa aktarılan XML dosyası tüm ürünlerinizi, varyantlarını, fiyatlarını ve
                            stok bilgilerini içerir. Bu dosyayı pazaryeri entegrasyonları veya
                            yedekleme amacıyla kullanabilirsiniz.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const config = defineRouteConfig({
    label: "XML Yönetimi",
})

export default XMLYonetimiPage
