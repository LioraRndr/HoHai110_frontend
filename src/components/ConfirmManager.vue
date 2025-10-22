<template>
  <ConfirmDialog
    ref="dialogRef"
    :title="currentDialog.title"
    :message="currentDialog.message"
    :type="currentDialog.type"
    :confirm-text="currentDialog.confirmText"
    :cancel-text="currentDialog.cancelText"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  />
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import ConfirmDialog from './ConfirmDialog.vue'
import { $message } from '@/utils/message.js'

const dialogRef = ref(null)
const currentDialog = reactive({
  title: '确认',
  message: '',
  type: 'warning',
  confirmText: '确定',
  cancelText: '取消',
  onConfirm: null,
  onCancel: null
})

const showConfirm = (options) => {
  Object.assign(currentDialog, {
    title: options.title || '确认',
    message: options.message || '',
    type: options.type || 'warning',
    confirmText: options.confirmText || '确定',
    cancelText: options.cancelText || '取消',
    onConfirm: options.onConfirm || null,
    onCancel: options.onCancel || null
  })

  if (dialogRef.value) {
    dialogRef.value.show()
  }
}

const handleConfirm = () => {
  if (currentDialog.onConfirm) {
    currentDialog.onConfirm()
  }
}

const handleCancel = () => {
  if (currentDialog.onCancel) {
    currentDialog.onCancel()
  }
}

// 注册到全局消息服务
onMounted(() => {
  $message.setConfirmComponent({
    showConfirm
  })
})

defineExpose({
  showConfirm
})
</script>
