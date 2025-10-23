<template>
  <div class="mission-spirit">
    <div class="mission-header">
      <p class="mission-intro">{{ $t('missionSpirit.intro') }}</p>
    </div>

    <!-- 横向滚动的使命展示 -->
    <div class="missions-scroll-container">
      <div class="missions-track" ref="scrollTrack">
        <div
          v-for="(mission, index) in missions"
          :key="index"
          class="mission-item"
          :class="{ active: activeMission === index }"
          @click="setActiveMission(index)"
        >
          <div class="mission-number">{{ String(index + 1).padStart(2, '0') }}</div>
          <div class="mission-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3 class="mission-title">{{ mission.title }}</h3>
          <p class="mission-subtitle">{{ mission.subtitle }}</p>
        </div>
      </div>

      <!-- 导航按钮 -->
      <button class="scroll-btn prev" @click="scrollPrev" v-if="canScrollLeft">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M15 18l-6-6 6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button class="scroll-btn next" @click="scrollNext" v-if="canScrollRight">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 18l6-6-6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <!-- 详细内容展示区 -->
    <div class="mission-detail-section" v-if="activeMission !== null">
      <div class="detail-container">
        <div class="detail-header">
          <h2 class="detail-title">{{ missions[activeMission].title }}</h2>
          <span class="detail-subtitle">{{ missions[activeMission].subtitle }}</span>
        </div>

        <div class="detail-content">
          <p class="detail-description">{{ missions[activeMission].description }}</p>
          <blockquote class="detail-quote">
            <svg class="quote-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
            </svg>
            {{ missions[activeMission].quote }}
          </blockquote>
        </div>

        <div class="detail-stats">
          <div class="stat-item">
            <div class="stat-icon">🏆</div>
            <div class="stat-label">{{ $t('missionSpirit.stats.impact') }}</div>
            <div class="stat-value">{{ missions[activeMission].impact }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">👥</div>
            <div class="stat-label">{{ $t('missionSpirit.stats.participants') }}</div>
            <div class="stat-value">{{ missions[activeMission].participants }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">📅</div>
            <div class="stat-label">{{ $t('missionSpirit.stats.duration') }}</div>
            <div class="stat-value">{{ missions[activeMission].duration }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const activeMission = ref(0)
const scrollTrack = ref(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(true)

const missions = computed(() => [
  {
    title: t('missionSpirit.missions.sanxia.title'),
    subtitle: t('missionSpirit.missions.sanxia.subtitle'),
    description: t('missionSpirit.missions.sanxia.description'),
    quote: t('missionSpirit.missions.sanxia.quote'),
    impact: t('missionSpirit.missions.sanxia.impact'),
    participants: t('missionSpirit.missions.sanxia.participants'),
    duration: t('missionSpirit.missions.sanxia.duration')
  },
  {
    title: t('missionSpirit.missions.nanshui.title'),
    subtitle: t('missionSpirit.missions.nanshui.subtitle'),
    description: t('missionSpirit.missions.nanshui.description'),
    quote: t('missionSpirit.missions.nanshui.quote'),
    impact: t('missionSpirit.missions.nanshui.impact'),
    participants: t('missionSpirit.missions.nanshui.participants'),
    duration: t('missionSpirit.missions.nanshui.duration')
  },
  {
    title: t('missionSpirit.missions.baihetan.title'),
    subtitle: t('missionSpirit.missions.baihetan.subtitle'),
    description: t('missionSpirit.missions.baihetan.description'),
    quote: t('missionSpirit.missions.baihetan.quote'),
    impact: t('missionSpirit.missions.baihetan.impact'),
    participants: t('missionSpirit.missions.baihetan.participants'),
    duration: t('missionSpirit.missions.baihetan.duration')
  },
  {
    title: t('missionSpirit.missions.offshore.title'),
    subtitle: t('missionSpirit.missions.offshore.subtitle'),
    description: t('missionSpirit.missions.offshore.description'),
    quote: t('missionSpirit.missions.offshore.quote'),
    impact: t('missionSpirit.missions.offshore.impact'),
    participants: t('missionSpirit.missions.offshore.participants'),
    duration: t('missionSpirit.missions.offshore.duration')
  },
  {
    title: t('missionSpirit.missions.international.title'),
    subtitle: t('missionSpirit.missions.international.subtitle'),
    description: t('missionSpirit.missions.international.description'),
    quote: t('missionSpirit.missions.international.quote'),
    impact: t('missionSpirit.missions.international.impact'),
    participants: t('missionSpirit.missions.international.participants'),
    duration: t('missionSpirit.missions.international.duration')
  }
])

const setActiveMission = (index) => {
  activeMission.value = index
  scrollToActive(index)
}

const scrollToActive = (index) => {
  if (!scrollTrack.value) return

  const items = scrollTrack.value.children
  if (items[index]) {
    const item = items[index]
    const container = scrollTrack.value.parentElement
    const scrollLeft = item.offsetLeft - (container.offsetWidth / 2) + (item.offsetWidth / 2)

    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    })
  }
}

const scrollPrev = () => {
  if (activeMission.value > 0) {
    setActiveMission(activeMission.value - 1)
  }
}

const scrollNext = () => {
  if (activeMission.value < missions.value.length - 1) {
    setActiveMission(activeMission.value + 1)
  }
}

const checkScroll = () => {
  if (!scrollTrack.value) return

  const container = scrollTrack.value.parentElement
  canScrollLeft.value = container.scrollLeft > 20
  canScrollRight.value = container.scrollLeft < container.scrollWidth - container.offsetWidth - 20
}

onMounted(() => {
  if (scrollTrack.value) {
    const container = scrollTrack.value.parentElement
    container.addEventListener('scroll', checkScroll)
    checkScroll()
  }
})

onUnmounted(() => {
  if (scrollTrack.value) {
    const container = scrollTrack.value.parentElement
    container.removeEventListener('scroll', checkScroll)
  }
})
</script>

<style scoped>
.mission-spirit {
  width: 100%;
  padding: 0;
}

.mission-header {
  text-align: center;
  margin-bottom: var(--spacing-3xl);
  padding: 0 var(--spacing-lg);
}

.mission-intro {
  font-size: var(--text-2xl);
  font-family: var(--font-title);
  color: var(--color-river-blue);
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto;
}

/* 横向滚动容器 */
.missions-scroll-container {
  position: relative;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding: var(--spacing-lg) 0;
  margin-bottom: var(--spacing-2xl);
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: var(--color-river-blue) rgba(10, 106, 184, 0.1);
}

.missions-scroll-container::-webkit-scrollbar {
  height: 6px;
}

.missions-scroll-container::-webkit-scrollbar-track {
  background: rgba(10, 106, 184, 0.1);
  border-radius: var(--radius-full);
}

.missions-scroll-container::-webkit-scrollbar-thumb {
  background: var(--color-river-blue);
  border-radius: var(--radius-full);
}

.missions-track {
  display: flex;
  gap: var(--spacing-xl);
  padding: 0 var(--spacing-2xl);
  min-width: min-content;
}

/* 使命卡片 */
.mission-item {
  flex: 0 0 220px;
  background: white;
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-soft);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 3px solid transparent;
}

.mission-item:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-medium);
  border-color: rgba(10, 106, 184, 0.2);
}

.mission-item.active {
  transform: scale(1.05) translateY(-8px);
  box-shadow: var(--shadow-strong);
  border-color: var(--color-river-blue);
  background: linear-gradient(135deg, rgba(10, 106, 184, 0.05) 0%, rgba(255, 122, 26, 0.05) 100%);
}

.mission-number {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  font-size: var(--text-3xl);
  font-weight: 700;
  font-family: var(--font-mono);
  color: rgba(10, 106, 184, 0.1);
  line-height: 1;
}

.mission-item.active .mission-number {
  color: rgba(255, 122, 26, 0.3);
}

.mission-icon {
  width: 60px;
  height: 60px;
  margin-bottom: var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-river);
  border-radius: var(--radius-full);
  color: white;
  transition: all 0.3s ease;
}

.mission-item.active .mission-icon {
  background: var(--gradient-torch);
  transform: rotate(360deg);
}

.mission-icon svg {
  width: 30px;
  height: 30px;
}

.mission-title {
  font-size: var(--text-lg);
  font-family: var(--font-title);
  color: var(--color-river-blue);
  margin-bottom: var(--spacing-xs);
}

.mission-item.active .mission-title {
  color: var(--color-torch-amber);
}

.mission-subtitle {
  font-size: var(--text-sm);
  color: var(--color-ink-black);
  opacity: 0.7;
}

/* 滚动按钮 */
.scroll-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  background: white;
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-medium);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;
  color: var(--color-river-blue);
}

.scroll-btn:hover {
  background: var(--gradient-river);
  color: white;
  transform: translateY(-50%) scale(1.1);
}

.scroll-btn.prev {
  left: var(--spacing-md);
}

.scroll-btn.next {
  right: var(--spacing-md);
}

.scroll-btn svg {
  width: 24px;
  height: 24px;
}

/* 详细内容展示 */
.mission-detail-section {
  background: linear-gradient(135deg, rgba(10, 106, 184, 0.05) 0%, rgba(255, 122, 26, 0.05) 100%);
  padding: var(--spacing-2xl);
  border-radius: var(--radius-lg);
  margin: 0 var(--spacing-lg);
  animation: fadeInUp 0.5s ease-out;
  position: relative;
  overflow: hidden;
}

/* 添加历史照片背景装饰 */
.mission-detail-section::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 300px;
  background-image: url('https://s1.img.five-plus-one.com/2025/10/22/68f8b1a1681e4.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.05;
  border-radius: var(--radius-lg);
  transform: rotate(10deg) translateX(20%) translateY(-10%);
  z-index: 0;
  filter: grayscale(60%);
}

.mission-detail-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 250px;
  height: 250px;
  background-image: url('https://s1.img.five-plus-one.com/2025/10/22/68f8b155758b4.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.04;
  border-radius: var(--radius-lg);
  transform: rotate(-8deg) translateX(-15%) translateY(15%);
  z-index: 0;
  filter: grayscale(60%);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.detail-container {
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.detail-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.detail-title {
  font-size: var(--text-3xl);
  font-family: var(--font-title);
  color: var(--color-river-blue);
  margin-bottom: var(--spacing-xs);
}

.detail-subtitle {
  font-size: var(--text-lg);
  color: var(--color-torch-amber);
  font-weight: 600;
}

.detail-content {
  background: white;
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-xl);
  box-shadow: var(--shadow-soft);
}

.detail-description {
  font-size: var(--text-base);
  color: var(--color-ink-black);
  line-height: 1.8;
  margin-bottom: var(--spacing-lg);
}

.detail-quote {
  position: relative;
  font-size: var(--text-base);
  font-family: var(--font-title);
  font-style: italic;
  color: var(--color-river-blue);
  padding: var(--spacing-md) var(--spacing-md) var(--spacing-md) var(--spacing-2xl);
  border-left: 4px solid var(--color-torch-amber);
  background: rgba(10, 106, 184, 0.05);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  margin: 0;
}

.quote-icon {
  position: absolute;
  left: var(--spacing-sm);
  top: var(--spacing-md);
  width: 24px;
  height: 24px;
  color: var(--color-torch-amber);
  opacity: 0.5;
}

/* 统计数据 */
.detail-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
}

.stat-item {
  background: white;
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  text-align: center;
  box-shadow: var(--shadow-soft);
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-medium);
}

.stat-icon {
  font-size: 36px;
  margin-bottom: var(--spacing-sm);
}

.stat-label {
  font-size: var(--text-xs);
  color: var(--color-ink-black);
  opacity: 0.6;
  margin-bottom: var(--spacing-xs);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: var(--text-xl);
  font-weight: 700;
  font-family: var(--font-title);
  color: var(--color-river-blue);
}

/* 响应式 */
@media (max-width: 1024px) {
  .mission-item {
    flex: 0 0 240px;
  }

  .detail-stats {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .mission-intro {
    font-size: var(--text-lg);
  }

  .mission-item {
    flex: 0 0 220px;
  }

  .mission-detail-section {
    padding: var(--spacing-xl);
    margin: 0;
  }

  .detail-title {
    font-size: var(--text-2xl);
  }

  .detail-subtitle {
    font-size: var(--text-base);
  }

  .detail-description,
  .detail-quote {
    font-size: var(--text-base);
  }

  .scroll-btn {
    width: 40px;
    height: 40px;
  }
}
</style>
