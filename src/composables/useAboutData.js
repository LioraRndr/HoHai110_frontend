import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import aboutDataZh from '@/i18n/locales/aboutData.zh'
import aboutDataEn from '@/i18n/locales/aboutData.en'

/**
 * 关于页面数据管理
 * 提供关于学校、项目介绍、团队信息等数据
 */
export function useAboutData() {
  const { locale } = useI18n()

  const aboutData = computed(() => {
    return locale.value === 'zh' ? aboutDataZh : aboutDataEn
  })

  // Hero数据
  const hero = computed(() => aboutData.value.hero)

  // 关于学校数据
  const aboutSchool = computed(() => aboutData.value.aboutSchool)

  // 发展历程数据
  const milestones = computed(() => aboutData.value.milestones)

  // 办学成就数据
  const achievements = computed(() => aboutData.value.achievements)

  // 项目数据
  const project = computed(() => aboutData.value.project)

  // 团队数据
  const team = computed(() => aboutData.value.team)

  return {
    hero,
    aboutSchool,
    milestones,
    achievements,
    project,
    team
  }
}
