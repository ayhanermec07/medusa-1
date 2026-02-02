import { Metadata } from "next"
import AboutTemplate from "@modules/about/templates"

export const metadata: Metadata = {
    title: "Hakkımızda - Efsane Baharat",
    description:
        "Tarladan sofraya, efsane lezzetler. 30 yılı aşkın tecrübemizle Türkiye'nin en taze baharatlarını dünyaya sunuyoruz.",
}

export default function AboutPage() {
    return <AboutTemplate />
}
