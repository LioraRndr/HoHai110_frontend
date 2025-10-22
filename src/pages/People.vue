<template>
  <div class="people-container">
    <Navbar />

    <!-- 页面导航 - 使用深色主题 -->
    <PageNav :navItems="navItems" theme="dark" />

    <!-- Hero Section -->
    <PeopleHero :introduction="introduction" />

    <!-- People Grid Section -->
    <PeopleGrid :people="people" @select-person="openPersonModal" />

    <!-- Person Modal -->
    <PeopleModal
      :show="showModal"
      :person="selectedPerson"
      @close="closeModal"
    />

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, h } from 'vue'
import { usePeopleAnimations } from '@/composables/usePeopleAnimations'
import { usePeopleData } from '@/composables/usePeopleData'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import PeopleHero from '@/components/people/PeopleHero.vue'
import PeopleGrid from '@/components/people/PeopleGrid.vue'
import PeopleModal from '@/components/people/PeopleModal.vue'
import PageNav from '@/components/PageNav.vue'

// 导航项配置
const navItems = [
  {
    id: 'hero',
    label: '首页',
    icon: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' }, [
      h('path', { d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
    ])
  },
  {
    id: 'people-grid',
    label: '河海英华',
    icon: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' }, [
      h('path', { d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
    ])
  }
]

// 使用 composables
const { introduction, people } = usePeopleData()
const { initAnimations, cleanupAnimations } = usePeopleAnimations()

// 状态管理
const showModal = ref(false)
const selectedPerson = ref(null)

// 方法
const openPersonModal = (person) => {
  selectedPerson.value = person
  showModal.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  showModal.value = false
  selectedPerson.value = null
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
.people-container {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #0a0e1a 0%, #1a1f35 50%, #0a0e1a 100%);
  color: #ffffff;
  overflow-x: hidden;
}
</style>
