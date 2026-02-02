const Advantages = () => {
    return (
        <div className="w-full flex justify-center px-4 md:px-10 py-16 lg:py-20 bg-white">
            <div className="w-full max-w-[1340px]">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-primary font-bold text-sm tracking-widest uppercase mb-3">
                        Neden Efsane Baharat?
                    </h2>
                    <h3 className="text-4xl font-black text-text-main tracking-tight mb-4">
                        Avantajlarımız
                    </h3>
                    <p className="text-text-muted text-lg">
                        Kalite standartlarımız ve hizmet anlayışımızla fark yaratıyoruz.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Advantage 1 */}
                    <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-background-cream border border-[#f0ede6] hover:shadow-soft transition-all hover:-translate-y-1 duration-300">
                        <div className="h-20 w-20 rounded-full bg-sage-light flex items-center justify-center text-sage mb-6 shadow-inner">
                            <span className="material-symbols-outlined text-4xl">
                                agriculture
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-text-main">
                            Tarladan Sofraya
                        </h3>
                        <p className="text-text-muted text-base leading-relaxed">
                            Aracıları ortadan kaldırarak doğrudan üreticiden alıyor, tazeliği ve
                            aromayı koruyarak size ulaştırıyoruz.
                        </p>
                    </div>

                    {/* Advantage 2 */}
                    <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-background-cream border border-[#f0ede6] hover:shadow-soft transition-all hover:-translate-y-1 duration-300">
                        <div className="h-20 w-20 rounded-full bg-[#fcece9] flex items-center justify-center text-primary mb-6 shadow-inner">
                            <span className="material-symbols-outlined text-4xl">
                                price_check
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-text-main">
                            Toptan Fiyat Avantajı
                        </h3>
                        <p className="text-text-muted text-base leading-relaxed">
                            Restoranlar ve üreticiler için özel fiyatlandırma. Düzenli
                            alımlarda %40'a varan maliyet avantajı sağlayın.
                        </p>
                    </div>

                    {/* Advantage 3 */}
                    <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-background-cream border border-[#f0ede6] hover:shadow-soft transition-all hover:-translate-y-1 duration-300">
                        <div className="h-20 w-20 rounded-full bg-[#fdf5d8] flex items-center justify-center text-[#d9ac2a] mb-6 shadow-inner">
                            <span className="material-symbols-outlined text-4xl">
                                local_shipping
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-text-main">
                            Aynı Gün Kargo
                        </h3>
                        <p className="text-text-muted text-base leading-relaxed">
                            Saat 14:00'ten önceki siparişleriniz aynı gün yola çıkar. 2500 TL
                            üzeri siparişlerde ücretsiz kargo fırsatı.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Advantages

