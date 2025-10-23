<template>
  <div class="history-timeline">
    <div class="timeline-header">
      <p class="timeline-intro">{{ $t('historyTimeline.intro') }}</p>
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

              <!-- 历史图片展示 -->
              <div class="event-images" v-if="event.images && event.images.length">
                <div
                  v-for="(image, imgIndex) in event.images"
                  :key="imgIndex"
                  class="event-image-item"
                >
                  <img
                    :src="image.url"
                    :alt="image.caption"
                    class="event-image"
                    loading="lazy"
                  />
                  <p class="image-caption">{{ image.caption }}</p>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const { t } = useI18n()

const activeEvent = ref(null)

const timelineEvents = computed(() => [
  {
    year: '1915',
    title: t('historyTimeline.events.1915.title'),
    description: t('historyTimeline.events.1915.description'),
    detail: t('historyTimeline.events.1915.detail'),
    images: [
      {
        url: 'https://s1.img.five-plus-one.com/2025/10/22/68f8b088cbd5f.jpg',
        caption: t('historyTimeline.events.1915.imageCaption1')
      },
      {
        url: 'https://s1.img.five-plus-one.com/2025/10/22/68f8b155758b4.jpg',
        caption: t('historyTimeline.events.1915.imageCaption2')
      },
      {
        url: 'https://s1.img.five-plus-one.com/2025/10/22/68f8b1a1681e4.jpg',
        caption: t('historyTimeline.events.1915.imageCaption3')
      }
    ]
  },
  {
    year: '1952',
    title: t('historyTimeline.events.1952.title'),
    description: t('historyTimeline.events.1952.description'),
    detail: t('historyTimeline.events.1952.detail'),
    images: [
      {
        url: 'https://s1.img.five-plus-one.com/2025/10/22/68f8b381e9ed4.jpg',
        caption: t('historyTimeline.events.1952.imageCaption1')
      },
      {
        url: 'https://s1.img.five-plus-one.com/2025/10/22/68f8b39a9d71f.jpg',
        caption: t('historyTimeline.events.1952.imageCaption2')
      }
    ]
  },
  {
    year: '1985',
    title: t('historyTimeline.events.1985.title'),
    description: t('historyTimeline.events.1985.description'),
    detail: t('historyTimeline.events.1985.detail'),
    images: [
      {
        url: 'https://s1.img.five-plus-one.com/2025/10/22/68f8b3f68054e.jpg',
        caption: t('historyTimeline.events.1985.imageCaption1')
      },
      {
        url: 'https://s1.img.five-plus-one.com/2025/10/22/68f8b564be482.jpg',
        caption: t('historyTimeline.events.1985.imageCaption2')
      },
      {
        url: 'https://s1.img.five-plus-one.com/2025/10/22/68f8b435c6755.jpg',
        caption: t('historyTimeline.events.1985.imageCaption3')
      }
    ]
  },
  {
    year: '2025',
    title: t('historyTimeline.events.2025.title'),
    description: t('historyTimeline.events.2025.description'),
    detail: t('historyTimeline.events.2025.detail'),
    images: [
      {
        url: 'https://s1.img.five-plus-one.com/2025/10/22/68f8b5b4089fc.jpg',
        caption: t('historyTimeline.events.2025.imageCaption1')
      },
      {
        url: 'https://s1.img.five-plus-one.com/2025/10/22/68f8b5ed5861a.jpg',
        caption: t('historyTimeline.events.2025.imageCaption2')
      },
      {
        url: 'https://s1.img.five-plus-one.com/2025/10/22/68f8b61058c9b.png',
        caption: t('historyTimeline.events.2025.imageCaption3')
      }
    ]
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

/* 历史图片展示 */
.event-images {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px dashed rgba(10, 106, 184, 0.2);
}

.event-image-item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  background: rgba(248, 245, 239, 0.5);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
}

.event-image-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(10, 106, 184, 0.15);
  background: rgba(248, 245, 239, 0.8);
}

.event-image {
  width: 100%;
  height: auto;
  max-height: 250px;
  object-fit: cover;
  border-radius: var(--radius-sm);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.event-image-item:hover .event-image {
  transform: scale(1.02);
}

.image-caption {
  font-size: var(--text-xs);
  color: var(--color-ink-black);
  opacity: 0.7;
  text-align: center;
  line-height: 1.4;
  font-style: italic;
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

  .event-images {
    grid-template-columns: 1fr;
  }

  .event-image {
    max-height: 200px;
  }
}
</style>
