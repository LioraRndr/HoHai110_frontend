<template>
  <PageLayout>
    <div class="blessings-page">
      <!-- 顶部装饰波浪 -->
      <div class="header-decoration">
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            fill="url(#gradient1)"
            fill-opacity="0.3"
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#4A90E2;stop-opacity:0.8" />
              <stop offset="50%" style="stop-color:#357ABD;stop-opacity:0.6" />
              <stop offset="100%" style="stop-color:#2E5F8D;stop-opacity:0.4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div class="page-header">
        <div class="header-content">
          <div class="title-wrapper">
            <h1 class="main-title">
              <span class="title-char" v-for="(char, index) in titleChars" :key="index" :style="{ animationDelay: `${index * 0.1}s` }">
                {{ char }}
              </span>
            </h1>
            <div class="title-underline"></div>
          </div>
          <!-- <p class="subtitle">
            <span class="subtitle-icon">✨</span>
            献给河海大学110周年的真挚祝福
            <span class="subtitle-icon">✨</span>
          </p>
          <div class="stats-banner">
            <div class="stat-item">
              <div class="stat-number">{{ total || 0 }}</div>
              <div class="stat-label">条祝福</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-number">{{ randomBlessings.length || 6 }}</div>
              <div class="stat-label">精选展示</div>
            </div>
          </div> -->
        </div>
      </div>

      <!-- 祝福墙组件 -->
      <BlessingWall @update:total="total = $event" />

      <!-- 随机祝福展示 -->
      <!-- <section class="random-blessings-section">
        <div class="section-header">
          <h2>
            <span class="section-icon">🌟</span>
            精选祝福
            <span class="section-icon">🌟</span>
          </h2>
          <p class="section-description">来自校友们的暖心寄语</p>
        </div>

        <div v-if="randomLoading" class="loading-container">
          <div class="loading-spinner"></div>
          <p class="loading-text">加载中...</p>
        </div>

        <transition-group
          v-else
          name="card-list"
          tag="div"
          class="random-blessings-grid"
        >
          <div
            v-for="(blessing, index) in randomBlessings"
            :key="blessing.id"
            class="random-blessing-card"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="card-decoration">
              <div class="corner-decoration top-left"></div>
              <div class="corner-decoration top-right"></div>
              <div class="corner-decoration bottom-left"></div>
              <div class="corner-decoration bottom-right"></div>
            </div>
            <div class="quote-icon">"</div>
            <p class="blessing-text">{{ blessing.content }}</p>
            <div class="blessing-author">
              <span class="author-icon">👤</span>
              {{ blessing.isAnonymous ? '匿名校友' : blessing.authorName }}
              <span v-if="!blessing.isAnonymous && blessing.graduationYear" class="graduation-badge">
                {{ blessing.graduationYear }}届
              </span>
            </div>
          </div>
        </transition-group>

        <button @click="loadRandomBlessings" class="refresh-btn" :disabled="randomLoading">
          <span class="btn-icon" :class="{ rotating: randomLoading }">🔄</span>
          <span>{{ randomLoading ? '加载中...' : '换一批' }}</span>
        </button>
      </section> -->

      <!-- 底部装饰 -->
      <div class="footer-decoration">
        <div class="sparkle" v-for="i in 20" :key="i" :style="sparkleStyle(i)"></div>
      </div>
    </div>
  </PageLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { blessingAPI } from '@/api'
import PageLayout from '@/components/PageLayout.vue'
import BlessingWall from '@/components/BlessingWall.vue'

const randomBlessings = ref([])
const randomLoading = ref(false)
const total = ref(0)

// 标题字符分解（用于动画）
const titleChars = computed(() => '祝福墙'.split(''))

// 加载随机祝福
const loadRandomBlessings = async () => {
  randomLoading.value = true
  try {
    const response = await blessingAPI.getRandomBlessings(6)
    randomBlessings.value = response.data
  } catch (error) {
    console.error('加载随机祝福失败:', error)
  } finally {
    randomLoading.value = false
  }
}

// 生成星星闪烁样式
const sparkleStyle = (index) => {
  const randomLeft = Math.random() * 100
  const randomDelay = Math.random() * 3
  const randomDuration = 2 + Math.random() * 2
  return {
    left: `${randomLeft}%`,
    animationDelay: `${randomDelay}s`,
    animationDuration: `${randomDuration}s`
  }
}

onMounted(() => {
  loadRandomBlessings()
})
</script>

<style scoped>
/* === 页面基础布局 === */
.blessings-page {
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 80vh;
  overflow: hidden;
}

/* === 顶部装饰波浪 === */
.header-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  pointer-events: none;
  z-index: 0;
}

.header-decoration svg {
  width: 100%;
  height: auto;
  display: block;
}

/* === 页面头部 === */
.page-header {
  position: relative;
  text-align: center;
  margin-bottom: 4rem;
  padding: 3rem 0 2rem;
  z-index: 1;
}

.header-content {
  position: relative;
  margin-top: 30px;
}

/* 标题包装器 */
.title-wrapper {
  display: inline-block;
  position: relative;
  margin-bottom: 1.5rem;
}

.main-title {
  font-size: 4rem;
  font-weight: 800;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 0.2rem;
}

/* 标题字符动画 */
.title-char {
  display: inline-block;
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 50%, #5C9FD6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: titleFloat 3s ease-in-out infinite;
  text-shadow: 0 0 30px rgba(74, 144, 226, 0.3);
}

@keyframes titleFloat {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-10px) scale(1.05);
  }
}

/* 标题下划线 */
.title-underline {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 4px;
  background: linear-gradient(90deg, transparent, #4A90E2, #357ABD, transparent);
  border-radius: 2px;
  animation: underlineExpand 2s ease-in-out infinite;
}

@keyframes underlineExpand {
  0%, 100% {
    width: 60%;
    opacity: 0.6;
  }
  50% {
    width: 80%;
    opacity: 1;
  }
}

/* 副标题 */
.subtitle {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  font-weight: 400;
  letter-spacing: 0.5px;
}

.subtitle-icon {
  font-size: 1.5rem;
  animation: sparkle 1.5s ease-in-out infinite;
}

@keyframes sparkle {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.2) rotate(15deg);
  }
}

/* 统计横幅 */
.stats-banner {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  padding: 1.5rem 3rem;
  background: linear-gradient(135deg, rgba(74, 144, 226, 0.15) 0%, rgba(53, 122, 189, 0.08) 100%);
  border-radius: 20px;
  border: 1px solid rgba(74, 144, 226, 0.3);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(74, 144, 226, 0.15);
  display: inline-flex;
  animation: statsBannerFloat 4s ease-in-out infinite;
}

@keyframes statsBannerFloat {
  0%, 100% {
    transform: translateY(0);
    box-shadow: 0 8px 32px rgba(74, 144, 226, 0.15);
  }
  50% {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(74, 144, 226, 0.25);
  }
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #5CB3FF 0%, #4A90E2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}

.stat-label {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 0.3rem;
  font-weight: 500;
}

.stat-divider {
  width: 2px;
  height: 50px;
  background: linear-gradient(180deg, transparent, rgba(74, 144, 226, 0.5), transparent);
  border-radius: 1px;
}

/* === 随机祝福区域 === */
.random-blessings-section {
  position: relative;
  margin-top: 5rem;
  padding: 3.5rem;
  background: linear-gradient(135deg, rgba(74, 144, 226, 0.08) 0%, rgba(53, 122, 189, 0.04) 100%);
  border-radius: 24px;
  border: 1px solid rgba(74, 144, 226, 0.2);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

/* 区域头部 */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.section-icon {
  font-size: 2rem;
  animation: iconPulse 2s ease-in-out infinite;
}

@keyframes iconPulse {
  0%, 100% {
    transform: scale(1);
    filter: brightness(1);
  }
  50% {
    transform: scale(1.2);
    filter: brightness(1.3);
  }
}

.section-description {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
}

/* 加载动画 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  gap: 1rem;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(74, 144, 226, 0.2);
  border-top-color: #4A90E2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
}

/* 祝福卡片网格 */
.random-blessings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

/* 卡片过渡动画 */
.card-list-enter-active {
  animation: cardEnter 0.6s ease-out;
}

.card-list-leave-active {
  animation: cardLeave 0.4s ease-in;
}

@keyframes cardEnter {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes cardLeave {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.8);
  }
}

/* 随机祝福卡片 */
.random-blessing-card {
  position: relative;
  padding: 2.5rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  animation: cardFadeIn 0.6s ease-out backwards;
}

@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.random-blessing-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(74, 144, 226, 0.1), rgba(92, 163, 214, 0.05));
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.random-blessing-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 40px rgba(74, 144, 226, 0.3);
  border-color: rgba(74, 144, 226, 0.5);
}

.random-blessing-card:hover::before {
  opacity: 1;
}

/* 卡片装饰角 */
.card-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.corner-decoration {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(74, 144, 226, 0.4);
  transition: all 0.4s ease;
}

.corner-decoration.top-left {
  top: 10px;
  left: 10px;
  border-right: none;
  border-bottom: none;
  border-radius: 4px 0 0 0;
}

.corner-decoration.top-right {
  top: 10px;
  right: 10px;
  border-left: none;
  border-bottom: none;
  border-radius: 0 4px 0 0;
}

.corner-decoration.bottom-left {
  bottom: 10px;
  left: 10px;
  border-right: none;
  border-top: none;
  border-radius: 0 0 0 4px;
}

.corner-decoration.bottom-right {
  bottom: 10px;
  right: 10px;
  border-left: none;
  border-top: none;
  border-radius: 0 0 4px 0;
}

.random-blessing-card:hover .corner-decoration {
  border-color: rgba(74, 144, 226, 0.8);
}

.random-blessing-card:hover .corner-decoration.top-left,
.random-blessing-card:hover .corner-decoration.bottom-right {
  transform: translate(-3px, -3px);
}

.random-blessing-card:hover .corner-decoration.top-right,
.random-blessing-card:hover .corner-decoration.bottom-left {
  transform: translate(3px, 3px);
}

/* 引号图标 */
.quote-icon {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  font-size: 5rem;
  color: rgba(74, 144, 226, 0.15);
  font-family: Georgia, serif;
  line-height: 1;
  pointer-events: none;
  transition: all 0.4s ease;
}

.random-blessing-card:hover .quote-icon {
  color: rgba(74, 144, 226, 0.25);
  transform: scale(1.1);
}

/* 祝福内容 */
.blessing-text {
  position: relative;
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.05rem;
  line-height: 1.9;
  margin-bottom: 2rem;
  margin-top: 3rem;
  font-style: italic;
  z-index: 1;
  font-weight: 400;
  letter-spacing: 0.3px;
}

/* 作者信息 */
.blessing-author {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.6rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  font-weight: 500;
  position: relative;
  z-index: 1;
}

.author-icon {
  font-size: 1.1rem;
  opacity: 0.8;
}

.graduation-badge {
  padding: 0.2rem 0.7rem;
  background: rgba(74, 144, 226, 0.2);
  border: 1px solid rgba(74, 144, 226, 0.3);
  border-radius: 12px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
}

/* 刷新按钮 */
.refresh-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin: 3rem auto 0;
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
  position: relative;
  overflow: hidden;
}

.refresh-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.refresh-btn:hover::before {
  width: 300px;
  height: 300px;
}

.refresh-btn:hover:not(:disabled) {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 25px rgba(74, 144, 226, 0.5);
}

.refresh-btn:active:not(:disabled) {
  transform: translateY(-1px) scale(1.02);
}

.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-icon {
  font-size: 1.3rem;
  transition: transform 0.6s ease;
  position: relative;
  z-index: 1;
}

.btn-icon.rotating {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.refresh-btn span {
  position: relative;
  z-index: 1;
}

/* 底部装饰 */
.footer-decoration {
  position: relative;
  height: 100px;
  margin-top: 4rem;
  overflow: hidden;
}

.sparkle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, rgba(74, 144, 226, 0.8), transparent);
  border-radius: 50%;
  animation: sparkleFloat 3s ease-in-out infinite;
  bottom: 0;
}

@keyframes sparkleFloat {
  0% {
    transform: translateY(0) scale(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) scale(1);
    opacity: 0;
  }
}

/* === 响应式设计 === */
@media (max-width: 1024px) {
  .random-blessings-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .blessings-page {
    padding: 1rem;
  }

  .page-header {
    padding: 2rem 0 1.5rem;
    margin-bottom: 3rem;
  }

  .main-title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1rem;
    flex-direction: column;
    gap: 0.5rem;
  }

  .stats-banner {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem 2rem;
  }

  .stat-divider {
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(74, 144, 226, 0.5), transparent);
  }

  .stat-number {
    font-size: 2rem;
  }

  .random-blessings-section {
    padding: 2rem 1.5rem;
    margin-top: 3rem;
  }

  .section-header h2 {
    font-size: 1.8rem;
    flex-direction: column;
    gap: 0.5rem;
  }

  .section-description {
    font-size: 0.95rem;
  }

  .random-blessings-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .random-blessing-card {
    padding: 2rem;
  }

  .quote-icon {
    font-size: 3.5rem;
  }

  .blessing-text {
    font-size: 0.95rem;
    margin-top: 2.5rem;
  }

  .refresh-btn {
    width: 100%;
    padding: 0.9rem 2rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 2rem;
  }

  .random-blessing-card {
    padding: 1.5rem;
  }

  .blessing-text {
    font-size: 0.9rem;
  }
}
</style>
