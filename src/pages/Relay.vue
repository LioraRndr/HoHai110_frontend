<template>
  <div class="relay-page">
    <Navbar />
    <TorchParticleField />
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import TorchParticleField from '@/components/TorchParticleField.vue'
</script>

<style scoped>
.relay-page {
  width: 100%;
  min-height: 100vh;
}
</style>
