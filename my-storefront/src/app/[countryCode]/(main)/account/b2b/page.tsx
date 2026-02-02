import { Metadata } from "next"
import B2BLoginTemplate from "@modules/account/templates/b2b-login-template"

export const metadata: Metadata = {
    title: "B2B Kurumsal Giriş - Efsane Baharat",
    description:
        "Toptan satış ağımıza katılın. Şefler, perakendeciler ve distribütörler için birinci sınıf baharatlar.",
}

export default function B2BLoginPage() {
    return <B2BLoginTemplate />
}
