<template>
  <section class="timeline-section">
    <div class="section-container">
      <h2 class="section-title">百年历程</h2>
      <p class="section-desc">从1915到2025，河海人的奋斗足迹</p>

      <div class="timeline-wrapper">
        <div
          v-for="(milestone, index) in milestones"
          :key="index"
          class="timeline-item"
          :class="{ 'active': activeMilestone === index }"
          @click="handleClick(index)"
        >
          <div class="timeline-marker">
            <div class="marker-dot"></div>
            <div class="marker-line" v-if="index < milestones.length - 1"></div>
          </div>
          <div class="timeline-content">
            <div class="timeline-year">{{ milestone.year }}</div>
            <h3 class="timeline-title">{{ milestone.title }}</h3>
            <p class="timeline-description">{{ milestone.description }}</p>
            <div v-if="milestone.image" class="timeline-image">
              <span class="image-icon">{{ milestone.icon }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import gsap from 'gsap'

const props = defineProps({
  milestones: {
    type: Array,
    required: true
  },
  activeMilestone: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:active-milestone'])

const handleClick = (index) => {
  emit('update:active-milestone', index)
  gsap.to(`.timeline-item:nth-child(${index + 1})`, {
    scale: 1.05,
    duration: 0.3,
    ease: 'power2.out'
  })
}
</script>

<style scoped>
.timeline-section {
  background: rgba(0, 0, 0, 0.2);
}

.section-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 6rem 2rem;
}

.section-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  text-align: center;
  margin-bottom: 1rem;
  color: #FF7A1A;
}

.section-desc {
  text-align: center;
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: #ffffff;
  margin-bottom: 4rem;
}

.timeline-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 900px;
  margin: 0 auto;
}

.timeline-item {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(26, 31, 53, 0.95), rgba(15, 20, 35, 0.95));
  border-radius: 1rem;
  border: 2px solid rgba(255, 122, 26, 0.2);
  border-left: 4px solid rgba(255, 122, 26, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.timeline-item:hover,
.timeline-item.active {
  background: linear-gradient(135deg, rgba(26, 31, 53, 1), rgba(15, 20, 35, 1));
  border-color: rgba(255, 122, 26, 0.4);
  border-left-color: #FF7A1A;
  transform: translateX(10px);
  box-shadow: 0 8px 30px rgba(255, 122, 26, 0.3);
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.marker-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4169E1, #FF7A1A);
  box-shadow: 0 0 20px rgba(255, 122, 26, 0.5);
  flex-shrink: 0;
}

.marker-line {
  width: 2px;
  flex: 1;
  background: linear-gradient(180deg, #FF7A1A, transparent);
  margin-top: 10px;
}

.timeline-year {
  font-size: 1.5rem;
  font-weight: 700;
  color: #FF7A1A;
  margin-bottom: 0.5rem;
}

.timeline-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.8rem;
}

.timeline-description {
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.timeline-image {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, rgba(65, 105, 225, 0.2), rgba(255, 122, 26, 0.2));
  border-radius: 50%;
}

.image-icon {
  font-size: 2rem;
}

@media (max-width: 768px) {
  .section-container {
    padding: 4rem 1.5rem;
  }

  .timeline-item {
    grid-template-columns: 60px 1fr;
    gap: 1rem;
    padding: 1.5rem;
  }
}
</style>
