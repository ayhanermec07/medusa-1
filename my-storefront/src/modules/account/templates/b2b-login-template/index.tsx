"use client"

import { useActionState, useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { login, signupB2B } from "@lib/data/customer"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import ErrorMessage from "@modules/checkout/components/error-message"

const B2BLoginTemplate = () => {
    const [activeTab, setActiveTab] = useState<"login" | "register">("login")
    const [loginMessage, loginAction] = useActionState(login, null)
    const [registerMessage, registerAction] = useActionState(signupB2B, null)

    return (
        <div className="min-h-screen flex flex-col bg-background-cream">
            {/* B2B Header */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-input-border px-8 lg:px-12 py-6 lg:py-8 bg-white z-20 relative shadow-sm">
                <div className="flex items-center gap-4 text-primary">
                    <div className="w-12 h-12">
                        <svg
                            fill="currentColor"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z"></path>
                            <path
                                clipRule="evenodd"
                                d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236ZM4.95178 15.2312L21.4543 41.6973C22.6288 43.5809 25.3712 43.5809 26.5457 41.6973L43.0534 15.223C43.0709 15.1948 43.0878 15.1662 43.104 15.1371L41.3563 14.1648C43.104 15.1371 43.1038 15.1374 43.104 15.1371L43.1051 15.135L43.1065 15.1325L43.1101 15.1261L43.1199 15.1082C43.1276 15.094 43.1377 15.0754 43.1497 15.0527C43.1738 15.0075 43.2062 14.9455 43.244 14.8701C43.319 14.7208 43.4196 14.511 43.5217 14.2683C43.6901 13.8679 44 13.0689 44 12.2609C44 10.5573 43.003 9.22254 41.8558 8.2791C40.6947 7.32427 39.1354 6.55361 37.385 5.94477C33.8654 4.72057 29.133 4 24 4C18.867 4 14.1346 4.72057 10.615 5.94478C8.86463 6.55361 7.30529 7.32428 6.14419 8.27911C4.99695 9.22255 3.99999 10.5573 3.99999 12.2609C3.99999 13.1275 4.29264 13.9078 4.49321 14.3607C4.60375 14.6102 4.71348 14.8196 4.79687 14.9689C4.83898 15.0444 4.87547 15.1065 4.9035 15.1529C4.91754 15.1762 4.92954 15.1957 4.93916 15.2111L4.94662 15.223L4.95178 15.2312ZM35.9868 18.996L24 38.22L12.0131 18.996C12.4661 19.1391 12.9179 19.2658 13.3617 19.3718C16.4281 20.1039 20.0901 20.5217 24 20.5217C27.9099 20.5217 31.5719 20.1039 34.6383 19.3718C35.082 19.2658 35.5339 19.1391 35.9868 18.996Z"
                                fill="currentColor"
                                fillRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                    <h2 className="text-text-main text-3xl font-bold leading-tight tracking-[-0.015em]">
                        Efsane Baharat B2B
                    </h2>
                </div>
                <div className="flex items-center gap-6">
                    <LocalizedClientLink
                        href="/"
                        className="text-text-main text-base font-medium hover:text-primary transition-colors hidden sm:block"
                    >
                        Mağazaya Dön
                    </LocalizedClientLink>
                    <a
                        href="#"
                        className="text-text-main text-base font-medium hover:text-primary transition-colors"
                    >
                        İletişim
                    </a>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* Left Panel - Image */}
                <div
                    className="relative hidden lg:flex flex-1 flex-col justify-end p-12 lg:p-16 bg-cover bg-center overflow-hidden"
                    style={{
                        backgroundImage:
                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAspZp0U6H1Y_tZuDp7NHDiiCRhho8DcNPgVLJzMsstooL3Idm0-LXV6rIF5YfW4lS109Oo71REOf3XbJ4AMzR0E1SPO-7v5_RT2zXJxGfDG7P1_kYFeAyQTJ6NKXU5X1WB_9cthgmb-vu4z_hERjNqxZg6T_DF7uWR7VXDf7JwLgIrIl2W5qoWKMs73KIRcynMLP_oZn1kRMe_HV1-91S_yDhzgVlis4Op4FvRhI5gWnx8qX0Wo06C5wtci5mmWYlfNb5K0VHFGAc')",
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/50 to-transparent z-0"></div>
                    <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-0"></div>

                    <div className="relative z-10 text-white max-w-lg">
                        <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-secondary">
                            <span className="material-symbols-outlined text-3xl">
                                verified
                            </span>
                        </div>
                        <h1
                            className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-4 text-white"
                            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
                        >
                            Özel Toptan Satış Fiyatlarını Keşfedin
                        </h1>
                        <p className="text-lg text-gray-200 font-medium leading-relaxed mb-8">
                            Şefler, perakendeciler ve distribütörler için birinci sınıf
                            baharatlar. Dünyanın en iyi lezzetlerini doğrudan kaynağından
                            tedarik eden 500&apos;den fazla iş ortağına katılın.
                        </p>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-secondary">
                                    check_circle
                                </span>
                                <span className="text-sm font-medium">
                                    Perakende fiyatına göre %40&apos;a varan indirimler
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-secondary">
                                    check_circle
                                </span>
                                <span className="text-sm font-medium">
                                    Kurumsal iş ortakları için vadeli ödeme
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-secondary">
                                    check_circle
                                </span>
                                <span className="text-sm font-medium">
                                    Öncelikli kargo & özel destek
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Form */}
                <div className="flex-1 flex flex-col bg-white overflow-y-auto">
                    <div className="w-full max-w-md mx-auto px-6 py-12 lg:py-20 flex flex-col justify-center h-full">
                        {/* Tab Switcher */}
                        <div className="mb-8">
                            <div className="flex p-1 bg-background-cream rounded-lg border border-input-border">
                                <button
                                    onClick={() => setActiveTab("login")}
                                    className={`flex-1 py-3 px-4 rounded-md text-sm font-semibold transition-all ${activeTab === "login"
                                        ? "bg-white text-primary shadow-sm"
                                        : "text-text-muted"
                                        }`}
                                >
                                    Giriş Yap
                                </button>
                                <button
                                    onClick={() => setActiveTab("register")}
                                    className={`flex-1 py-3 px-4 rounded-md text-sm font-semibold transition-all ${activeTab === "register"
                                        ? "bg-white text-primary shadow-sm"
                                        : "text-text-muted"
                                        }`}
                                >
                                    Kayıt Ol
                                </button>
                            </div>
                        </div>

                        {/* Login Form */}
                        {activeTab === "login" && (
                            <div className="flex flex-col gap-6">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold text-text-main tracking-tight">
                                        Tekrar Hoşgeldiniz
                                    </h2>
                                    <p className="text-text-muted">
                                        Panelinize erişmek için lütfen bilgilerinizi girin.
                                    </p>
                                </div>

                                <form className="flex flex-col gap-5 mt-2" action={loginAction}>
                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            className="text-sm font-semibold text-text-main"
                                            htmlFor="email"
                                        >
                                            E-posta Adresi
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-accent material-symbols-outlined text-[20px]">
                                                mail
                                            </span>
                                            <input
                                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-input-border bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-shadow placeholder:text-gray-400/70"
                                                id="email"
                                                name="email"
                                                placeholder="sef@restoran.com"
                                                type="email"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex justify-between items-center">
                                            <label
                                                className="text-sm font-semibold text-text-main"
                                                htmlFor="password"
                                            >
                                                Şifre
                                            </label>
                                            <a
                                                className="text-xs font-medium text-primary hover:text-primary-dark"
                                                href="#"
                                            >
                                                Şifremi unuttum?
                                            </a>
                                        </div>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-accent material-symbols-outlined text-[20px]">
                                                lock
                                            </span>
                                            <input
                                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-input-border bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-shadow placeholder:text-gray-400/70"
                                                id="password"
                                                name="password"
                                                placeholder="••••••••"
                                                type="password"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mt-1">
                                        <input
                                            className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                                            id="remember"
                                            type="checkbox"
                                        />
                                        <label
                                            className="text-sm text-text-muted select-none"
                                            htmlFor="remember"
                                        >
                                            Beni 30 gün hatırla
                                        </label>
                                    </div>

                                    <ErrorMessage error={loginMessage} data-testid="login-error-message" />

                                    <SubmitButton
                                        className="mt-4 flex w-full items-center justify-center rounded-lg bg-primary py-3 px-4 text-base font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-primary/40 active:scale-[0.98]"
                                    >
                                        Giriş Yap
                                    </SubmitButton>
                                </form>

                                <div className="mt-4 p-4 rounded-lg bg-background-cream border border-input-border/50 flex items-start gap-3">
                                    <span className="material-symbols-outlined text-accent text-xl mt-0.5">
                                        lock
                                    </span>
                                    <div className="text-xs text-text-muted leading-relaxed">
                                        Verileriniz endüstri standardı 256-bit şifreleme ile
                                        korunmaktadır. İşletme detaylarınızı asla üçüncü şahıslarla
                                        paylaşmayız.
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Register Form */}
                        {activeTab === "register" && (
                            <div className="flex flex-col gap-6">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold text-text-main tracking-tight">
                                        İş Ortağı Olun
                                    </h2>
                                    <p className="text-text-muted">
                                        Toptan satış ağımıza katılın. 24 saat içinde onay.
                                    </p>
                                </div>

                                <form className="flex flex-col gap-4 mt-2" action={registerAction}>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label
                                                className="text-sm font-semibold text-text-main"
                                                htmlFor="first_name"
                                            >
                                                Ad
                                            </label>
                                            <input
                                                className="w-full px-4 py-3 rounded-lg border border-input-border bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary placeholder:text-gray-400/70"
                                                id="first_name"
                                                name="first_name"
                                                type="text"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label
                                                className="text-sm font-semibold text-text-main"
                                                htmlFor="last_name"
                                            >
                                                Soyad
                                            </label>
                                            <input
                                                className="w-full px-4 py-3 rounded-lg border border-input-border bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary placeholder:text-gray-400/70"
                                                id="last_name"
                                                name="last_name"
                                                type="text"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            className="text-sm font-semibold text-text-main"
                                            htmlFor="company_name"
                                        >
                                            Şirket Adı
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-accent material-symbols-outlined text-[20px]">
                                                storefront
                                            </span>
                                            <input
                                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-input-border bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary placeholder:text-gray-400/70"
                                                id="company_name"
                                                name="company_name"
                                                placeholder="Efsane Baharat Ltd. Şti."
                                                type="text"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            className="text-sm font-semibold text-text-main"
                                            htmlFor="business_type"
                                        >
                                            İşletme Türü
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-accent material-symbols-outlined text-[20px]">
                                                category
                                            </span>
                                            <select
                                                className="w-full pl-10 pr-10 py-3 rounded-lg border border-input-border bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary appearance-none cursor-pointer"
                                                id="business_type"
                                                name="business_type"
                                                defaultValue=""
                                                required
                                            >
                                                <option disabled value="">
                                                    İşletme türünüzü seçin
                                                </option>
                                                <option value="restaurant">Restoran / Kafe</option>
                                                <option value="retailer">Perakendeci / Market</option>
                                                <option value="distributor">Dağıtıcı</option>
                                                <option value="manufacturer">Gıda Üreticisi</option>
                                            </select>
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none material-symbols-outlined text-[20px]">
                                                expand_more
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            className="text-sm font-semibold text-text-main"
                                            htmlFor="tax_id"
                                        >
                                            Vergi No
                                        </label>
                                        <input
                                            className="w-full px-4 py-3 rounded-lg border border-input-border bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary font-mono tracking-wide placeholder:text-gray-400/70"
                                            id="tax_id"
                                            name="tax_id"
                                            placeholder="XXXXXXXXXX"
                                            type="text"
                                            required
                                        />
                                        <p className="text-xs text-text-muted">
                                            Vergi muafiyeti doğrulaması için gereklidir.
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            className="text-sm font-semibold text-text-main"
                                            htmlFor="reg_email"
                                        >
                                            İş E-postası
                                        </label>
                                        <input
                                            className="w-full px-4 py-3 rounded-lg border border-input-border bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary placeholder:text-gray-400/70"
                                            id="reg_email"
                                            name="email"
                                            type="email"
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            className="text-sm font-semibold text-text-main"
                                            htmlFor="reg_password"
                                        >
                                            Şifre
                                        </label>
                                        <input
                                            className="w-full px-4 py-3 rounded-lg border border-input-border bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary placeholder:text-gray-400/70"
                                            id="reg_password"
                                            name="password"
                                            type="password"
                                            required
                                            placeholder="••••••••"
                                        />
                                    </div>

                                    <ErrorMessage error={registerMessage} data-testid="register-error-message" />

                                    <SubmitButton
                                        className="mt-4 flex w-full items-center justify-center rounded-lg bg-primary py-3 px-4 text-base font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-primary/40 active:scale-[0.98]"
                                    >
                                        Başvuru Yap
                                    </SubmitButton>
                                </form>
                            </div>
                        )}

                        {/* Footer */}
                        <div className="mt-8 text-center border-t border-input-border pt-6">
                            <p className="text-sm text-text-muted">
                                Yardıma mı ihtiyacınız var?{" "}
                                <a
                                    className="font-semibold text-primary hover:text-primary-dark"
                                    href="#"
                                >
                                    B2B Destek Ekibimizle İletişime Geçin
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default B2BLoginTemplate
