import LocalizedClientLink from "@modules/common/components/localized-client-link"

const AboutTemplate = () => {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <div className="@container px-4 md:px-10 py-5">
                <div className="@[480px]:p-4">
                    <div
                        className="flex min-h-[520px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-2xl items-center justify-center p-8 relative shadow-2xl overflow-hidden"
                        style={{
                            backgroundImage:
                                'linear-gradient(rgba(44, 36, 27, 0.4) 0%, rgba(44, 36, 27, 0.7) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAgZYbbzZbhmTiCKRgWVIRs1O-p-yUVFxwn9N9hZhE8tySRgabg1mVuz_OdVmIGg30VrPRW5fd-syhNnEu-uz3ohmp5TPWACmmISKiO5hgDVP7AWJ6c6HQRqBnb6MEZUrhNaUE9uQrqnTBR00UD1D9FULLwc8bGHEyBY47da5DHfv75eQ2t5K_w6qMPlwkObDUzIN_K5SXrdoyLDKf-rXm-GaM1kC9GMVTGOApmg06x0_xPtCobZnx1qH9iBOxcjIHkfAD5_iBQ9H8")',
                        }}
                    >
                        <div className="flex flex-col gap-4 text-center max-w-[800px] z-10">
                            <h1 className="text-white text-5xl font-black leading-tight tracking-[-0.033em] md:text-6xl drop-shadow-lg">
                                Tarladan Sofraya, <br />
                                <span className="text-secondary">Efsane Lezzetler</span>
                            </h1>
                            <h2 className="text-gray-100 text-base font-normal leading-normal md:text-xl md:leading-relaxed mt-4 max-w-2xl mx-auto">
                                Doğallığın ve geleneğin buluşma noktası. 30 yılı aşkın
                                tecrübemizle Türkiye&apos;nin en taze baharatlarını, özenle
                                işleyip dünyaya sunuyoruz.
                            </h2>
                        </div>
                        <LocalizedClientLink href="/b2b">
                            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-primary text-white text-lg font-bold leading-normal tracking-[0.015em] shadow-lg hover:bg-primary-dark transition-all transform hover:-translate-y-1 z-10 mt-4">
                                <span className="truncate">Toptan Alım İçin Başvur</span>
                            </button>
                        </LocalizedClientLink>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="flex flex-wrap gap-6 px-4 md:px-10 py-4 justify-center -mt-6">
                <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-8 bg-white border border-stone-100 shadow-md hover:shadow-lg transition-shadow">
                    <p className="text-accent text-base font-medium leading-normal">
                        Yıllık Tecrübe
                    </p>
                    <p className="text-secondary tracking-light text-4xl font-black leading-tight">
                        30+
                    </p>
                </div>
                <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-8 bg-white border border-stone-100 shadow-md hover:shadow-lg transition-shadow">
                    <p className="text-accent text-base font-medium leading-normal">
                        İhracat Ülkesi
                    </p>
                    <p className="text-secondary tracking-light text-4xl font-black leading-tight">
                        50+
                    </p>
                </div>
                <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-8 bg-white border border-stone-100 shadow-md hover:shadow-lg transition-shadow">
                    <p className="text-accent text-base font-medium leading-normal">
                        Ürün Çeşidi
                    </p>
                    <p className="text-secondary tracking-light text-4xl font-black leading-tight">
                        100+
                    </p>
                </div>
                <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-8 bg-white border border-stone-100 shadow-md hover:shadow-lg transition-shadow">
                    <p className="text-accent text-base font-medium leading-normal">
                        Mutlu Müşteri
                    </p>
                    <p className="text-secondary tracking-light text-4xl font-black leading-tight">
                        5000+
                    </p>
                </div>
            </div>

            {/* Story Section */}
            <div className="mx-4 md:mx-10 my-8 rounded-3xl bg-sage-light p-8 md:p-12 shadow-sm">
                <div className="flex flex-col gap-10 max-w-[1200px] mx-auto">
                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        <div className="flex flex-col gap-6 flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-12 h-1 bg-primary rounded-full"></div>
                                <span className="text-primary font-bold uppercase tracking-widest text-sm">
                                    Hakkımızda
                                </span>
                            </div>
                            <h2 className="text-text-main tracking-tight text-4xl font-black leading-tight md:text-5xl">
                                Hikayemiz
                            </h2>
                            <p className="text-text-main text-lg font-normal leading-relaxed">
                                1990 yılında Gaziantep&apos;te, küçük bir baharatçı dükkanı
                                olarak başlayan serüvenimiz, bugün kıtaları aşan bir lezzet
                                yolculuğuna dönüştü. Efsane Baharat olarak, doğanın bize sunduğu
                                en saf lezzetleri, geleneksel yöntemlere sadık kalarak topluyor,
                                ancak modern teknolojinin imkanlarıyla işleyip paketliyoruz.
                            </p>
                            <p className="text-text-main text-lg font-normal leading-relaxed">
                                Anadolu&apos;nun bereketli topraklarından sofralarınıza uzanan
                                bu köprüde, tazelikten ve kaliteden asla ödün vermedik. Aile
                                değerlerimizi kurumsal yapımıza entegre ederek, iş ortaklarımıza
                                sadece bir tedarikçi değil, güvenilir bir yol arkadaşı olmayı
                                hedefledik.
                            </p>
                        </div>

                        {/* Timeline */}
                        <div className="flex-1 w-full grid grid-cols-1 gap-6">
                            <div className="flex gap-6 p-6 rounded-2xl bg-white border-l-8 border-primary shadow-sm hover:shadow-md transition-all transform hover:-translate-x-1">
                                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary shrink-0">
                                    <span className="material-symbols-outlined text-[32px]">
                                        storefront
                                    </span>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h3 className="text-text-main text-xl font-bold">
                                        Kuruluş (1990)
                                    </h3>
                                    <p className="text-accent text-base mt-1">
                                        Gaziantep Bakırcılar Çarşısı&apos;nda ilk dükkanımızı açtık.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-6 p-6 rounded-2xl bg-white border-l-8 border-secondary shadow-sm hover:shadow-md transition-all transform hover:-translate-x-1">
                                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-secondary/10 text-secondary shrink-0">
                                    <span className="material-symbols-outlined text-[32px]">
                                        trending_up
                                    </span>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h3 className="text-text-main text-xl font-bold">
                                        Büyüme (2005)
                                    </h3>
                                    <p className="text-accent text-base mt-1">
                                        İlk fabrikamızı kurduk ve toptan satışa başladık.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-6 p-6 rounded-2xl bg-white border-l-8 border-accent shadow-sm hover:shadow-md transition-all transform hover:-translate-x-1">
                                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-accent/20 text-accent shrink-0">
                                    <span className="material-symbols-outlined text-[32px]">
                                        public
                                    </span>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h3 className="text-text-main text-xl font-bold">
                                        Globalleşme (2023)
                                    </h3>
                                    <p className="text-accent text-base mt-1">
                                        50&apos;den fazla ülkeye ihracat yaparak dünya markası
                                        olduk.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modern Facilities Section */}
            <div className="flex flex-col gap-8 px-4 md:px-10 py-6 max-w-[1200px] mx-auto w-full">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-1 bg-secondary rounded-full"></div>
                        <span className="text-secondary font-bold uppercase tracking-widest text-sm">
                            Üretim
                        </span>
                    </div>
                    <h2 className="text-text-main text-4xl font-bold leading-tight">
                        Modern Tesislerimiz
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[500px] md:h-[450px]">
                    <div className="md:col-span-2 h-full rounded-2xl overflow-hidden relative group shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                        <div
                            className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{
                                backgroundImage:
                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAXU5UxRINgVsnRWs2HUyEzMNyENtlAofuP-Jpi88VeXsOuyKtqvIzlHPohJqE_0QUYoksoycSmrpkPQvBfsa4R3bIqWjTBZUurewuFZrcf0hA_n-hxnn3I7UqsIyN_GEb2AlfHnavFWggWfJXn83T-pOJU1Jhjw2zn8cj4W921iDoM2A2k6FhH0aPLQ_pkDDTN8dRjMjn99kf-9lTtT9bvREBzY-9y5NmkeyONeDJIu11STHbzjXeZ8OlV0c6LcMkj6MlZbL0mFfs")',
                            }}
                        ></div>
                        <div className="absolute bottom-6 left-6 z-20">
                            <span className="bg-primary text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-2 inline-block">
                                Teknoloji
                            </span>
                            <h3 className="text-white text-2xl font-bold">
                                Yüksek Kapasiteli Üretim
                            </h3>
                        </div>
                    </div>
                    <div className="grid grid-rows-2 gap-6 h-full">
                        <div className="rounded-2xl overflow-hidden relative group h-full shadow-lg">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                            <div
                                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDJpuYGq69sxguaDnSODBt2M0ucX21UYtY71__cDfV53nz8WRFDGRkoKp1567PD1s7-70y1HAjXBMZKBeHKi3K8fAaSCm7buDhjaHMaPd34jQZ9S3azSJaJ7T91q9GFxmVT-l-b0295Kb3-mTG2BUp2zFP8qhSkKVXlNn1vO4Je9ek_TwtVbd3uUNNbNe5CArvk1TYRqDEQAW8awyaFzQYJysb5j4uQaNIvPpVSa6iYJ1QX7zLhdE7yZbYpbtW3ixTj6-6qxdFDeTQ")',
                                }}
                            ></div>
                            <div className="absolute bottom-6 left-6 z-20">
                                <span className="bg-secondary text-text-main px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                                    Hammadde
                                </span>
                                <h3 className="text-white text-xl font-bold">1. Sınıf Mahsul</h3>
                            </div>
                        </div>
                        <div className="rounded-2xl overflow-hidden relative group h-full shadow-lg">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                            <div
                                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDLmPv6bMrWoUk5ZVCAH9Fhreqjg-y7UcmEuCQaQxnQz-kc8dECGgyPOVP3bMPvrodFqyghNmgjaCfjzU85IUxyu6ZAQfNWPOUwGHBdO_MOTyMbd98LRSj44dyilH2KXDxfvWR8fLXDhgmupVL0RfopUgOjdWWoBK8SZLEZtc6CJ5sz01ub9VwYHR2u8bAK8iKNDoszXHtCIY5uM_LSlQ1b2hgKGF-OVzuqJbCC09JcZ2pRa-eEMD5YG3DGkQxPc2AN7MffPFDXKxk")',
                                }}
                            ></div>
                            <div className="absolute bottom-6 left-6 z-20">
                                <span className="bg-accent text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                                    Kalite
                                </span>
                                <h3 className="text-white text-xl font-bold">
                                    Laboratuvar Kontrolü
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission & Vision Section */}
            <div className="flex flex-col gap-10 px-4 md:px-10 py-10 bg-white rounded-3xl mx-4 md:mx-10 my-8 max-w-[1200px] lg:mx-auto w-full lg:w-[calc(100%-5rem)]">
                <div className="text-center mb-6">
                    <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">
                        Değerlerimiz
                    </span>
                    <h2 className="text-text-main text-4xl font-bold leading-tight mb-4">
                        Misyon & Vizyon
                    </h2>
                    <p className="text-accent text-xl max-w-2xl mx-auto">
                        İlk günden beri değişmeyen prensiplerimizle geleceğe yürüyoruz.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-6 rounded-3xl bg-background-cream p-10 border border-stone-200 shadow-lg relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                        <div className="flex items-center gap-5 z-10">
                            <div className="p-4 bg-primary text-white rounded-2xl shadow-md">
                                <span className="material-symbols-outlined text-[36px]">
                                    flag
                                </span>
                            </div>
                            <h3 className="text-3xl font-bold text-text-main">Misyonumuz</h3>
                        </div>
                        <p className="text-text-main text-lg leading-relaxed z-10">
                            Müşterilerimize her zaman en taze, en doğal ve en kaliteli
                            baharatları, sürdürülebilir tarım ilkelerine sadık kalarak sunmak.
                            Geleneksel lezzetleri modern gıda güvenliği standartlarıyla
                            harmanlamak.
                        </p>
                    </div>
                    <div className="flex flex-col gap-6 rounded-3xl bg-background-cream p-10 border border-stone-200 shadow-lg relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                        <div className="flex items-center gap-5 z-10">
                            <div className="p-4 bg-secondary text-text-main rounded-2xl shadow-md">
                                <span className="material-symbols-outlined text-[36px]">
                                    visibility
                                </span>
                            </div>
                            <h3 className="text-3xl font-bold text-text-main">Vizyonumuz</h3>
                        </div>
                        <p className="text-text-main text-lg leading-relaxed z-10">
                            Baharat sektöründe yenilikçi yaklaşımlarla global bir lider olmak.
                            Türk baharatlarını dünya mutfaklarının vazgeçilmezi yapmak ve
                            sektörde kalite standardını belirleyen marka olmak.
                        </p>
                    </div>
                </div>
            </div>

            {/* Quality Policy Section */}
            <div className="mx-4 md:mx-10 my-6 rounded-3xl bg-gradient-to-br from-[#f8efe9] to-sage-light p-8 md:p-16 shadow-md border border-stone-100 max-w-[1200px] lg:mx-auto w-full lg:w-[calc(100%-5rem)]">
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-4 text-center">
                        <span className="text-accent font-bold uppercase tracking-widest text-sm">
                            Standartlarımız
                        </span>
                        <h2 className="text-text-main text-4xl font-bold leading-tight">
                            Kalite Politikamız
                        </h2>
                        <p className="text-text-main text-lg font-normal mx-auto max-w-[700px]">
                            Güvenilir gıda, sağlıklı yaşam ilkesiyle çıktığımız yolda, kalite
                            standartlarımızdan asla taviz vermiyoruz.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-6">
                        <div className="flex flex-col items-center text-center gap-5 bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-20 h-20 rounded-full bg-background-cream flex items-center justify-center shadow-inner text-primary mb-2">
                                <span className="material-symbols-outlined text-[40px]">
                                    health_and_safety
                                </span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-text-main mb-2">
                                    Yüksek Hijyen
                                </h3>
                                <p className="text-base text-accent">
                                    ISO 22000 ve Helal Gıda sertifikalı tesislerimizde, el
                                    değmeden tam otomatik paketleme.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center text-center gap-5 bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-20 h-20 rounded-full bg-background-cream flex items-center justify-center shadow-inner text-secondary mb-2">
                                <span className="material-symbols-outlined text-[40px]">
                                    eco
                                </span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-text-main mb-2">
                                    Tazelik Garantisi
                                </h3>
                                <p className="text-base text-accent">
                                    Hasat mevsiminde toplanan ürünler, aroma ve besin değerlerini
                                    kaybetmeden işlenir.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center text-center gap-5 bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-20 h-20 rounded-full bg-background-cream flex items-center justify-center shadow-inner text-accent mb-2">
                                <span className="material-symbols-outlined text-[40px]">
                                    local_shipping
                                </span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-text-main mb-2">
                                    Hızlı Lojistik
                                </h3>
                                <p className="text-base text-accent">
                                    Gelişmiş tedarik zincirimiz ile siparişleriniz en kısa sürede
                                    kapınızda.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutTemplate
