<template>
  <div class="blessing-card">
    <!-- 顶部渐变装饰条 -->
    <div class="top-gradient"></div>

    <!-- 卡片头部 -->
    <div class="card-header">
      <div class="author-info">
        <div class="avatar-wrapper">
          <div class="avatar">
            {{ getAvatarText }}
          </div>
          <div class="avatar-ring"></div>
        </div>
        <div class="author-details-wrapper">
          <span class="author-name">
            {{ blessing.isAnonymous ? blessingCard.anonymous : blessing.authorName }}
          </span>
          <div v-if="!blessing.isAnonymous" class="author-details">
            <span v-if="blessing.graduationYear" class="graduation-year">
              <span class="detail-icon">🎓</span>
              {{ blessing.graduationYear }}{{ blessingCard.graduationYear }}
            </span>
            <span v-if="blessing.department" class="department">
              <span class="detail-icon">🏫</span>
              {{ blessing.department }}
            </span>
          </div>
        </div>
      </div>
      <div v-if="canModify" class="card-actions">
        <button @click="$emit('edit', blessing)" class="action-btn edit-btn" :title="blessingCard.editTitle">
          <span class="btn-icon">✏️</span>
        </button>
        <button @click="$emit('delete', blessing.id)" class="action-btn delete-btn" :title="blessingCard.deleteTitle">
          <span class="btn-icon">🗑️</span>
        </button>
      </div>
    </div>

    <!-- 卡片内容 -->
    <div class="card-content">
      <div class="quote-mark opening">"</div>
      <p class="blessing-text">{{ blessing.content }}</p>
      <div class="quote-mark closing">"</div>
    </div>

    <!-- 卡片底部 -->
    <div class="card-footer">
      <div class="meta-info">
        <span class="date">
          <span class="meta-icon">🕒</span>
          {{ formatDate(blessing.createdAt) }}
        </span>
      </div>
      <div class="actions">
        <button
          v-if="isLoggedIn"
          @click="toggleLike"
          class="like-btn"
          :class="{ liked: blessing.isLiked }"
        >
          <span class="like-icon" :class="{ pulse: blessing.isLiked }">
            {{ blessing.isLiked ? '❤️' : '🤍' }}
          </span>
          <span class="like-count">{{ blessing.likes || 0 }}</span>
          <div v-if="blessing.isLiked" class="heart-particles">
            <span class="particle" v-for="i in 6" :key="i"></span>
          </div>
        </button>
        <div v-else class="like-display">
          <span class="like-icon">🤍</span>
          <span class="like-count">{{ blessing.likes || 0 }}</span>
        </div>
      </div>
    </div>

    <!-- 状态标签 -->
    <transition name="badge">
      <div v-if="blessing.status !== 'approved'" class="status-badge" :class="blessing.status">
        <span class="badge-icon">{{ statusIcon }}</span>
        {{ statusText }}
      </div>
    </transition>

    <!-- 背景装饰 -->
    <div class="card-bg-decoration">
      <div class="decoration-circle circle-1"></div>
      <div class="decoration-circle circle-2"></div>
      <div class="decoration-circle circle-3"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useBlessingsData } from '@/composables/useBlessingsData'

const { locale } = useI18n()
const { blessingCard } = useBlessingsData()

const props = defineProps({
  blessing: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['like', 'unlike', 'delete', 'edit'])

const isLoggedIn = computed(() => {
  return !!localStorage.getItem('token')
})

const canModify = computed(() => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  return user.id === props.blessing.userId || user.role === 'admin'
})

const statusText = computed(() => {
  return blessingCard.value.status[props.blessing.status] || props.blessing.status
})

const statusIcon = computed(() => {
  const iconMap = {
    pending: '⏳',
    rejected: '❌',
    approved: '✅'
  }
  return iconMap[props.blessing.status] || ''
})

const getAvatarText = computed(() => {
  if (props.blessing.isAnonymous) {
    return locale.value === 'zh' ? '匿' : 'A'
  }
  return props.blessing.authorName ? props.blessing.authorName.charAt(0) : '?'
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now - date
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 7) {
    return date.toLocaleDateString(locale.value === 'zh' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } else if (days > 0) {
    return `${days} ${blessingCard.value.timeFormat.daysAgo}`
  } else if (hours > 0) {
    return `${hours} ${blessingCard.value.timeFormat.hoursAgo}`
  } else if (minutes > 0) {
    return `${minutes} ${blessingCard.value.timeFormat.minutesAgo}`
  } else {
    return blessingCard.value.timeFormat.justNow
  }
}

const toggleLike = () => {
  if (props.blessing.isLiked) {
    emit('unlike', props.blessing.id)
  } else {
    emit('like', props.blessing.id)
  }
}
</script>

<style scoped>
/* === 卡片基础（浅色主题） === */
.blessing-card {
  position: relative;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 250, 255, 0.95) 100%);
  border: 1px solid rgba(74, 144, 226, 0.2);
  border-radius: 16px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.08);
}

.blessing-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(74, 144, 226, 0.05), rgba(92, 163, 214, 0.03));
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.blessing-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 15px 45px rgba(74, 144, 226, 0.2), 0 5px 15px rgba(0, 0, 0, 0.05);
  border-color: rgba(74, 144, 226, 0.4);
}

.blessing-card:hover::before {
  opacity: 1;
}

/* 顶部装饰条 */
.top-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #4A90E2, #5CB3FF, #4A90E2);
  background-size: 200% 100%;
  opacity: 0;
  transition: opacity 0.4s ease;
  animation: gradientShift 3s ease-in-out infinite;
}

.blessing-card:hover .top-gradient {
  opacity: 1;
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* === 卡片头部 === */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
}

.author-info {
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

/* 头像 */
.avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #4A90E2, #5CB3FF);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.3rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.blessing-card:hover .avatar {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 6px 16px rgba(74, 144, 226, 0.5);
}

.avatar-ring {
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  border: 2px solid rgba(74, 144, 226, 0.3);
  border-radius: 50%;
  opacity: 0;
  transition: all 0.3s ease;
}

.blessing-card:hover .avatar-ring {
  opacity: 1;
  animation: ringPulse 2s ease-in-out infinite;
}

@keyframes ringPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.6;
  }
}

/* 作者信息 */
.author-details-wrapper {
  flex: 1;
}

.author-name {
  display: block;
  font-weight: 700;
  color: #2c3e50;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.blessing-card:hover .author-name {
  color: #4A90E2;
}

.author-details {
  display: flex;
  gap: 0.75rem;
  font-size: 0.85rem;
  flex-wrap: wrap;
}

.graduation-year,
.department {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.7rem;
  background: rgba(74, 144, 226, 0.1);
  border: 1px solid rgba(74, 144, 226, 0.25);
  border-radius: 12px;
  color: #34495e;
  transition: all 0.3s ease;
}

.blessing-card:hover .graduation-year,
.blessing-card:hover .department {
  background: rgba(74, 144, 226, 0.15);
  border-color: rgba(74, 144, 226, 0.4);
  transform: translateY(-2px);
}

.detail-icon {
  font-size: 0.9rem;
}

/* 操作按钮 */
.card-actions {
  display: flex;
  gap: 0.5rem;
  position: relative;
  z-index: 2;
}

.action-btn {
  width: 2.2rem;
  height: 2.2rem;
  padding: 0;
  background: rgba(74, 144, 226, 0.08);
  border: 1px solid rgba(74, 144, 226, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover {
  transform: translateY(-2px) scale(1.1);
}

.edit-btn:hover {
  background: rgba(74, 144, 226, 0.25);
  border-color: rgba(74, 144, 226, 0.4);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
}

.delete-btn:hover {
  background: rgba(255, 107, 107, 0.25);
  border-color: rgba(255, 107, 107, 0.4);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
}

.btn-icon {
  display: block;
}

/* === 卡片内容 === */
.card-content {
  position: relative;
  margin-bottom: 1.5rem;
  padding: 1rem 0;
  z-index: 1;
}

.quote-mark {
  position: absolute;
  font-size: 4rem;
  font-family: Georgia, serif;
  color: rgba(74, 144, 226, 0.15);
  line-height: 1;
  pointer-events: none;
  transition: all 0.4s ease;
}

.quote-mark.opening {
  top: -0.5rem;
  left: -0.5rem;
}

.quote-mark.closing {
  bottom: -1rem;
  right: -0.5rem;
  transform: rotate(180deg);
}

.blessing-card:hover .quote-mark {
  color: rgba(74, 144, 226, 0.25);
  transform: scale(1.1);
}

.blessing-card:hover .quote-mark.closing {
  transform: rotate(180deg) scale(1.1);
}

.blessing-text {
  position: relative;
  color: #2c3e50;
  font-size: 1rem;
  line-height: 1.8;
  font-style: italic;
  font-weight: 400;
  letter-spacing: 0.3px;
  white-space: pre-wrap;
  word-wrap: break-word;
  min-height: 50px;
  padding: 0 1rem;
  text-align: justify;
}

/* === 卡片底部 === */
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(74, 144, 226, 0.15);
  position: relative;
  z-index: 2;
}

.meta-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.date {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: #7f8c8d;
  transition: color 0.3s ease;
}

.blessing-card:hover .date {
  color: #34495e;
}

.meta-icon {
  font-size: 0.95rem;
}

/* 点赞按钮 */
.actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.like-btn {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  background: rgba(74, 144, 226, 0.08);
  border: 1px solid rgba(74, 144, 226, 0.2);
  border-radius: 20px;
  color: #34495e;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.like-btn:hover {
  background: rgba(74, 144, 226, 0.12);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.15);
}

.like-btn.liked {
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(255, 140, 140, 0.15));
  border-color: rgba(255, 107, 107, 0.4);
  color: #ffb3b3;
}

.like-btn.liked:hover {
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.3), rgba(255, 140, 140, 0.2));
  box-shadow: 0 6px 16px rgba(255, 107, 107, 0.3);
}

.like-icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
  display: inline-block;
}

.like-icon.pulse {
  animation: heartPulse 1s ease-in-out infinite;
}

@keyframes heartPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

.like-count {
  font-size: 0.95rem;
  font-weight: 700;
  min-width: 1.5rem;
  text-align: center;
}

/* 爱心粒子效果 */
.heart-particles {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: radial-gradient(circle, rgba(255, 107, 107, 0.8), transparent);
  border-radius: 50%;
  animation: particleFloat 1.5s ease-out infinite;
}

.particle:nth-child(1) { animation-delay: 0s; transform: rotate(0deg); }
.particle:nth-child(2) { animation-delay: 0.25s; transform: rotate(60deg); }
.particle:nth-child(3) { animation-delay: 0.5s; transform: rotate(120deg); }
.particle:nth-child(4) { animation-delay: 0.75s; transform: rotate(180deg); }
.particle:nth-child(5) { animation-delay: 1s; transform: rotate(240deg); }
.particle:nth-child(6) { animation-delay: 1.25s; transform: rotate(300deg); }

@keyframes particleFloat {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(25px, -25px) scale(1);
  }
}

/* 未登录的点赞显示（浅色主题） */
.like-display {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #7f8c8d;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  background: rgba(74, 144, 226, 0.05);
  border-radius: 20px;
}

.like-display .like-icon {
  font-size: 1.2rem;
}

/* === 状态标签 === */
.status-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  z-index: 3;
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.status-badge.pending {
  background: rgba(255, 193, 7, 0.25);
  color: #ffd54f;
  border: 1px solid rgba(255, 193, 7, 0.4);
}

.status-badge.rejected {
  background: rgba(244, 67, 54, 0.25);
  color: #ff7961;
  border: 1px solid rgba(244, 67, 54, 0.4);
}

.status-badge.approved {
  background: rgba(76, 175, 80, 0.25);
  color: #a5d6a7;
  border: 1px solid rgba(76, 175, 80, 0.4);
}

.badge-icon {
  font-size: 0.9rem;
}

/* 标签过渡动画 */
.badge-enter-active,
.badge-leave-active {
  transition: all 0.3s ease;
}

.badge-enter-from,
.badge-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.8);
}

/* === 背景装饰 === */
.card-bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
  opacity: 0.3;
  transition: opacity 0.4s ease;
}

.blessing-card:hover .card-bg-decoration {
  opacity: 0.5;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(74, 144, 226, 0.15), transparent);
  animation: circleFloat 8s ease-in-out infinite;
}

.circle-1 {
  width: 100px;
  height: 100px;
  top: -50px;
  right: -50px;
  animation-delay: 0s;
}

.circle-2 {
  width: 150px;
  height: 150px;
  bottom: -75px;
  left: -75px;
  animation-delay: 2s;
}

.circle-3 {
  width: 80px;
  height: 80px;
  top: 50%;
  right: 20%;
  animation-delay: 4s;
}

@keyframes circleFloat {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.2;
  }
  50% {
    transform: translate(10px, -10px) scale(1.1);
    opacity: 0.4;
  }
}

/* === 响应式设计 === */
@media (max-width: 768px) {
  .blessing-card {
    padding: 1.5rem;
  }

  .avatar {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.1rem;
  }

  .author-name {
    font-size: 1rem;
  }

  .author-details {
    font-size: 0.8rem;
  }

  .card-content {
    padding: 0.5rem 0;
  }

  .blessing-text {
    font-size: 0.95rem;
    padding: 0 0.5rem;
  }

  .quote-mark {
    font-size: 3rem;
  }

  .action-btn {
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
  }

  .status-badge {
    padding: 0.3rem 0.8rem;
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .blessing-card {
    padding: 1.2rem;
  }

  .blessing-text {
    font-size: 0.9rem;
  }

  .like-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  }

  .date {
    font-size: 0.8rem;
  }
}
</style>
