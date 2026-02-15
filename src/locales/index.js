import { createI18n } from 'vue-i18n'
import zhCN from './zh-CN'
import enUS from './en-US'

const messages = {
  'zh-CN': zhCN,
  'en-US': enUS,
}

const savedLocale = localStorage.getItem('locale')
const browserLocale = navigator.language || navigator.userLanguage
const defaultLocale = savedLocale || (browserLocale.startsWith('zh') ? 'zh-CN' : 'en-US')

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'en-US',
  messages,
})

export function setLocale(locale) {
  i18n.global.locale.value = locale
  localStorage.setItem('locale', locale)
  document.documentElement.setAttribute('lang', locale)
}

export function getLocale() {
  return i18n.global.locale.value
}

export function getAvailableLocales() {
  return [
    { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
    { code: 'en-US', name: 'English', flag: '🇺🇸' },
  ]
}

export default i18n
