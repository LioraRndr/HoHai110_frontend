<template>
  <div class="poster-page">
    <Navbar />
    <div class="poster-container">
      <div class="page-header">
        <h1 class="page-title">纪念海报生成</h1>
        <p class="page-subtitle">生成属于你的河海110周年专属海报</p>
      </div>

      <div class="poster-main">
        <!-- 海报预览 -->
        <div class="poster-preview">
          <div class="poster-canvas" ref="posterRef">
            <!-- 海报背景 -->
            <div class="poster-background" :class="`theme-${selectedTheme}`">
              <div class="background-pattern"></div>

              <!-- 海报内容 -->
              <div class="poster-content">
                <div class="poster-logo">河海大学</div>
                <div class="poster-year">
                  <span class="year-number">110</span>
                  <span class="year-text">周年校庆</span>
                </div>
                <div class="poster-date">1915 - 2025</div>
                <div class="poster-motto">{{ selectedMotto }}</div>

                <div v-if="userMessage" class="poster-message">
                  "{{ userMessage }}"
                </div>

                <div v-if="userName" class="poster-author">
                  —— {{ userName }}
                </div>
              </div>

              <!-- 装饰元素 -->
              <div class="poster-decoration">
                <div class="decoration-circle decoration-1"></div>
                <div class="decoration-circle decoration-2"></div>
                <div class="decoration-circle decoration-3"></div>
              </div>
            </div>
          </div>

          <button class="download-btn" @click="downloadPoster">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            下载海报
          </button>
        </div>

        <!-- 自定义选项 -->
        <div class="poster-controls">
          <h3 class="controls-title">自定义海报</h3>

          <!-- 主题选择 -->
          <div class="control-section">
            <label>主题风格</label>
            <div class="theme-options">
              <button
                v-for="theme in themes"
                :key="theme.id"
                class="theme-btn"
                :class="{ active: selectedTheme === theme.id }"
                @click="selectedTheme = theme.id"
              >
                <div class="theme-preview" :class="`theme-${theme.id}`"></div>
                {{ theme.name }}
              </button>
            </div>
          </div>

          <!-- 格言选择 -->
          <div class="control-section">
            <label>选择校训</label>
            <select v-model="selectedMotto" class="custom-select">
              <option v-for="motto in mottos" :key="motto" :value="motto">
                {{ motto }}
              </option>
            </select>
          </div>

          <!-- 用户信息 -->
          <div class="control-section">
            <label>你的名字</label>
            <input
              v-model="userName"
              type="text"
              placeholder="输入你的名字..."
              class="custom-input"
            />
          </div>

          <div class="control-section">
            <label>祝福语 (选填)</label>
            <textarea
              v-model="userMessage"
              placeholder="写下你对母校的祝福..."
              rows="4"
              maxlength="100"
              class="custom-textarea"
            ></textarea>
            <div class="char-count">{{ userMessage.length }}/100</div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { showInfo } from '@/utils/message'

const posterRef = ref(null)
const selectedTheme = ref('blue')
const selectedMotto = ref('艰苦朴素 实事求是 严格要求 勇于探索')
const userName = ref('')
const userMessage = ref('')

const themes = [
  { id: 'blue', name: '河海蓝' },
  { id: 'gold', name: '金色华诞' },
  { id: 'gradient', name: '渐变彩虹' }
]

const mottos = [
  '艰苦朴素 实事求是 严格要求 勇于探索',
  '河清海晏 长歌奋进',
  '百十载风雨 薪传不息'
]

const downloadPoster = () => {
  showInfo('下载功能开发中,敬请期待!')
}
</script>

<style scoped>
.poster-page {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #F8F5EF 0%, #E5E2DC 100%);
}

.poster-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-3xl) var(--spacing-xl);
  padding-top: 100px;
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

.poster-main {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: var(--spacing-3xl);
  align-items: start;
}

/* 海报预览 */
.poster-preview {
  position: sticky;
  top: var(--spacing-xl);
}

.poster-canvas {
  width: 100%;
  aspect-ratio: 3/4;
  margin-bottom: var(--spacing-xl);
  box-shadow: var(--shadow-strong);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.poster-background {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  transition: all 0.5s ease;
}

.poster-background.theme-blue {
  background: linear-gradient(135deg, #0A6AB8 0%, #084B87 100%);
}

.poster-background.theme-gold {
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
}

.poster-background.theme-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
}

.background-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1) 0%, transparent 50%);
}

.poster-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: var(--spacing-3xl);
  color: white;
  text-align: center;
}

.poster-logo {
  font-size: var(--text-2xl);
  font-family: var(--font-title);
  font-weight: 700;
  margin-bottom: var(--spacing-xl);
  letter-spacing: 8px;
}

.poster-year {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.year-number {
  font-size: 6rem;
  font-family: var(--font-title);
  font-weight: 700;
  line-height: 1;
  text-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.year-text {
  font-size: var(--text-xl);
  margin-top: var(--spacing-md);
  letter-spacing: 4px;
}

.poster-date {
  font-size: var(--text-lg);
  margin-bottom: var(--spacing-2xl);
  opacity: 0.9;
  letter-spacing: 2px;
}

.poster-motto {
  font-size: var(--text-base);
  padding: var(--spacing-md) var(--spacing-xl);
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-full);
  margin-bottom: var(--spacing-2xl);
}

.poster-message {
  font-size: var(--text-base);
  line-height: 1.8;
  max-width: 80%;
  margin-bottom: var(--spacing-lg);
  font-style: italic;
}

.poster-author {
  font-size: var(--text-sm);
  opacity: 0.9;
}

.poster-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.decoration-circle {
  position: absolute;
  border: 2px solid rgba(255,255,255,0.2);
  border-radius: var(--radius-full);
  animation: float 20s ease-in-out infinite;
}

.decoration-1 {
  width: 200px;
  height: 200px;
  top: -100px;
  left: -100px;
}

.decoration-2 {
  width: 300px;
  height: 300px;
  bottom: -150px;
  right: -150px;
  animation-delay: -5s;
}

.decoration-3 {
  width: 150px;
  height: 150px;
  top: 50%;
  right: -75px;
  animation-delay: -10s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(10px, 10px) rotate(90deg); }
  50% { transform: translate(0, 20px) rotate(180deg); }
  75% { transform: translate(-10px, 10px) rotate(270deg); }
}

.download-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--gradient-torch);
  color: white;
  border-radius: var(--radius-lg);
  font-size: var(--text-lg);
  font-weight: 600;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-medium);
}

.download-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-strong);
}

.download-btn svg {
  width: 24px;
  height: 24px;
}

/* 控制面板 */
.poster-controls {
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--spacing-2xl);
  box-shadow: var(--shadow-soft);
}

.controls-title {
  font-size: var(--text-xl);
  font-family: var(--font-title);
  font-weight: 700;
  color: var(--color-river-blue);
  margin-bottom: var(--spacing-xl);
}

.control-section {
  margin-bottom: var(--spacing-xl);
}

.control-section label {
  display: block;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-ink-black);
  margin-bottom: var(--spacing-sm);
}

.theme-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
}

.theme-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: var(--color-page-ivory);
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  transition: all var(--transition-base);
}

.theme-btn:hover {
  border-color: var(--color-river-blue);
}

.theme-btn.active {
  border-color: var(--color-river-blue);
  background: rgba(10, 106, 184, 0.1);
}

.theme-preview {
  width: 100%;
  height: 40px;
  border-radius: var(--radius-sm);
}

.theme-preview.theme-blue {
  background: linear-gradient(135deg, #0A6AB8 0%, #084B87 100%);
}

.theme-preview.theme-gold {
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
}

.theme-preview.theme-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
}

.custom-select,
.custom-input,
.custom-textarea {
  width: 100%;
  padding: var(--spacing-md);
  font-family: var(--font-body);
  font-size: var(--text-base);
  border: 2px solid var(--color-page-ivory);
  border-radius: var(--radius-md);
  transition: border-color var(--transition-base);
}

.custom-select:focus,
.custom-input:focus,
.custom-textarea:focus {
  outline: none;
  border-color: var(--color-river-blue);
}

.custom-textarea {
  resize: vertical;
  min-height: 100px;
}

.char-count {
  text-align: right;
  font-size: var(--text-xs);
  color: var(--color-ink-black);
  opacity: 0.6;
  margin-top: var(--spacing-xs);
}

/* 响应式 */
@media (max-width: 1024px) {
  .poster-main {
    grid-template-columns: 1fr;
  }

  .poster-preview {
    position: static;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: var(--text-2xl);
  }

  .theme-options {
    grid-template-columns: 1fr;
  }

  .year-number {
    font-size: 4rem;
  }
}
</style>
