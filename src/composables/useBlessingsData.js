import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import blessingsDataZh from '@/i18n/locales/blessingsData.zh'
import blessingsDataEn from '@/i18n/locales/blessingsData.en'

/**
 * 薪传接力数据管理
 * 提供祝福墙和火炬传递等数据
 */
export function useBlessingsData() {
  const { locale } = useI18n()

  const blessingsData = computed(() => {
    return locale.value === 'zh' ? blessingsDataZh : blessingsDataEn
  })

  // 页面标题
  const pageHeader = computed(() => blessingsData.value.pageHeader)

  // 火炬数据
  const torch = computed(() => blessingsData.value.torch)

  // 祝福墙数据
  const blessingWall = computed(() => blessingsData.value.blessingWall)

  // 祝福卡片数据
  const blessingCard = computed(() => blessingsData.value.blessingCard)

  return {
    pageHeader,
    torch,
    blessingWall,
    blessingCard
  }
}
