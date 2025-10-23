<template>
  <div
    class="timeline-node"
    :class="[`theme-${node.theme}`, { 'is-left': position === 'left', 'is-right': position === 'right', 'is-visible': isVisible }]"
    ref="nodeRef"
  >
    <!-- 年份节点 -->
    <div class="year-marker" @mouseenter="handleRipple">
      <div class="ripple-container">
        <div class="ripple" v-for="i in 3" :key="i" :style="{ animationDelay: `${i * 0.15}s` }"></div>
      </div>
      <div class="year-circle">
        <span class="year-text">{{ node.year }}</span>
      </div>
      <div class="year-glow"></div>
    </div>

    <!-- 连接线 -->
    <div class="connector-line"></div>

    <!-- 内容卡片 -->
    <div class="content-card">
      <!-- 标题区 -->
      <div class="card-header">
        <h3 class="node-title">{{ node.title }}</h3>
        <div class="motto-wrapper">
          <div class="quote-mark left">「</div>
          <p class="node-motto" ref="mottoRef">{{ node.motto }}</p>
          <div class="quote-mark right">」</div>
        </div>
      </div>

      <!-- 历史现场 -->
      <div class="scene-section" v-if="node.scene">
        <h4 class="section-title">
          <span class="title-icon">📍</span>
          历史现场
        </h4>
        <div class="scene-content">
          <p class="scene-location" v-if="node.scene.location">
            <strong>{{ node.scene.location }}</strong>
          </p>
          <p class="scene-description">{{ node.scene.description || node.scene.milestone || node.scene.background }}</p>
          <p class="scene-atmosphere" v-if="node.scene.atmosphere">
            <em>{{ node.scene.atmosphere }}</em>
          </p>
        </div>
      </div>

      <!-- 关键人物 -->
      <div class="figures-section" v-if="node.keyFigures && node.keyFigures.length">
        <h4 class="section-title">
          <span class="title-icon">👤</span>
          关键人物
        </h4>
        <div class="figures-grid">
          <div
            class="figure-card"
            v-for="(figure, index) in node.keyFigures"
            :key="index"
          >
            <div class="figure-name">{{ figure.name }}</div>
            <div class="figure-title">{{ figure.title }}</div>
            <p class="figure-contribution">{{ figure.contribution }}</p>
          </div>
        </div>
      </div>

      <!-- 关键时刻 -->
      <div class="moment-section" v-if="node.keyMoment">
        <h4 class="section-title">
          <span class="title-icon">⏰</span>
          关键时刻
        </h4>
        <div class="moment-content">
          <p class="moment-date">{{ node.keyMoment.date }}</p>
          <p class="moment-event">{{ node.keyMoment.event }}</p>
          <blockquote class="moment-speech">{{ node.keyMoment.speech }}</blockquote>
        </div>
      </div>

      <!-- 故事列表 -->
      <div class="stories-section" v-if="node.stories && node.stories.length">
        <h4 class="section-title">
          <span class="title-icon">📖</span>
          那些年的故事
        </h4>
        <ul class="stories-list">
          <li v-for="(story, index) in node.stories" :key="index">{{ story }}</li>
        </ul>
      </div>

      <!-- 瞬间记录 -->
      <div class="moments-section" v-if="node.moments && node.moments.length">
        <h4 class="section-title">
          <span class="title-icon">✨</span>
          难忘瞬间
        </h4>
        <ul class="moments-list">
          <li v-for="(moment, index) in node.moments" :key="index">{{ moment }}</li>
        </ul>
      </div>

      <!-- 数据见证 -->
      <div class="statistics-section" v-if="node.statistics && node.statistics.length">
        <h4 class="section-title">
          <span class="title-icon">📊</span>
          {{ node.year >= 2000 ? '数据见证' : '那一年的数据' }}
        </h4>
        <div class="statistics-grid">
          <div
            class="stat-card"
            v-for="(stat, index) in node.statistics"
            :key="index"
          >
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-detail" v-if="stat.detail">{{ stat.detail }}</div>
          </div>
        </div>
      </div>

      <!-- 历史回声 -->
      <div class="echo-section" v-if="node.echo">
        <h4 class="section-title">
          <span class="title-icon">🔔</span>
          历史回声
        </h4>
        <div class="echo-content">
          <blockquote class="echo-quote">{{ node.echo.content }}</blockquote>
          <p class="echo-impact">{{ node.echo.impact }}</p>
        </div>
      </div>

      <!-- 突破性成果 -->
      <div class="breakthroughs-section" v-if="node.breakthroughs && node.breakthroughs.length">
        <h4 class="section-title">
          <span class="title-icon">🚀</span>
          突破性成果
        </h4>
        <div class="breakthroughs-list">
          <div
            class="breakthrough-item"
            v-for="(item, index) in node.breakthroughs"
            :key="index"
          >
            <h5>{{ item.title }}</h5>
            <p v-if="item.leader">负责人:{{ item.leader }}</p>
            <p v-if="item.lab">研发单位:{{ item.lab }}</p>
            <p v-if="item.significance" class="significance">{{ item.significance }}</p>
            <p v-if="item.impact" class="significance">{{ item.impact }}</p>
            <p v-if="item.achievement" class="significance">{{ item.achievement }}</p>
          </div>
        </div>
      </div>

      <!-- 记忆片段 -->
      <div class="memory-section" v-if="node.memory">
        <div class="memory-quote">
          <span class="quote-icon">"</span>
          <p>{{ node.memory.quote }}</p>
          <p class="memory-reflection">{{ node.memory.reflection }}</p>
        </div>
      </div>

      <!-- 传承故事 -->
      <div class="legacy-section" v-if="node.legacy">
        <h4 class="section-title">
          <span class="title-icon">🏅</span>
          {{ node.legacy.title }}
        </h4>
        <ul class="legacy-list">
          <li v-for="(item, index) in node.legacy.achievements" :key="index">{{ item }}</li>
        </ul>
        <blockquote class="legacy-testimonial" v-if="node.legacy.testimonial">
          {{ node.legacy.testimonial }}
        </blockquote>
      </div>

      <!-- 庆典活动 -->
      <div class="ceremony-section" v-if="node.ceremony">
        <h4 class="section-title">
          <span class="title-icon">🎊</span>
          庆典现场
        </h4>
        <div class="ceremony-content">
          <p class="ceremony-date">{{ node.ceremony.date }}</p>
          <p class="ceremony-speaker"><strong>{{ node.ceremony.speaker }}</strong></p>
          <blockquote class="ceremony-speech">{{ node.ceremony.speech }}</blockquote>
        </div>
      </div>

      <!-- 参与者 -->
      <div class="attendees-section" v-if="node.attendees && node.attendees.length">
        <h4 class="section-title">那些在场的人</h4>
        <div class="attendees-list">
          <div class="attendee-item" v-for="(person, index) in node.attendees" :key="index">
            <strong>{{ person.name }}</strong>
            <span v-if="person.detail">{{ person.detail }}</span>
            <span v-if="person.action">{{ person.action }}</span>
            <span v-if="person.moment">{{ person.moment }}</span>
          </div>
        </div>
      </div>

      <!-- 象征意义 -->
      <div class="symbolism-section" v-if="node.symbolism">
        <div class="symbolism-content">
          <p>{{ node.symbolism }}</p>
        </div>
      </div>

      <!-- 国际化成果 -->
      <div class="international-section" v-if="node.international && node.international.length">
        <h4 class="section-title">
          <span class="title-icon">🌏</span>
          国际化成果
        </h4>
        <ul class="international-list">
          <li v-for="(item, index) in node.international" :key="index">{{ item }}</li>
        </ul>
      </div>

      <!-- 真实故事 -->
      <div class="story-section" v-if="node.story">
        <div class="story-card">
          <div class="story-narrator">{{ node.story.narrator }} · {{ node.story.occasion }}</div>
          <blockquote class="story-words">{{ node.story.words }}</blockquote>
        </div>
      </div>

      <!-- 现场连线 -->
      <div class="connections-section" v-if="node.liveConnections && node.liveConnections.length">
        <h4 class="section-title">
          <span class="title-icon">📡</span>
          现场连线
        </h4>
        <div class="connections-grid">
          <div
            class="connection-card"
            v-for="(conn, index) in node.liveConnections"
            :key="index"
          >
            <div class="connection-location">{{ conn.location }}</div>
            <div class="connection-person">{{ conn.person }}</div>
          </div>
        </div>
      </div>

      <!-- 致敬语 -->
      <div class="tribute-section" v-if="node.tribute">
        <div class="tribute-text">{{ node.tribute }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps({
  node: {
    type: Object,
    required: true
  },
  position: {
    type: String,
    default: 'right', // 'left' or 'right'
    validator: (value) => ['left', 'right'].includes(value)
  }
})

const nodeRef = ref(null)
const mottoRef = ref(null)
const isVisible = ref(false)

// 使用 Intersection Observer 监听节点进入视口
onMounted(() => {
  useIntersectionObserver(
    nodeRef,
    ([{ isIntersecting }]) => {
      if (isIntersecting && !isVisible.value) {
        isVisible.value = true

        // 触发格言打字机效果
        if (mottoRef.value) {
          triggerTypingEffect()
        }
      }
    },
    { threshold: 0.3 }
  )
})

// 水波纹效果
const handleRipple = (e) => {
  const marker = e.currentTarget
  marker.classList.add('rippling')
  setTimeout(() => {
    marker.classList.remove('rippling')
  }, 2000)
}

// 打字机效果
const triggerTypingEffect = () => {
  const element = mottoRef.value
  if (!element) return

  element.classList.add('typing-active')
}
</script>

<style scoped>
.timeline-node {
  position: relative;
  display: flex;
  align-items: flex-start;
  margin-bottom: 120px;
  opacity: 0;
  transform: translateY(60px);
  transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.timeline-node.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* 左右布局 - PC端单列布局，卡片占3/4视口宽度，左右交替 */
.timeline-node.is-left {
  justify-content: flex-start;
  padding-left: 0;
}

.timeline-node.is-left .year-marker {
  order: 2;
  margin-left: 40px;
}

.timeline-node.is-left .content-card {
  order: 1;
  width: 75vw;
  max-width: 75vw;
}

.timeline-node.is-right {
  justify-content: flex-end;
  padding-right: 0;
}

.timeline-node.is-right .year-marker {
  order: 1;
  margin-right: 40px;
}

.timeline-node.is-right .content-card {
  order: 2;
  width: 75vw;
  max-width: 75vw;
}

/* 年份标记 */
.year-marker {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  z-index: 2;
  cursor: pointer;
}

.year-circle {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-river-blue), var(--color-torch-gold));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 30px rgba(0, 82, 156, 0.3);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 2;
}

.year-marker:hover .year-circle {
  transform: scale(1.1);
  box-shadow: 0 12px 40px rgba(0, 82, 156, 0.5);
}

.year-text {
  font-size: 1.5rem;
  font-family: var(--font-title);
  font-weight: 700;
  color: white;
  letter-spacing: 1px;
}

/* 发光效果 */
.year-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 82, 156, 0.3) 0%, transparent 70%);
  animation: pulse 3s ease-in-out infinite;
  pointer-events: none;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.3;
  }
}

/* 水波纹效果 */
.ripple-container {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.year-marker.rippling .ripple {
  animation: ripple-expand 2s ease-out;
}

.ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  border: 3px solid var(--color-river-blue);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
}

@keyframes ripple-expand {
  0% {
    width: 80px;
    height: 80px;
    opacity: 1;
  }
  100% {
    width: 200px;
    height: 200px;
    opacity: 0;
  }
}

/* 连接线 - 固定在视口中央 */
.connector-line {
  position: fixed;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(
    to bottom,
    var(--color-river-blue) 0%,
    rgba(0, 82, 156, 0.5) 50%,
    rgba(0, 82, 156, 0.2) 100%
  );
  transform: translateX(-50%);
  z-index: 0;
  pointer-events: none;
}

/* 只在第一个节点显示连接线 */
.timeline-node:not(:first-child) .connector-line {
  display: none;
}

/* 内容卡片 */
.content-card {
  background: white;
  padding: 48px;
  border-radius: 24px;
  box-shadow: 0 10px 60px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  transition: all 0.5s ease;
}

.is-visible .content-card {
  animation: card-float 0.8s ease-out;
}

@keyframes card-float {
  0% {
    transform: translateY(40px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.content-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, var(--color-river-blue), var(--color-torch-gold));
  opacity: 0.8;
}

/* 主题色调 */
.theme-founding .content-card::before {
  background: linear-gradient(90deg, #8B4513, #D4A574);
}

.theme-revolution .content-card::before {
  background: linear-gradient(90deg, #DC143C, #FF6347);
}

.theme-science .content-card::before {
  background: linear-gradient(90deg, #4169E1, #87CEEB);
}

.theme-spring .content-card::before {
  background: linear-gradient(90deg, #32CD32, #90EE90);
}

.theme-heritage .content-card::before {
  background: linear-gradient(90deg, #FFD700, #FFA500);
}

.theme-convergence .content-card::before {
  background: linear-gradient(90deg, #00CED1, #20B2AA);
}

.theme-global .content-card::before {
  background: linear-gradient(90deg, #9370DB, #BA55D3);
}

.theme-prosperity .content-card::before {
  background: linear-gradient(90deg, #FF1493, #FF69B4);
}

/* 卡片头部 */
.card-header {
  margin-bottom: 36px;
  text-align: center;
  border-bottom: 2px solid var(--color-page-ivory);
  padding-bottom: 24px;
}

.node-title {
  font-size: 2.5rem;
  font-family: var(--font-title);
  font-weight: 700;
  color: var(--color-river-blue);
  margin-bottom: 20px;
  letter-spacing: 2px;
}

.motto-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 0 40px;
}

.quote-mark {
  font-size: 3rem;
  font-family: serif;
  color: var(--color-torch-gold);
  line-height: 1;
  opacity: 0.6;
}

.node-motto {
  font-size: 1.5rem;
  font-family: var(--font-title);
  font-weight: 600;
  color: var(--color-ink-black);
  line-height: 1.6;
  position: relative;
  letter-spacing: 1px;
}

/* 打字机效果 */
.node-motto.typing-active {
  overflow: hidden;
  border-right: 3px solid var(--color-torch-gold);
  white-space: nowrap;
  animation: typing 2s steps(30) forwards, blink 0.75s step-end infinite;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
    border-right: none;
  }
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}

/* 各个章节样式 */
.scene-section,
.figures-section,
.moment-section,
.stories-section,
.moments-section,
.statistics-section,
.echo-section,
.breakthroughs-section,
.memory-section,
.legacy-section,
.ceremony-section,
.attendees-section,
.symbolism-section,
.international-section,
.story-section,
.connections-section,
.tribute-section {
  margin-top: 32px;
}

.section-title {
  font-size: 1.3rem;
  font-family: var(--font-title);
  font-weight: 600;
  color: var(--color-river-blue);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-icon {
  font-size: 1.5rem;
}

/* 历史现场 */
.scene-content {
  background: linear-gradient(135deg, #F8F5EF 0%, #FFF8F0 100%);
  padding: 24px;
  border-radius: 16px;
  border-left: 4px solid var(--color-torch-gold);
}

.scene-location {
  font-size: 1.1rem;
  color: var(--color-river-blue);
  margin-bottom: 12px;
}

.scene-description {
  font-size: 1.05rem;
  line-height: 2;
  color: var(--color-ink-black);
  margin-bottom: 12px;
  text-indent: 2em;
}

.scene-atmosphere {
  font-size: 1rem;
  color: var(--color-torch-gold);
  text-align: center;
  margin-top: 16px;
  font-style: italic;
}

/* 关键人物 */
.figures-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.figure-card {
  background: linear-gradient(135deg, #FFF 0%, #F8F5EF 100%);
  padding: 20px;
  border-radius: 12px;
  border: 2px solid var(--color-page-ivory);
  transition: all 0.3s ease;
}

.figure-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 82, 156, 0.15);
  border-color: var(--color-river-blue);
}

.figure-name {
  font-size: 1.2rem;
  font-family: var(--font-title);
  font-weight: 700;
  color: var(--color-river-blue);
  margin-bottom: 6px;
}

.figure-title {
  font-size: 0.95rem;
  color: var(--color-torch-gold);
  margin-bottom: 12px;
  font-weight: 500;
}

.figure-contribution {
  font-size: 0.95rem;
  line-height: 1.8;
  color: var(--color-ink-black);
  opacity: 0.85;
}

/* 数据统计 */
.statistics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
}

.stat-card {
  background: linear-gradient(135deg, var(--color-river-blue), #0066AA);
  padding: 24px 16px;
  border-radius: 12px;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.stat-card:hover::before {
  opacity: 1;
}

.stat-card:hover {
  transform: translateY(-6px) scale(1.05);
  box-shadow: 0 12px 30px rgba(0, 82, 156, 0.4);
}

.stat-value {
  font-size: 2rem;
  font-family: var(--font-title);
  font-weight: 700;
  margin-bottom: 8px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.stat-label {
  font-size: 0.95rem;
  margin-bottom: 6px;
  opacity: 0.95;
  font-weight: 500;
}

.stat-detail {
  font-size: 0.85rem;
  opacity: 0.8;
  font-weight: 300;
}

/* 引用文字 */
blockquote {
  position: relative;
  padding: 20px 24px;
  margin: 16px 0;
  background: linear-gradient(135deg, #F0F8FF 0%, #E6F3FF 100%);
  border-left: 5px solid var(--color-river-blue);
  border-radius: 8px;
  font-size: 1.05rem;
  line-height: 1.9;
  color: var(--color-ink-black);
  font-style: italic;
}

blockquote::before {
  content: '"';
  position: absolute;
  top: -10px;
  left: 10px;
  font-size: 4rem;
  color: var(--color-river-blue);
  opacity: 0.15;
  font-family: serif;
}

/* 列表样式 */
.stories-list,
.moments-list,
.legacy-list,
.international-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.stories-list li,
.moments-list li,
.legacy-list li,
.international-list li {
  position: relative;
  padding-left: 32px;
  margin-bottom: 14px;
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--color-ink-black);
}

.stories-list li::before,
.moments-list li::before,
.legacy-list li::before,
.international-list li::before {
  content: '•';
  position: absolute;
  left: 12px;
  color: var(--color-torch-gold);
  font-size: 1.5rem;
  line-height: 1.5;
}

/* 突破性成果 */
.breakthroughs-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.breakthrough-item {
  background: linear-gradient(135deg, #FFF 0%, #F0F8FF 100%);
  padding: 20px;
  border-radius: 12px;
  border: 2px solid var(--color-river-blue);
  border-left-width: 6px;
}

.breakthrough-item h5 {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-river-blue);
  margin-bottom: 10px;
}

.breakthrough-item p {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--color-ink-black);
  margin-bottom: 6px;
}

.significance {
  color: var(--color-torch-gold);
  font-style: italic;
}

/* 记忆片段 */
.memory-quote {
  position: relative;
  background: linear-gradient(135deg, #FFFACD 0%, #FFF8DC 100%);
  padding: 24px 32px;
  border-radius: 12px;
  border: 2px dashed var(--color-torch-gold);
}

.quote-icon {
  position: absolute;
  top: -10px;
  left: 20px;
  font-size: 4rem;
  color: var(--color-torch-gold);
  opacity: 0.3;
}

.memory-quote p {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--color-ink-black);
  margin-bottom: 12px;
  position: relative;
  z-index: 1;
}

.memory-reflection {
  font-weight: 600;
  color: var(--color-river-blue);
}

/* 庆典活动 */
.ceremony-content {
  background: linear-gradient(135deg, #FFF 0%, #FFF5E6 100%);
  padding: 24px;
  border-radius: 16px;
  border: 3px solid var(--color-torch-gold);
}

.ceremony-date,
.ceremony-speaker {
  font-size: 1.05rem;
  margin-bottom: 12px;
  color: var(--color-ink-black);
}

.ceremony-speech {
  background: linear-gradient(135deg, #F0F8FF 0%, #E6F3FF 100%);
  border-left-color: var(--color-torch-gold);
}

/* 参与者 */
.attendees-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.attendee-item {
  background: linear-gradient(135deg, #FFF 0%, #F8F5EF 100%);
  padding: 16px 20px;
  border-radius: 10px;
  border-left: 4px solid var(--color-river-blue);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.attendee-item strong {
  font-size: 1.1rem;
  color: var(--color-river-blue);
}

.attendee-item span {
  font-size: 0.95rem;
  color: var(--color-ink-black);
  opacity: 0.85;
}

/* 象征意义 */
.symbolism-content {
  background: linear-gradient(135deg, #FFF9E6 0%, #FFEED9 100%);
  padding: 24px;
  border-radius: 12px;
  border: 2px solid var(--color-torch-gold);
  text-align: center;
}

.symbolism-content p {
  font-size: 1.1rem;
  line-height: 2;
  color: var(--color-ink-black);
  font-weight: 500;
}

/* 故事卡片 */
.story-card {
  background: linear-gradient(135deg, #E6F7FF 0%, #D9F0FF 100%);
  padding: 24px;
  border-radius: 12px;
  border-left: 5px solid var(--color-river-blue);
}

.story-narrator {
  font-size: 0.95rem;
  color: var(--color-river-blue);
  font-weight: 600;
  margin-bottom: 12px;
}

.story-words {
  background: white;
  border-left-color: var(--color-torch-gold);
}

/* 现场连线 */
.connections-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.connection-card {
  background: linear-gradient(135deg, #F0F8FF 0%, #E0EFFF 100%);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  border: 2px solid var(--color-river-blue);
  transition: all 0.3s ease;
}

.connection-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 82, 156, 0.2);
}

.connection-location {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-river-blue);
  margin-bottom: 8px;
}

.connection-person {
  font-size: 0.9rem;
  color: var(--color-ink-black);
  opacity: 0.8;
}

/* 致敬语 */
.tribute-text {
  background: linear-gradient(135deg, #FFE5E5 0%, #FFD9D9 100%);
  padding: 24px 32px;
  border-radius: 16px;
  border: 3px solid #DC143C;
  font-size: 1.15rem;
  line-height: 2;
  color: var(--color-ink-black);
  text-align: center;
  font-weight: 600;
  font-family: var(--font-title);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .timeline-node {
    gap: 24px;
    margin-bottom: 80px;
  }

  /* 平板设备仍然使用左右交替布局，但缩小卡片宽度 */
  .timeline-node.is-left .content-card,
  .timeline-node.is-right .content-card {
    width: 70vw;
    max-width: 70vw;
  }

  .timeline-node.is-left .year-marker {
    margin-left: 30px;
  }

  .timeline-node.is-right .year-marker {
    margin-right: 30px;
  }

  .year-circle {
    width: 60px;
    height: 60px;
  }

  .year-text {
    font-size: 1.2rem;
  }

  .content-card {
    padding: 32px 24px;
  }

  .node-title {
    font-size: 2rem;
  }

  .node-motto {
    font-size: 1.2rem;
  }

  .figures-grid,
  .statistics-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  /* 移动端改为垂直单列布局 */
  .timeline-node {
    flex-direction: row;
    gap: 16px;
    margin-bottom: 60px;
    justify-content: flex-start !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .timeline-node.is-left .content-card,
  .timeline-node.is-right .content-card {
    order: 2;
    width: calc(100vw - 80px);
    max-width: calc(100vw - 80px);
  }

  .timeline-node.is-left .year-marker,
  .timeline-node.is-right .year-marker {
    order: 1;
    margin-left: 0;
    margin-right: 0;
  }

  .connector-line {
    position: absolute;
    left: 25px;
    right: auto;
    top: 50px;
    bottom: -60px;
    transform: none;
  }

  .timeline-node:last-child .connector-line {
    display: none;
  }

  .timeline-node:not(:first-child) .connector-line {
    display: block;
  }

  .year-circle {
    width: 50px;
    height: 50px;
  }

  .year-text {
    font-size: 1rem;
  }

  .content-card {
    padding: 24px 16px;
    border-radius: 16px;
  }

  .node-title {
    font-size: 1.6rem;
  }

  .motto-wrapper {
    padding: 0 10px;
    gap: 8px;
    flex-wrap: wrap;
  }

  .quote-mark {
    font-size: 2rem;
  }

  .node-motto {
    font-size: 1rem;
    white-space: normal !important;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  /* 移动端禁用打字机效果 */
  .node-motto.typing-active {
    animation: none;
    border-right: none;
  }

  .section-title {
    font-size: 1.1rem;
  }

  .connections-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .content-card {
    padding: 20px 12px;
  }

  .node-title {
    font-size: 1.4rem;
    letter-spacing: 1px;
  }

  .motto-wrapper {
    padding: 0 5px;
    gap: 6px;
  }

  .quote-mark {
    font-size: 1.5rem;
  }

  .node-motto {
    font-size: 0.9rem;
    line-height: 1.8;
  }

  .section-title {
    font-size: 1rem;
  }

  .scene-content,
  .ceremony-content,
  .story-card {
    padding: 16px;
  }
}
</style>
