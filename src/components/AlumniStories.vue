<template>
  <div class="alumni-stories">
    <div class="stories-header">
      <p class="stories-intro">「我们书写的故事,因你们而开始,因我们而延续。」</p>
    </div>

    <div class="stories-carousel">
      <div class="carousel-track" ref="carouselTrack">
        <div
          v-for="(alumni, index) in alumniList"
          :key="index"
          class="story-card"
          :class="{ active: activeStory === index }"
          @click="setActiveStory(index)"
        >
          <div class="card-front">
            <div class="alumni-portrait">
              <div class="portrait-ring"></div>
              <div class="portrait-content">
                <img :src="alumni.avatar" :alt="alumni.name" class="alumni-avatar" />
              </div>
            </div>
            <h3 class="alumni-name">{{ alumni.name }}</h3>
            <p class="alumni-title">{{ alumni.title }}</p>
            <div class="story-preview">{{ alumni.preview }}</div>
          </div>

          <div class="card-back" v-if="activeStory === index">
            <div class="story-content">
              <p class="story-description">{{ alumni.story }}</p>
              <blockquote class="story-quote">{{ alumni.quote }}</blockquote>
              <div class="achievements">
                <div
                  v-for="(achievement, idx) in alumni.achievements"
                  :key="idx"
                  class="achievement-tag"
                >
                  {{ achievement }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 导航按钮 -->
      <button class="carousel-btn prev" @click="prevStory">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M15 18l-6-6 6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button class="carousel-btn next" @click="nextStory">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 18l6-6-6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <!-- 指示器 -->
      <div class="carousel-indicators">
        <button
          v-for="(_, index) in alumniList"
          :key="index"
          class="indicator"
          :class="{ active: activeStory === index }"
          @click="setActiveStory(index)"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeStory = ref(0)
const carouselTrack = ref(null)

const alumniList = ref([
  {
    name: '严恺',
    title: '双院士,海岸工程奠基人',
    avatar: 'https://img.assets.five-plus-one.com/2025/10/5531fab5c2b32e493bc3a88f5d20c7e2.jpg',
    preview: '1938年,他放弃荷兰优越条件,携一箱书稿归国...',
    story: '1938年,他放弃荷兰优越条件,携一箱书稿归国。晚年仍坚持赴长江口勘测,留下"江河是流动的文明,治理是永续的使命"的箴言。',
    quote: '江河是流动的文明,治理是永续的使命。',
    achievements: ['中国科学院院士', '中国工程院院士', '海岸工程奠基人']
  },
  {
    name: '郑守仁',
    title: '三峡工程设计总工程师',
    avatar: 'https://img.assets.five-plus-one.com/2025/10/5f3f38abeb7670dcfb501ac23946431d.png',
    preview: '27年驻守工地,用计算尺和手绘图破解世界级难题...',
    story: '27年驻守工地,用计算尺和手绘图破解世界级难题。获国际大坝委员会终身成就奖时,他说:"荣誉属于所有把青春献给三峡的河海人。"',
    quote: '荣誉属于所有把青春献给三峡的河海人。',
    achievements: ['中国工程院院士', '三峡工程总工', '最美奋斗者']
  },
  {
    name: '张建云',
    title: '南水北调战略科学家',
    avatar: 'https://img.assets.five-plus-one.com/2025/10/bbbe9904a03f6443ef84ac4924c4d4aa.jpg',
    preview: '从沂蒙山区走到国际水论坛,他始终铭记导师嘱托...',
    story: '从沂蒙山区走到国际水论坛,他始终铭记导师嘱托:"治水者,当以苍生为念。"其团队研发的洪水预报系统,已在湄公河流域拯救无数生命。',
    quote: '治水者,当以苍生为念。',
    achievements: ['中国工程院院士', '国家水网总设计师', '国际水协会会士']
  },
  {
    name: '徐建荣',
    title: '白鹤滩水电站设计总工程师',
    avatar: 'https://img.assets.five-plus-one.com/2025/10/93376b4a1f02d3f7f8f698f69d6d830f.png',
    preview: '面对"地球褶皱"的挑战,他引用校训"勇于探索"...',
    story: '面对"地球褶皱"的挑战,他引用校训"勇于探索"激励团队:"没有先例,我们就创造先例。"在印度洋与亚欧板块碰撞的断裂带上,筑起超级工程。',
    quote: '没有先例,我们就创造先例。',
    achievements: ['国家卓越工程师', '白鹤滩总工', '特等奖获得者']
  },
  {
    name: '缪薇',
    title: '2015届校友,基层治水代表',
    avatar: 'https://img.assets.five-plus-one.com/2025/10/7fb4f12f1e437106bec997863c4692d3.png',
    preview: '在2025年青春华章活动中,她坦言...',
    story: '在2025年青春华章活动中,她坦言:"母校教我\'水润万物\'的谦逊,也给我\'水击三千里\'的勇气。"扎根基层十年,带领乡村完成数十个水利项目。',
    quote: '母校教我"水润万物"的谦逊,也给我"水击三千里"的勇气。',
    achievements: ['全国劳动模范', '基层治水标兵', '优秀校友']
  }
])

const setActiveStory = (index) => {
  activeStory.value = index
  scrollToActiveCard()
}

const prevStory = () => {
  if (activeStory.value > 0) {
    activeStory.value--
  } else {
    activeStory.value = alumniList.value.length - 1
  }
  scrollToActiveCard()
}

const nextStory = () => {
  if (activeStory.value < alumniList.value.length - 1) {
    activeStory.value++
  } else {
    activeStory.value = 0
  }
  scrollToActiveCard()
}

const scrollToActiveCard = () => {
  if (!carouselTrack.value) return

  const cards = carouselTrack.value.children
  if (cards.length === 0 || activeStory.value >= cards.length) return

  const activeCard = cards[activeStory.value]
  const trackWidth = carouselTrack.value.offsetWidth
  const cardLeft = activeCard.offsetLeft
  const cardWidth = activeCard.offsetWidth

  // 计算滚动位置,使卡片居中显示
  const scrollPosition = cardLeft - (trackWidth / 2) + (cardWidth / 2)

  carouselTrack.value.scrollTo({
    left: scrollPosition,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
.alumni-stories {
  width: 100%;
  padding: var(--spacing-3xl) 0;
  background: var(--color-page-ivory);
}

.stories-header {
  text-align: center;
  margin-bottom: var(--spacing-3xl);
  padding: 0 var(--spacing-lg);
}

.stories-intro {
  font-size: var(--text-2xl);
  font-family: var(--font-title);
  color: var(--color-river-blue);
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto;
}

/* 轮播容器 */
.stories-carousel {
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--spacing-3xl);
  overflow: hidden;
}

.carousel-track {
  display: flex;
  gap: var(--spacing-xl);
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: var(--spacing-lg) 0;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.carousel-track::-webkit-scrollbar {
  display: none;
}

/* 故事卡片 */
.story-card {
  flex: 0 0 320px;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  /* 防止内容抖动 */
  will-change: transform, flex-basis;
}

.story-card:hover:not(.active) {
  transform: translateY(-8px) scale(1.02);
  box-shadow: var(--shadow-medium);
}

.story-card.active {
  flex: 0 0 420px;
  box-shadow: 0 12px 40px rgba(10, 106, 184, 0.25);
  /* 展开时不移动 */
  transform: translateY(0);
}

/* 使用伪元素添加渐变边框效果 */
.story-card.active::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: var(--radius-lg);
  padding: 3px;
  background: var(--gradient-river);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.card-front,
.card-back {
  padding: var(--spacing-xl);
  /* 防止布局抖动 */
  box-sizing: border-box;
}

.card-front {
  /* 保持正面内容稳定 */
  display: flex;
  flex-direction: column;
  min-height: 380px;
}

/* 校友头像 */
.alumni-portrait {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto var(--spacing-sm);
}

.portrait-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: var(--radius-full);
  border: 3px solid transparent;
  background: linear-gradient(white, white) padding-box,
              var(--gradient-river) border-box;
  /* 优化动画性能 */
  will-change: transform;
  animation: rotateRing 10s linear infinite;
}

@keyframes rotateRing {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.portrait-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border-radius: var(--radius-full);
  background: var(--gradient-river);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.alumni-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-full);
}

.alumni-initial {
  font-size: var(--text-4xl);
  font-family: var(--font-title);
  font-weight: 700;
  color: white;
}

/* 校友信息 */
.alumni-name {
  font-size: var(--text-2xl);
  font-family: var(--font-title);
  color: var(--color-ink-black);
  text-align: center;
  margin-bottom: var(--spacing-xs);
}

.alumni-title {
  font-size: var(--text-base);
  color: var(--color-torch-amber);
  text-align: center;
  margin-bottom: var(--spacing-sm);
  font-weight: 600;
}

.story-preview {
  font-size: var(--text-base);
  color: var(--color-ink-black);
  line-height: 1.8;
  text-align: center;
  opacity: 0.8;
}

/* 详细故事 */
.card-back {
  animation: fadeInContent 0.5s ease-out;
  /* 防止布局跳动 */
  opacity: 1;
  padding-top: var(--spacing-md);
  border-top: 2px solid rgba(10, 106, 184, 0.1);
  margin-top: var(--spacing-md);
}

@keyframes fadeInContent {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.story-content {
  margin-top: var(--spacing-sm);
}

.story-description {
  font-size: var(--text-base);
  color: var(--color-ink-black);
  line-height: 1.8;
  margin-bottom: var(--spacing-lg);
}

.story-quote {
  font-size: var(--text-base);
  font-family: var(--font-title);
  font-style: italic;
  color: var(--color-river-blue);
  padding: var(--spacing-md) var(--spacing-lg);
  border-left: 4px solid var(--color-torch-amber);
  background: rgba(10, 106, 184, 0.05);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  margin: var(--spacing-lg) 0;
}

.achievements {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-lg);
}

.achievement-tag {
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: var(--text-sm);
  color: var(--color-river-blue);
  background: rgba(10, 106, 184, 0.1);
  border-radius: var(--radius-full);
  border: 1px solid var(--color-river-blue);
}

/* 导航按钮 */
.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  background: white;
  box-shadow: var(--shadow-medium);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, background 0.2s ease;
  z-index: 2;
  /* 优化动画性能 */
  will-change: transform;
}

.carousel-btn:hover {
  background: var(--gradient-river);
  transform: translateY(-50%) scale(1.1);
}

.carousel-btn:hover svg {
  stroke: white;
  transition: stroke 0.2s ease;
}

.carousel-btn.prev {
  left: 0;
}

.carousel-btn.next {
  right: 0;
}

.carousel-btn svg {
  width: 24px;
  height: 24px;
  stroke: var(--color-river-blue);
}

/* 指示器 */
.carousel-indicators {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: center;
  margin-top: var(--spacing-2xl);
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: var(--radius-full);
  background: rgba(10, 106, 184, 0.3);
  transition: all var(--transition-base);
}

.indicator.active {
  width: 32px;
  background: var(--gradient-river);
}

/* 响应式 */
@media (max-width: 768px) {
  .stories-carousel {
    padding: 0 var(--spacing-lg);
  }

  .story-card,
  .story-card.active {
    flex: 0 0 300px;
    min-height: 450px;
  }

  .stories-intro {
    font-size: var(--text-lg);
  }

  .carousel-btn {
    width: 40px;
    height: 40px;
  }

  .carousel-btn svg {
    width: 20px;
    height: 20px;
  }
}
</style>
