<template>
  <div class="map-page">
    <div class="map-container">
      <div class="page-header">
        <h1 class="page-title">校园地图</h1>
        <p class="page-subtitle">探索河海大学校园风光</p>
      </div>

      <div class="campus-tabs">
        <button
          v-for="campus in campuses"
          :key="campus.id"
          class="tab-button"
          :class="{ active: activeCampus === campus.id }"
          @click="activeCampus = campus.id"
        >
          {{ campus.name }}
        </button>
      </div>

      <div class="map-content">
        <div class="landmarks-grid">
          <div
            v-for="landmark in currentLandmarks"
            :key="landmark.id"
            class="landmark-card"
            @click="selectedLandmark = landmark"
          >
            <div class="landmark-icon" :style="{ background: landmark.color }">
              {{ landmark.icon }}
            </div>
            <h3>{{ landmark.name }}</h3>
            <p>{{ landmark.category }}</p>
          </div>
        </div>
      </div>

      <transition name="modal">
        <div v-if="selectedLandmark" class="modal-overlay" @click="selectedLandmark = null">
          <div class="landmark-modal" @click.stop>
            <button class="close-btn" @click="selectedLandmark = null">×</button>
            <div class="modal-icon" :style="{ background: selectedLandmark.color }">
              {{ selectedLandmark.icon }}
            </div>
            <h2>{{ selectedLandmark.name }}</h2>
            <div class="modal-category">{{ selectedLandmark.category }}</div>
            <p>{{ selectedLandmark.description }}</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeCampus = ref('main')
const selectedLandmark = ref(null)

const campuses = [
  { id: 'main', name: '西康路校区' },
  { id: 'jiangning', name: '江宁校区' }
]

const landmarks = {
  main: [
    {
      id: 1,
      name: '大礼堂',
      category: '历史建筑',
      icon: '🏛️',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      description: '河海大学标志性建筑,见证了学校110年的发展历程。'
    },
    {
      id: 2,
      name: '图书馆',
      category: '学习场所',
      icon: '📚',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      description: '现代化综合图书馆,馆藏图书200余万册。'
    },
    {
      id: 3,
      name: '水利馆',
      category: '教学楼',
      icon: '🌊',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      description: '水利工程学科教学中心,配备先进的实验设备。'
    },
    {
      id: 4,
      name: '体育馆',
      category: '运动设施',
      icon: '⚽',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      description: '综合性体育馆,提供多种运动设施。'
    }
  ],
  jiangning: [
    {
      id: 5,
      name: '致用楼',
      category: '教学楼',
      icon: '🏫',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      description: '江宁校区主要教学楼,现代化教学设施齐全。'
    },
    {
      id: 6,
      name: '竞秀湖',
      category: '景观',
      icon: '🏞️',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      description: '校园中心景观湖,环境优美。'
    }
  ]
}

const currentLandmarks = computed(() => landmarks[activeCampus.value] || [])
</script>

<style scoped>
.map-page {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #F8F5EF 0%, #E5E2DC 100%);
  padding: var(--spacing-3xl) var(--spacing-xl);
}

.map-container {
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-3xl);
}

.page-title {
  font-size: var(--text-4xl);
  font-family: var(--font-title);
  font-weight: 700;
  color: var(--color-river-blue);
  margin-bottom: var(--spacing-md);
}

.page-subtitle {
  font-size: var(--text-lg);
  color: var(--color-ink-black);
  opacity: 0.7;
}

.campus-tabs {
  display: flex;
  justify-content: center;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-3xl);
}

.tab-button {
  padding: var(--spacing-md) var(--spacing-2xl);
  background: white;
  border: 2px solid var(--color-page-ivory);
  border-radius: var(--radius-full);
  font-size: var(--text-base);
  font-weight: 600;
  transition: all var(--transition-base);
}

.tab-button:hover {
  border-color: var(--color-river-blue);
}

.tab-button.active {
  background: var(--gradient-river);
  border-color: var(--color-river-blue);
  color: white;
}

.landmarks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--spacing-xl);
}

.landmark-card {
  background: white;
  padding: var(--spacing-xl);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-soft);
  text-align: center;
  cursor: pointer;
  transition: all var(--transition-base);
}

.landmark-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-medium);
}

.landmark-icon {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-xl);
  font-size: var(--text-4xl);
  margin: 0 auto var(--spacing-lg);
}

.landmark-card h3 {
  font-size: var(--text-xl);
  font-family: var(--font-title);
  color: var(--color-river-blue);
  margin-bottom: var(--spacing-sm);
}

.landmark-card p {
  font-size: var(--text-sm);
  color: var(--color-ink-black);
  opacity: 0.6;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--spacing-xl);
}

.landmark-modal {
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--spacing-3xl);
  max-width: 500px;
  width: 100%;
  position: relative;
  text-align: center;
}

.close-btn {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background: var(--color-page-ivory);
  font-size: var(--text-2xl);
  transition: all var(--transition-base);
}

.close-btn:hover {
  background: var(--color-river-blue);
  color: white;
}

.modal-icon {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-xl);
  font-size: 4rem;
  margin: 0 auto var(--spacing-lg);
}

.landmark-modal h2 {
  font-size: var(--text-2xl);
  font-family: var(--font-title);
  color: var(--color-river-blue);
  margin-bottom: var(--spacing-sm);
}

.modal-category {
  font-size: var(--text-sm);
  color: var(--color-ink-black);
  opacity: 0.6;
  margin-bottom: var(--spacing-lg);
}

.landmark-modal p {
  font-size: var(--text-base);
  line-height: 1.8;
  color: var(--color-ink-black);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .page-title {
    font-size: var(--text-2xl);
  }

  .campus-tabs {
    flex-direction: column;
  }

  .landmarks-grid {
    grid-template-columns: 1fr;
  }
}
</style>
