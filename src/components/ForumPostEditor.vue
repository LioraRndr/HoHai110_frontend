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

        <div class="form-group">
          <label>图片（可选）</label>
          <div class="image-upload">
            <div
              v-for="(image, index) in postData.images"
              :key="index"
              class="image-preview"
            >
              <img :src="image" :alt="`图片${index + 1}`" />
              <button @click="removeImage(index)" class="remove-image-btn">✕</button>
            </div>
            <label v-if="postData.images.length < 9" class="upload-btn">
              <input
                type="file"
                accept="image/*"
                multiple
                @change="handleImageUpload"
                style="display: none"
              />
              <span>+</span>
              <span class="upload-text">添加图片</span>
            </label>
          </div>
          <p class="upload-tip">最多上传9张图片</p>
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
import { forumAPI, uploadAPI } from '@/api'
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
  content: '',
  images: []
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
      content: props.post.content || '',
      images: props.post.images || []
    }
  }
})

// 处理图片上传
const handleImageUpload = async (event) => {
  const files = Array.from(event.target.files)

  if (files.length + postData.value.images.length > 9) {
    $message.error('最多只能上传9张图片')
    return
  }

  for (const file of files) {
    // 检查文件大小（限制5MB）
    if (file.size > 5 * 1024 * 1024) {
      $message.error(`${file.name} 超过5MB限制`)
      continue
    }

    try {
      const response = await uploadAPI.uploadFile(file)
      if (response.data.url) {
        postData.value.images.push(response.data.url)
      }
    } catch (error) {
      console.error('上传图片失败:', error)
      $message.error(`上传 ${file.name} 失败`)
    }
  }

  // 清空input，允许重复选择同一文件
  event.target.value = ''
}

// 移除图片
const removeImage = (index) => {
  postData.value.images.splice(index, 1)
}

// 提交帖子
const handleSubmit = async () => {
  if (!canSubmit.value || submitting.value) return

  submitting.value = true

  try {
    if (isEditMode.value) {
      // 更新帖子
      await forumAPI.updatePost(props.post.id, {
        title: postData.value.title.trim(),
        content: postData.value.content.trim(),
        images: postData.value.images
      })
      $message.success('帖子更新成功！')
      emit('updated')
    } else {
      // 创建新帖子
      await forumAPI.createPost({
        forumId: props.forumId,
        title: postData.value.title.trim(),
        content: postData.value.content.trim(),
        images: postData.value.images
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

.image-upload {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.image-preview {
  position: relative;
  width: 100%;
  padding-top: 100%;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
}

.image-preview img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-image-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.remove-image-btn:hover {
  background: rgba(0, 0, 0, 0.8);
}

.upload-btn {
  width: 100%;
  padding-top: 100%;
  position: relative;
  border: 2px dashed #d0d0d0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
}

.upload-btn:hover {
  border-color: #4A90E2;
  background: #f0f6ff;
}

.upload-btn > span:first-child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  font-size: 2rem;
  color: #999;
}

.upload-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 40%);
  font-size: 0.8rem;
  color: #999;
  white-space: nowrap;
}

.upload-tip {
  font-size: 0.85rem;
  color: #999;
  margin-top: 0.5rem;
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

  .image-upload {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
