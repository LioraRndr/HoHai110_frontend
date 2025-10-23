<template>
  <div class="culture-container">
    <Navbar />

    <!-- 页面导航 - 使用深色主题 -->
    <PageNav :navItems="navItems" theme="dark" />

    <!-- Hero Section -->
    <CultureHero />

    <!-- Timeline Section -->
    <!-- <CultureTimeline
      :milestones="milestones"
      :active-milestone="activeMilestone"
      @update:active-milestone="setActiveMilestone"
    /> -->

    <!-- Spirit Section -->
    <CultureSpirit
      :spirits="spirits"
      :hover-index="hoverSpirit"
      @update:hover-index="hoverSpirit = $event"
    />

    <!-- Achievement Section -->
    <CultureAchievement
      :achievements="achievements"
      @open-modal="openAchievementModal"
    />

    <!-- Global Impact Section -->
    <CultureGlobal :stats="globalStats" />

    <!-- Achievement Modal -->
    <CultureModal
      v-model:show="showModal"
      :achievement="selectedAchievement"
      @close="closeModal"
    />

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, h, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCultureAnimations } from '@/composables/useCultureAnimations'
import { useCultureData } from '@/composables/useCultureData'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import CultureHero from '@/components/culture/CultureHero.vue'
import CultureTimeline from '@/components/culture/CultureTimeline.vue'
import CultureSpirit from '@/components/culture/CultureSpirit.vue'
import CultureAchievement from '@/components/culture/CultureAchievement.vue'
import CultureGlobal from '@/components/culture/CultureGlobal.vue'
import CultureModal from '@/components/culture/CultureModal.vue'
import PageNav from '@/components/PageNav.vue'

const { t } = useI18n()

// 导航项配置
const navItems = computed(() => [
  {
    id: 'hero',
    label: t('culturePage.pageNav.hero'),
    icon: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' }, [
      h('path', { d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
    ])
  },
  {
    id: 'spirit',
    label: t('culturePage.pageNav.spirit'),
    icon: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' }, [
      h('path', { d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
    ])
  },
  {
    id: 'achievement',
    label: t('culturePage.pageNav.achievement'),
    icon: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' }, [
      h('path', { d: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
    ])
  },
  {
    id: 'global',
    label: t('culturePage.pageNav.global'),
    icon: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' }, [
      h('path', { d: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
    ])
  }
])

// 使用 composables
const { milestones, spirits, achievements, globalStats } = useCultureData()
const { initAnimations, cleanupAnimations } = useCultureAnimations()

// 状态管理
const activeMilestone = ref(0)
const hoverSpirit = ref(null)
const showModal = ref(false)
const selectedAchievement = ref(null)

// 方法
const setActiveMilestone = (index) => {
  activeMilestone.value = index
}

const openAchievementModal = (achievement) => {
  selectedAchievement.value = achievement
  showModal.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  showModal.value = false
  selectedAchievement.value = null
  document.body.style.overflow = 'auto'
}

// 生命周期
onMounted(() => {
  initAnimations()
})

onUnmounted(() => {
  document.body.style.overflow = 'auto'
  cleanupAnimations()
})
</script>

<style scoped>
.culture-container {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #0a0e1a 0%, #1a1f35 50%, #0a0e1a 100%);
  color: #ffffff;
  overflow-x: hidden;
}
</style>
