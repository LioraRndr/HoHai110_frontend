<template>
  <section id="people-grid" class="people-section">
    <div class="people-container">
      <div class="people-grid">
        <div
          v-for="person in people"
          :key="person.id"
          class="person-card"
          @click="$emit('select-person', person)"
        >
          <div class="card-header">
            <div class="avatar-wrapper">
              <img :src="person.avatar" :alt="person.name" class="avatar-image" />
            </div>
            <div class="person-info">
              <h3 class="person-name">{{ person.name }}</h3>
              <p class="person-years">{{ person.years }}</p>
            </div>
          </div>

          <div class="card-body">
            <h4 class="person-title">{{ person.title }}</h4>
            <p class="person-subtitle">{{ person.subtitle }}</p>

            <div class="person-tags">
              <span
                v-for="(tag, index) in person.tags"
                :key="index"
                class="tag"
              >
                {{ tag }}
              </span>
            </div>

            <div class="person-quote">
              <div class="quote-icon">"</div>
              <p class="quote-text">{{ person.quote }}</p>
            </div>
          </div>

          <div class="card-footer">
            <button class="read-more-btn">
              <span>了解更多</span>
              <span class="arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  people: {
    type: Array,
    required: true
  }
})

defineEmits(['select-person'])
</script>

<style scoped>
.people-section {
  padding: 6rem 2rem;
  background: linear-gradient(180deg, #0a0e1a 0%, #1a1f35 50%, #0a0e1a 100%);
  position: relative;
  overflow: hidden;
}

/* 添加历史照片背景装饰 */
.people-section::before {
  content: '';
  position: absolute;
  top: 10%;
  left: -8%;
  width: 450px;
  height: 350px;
  background-image: url('https://s1.img.five-plus-one.com/2025/10/22/68f8b1de050d1.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.02;
  filter: grayscale(100%);
  transform: rotate(-12deg);
  border-radius: 12px;
  z-index: 0;
}

.people-section::after {
  content: '';
  position: absolute;
  bottom: 15%;
  right: -5%;
  width: 400px;
  height: 320px;
  background-image: url('https://s1.img.five-plus-one.com/2025/10/22/68f8b58f75b72.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.025;
  filter: grayscale(100%);
  transform: rotate(8deg);
  border-radius: 12px;
  z-index: 0;
}

.people-container {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.people-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
}

.person-card {
  background: linear-gradient(135deg, rgba(65, 105, 225, 0.1) 0%, rgba(0, 0, 0, 0.2) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.person-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 122, 26, 0.1) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.person-card:hover::before {
  opacity: 1;
}

.person-card:hover {
  transform: translateY(-8px);
  border-color: rgba(255, 122, 26, 0.5);
  box-shadow: 0 20px 40px rgba(255, 122, 26, 0.2);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.avatar-wrapper {
  flex-shrink: 0;
}

.avatar-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FF7A1A 0%, #FFA500 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(255, 122, 26, 0.4);
}

.avatar-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 20px rgba(255, 122, 26, 0.4);
  border: 3px solid rgba(255, 122, 26, 0.3);
  transition: all 0.3s ease;
}

.person-card:hover .avatar-image {
  border-color: rgba(255, 122, 26, 0.6);
  box-shadow: 0 6px 25px rgba(255, 122, 26, 0.6);
  transform: scale(1.05);
}

.avatar-initial {
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
}

.person-info {
  flex: 1;
}

.person-name {
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.3rem;
}

.person-years {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
}

.card-body {
  position: relative;
  z-index: 1;
}

.person-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #FF7A1A;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.person-subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.person-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tag {
  padding: 0.4rem 0.8rem;
  background: rgba(65, 105, 225, 0.2);
  border: 1px solid rgba(65, 105, 225, 0.3);
  border-radius: 20px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.9);
  white-space: nowrap;
}

.person-quote {
  background: rgba(0, 0, 0, 0.3);
  border-left: 3px solid #FF7A1A;
  padding: 1rem 1.2rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  position: relative;
}

.quote-icon {
  position: absolute;
  top: -10px;
  left: 10px;
  font-size: 3rem;
  color: rgba(255, 122, 26, 0.3);
  font-family: Georgia, serif;
  line-height: 1;
}

.quote-text {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  font-style: italic;
  padding-left: 1rem;
}

.card-footer {
  position: relative;
  z-index: 1;
}

.read-more-btn {
  width: 100%;
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #FF7A1A 0%, #FFA500 100%);
  border: none;
  border-radius: 10px;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.read-more-btn:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 15px rgba(255, 122, 26, 0.4);
}

.arrow {
  transition: transform 0.3s ease;
}

.read-more-btn:hover .arrow {
  transform: translateX(5px);
}

@media (max-width: 768px) {
  .people-section {
    padding: 4rem 1rem;
  }

  .people-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .person-card {
    padding: 1.5rem;
  }

  .card-header {
    gap: 1rem;
  }

  .avatar-placeholder {
    width: 60px;
    height: 60px;
  }

  .avatar-image {
    width: 60px;
    height: 60px;
  }

  .avatar-initial {
    font-size: 1.5rem;
  }

  .person-name {
    font-size: 1.4rem;
  }

  .person-title {
    font-size: 1.1rem;
  }
}
</style>
