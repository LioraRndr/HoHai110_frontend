import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import cultureDataZh from '@/i18n/locales/cultureData.zh'
import cultureDataEn from '@/i18n/locales/cultureData.en'

/**
 * 河海文化数据管理
 * 提供百年历程、河海精神、辉煌成就和国际影响等数据
 */
export function useCultureData() {
  const { locale } = useI18n()

  const cultureData = computed(() => {
    return locale.value === 'zh' ? cultureDataZh : cultureDataEn
  })

  // 百年历程数据
  const milestones = computed(() =>
    cultureData.value.milestones.map((m, index) => ({
      ...m,
      icon: ['🏛️', '🎓', '🌟', '🏗️', '💧', '🌍', '🎉'][index],
      image: true
    }))
  )

  // 河海精神数据
  const spirits = computed(() =>
    cultureData.value.spirits.map((s, index) => ({
      ...s,
      icon: ['💪', '📐', '🎯', '🚀'][index]
    }))
  )

  // 辉煌成就数据
  const achievements = computed(() =>
    cultureData.value.achievements.map((a, index) => ({
      ...a,
      icon: ['🏗️', '💧', '⚡', '🌊', '🌍', '🔬'][index]
    }))
  )

  // 国际影响数据
  const globalStats = computed(() =>
    cultureData.value.globalStats.map((s, index) => ({
      ...s,
      icon: ['🌍', '👨‍🎓', '💧', '🏆'][index]
    }))
  )

  // UI 标签
  const labels = computed(() => cultureData.value.labels)
  const ui = computed(() => cultureData.value.ui)

  return {
    milestones,
    spirits,
    achievements,
    globalStats,
    labels,
    ui
  }
}
