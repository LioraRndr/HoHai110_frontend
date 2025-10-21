<template>
  <div class="mission-spirit">
    <div class="mission-header">
      <p class="mission-intro">「我们继承的,不是答案,而是那份'向水而行'的勇气。」</p>
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
            <div class="stat-label">影响力</div>
            <div class="stat-value">{{ missions[activeMission].impact }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">👥</div>
            <div class="stat-label">参与人数</div>
            <div class="stat-value">{{ missions[activeMission].participants }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">📅</div>
            <div class="stat-label">建设周期</div>
            <div class="stat-value">{{ missions[activeMission].duration }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const activeMission = ref(0)
const scrollTrack = ref(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(true)

const missions = ref([
  {
    title: '三峡工程',
    subtitle: '工地院士的坚守',
    description: '郑守仁先生作为三峡工程设计总负责人,在坝区一间18平方米的宿舍里坚守27年,突破20多项世界之最。三峡工程是当今世界最大的水利枢纽工程,总装机容量2250万千瓦,年发电量近1000亿千瓦时,为长江中下游防洪、发电、航运、水资源利用作出了巨大贡献。',
    quote: '三峡是中华民族的世纪梦想,河海人必须扛起这个担子。——郑守仁',
    impact: '世界级',
    participants: '10万+',
    duration: '17年'
  },
  {
    title: '南水北调',
    subtitle: '让水往高处流的奇迹',
    description: '张建云院士用40年踏遍千山万水,擘画四横三纵国家水网。东线工程从长江下游扬州抽水,利用13级泵站逐级提水,跨越黄河,送水到山东、天津、河北。这一工程解决了北方严重缺水问题,惠及1亿多人口。',
    quote: '青年要眼里有光、脚下有路。——张建云',
    impact: '国家级',
    participants: '50万+',
    duration: '50年规划'
  },
  {
    title: '白鹤滩水电站',
    subtitle: '在地球褶皱里筑坝',
    description: '设计总工程师徐建荣扎根高山峡谷20年,在印度洋与亚欧板块碰撞的断裂带上,筑起窄坝身、大厂房的超级工程。白鹤滩水电站装机容量1600万千瓦,仅次于三峡工程,采用百万千瓦级水轮发电机组,代表了世界水电建设的最高水平。',
    quote: '每一次地质勘测都如履薄冰,但河海人艰苦朴素的校训让我们扎稳了根。——徐建荣',
    impact: '世界级',
    participants: '8万+',
    duration: '10年'
  },
  {
    title: '海上风电',
    subtitle: '御风而行的中国智慧',
    description: '国家卓越工程师林毅峰带领团队研发"八爪鱼"桩基与"海上漂不倒翁"技术,让50层楼高的风机抵御17级台风。中国海上风电装机容量已超过3000万千瓦,居世界第一,为国家"双碳"目标贡献重要力量。',
    quote: '海风无常,但为国奉献的初心不移。——林毅峰',
    impact: '世界第一',
    participants: '5万+',
    duration: '持续建设'
  },
  {
    title: '国际水利',
    subtitle: '以水为媒,惠泽全球',
    description: '从顾兆勋教授1958年获越南友谊勋章,到余钟波教授2021年当选联合国教科文组织国际水文计划首位中国籍主席;从柬埔寨甘再水电站到西非海域监测,河海人将中国标准带向世界,在"一带一路"沿线30多个国家留下深深足迹。',
    quote: '水是世界的语言,合作是人类的未来。——余钟波',
    impact: '国际影响',
    participants: '3万+',
    duration: '60余年'
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
