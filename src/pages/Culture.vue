<template>
  <div class="culture-container">
    <Navbar />

    <!-- Hero Section -->
    <CultureHero />

    <!-- Timeline Section -->
    <CultureTimeline
      :milestones="milestones"
      :active-milestone="activeMilestone"
      @update:active-milestone="setActiveMilestone"
    />

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
import { ref, onMounted, onUnmounted } from 'vue'
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
