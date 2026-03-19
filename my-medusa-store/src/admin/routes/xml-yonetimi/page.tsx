import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Button, Heading, Text } from "@medusajs/ui"
import { useState, useEffect } from "react"
import "../../index.css"

// ─── Tipler ───────────────────────────────────────────
type ImportStatus = "idle" | "loading" | "success" | "error"
type IntervalOption = { value: string; label: string }

const INTERVAL_OPTIONS: IntervalOption[] = [
    { value: "1h", label: "Her 1 Saat" },
    { value: "3h", label: "Her 3 Saat" },
    { value: "6h", label: "Her 6 Saat" },
    { value: "12h", label: "Her 12 Saat" },
    { value: "daily", label: "Günlük (24 Saat)" },
    { value: "weekly", label: "Haftalık" },
    { value: "manual", label: "Sadece Manuel" },
]

// ─── Bileşen ──────────────────────────────────────────
const XMLYonetimiPage = () => {
    const [xmlUrl, setXmlUrl] = useState("http://panel.efsanebaharat.com/urunler.xml")
    const [interval, setInterval] = useState("daily")
    const [status, setStatus] = useState<ImportStatus>("idle")
    const [summary, setSummary] = useState<{ total: number; created: number; updated: number; errors: number } | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [settingsSaved, setSettingsSaved] = useState(false)
    const [savedSettings, setSavedSettings] = useState<{ xmlUrl: string; interval: string; lastRun?: string } | null>(null)

    // Kayıtlı ayarları yükle
    useEffect(() => {
        fetch("/admin/xml-import")
            .then(r => r.json())
            .then(data => {
                if (data.settings) {
                    setSavedSettings(data.settings)
                    setXmlUrl(data.settings.xmlUrl)
                    setInterval(data.settings.interval)
                }
            })
            .catch(() => { /* sessiz hata */ })
    }, [])

    // ── Hemen İçe Aktar ──
    const handleImport = async () => {
        if (!xmlUrl.trim()) {
            setErrorMessage("Lütfen geçerli bir XML URL girin.")
            return
        }
        setStatus("loading")
        setSummary(null)
        setErrorMessage(null)

        try {
            const res = await fetch("/admin/xml-import", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ xmlUrl, interval, save: false }),
            })
            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || "Bilinmeyen hata")
            }

            setSummary(data.summary)
            setStatus("success")
        } catch (err: any) {
            setErrorMessage(err.message || "Bağlantı hatası oluştu.")
            setStatus("error")
        }
    }

    // ── Ayarları Kaydet ──
    const handleSaveSettings = async () => {
        if (!xmlUrl.trim()) {
            setErrorMessage("Lütfen XML URL girin.")
            return
        }
        setErrorMessage(null)
        try {
            const res = await fetch("/admin/xml-import", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ xmlUrl, interval }),
            })
            const data = await res.json()
            if (res.ok) {
                setSavedSettings(data.settings)
                setSettingsSaved(true)
                setTimeout(() => setSettingsSaved(false), 3000)
            }
        } catch {
            setErrorMessage("Ayarlar kaydedilemedi.")
        }
    }

    const intervalLabel = INTERVAL_OPTIONS.find(o => o.value === (savedSettings?.interval || interval))?.label || ""

    return (
        <div className="flex flex-col gap-y-6 p-6">

            {/* ── Başlık ── */}
            <div>
                <Heading level="h1" className="text-white text-2xl font-bold">XML İçe Aktarım Yönetimi</Heading>
                <Text className="text-[#bba79b] mt-1">
                    Dış kaynaktan XML çekip mağazanızdaki ürünleri otomatik güncelleyin
                </Text>
            </div>

            {/* ── Ana Kart: URL Giriş + Import ── */}
            <div className="rounded-xl bg-[#231e1a] p-6 ring-1 ring-[#3a2e27]">
                <div className="flex items-center gap-3 mb-5">
                    <div className="rounded-lg bg-[#3a2e27] p-2 flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f05b05" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">XML Kaynağı</h3>
                        <p className="text-sm text-[#bba79b]">URL girin ve ürünlerinizi hemen içe aktarın</p>
                    </div>
                </div>

                {/* URL Input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-[#bba79b] mb-1">XML Dosyası URL'si</label>
                    <input
                        type="url"
                        value={xmlUrl}
                        onChange={(e) => setXmlUrl(e.target.value)}
                        placeholder="https://example.com/urunler.xml"
                        className="w-full rounded-lg bg-[#181311] border border-[#3a2e27] py-2.5 px-4 text-sm text-white placeholder:text-[#5a4a42] focus:outline-none focus:ring-1 focus:ring-[#f05b05] transition"
                    />
                    <p className="mt-1 text-xs text-[#8c7b72]">
                        XML kaynağı ürün adı, fiyat, stok, açıklama, resim ve kategori içermelidir.
                    </p>
                </div>

                {/* Import Butonu */}
                <Button
                    variant="primary"
                    onClick={handleImport}
                    disabled={status === "loading"}
                    className="bg-[#f05b05] hover:bg-[#d14d04] text-white font-semibold px-6"
                >
                    {status === "loading" ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v8z" />
                            </svg>
                            İçe Aktarılıyor...
                        </span>
                    ) : "XML'i Şimdi İçe Aktar"}
                </Button>
            </div>

            {/* ── Sonuç Kartı ── */}
            {status === "success" && summary && (
                <div className="rounded-xl bg-green-500/10 p-5 ring-1 ring-green-500/30">
                    <div className="flex items-center gap-2 mb-3">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <h3 className="text-green-400 font-semibold">İçe Aktarım Tamamlandı!</h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            { label: "Toplam Ürün", value: summary.total, color: "text-white" },
                            { label: "Yeni Eklendi", value: summary.created, color: "text-green-400" },
                            { label: "Güncellendi", value: summary.updated, color: "text-blue-400" },
                            { label: "Hata", value: summary.errors, color: "text-red-400" },
                        ].map(({ label, value, color }) => (
                            <div key={label} className="rounded-lg bg-[#231e1a] p-3 text-center">
                                <p className={`text-2xl font-bold ${color}`}>{value}</p>
                                <p className="text-xs text-[#bba79b] mt-1">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── Hata Kartı ── */}
            {(status === "error" || errorMessage) && (
                <div className="rounded-xl bg-red-500/10 p-5 ring-1 ring-red-500/30 flex items-start gap-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <div>
                        <p className="text-red-400 font-semibold text-sm">Hata</p>
                        <p className="text-red-300/80 text-sm mt-0.5">{errorMessage}</p>
                    </div>
                </div>
            )}

            {/* ── Zamanlanmış Güncelleme Ayarları ── */}
            <div className="rounded-xl bg-[#231e1a] p-6 ring-1 ring-[#3a2e27]">
                <div className="flex items-center gap-3 mb-5">
                    <div className="rounded-lg bg-[#3a2e27] p-2 flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FCC85A" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Otomatik Güncelleme Planı</h3>
                        <p className="text-sm text-[#bba79b]">XML kaynağı belirtilen aralıkta otomatik çekilir</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-[#bba79b] mb-1">Güncelleme Sıklığı</label>
                        <select
                            value={interval}
                            onChange={(e) => setInterval(e.target.value as string)}
                            className="w-full rounded-lg bg-[#181311] border border-[#3a2e27] py-2.5 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#f05b05] transition"
                        >
                            {INTERVAL_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Button
                        variant="secondary"
                        onClick={handleSaveSettings}
                        className="bg-[#3a2e27] hover:bg-[#4a3b32] text-white whitespace-nowrap"
                    >
                        {settingsSaved ? (
                            <span className="flex items-center gap-1 text-green-400">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                Kaydedildi
                            </span>
                        ) : "Ayarları Kaydet"}
                    </Button>
                </div>

                {/* Kayıtlı Ayar Özeti */}
                {savedSettings && (
                    <div className="mt-4 rounded-lg bg-[#2a2420] p-3 flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs text-[#bba79b]">Aktif Plan:</span>
                            <span className="text-xs text-white font-medium">{intervalLabel}</span>
                        </div>
                        {savedSettings.lastRun && (
                            <span className="text-xs text-[#8c7b72]">
                                Son çalışma: {new Date(savedSettings.lastRun).toLocaleString("tr-TR")}
                            </span>
                        )}
                    </div>
                )}

                <p className="mt-3 text-xs text-[#8c7b72]">
                    ⚠️ Zamanlanmış güncelleme için sunucu tarafında bir cron job çalışıyor olmalıdır.
                    Medusa'nın jobs sistemi bu görevi arka planda otomatik tetikler.
                </p>
            </div>

            {/* ── Dışa Aktarım Bölümü ── */}
            <div className="rounded-xl bg-[#231e1a] p-6 ring-1 ring-[#3a2e27]">
                <div className="flex items-center gap-3 mb-4">
                    <div className="rounded-lg bg-[#3a2e27] p-2 flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#bba79b" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">XML Dışa Aktarım</h3>
                        <p className="text-sm text-[#bba79b]">Mevcut ürünlerinizi XML olarak indirin</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="secondary"
                        className="bg-[#3a2e27] hover:bg-[#4a3b32] text-white"
                        onClick={async () => {
                            const res = await fetch("/admin/xml-export")
                            if (res.ok) {
                                const blob = await res.blob()
                                const url = window.URL.createObjectURL(blob)
                                const a = document.createElement("a")
                                a.href = url
                                a.download = `urunler-${new Date().toISOString().split("T")[0]}.xml`
                                document.body.appendChild(a)
                                a.click()
                                window.URL.revokeObjectURL(url)
                                a.remove()
                            }
                        }}
                    >
                        XML İndir
                    </Button>
                    <Button
                        variant="secondary"
                        className="bg-[#3a2e27] hover:bg-[#4a3b32] text-white"
                        onClick={async () => {
                            const res = await fetch("/admin/xml-export?preview=true")
                            if (res.ok) {
                                const text = await res.text()
                                alert(text.slice(0, 1000) + (text.length > 1000 ? "\n\n... (devamı var)" : ""))
                            }
                        }}
                    >
                        Önizle
                    </Button>
                </div>
            </div>

        </div>
    )
}

export const config = defineRouteConfig({
    label: "XML Yönetimi",
})

export default XMLYonetimiPage
