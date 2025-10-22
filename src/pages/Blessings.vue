<template>
  <PageLayout>
    <div class="blessings-page">
      <!-- 火炬传递效果 -->
      <TorchParticleField />

      <!-- 祝福墙组件 -->
      <BlessingWall @update:total="total = $event" />
    </div>
  </PageLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { blessingAPI } from '@/api'
import PageLayout from '@/components/PageLayout.vue'
import BlessingWall from '@/components/BlessingWall.vue'
import TorchParticleField from '@/components/TorchParticleField.vue'

const total = ref(0)

</script>
