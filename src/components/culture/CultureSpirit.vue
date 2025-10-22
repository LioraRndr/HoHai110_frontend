<template>
  <section id="spirit" class="spirit-section">
    <div class="section-container">
      <h2 class="section-title">河海精神</h2>
      <p class="section-desc">艰苦朴素 · 实事求是 · 严格要求 · 勇于探索</p>

      <div class="spirit-cards">
        <div
          v-for="(spirit, index) in spirits"
          :key="index"
          class="spirit-card"
          @mouseenter="emit('update:hover-index', index)"
          @mouseleave="emit('update:hover-index', null)"
        >
          <div class="card-icon">{{ spirit.icon }}</div>
          <h3 class="card-title">{{ spirit.title }}</h3>
          <p class="card-description">{{ spirit.description }}</p>
          <div class="card-detail" :class="{ 'show': hoverIndex === index }">
            <p>{{ spirit.detail }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  spirits: {
    type: Array,
    required: true
  },
  hoverIndex: {
    type: Number,
    default: null
  }
})

const emit = defineEmits(['update:hover-index'])
</script>

<style scoped>
.spirit-section {
  background: rgba(255, 255, 255, 0.02);
  position: relative;
  overflow: hidden;
}

/* 添加历史照片背景装饰 */
.spirit-section::before {
  content: '';
  position: absolute;
  top: 10%;
  left: -5%;
  width: 350px;
  height: 280px;
  background-image: url('https://s1.img.five-plus-one.com/2025/10/22/68f8b155758b4.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.03;
  filter: grayscale(100%);
  transform: rotate(-8deg);
  border-radius: 8px;
  z-index: 0;
}

.spirit-section::after {
  content: '';
  position: absolute;
  bottom: 15%;
  right: -3%;
  width: 320px;
  height: 250px;
  background-image: url('https://s1.img.five-plus-one.com/2025/10/22/68f8b1ecbcd96.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.03;
  filter: grayscale(100%);
  transform: rotate(6deg);
  border-radius: 8px;
  z-index: 0;
}

.section-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 6rem 2rem;
  position: relative;
  z-index: 1;
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

.spirit-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.spirit-card {
  position: relative;
  padding: 2.5rem;
  background: linear-gradient(135deg, rgba(26, 31, 53, 0.95), rgba(15, 20, 35, 0.95));
  border: 2px solid rgba(255, 122, 26, 0.4);
  border-radius: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.spirit-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(65, 105, 225, 0.2), rgba(255, 122, 26, 0.2));
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 0;
}

.spirit-card:hover::before {
  opacity: 1;
}

.spirit-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(255, 122, 26, 0.4);
  border-color: #FF7A1A;
  background: linear-gradient(135deg, rgba(26, 31, 53, 1), rgba(15, 20, 35, 1));
}

.card-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.card-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #FF7A1A;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

.card-description {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.card-detail {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  position: relative;
  z-index: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.card-detail.show {
  max-height: 200px;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 122, 26, 0.3);
}

@media (max-width: 768px) {
  .spirit-cards {
    grid-template-columns: 1fr;
  }
}
</style>
