<template>
  <div class="maxims-page">
    <Navbar />
    <TetrahedronCard />
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import TetrahedronCard from '@/components/TetrahedronCard.vue'
</script>

<style scoped>
.maxims-page {
  width: 100%;
  min-height: 100vh;
}
</style>
