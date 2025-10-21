<template>
  <div class="maxims-section" ref="sectionRef">
    <div class="maxims-container">
      <!-- 标题 -->
      <div class="section-header">
        <h2 class="section-title">河海大学校训</h2>
        <p class="section-subtitle">艰苦朴素 · 实事求是 · 严格要求 · 勇于探索</p>
        <div class="title-decoration">
          <div class="decoration-line"></div>
          <div class="decoration-dot"></div>
          <div class="decoration-line"></div>
        </div>
      </div>

      <!-- 四面体卡片布局 -->
      <div class="maxims-grid">
        <div
          v-for="(maxim, index) in maxims"
          :key="index"
          class="maxim-card"
          :class="{ active: activeIndex === index }"
          @click="toggleCard(index)"
          :style="{ '--delay': `${index * 0.1}s` }"
        >
          <div class="card-inner" :class="{ flipped: activeIndex === index }">
            <!-- 正面 -->
            <div class="card-front">
              <div class="card-icon" :style="{ background: maxim.color }">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path :d="maxim.icon" />
                </svg>
              </div>
              <h3 class="card-title">{{ maxim.title }}</h3>
              <div class="card-divider"></div>
              <p class="card-brief">{{ maxim.brief }}</p>
              <div class="card-hint">点击查看详情</div>
            </div>

            <!-- 背面 -->
            <div class="card-back" :style="{ background: maxim.color }">
              <button class="close-btn" @click.stop="closeCard">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>

              <div class="card-back-content">
                <h3 class="back-title">{{ maxim.title }}</h3>
                <p class="back-description">{{ maxim.description }}</p>

                <div class="story-section">
                  <h4 class="story-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                    </svg>
                    相关故事
                  </h4>
                  <p class="story-text">{{ maxim.story }}</p>
                </div>

                <div class="person-section">
                  <div class="person-avatar">{{ maxim.person.name.charAt(0) }}</div>
                  <div class="person-info">
                    <strong>{{ maxim.person.name }}</strong>
                    <span>{{ maxim.person.title }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 中心装饰 -->
      <div class="center-decoration">
        <div class="center-circle">
          <div class="circle-ring"></div>
          <div class="circle-ring"></div>
          <div class="circle-ring"></div>
          <div class="circle-core">
            <span class="core-text">110</span>
            <span class="core-subtext">周年</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const sectionRef = ref(null)
const activeIndex = ref(null)

// 校训数据
const maxims = [
  {
    title: '艰苦朴素',
    brief: '发扬艰苦奋斗精神',
    description: '发扬艰苦奋斗、勤俭节约的优良传统，培养坚韧不拔的意志品质，传承百年河海精神。',
    story: '建校初期，师生在简陋的条件下开展教学科研，凭借艰苦朴素的作风，为中国水利事业奠定了坚实基础。一代代河海人秉承这一精神，在祖国最需要的地方建功立业。',
    person: {
      name: '张闻天',
      title: '河海创办人之一'
    },
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
  },
  {
    title: '实事求是',
    brief: '坚持科学求真精神',
    description: '坚持科学精神，尊重客观规律，一切从实际出发，理论联系实际，在实践中检验和发展真理。',
    story: '河海学子在三峡工程、南水北调等国家重大工程中，始终坚持实事求是的科学态度，提供精准的技术支持。无数次实地勘察、数据分析，确保每个决策都建立在科学基础上。',
    person: {
      name: '茅以升',
      title: '著名桥梁专家、教育家'
    },
    color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    title: '严格要求',
    brief: '坚持高标准严要求',
    description: '对学术严谨求精，对工作精益求精，对自己高标准严要求，追求卓越，永不满足。',
    story: '河海的教学以"严"著称，培养出的学生以扎实的专业功底和严谨的工作态度闻名业界。从课程设计到毕业答辩，每个环节都体现着严格要求的教育理念。',
    person: {
      name: '严恺',
      title: '水利工程专家、中国工程院院士'
    },
    color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
  },
  {
    title: '勇于探索',
    brief: '敢为人先开拓创新',
    description: '鼓励创新思维，勇攀科学高峰，敢为人先，开拓进取，在未知领域勇敢探索。',
    story: '从港口航道到水环境保护，从传统水利到智慧水务，河海师生始终站在学科前沿，勇于突破，取得了一系列创新成果，为国家水利事业发展提供科技支撑。',
    person: {
      name: '刘光文',
      title: '水文学家、中国科学院院士'
    },
    color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z'
  }
]

// 切换卡片
const toggleCard = (index) => {
  if (activeIndex.value === index) {
    closeCard()
  } else {
    activeIndex.value = index
  }
}

// 关闭卡片
const closeCard = () => {
  activeIndex.value = null
}

onMounted(() => {
  // 入场动画
  gsap.from('.section-header', {
    opacity: 0,
    y: -30,
    duration: 0.8,
    ease: 'power3.out'
  })

  gsap.from('.maxim-card', {
    opacity: 0,
    scale: 0.8,
    duration: 0.6,
    stagger: 0.1,
    ease: 'back.out(1.5)',
    delay: 0.3
  })

  gsap.from('.center-decoration', {
    opacity: 0,
    scale: 0,
    duration: 0.8,
    ease: 'elastic.out(1, 0.5)',
    delay: 0.8
  })
})
</script>

<style scoped>
.maxims-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-3xl) var(--spacing-xl);
  background: linear-gradient(180deg, #F8F5EF 0%, #E5E2DC 100%);
  overflow: hidden;
}

.maxims-container {
  position: relative;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

/* 标题区域 */
.section-header {
  text-align: center;
  margin-bottom: var(--spacing-4xl);
}

.section-title {
  font-size: var(--text-4xl);
  font-family: var(--font-title);
  font-weight: 700;
  color: var(--color-river-blue);
  margin-bottom: var(--spacing-md);
}

.section-subtitle {
  font-size: var(--text-xl);
  color: var(--color-ink-black);
  opacity: 0.7;
  margin-bottom: var(--spacing-lg);
  letter-spacing: 2px;
}

.title-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
}

.decoration-line {
  width: 60px;
  height: 2px;
  background: var(--gradient-river);
}

.decoration-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--color-torch-amber);
}

/* 四宫格布局 */
.maxims-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-3xl);
  position: relative;
  z-index: 10;
}

/* 卡片样式 */
.maxim-card {
  perspective: 1000px;
  height: 400px;
  cursor: pointer;
  animation: fadeInUp 0.6s ease-out backwards;
  animation-delay: var(--delay);
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

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
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
  padding: var(--spacing-2xl);
  background: white;
  border-radius: var(--radius-xl);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: all var(--transition-base);
}

.maxim-card:hover .card-front {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  transform: translateY(-8px);
}

.card-icon {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-xl);
  margin-bottom: var(--spacing-xl);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.card-icon svg {
  width: 40px;
  height: 40px;
  color: white;
}

.card-title {
  font-size: var(--text-3xl);
  font-family: var(--font-title);
  font-weight: 700;
  color: var(--color-ink-black);
  margin-bottom: var(--spacing-md);
  letter-spacing: 4px;
}

.card-divider {
  width: 50px;
  height: 3px;
  background: var(--gradient-river);
  border-radius: var(--radius-full);
  margin-bottom: var(--spacing-lg);
}

.card-brief {
  font-size: var(--text-base);
  color: var(--color-ink-black);
  opacity: 0.7;
  text-align: center;
  line-height: 1.8;
  margin-bottom: var(--spacing-lg);
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

/* 卡片背面 */
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  padding: var(--spacing-2xl);
  border-radius: var(--radius-xl);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  color: white;
  overflow-y: auto;
}

.close-btn {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--radius-full);
  color: white;
  transition: all var(--transition-base);
  z-index: 10;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

.close-btn svg {
  width: 20px;
  height: 20px;
}

.card-back-content {
  animation: fadeIn 0.6s ease-out 0.4s backwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.back-title {
  font-size: var(--text-2xl);
  font-family: var(--font-title);
  font-weight: 700;
  margin-bottom: var(--spacing-lg);
  letter-spacing: 3px;
}

.back-description {
  font-size: var(--text-base);
  line-height: 1.8;
  margin-bottom: var(--spacing-xl);
  opacity: 0.95;
}

.story-section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: var(--spacing-lg);
}

.story-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--text-lg);
  font-weight: 600;
  margin-bottom: var(--spacing-md);
}

.story-title svg {
  width: 20px;
  height: 20px;
}

.story-text {
  font-size: var(--text-sm);
  line-height: 1.8;
  opacity: 0.9;
}

.person-section {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-md);
}

.person-avatar {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.3);
  border-radius: var(--radius-full);
  font-size: var(--text-xl);
  font-weight: 700;
  flex-shrink: 0;
}

.person-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.person-info strong {
  font-size: var(--text-base);
  font-weight: 600;
}

.person-info span {
  font-size: var(--text-sm);
  opacity: 0.8;
}

/* 中心装饰 */
.center-decoration {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  pointer-events: none;
}

.center-circle {
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid var(--color-river-blue);
  border-radius: var(--radius-full);
  opacity: 0.1;
}

.circle-ring:nth-child(1) {
  animation: rotate 20s linear infinite;
}

.circle-ring:nth-child(2) {
  animation: rotate 15s linear infinite reverse;
  width: 80%;
  height: 80%;
}

.circle-ring:nth-child(3) {
  animation: rotate 10s linear infinite;
  width: 60%;
  height: 60%;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.circle-core {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 3px solid var(--color-river-blue);
  border-radius: var(--radius-full);
  box-shadow: 0 10px 40px rgba(10, 106, 184, 0.2);
}

.core-text {
  font-size: var(--text-4xl);
  font-family: var(--font-title);
  font-weight: 700;
  background: var(--gradient-river);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.core-subtext {
  font-size: var(--text-sm);
  color: var(--color-river-blue);
  margin-top: var(--spacing-xs);
}

/* 响应式 */
@media (max-width: 1024px) {
  .maxims-grid {
    gap: var(--spacing-xl);
  }

  .maxim-card {
    height: 350px;
  }

  .center-circle {
    width: 150px;
    height: 150px;
  }

  .circle-core {
    width: 100px;
    height: 100px;
  }

  .core-text {
    font-size: var(--text-3xl);
  }
}

@media (max-width: 768px) {
  .maxims-section {
    padding: var(--spacing-2xl) var(--spacing-md);
    min-height: auto;
  }

  .section-title {
    font-size: var(--text-2xl);
  }

  .section-subtitle {
    font-size: var(--text-base);
    letter-spacing: 1px;
  }

  .maxims-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  .maxim-card {
    height: 320px;
  }

  .card-title {
    font-size: var(--text-2xl);
    letter-spacing: 2px;
  }

  .card-icon {
    width: 60px;
    height: 60px;
  }

  .card-icon svg {
    width: 30px;
    height: 30px;
  }

  .center-decoration {
    display: none;
  }

  .card-back {
    padding: var(--spacing-lg);
  }

  .back-title {
    font-size: var(--text-xl);
  }
}

@media (max-width: 480px) {
  .section-header {
    margin-bottom: var(--spacing-2xl);
  }

  .maxim-card {
    height: 280px;
  }

  .card-front {
    padding: var(--spacing-lg);
  }

  .card-title {
    font-size: var(--text-xl);
  }
}
</style>
