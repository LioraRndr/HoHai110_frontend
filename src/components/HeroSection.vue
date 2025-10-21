<template>
  <div class="hero-section" ref="heroRef">
    <!-- 视频背景 -->
    <video
      ref="videoRef"
      class="video-background"
      autoplay
      loop
      muted
      playsinline
    >
      <source src="https://img.assets.five-plus-one.com/2025/10/7961f94a5105311ae23f3b8f447d67a5.mp4" type="video/mp4">
      您的浏览器不支持视频播放
    </video>

    <!-- 视频蒙版 -->
    <div class="video-overlay"></div>

    <!-- 内容区域 -->
    <div class="hero-content" ref="contentRef">
      <!-- 主标题 -->
      <div class="quote-text">
        <p class="quote-line">
          <span
            v-for="(char, index) in quoteLine1"
            :key="`quote1-${index}`"
            class="typewriter-char"
            :style="{ animationDelay: `${index * 0.08}s` }"
          >{{ char }}</span>
        </p>
      </div>

      <!-- 历史描述 -->
      <div class="history-text">
        <p class="history-paragraph">
          <span
            v-for="(char, index) in historyPara1"
            :key="`hist1-${index}`"
            class="typewriter-char"
            :style="{ animationDelay: `${(quoteLine1.length + index) * 0.05}s` }"
          >{{ char }}</span>
        </p>
        <p class="history-detail">
          <span
            v-for="(char, index) in historyDetail1"
            :key="`detail1-${index}`"
            class="typewriter-char fade-in"
            :style="{ animationDelay: `${(quoteLine1.length + historyPara1.length + index) * 0.03}s` }"
          >{{ char }}</span>
        </p>
      </div>

      <div class="modern-text">
        <p class="modern-paragraph">
          <span
            v-for="(char, index) in modernPara1"
            :key="`mod1-${index}`"
            class="typewriter-char"
            :style="{ animationDelay: `${(quoteLine1.length + historyPara1.length + historyDetail1.length + 0.5 + index) * 0.05}s` }"
          >{{ char }}</span>
        </p>
        <p class="modern-detail">
          <span
            v-for="(char, index) in modernDetail1"
            :key="`modd1-${index}`"
            class="typewriter-char fade-in"
            :style="{ animationDelay: `${(quoteLine1.length + historyPara1.length + historyDetail1.length + modernPara1.length + 1 + index) * 0.03}s` }"
          >{{ char }}</span>
        </p>
      </div>

      <!-- 访客数统计 -->
      <div class="visitor-count" :style="{ animationDelay: `${totalChars * 0.03 + 0.5}s` }">
        <p class="welcome-text">
          <span>欢迎你，第</span>
          <span class="visitor-number">{{ visitorCount }}</span>
          <span>位传承者</span>
        </p>
        <p class="fire-text">请触碰这团百年之火——</p>
      </div>

      <!-- 火种按钮 -->
      <button
        @click="handleContinue"
        class="fire-button"
        :style="{ animationDelay: `${totalChars * 0.03 + 1}s` }"
      >
        <div class="fire-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2c1.5 3.5 3.5 5.5 5.5 7.5 1.5 1.5 2.5 3.5 2.5 5.5 0 4.4-3.6 8-8 8s-8-3.6-8-8c0-2 1-4 2.5-5.5C8.5 7.5 10.5 5.5 12 2z"/>
          </svg>
        </div>
        <span>点燃薪火</span>
      </button>
    </div>

    <!-- 滚动提示 -->
    <div class="scroll-hint" :class="{ hidden: scrollHintHidden }">
      <span>向下探索百十时光</span>
      <div class="scroll-arrow">↓</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import gsap from 'gsap'
import { visitorAPI } from '../api'

const heroRef = ref(null)
const videoRef = ref(null)
const contentRef = ref(null)
const scrollHintHidden = ref(false)
const visitorCount = ref('000000')
const visitorNumber = ref(null)
const contentHidden = ref(false) // 追踪内容是否已隐藏

// 文字内容
const quoteLine1 = ref('「百十载,不过长河一瞬;但每一瞬,都有星火燃起。」')
const historyPara1 = ref('他们曾以笔墨为锚,在动荡年代定住洪流的方向;')
const historyDetail1 = ref('——1915年,张謇先生怀揣"治水兴邦"之志,创立河海工程专门学校,许肇南作为首任校长,于开学典礼上誓言"俟河之清,人寿几何?凡我同胞,速起图之"。李仪祉教授在此传道,将西方水利科学与中国治水传统相融合,奠定了中国现代水利教育的基石。')
const modernPara1 = ref('我们今以代码为舟,于数字纪元传递不灭的微光。')
const modernDetail1 = ref('——2025年,河海大学迎来百十华诞,亦是中国水利高等教育百十庆典。全球校友通过"云点亮"活动汇聚祝福,见证学校从秦淮河畔走向世界水舞台的辉煌历程。')

// 计算总字符数
const totalChars = computed(() => {
  return quoteLine1.value.length + historyPara1.value.length +
         historyDetail1.value.length + modernPara1.value.length +
         modernDetail1.value.length
})

// 生成或获取sessionId
const getSessionId = () => {
  let sessionId = localStorage.getItem('visitorSessionId')
  if (!sessionId) {
    sessionId = `visitor-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
    localStorage.setItem('visitorSessionId', sessionId)
  }
  return sessionId
}

// 获取访客统计
const fetchVisitorCount = async () => {
  try {
    const sessionId = getSessionId()

    // 增加访客量
    const addResponse = await visitorAPI.addVisitor(sessionId)
    if (addResponse.success) {
      visitorNumber.value = addResponse.data.visitorNumber
    }

    // 获取总访客数
    const countResponse = await visitorAPI.getCount()
    if (countResponse.success) {
      const actualCount = countResponse.data.totalVisitors
      const baseOffset = 12435 // 基础偏移量
      const target = actualCount + baseOffset

      // 动态数字增长动画
      let count = Math.max(baseOffset, target - 100)
      const interval = setInterval(() => {
        count += Math.floor(Math.random() * 10) + 5
        if (count >= target) {
          count = target
          clearInterval(interval)
        }
        visitorCount.value = String(count).padStart(6, '0')
      }, 30)
    }
  } catch (error) {
    console.error('获取访客数失败:', error)
    visitorCount.value = '------'
  }
}

// 继续按钮点击
const handleContinue = () => {
  scrollHintHidden.value = true
  contentHidden.value = true

  // 添加点击火花效果
  gsap.to(contentRef.value, {
    opacity: 0,
    scale: 1.1,
    duration: 0.8,
    ease: 'power2.out',
    onComplete: () => {
      // 触发自定义事件
      window.dispatchEvent(new CustomEvent('hero-fire-ignited'))

      // 滚动到时间线部分
      const timelineSection = document.getElementById('timeline')
      if (timelineSection) {
        // 不扣除导航栏高度,因为滚动后导航栏会收起
        // 额外向下滚动一个导航栏的距离
        const targetPosition = timelineSection.offsetTop

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        })
      }
    }
  })
}

// 监听滚动
const handleScroll = () => {
  const scrollY = window.scrollY

  // 控制滚动提示的显示/隐藏
  if (scrollY > 100) {
    scrollHintHidden.value = true
  } else {
    scrollHintHidden.value = false
  }

  // 当用户滚动回顶部时,重新显示内容
  if (scrollY < 50 && contentHidden.value) {
    contentHidden.value = false

    // 重新显示内容动画
    gsap.to(contentRef.value, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out'
    })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  // 确保视频静音
  if (videoRef.value) {
    videoRef.value.muted = true
    videoRef.value.volume = 0
  }

  // 延迟获取访客数,等待主要文字动画完成
  setTimeout(() => {
    fetchVisitorCount()
  }, totalChars.value * 30 + 500)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  margin-top: -80px; /* 向上偏移导航栏高度，让视频覆盖导航栏区域 */
  padding-top: 80px; /* 补偿偏移，保持内容位置不变 */
}

/* 视频背景样式 */
.video-background {
  position: absolute;
  top: 0; /* 从容器顶部开始，会覆盖导航栏区域 */
  left: 50%;
  min-width: 100%;
  min-height: calc(100% + 80px); /* 高度增加导航栏高度 */
  width: auto;
  height: auto;
  transform: translateX(-50%);
  z-index: 1;
  object-fit: cover;
}

/* 视频蒙版 */
.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.7) 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
  z-index: 2;
}

/* 内容区域 */
.hero-content {
  position: relative;
  z-index: 3;
  max-width: 1200px;
  padding: var(--spacing-3xl);
  padding-top: 150px; /* 增加顶部间距避免被导航栏遮挡 */
  text-align: left;
}

/* 引言文字 */
.quote-text {
  margin-bottom: var(--spacing-2xl);
}

.quote-line {
  font-size: var(--text-3xl);
  font-family: var(--font-title);
  color: var(--color-torch-amber);
  line-height: 1.8;
  text-shadow: 2px 2px 12px rgba(255, 122, 26, 0.5);
}

/* 历史文字 */
.history-text {
  margin-bottom: var(--spacing-2xl);
}

.history-paragraph {
  font-size: var(--text-xl);
  color: white;
  line-height: 2;
  margin-bottom: var(--spacing-md);
  text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.8);
}

.history-detail {
  font-size: var(--text-base);
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.8;
  padding-left: var(--spacing-lg);
  border-left: 3px solid var(--color-torch-amber);
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
}

/* 现代文字 */
.modern-text {
  margin-bottom: var(--spacing-3xl);
}

.modern-paragraph {
  font-size: var(--text-xl);
  color: white;
  line-height: 2;
  margin-bottom: var(--spacing-md);
  text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.8);
}

.modern-detail {
  font-size: var(--text-base);
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.8;
  padding-left: var(--spacing-lg);
  border-left: 3px solid var(--color-river-blue);
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
}

/* 打字机效果 */
.typewriter-char {
  display: inline;
  opacity: 0;
  animation: typewriter 0.1s ease-in forwards;
}

.typewriter-char.fade-in {
  animation: fadeIn 0.2s ease-in forwards;
}

@keyframes typewriter {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.85;
  }
}

/* 访客统计 */
.visitor-count {
  text-align: center;
  margin-bottom: var(--spacing-md);
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.welcome-text {
  font-size: var(--text-2xl);
  font-family: var(--font-title);
  color: white;
  margin-bottom: var(--spacing-sm);
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
}

.visitor-number {
  display: inline-block;
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--color-torch-amber);
  margin: 0 var(--spacing-sm);
  font-family: var(--font-mono);
  text-shadow: 0 0 20px rgba(255, 122, 26, 0.8);
}

.fire-text {
  font-size: var(--text-lg);
  color: rgba(255, 255, 255, 0.9);
  font-family: var(--font-title);
  text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.8);
}

/* 火种按钮 */
.fire-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg) var(--spacing-2xl);
  font-size: var(--text-xl);
  font-weight: 600;
  font-family: var(--font-title);
  color: white;
  background: var(--gradient-torch);
  border-radius: var(--radius-full);
  box-shadow: 0 8px 32px rgba(255, 122, 26, 0.4);
  transition: all var(--transition-base);
  opacity: 0;
  animation: fireButtonAppear 0.8s ease-out forwards;
  margin: 0 auto var(--spacing-2xl);
  cursor: pointer;
}

@keyframes fireButtonAppear {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.fire-button:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 12px 48px rgba(255, 122, 26, 0.6);
}

.fire-button:active {
  transform: translateY(-2px) scale(1.02);
}

.fire-icon {
  width: 32px;
  height: 32px;
  animation: fireFlicker 2s infinite;
}

.fire-icon svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.8));
}

@keyframes fireFlicker {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.85;
    transform: scale(1.1);
  }
}

/* 滚动提示 */
.scroll-hint {
  position: absolute;
  bottom: var(--spacing-xl);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  color: white;
  font-size: var(--text-sm);
  z-index: 4;
  opacity: 1;
  transition: opacity var(--transition-base);
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
}

.scroll-hint.hidden {
  opacity: 0;
  pointer-events: none;
}

.scroll-arrow {
  font-size: var(--text-2xl);
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* 响应式 */
@media (max-width: 1024px) {
  .hero-content {
    padding: var(--spacing-2xl);
    padding-top: 160px; /* 增加顶部间距避免被导航栏遮挡 */
  }

  .quote-line {
    font-size: var(--text-2xl);
  }

  .history-paragraph,
  .modern-paragraph {
    font-size: var(--text-lg);
  }

  .history-detail,
  .modern-detail {
    font-size: var(--text-sm);
  }
}

@media (max-width: 768px) {
  .hero-content {
    padding: var(--spacing-xl);
    padding-top: 120px; /* 移动端顶部间距 */
  }

  .quote-line {
    font-size: var(--text-xl);
  }

  .history-paragraph,
  .modern-paragraph {
    font-size: var(--text-base);
  }

  .history-detail,
  .modern-detail {
    font-size: var(--text-sm);
    padding-left: var(--spacing-md);
  }

  .welcome-text {
    font-size: var(--text-lg);
  }

  .visitor-number {
    font-size: var(--text-2xl);
  }

  .fire-button {
    font-size: var(--text-lg);
    padding: var(--spacing-md) var(--spacing-xl);
  }

  .fire-icon {
    width: 24px;
    height: 24px;
  }
}
</style>
