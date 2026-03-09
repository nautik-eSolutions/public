import { createI18n } from 'vue-i18n'

const localeFiles = import.meta.glob('@/locales/*.json', { eager: true })

const messages = Object.fromEntries(
  Object.entries(localeFiles).map(([path, module]) => {
    const lang = path.match(/\/([^/]+)\.json$/)[1]
    return [lang, module.default]
  }),
)

export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'es', // Cambiado a 'locale' para consistencia
  fallbackLocale: 'es',
  messages,
})
