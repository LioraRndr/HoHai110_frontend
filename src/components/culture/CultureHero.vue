<template>
  <section id="hero" class="hero-section">
    <div class="hero-background">
      <div class="wave-animation"></div>
      <div class="particles"></div>
    </div>
    <div class="hero-content">
      <h1 class="hero-title">{{ ui.heroTitle }}</h1>
      <p class="hero-subtitle">{{ ui.heroSubtitle }}</p>
      <div class="scroll-indicator">
        <span>{{ ui.scrollIndicator }}</span>
        <div class="scroll-arrow">↓</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useCultureData } from '@/composables/useCultureData'

const { ui } = useCultureData()
</script>

<style scoped>
.hero-section {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* 添加历史照片背景 */
.hero-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://s1.img.five-plus-one.com/2025/10/22/68f8c23d5744b.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.08;
  filter: grayscale(80%);
  z-index: 0;
}

.wave-animation {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40%;
  background: linear-gradient(0deg,
    rgba(65, 105, 225, 0.3) 0%,
    transparent 100%
  );
  animation: wave 6s ease-in-out infinite;
}

@keyframes wave {
  0%, 100% { transform: translateX(0) scaleY(1); }
  50% { transform: translateX(-20px) scaleY(1.1); }
}

.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(2px 2px at 20% 30%, white, transparent),
    radial-gradient(2px 2px at 60% 70%, white, transparent),
    radial-gradient(1px 1px at 50% 50%, white, transparent),
    radial-gradient(1px 1px at 80% 10%, white, transparent),
    radial-gradient(2px 2px at 90% 60%, white, transparent),
    radial-gradient(1px 1px at 33% 80%, white, transparent);
  background-size: 200% 200%;
  background-position: 0% 0%;
  animation: particles 20s linear infinite;
}

@keyframes particles {
  0% { background-position: 0% 0%; opacity: 0.6; }
  50% { opacity: 1; }
  100% { background-position: 100% 100%; opacity: 0.6; }
}

.hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 2rem;
}

.hero-title {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  color: #FF7A1A;
  margin-bottom: 1rem;
  letter-spacing: 0.1em;
  text-shadow: 0 0 30px rgba(255, 122, 26, 0.5);
}

.hero-subtitle {
  font-size: clamp(1.2rem, 3vw, 2rem);
  color: #ffffff;
  margin-bottom: 3rem;
  letter-spacing: 0.05em;
}

.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #ffffff;
  font-size: 1rem;
}

.scroll-arrow {
  font-size: 2rem;
  animation: bounce 2s infinite;
  color: #FF7A1A;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }
}
</style>
