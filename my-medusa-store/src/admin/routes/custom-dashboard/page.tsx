import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading } from "@medusajs/ui"
import "../../index.css"

const CustomDashboardPage = () => {
    return (
        <div className="flex flex-col gap-y-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Stat Card 1 */}
                <div className="group relative overflow-hidden rounded-xl bg-[#231e1a] p-6 ring-1 ring-[#3a2e27] transition-all hover:ring-[#f05b05]/50">
                    <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y--8 rounded-full bg-[#f05b05]/10 blur-2xl transition-all group-hover:bg-[#f05b05]/20"></div>
                    <div className="mb-4 flex items-center justify-between">
                        <div className="rounded-lg bg-[#3a2e27] p-2 text-white">
                            <span className="material-symbols-outlined">payments</span>
                        </div>
                        <span className="flex items-center text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                            <span className="material-symbols-outlined text-[14px] mr-1">
                                trending_up
                            </span>{" "}
                            +15%
                        </span>
                    </div>
                    <p className="text-sm font-medium text-[#bba79b]">Günlük Satışlar</p>
                    <h3 className="mt-1 text-2xl font-bold text-white">₺12,450</h3>
                </div>

                {/* Stat Card 2 */}
                <div className="group relative overflow-hidden rounded-xl bg-[#231e1a] p-6 ring-1 ring-[#3a2e27] transition-all hover:ring-[#FCC85A]/50">
                    <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y--8 rounded-full bg-[#FCC85A]/10 blur-2xl transition-all group-hover:bg-[#FCC85A]/20"></div>
                    <div className="mb-4 flex items-center justify-between">
                        <div className="rounded-lg bg-[#3a2e27] p-2 text-white">
                            <span className="material-symbols-outlined">shopping_cart</span>
                        </div>
                        <span className="flex items-center text-xs font-medium text-[#FCC85A] bg-[#FCC85A]/10 px-2 py-1 rounded-full">
                            Bekleyen
                        </span>
                    </div>
                    <p className="text-sm font-medium text-[#bba79b]">
                        Bekleyen Siparişler
                    </p>
                    <h3 className="mt-1 text-2xl font-bold text-white">18 Sipariş</h3>
                </div>

                {/* Stat Card 3 */}
                <div className="group relative overflow-hidden rounded-xl bg-[#231e1a] p-6 ring-1 ring-[#3a2e27] transition-all hover:ring-[#f05b05]/50">
                    <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y--8 rounded-full bg-[#f05b05]/10 blur-2xl transition-all group-hover:bg-[#f05b05]/20"></div>
                    <div className="mb-4 flex items-center justify-between">
                        <div className="rounded-lg bg-[#3a2e27] p-2 text-white">
                            <span className="material-symbols-outlined">warning</span>
                        </div>
                        <span className="flex items-center text-xs font-medium text-[#f05b05] bg-[#f05b05]/10 px-2 py-1 rounded-full">
                            Aksiyon Gerekli
                        </span>
                    </div>
                    <p className="text-sm font-medium text-[#bba79b]">
                        Düşük Stok Uyarıları
                    </p>
                    <h3 className="mt-1 text-2xl font-bold text-white">5 Ürün</h3>
                </div>

                {/* Stat Card 4 */}
                <div className="group relative overflow-hidden rounded-xl bg-[#231e1a] p-6 ring-1 ring-[#3a2e27] transition-all hover:ring-[#F2DFA3]/50">
                    <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y--8 rounded-full bg-[#F2DFA3]/10 blur-2xl transition-all group-hover:bg-[#F2DFA3]/20"></div>
                    <div className="mb-4 flex items-center justify-between">
                        <div className="rounded-lg bg-[#3a2e27] p-2 text-white">
                            <span className="material-symbols-outlined">group_add</span>
                        </div>
                        <span className="flex items-center text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                            <span className="material-symbols-outlined text-[14px] mr-1">
                                trending_up
                            </span>{" "}
                            +5%
                        </span>
                    </div>
                    <p className="text-sm font-medium text-[#bba79b]">Yeni Müşteriler</p>
                    <h3 className="mt-1 text-2xl font-bold text-white">24</h3>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Chart Section */}
                <div className="rounded-xl bg-[#231e1a] p-6 ring-1 ring-[#3a2e27] lg:col-span-2">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-white">
                                Haftalık Satış Trendi
                            </h3>
                            <p className="text-sm text-[#bba79b]">
                                Son 7 günlük satış performansı
                            </p>
                        </div>
                        <select className="rounded-lg border-none bg-[#3a2e27] py-2 pl-3 pr-8 text-sm text-white ring-1 ring-white/10 focus:ring-[#f05b05]">
                            <option>Bu Hafta</option>
                            <option>Geçen Hafta</option>
                            <option>Bu Ay</option>
                        </select>
                    </div>
                    {/* Chart SVG Placeholder */}
                    <div className="relative h-64 w-full">
                        <svg
                            className="h-full w-full"
                            preserveAspectRatio="none"
                            viewBox="0 0 800 300"
                        >
                            <defs>
                                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                    <stop
                                        offset="0%"
                                        stopColor="#f05b05"
                                        stopOpacity="0.3"
                                    ></stop>
                                    <stop
                                        offset="100%"
                                        stopColor="#f05b05"
                                        stopOpacity="0"
                                    ></stop>
                                </linearGradient>
                            </defs>
                            {/* Grid Lines */}
                            <line
                                stroke="#3a2e27"
                                strokeWidth="1"
                                x1="0"
                                x2="800"
                                y1="250"
                                y2="250"
                            ></line>
                            <line
                                stroke="#3a2e27"
                                strokeDasharray="4 4"
                                strokeWidth="1"
                                x1="0"
                                x2="800"
                                y1="190"
                                y2="190"
                            ></line>
                            <line
                                stroke="#3a2e27"
                                strokeDasharray="4 4"
                                strokeWidth="1"
                                x1="0"
                                x2="800"
                                y1="130"
                                y2="130"
                            ></line>
                            <line
                                stroke="#3a2e27"
                                strokeDasharray="4 4"
                                strokeWidth="1"
                                x1="0"
                                x2="800"
                                y1="70"
                                y2="70"
                            ></line>
                            {/* Area */}
                            <path
                                d="M0,250 L0,150 C100,150 150,80 250,120 C350,160 400,200 500,100 C600,0 650,50 800,80 L800,250 Z"
                                fill="url(#chartGradient)"
                            ></path>
                            {/* Line */}
                            <path
                                d="M0,150 C100,150 150,80 250,120 C350,160 400,200 500,100 C600,0 650,50 800,80"
                                fill="none"
                                stroke="#f05b05"
                                strokeLinecap="round"
                                strokeWidth="3"
                            ></path>
                            {/* Dots */}
                            <circle
                                cx="250"
                                cy="120"
                                fill="#181311"
                                r="4"
                                stroke="#f05b05"
                                strokeWidth="2"
                            ></circle>
                            <circle
                                cx="500"
                                cy="100"
                                fill="#181311"
                                r="4"
                                stroke="#f05b05"
                                strokeWidth="2"
                            ></circle>
                        </svg>
                    </div>
                    <div className="mt-4 flex justify-between px-2 text-xs font-medium text-[#bba79b]">
                        <span>Pzt</span>
                        <span>Sal</span>
                        <span>Çar</span>
                        <span>Per</span>
                        <span>Cum</span>
                        <span>Cmt</span>
                        <span>Paz</span>
                    </div>
                </div>

                {/* Low Stock Alert */}
                <div className="flex flex-col rounded-xl bg-[#231e1a] ring-1 ring-[#3a2e27]">
                    <div className="flex items-center justify-between border-b border-[#3a2e27] p-6">
                        <h3 className="text-lg font-bold text-white">Stok Uyarıları</h3>
                        <span className="rounded-full bg-[#f05b05]/20 px-2.5 py-0.5 text-xs font-bold text-[#f05b05]">
                            Acil
                        </span>
                    </div>
                    <div className="flex flex-1 flex-col gap-4 p-6">
                        {/* Item 1 */}
                        <div className="flex items-center gap-4">
                            <div
                                className="h-12 w-12 flex-shrink-0 rounded-lg bg-cover bg-center"
                                style={{
                                    backgroundImage:
                                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD9qqBrvzN7zNdIxmU09REupYduH5tYJuVDWmr1slCExwwxwwxMBjkiI8sh_Eyvdd1ej5aSV9E8pmBk-pczKHB7kYGkOvNQq5XNwzD8QcPT1x3pUOaQvjvQKxWCKas_uIApOljFXOhWLGQX7rssXAxee1pDplkxtDm_IzzZTL3BvUGtG0rVtsZD4SrT5b9XaqVcNmZUuBoLC02hK8l-EbWL58oOsMVAbNmChgbSB5nuEok42JiZ_MjNu1sxcOQ47sxwTgSThN3LW0M')",
                                }}
                            ></div>
                            <div className="flex flex-1 flex-col">
                                <h4 className="text-sm font-medium text-white">
                                    Kırmızı Toz Biber
                                </h4>
                                <div className="mt-1 h-1.5 w-full rounded-full bg-[#3a2e27]">
                                    <div className="h-1.5 w-[15%] rounded-full bg-[#f05b05]"></div>
                                </div>
                                <span className="mt-1 text-xs text-[#bba79b]">
                                    Stok: 15kg (Kritik)
                                </span>
                            </div>
                        </div>
                        {/* Item 2 */}
                        <div className="flex items-center gap-4">
                            <div
                                className="h-12 w-12 flex-shrink-0 rounded-lg bg-cover bg-center"
                                style={{
                                    backgroundImage:
                                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCP7DPnaE5So1IRvjeLEEw1AIajjaYpM46V2iLpz9j5xh8k32oCEDrXcwZV0i-m3-EHAYV0Uhvy2PIJk-gxtY8MxqBxp59YwDKqL-L5y5M9G_rdNKNQ4s87YljcxfKDgRPRuyYf1KgQRzR24kxzIP6tkm0KkJP6ehm6wy6zFDlpqKTtdRKb9fjg1WbvheBbYmgLmT80US8N2XMZ0MR15PzLpnDXK72_bzeSC9CJRBer_epEDdTQ1I0YYH9l9x2_Ugmw9X0wWbS11Ho')",
                                }}
                            ></div>
                            <div className="flex flex-1 flex-col">
                                <h4 className="text-sm font-medium text-white">
                                    Tane Karabiber
                                </h4>
                                <div className="mt-1 h-1.5 w-full rounded-full bg-[#3a2e27]">
                                    <div className="h-1.5 w-[25%] rounded-full bg-[#FCC85A]"></div>
                                </div>
                                <span className="mt-1 text-xs text-[#bba79b]">
                                    Stok: 28kg (Düşük)
                                </span>
                            </div>
                        </div>
                        {/* Item 3 */}
                        <div className="flex items-center gap-4">
                            <div
                                className="h-12 w-12 flex-shrink-0 rounded-lg bg-cover bg-center"
                                style={{
                                    backgroundImage:
                                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCyGEUGAWFPUwrGn76TETqkU7eAPE73JHLYh0aUcYKIizbhVV0XZtoGKTS78rHVqbVLrNKRO_vYVDgFJC7UxazoUrjCcExw2tKS87PkslxvacVBNP7hoUJzVNijftvRTJ4E32RYs_yE4dW-m-8D9iYCVTU_gUnjRNV1PrOUq431L5n_1DTPhHKFBm27h0Yf2C7DYYyG-LZFXQ3_XptkP8kALiDfJYSLZ9wZuMWGQI0rHW1_6TcMHXnLPQdQgL7DyJTg4JHDa_7eYqo')",
                                }}
                            ></div>
                            <div className="flex flex-1 flex-col">
                                <h4 className="text-sm font-medium text-white">Zerdeçal</h4>
                                <div className="mt-1 h-1.5 w-full rounded-full bg-[#3a2e27]">
                                    <div className="h-1.5 w-[10%] rounded-full bg-[#f05b05]"></div>
                                </div>
                                <span className="mt-1 text-xs text-[#bba79b]">
                                    Stok: 8kg (Kritik)
                                </span>
                            </div>
                        </div>
                        <button className="mt-auto w-full rounded-lg bg-[#3a2e27] py-2 text-sm font-medium text-white hover:bg-[#4a3b32] transition-colors">
                            Tüm Stokları Gör
                        </button>
                    </div>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="rounded-xl bg-[#231e1a] ring-1 ring-[#3a2e27]">
                <div className="flex items-center justify-between border-b border-[#3a2e27] p-6">
                    <h3 className="text-lg font-bold text-white">Son Siparişler</h3>
                    <button className="flex items-center text-sm font-medium text-[#f05b05] hover:text-[#ff7a2e]">
                        Tümünü Gör{" "}
                        <span className="material-symbols-outlined ml-1 text-[16px]">
                            arrow_forward
                        </span>
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-[#bba79b]">
                        <thead className="border-b border-[#3a2e27] bg-[#2a2420] text-xs uppercase text-[#bba79b]">
                            <tr>
                                <th className="px-6 py-4 font-medium" scope="col">
                                    Sipariş ID
                                </th>
                                <th className="px-6 py-4 font-medium" scope="col">
                                    Müşteri
                                </th>
                                <th className="px-6 py-4 font-medium" scope="col">
                                    Tarih
                                </th>
                                <th className="px-6 py-4 font-medium" scope="col">
                                    Tutar
                                </th>
                                <th className="px-6 py-4 font-medium" scope="col">
                                    Durum
                                </th>
                                <th className="px-6 py-4 font-medium text-right" scope="col">
                                    İşlem
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#3a2e27]">
                            <tr className="hover:bg-[#2a2420]/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-white">#EF-2849</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="h-8 w-8 rounded-full bg-cover bg-center"
                                            style={{
                                                backgroundImage:
                                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDA89uFpEcl3hASrGAL0idAM4p13BAS5PUKV9wVDrQXAQhDx1v5V6o8M3e2KfcixxZKgQZzOEvJqpUx9jsDcsb53U6WBbAy2GHYWoMsxYiqpwHUaj4el9BoAOf9tRP0EN2fm3CtZIiZJnEA08MUl8Lf92Mw9zjCla66TgH9e7SYC9LXALY0p_ipwejkC5mQTduQmn5vt-BBHGoQzrrqpcsdbUZjbNoFDMIWGkutdOjrEFmhtuSyjrQGs8aRc9mZ7xdTL3tkElZJtCo')",
                                            }}
                                        ></div>
                                        <span className="text-white">Mehmet Demir</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">24 Ekim 2023</td>
                                <td className="px-6 py-4 font-medium text-white">₺3,450.00</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center rounded-full bg-[#FCC85A]/10 px-2.5 py-0.5 text-xs font-medium text-[#FCC85A]">
                                        Bekliyor
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-[#bba79b] hover:text-white">
                                        <span className="material-symbols-outlined">more_vert</span>
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-[#2a2420]/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-white">#EF-2848</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="h-8 w-8 rounded-full bg-cover bg-center"
                                            style={{
                                                backgroundImage:
                                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBBHtSuUF2ArPMR01-4XqQqaimuITTT0jzxLi93urALMSu4c9rgK5CFvW0HDGXjIsf6N_iGr2TNdZMS_opgaKub_592-hz9m9KrA9xiEj1LrTI_k-ngUr52239PsyYlgTG4YQ4SsDaWVW6KAT92MCZPW5ukrnvt7ciu2d0YjVLj0Q3L-NTfkiSPDLR0DARDY5X9j-5AKBqhMVPChFwKNZ_MY3Q1Ypa_rHJU3a8HrebKxh086dGTMkz4qIh2x3ZiaFYl-9jkk6fXRHI')",
                                            }}
                                        ></div>
                                        <span className="text-white">Ayşe Kaya</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">23 Ekim 2023</td>
                                <td className="px-6 py-4 font-medium text-white">₺1,200.50</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-500">
                                        Tamamlandı
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-[#bba79b] hover:text-white">
                                        <span className="material-symbols-outlined">more_vert</span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export const config = defineRouteConfig({
    label: "Custom Dashboard",
    icon: "dashboard",
})

export default CustomDashboardPage
