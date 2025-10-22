<template>
  <Teleport to="body">
    <Transition name="dialog-fade">
      <div v-if="visible" class="confirm-overlay" @click.self="handleCancel">
        <div class="confirm-dialog">
          <div class="dialog-header">
            <div class="header-icon" :class="`icon-${type}`">
              <span v-if="type === 'warning'">⚠️</span>
              <span v-else-if="type === 'danger'">🗑️</span>
              <span v-else-if="type === 'info'">ℹ️</span>
              <span v-else>❓</span>
            </div>
            <h3 class="dialog-title">{{ title }}</h3>
          </div>

          <div class="dialog-body">
            <p class="dialog-message">{{ message }}</p>
          </div>

          <div class="dialog-footer">
            <button
              @click="handleCancel"
              class="dialog-btn btn-cancel"
            >
              {{ cancelText }}
            </button>
            <button
              @click="handleConfirm"
              class="dialog-btn btn-confirm"
              :class="`btn-${type}`"
            >
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '确认'
  },
  message: {
    type: String,
    required: true
  },
  confirmText: {
    type: String,
    default: '确定'
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  type: {
    type: String,
    default: 'warning', // warning, danger, info, default
    validator: (value) => ['warning', 'danger', 'info', 'default'].includes(value)
  }
})

const emit = defineEmits(['confirm', 'cancel', 'close'])

const visible = ref(false)

const show = () => {
  visible.value = true
}

const hide = () => {
  visible.value = false
}

const handleConfirm = () => {
  emit('confirm')
  hide()
}

const handleCancel = () => {
  emit('cancel')
  hide()
}

defineExpose({
  show,
  hide
})
</script>

<style scoped>
.confirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(2px);
}

.confirm-dialog {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 480px;
  width: 90%;
  overflow: hidden;
  animation: dialogSlideUp 0.3s ease;
}

@keyframes dialogSlideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dialog-header {
  padding: 2rem 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.header-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.icon-warning {
  background: rgba(255, 193, 7, 0.15);
}

.icon-danger {
  background: rgba(244, 67, 54, 0.15);
}

.icon-info {
  background: rgba(74, 144, 226, 0.15);
}

.icon-default {
  background: rgba(158, 158, 158, 0.15);
}

.dialog-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.dialog-body {
  padding: 0 2rem 1.5rem;
}

.dialog-message {
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
  text-align: center;
  margin: 0;
}

.dialog-footer {
  padding: 1.5rem 2rem;
  background: #f8f9fa;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.dialog-btn {
  padding: 0.75rem 1.75rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  min-width: 100px;
}

.btn-cancel {
  background: #ffffff;
  color: #666;
  border: 1px solid #d0d0d0;
}

.btn-cancel:hover {
  background: #f8f9fa;
  border-color: #999;
  color: #333;
}

.btn-confirm {
  color: white;
}

.btn-warning {
  background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
}

.btn-warning:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 193, 7, 0.4);
}

.btn-danger {
  background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
}

.btn-danger:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(244, 67, 54, 0.4);
}

.btn-info {
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
}

.btn-info:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.4);
}

.btn-default {
  background: linear-gradient(135deg, #9e9e9e 0%, #757575 100%);
}

.btn-default:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(158, 158, 158, 0.4);
}

.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.3s ease;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}

@media (max-width: 600px) {
  .confirm-dialog {
    width: 95%;
  }

  .dialog-header {
    padding: 1.5rem 1.5rem 1rem;
  }

  .header-icon {
    width: 56px;
    height: 56px;
    font-size: 1.75rem;
  }

  .dialog-title {
    font-size: 1.25rem;
  }

  .dialog-body {
    padding: 0 1.5rem 1rem;
  }

  .dialog-footer {
    padding: 1rem 1.5rem;
    flex-direction: column-reverse;
  }

  .dialog-btn {
    width: 100%;
  }
}
</style>
