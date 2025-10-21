<template>
  <section class="achievement-section">
    <div class="section-container">
      <h2 class="section-title">辉煌成就</h2>
      <p class="section-desc">河海人在重大工程中的贡献</p>

      <div class="achievement-grid">
        <div
          v-for="(achievement, index) in achievements"
          :key="index"
          class="achievement-card"
        >
          <div class="achievement-header">
            <div class="achievement-icon">{{ achievement.icon }}</div>
            <h3 class="achievement-name">{{ achievement.name }}</h3>
          </div>
          <div class="achievement-stats">
            <div class="stat-item">
              <span class="stat-label">参与校友</span>
              <span class="stat-value">{{ achievement.alumni }}+</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">工程地位</span>
              <span class="stat-value">{{ achievement.rank }}</span>
            </div>
          </div>
          <p class="achievement-desc">{{ achievement.description }}</p>
          <button class="learn-more-btn" @click="emit('open-modal', achievement)">
            了解更多
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  achievements: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['open-modal'])
</script>

<style scoped>
.achievement-section {
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

.achievement-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.achievement-card {
  padding: 2rem;
  background: linear-gradient(135deg, rgba(26, 31, 53, 0.95), rgba(15, 20, 35, 0.95));
  border: 2px solid rgba(255, 122, 26, 0.4);
  border-radius: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.achievement-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(255, 122, 26, 0.4);
  border-color: #FF7A1A;
  background: linear-gradient(135deg, rgba(26, 31, 53, 1), rgba(15, 20, 35, 1));
}

.achievement-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.achievement-icon {
  font-size: 3rem;
}

.achievement-name {
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffffff;
}

.achievement-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 122, 26, 0.2);
  border-radius: 0.5rem;
  text-align: center;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #FF7A1A;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.achievement-desc {
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.5rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.learn-more-btn {
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, #4169E1, #FF7A1A);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.learn-more-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(255, 122, 26, 0.4);
}

@media (max-width: 768px) {
  .achievement-grid {
    grid-template-columns: 1fr;
  }
}
</style>
