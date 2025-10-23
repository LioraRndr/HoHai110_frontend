import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import privacyPolicyDataZh from '@/i18n/locales/privacyPolicyData.zh'
import privacyPolicyDataEn from '@/i18n/locales/privacyPolicyData.en'

/**
 * Privacy Policy data management
 * Provides privacy policy content and translations
 */
export function usePrivacyPolicyData() {
  const { locale } = useI18n()

  const privacyData = computed(() => {
    return locale.value === 'zh' ? privacyPolicyDataZh : privacyPolicyDataEn
  })

  // Page title
  const title = computed(() => privacyData.value.title)

  // Last updated text
  const lastUpdated = computed(() => privacyData.value.lastUpdated)

  // Update date
  const updateDate = computed(() => privacyData.value.updateDate)

  // All sections
  const sections = computed(() => privacyData.value.sections)

  // Action buttons
  const actions = computed(() => privacyData.value.actions)

  return {
    title,
    lastUpdated,
    updateDate,
    sections,
    actions
  }
}
