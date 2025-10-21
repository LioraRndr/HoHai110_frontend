<template>
  <div class="future-message">
    <div class="message-header">
      <p class="message-intro">「现在,轮到你了,后来的火种。」</p>
      <p class="message-subtitle">你的每一次探索,都在为这条奔涌的长河,注入新的流向。</p>
      <p class="message-call">请在此处,留下你的名字与誓言。它将被铭刻于学校的数字星空,与万千前辈,一同闪耀。</p>
    </div>

    <div class="message-form-container">
      <form @submit.prevent="handleSubmit" class="pledge-form">
        <div class="form-group">
          <label for="name">姓名</label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            placeholder="请输入您的姓名"
            required
          />
        </div>

        <div class="form-group">
          <label for="class">届别/单位</label>
          <input
            type="text"
            id="class"
            v-model="formData.class"
            placeholder="如: 2018级水利工程 或 河海校友"
            required
          />
        </div>

        <div class="form-group">
          <label for="pledge">您的誓言</label>
          <textarea
            id="pledge"
            v-model="formData.pledge"
            placeholder="请写下您对河海、对未来的承诺与期许..."
            rows="6"
            required
          ></textarea>
          <span class="char-count">{{ formData.pledge.length }}/500</span>
        </div>

        <button type="submit" class="submit-btn" :disabled="submitting">
          <span v-if="!submitting">点亮星火</span>
          <span v-else>提交中...</span>
          <div class="btn-flame" v-if="!submitting">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2c1.5 3.5 3.5 5.5 5.5 7.5 1.5 1.5 2.5 3.5 2.5 5.5 0 4.4-3.6 8-8 8s-8-3.6-8-8c0-2 1-4 2.5-5.5C8.5 7.5 10.5 5.5 12 2z"/>
            </svg>
          </div>
        </button>
      </form>

      <!-- 最新星火 - 弹幕效果 -->
      <div class="recent-pledges">
        <h3 class="pledges-title">最新星火</h3>
        <div class="danmaku-container" ref="danmakuContainer">
          <div
            v-for="item in danmakuItems"
            :key="item.id"
            class="danmaku-item"
            :style="item.style"
            @click="showPledgeDetail(item.pledge)"
          >
            <div class="danmaku-avatar">{{ item.pledge.name.charAt(0) }}</div>
            <div class="danmaku-content">
              <span class="danmaku-name">{{ item.pledge.name }}</span>
              <span class="danmaku-message">{{ item.pledge.pledge }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 成功提示模态框 -->
    <div class="modal" v-if="showModal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2c1.5 3.5 3.5 5.5 5.5 7.5 1.5 1.5 2.5 3.5 2.5 5.5 0 4.4-3.6 8-8 8s-8-3.6-8-8c0-2 1-4 2.5-5.5C8.5 7.5 10.5 5.5 12 2z"/>
          </svg>
        </div>
        <h3 class="modal-title">「你的星火,已汇入河海百十星河。」</h3>
        <p class="modal-message">感谢您的参与,您的誓言已被永久铭记!</p>
        <button @click="closeModal" class="modal-btn">继续探索</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { futureMessageAPI } from '@/api'
import { showError, showWarning, showInfo } from '@/utils/message'

const formData = ref({
  name: '',
  class: '',
  pledge: ''
})

const submitting = ref(false)
const showModal = ref(false)
const recentPledges = ref([])
const danmakuContainer = ref(null)
const danmakuItems = ref([])
let danmakuId = 0
let danmakuInterval = null

// 弹幕轨道配置
const TRACK_COUNT = 4 // 4条轨道
const TRACK_HEIGHT = 80 // 每条轨道高度
const MIN_INTERVAL = 1500 // 最小发射间隔1.5秒
const MAX_INTERVAL = 2500 // 最大发射间隔2.5秒
const ANIMATION_DURATION = 12 // 动画时长12秒（加快速度）
const CONTAINER_WIDTH = 1200 // 假设容器宽度

// 跟踪每条轨道上的弹幕
const trackOccupancy = ref([])

// 初始化轨道占用情况
const initTracks = () => {
  trackOccupancy.value = Array(TRACK_COUNT).fill(null).map(() => [])
}

// 检查轨道是否可以发射新弹幕
const canAddToTrack = (track, estimatedWidth) => {
  const trackItems = trackOccupancy.value[track]
  if (trackItems.length === 0) return true

  // 获取该轨道最后一个弹幕
  const lastItem = trackItems[trackItems.length - 1]
  const now = Date.now()
  const elapsed = (now - lastItem.startTime) / 1000 // 秒

  // 计算最后一个弹幕已经移动的距离（百分比）
  const progress = elapsed / lastItem.duration
  const movedDistance = progress * (CONTAINER_WIDTH + estimatedWidth)

  // 如果最后一个弹幕已经移动了足够的距离（留出安全间距）
  const safeDistance = estimatedWidth + 100 // 弹幕宽度 + 100px间距
  return movedDistance >= safeDistance
}

// 查找可用轨道
const findAvailableTrack = (estimatedWidth) => {
  // 随机打乱轨道顺序，避免总是使用相同轨道
  const tracks = Array.from({ length: TRACK_COUNT }, (_, i) => i)
  for (let i = tracks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[tracks[i], tracks[j]] = [tracks[j], tracks[i]]
  }

  // 查找第一个可用的轨道
  for (const track of tracks) {
    if (canAddToTrack(track, estimatedWidth)) {
      return track
    }
  }

  // 如果所有轨道都占用，返回占用最少的轨道
  return tracks.reduce((minTrack, track) => {
    return trackOccupancy.value[track].length < trackOccupancy.value[minTrack].length
      ? track
      : minTrack
  })
}

// 创建弹幕项
const createDanmakuItem = (pledge, track, duration) => {
  const id = ++danmakuId
  const startTime = Date.now()

  // 记录到轨道占用信息
  const itemInfo = {
    id: `danmaku-${id}`,
    startTime,
    duration,
    estimatedWidth: pledge.pledge.length * 14 + 100 // 估算宽度
  }
  trackOccupancy.value[track].push(itemInfo)

  return {
    id: itemInfo.id,
    pledge,
    track,
    style: {
      top: `${track * TRACK_HEIGHT + 20}px`,
      animationDuration: `${duration}s`
    }
  }
}

// 清理已完成的轨道占用信息
const cleanupTrack = (itemId) => {
  for (let track = 0; track < TRACK_COUNT; track++) {
    const index = trackOccupancy.value[track].findIndex(item => item.id === itemId)
    if (index !== -1) {
      trackOccupancy.value[track].splice(index, 1)
      break
    }
  }
}

// 添加新弹幕
const addDanmaku = (initialDelay = 0) => {
  if (recentPledges.value.length === 0) return

  // 随机选择一条寄语
  const randomIndex = Math.floor(Math.random() * recentPledges.value.length)
  const pledge = recentPledges.value[randomIndex]

  // 估算弹幕宽度
  const estimatedWidth = pledge.pledge.length * 14 + 100

  // 查找可用轨道
  const track = findAvailableTrack(estimatedWidth)

  // 随机动画时长（增加变化）
  const duration = ANIMATION_DURATION + Math.random() * 3 // 12-15秒

  // 创建弹幕项
  const item = createDanmakuItem(pledge, track, duration)

  // 如果有初始延迟，调整动画延迟
  if (initialDelay > 0) {
    item.style.animationDelay = `-${initialDelay}s` // 负延迟让动画从中间开始
  }

  danmakuItems.value.push(item)

  // 动画结束后移除（完全离开窗口）
  setTimeout(() => {
    const index = danmakuItems.value.findIndex(i => i.id === item.id)
    if (index !== -1) {
      danmakuItems.value.splice(index, 1)
    }
    cleanupTrack(item.id)
  }, (duration - initialDelay) * 1000 + 500)
}

// 启动弹幕效果
const startDanmaku = () => {
  if (recentPledges.value.length === 0) return

  // 初始化轨道
  initTracks()

  // 初始添加8-12个弹幕，分布在不同位置（使用负延迟让它们出现在不同位置）
  const initialCount = 10
  for (let i = 0; i < initialCount; i++) {
    // 随机初始位置（0-8秒的延迟，让弹幕分散在整个屏幕）
    const initialDelay = Math.random() * 8
    setTimeout(() => {
      addDanmaku(initialDelay)
    }, i * 100) // 每个间隔100ms添加，避免同时创建太多
  }

  // 定期添加新弹幕
  const scheduleNext = () => {
    const interval = MIN_INTERVAL + Math.random() * (MAX_INTERVAL - MIN_INTERVAL)
    danmakuInterval = setTimeout(() => {
      addDanmaku(0) // 新弹幕从右侧外开始
      scheduleNext()
    }, interval)
  }

  // 1秒后开始持续添加新弹幕
  setTimeout(() => {
    scheduleNext()
  }, 1000)
}

// 停止弹幕
const stopDanmaku = () => {
  if (danmakuInterval) {
    clearTimeout(danmakuInterval)
    danmakuInterval = null
  }
}

// 显示寄语详情
const showPledgeDetail = (pledge) => {
  showInfo(`${pledge.name}的寄语: ${pledge.pledge}`)
}

// 获取最新的誓言
const fetchRecentPledges = async () => {
  try {
    const response = await futureMessageAPI.getMessages({ limit: 20, sort: 'latest' })
    if (response.success) {
      // 转换数据格式以适配现有UI
      recentPledges.value = response.data.messages.map(msg => ({
        name: msg.name,
        class: msg.grade,
        pledge: msg.message,
        createdAt: msg.createdAt
      }))
      startDanmaku()
    }
  } catch (error) {
    console.error('获取最新誓言失败:', error)
    // 使用模拟数据
    recentPledges.value = [
      {
        name: '张明',
        class: '2018级水利工程',
        pledge: '我将继承河海精神,为祖国的水利事业贡献青春力量!',
        createdAt: new Date().toISOString()
      },
      {
        name: '李华',
        class: '2015级港口航道',
        pledge: '感恩母校,愿河海精神薪火相传,百年再续辉煌!',
        createdAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        name: '王芳',
        class: '2020级环境工程',
        pledge: '以水为志,以梦为马,不负韶华,不负河海!',
        createdAt: new Date(Date.now() - 7200000).toISOString()
      },
      {
        name: '陈伟',
        class: '2019级土木工程',
        pledge: '传承百十载薪火,书写新时代华章!',
        createdAt: new Date(Date.now() - 10800000).toISOString()
      },
      {
        name: '刘洋',
        class: '2021级计算机科学',
        pledge: '以代码为笔,以创新为墨,绘制河海未来蓝图!',
        createdAt: new Date(Date.now() - 14400000).toISOString()
      },
      {
        name: '赵敏',
        class: '2020级环境科学',
        pledge: '守护绿水青山,筑梦美丽中国!',
        createdAt: new Date(Date.now() - 18000000).toISOString()
      },
      {
        name: '孙杰',
        class: '2017级港口航道',
        pledge: '乘风破浪,勇立潮头,为海洋强国贡献力量!',
        createdAt: new Date(Date.now() - 21600000).toISOString()
      },
      {
        name: '周婷',
        class: '2019级水文水资源',
        pledge: '治水兴邦,永续发展,河海精神代代相传!',
        createdAt: new Date(Date.now() - 25200000).toISOString()
      },
      {
        name: '吴强',
        class: '2022级土木工程',
        pledge: '秉承百年传统,开创崭新未来!',
        createdAt: new Date(Date.now() - 28800000).toISOString()
      },
      {
        name: '郑丽',
        class: '2018级水利水电',
        pledge: '让青春在奋斗中闪光,让梦想在河海起航!',
        createdAt: new Date(Date.now() - 32400000).toISOString()
      }
    ]
    startDanmaku()
  }
}

// 提交表单
const handleSubmit = async () => {
  if (formData.value.pledge.length > 500) {
    showWarning('誓言内容不能超过500字')
    return
  }

  submitting.value = true

  try {
    const response = await futureMessageAPI.createMessage({
      name: formData.value.name,
      grade: formData.value.class,
      message: formData.value.pledge
    })

    if (response.success) {
      // 显示成功模态框
      showModal.value = true

      // 重置表单
      formData.value = {
        name: '',
        class: '',
        pledge: ''
      }

      // 刷新最新誓言列表
      stopDanmaku()
      await fetchRecentPledges()
    }
  } catch (error) {
    console.error('提交失败:', error)
    showError('提交失败,请稍后重试：' + error.message)
  } finally {
    submitting.value = false
  }
}

// 关闭模态框
const closeModal = () => {
  showModal.value = false
}

onMounted(() => {
  fetchRecentPledges()
})

onUnmounted(() => {
  stopDanmaku()
})
</script>

<style scoped>
.future-message {
  width: 100%;
  padding: var(--spacing-3xl) 0;
  background: linear-gradient(
    180deg,
    rgba(10, 106, 184, 0.05) 0%,
    rgba(255, 122, 26, 0.05) 100%
  );
}

.message-header {
  text-align: center;
  margin-bottom: var(--spacing-3xl);
  padding: 0 var(--spacing-lg);
}

.message-intro {
  font-size: var(--text-3xl);
  font-family: var(--font-title);
  color: var(--color-river-blue);
  line-height: 1.8;
  margin-bottom: var(--spacing-md);
}

.message-subtitle {
  font-size: var(--text-xl);
  color: var(--color-ink-black);
  line-height: 1.8;
  margin-bottom: var(--spacing-md);
}

.message-call {
  font-size: var(--text-lg);
  color: var(--color-torch-amber);
  line-height: 1.8;
  max-width: 900px;
  margin: 0 auto;
}

/* 表单容器 */
.message-form-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-3xl);
}

/* 誓言表单 */
.pledge-form {
  background: white;
  padding: var(--spacing-2xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-medium);
}

.form-group {
  margin-bottom: var(--spacing-xl);
  position: relative;
}

.form-group label {
  display: block;
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-ink-black);
  margin-bottom: var(--spacing-sm);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: var(--spacing-md);
  font-size: var(--text-base);
  font-family: var(--font-body);
  color: var(--color-ink-black);
  background: white;
  border: 2px solid rgba(10, 106, 184, 0.2);
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-river-blue);
  box-shadow: 0 0 0 3px rgba(10, 106, 184, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.char-count {
  position: absolute;
  right: var(--spacing-sm);
  bottom: calc(-1 * var(--spacing-lg));
  font-size: var(--text-xs);
  color: rgba(14, 14, 16, 0.5);
}

/* 提交按钮 */
.submit-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg) var(--spacing-2xl);
  font-size: var(--text-xl);
  font-weight: 600;
  font-family: var(--font-title);
  color: white;
  background: var(--gradient-torch);
  border-radius: var(--radius-full);
  box-shadow: 0 8px 32px rgba(255, 122, 26, 0.4);
  transition: all var(--transition-base);
}

.submit-btn:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 48px rgba(255, 122, 26, 0.6);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-flame {
  width: 24px;
  height: 24px;
  animation: flameFlicker 1.5s infinite;
}

.btn-flame svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.8));
}

@keyframes flameFlicker {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.15);
  }
}

/* 最新星火 - 弹幕容器 */
.recent-pledges {
  background: linear-gradient(135deg, #0a1929 0%, #1a237e 100%);
  padding: var(--spacing-2xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-medium);
  position: relative;
  overflow: hidden;
  min-height: 400px;
}

.pledges-title {
  font-size: var(--text-2xl);
  font-family: var(--font-title);
  color: white;
  margin-bottom: var(--spacing-lg);
  text-align: center;
  position: relative;
  z-index: 1;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

/* 弹幕容器 */
.danmaku-container {
  position: relative;
  width: 100%;
  height: 340px;
  overflow: hidden;
}

/* 弹幕项 */
.danmaku-item {
  position: absolute;
  right: -100%; /* 从窗口右侧外部开始 */
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-lg);
  background: rgba(255, 255, 255, 0.95);
  border-radius: var(--radius-full);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  white-space: nowrap;
  animation: danmakuScroll linear forwards;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 600px;
}

/* 弹幕滚动动画 - 从右侧窗口外到左侧窗口外 */
@keyframes danmakuScroll {
  0% {
    right: -100%;
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  95% {
    opacity: 1;
  }
  100% {
    right: 100%; /* 完全离开左侧窗口 */
    opacity: 0;
  }
}

.danmaku-item:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(10, 106, 184, 0.3);
  animation-play-state: paused;
  z-index: 10;
}

.danmaku-avatar {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  background: var(--gradient-torch);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: var(--text-sm);
  box-shadow: 0 2px 8px rgba(255, 122, 26, 0.4);
}

.danmaku-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  max-width: 520px;
}

.danmaku-name {
  font-weight: 600;
  color: var(--color-river-blue);
  font-size: var(--text-sm);
}

.danmaku-message {
  font-size: var(--text-sm);
  color: var(--color-ink-black);
  opacity: 0.85;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 模态框 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  background: white;
  padding: var(--spacing-3xl);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-strong);
  max-width: 500px;
  text-align: center;
  animation: scaleIn 0.3s ease-out;
}

@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.success-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto var(--spacing-xl);
  color: var(--color-torch-amber);
  animation: iconPulse 1s infinite;
}

.success-icon svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
  filter: drop-shadow(0 0 12px rgba(255, 122, 26, 0.6));
}

@keyframes iconPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.modal-title {
  font-size: var(--text-2xl);
  font-family: var(--font-title);
  color: var(--color-river-blue);
  margin-bottom: var(--spacing-md);
}

.modal-message {
  font-size: var(--text-base);
  color: var(--color-ink-black);
  margin-bottom: var(--spacing-2xl);
}

.modal-btn {
  padding: var(--spacing-md) var(--spacing-2xl);
  font-size: var(--text-base);
  font-weight: 600;
  color: white;
  background: var(--gradient-river);
  border-radius: var(--radius-full);
  transition: all var(--transition-base);
}

.modal-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-medium);
}

/* 响应式 */
@media (max-width: 1024px) {
  .message-form-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .message-intro {
    font-size: var(--text-2xl);
  }

  .message-subtitle {
    font-size: var(--text-lg);
  }

  .message-call {
    font-size: var(--text-base);
  }

  .pledge-form,
  .recent-pledges {
    padding: var(--spacing-xl);
  }

  .modal-content {
    margin: var(--spacing-lg);
    padding: var(--spacing-2xl);
  }
}
</style>
