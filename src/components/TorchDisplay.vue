<template>
  <div class="torch-display-container">
    <!-- 火炬视觉区域 -->
    <div class="torch-visual">
      <!-- 背景粒子效果 -->
      <canvas ref="canvasRef" class="particles-canvas"></canvas>

      <!-- 中心火炬 -->
      <div class="center-torch">
        <div class="torch-flame">
          <div class="flame-core"></div>
          <div class="flame-layer flame-1"></div>
          <div class="flame-layer flame-2"></div>
          <div class="flame-layer flame-3"></div>
        </div>
        <div class="torch-handle"></div>
        <div class="torch-base">
          <div class="torch-count">{{ displayCount }}</div>
          <div class="torch-label">{{ torch.label }}</div>
        </div>
      </div>
    </div>

    <!-- 传递火炬按钮 -->
    <button
      class="pass-torch-button"
      @click="handlePassTorch"
      :disabled="isLoading"
    >
      <div class="button-flame">🔥</div>
      <span>{{ isLoading ? torch.passingButton : torch.passButton }}</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useBlessingsData } from '@/composables/useBlessingsData'
import { torchAPI } from '@/api'
import { $message } from '@/utils/message.js'

const { torch } = useBlessingsData()

// 响应式状态
const canvasRef = ref(null)
const torchCount = ref(0)
const displayCount = ref(0)
const isLoading = ref(false)

let canvas = null
let ctx = null
let animationId = null
let particles = []

// 粒子类
class Particle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.vx = (Math.random() - 0.5) * 1.5
    this.vy = -Math.random() * 2 - 1
    this.life = 1
    this.decay = Math.random() * 0.015 + 0.01
    this.size = Math.random() * 2 + 1
    const colorVariant = Math.random()
    if (colorVariant < 0.3) {
      this.color = [255, 200, 50] // 金黄色
    } else if (colorVariant < 0.7) {
      this.color = [255, 122, 26] // 橙色
    } else {
      this.color = [255, 69, 0] // 红橙色
    }
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    this.life -= this.decay
  }

  draw(ctx) {
    ctx.save()
    ctx.globalAlpha = this.life
    ctx.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.life})`
    ctx.shadowBlur = 8
    ctx.shadowColor = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, 0.5)`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  isDead() {
    return this.life <= 0
  }
}

// 初始化画布
const initCanvas = () => {
  canvas = canvasRef.value
  if (!canvas) return

  ctx = canvas.getContext('2d')
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
}

const resizeCanvas = () => {
  if (!canvas) return
  const parent = canvas.parentElement
  canvas.width = parent.offsetWidth
  canvas.height = parent.offsetHeight
}

// 创建粒子效果
const createParticles = (x, y, count = 20) => {
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y))
  }
}

// 动画循环
const animate = () => {
  if (!ctx || !canvas) return

  // 清空画布（半透明效果产生拖尾）
  ctx.fillStyle = 'rgba(248, 245, 239, 0.15)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // 更新和绘制粒子
  particles = particles.filter(particle => {
    particle.update()
    particle.draw(ctx)
    return !particle.isDead()
  })

  // 随机生成火焰粒子
  if (Math.random() < 0.15) {
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2 - 60
    createParticles(
      centerX + (Math.random() - 0.5) * 40,
      centerY + (Math.random() - 0.5) * 40,
      2
    )
  }

  animationId = requestAnimationFrame(animate)
}

// 获取火炬数量
const fetchTorchCount = async () => {
  try {
    const response = await torchAPI.getTorchCount()
    console.log('获取火炬数量响应:', response)

    // 兼容不同的响应格式
    let count = null
    if (response.message && response.message.count !== undefined) {
      // 优先使用 response.message.count（实际 API 格式）
      count = response.message.count
    } else if (response.data && response.data.count !== undefined) {
      count = response.data.count
    } else if (response.count !== undefined) {
      count = response.count
    }

    if (count !== null) {
      torchCount.value = count
    } else {
      console.warn('API 返回数据格式异常:', response)
      torchCount.value = 0
    }
  } catch (error) {
    console.error('获取火炬数量失败:', error)
    // 失败时设置为 0
    torchCount.value = 0
  }
}

// 传递火炬
const handlePassTorch = async () => {
  if (isLoading.value) return

  isLoading.value = true
  try {
    const response = await torchAPI.passTorch(1)
    console.log('传递火炬响应:', response)

    // 兼容不同的响应格式
    let newCount = null
    if (response.message && response.message.count !== undefined) {
      // 优先使用 response.message.count（实际 API 格式）
      newCount = response.message.count
    } else if (response.data && response.data.count !== undefined) {
      newCount = response.data.count
    } else if (response.count !== undefined) {
      newCount = response.count
    }

    if (newCount !== null) {
      torchCount.value = newCount
      $message.success(torch.value.passSuccess)

      // 创建庆祝粒子效果
      if (canvas) {
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2 - 60
        createParticles(centerX, centerY, 50)
      }
    } else {
      console.warn('API 返回数据格式异常:', response)
      // 乐观更新：如果 API 没有返回新值，手动增加
      torchCount.value = torchCount.value + 1
      $message.success(torch.value.passSuccess)

      if (canvas) {
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2 - 60
        createParticles(centerX, centerY, 50)
      }
    }
  } catch (error) {
    console.error('传递火炬失败:', error)
    $message.error(torch.value.passFailed + ': ' + (error.message || ''))
  } finally {
    isLoading.value = false
  }
}

// 平滑数字增长动画
watch(torchCount, (newVal, oldVal) => {
  if (newVal === oldVal) return

  const duration = 1000
  const startTime = Date.now()
  const diff = newVal - oldVal

  const animateCount = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)

    // 使用缓动函数
    const easeOut = 1 - Math.pow(1 - progress, 3)
    displayCount.value = Math.floor(oldVal + diff * easeOut)

    if (progress < 1) {
      requestAnimationFrame(animateCount)
    } else {
      displayCount.value = newVal
    }
  }

  animateCount()
})

onMounted(async () => {
  initCanvas()
  animate()
  await fetchTorchCount()
  displayCount.value = torchCount.value
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<style scoped>
.torch-display-container {
  position: relative;
  width: 100%;
  padding: var(--spacing-3xl) var(--spacing-xl);
  background: linear-gradient(180deg, #F8F5EF 0%, #E5E2DC 100%);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.torch-visual {
  position: relative;
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-2xl);
}

.particles-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

/* 中心火炬 */
.center-torch {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
}

.torch-flame {
  position: relative;
  width: 100px;
  height: 140px;
  margin-bottom: var(--spacing-md);
}

.flame-core {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 70px;
  background: linear-gradient(to top, #FFD700, #FF7A1A, #FF4500);
  border-radius: 50% 50% 0 0;
  animation: flame-flicker 1.5s ease-in-out infinite;
}

.flame-layer {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50% 50% 0 0;
  animation: flame-dance 2s ease-in-out infinite;
}

.flame-1 {
  width: 60px;
  height: 90px;
  background: radial-gradient(ellipse at center bottom, rgba(255, 122, 26, 0.8), transparent);
  animation-delay: 0s;
}

.flame-2 {
  width: 75px;
  height: 115px;
  background: radial-gradient(ellipse at center bottom, rgba(255, 165, 0, 0.5), transparent);
  animation-delay: 0.3s;
}

.flame-3 {
  width: 90px;
  height: 140px;
  background: radial-gradient(ellipse at center bottom, rgba(255, 200, 50, 0.3), transparent);
  animation-delay: 0.6s;
}

@keyframes flame-flicker {
  0%, 100% {
    transform: translateX(-50%) scaleY(1) scaleX(1);
  }
  50% {
    transform: translateX(-50%) scaleY(0.92) scaleX(1.05);
  }
}

@keyframes flame-dance {
  0%, 100% {
    transform: translateX(-50%) scaleX(1);
    opacity: 1;
  }
  25% {
    transform: translateX(-48%) scaleX(0.95);
    opacity: 0.95;
  }
  75% {
    transform: translateX(-52%) scaleX(0.95);
    opacity: 0.95;
  }
}

.torch-handle {
  width: 18px;
  height: 100px;
  background: linear-gradient(to bottom, #A0522D, #8B4513, #654321);
  border-radius: var(--radius-sm);
  margin-bottom: var(--spacing-md);
  box-shadow:
    inset 0 2px 4px rgba(0,0,0,0.3),
    0 2px 8px rgba(0,0,0,0.2);
  position: relative;
}

.torch-handle::before {
  content: '';
  position: absolute;
  top: 10%;
  left: 3px;
  width: 2px;
  height: 80%;
  background: linear-gradient(to bottom, rgba(255,255,255,0.3), transparent);
  border-radius: 1px;
}

.torch-base {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  padding: var(--spacing-lg) var(--spacing-2xl);
  border-radius: var(--radius-xl);
  box-shadow:
    0 8px 32px rgba(255, 122, 26, 0.15),
    0 4px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  border: 2px solid rgba(255, 200, 50, 0.3);
}

.torch-count {
  font-size: 3.5rem;
  font-weight: 800;
  font-family: var(--font-title);
  background: linear-gradient(135deg, #FF7A1A 0%, #FFD700 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.torch-label {
  font-size: var(--text-base);
  color: var(--color-ink-black);
  opacity: 0.7;
  font-weight: 600;
}

/* 传递火炬按钮 */
.pass-torch-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg) var(--spacing-3xl);
  font-size: var(--text-lg);
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, #FF7A1A 0%, #FF4500 100%);
  border-radius: var(--radius-full);
  box-shadow:
    0 8px 24px rgba(255, 122, 26, 0.4),
    0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all var(--transition-base);
  margin: 0 auto;
  cursor: pointer;
  border: none;
  overflow: hidden;
}

.pass-torch-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.pass-torch-button:hover:not(:disabled)::before {
  left: 100%;
}

.pass-torch-button:hover:not(:disabled) {
  transform: translateY(-3px) scale(1.02);
  box-shadow:
    0 12px 32px rgba(255, 122, 26, 0.5),
    0 6px 16px rgba(0, 0, 0, 0.25);
}

.pass-torch-button:active:not(:disabled) {
  transform: translateY(-1px) scale(0.98);
}

.pass-torch-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.button-flame {
  font-size: 2rem;
  animation: flame-pulse 1.5s ease-in-out infinite;
}

@keyframes flame-pulse {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 8px rgba(255, 122, 26, 0.8));
  }
  50% {
    transform: scale(1.15);
    filter: drop-shadow(0 0 16px rgba(255, 200, 50, 1));
  }
}

/* 响应式 */
@media (max-width: 768px) {
  .torch-display-container {
    padding: var(--spacing-2xl) var(--spacing-md);
  }

  .torch-visual {
    height: 400px;
  }

  .torch-flame {
    width: 80px;
    height: 110px;
  }

  .flame-core {
    width: 30px;
    height: 55px;
  }

  .flame-1 {
    width: 50px;
    height: 75px;
  }

  .flame-2 {
    width: 60px;
    height: 95px;
  }

  .flame-3 {
    width: 70px;
    height: 110px;
  }

  .torch-handle {
    width: 15px;
    height: 80px;
  }

  .torch-count {
    font-size: 2.5rem;
  }

  .pass-torch-button {
    padding: var(--spacing-md) var(--spacing-2xl);
    font-size: var(--text-base);
  }

  .button-flame {
    font-size: 1.5rem;
  }
}
</style>
