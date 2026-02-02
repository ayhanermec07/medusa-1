import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="bg-sage/10 border border-sage/30 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-2xl text-sage">
            person
          </span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-text-main">
            Hesabınız var mı?
          </h3>
          <p className="text-sm text-text-muted">
            Daha iyi bir alışveriş deneyimi için giriş yapın.
          </p>
        </div>
      </div>
      <LocalizedClientLink href="/account">
        <button
          className="bg-white border-2 border-sage text-sage hover:bg-sage hover:text-white font-bold py-2.5 px-6 rounded-lg transition-all whitespace-nowrap"
          data-testid="sign-in-button"
        >
          Giriş Yap
        </button>
      </LocalizedClientLink>
    </div>
  )
}

export default SignInPrompt
