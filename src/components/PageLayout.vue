<template>
  <div class="page-layout">
    <Navbar :theme="navbarTheme" />

    <main class="main-content">
      <slot></slot>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'

// 接收导航栏主题属性
const props = defineProps({
  navbarTheme: {
    type: String,
    default: 'dark', // 'dark' 或 'light'
    validator: (value) => ['dark', 'light'].includes(value)
  }
})
</script>

<style scoped>
.page-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>
