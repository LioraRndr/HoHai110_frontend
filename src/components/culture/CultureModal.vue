<template>
  <transition name="modal">
    <div v-if="show" class="modal-overlay" @click="handleClose">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="handleClose">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div class="modal-scroll-wrapper">
          <div v-if="achievement" class="modal-body">
            <div class="modal-icon">{{ achievement.icon }}</div>
            <h2 class="modal-title">{{ achievement.name }}</h2>
            <div class="modal-details">
              <p class="modal-desc">{{ achievement.description }}</p>
              <div class="modal-stats">
                <div class="modal-stat">
                  <span class="label">参与校友</span>
                  <span class="value">{{ achievement.alumni }}+ 人</span>
                </div>
                <div class="modal-stat">
                  <span class="label">工程地位</span>
                  <span class="value">{{ achievement.rank }}</span>
                </div>
                <div class="modal-stat">
                  <span class="label">完成时间</span>
                  <span class="value">{{ achievement.year }}</span>
                </div>
              </div>
              <div class="modal-story">
                <h3>工程故事</h3>
                <p>{{ achievement.story }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  achievement: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:show', 'close'])

const handleClose = () => {
  emit('update:show', false)
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  position: relative;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  background: linear-gradient(135deg, #1a1f35 0%, #0f1419 100%);
  border: 2px solid rgba(255, 122, 26, 0.5);
  border-radius: 1.5rem;
  overflow: hidden;
}

.modal-scroll-wrapper {
  max-height: 90vh;
  overflow-y: auto;
  padding: 3rem;
}

.modal-scroll-wrapper::-webkit-scrollbar {
  width: 8px;
}

.modal-scroll-wrapper::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.modal-scroll-wrapper::-webkit-scrollbar-thumb {
  background: rgba(255, 122, 26, 0.5);
  border-radius: 4px;
}

.modal-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.modal-close svg {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.modal-close:hover {
  background: rgba(255, 122, 26, 0.3);
}

.modal-close:hover svg {
  transform: rotate(90deg);
}

.modal-icon {
  font-size: 5rem;
  text-align: center;
  margin-bottom: 1.5rem;
}

.modal-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #FF7A1A;
  text-align: center;
  margin-bottom: 2rem;
}

.modal-desc {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #ffffff;
  margin-bottom: 2rem;
  text-align: center;
}

.modal-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.modal-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
}

.modal-stat .label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.5rem;
}

.modal-stat .value {
  font-size: 1.3rem;
  font-weight: 700;
  color: #4169E1;
}

.modal-story {
  padding: 1.5rem;
  background: rgba(65, 105, 225, 0.1);
  border-left: 3px solid #4169E1;
  border-radius: 0.5rem;
}

.modal-story h3 {
  font-size: 1.3rem;
  color: #FF7A1A;
  margin-bottom: 1rem;
}

.modal-story p {
  font-size: 1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
}

/* Modal Animation */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9) translateY(-30px);
}

@media (max-width: 768px) {
  .modal-scroll-wrapper {
    padding: 2rem 1.5rem;
  }

  .modal-stats {
    grid-template-columns: 1fr;
  }

  .modal-close {
    top: 1rem;
    right: 1rem;
  }
}
</style>
