<template>
  <PageLayout>
    <div class="blessings-page">
      <!-- 页面标题 -->
      <div class="page-header">
        <h1 class="page-title">{{ pageHeader.title }}</h1>
        <p class="page-subtitle">{{ pageHeader.subtitle }}</p>
      </div>

      <!-- 火炬传递区域 -->
      <TorchDisplay />

      <!-- 分割线 -->
      <div class="section-divider"></div>

      <!-- 祝福墙组件 -->
      <BlessingWall @update:total="total = $event" />
    </div>
  </PageLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useBlessingsData } from '@/composables/useBlessingsData'
import PageLayout from '@/components/PageLayout.vue'
import BlessingWall from '@/components/BlessingWall.vue'
import TorchDisplay from '@/components/TorchDisplay.vue'

const { pageHeader } = useBlessingsData()
const total = ref(0)
</script>

<style scoped>
.blessings-page {
  min-height: 100vh;
  padding: var(--spacing-3xl) var(--spacing-xl);
  background: linear-gradient(180deg, #F8F5EF 0%, #FFF 50%, #F8F5EF 100%);
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-3xl);
  padding: var(--spacing-2xl) 0;
  margin-top: 50px;
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  font-family: var(--font-title);
  background: linear-gradient(135deg, #FF7A1A 0%, #FFD700 50%, #FF7A1A 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--spacing-md);
  animation: titleShine 3s ease-in-out infinite;
  background-size: 200% auto;
}

@keyframes titleShine {
  0%, 100% {
    background-position: 0% center;
  }
  50% {
    background-position: 100% center;
  }
}

.page-subtitle {
  font-size: var(--text-xl);
  color: var(--color-ink-black);
  opacity: 0.7;
  font-weight: 500;
}

.section-divider {
  height: 3px;
  max-width: 1200px;
  margin: var(--spacing-4xl) auto;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 122, 26, 0.3) 20%,
    rgba(255, 200, 50, 0.5) 50%,
    rgba(255, 122, 26, 0.3) 80%,
    transparent 100%
  );
  border-radius: var(--radius-full);
  margin-top:35px;
  margin-bottom: 35px;
}

/* 响应式 */
@media (max-width: 768px) {
  .blessings-page {
    padding: var(--spacing-2xl) var(--spacing-md);
  }

  .page-header {
    margin-bottom: var(--spacing-2xl);
    padding: var(--spacing-xl) 0;
  }

  .page-title {
    font-size: 2rem;
  }

  .page-subtitle {
    font-size: var(--text-lg);
  }

  .section-divider {
    margin: var(--spacing-3xl) auto;
  }
}
</style>
