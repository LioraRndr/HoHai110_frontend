<template>
  <div class="torch-relay-container" ref="containerRef">
    <!-- 火炬传递可视化 -->
    <div class="relay-visual">
      <canvas ref="canvasRef" class="relay-canvas"></canvas>

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
          <span class="torch-number">{{ torchCount }}</span>
          <span class="torch-label">火炬已点燃</span>
        </div>
      </div>

      <!-- 传递路径动画 -->
      <svg class="path-overlay" viewBox="0 0 800 600">
        <defs>
          <radialGradient id="torchGlow">
            <stop offset="0%" stop-color="#FF7A1A" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="#FF7A1A" stop-opacity="0"/>
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <!-- 传递的小火炬 -->
        <circle
          v-for="torch in activeTorches"
          :key="torch.id"
          :cx="torch.x"
          :cy="torch.y"
          r="6"
          fill="url(#torchGlow)"
          filter="url(#glow)"
          class="animated-torch"
        />
      </svg>
    </div>

    <!-- 统计信息 -->
    <div class="stats-bar">
      <div class="stat-card">
        <div class="stat-icon">👥</div>
        <div class="stat-content">
          <div class="stat-value">{{ onlineUsers }}</div>
          <div class="stat-label">在线参与</div>
        </div>
      </div>

      <div class="stat-card highlight">
        <div class="stat-icon">🔥</div>
        <div class="stat-content">
          <div class="stat-value">{{ torchCount }}</div>
          <div class="stat-label">薪火相传</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">💬</div>
        <div class="stat-content">
          <div class="stat-value">{{ blessingCount }}</div>
          <div class="stat-label">留言祝福</div>
        </div>
      </div>
    </div>

    <!-- 祝福墙滚动区域 -->
    <div class="blessing-wall">
      <h3 class="wall-title">祝福墙</h3>
      <div class="blessing-scroll-container">
        <div class="blessing-scroll" ref="blessingScroll">
          <div v-for="blessing in blessings" :key="blessing.id" class="blessing-card" :style="{ background: blessing.color }">
            <div class="blessing-header">
              <span class="blessing-avatar">{{ blessing.avatar }}</span>
              <span class="blessing-author">{{ blessing.author }}</span>
            </div>
            <p class="blessing-content">{{ blessing.text }}</p>
            <div class="blessing-footer">
              <span class="blessing-time">{{ blessing.timeAgo }}</span>
            </div>
          </div>
          <div v-for="blessing in blessings" :key="`copy-${blessing.id}`" class="blessing-card" :style="{ background: blessing.color }">
            <div class="blessing-header">
              <span class="blessing-avatar">{{ blessing.avatar }}</span>
              <span class="blessing-author">{{ blessing.author }}</span>
            </div>
            <p class="blessing-content">{{ blessing.text }}</p>
            <div class="blessing-footer">
              <span class="blessing-time">{{ blessing.timeAgo }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 点燃火炬按钮 -->
    <button class="ignite-button" @click="showBlessingForm = true">
      <div class="button-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      </div>
      <span>点燃你的火炬</span>
    </button>

    <!-- 祝福表单弹窗 -->
    <transition name="modal">
      <div v-if="showBlessingForm" class="modal-overlay" @click.self="showBlessingForm = false">
        <div class="blessing-modal">
          <button class="modal-close" @click="showBlessingForm = false">×</button>

          <div class="modal-header">
            <div class="modal-torch-icon">🔥</div>
            <h3>点燃你的火炬</h3>
            <p>写下你对河海的祝福和回忆</p>
          </div>

          <div class="modal-body">
            <input
              v-model="formData.author"
              type="text"
              placeholder="你的名字 (选填)"
              class="form-input"
            />

            <textarea
              v-model="formData.message"
              placeholder="写下你的祝福..."
              rows="5"
              maxlength="200"
              class="form-textarea"
            ></textarea>

            <div class="char-counter">{{ formData.message.length }}/200</div>

            <button
              class="submit-torch-button"
              @click="submitBlessing"
              :disabled="!formData.message.trim()"
            >
              <span>点燃火炬</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const containerRef = ref(null)
const canvasRef = ref(null)
const blessingScroll = ref(null)
const onlineUsers = ref(128)
const torchCount = ref(1915)
const blessingCount = ref(5420)
const showBlessingForm = ref(false)
const activeTorches = ref([])
const blessings = ref([])
let scrollAnimationId = null

const formData = ref({
  author: '',
  message: ''
})

let canvas = null
let ctx = null
let animationId = null
let torchIdCounter = 0

// 颜色主题
const colors = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
]


// 粒子类
class Particle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.vx = (Math.random() - 0.5) * 2
    this.vy = (Math.random() - 0.5) * 2
    this.life = 1
    this.decay = Math.random() * 0.02 + 0.01
    this.size = Math.random() * 3 + 1
    this.color = `rgba(255, ${Math.floor(Math.random() * 100) + 100}, 26, ${this.life})`
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    this.vy += 0.1 // 重力
    this.life -= this.decay
  }

  draw(ctx) {
    ctx.save()
    ctx.globalAlpha = this.life
    ctx.fillStyle = this.color
    ctx.shadowBlur = 10
    ctx.shadowColor = '#FF7A1A'
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
  if (!canvas || !containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  canvas.width = rect.width
  canvas.height = 600
}

let particles = []

// 创建粒子效果
const createParticles = (x, y, count = 30) => {
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y))
  }
}

// 动画循环
const animate = () => {
  if (!ctx || !canvas) return

  // 渐变清空画布
  ctx.fillStyle = 'rgba(248, 245, 239, 0.1)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // 更新和绘制粒子
  particles = particles.filter(particle => {
    particle.update()
    particle.draw(ctx)
    return !particle.isDead()
  })

  // 随机生成背景粒子
  if (Math.random() < 0.1) {
    const x = canvas.width / 2 + (Math.random() - 0.5) * 100
    const y = canvas.height / 2 + (Math.random() - 0.5) * 100
    createParticles(x, y, 3)
  }

  animationId = requestAnimationFrame(animate)
}

// 创建传递的火炬
const createTorch = () => {
  const torch = {
    id: torchIdCounter++,
    x: 400,
    y: 300,
    targetX: Math.random() * 800,
    targetY: Math.random() * 600,
    progress: 0
  }

  activeTorches.value.push(torch)

  // 动画
  const animateTorch = () => {
    torch.progress += 0.02

    if (torch.progress >= 1) {
      activeTorches.value = activeTorches.value.filter(t => t.id !== torch.id)
      return
    }

    // 贝塞尔曲线路径
    const t = torch.progress
    const controlX = (torch.x + torch.targetX) / 2 + (Math.random() - 0.5) * 100
    const controlY = Math.min(torch.y, torch.targetY) - 100

    torch.x = (1 - t) * (1 - t) * torch.x + 2 * (1 - t) * t * controlX + t * t * torch.targetX
    torch.y = (1 - t) * (1 - t) * torch.y + 2 * (1 - t) * t * controlY + t * t * torch.targetY

    requestAnimationFrame(animateTorch)
  }

  animateTorch()
}

// 提交祝福
const submitBlessing = () => {
  if (!formData.value.message.trim()) return

  const blessing = {
    id: Date.now(),
    author: formData.value.author || '匿名校友',
    avatar: (formData.value.author || '匿名').charAt(0).toUpperCase(),
    text: formData.value.message,
    time: new Date(),
    timeAgo: '刚刚',
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: 0
  }

  blessings.value.unshift(blessing)

  // 限制显示数量
  if (blessings.value.length > 20) {
    blessings.value = blessings.value.slice(0, 20)
  }

  // 更新统计
  torchCount.value++
  blessingCount.value++

  // 创建火炬传递动画
  createTorch()
  createParticles(canvas.width / 2, canvas.height / 2, 50)

  // 重置表单
  formData.value.author = ''
  formData.value.message = ''
  showBlessingForm.value = false
}

// 模拟实时数据
const simulateActivity = () => {
  // 模拟其他用户的祝福
  setInterval(() => {
    if (Math.random() < 0.3 && blessings.value.length < 20) {
      const mockMessages = [
        '祝母校110周年生日快乐!',
        '河海精神薪火相传!',
        '感恩河海,成就梦想!',
        '艰苦朴素,实事求是!',
        '百十载风雨,薪传不息!',
        '河海儿女,永远自豪!',
        '母校永远在我心中!',
        '河清海晏,长歌奋进!',
        '祝福河海越来越好!',
        '河海加油,未来可期!'
      ]

      const mockNames = ['张三', '李四', '王五', '赵六', '校友', '学子', '老师']

      const blessing = {
        id: Date.now(),
        author: mockNames[Math.floor(Math.random() * mockNames.length)],
        avatar: mockNames[Math.floor(Math.random() * mockNames.length)].charAt(0),
        text: mockMessages[Math.floor(Math.random() * mockMessages.length)],
        time: new Date(),
        timeAgo: '刚刚',
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: 0
      }

      blessings.value.unshift(blessing)
      torchCount.value++
      blessingCount.value++

      createTorch()
    }
  }, 5000)

  // 模拟在线人数波动
  setInterval(() => {
    onlineUsers.value += Math.floor((Math.random() - 0.5) * 10)
    onlineUsers.value = Math.max(50, Math.min(500, onlineUsers.value))
  }, 3000)
}

onMounted(() => {
  initCanvas()
  animate()
  simulateActivity()

  // 初始化一些祝福
  const initialBlessings = [
    { text: '祝母校110周年生日快乐!', author: '校友会' },
    { text: '河海精神代代相传!', author: '85级学子' },
    { text: '感恩母校培育之恩!', author: '2000届毕业生' },
    { text: '艰苦朴素,实事求是!', author: '在校学生' }
  ]

  initialBlessings.forEach((b, index) => {
    setTimeout(() => {
      blessings.value.push({
        id: Date.now() + index,
        author: b.author,
        avatar: b.author.charAt(0),
        text: b.text,
        time: new Date(),
        timeAgo: '刚刚',
        color: colors[index % colors.length],
        delay: index * 100
      })
    }, index * 200)
  })

  // 祝福墙滚动动画
  if (blessingScroll.value) {
    const scrollElement = blessingScroll.value
    let scrollPos = 0
    const scrollSpeed = 0.5
    let isPaused = false

    const scroll = () => {
      if (!isPaused && blessings.value.length > 0) {
        scrollPos += scrollSpeed
        const maxScroll = scrollElement.scrollWidth / 2
        if (scrollPos >= maxScroll) scrollPos = 0
        scrollElement.style.transform = `translateX(-${scrollPos}px)`
      }
      scrollAnimationId = requestAnimationFrame(scroll)
    }
    scroll()

    // 鼠标悬停暂停
    scrollElement.addEventListener('mouseenter', () => { isPaused = true })
    scrollElement.addEventListener('mouseleave', () => { isPaused = false })
  }
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  if (scrollAnimationId) {
    cancelAnimationFrame(scrollAnimationId)
  }
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<style scoped>
.torch-relay-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #F8F5EF 0%, #E5E2DC 100%);
  padding: var(--spacing-3xl) var(--spacing-xl);
}

.relay-visual {
  position: relative;
  width: 100%;
  height: 600px;
  margin-bottom: var(--spacing-3xl);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.relay-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.path-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.animated-torch {
  transition: all 0.3s ease;
}

/* 中心火炬 */
.center-torch {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
}

.torch-flame {
  position: relative;
  width: 80px;
  height: 120px;
  margin-bottom: var(--spacing-md);
}

.flame-core {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 60px;
  background: linear-gradient(to top, #FFD700, #FF7A1A);
  border-radius: 50% 50% 0 0;
  animation: flame-flicker 1.5s infinite;
}

.flame-layer {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50% 50% 0 0;
  animation: flame-dance 2s infinite;
}

.flame-1 {
  width: 50px;
  height: 80px;
  background: radial-gradient(ellipse at center bottom, rgba(255, 122, 26, 0.8), transparent);
  animation-delay: 0s;
}

.flame-2 {
  width: 60px;
  height: 100px;
  background: radial-gradient(ellipse at center bottom, rgba(255, 165, 0, 0.5), transparent);
  animation-delay: 0.3s;
}

.flame-3 {
  width: 70px;
  height: 120px;
  background: radial-gradient(ellipse at center bottom, rgba(255, 200, 50, 0.3), transparent);
  animation-delay: 0.6s;
}

@keyframes flame-flicker {
  0%, 100% { transform: translateX(-50%) scaleY(1); }
  50% { transform: translateX(-50%) scaleY(0.95); }
}

@keyframes flame-dance {
  0%, 100% { transform: translateX(-50%) scaleX(1); }
  25% { transform: translateX(-45%) scaleX(0.95); }
  75% { transform: translateX(-55%) scaleX(0.95); }
}

.torch-handle {
  width: 15px;
  height: 80px;
  background: linear-gradient(to bottom, #8B4513, #654321);
  border-radius: var(--radius-sm);
  margin-bottom: var(--spacing-sm);
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);
}

.torch-base {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-medium);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
}

.torch-number {
  font-size: var(--text-3xl);
  font-weight: 700;
  font-family: var(--font-title);
  color: var(--color-torch-amber);
}

.torch-label {
  font-size: var(--text-sm);
  color: var(--color-ink-black);
  opacity: 0.7;
}

/* 统计栏 */
.stats-bar {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-3xl);
}

.stat-card {
  background: white;
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  transition: all var(--transition-base);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-medium);
}

.stat-card.highlight {
  background: var(--gradient-torch);
  color: white;
}

.stat-icon {
  font-size: 3rem;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: var(--text-3xl);
  font-weight: 700;
  font-family: var(--font-title);
  margin-bottom: var(--spacing-xs);
}

.stat-card.highlight .stat-value {
  color: white;
}

.stat-label {
  font-size: var(--text-sm);
  opacity: 0.7;
}

.stat-card.highlight .stat-label {
  color: white;
  opacity: 0.9;
}

/* 祝福墙 */
.blessing-wall {
  margin-bottom: var(--spacing-3xl);
}

.wall-title {
  font-size: var(--text-3xl);
  font-family: var(--font-title);
  color: var(--color-river-blue);
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.blessing-scroll-container {
  overflow: hidden;
  position: relative;
  width: 100%;
  padding: var(--spacing-lg) 0;
}

.blessing-scroll-container::before,
.blessing-scroll-container::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100px;
  z-index: 2;
  pointer-events: none;
}

.blessing-scroll-container::before {
  left: 0;
  background: linear-gradient(to right, rgba(248, 245, 239, 1), transparent);
}

.blessing-scroll-container::after {
  right: 0;
  background: linear-gradient(to left, rgba(248, 245, 239, 1), transparent);
}

.blessing-scroll {
  display: flex;
  gap: var(--spacing-lg);
  will-change: transform;
}

.blessing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.blessing-card {
  flex-shrink: 0;
  width: 350px;
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
  color: white;
  transition: all var(--transition-base);
}

.blessing-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-strong);
}

.blessing-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.blessing-avatar {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: var(--text-lg);
}

.blessing-author {
  font-weight: 600;
  font-size: var(--text-base);
}

.blessing-content {
  font-size: var(--text-base);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
  opacity: 0.95;
}

.blessing-footer {
  font-size: var(--text-xs);
  opacity: 0.7;
}

/* 点燃按钮 */
.ignite-button {
  position: fixed;
  bottom: var(--spacing-2xl);
  right: var(--spacing-2xl);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: var(--text-base);
  font-weight: 700;
  color: white;
  background: var(--gradient-torch);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-strong);
  transition: all var(--transition-base);
  z-index: 100;
}

.ignite-button:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 20px 40px rgba(255, 122, 26, 0.4);
}

.button-icon {
  width: 24px;
  height: 24px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse-icon 2s infinite;
}

.button-icon svg {
  width: 16px;
  height: 16px;
}

@keyframes pulse-icon {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* 弹窗 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--spacing-xl);
}

.blessing-modal {
  position: relative;
  width: 100%;
  max-width: 500px;
  max-height: 85vh;
  background: white;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-strong);
  overflow-y: auto;
}

.modal-close {
  position: absolute;
  top: var(--spacing-lg);
  right: var(--spacing-lg);
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background: var(--color-page-ivory);
  font-size: var(--text-2xl);
  line-height: 1;
  z-index: 1;
  transition: all var(--transition-base);
}

.modal-close:hover {
  background: var(--color-torch-amber);
  color: white;
  transform: rotate(90deg);
}

.modal-header {
  background: var(--gradient-torch);
  color: white;
  padding: var(--spacing-2xl);
  text-align: center;
}

.modal-torch-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-sm);
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.modal-header h3 {
  font-size: var(--text-2xl);
  font-family: var(--font-title);
  margin-bottom: var(--spacing-xs);
}

.modal-header p {
  opacity: 0.9;
  font-size: var(--text-sm);
}

.modal-body {
  padding: var(--spacing-2xl);
}

.form-input,
.form-textarea {
  width: 100%;
  padding: var(--spacing-md);
  font-family: var(--font-body);
  font-size: var(--text-base);
  border: 2px solid var(--color-page-ivory);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-lg);
  transition: border-color var(--transition-base);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--color-river-blue);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.char-counter {
  text-align: right;
  font-size: var(--text-sm);
  color: var(--color-ink-black);
  opacity: 0.6;
  margin-bottom: var(--spacing-lg);
}

.submit-torch-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  font-size: var(--text-lg);
  font-weight: 700;
  color: white;
  background: var(--gradient-torch);
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
}

.submit-torch-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-medium);
}

.submit-torch-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.submit-torch-button svg {
  width: 20px;
  height: 20px;
}

/* 过渡动画 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .blessing-modal,
.modal-leave-active .blessing-modal {
  transition: transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .blessing-modal,
.modal-leave-to .blessing-modal {
  transform: scale(0.9) translateY(20px);
}

.blessing-fade-enter-active {
  animation: float-in 0.6s ease-out;
}

.blessing-fade-leave-active {
  animation: float-out 0.3s ease-in;
}

@keyframes float-out {
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}

/* 响应式 */
@media (max-width: 768px) {
  .torch-relay-container {
    padding: var(--spacing-xl) var(--spacing-md);
  }

  .relay-visual {
    height: 400px;
  }

  .stats-bar {
    grid-template-columns: 1fr;
  }

  .blessing-card {
    width: 300px;
  }

  .ignite-button {
    bottom: var(--spacing-xl);
    right: var(--spacing-xl);
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: var(--text-base);
  }

  .button-icon {
    width: 28px;
    height: 28px;
  }

  .torch-flame {
    width: 60px;
    height: 90px;
  }

  .flame-core {
    width: 20px;
    height: 40px;
  }
}
</style>
