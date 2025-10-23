<template>
  <div class="timeline-page">
    <Navbar />

    <!-- 页面导航 -->
    <PageNav :navItems="navItems" />

    <!-- 使用新的时光之河时间线组件 -->
    <TimelineComponent />

    <Footer />
  </div>
</template>

<script setup>
import { h, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import TimelineComponent from '@/components/Timeline.vue'
import PageNav from '@/components/PageNav.vue'

const { t } = useI18n()

// 导航项配置
const navItems = computed(() => [
  {
    id: 'timeline-header',
    label: t('timeline.nav.opening'),
    icon: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' }, [
      h('path', { d: 'M3 12h18M3 6h18M3 18h18', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
    ])
  },
  {
    id: 'timeline-main',
    label: t('timeline.nav.timeline'),
    icon: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' }, [
      h('path', { d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
    ])
  },
  {
    id: 'timeline-epilogue',
    label: t('timeline.nav.epilogue'),
    icon: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' }, [
      h('path', { d: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
    ])
  }
])
</script>

<style scoped>
.timeline-page {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #F8F5EF 0%, #E5E2DC 100%);
}
</style>
