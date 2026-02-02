import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"

const Hero = () => {
  return (
    <div className="w-full flex justify-center px-4 md:px-10 py-8">
      <div className="w-full max-w-[1340px]">
        <div
          className="relative rounded-[2rem] overflow-hidden min-h-[550px] flex items-center bg-cover bg-center shadow-2xl shadow-[#3d322b]/10"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBst4cf7XZ18jiXPsSfTfCfPXglsrK21FX1xMUBKXXx8GhEzyXUK8SN1bQw_Ia2hzGBeFw21IbkVoso_vY3j3F60KUdfHZBuFmAQ677GjpRmlf9-afArmdFH3Cj1FkzTTrAJsTplI2YQBaYScpjY_6PsRD6ZN70xuEA2kkb242XBs5_nXOGX0-A83Haf5npG1kVqjcSQfYIbIyLDeJdylBmZRj9xximWFUa-s2oStKZQfFKa2nYCH0aMQcJ7wG52p9E4cPILFxBCTU')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#2c241f]/90 via-[#2c241f]/40 to-transparent"></div>
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
          <div className="relative z-10 px-8 md:px-16 lg:px-24 flex flex-col gap-8 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-turmeric/90 backdrop-blur-sm text-[#2c241f] text-sm font-bold w-fit shadow-lg">
              <span className="material-symbols-outlined text-lg">star</span>
              Yeni Ticari Hesap Başvuruları
            </span>
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
              Şefler ve Gurmeler için <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-turmeric to-[#ffcf5c]">
                Doğal Lezzetler
              </span>
            </h1>
            <p className="text-white/90 text-xl md:text-2xl font-medium max-w-[600px] leading-relaxed">
              Dünyanın en kaliteli baharatlarını toptan fiyatlarla keşfedin.
              Katkısız, taze ve doğrudan kaynağından mutfağınıza.
            </p>
            <div className="flex flex-wrap gap-5 pt-4">
              <a href="/store">
                <button className="h-14 px-10 rounded-xl bg-primary text-white text-lg font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/30 transform hover:-translate-y-1">
                  Kataloğu İncele
                </button>
              </a>
              <button className="h-14 px-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/30 text-white text-lg font-bold hover:bg-white/20 transition-colors">
                Fiyat Listesi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
