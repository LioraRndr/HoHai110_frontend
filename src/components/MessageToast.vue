<template>
  <teleport to="body">
    <transition-group name="toast" tag="div" class="toast-container">
      <div
        v-for="message in messages"
        :key="message.id"
        :class="['toast', `toast-${message.type}`]"
        @click="removeMessage(message.id)"
      >
        <div class="toast-icon">
          <component :is="getIcon(message.type)" />
        </div>
        <div class="toast-content">
          <div class="toast-title" v-if="message.title">{{ message.title }}</div>
          <div class="toast-message">{{ message.message }}</div>
        </div>
        <button class="toast-close" @click.stop="removeMessage(message.id)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </transition-group>
  </teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 消息列表
const messages = ref([])

// 图标组件
const SuccessIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="20,6 9,17 4,12"></polyline>
    </svg>
  `
}

const ErrorIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="15" y1="9" x2="9" y2="15"></line>
      <line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>
  `
}

const WarningIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  `
}

const InfoIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  `
}

// 获取对应类型的图标
const getIcon = (type) => {
  const icons = {
    success: SuccessIcon,
    error: ErrorIcon,
    warning: WarningIcon,
    info: InfoIcon
  }
  return icons[type] || InfoIcon
}

// 添加消息
const addMessage = (message, type = 'info', title = '', duration = 4000) => {
  const id = Date.now() + Math.random()
  const newMessage = {
    id,
    message,
    type,
    title,
    duration
  }

  messages.value.push(newMessage)

  // 自动移除消息
  if (duration > 0) {
    setTimeout(() => {
      removeMessage(id)
    }, duration)
  }

  return id
}

// 移除消息
const removeMessage = (id) => {
  const index = messages.value.findIndex(msg => msg.id === id)
  if (index > -1) {
    messages.value.splice(index, 1)
  }
}

// 清空所有消息
const clearAll = () => {
  messages.value = []
}

// 暴露方法给全局使用
const showSuccess = (message, title = '成功', duration = 4000) => {
  return addMessage(message, 'success', title, duration)
}

const showError = (message, title = '错误', duration = 6000) => {
  return addMessage(message, 'error', title, duration)
}

const showWarning = (message, title = '警告', duration = 5000) => {
  return addMessage(message, 'warning', title, duration)
}

const showInfo = (message, title = '提示', duration = 4000) => {
  return addMessage(message, 'info', title, duration)
}

// 监听全局事件
onMounted(() => {
  // 监听全局消息事件
  window.addEventListener('show-toast', handleGlobalToast)
})

onUnmounted(() => {
  window.removeEventListener('show-toast', handleGlobalToast)
})

const handleGlobalToast = (event) => {
  const { message, type, title, duration } = event.detail
  addMessage(message, type, title, duration)
}

// 暴露方法供组件实例使用
defineExpose({
  showSuccess,
  showError,
  showWarning,
  showInfo,
  clearAll,
  removeMessage
})
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 90px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;
}

.toast {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  min-width: 320px;
  max-width: 480px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border-left: 4px solid;
  cursor: pointer;
  pointer-events: auto;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast:hover {
  transform: translateX(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.toast-success {
  border-left-color: #10b981;
  background: rgba(220, 252, 231, 0.98);
}

.toast-error {
  border-left-color: #ef4444;
  background: rgba(254, 226, 226, 0.98);
}

.toast-warning {
  border-left-color: #f59e0b;
  background: rgba(254, 243, 199, 0.98);
}

.toast-info {
  border-left-color: #3b82f6;
  background: rgba(219, 234, 254, 0.98);
}

.toast-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  margin-top: 2px;
}

.toast-success .toast-icon {
  color: #059669;
}

.toast-error .toast-icon {
  color: #dc2626;
}

.toast-warning .toast-icon {
  color: #d97706;
}

.toast-info .toast-icon {
  color: #2563eb;
}

.toast-content {
  flex: 1;
  min-width: 0;
}

.toast-title {
  font-weight: 600;
  font-size: 14px;
  color: #111827;
  margin-bottom: 4px;
  line-height: 1.4;
}

.toast-message {
  font-size: 14px;
  color: #1f2937;
  line-height: 1.5;
  word-wrap: break-word;
}

.toast-close {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  background: none;
  border: none;
  color: #4b5563;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
}

.toast-close:hover {
  color: #1f2937;
  background: rgba(0, 0, 0, 0.1);
}

.toast-close svg {
  width: 14px;
  height: 14px;
}

/* 过渡动画 */
.toast-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

.toast-move {
  transition: transform 0.3s ease;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .toast-container {
    top: 70px;
    right: 10px;
    left: 10px;
  }

  .toast {
    min-width: auto;
    max-width: none;
    width: 100%;
  }

  .toast-enter-from,
  .toast-leave-to {
    transform: translateY(-100%) scale(0.95);
  }
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .toast {
    background: #1f2937;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  .toast-title {
    color: #f9fafb;
  }

  .toast-message {
    color: #d1d5db;
  }

  .toast-close {
    color: #6b7280;
  }

  .toast-close:hover {
    color: #9ca3af;
    background: rgba(156, 163, 175, 0.2);
  }

  .toast-success {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%);
  }

  .toast-error {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%);
  }

  .toast-warning {
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%);
  }

  .toast-info {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%);
  }
}
</style>