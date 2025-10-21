<template>
  <div class="timeline-carousel" ref="carouselRef">
    <!-- 左侧控制栏 -->
    <div class="sidebar-controls">
      <div class="sidebar-header">
        <h3 class="carousel-title">河海百十年 · 历史长卷</h3>
        <p class="carousel-subtitle">点击卡片探索每个重要时刻</p>
      </div>

      <div class="progress-section">
        <div class="card-counter">{{ currentIndex + 1 }} / {{ timelineCards.length }}</div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
        </div>
      </div>

      <div class="navigation-buttons">
        <button class="control-btn prev-btn" @click="prevCard">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        <div class="control-dots">
          <button
            v-for="(card, index) in timelineCards"
            :key="card.year"
            class="dot"
            :class="{ active: index === currentIndex }"
            @click="goToCard(index)"
          >
          </button>
        </div>

        <button class="control-btn next-btn" @click="nextCard">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

      <div class="sidebar-actions">
        <button class="shuffle-btn" @click="shuffleCard" :disabled="isAnimating">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 1l4 4-4 4"/>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
            <path d="M7 23l-4-4 4-4"/>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
          </svg>
          随机抽取
        </button>

        <router-link to="/timeline" class="jump-timeline-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
            <path d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z"/>
            <path d="M9 12h6"/>
            <path d="M9 16h6"/>
          </svg>
          查看完整时间线
        </router-link>
      </div>
    </div>

    <!-- 3D转盘容器 -->
    <div class="carousel-container" ref="containerRef">
      <!-- 转盘卡片 -->
      <div
        class="carousel-wheel"
        :style="wheelStyle"
      >
        <div
          v-for="(card, index) in timelineCards"
          :key="card.year"
          class="timeline-card"
          :class="{
            'active': index === currentIndex,
            'prev': isPrevCard(index),
            'next': isNextCard(index)
          }"
          :style="getCardStyle(index)"
          @click="selectCard(index)"
        >
          <div class="card-inner" :class="{ flipped: index === currentIndex && isFlipped }">
            <!-- 正面 -->
            <div class="card-front">
              <div class="card-year-large">{{ card.year }}</div>
              <div class="card-title-main">{{ card.title }}</div>
              <div class="card-decoration">
                <div class="decoration-line"></div>
                <div class="decoration-dot"></div>
                <div class="decoration-line"></div>
              </div>
              <div v-if="index === currentIndex" class="card-hint">点击查看详情</div>
            </div>

            <!-- 背面 -->
            <div class="card-back-detail">
              <button class="back-button" @click.stop="flipBack">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                返回
              </button>

              <div class="card-detail-content">
                <div class="detail-year">{{ card.year }}年</div>
                <h4 class="detail-title">{{ card.title }}</h4>
                <p class="detail-description">{{ card.description }}</p>

                <div v-if="card.achievements && card.achievements.length" class="detail-achievements">
                  <h5>主要成就</h5>
                  <ul>
                    <li v-for="(item, idx) in card.achievements" :key="idx">
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const carouselRef = ref(null)
const containerRef = ref(null)
const currentIndex = ref(0)
const isFlipped = ref(false)
const isAnimating = ref(false)
const rotation = ref(0)

// 时间线卡片数据
const timelineCards = ref([
  {
    year: 1915,
    title: '河海工程专门学校成立',
    description: '张闻天、茅以升等著名学者创办河海工程专门学校,开启中国水利高等教育先河。',
    achievements: [
      '中国第一所水利高等学府',
      '创立水利工程专业教育体系',
      '培养首批水利工程人才'
    ]
  },
  {
    year: 1924,
    title: '河海工科大学时期',
    description: '学校发展为河海工科大学,进一步完善水利工程教育体系。',
    achievements: []
  },
  {
    year: 1927,
    title: '第四中山大学工学院',
    description: '学校并入第四中山大学,成为工学院的重要组成部分。',
    achievements: []
  },
  {
    year: 1952,
    title: '华东水利学院成立',
    description: '以南京大学水利系为基础,合并交通大学等校水利系科,成立华东水利学院。',
    achievements: [
      '整合全国水利教育资源',
      '建立现代水利工程学科',
      '成为新中国水利人才培养基地'
    ]
  },
  {
    year: 1960,
    title: '被确定为全国重点大学',
    description: '学校被国家确定为全国重点大学,标志着办学水平得到国家认可。',
    achievements: []
  },
  {
    year: 1985,
    title: '恢复"河海大学"校名',
    description: '经国务院批准,恢复传统校名"河海大学",邓小平同志亲笔题写校名。',
    achievements: []
  },
  {
    year: 1995,
    title: '进入"211工程"',
    description: '河海大学成为国家"211工程"重点建设高校,进入新的发展阶段。',
    achievements: []
  },
  {
    year: 2005,
    title: '90周年校庆',
    description: '河海大学迎来建校90周年,总结历史、展望未来。',
    achievements: []
  },
  {
    year: 2015,
    title: '百年校庆',
    description: '百年华诞,习近平总书记等党和国家领导人发来贺信,肯定办学成就。',
    achievements: [
      '累计培养20余万名毕业生',
      '承担三峡、南水北调等重大工程科研',
      '水利工程学科全国排名第一'
    ]
  },
  {
    year: 2017,
    title: '入选"双一流"',
    description: '水利工程学科入选"双一流"建设学科,迈入世界一流大学建设行列。',
    achievements: []
  },
  {
    year: 2025,
    title: '110周年校庆',
    description: '迎来110周年华诞,续写"艰苦朴素、实事求是、严格要求、勇于探索"新篇章。',
    achievements: [
      '在读学生5万余人',
      '国家级科研平台20余个',
      '服务"一带一路"水利建设'
    ]
  }
])

// 进度百分比
const progress = computed(() => ((currentIndex.value + 1) / timelineCards.value.length) * 100)

// 计算转盘旋转角度
const wheelStyle = computed(() => {
  const anglePerCard = 360 / timelineCards.value.length
  const targetRotation = -currentIndex.value * anglePerCard

  return {
    transform: `rotateY(${targetRotation}deg)`,
    transition: isAnimating.value ? 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
  }
})

// 计算每张卡片的位置和样式
const getCardStyle = (index) => {
  const totalCards = timelineCards.value.length
  const anglePerCard = 360 / totalCards
  const angle = index * anglePerCard
  const radius = 600 // 转盘半径

  // 计算3D位置
  const x = Math.sin((angle * Math.PI) / 180) * radius
  const z = Math.cos((angle * Math.PI) / 180) * radius

  // 计算缩放和透明度
  const distanceFromCenter = Math.abs(index - currentIndex.value)
  const minDistance = Math.min(distanceFromCenter, totalCards - distanceFromCenter)

  let scale = 1
  let opacity = 1
  let zIndex = 100

  if (index === currentIndex.value) {
    // 当前卡片
    scale = 1.1
    opacity = 1
    zIndex = 200
  } else if (minDistance === 1) {
    // 相邻卡片
    scale = 0.85
    opacity = 0.7
    zIndex = 150
  } else if (minDistance === 2) {
    // 次相邻卡片
    scale = 0.7
    opacity = 0.4
    zIndex = 100
  } else {
    // 远处卡片
    scale = 0.5
    opacity = 0.2
    zIndex = 50
  }

  return {
    transform: `rotateY(${angle}deg) translateZ(${radius}px) scale(${scale})`,
    opacity: opacity,
    zIndex: zIndex,
    pointerEvents: index === currentIndex.value || minDistance <= 2 ? 'auto' : 'none'
  }
}

// 判断是否为前一张卡片
const isPrevCard = (index) => {
  return index === (currentIndex.value - 1 + timelineCards.value.length) % timelineCards.value.length
}

// 判断是否为后一张卡片
const isNextCard = (index) => {
  return index === (currentIndex.value + 1) % timelineCards.value.length
}

// 选择卡片
const selectCard = (index) => {
  if (isAnimating.value) return

  if (index === currentIndex.value) {
    // 当前卡片,翻转查看详情
    if (!isFlipped.value) {
      flipCard()
    }
  } else {
    // 其他卡片,旋转到该卡片
    goToCard(index)
  }
}

// 翻转卡片
const flipCard = () => {
  isFlipped.value = true
}

// 返回正面
const flipBack = () => {
  isFlipped.value = false
}

// 下一张卡片
const nextCard = () => {
  if (isAnimating.value) return

  isAnimating.value = true
  isFlipped.value = false

  setTimeout(() => {
    currentIndex.value = (currentIndex.value + 1) % timelineCards.value.length
    setTimeout(() => {
      isAnimating.value = false
    }, 800)
  }, 0)
}

// 上一张卡片
const prevCard = () => {
  if (isAnimating.value) return

  isAnimating.value = true
  isFlipped.value = false

  setTimeout(() => {
    currentIndex.value = (currentIndex.value - 1 + timelineCards.value.length) % timelineCards.value.length
    setTimeout(() => {
      isAnimating.value = false
    }, 800)
  }, 0)
}

// 跳转到指定卡片
const goToCard = (index) => {
  if (index === currentIndex.value || isAnimating.value) return

  isAnimating.value = true
  isFlipped.value = false

  setTimeout(() => {
    currentIndex.value = index
    setTimeout(() => {
      isAnimating.value = false
    }, 800)
  }, 0)
}

// 随机抽卡
const shuffleCard = () => {
  if (isAnimating.value) return

  isAnimating.value = true
  isFlipped.value = false

  // 快速旋转多圈
  const spins = 3 + Math.random() * 2 // 3-5圈
  const randomOffset = Math.floor(Math.random() * timelineCards.value.length)

  // 创建旋转动画
  let currentSpin = 0
  const spinInterval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % timelineCards.value.length
    currentSpin++

    if (currentSpin >= spins * timelineCards.value.length + randomOffset) {
      clearInterval(spinInterval)
      setTimeout(() => {
        isAnimating.value = false
      }, 800)
    }
  }, 50)
}

// 键盘导航
const handleKeydown = (e) => {
  if (isAnimating.value) return

  if (isFlipped.value) {
    if (e.key === 'Escape') {
      flipBack()
    }
  } else {
    if (e.key === 'ArrowLeft') {
      prevCard()
    } else if (e.key === 'ArrowRight') {
      nextCard()
    } else if (e.key === ' ' || e.key === 'Enter') {
      flipCard()
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)

  // 初始动画
  gsap.from('.timeline-card', {
    scale: 0,
    opacity: 0,
    duration: 0.8,
    stagger: 0.05,
    ease: 'back.out(1.5)',
    delay: 0.3
  })
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.timeline-carousel {
  position: relative;
  width: 100%;
  height: 70vh;
  max-height: 70vh;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--spacing-xl);
  padding: var(--spacing-lg);
  background: linear-gradient(180deg, #F8F5EF 0%, #E5E2DC 100%);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

/* 左侧控制栏 */
.sidebar-controls {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  padding: var(--spacing-xl);
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
  overflow-y: auto;
}

.sidebar-header {
  text-align: center;
}

.carousel-title {
  font-size: var(--text-lg);
  font-family: var(--font-title);
  color: var(--color-river-blue);
  margin-bottom: var(--spacing-xs);
  line-height: 1.4;
}

.carousel-subtitle {
  font-size: var(--text-xs);
  color: var(--color-ink-black);
  opacity: 0.7;
}

.progress-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.card-counter {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-river-blue);
  text-align: center;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(10, 106, 184, 0.2);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--gradient-river);
  border-radius: var(--radius-full);
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.navigation-buttons {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  align-items: center;
}

.control-btn {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 2px solid var(--color-river-blue);
  border-radius: var(--radius-full);
  color: var(--color-river-blue);
  transition: all var(--transition-base);
  box-shadow: var(--shadow-soft);
}

.control-btn:hover:not(:disabled) {
  background: var(--color-river-blue);
  color: white;
  transform: scale(1.1);
  box-shadow: var(--shadow-medium);
}

.control-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.control-btn svg {
  width: 24px;
  height: 24px;
}

.control-dots {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  align-items: center;
  padding: var(--spacing-md) 0;
  max-height: 300px;
  overflow-y: auto;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: var(--radius-full);
  background: rgba(10, 106, 184, 0.3);
  border: none;
  padding: 0;
  transition: all var(--transition-base);
  cursor: pointer;
  flex-shrink: 0;
}

.dot:hover {
  background: rgba(10, 106, 184, 0.6);
  transform: scale(1.3);
}

.dot.active {
  height: 24px;
  background: var(--color-river-blue);
}

.sidebar-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-top: auto;
}

.shuffle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-md);
  background: var(--gradient-torch);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: 600;
  box-shadow: var(--shadow-soft);
  transition: all var(--transition-base);
}

.shuffle-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-medium);
}

.shuffle-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.shuffle-btn svg {
  width: 18px;
  height: 18px;
}

.jump-timeline-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-md);
  background: var(--gradient-river);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: 600;
  box-shadow: var(--shadow-soft);
  transition: all var(--transition-base);
  text-decoration: none;
}

.jump-timeline-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-medium);
}

.jump-timeline-btn svg {
  width: 18px;
  height: 18px;
}

/* 3D转盘容器 */
.carousel-container {
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 2000px;
}

.carousel-wheel {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

/* 卡片样式 */
.timeline-card {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 320px;
  height: 450px;
  margin-left: -160px;
  margin-top: -225px;
  transform-style: preserve-3d;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.timeline-card.active {
  cursor: pointer;
}

.card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-inner.flipped {
  transform: rotateY(180deg);
}

/* 卡片正面 */
.card-front {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-3xl);
  background: linear-gradient(135deg, #FFFFFF 0%, #F8F5EF 100%);
  border-radius: var(--radius-xl);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.card-front::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: var(--gradient-river);
}

.card-year-large {
  font-size: 3.5rem;
  font-weight: 700;
  font-family: var(--font-title);
  background: var(--gradient-river);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--spacing-md);
  line-height: 1;
}

.card-title-main {
  font-size: var(--text-lg);
  font-family: var(--font-title);
  font-weight: 600;
  color: var(--color-ink-black);
  text-align: center;
  margin-bottom: var(--spacing-lg);
  line-height: 1.5;
}

.card-decoration {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-2xl);
}

.decoration-line {
  width: 40px;
  height: 2px;
  background: var(--gradient-river);
}

.decoration-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--color-torch-amber);
}

.card-hint {
  font-size: var(--text-sm);
  color: var(--color-river-blue);
  opacity: 0.6;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

/* 卡片背面详情 */
.card-back-detail {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  padding: var(--spacing-2xl);
  background: linear-gradient(135deg, #0A6AB8 0%, #084B87 100%);
  border-radius: var(--radius-xl);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  color: white;
  overflow-y: auto;
}

.back-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  margin-bottom: var(--spacing-xl);
  transition: all var(--transition-base);
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateX(-4px);
}

.back-button svg {
  width: 16px;
  height: 16px;
}

.card-detail-content {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.detail-year {
  font-size: var(--text-sm);
  font-weight: 600;
  opacity: 0.8;
  margin-bottom: var(--spacing-xs);
}

.detail-title {
  font-size: var(--text-2xl);
  font-family: var(--font-title);
  font-weight: 700;
  margin-bottom: var(--spacing-lg);
  line-height: 1.4;
}

.detail-description {
  font-size: var(--text-base);
  line-height: 1.8;
  margin-bottom: var(--spacing-xl);
  opacity: 0.95;
}

.detail-achievements {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.detail-achievements h5 {
  font-size: var(--text-lg);
  font-weight: 600;
  margin-bottom: var(--spacing-md);
}

.detail-achievements ul {
  list-style: none;
  padding: 0;
}

.detail-achievements li {
  font-size: var(--text-sm);
  padding: var(--spacing-sm) 0;
  padding-left: var(--spacing-lg);
  position: relative;
  line-height: 1.6;
}

.detail-achievements li::before {
  content: '✦';
  position: absolute;
  left: 0;
  color: var(--color-torch-amber);
  font-size: 1.2em;
}

/* 响应式 */
@media (max-width: 768px) {
  .timeline-carousel {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    height: 100vh;
    padding: var(--spacing-md);
  }

  .sidebar-controls {
    padding: var(--spacing-md);
    gap: var(--spacing-md);
    max-height: 200px;
  }

  .sidebar-header {
    display: none;
  }

  .progress-section {
    flex-direction: row;
    align-items: center;
    gap: var(--spacing-md);
  }

  .navigation-buttons {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  .control-dots {
    flex-direction: row;
    max-height: none;
    max-width: 200px;
    overflow-x: auto;
  }

  .dot.active {
    height: 10px;
    width: 24px;
  }

  .sidebar-actions {
    flex-direction: row;
    margin-top: 0;
  }

  .shuffle-btn,
  .jump-timeline-btn {
    flex: 1;
    font-size: var(--text-xs);
    padding: var(--spacing-sm);
  }

  .shuffle-btn svg,
  .jump-timeline-btn svg {
    width: 14px;
    height: 14px;
  }

  .carousel-container {
    max-height: none;
  }

  .timeline-card {
    width: 280px;
    height: 400px;
    margin-left: -140px;
    margin-top: -200px;
  }

  .card-year-large {
    font-size: 3rem;
  }

  .card-title-main {
    font-size: var(--text-base);
  }

  .control-btn {
    width: 40px;
    height: 40px;
  }

  .control-btn svg {
    width: 20px;
    height: 20px;
  }
}
</style>
