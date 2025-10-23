<template>
  <div class="timeline-container" ref="containerRef">
    <!-- 背景装饰层 (视差效果) -->
    <div class="background-layer" ref="bgLayerRef">
      <!-- 历史照片装饰 -->
      <div class="historic-photo photo-1"></div>
      <div class="historic-photo photo-2"></div>
      <div class="historic-photo photo-3"></div>
      <div class="historic-photo photo-4"></div>

      <!-- 水墨渐变云 -->
      <div class="ink-cloud cloud-1"></div>
      <div class="ink-cloud cloud-2"></div>
      <div class="ink-cloud cloud-3"></div>

      <!-- 流动水纹 -->
      <div class="water-pattern"></div>

      <!-- 漂浮的水滴粒子 -->
      <div
        class="water-drop"
        v-for="i in 15"
        :key="i"
        :style="{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${8 + Math.random() * 4}s`
        }"
      ></div>
    </div>

    <!-- 时间线头部 -->
    <div id="timeline-header" class="timeline-header">
      <h1 class="timeline-title">
        <span class="title-main">{{ $t('timeline.header.title') }}</span>
        <span class="title-sub">{{ $t('timeline.header.subtitle') }}</span>
      </h1>
      <div class="header-decoration">
        <div class="deco-line"></div>
        <div class="deco-circle"></div>
        <div class="deco-line"></div>
      </div>
      <p class="timeline-intro" v-html="$t('timeline.header.intro')"></p>
    </div>

    <!-- 时间线主体 -->
    <div id="timeline-main" class="timeline-main" ref="timelineRef">
      <TimelineNode
        v-for="(node, index) in timelineData"
        :key="node.id"
        :node="node"
        :position="index % 2 === 0 ? 'right' : 'left'"
      />
    </div>

    <!-- 结语 -->
    <div id="timeline-epilogue" class="timeline-epilogue" v-if="epilogue">
      <div class="epilogue-content">
        <h2 class="epilogue-title">{{ epilogue.title }}</h2>
        <div class="epilogue-verses">
          <p
            v-for="(verse, index) in epilogue.verses"
            :key="index"
            class="verse-line"
            :class="{ 'verse-empty': verse === '' }"
          >
            {{ verse }}
          </p>
        </div>

        <!-- 尾声装饰 -->
        <div class="epilogue-decoration">
          <div class="deco-wave"></div>
          <div class="deco-wave"></div>
          <div class="deco-wave"></div>
        </div>

        <!-- 行动号召 -->
        <div class="epilogue-cta">
          <p class="cta-text">{{ $t('timeline.epilogue.cta') }}</p>
          <router-link to="/blessings" class="cta-button">
            {{ $t('timeline.epilogue.ctaButton') }}
            <span class="button-arrow">→</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 滚动进度指示器 -->
    <div class="scroll-indicator" :style="{ height: `${scrollProgress}%` }"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScroll } from '@vueuse/core'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TimelineNode from './TimelineNode.vue'
import { timelineData as originalTimelineData } from '@/data/timelineData'
import timelineDataZh from '@/i18n/locales/timelineData.zh'
import timelineDataEn from '@/i18n/locales/timelineData.en'

const { t, locale } = useI18n()

// 动态获取结语内容
const epilogue = computed(() => {
  return locale.value === 'zh' ? timelineDataZh.epilogue : timelineDataEn.epilogue
})

// 合并原始数据和翻译数据
const timelineData = computed(() => {
  const translations = locale.value === 'zh' ? timelineDataZh.events : timelineDataEn.events

  return originalTimelineData.map(node => {
    const translation = translations[node.year]
    if (!translation) return node

    // 合并翻译数据到原始节点
    return {
      ...node,
      ...translation,
      // 保持原始数据的theme和id
      theme: node.theme,
      id: node.id,
      year: node.year
    }
  })
})

gsap.registerPlugin(ScrollTrigger)

const containerRef = ref(null)
const bgLayerRef = ref(null)
const timelineRef = ref(null)
const scrollProgress = ref(0)

// 监听滚动
const { y: scrollY } = useScroll(window)

onMounted(() => {
  initParallaxEffects()
  initScrollAnimations()
  initScrollProgress()
})

// 初始化视差效果
const initParallaxEffects = () => {
  if (!bgLayerRef.value) return

  // 背景层视差移动
  gsap.to(bgLayerRef.value, {
    scrollTrigger: {
      trigger: containerRef.value,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
    },
    y: '20%',
    ease: 'none'
  })

  // 水墨云视差
  const clouds = bgLayerRef.value.querySelectorAll('.ink-cloud')
  clouds.forEach((cloud, index) => {
    gsap.to(cloud, {
      scrollTrigger: {
        trigger: containerRef.value,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1 + index * 0.5,
      },
      y: `${30 + index * 20}%`,
      ease: 'none'
    })
  })
}

// 初始化滚动动画
const initScrollAnimations = () => {
  if (!timelineRef.value) return

  // 时间线头部淡入
  gsap.from('.timeline-header', {
    scrollTrigger: {
      trigger: '.timeline-header',
      start: 'top 80%',
      end: 'bottom 60%',
      scrub: 1,
    },
    opacity: 0,
    y: 60,
    ease: 'power2.out'
  })

  // 结语渐入
  gsap.from('.timeline-epilogue', {
    scrollTrigger: {
      trigger: '.timeline-epilogue',
      start: 'top 85%',
      end: 'top 50%',
      scrub: 1,
    },
    opacity: 0,
    y: 80,
    ease: 'power2.out'
  })

  // 诗句逐行显现
  const verses = document.querySelectorAll('.verse-line')
  verses.forEach((verse, index) => {
    gsap.from(verse, {
      scrollTrigger: {
        trigger: verse,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      x: -30,
      duration: 0.8,
      delay: index * 0.1,
      ease: 'power2.out'
    })
  })
}

// 滚动进度计算
const initScrollProgress = () => {
  window.addEventListener('scroll', updateScrollProgress)
}

const updateScrollProgress = () => {
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  const progress = (scrollTop / (documentHeight - windowHeight)) * 100
  scrollProgress.value = Math.min(progress, 100)
}

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress)
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<style scoped>
.timeline-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(
    180deg,
    #F8F5EF 0%,
    #E5E2DC 30%,
    #D9D6D0 60%,
    #CCC9C3 100%
  );
  overflow: hidden;
}

/* ===== 背景装饰层 ===== */
.background-layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

/* 历史照片装饰 */
.historic-photo {
  position: absolute;
  width: 400px;
  height: 300px;
  background-size: cover;
  background-position: center;
  opacity: 0.04;
  border-radius: 8px;
  filter: grayscale(100%) sepia(20%);
  animation: float-photo 25s ease-in-out infinite;
}

.photo-1 {
  top: 15%;
  left: 5%;
  background-image: url('https://s1.img.five-plus-one.com/2025/10/22/68f8b088cbd5f.jpg');
  transform: rotate(-5deg);
  animation-delay: 0s;
}

.photo-2 {
  top: 45%;
  right: 8%;
  background-image: url('https://s1.img.five-plus-one.com/2025/10/22/68f8b1a1681e4.jpg');
  transform: rotate(4deg);
  animation-delay: -8s;
}

.photo-3 {
  bottom: 25%;
  left: 10%;
  background-image: url('https://s1.img.five-plus-one.com/2025/10/22/68f8b39a9d71f.jpg');
  transform: rotate(-3deg);
  animation-delay: -16s;
}

.photo-4 {
  top: 60%;
  right: 15%;
  background-image: url('https://s1.img.five-plus-one.com/2025/10/22/68f8b1de050d1.jpg');
  transform: rotate(6deg);
  animation-delay: -12s;
}

@keyframes float-photo {
  0%, 100% {
    transform: translate(0, 0) rotate(var(--initial-rotation, 0deg));
    opacity: 0.04;
  }
  50% {
    transform: translate(20px, -20px) rotate(calc(var(--initial-rotation, 0deg) + 2deg));
    opacity: 0.06;
  }
}

/* 水墨云 */
.ink-cloud {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.15;
  animation: float-cloud 20s ease-in-out infinite;
}

.cloud-1 {
  top: 10%;
  left: 15%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(0, 82, 156, 0.4) 0%, transparent 70%);
  animation-delay: 0s;
}

.cloud-2 {
  top: 40%;
  right: 10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(212, 165, 116, 0.3) 0%, transparent 70%);
  animation-delay: -7s;
}

.cloud-3 {
  bottom: 20%;
  left: 25%;
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, rgba(0, 82, 156, 0.35) 0%, transparent 70%);
  animation-delay: -14s;
}

@keyframes float-cloud {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -20px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 30px) scale(0.95);
  }
}

/* 水纹背景 */
.water-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 100px,
      rgba(0, 82, 156, 0.03) 100px,
      rgba(0, 82, 156, 0.03) 102px
    ),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 100px,
      rgba(0, 82, 156, 0.03) 100px,
      rgba(0, 82, 156, 0.03) 102px
    );
  opacity: 0.5;
}

/* 漂浮水滴 */
.water-drop {
  position: absolute;
  width: 8px;
  height: 8px;
  background: radial-gradient(circle, rgba(0, 82, 156, 0.4) 0%, transparent 70%);
  border-radius: 50%;
  animation: float-drop linear infinite;
}

@keyframes float-drop {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(100vh) translateX(calc(var(--random-x, 0) * 50px));
    opacity: 0;
  }
}

/* ===== 时间线头部 ===== */
.timeline-header {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 120px 40px 80px;
  text-align: center;
  z-index: 1;
}

.timeline-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 40px;
}

.title-main {
  font-size: 4.5rem;
  font-family: var(--font-title);
  font-weight: 700;
  background: linear-gradient(135deg, var(--color-river-blue), var(--color-torch-gold));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 8px;
  text-shadow: 0 4px 20px rgba(0, 82, 156, 0.2);
}

.title-sub {
  font-size: 1.8rem;
  font-family: var(--font-title);
  font-weight: 500;
  color: var(--color-ink-black);
  opacity: 0.7;
  letter-spacing: 6px;
}

.header-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
}

.deco-line {
  width: 80px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--color-river-blue), transparent);
}

.deco-circle {
  width: 12px;
  height: 12px;
  background: var(--color-torch-gold);
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(212, 165, 116, 0.6);
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.7;
  }
}

.timeline-intro {
  font-size: 1.25rem;
  line-height: 2.2;
  color: var(--color-ink-black);
  opacity: 0.85;
  font-weight: 400;
  max-width: 800px;
  margin: 0 auto;
}

/* ===== 时间线主体 ===== */
.timeline-main {
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  padding: 80px 60px;
  z-index: 1;
}

/* ===== 结语部分 ===== */
.timeline-epilogue {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 40px 120px;
  z-index: 1;
}

.epilogue-content {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 245, 239, 0.95) 100%);
  padding: 60px 80px;
  border-radius: 32px;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(0, 82, 156, 0.1);
  position: relative;
  overflow: hidden;
}

.epilogue-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, var(--color-river-blue), var(--color-torch-gold), var(--color-river-blue));
}

.epilogue-title {
  font-size: 3rem;
  font-family: var(--font-title);
  font-weight: 700;
  color: var(--color-river-blue);
  text-align: center;
  margin-bottom: 50px;
  letter-spacing: 4px;
}

.epilogue-verses {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 60px;
  padding: 0 40px;
}

.verse-line {
  font-size: 1.5rem;
  font-family: var(--font-title);
  font-weight: 500;
  line-height: 2;
  color: var(--color-ink-black);
  text-align: center;
  letter-spacing: 2px;
  opacity: 0.9;
}

.verse-line.verse-empty {
  height: 20px;
}

/* 尾声装饰波浪 */
.epilogue-decoration {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin: 50px 0;
}

.deco-wave {
  width: 60px;
  height: 4px;
  background: var(--color-river-blue);
  border-radius: 4px;
  animation: wave-flow 3s ease-in-out infinite;
}

.deco-wave:nth-child(2) {
  animation-delay: -1s;
}

.deco-wave:nth-child(3) {
  animation-delay: -2s;
}

@keyframes wave-flow {
  0%, 100% {
    transform: scaleX(1);
    opacity: 1;
  }
  50% {
    transform: scaleX(1.5);
    opacity: 0.6;
  }
}

/* 行动号召 */
.epilogue-cta {
  text-align: center;
  margin-top: 50px;
}

.cta-text {
  font-size: 1.3rem;
  font-family: var(--font-title);
  font-weight: 600;
  color: var(--color-river-blue);
  margin-bottom: 30px;
  letter-spacing: 2px;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 18px 48px;
  background: linear-gradient(135deg, var(--color-river-blue), #0066AA);
  color: white;
  font-size: 1.2rem;
  font-family: var(--font-title);
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  box-shadow: 0 8px 30px rgba(0, 82, 156, 0.3);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  letter-spacing: 1px;
}

.cta-button:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 15px 50px rgba(0, 82, 156, 0.5);
}

.cta-button:active {
  transform: translateY(-2px) scale(1.02);
}

.button-arrow {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.cta-button:hover .button-arrow {
  transform: translateX(6px);
}

/* ===== 滚动进度指示器 ===== */
.scroll-indicator {
  position: fixed;
  top: 0;
  left: 0;
  width: 4px;
  height: 0;
  background: linear-gradient(
    to bottom,
    var(--color-river-blue) 0%,
    var(--color-torch-gold) 50%,
    var(--color-river-blue) 100%
  );
  z-index: 1000;
  transition: height 0.1s ease-out;
  box-shadow: 0 0 10px rgba(0, 82, 156, 0.5);
}

/* ===== 响应式设计 ===== */
@media (max-width: 1024px) {
  .timeline-main {
    padding: 60px 40px;
  }

  .title-main {
    font-size: 3.5rem;
    letter-spacing: 6px;
  }

  .title-sub {
    font-size: 1.4rem;
    letter-spacing: 4px;
  }

  .epilogue-content {
    padding: 50px 60px;
  }

  .epilogue-title {
    font-size: 2.5rem;
  }

  .verse-line {
    font-size: 1.3rem;
  }
}

@media (max-width: 768px) {
  .timeline-header {
    padding: 100px 24px 60px;
  }

  .timeline-main {
    padding: 40px 20px;
  }

  .title-main {
    font-size: 2.5rem;
    letter-spacing: 4px;
  }

  .title-sub {
    font-size: 1.1rem;
    letter-spacing: 2px;
  }

  .timeline-intro {
    font-size: 1.05rem;
    line-height: 2;
  }

  .timeline-epilogue {
    padding: 60px 20px 80px;
  }

  .epilogue-content {
    padding: 40px 30px;
    border-radius: 24px;
  }

  .epilogue-title {
    font-size: 2rem;
    letter-spacing: 2px;
  }

  .epilogue-verses {
    padding: 0 10px;
    gap: 16px;
  }

  .verse-line {
    font-size: 1.1rem;
  }

  .cta-button {
    padding: 16px 36px;
    font-size: 1.05rem;
  }

  .ink-cloud {
    width: 300px !important;
    height: 300px !important;
  }
}

@media (max-width: 480px) {
  .title-main {
    font-size: 2rem;
  }

  .title-sub {
    font-size: 0.95rem;
  }

  .timeline-intro {
    font-size: 0.95rem;
  }

  .epilogue-title {
    font-size: 1.6rem;
  }

  .verse-line {
    font-size: 1rem;
  }

  .epilogue-content {
    padding: 30px 20px;
  }

  .cta-button {
    padding: 14px 28px;
    font-size: 1rem;
  }
}
</style>
