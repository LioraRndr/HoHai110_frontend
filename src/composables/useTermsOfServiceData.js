import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import termsOfServiceDataZh from '@/i18n/locales/termsOfServiceData.zh'
import termsOfServiceDataEn from '@/i18n/locales/termsOfServiceData.en'

/**
 * Terms of Service data management
 * Provides terms of service content and translations
 */
export function useTermsOfServiceData() {
  const { locale } = useI18n()

  const termsData = computed(() => {
    return locale.value === 'zh' ? termsOfServiceDataZh : termsOfServiceDataEn
  })

  // Page title
  const title = computed(() => termsData.value.title)

  // Last updated text
  const lastUpdated = computed(() => termsData.value.lastUpdated)

  // Update date
  const updateDate = computed(() => termsData.value.updateDate)

  // All sections
  const sections = computed(() => termsData.value.sections)

  // Action buttons
  const actions = computed(() => termsData.value.actions)

  return {
    title,
    lastUpdated,
    updateDate,
    sections,
    actions
  }
}
