<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-overlay" @click="closeModal">
        <div class="modal-container" @click.stop>
          <button class="close-btn" @click="closeModal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div class="modal-scroll-wrapper">
            <div v-if="person" class="modal-content">
            <!-- Header -->
            <div class="modal-header">
              <div class="header-avatar">
                <img :src="person.avatar" :alt="person.name" class="avatar-image" />
              </div>
              <div class="header-info">
                <h2 class="person-name">{{ person.name }}</h2>
                <p class="person-years">{{ person.years }}</p>
                <h3 class="person-title">{{ person.title }}</h3>
                <p class="person-subtitle">{{ person.subtitle }}</p>
              </div>
            </div>

            <!-- Tags -->
            <div class="person-tags">
              <span
                v-for="(tag, index) in person.tags"
                :key="index"
                class="tag"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Quote -->
            <div class="person-quote">
              <div class="quote-icon">"</div>
              <p class="quote-text">{{ person.quote }}</p>
            </div>

            <!-- Timeline -->
            <div class="timeline-section">
              <h3 class="section-title">重要历程</h3>
              <div class="timeline">
                <div
                  v-for="(event, index) in person.timeline"
                  :key="index"
                  class="timeline-item"
                >
                  <div class="timeline-marker">
                    <div class="marker-dot"></div>
                    <div class="marker-line"></div>
                  </div>
                  <div class="timeline-content">
                    <div class="timeline-year">{{ event.year }}</div>
                    <h4 class="timeline-title">{{ event.title }}</h4>
                    <p class="timeline-description">{{ event.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Photo Gallery -->
            <div v-if="person.photos && person.photos.length > 0" class="gallery-section">
              <h3 class="section-title">珍贵影像</h3>
              <div class="photo-gallery">
                <div
                  v-for="(photo, index) in person.photos"
                  :key="index"
                  class="photo-item"
                >
                  <div class="photo-wrapper">
                    <img
                      :src="photo.url"
                      :alt="photo.caption"
                      class="photo-image"
                      :class="{
                        'photo-position-bottom': photo.url.includes('68f8bee7b6875') || photo.url.includes('68f8cdbf33151')
                      }"
                    />
                    <div class="photo-overlay">
                      <p class="photo-caption">{{ photo.caption }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Achievements -->
            <div class="achievements-section">
              <h3 class="section-title">主要成就</h3>
              <ul class="achievements-list">
                <li
                  v-for="(achievement, index) in person.achievements"
                  :key="index"
                  class="achievement-item"
                >
                  <span class="achievement-icon">✓</span>
                  <span class="achievement-text">{{ achievement }}</span>
                </li>
              </ul>
            </div>

            <!-- Legacy -->
            <div class="legacy-section">
              <h3 class="section-title">精神传承</h3>
              <div class="legacy-content">
                <p class="legacy-text">{{ person.legacy }}</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  person: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow-y: auto;
}

.modal-container {
  position: relative;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  background: linear-gradient(135deg, #1a1f35 0%, #0a0e1a 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.modal-container::-webkit-scrollbar {
  width: 10px;
}

.modal-container::-webkit-scrollbar-track {
  background: transparent;
  margin: 20px 0;
}

.modal-container::-webkit-scrollbar-thumb {
  background: rgba(255, 122, 26, 0.5);
  border-radius: 5px;
  border: 2px solid transparent;
  background-clip: padding-box;
  transition: background 0.3s ease;
}

.modal-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 122, 26, 0.7);
  background-clip: padding-box;
}

.modal-scroll-wrapper {
  width: 100%;
}

.close-btn {
  position: sticky;
  top: 1rem;
  right: 1rem;
  float: right;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease, border-color 0.3s ease;
  z-index: 10;
  margin: 1rem 1rem 0 0;
}

.close-btn svg {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 122, 26, 0.8);
  border-color: #FF7A1A;
}

.close-btn:hover svg {
  transform: rotate(90deg);
}

.modal-content {
  padding: 3rem;
  clear: both;
}

.modal-header {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-avatar .avatar-placeholder {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FF7A1A 0%, #FFA500 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(255, 122, 26, 0.4);
}

.header-avatar .avatar-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 20px rgba(255, 122, 26, 0.4);
  border: 3px solid rgba(255, 122, 26, 0.3);
}

.header-avatar .avatar-initial {
  font-size: 3rem;
  font-weight: 700;
  color: #ffffff;
}

.header-info {
  flex: 1;
}

.person-name {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.person-years {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1rem;
}

.person-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #FF7A1A;
  margin-bottom: 0.5rem;
}

.person-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
}

.person-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 2rem;
}

.tag {
  padding: 0.5rem 1rem;
  background: rgba(65, 105, 225, 0.2);
  border: 1px solid rgba(65, 105, 225, 0.3);
  border-radius: 20px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
}

.person-quote {
  background: rgba(0, 0, 0, 0.3);
  border-left: 4px solid #FF7A1A;
  padding: 1.5rem 2rem;
  border-radius: 10px;
  margin-bottom: 3rem;
  position: relative;
}

.quote-icon {
  position: absolute;
  top: -15px;
  left: 15px;
  font-size: 4rem;
  color: rgba(255, 122, 26, 0.3);
  font-family: Georgia, serif;
  line-height: 1;
}

.quote-text {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
  font-style: italic;
  padding-left: 2rem;
}

.timeline-section,
.achievements-section,
.legacy-section,
.gallery-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #FF7A1A;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(255, 122, 26, 0.3);
}

.timeline {
  position: relative;
}

.timeline-item {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.timeline-item:last-child .marker-line {
  display: none;
}

.timeline-marker {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.marker-dot {
  width: 16px;
  height: 16px;
  background: #FF7A1A;
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(255, 122, 26, 0.2);
  z-index: 1;
}

.marker-line {
  width: 2px;
  flex: 1;
  background: rgba(255, 122, 26, 0.3);
  margin-top: 8px;
  min-height: 60px;
}

.timeline-content {
  flex: 1;
}

.timeline-year {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: rgba(255, 122, 26, 0.2);
  border: 1px solid rgba(255, 122, 26, 0.3);
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #FF7A1A;
  margin-bottom: 0.5rem;
}

.timeline-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.timeline-description {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
}

.achievements-list {
  list-style: none;
  padding: 0;
}

.achievement-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 1rem;
  padding: 1rem;
  background: rgba(65, 105, 225, 0.1);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.achievement-item:hover {
  background: rgba(65, 105, 225, 0.2);
  transform: translateX(5px);
}

.achievement-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: #FF7A1A;
  border-radius: 50%;
  color: #ffffff;
  font-weight: 700;
  flex-shrink: 0;
}

.achievement-text {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
}

.legacy-content {
  background: linear-gradient(135deg, rgba(255, 122, 26, 0.1) 0%, rgba(65, 105, 225, 0.1) 100%);
  border: 1px solid rgba(255, 122, 26, 0.3);
  border-radius: 15px;
  padding: 2rem;
}

.legacy-text {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 2;
  text-align: justify;
}

/* Photo Gallery */
.photo-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.photo-item {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.photo-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(255, 122, 26, 0.3);
}

.photo-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 75%; /* 4:3 aspect ratio */
  overflow: hidden;
}

.photo-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  transition: transform 0.3s ease;
}

.photo-image.photo-position-bottom {
  object-position: center top;
}

.photo-item:hover .photo-image {
  transform: scale(1.05);
}

.photo-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 50%, transparent 100%);
  padding: 1.5rem 1rem 1rem;
  transform: translateY(0);
  transition: transform 0.3s ease;
}

.photo-caption {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.5;
  margin: 0;
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9);
}

@media (max-width: 768px) {
  .modal-overlay {
    padding: 1rem;
  }

  .modal-content {
    padding: 2rem 1.5rem;
  }

  .modal-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .header-avatar .avatar-placeholder {
    width: 100px;
    height: 100px;
    margin: 0 auto;
  }

  .header-avatar .avatar-initial {
    font-size: 2.5rem;
  }

  .person-name {
    font-size: 2rem;
  }

  .person-title {
    font-size: 1.2rem;
  }

  .timeline-item {
    gap: 1rem;
  }

  .quote-text,
  .legacy-text {
    font-size: 1rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .photo-gallery {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .photo-caption {
    font-size: 0.85rem;
  }
}
</style>
