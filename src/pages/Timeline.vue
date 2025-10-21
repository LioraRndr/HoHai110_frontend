<template>
  <div class="timeline-page">
    <Navbar />

    <!-- 使用新的时光之河时间线组件 -->
    <TimelineComponent />

    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import TimelineComponent from '@/components/Timeline.vue'
</script>

<style scoped>
.timeline-page {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #F8F5EF 0%, #E5E2DC 100%);
}
</style>
