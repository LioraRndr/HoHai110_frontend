<template>
  <section class="global-section">
    <div class="section-container">
      <h2 class="section-title">国际影响</h2>
      <p class="section-desc">中国水利智慧惠及全球</p>

      <div class="global-stats">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="stat-card"
        >
          <div class="stat-icon">{{ stat.icon }}</div>
          <div class="stat-number">{{ stat.number }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>

      <div class="global-map">
        <div class="map-placeholder">
          <p>🌍</p>
          <span>河海足迹遍布全球</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  stats: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.global-section {
  background: rgba(255, 255, 255, 0.02);
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

.global-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.stat-card {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(26, 31, 53, 0.95), rgba(15, 20, 35, 0.95));
  border: 2px solid rgba(255, 122, 26, 0.4);
  border-radius: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(255, 122, 26, 0.4);
  border-color: #FF7A1A;
  background: linear-gradient(135deg, rgba(26, 31, 53, 1), rgba(15, 20, 35, 1));
}

.stat-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 800;
  color: #FF7A1A;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.stat-label {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.global-map {
  padding: 4rem;
  background: linear-gradient(135deg, rgba(26, 31, 53, 0.8), rgba(15, 20, 35, 0.8));
  border-radius: 1rem;
  border: 2px dashed rgba(255, 122, 26, 0.5);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.map-placeholder {
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
}

.map-placeholder p {
  font-size: 6rem;
  margin-bottom: 1rem;
}

.map-placeholder span {
  font-size: 1.5rem;
}

@media (max-width: 768px) {
  .global-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .global-stats {
    grid-template-columns: 1fr;
  }
}
</style>
