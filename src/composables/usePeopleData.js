import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import peopleDataZh from '@/i18n/locales/peopleData.zh'
import peopleDataEn from '@/i18n/locales/peopleData.en'

/**
 * 河海人物数据管理
 * 提供人物介绍、事迹等数据
 */
export function usePeopleData() {
  const { locale } = useI18n()

  const peopleData = computed(() => {
    return locale.value === 'zh' ? peopleDataZh : peopleDataEn
  })

  // 介绍数据
  const introduction = computed(() => peopleData.value.introduction)

  // 人物数据
  const people = computed(() => peopleData.value.people)

  // 合影数据
  const groupPhoto = computed(() => peopleData.value.groupPhoto)

  // UI 标签
  const ui = computed(() => peopleData.value.ui)

  return {
    introduction,
    people,
    groupPhoto,
    ui
  }
}
