import { createI18n } from 'vue-i18n'
import zh from './locales/zh'
import en from './locales/en'

// 从 localStorage 读取语言设置，默认中文
const savedLocale = localStorage.getItem('locale') || 'zh'

const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: savedLocale, // 默认语言
  fallbackLocale: 'zh', // 回退语言
  messages: {
    zh,
    en
  },
  // 全局注入属性
  globalInjection: true
})

export default i18n
