<template>
  <div class="history-timeline">
    <div class="timeline-header">
      <p class="timeline-intro">「每一次点击,都是一次回望;每一次回望,都是为了更好地前往。」</p>
    </div>

    <div class="timeline-container">
      <div class="timeline-line"></div>

      <div
        v-for="(event, index) in timelineEvents"
        :key="event.year"
        class="timeline-event"
        :class="{ active: activeEvent === index }"
        @click="setActiveEvent(index)"
      >
        <div class="event-marker">
          <div class="marker-dot"></div>
          <div class="marker-pulse"></div>
        </div>

        <div class="event-content">
          <div class="event-year">{{ event.year }}</div>
          <div class="event-title">{{ event.title }}</div>
          <transition name="expand">
            <div class="event-description" v-if="activeEvent === index">
              <p>{{ event.description }}</p>
              <p class="event-detail" v-if="event.detail">{{ event.detail }}</p>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const activeEvent = ref(null)

const timelineEvents = ref([
  {
    year: '1915',
    title: '「治水兴邦,此吾辈之责!」',
    description: '张謇、黄炎培等先贤以教育救国为宏愿,在民族危难中播下中国水利高等教育的火种。',
    detail: '首任校长许肇南带领首批学子,在陋室青灯下研读《水工结构》,其手绘的《河道整治图》至今珍藏于校史馆。'
  },
  {
    year: '1952',
    title: '「河海一滴水,报国一生情!」',
    description: '华东水利学院时期,严恺院士自荷兰学成归国,投身百废待兴的水利建设。',
    detail: '他主持天津塘沽新港回淤研究,参与长江口整治,并带领师生奔赴淮河治理一线,佛子岭水库、梅山水库的蓝图上浸透了河海人的汗水。'
  },
  {
    year: '1985',
    title: '「恢复"河海"校名,承前启后,继往开来!」',
    description: '学校正式恢复"河海大学"校名,学科体系不断完善。',
    detail: '同年,钱正英部长在校庆大会上发表《祖国在召唤你们》讲话,指出"在遍布我国江河湖海的水利建设中,到处都可以看到河海所培育的人才"。'
  },
  {
    year: '2025',
    title: '「前辈,这盛世水利,如您所愿。」',
    description: '从三峡工程到南水北调,从白鹤滩水电站到黄河古贤水利枢纽,新一代河海人活跃在大国工程一线。',
    detail: '2025年"把青春华章写在祖国大地上"活动中,校长郑金海与师生齐诵"我饮河海一滴水,我献祖国一生情",接力先辈誓言。'
  }
])

const setActiveEvent = (index) => {
  if (activeEvent.value === index) {
    activeEvent.value = null
  } else {
    activeEvent.value = index
  }
}
</script>

<style scoped>
.history-timeline {
  width: 100%;
  padding: var(--spacing-3xl) 0;
}

.timeline-header {
  text-align: center;
  margin-bottom: var(--spacing-3xl);
}

.timeline-intro {
  font-size: var(--text-2xl);
  font-family: var(--font-title);
  color: var(--color-river-blue);
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto;
}

.timeline-container {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

/* 时间线中线 */
.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    var(--color-river-blue) 10%,
    var(--color-river-blue) 90%,
    transparent 100%
  );
  transform: translateX(-50%);
  z-index: 1;
}

/* 时间线事件 */
.timeline-event {
  position: relative;
  display: flex;
  align-items: flex-start;
  margin-bottom: var(--spacing-3xl);
  cursor: pointer;
  transition: all var(--transition-base);
}

.timeline-event:nth-child(odd) {
  flex-direction: row-reverse;
}

.timeline-event:nth-child(odd) .event-content {
  text-align: right;
  padding-right: var(--spacing-3xl);
}

.timeline-event:nth-child(even) .event-content {
  text-align: left;
  padding-left: var(--spacing-3xl);
}

/* 事件标记点 */
.event-marker {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  z-index: 2;
  width: 20px;
  height: 20px;
}

.marker-dot {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: var(--radius-full);
  background: var(--gradient-river);
  border: 3px solid white;
  box-shadow: var(--shadow-medium);
  transition: all var(--transition-base);
}

.marker-pulse {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: var(--radius-full);
  background: var(--color-river-blue);
  opacity: 0;
  transition: all var(--transition-base);
}

.timeline-event:hover .marker-dot,
.timeline-event.active .marker-dot {
  transform: scale(1.5);
  background: var(--gradient-torch);
}

.timeline-event:hover .marker-pulse,
.timeline-event.active .marker-pulse {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
}

/* 事件内容 */
.event-content {
  flex: 1;
  max-width: 45%;
  background: white;
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
  transition: all var(--transition-base);
}

.timeline-event:hover .event-content {
  transform: translateY(-4px);
  box-shadow: var(--shadow-medium);
}

.event-year {
  font-size: var(--text-3xl);
  font-family: var(--font-title);
  font-weight: 700;
  color: var(--color-torch-amber);
  margin-bottom: var(--spacing-sm);
}

.event-title {
  font-size: var(--text-xl);
  font-family: var(--font-title);
  color: var(--color-river-blue);
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
}

.event-description {
  font-size: var(--text-base);
  color: var(--color-ink-black);
  line-height: 1.8;
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid rgba(10, 106, 184, 0.2);
  overflow: hidden;
}

/* 展开/收起动画 */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.4s ease;
}

.expand-enter-from {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  margin-top: 0;
}

.expand-enter-to {
  max-height: 500px;
  opacity: 1;
  padding-top: var(--spacing-md);
  margin-top: var(--spacing-md);
}

.expand-leave-from {
  max-height: 500px;
  opacity: 1;
  padding-top: var(--spacing-md);
  margin-top: var(--spacing-md);
}

.expand-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  margin-top: 0;
}

.event-detail {
  margin-top: var(--spacing-md);
  font-size: var(--text-sm);
  color: rgba(14, 14, 16, 0.7);
  line-height: 1.8;
  padding-left: var(--spacing-md);
  border-left: 2px solid var(--color-torch-amber);
}

/* 响应式 */
@media (max-width: 768px) {
  .timeline-line {
    left: var(--spacing-lg);
  }

  .timeline-event {
    flex-direction: column !important;
  }

  .timeline-event:nth-child(odd) .event-content,
  .timeline-event:nth-child(even) .event-content {
    text-align: left;
    padding-left: var(--spacing-2xl);
    padding-right: var(--spacing-md);
    max-width: 100%;
  }

  .event-marker {
    left: var(--spacing-lg);
  }

  .timeline-intro {
    font-size: var(--text-lg);
  }

  .event-year {
    font-size: var(--text-2xl);
  }

  .event-title {
    font-size: var(--text-lg);
  }
}
</style>
