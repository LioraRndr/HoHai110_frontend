<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>{{ title }}</h2>
        <button @click="$emit('close')" class="close-btn">✕</button>
      </div>

      <div class="modal-body">
        <div class="form-group">
          <label>标题</label>
          <input
            v-model="postData.title"
            type="text"
            placeholder="输入帖子标题..."
            class="form-input"
            maxlength="200"
          />
          <span class="char-count">{{ postData.title.length }}/200</span>
        </div>

        <div class="form-group">
          <label>内容</label>
          <textarea
            v-model="postData.content"
            placeholder="输入帖子内容..."
            class="form-textarea"
            rows="10"
          ></textarea>
        </div>
      </div>

      <div class="modal-footer">
        <button @click="$emit('close')" class="cancel-btn">取消</button>
        <button
          @click="handleSubmit"
          :disabled="!canSubmit || submitting"
          class="submit-btn"
        >
          {{ submitting ? (isEditMode ? '保存中...' : '发布中...') : (isEditMode ? '保存' : '发布') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { forumAPI } from '@/api'
import { $message } from '@/utils/message.js'

const props = defineProps({
  forumId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    default: '发表新帖'
  },
  post: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'posted', 'updated'])

const postData = ref({
  title: '',
  content: ''
})

const submitting = ref(false)

const isEditMode = computed(() => !!props.post)

const canSubmit = computed(() => {
  return postData.value.title.trim() && postData.value.content.trim()
})

// 初始化编辑数据
onMounted(() => {
  if (props.post) {
    postData.value = {
      title: props.post.title || '',
      content: props.post.content || ''
    }
  }
})

// 提交帖子
const handleSubmit = async () => {
  if (!canSubmit.value || submitting.value) return

  submitting.value = true

  try {
    if (isEditMode.value) {
      // 更新帖子
      await forumAPI.updatePost(props.post.id, {
        title: postData.value.title.trim(),
        content: postData.value.content.trim()
      })
      $message.success('帖子更新成功！')
      emit('updated')
    } else {
      // 创建新帖子
      await forumAPI.createPost({
        forumId: props.forumId,
        title: postData.value.title.trim(),
        content: postData.value.content.trim()
      })
      $message.success('帖子发布成功！')
      emit('posted')
    }
  } catch (error) {
    console.error('操作失败:', error)
    $message.error((isEditMode.value ? '更新' : '发布') + '失败: ' + error.message)
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: #ffffff;
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e0e0e0;
}

.modal-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

.close-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f8f9fa;
  border: none;
  color: #666;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #e9ecef;
  color: #333;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #4A90E2;
}

.char-count {
  display: block;
  text-align: right;
  font-size: 0.85rem;
  color: #999;
  margin-top: 0.25rem;
}

.form-textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.6;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.3s ease;
}

.form-textarea:focus {
  outline: none;
  border-color: #4A90E2;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1.5rem 2rem;
  border-top: 1px solid #e0e0e0;
}

.cancel-btn,
.submit-btn {
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn {
  background: #f8f9fa;
  color: #333;
  border: 1px solid #e0e0e0;
}

.cancel-btn:hover {
  background: #e9ecef;
}

.submit-btn {
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  color: white;
  border: none;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.4);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .modal-body {
    padding: 1.5rem;
  }
}
</style>
