import LocalizedClientLink from "@modules/common/components/localized-client-link"

const FeaturedCategories = () => {
    return (
        <div className="w-full flex justify-center px-4 md:px-10 py-16 bg-background-cream">
            <div className="w-full max-w-[1340px]">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-text-main tracking-tight mb-2">
                            Öne Çıkan Kategoriler
                        </h2>
                        <p className="text-text-muted text-lg">
                            Mutfakların vazgeçilmez lezzetleri.
                        </p>
                    </div>
                    <LocalizedClientLink
                        href="/store"
                        className="text-primary font-bold text-base flex items-center gap-2 hover:translate-x-1 transition-transform"
                    >
                        Tümünü Gör{" "}
                        <span className="material-symbols-outlined text-lg">
                            arrow_forward
                        </span>
                    </LocalizedClientLink>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {/* Category 1 */}
                    <LocalizedClientLink href="/store" className="group flex flex-col gap-4">
                        <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white shadow-sm relative border border-[#e8e4dc]">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{
                                    backgroundImage:
                                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDSjPINotQBxStV-G40VFlKzaodrA97qyaaAl-3Bh2UQhWSmqbIq61n6Cw9h6BrudVPkWJ1dS70hCVN1MMbnYMXW3O9Ru2W1kuOMe1yPv_0JDDJ3K85XcK7SEytBz168Hrz2VAD30YaOxIceUsCdE6ZzhSTx4amRJ0TAknVg2H7Qauz-bvavTSUO7sXzi4idWWLx_X6OcfYQlsKQ1E4i1vQJFsYLiKg4ab1P5yQwk-RYmV2V6UoEc_VL_hNgNjkLRjj-jnSh-vIpjA')",
                                }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                        </div>
                        <div className="px-1">
                            <p className="text-xl font-bold text-text-main group-hover:text-primary transition-colors">
                                Biberler & Acılar
                            </p>
                            <p className="text-text-muted text-sm">İsot, Pul Biber, Paprika</p>
                        </div>
                    </LocalizedClientLink>

                    {/* Category 2 */}
                    <LocalizedClientLink href="/store" className="group flex flex-col gap-4">
                        <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white shadow-sm relative border border-[#e8e4dc]">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{
                                    backgroundImage:
                                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC8rRDYUYi8rhu08fFv7rDGWUHKsPtE2Gx5_9tv8z0jxEg3Tos_bmNb4ltcIr6VKe1ePdbBrjzU5f2FnTRcz-bD7sZH-60s3Uf_HzMViSct3XIX0rpHoNxg30sj1HiwgbwgO0JMQbRABSD2m-q-suFtfCXlYKQkqmiPlcY9U5hxao_1qnqFfhKz7q9DdqoNUz6WbY4GZmj6dporGQ9jctwGa9O3OPJ8mE4ZJ2_8IeFEwT00RfAUWuOtjiVV2mFPRxytuXJNEYay0NQ')",
                                }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                        </div>
                        <div className="px-1">
                            <p className="text-xl font-bold text-text-main group-hover:text-primary transition-colors">
                                Kurutulmuş Otlar
                            </p>
                            <p className="text-text-muted text-sm">Kekik, Nane, Biberiye</p>
                        </div>
                    </LocalizedClientLink>

                    {/* Category 3 */}
                    <LocalizedClientLink href="/store" className="group flex flex-col gap-4">
                        <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white shadow-sm relative border border-[#e8e4dc]">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{
                                    backgroundImage:
                                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAKOKAQTTJ2rixP5mI0G5Jx9oRzZxdwyWeTg83Y-YS_a24q9BavsgD_FA4JpaKWN1G_E898aOv2J1SKNbboy6bvupL6cq0Hv-odBZ9DWuU6WjVpVSkHdysHawB2jvw9K81qMukMA1sqQoi23S37I49_GzyvQm6wkIG1sYMAY2uLb0Dzmr23rm4virkJJ0lJDpDwwi7CYEycgo3WRTgfGBk7NPoZFHLO4f5BG1uRFVk8HpaPuxnwupOlnrLP6rzdtGZ0mQpnOlsl8Tw')",
                                }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                        </div>
                        <div className="px-1">
                            <p className="text-xl font-bold text-text-main group-hover:text-primary transition-colors">
                                Tohum Baharatlar
                            </p>
                            <p className="text-text-muted text-sm">
                                Kimyon, Kişniş, Çörek Otu
                            </p>
                        </div>
                    </LocalizedClientLink>

                    {/* Category 4 */}
                    <LocalizedClientLink href="/store" className="group flex flex-col gap-4">
                        <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white shadow-sm relative border border-[#e8e4dc]">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{
                                    backgroundImage:
                                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBzc_m3vIoeZV2QyH6FxH4qNSxq9qG3N-KJLYuM0bos4iH03YsDBxlIkxyWxjEsFvljZSs9mjV_fxRvKueLOoJboQeSCUcyg7DOtVj3yfAKkWotU-iEylx-PM7qAneXBo6GeYdJnNbP-1qsSF93PPqBHfdGqyTZ-OvtIxGJVw5U0p366rXm-JZvCH178bInH8Ale6o2HYpT_-1sd1rZcIVpMKmdmR-l5rPFZz8mmurjNwwChCBhUYIddRn_RIe_5-gZ22jJj6StwkY')",
                                }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                        </div>
                        <div className="px-1">
                            <p className="text-xl font-bold text-text-main group-hover:text-primary transition-colors">
                                Özel Karışımlar
                            </p>
                            <p className="text-text-muted text-sm">Köri, Kajun, Osmanlı</p>
                        </div>
                    </LocalizedClientLink>
                </div>
            </div>
        </div>
    )
}

export default FeaturedCategories
