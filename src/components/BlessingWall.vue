<template>
  <div class="blessing-wall">
    
    <!-- 发表祝福区域 -->
    <transition name="fade-slide">
      <div v-if="isLoggedIn" class="blessing-input-section">
        <div class="input-header">
          <h3><span class="emoji-icon">✍️</span> {{ blessingWall.input.sectionTitle }}</h3>
        </div>
        <div class="input-wrapper">
          <textarea
            v-model="newBlessing"
            :placeholder="blessingWall.input.placeholder"
            class="blessing-textarea"
            rows="4"
            maxlength="500"
            @focus="textareaFocused = true"
            @blur="textareaFocused = false"
          ></textarea>
          <div class="textarea-border" :class="{ active: textareaFocused }"></div>
        </div>
        <div class="input-footer">
          <div class="options">
            <label class="anonymous-checkbox">
              <input type="checkbox" v-model="isAnonymous" />
              <span class="checkbox-label">
                <span class="checkbox-icon">{{ isAnonymous ? '✓' : '' }}</span>
                {{ blessingWall.input.anonymousLabel }}
              </span>
            </label>
            <span class="char-count" :class="{ warning: newBlessing.length > 450 }">
              {{ newBlessing.length }}/500
            </span>
          </div>
          <button
            @click="submitBlessing"
            :disabled="!newBlessing.trim() || submitting"
            class="submit-btn"
          >
            <span class="btn-content">
              <span class="btn-icon">{{ submitting ? '⏳' : '💌' }}</span>
              {{ submitting ? blessingWall.input.submittingButton : blessingWall.input.submitButton }}
            </span>
          </button>
        </div>
      </div>
      <div v-else class="login-prompt">
        <div class="prompt-icon">🔒</div>
        <p>{{ blessingWall.loginPrompt.prefix }} <router-link :to="{ path: '/login', query: { redirect: $route.fullPath } }" class="login-link">{{ blessingWall.loginPrompt.loginLink }}</router-link> {{ blessingWall.loginPrompt.suffix }}</p>
      </div>
    </transition>

    <!-- 精选祝福标题 -->
    <div class="section-title">
      <h3>✨ {{ blessingWall.featured.title }}</h3>
    </div>

    <!-- 祝福列表 -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">{{ blessingWall.loading.text }}</p>
    </div>
    <div v-else-if="blessings.length === 0" class="no-blessings">
      <div class="empty-icon">📝</div>
      <p>{{ blessingWall.empty.text }}</p>
    </div>
    <transition-group
      v-else
      name="blessing-list"
      tag="div"
      class="blessings-grid"
    >
      <BlessingCard
        v-for="blessing in blessings"
        :key="blessing.id"
        :blessing="blessing"
        @like="handleLike"
        @unlike="handleUnlike"
        @delete="handleDelete"
        @edit="handleEdit"
      />
    </transition-group>

    <!-- 分页 -->
    <transition name="fade">
      <div v-if="totalPages > 1" class="pagination">
        <button
          @click="changePage(page - 1)"
          :disabled="page === 1"
          class="page-btn prev-btn"
        >
          <span class="btn-arrow">«</span>
          {{ blessingWall.pagination.previous }}
        </button>
        <div class="page-info">
          <span class="current-page">{{ page }}</span>
          <span class="page-divider">/</span>
          <span class="total-page">{{ totalPages }}</span>
        </div>
        <button
          @click="changePage(page + 1)"
          :disabled="page === totalPages"
          class="page-btn next-btn"
        >
          {{ blessingWall.pagination.next }}
          <span class="btn-arrow">»</span>
        </button>
      </div>
    </transition>

    <!-- 编辑弹窗 -->
    <transition name="modal">
      <div v-if="editTarget" class="edit-modal" @click.self="cancelEdit">
        <div class="edit-modal-content">
          <button class="modal-close" @click="cancelEdit">✕</button>
          <h4><span class="modal-icon">✏️</span> {{ blessingWall.editModal.title }}</h4>
          <div class="modal-input-wrapper">
            <textarea
              v-model="editContent"
              class="blessing-textarea edit-textarea"
              rows="4"
              maxlength="500"
            ></textarea>
            <span class="char-count">{{ editContent.length }}/500</span>
          </div>
          <div class="modal-actions">
            <button @click="cancelEdit" class="cancel-btn">
              <span>{{ blessingWall.editModal.cancelButton }}</span>
            </button>
            <button
              @click="submitEdit"
              :disabled="!editContent.trim() || submitting"
              class="submit-btn"
            >
              <span>{{ submitting ? blessingWall.editModal.savingButton : blessingWall.editModal.saveButton }}</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBlessingsData } from '@/composables/useBlessingsData'
import { blessingAPI } from '@/api'
import { $message } from '@/utils/message.js'
import BlessingCard from './BlessingCard.vue'

const { blessingWall } = useBlessingsData()
const route = useRoute()
const emit = defineEmits(['update:total'])

const blessings = ref([])
const loading = ref(false)
const submitting = ref(false)
const newBlessing = ref('')
const isAnonymous = ref(false)
const textareaFocused = ref(false)
const editTarget = ref(null)
const editContent = ref('')
const page = ref(1)
const total = ref(0)
const totalPages = ref(1)
const limit = 20

const isLoggedIn = computed(() => {
  return !!localStorage.getItem('token')
})

// 加载祝福列表（只加载已审核的）
const loadBlessings = async () => {
  loading.value = true
  try {
    const params = {
      page: page.value,
      limit,
      status: 'approved' // 只显示已审核的
    }
    const response = await blessingAPI.getBlessings(params)
    blessings.value = response.data.blessings
    total.value = response.data.total
    totalPages.value = response.data.totalPages
    emit('update:total', response.data.total)
  } catch (error) {
    console.error('加载祝福失败:', error)
    $message.error(blessingWall.value.loading.failed + ': ' + error.message)
  } finally {
    loading.value = false
  }
}

// 发表祝福
const submitBlessing = async () => {
  if (!newBlessing.value.trim()) return

  submitting.value = true
  try {
    await blessingAPI.createBlessing({
      content: newBlessing.value.trim(),
      isAnonymous: isAnonymous.value
    })
    newBlessing.value = ''
    isAnonymous.value = false
    page.value = 1
    await loadBlessings()
    $message.success(blessingWall.value.input.submitSuccess)
  } catch (error) {
    console.error('发表祝福失败:', error)
    $message.error(blessingWall.value.input.submitFailed + ': ' + error.message)
  } finally {
    submitting.value = false
  }
}

// 点赞祝福
const handleLike = async (blessingId) => {
  try {
    const response = await blessingAPI.likeBlessing(blessingId)

    // 只更新当前项的点赞状态，避免重新加载整个列表
    const blessing = blessings.value.find(b => b.id === blessingId)
    if (blessing) {
      blessing.isLiked = true
      blessing.likes = (blessing.likes || 0) + 1

      // 如果 API 返回了新的点赞数，使用 API 返回的值
      if (response.data && response.data.likes !== undefined) {
        blessing.likes = response.data.likes
      }
    }
  } catch (error) {
    console.error('点赞失败:', error)
    $message.error(blessingWall.value.like.likeFailed + ': ' + error.message)
  }
}

// 取消点赞
const handleUnlike = async (blessingId) => {
  try {
    const response = await blessingAPI.unlikeBlessing(blessingId)

    // 只更新当前项的点赞状态，避免重新加载整个列表
    const blessing = blessings.value.find(b => b.id === blessingId)
    if (blessing) {
      blessing.isLiked = false
      blessing.likes = Math.max((blessing.likes || 0) - 1, 0)

      // 如果 API 返回了新的点赞数，使用 API 返回的值
      if (response.data && response.data.likes !== undefined) {
        blessing.likes = response.data.likes
      }
    }
  } catch (error) {
    console.error('取消点赞失败:', error)
    $message.error(blessingWall.value.like.unlikeFailed + ': ' + error.message)
  }
}

// 删除祝福
const handleDelete = async (blessingId) => {
  const confirmed = await $message.confirm(
    blessingWall.value.deleteConfirm.message,
    blessingWall.value.deleteConfirm.title,
    { type: 'danger', confirmText: blessingWall.value.deleteConfirm.confirmButton, cancelText: blessingWall.value.deleteConfirm.cancelButton }
  )

  if (!confirmed) return

  try {
    await blessingAPI.deleteBlessing(blessingId)
    await loadBlessings()
    $message.success(blessingWall.value.deleteConfirm.deleteSuccess)
  } catch (error) {
    console.error('删除祝福失败:', error)
    $message.error(blessingWall.value.deleteConfirm.deleteFailed + ': ' + error.message)
  }
}

// 编辑祝福
const handleEdit = (blessing) => {
  editTarget.value = blessing
  editContent.value = blessing.content
}

// 取消编辑
const cancelEdit = () => {
  editTarget.value = null
  editContent.value = ''
}

// 提交编辑
const submitEdit = async () => {
  if (!editContent.value.trim()) return

  submitting.value = true
  try {
    await blessingAPI.updateBlessing(editTarget.value.id, {
      content: editContent.value.trim()
    })
    cancelEdit()
    await loadBlessings()
    $message.success(blessingWall.value.editModal.editSuccess)
  } catch (error) {
    console.error('编辑祝福失败:', error)
    $message.error(blessingWall.value.editModal.editFailed + ': ' + error.message)
  } finally {
    submitting.value = false
  }
}

// 切换页码
const changePage = (newPage) => {
  page.value = newPage
  loadBlessings()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  loadBlessings()
})
</script>

<style scoped>
/* === 基础布局 === */
.blessing-wall {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
}

/* === 过渡动画 === */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .edit-modal-content,
.modal-leave-to .edit-modal-content {
  transform: scale(0.9) translateY(-20px);
}

.blessing-list-enter-active {
  animation: blessingEnter 0.5s ease-out;
}

.blessing-list-leave-active {
  animation: blessingLeave 0.3s ease-in;
  position: absolute;
}

@keyframes blessingEnter {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes blessingLeave {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale(0.9);
  }
}

/* === 发表祝福区域（浅色主题） === */
.blessing-input-section {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 250, 255, 0.9) 100%);
  padding: 2.5rem;
  border-radius: 20px;
  margin-bottom: 3rem;
  border: 1px solid rgba(74, 144, 226, 0.2);
  box-shadow: 0 8px 32px rgba(74, 144, 226, 0.1);
  transition: all 0.3s ease;
}

.blessing-input-section:hover {
  border-color: rgba(74, 144, 226, 0.4);
  box-shadow: 0 12px 40px rgba(74, 144, 226, 0.15);
}

.input-header h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.emoji-icon {
  font-size: 1.6rem;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.input-wrapper {
  position: relative;
  margin-bottom: 1rem;
}

.blessing-textarea {
  width: 100%;
  padding: 1.2rem;
  border: 2px solid rgba(74, 144, 226, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.8);
  color: #2c3e50;
  font-size: 1rem;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: inherit;
  line-height: 1.6;
}

.blessing-textarea::placeholder {
  color: rgba(44, 62, 80, 0.5);
}

.blessing-textarea:focus {
  outline: none;
  border-color: transparent;
  background: rgba(255, 255, 255, 0.95);
}

.textarea-border {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #4A90E2, #5CB3FF);
  transition: width 0.4s ease;
  border-radius: 1px;
}

.textarea-border.active {
  width: 100%;
}

.input-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.options {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.anonymous-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #34495e;
  cursor: pointer;
  user-select: none;
  transition: color 0.3s ease;
}

.anonymous-checkbox:hover {
  color: #2c3e50;
}

.anonymous-checkbox input[type="checkbox"] {
  display: none;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  padding-left: 2rem;
}

.checkbox-label::before {
  content: '';
  position: absolute;
  left: 0;
  width: 1.3rem;
  height: 1.3rem;
  border: 2px solid rgba(74, 144, 226, 0.5);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.anonymous-checkbox:hover .checkbox-label::before {
  border-color: rgba(74, 144, 226, 0.8);
  background: rgba(74, 144, 226, 0.05);
}

.anonymous-checkbox input:checked + .checkbox-label::before {
  background: linear-gradient(135deg, #4A90E2, #5CB3FF);
  border-color: #4A90E2;
}

.checkbox-icon {
  position: absolute;
  left: 0.25rem;
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
}

.char-count {
  font-size: 0.9rem;
  color: rgba(44, 62, 80, 0.6);
  transition: color 0.3s ease;
}

.char-count.warning {
  color: #e67e22;
  font-weight: 600;
}

.submit-btn {
  padding: 0.8rem 2.5rem;
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
  position: relative;
  overflow: hidden;
}

.submit-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.5s, height 0.5s;
}

.submit-btn:hover:not(:disabled)::before {
  width: 300px;
  height: 300px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.5);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: linear-gradient(135deg, rgba(74, 144, 226, 0.5) 0%, rgba(53, 122, 189, 0.5) 100%);
}

.btn-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-icon {
  font-size: 1.2rem;
}

/* === 登录提示（浅色主题） === */
.login-prompt {
  text-align: center;
  padding: 4rem 3rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 250, 255, 0.9) 100%);
  border-radius: 20px;
  margin-bottom: 3rem;
  border: 1px solid rgba(74, 144, 226, 0.2);
}

.prompt-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  opacity: 0.7;
  animation: iconFloat 3s ease-in-out infinite;
}

@keyframes iconFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.login-prompt p {
  color: #34495e;
  font-size: 1.15rem;
  margin: 0;
}

.login-link {
  color: #4A90E2;
  text-decoration: none;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  display: inline-block;
}

.login-link:hover {
  color: #357ABD;
  background: rgba(74, 144, 226, 0.1);
  transform: translateY(-1px);
}

/* === 精选祝福标题 === */
.section-title {
  margin-bottom: 2rem;
  text-align: center;
}

.section-title h3 {
  color: #2c3e50;
  font-size: 1.8rem;
  font-weight: 700;
  display: inline-block;
  position: relative;
  padding-bottom: 0.5rem;
}

.section-title h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 3px;
  background: linear-gradient(90deg, transparent, #4A90E2, transparent);
  border-radius: 2px;
}

/* === 加载和空状态（浅色主题） === */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem;
  gap: 1.5rem;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(74, 144, 226, 0.2);
  border-top-color: #4A90E2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  color: #7f8c8d;
  font-size: 1rem;
}

.no-blessings {
  text-align: center;
  padding: 5rem 3rem;
  color: #7f8c8d;
  font-size: 1.1rem;
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: 1.5rem;
  opacity: 0.5;
  animation: emptyIconFloat 3s ease-in-out infinite;
}

@keyframes emptyIconFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(5deg);
  }
}

/* === 祝福网格 === */
.blessings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  position: relative;
}

/* === 分页（浅色主题） === */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 3rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 250, 255, 0.9) 100%);
  border-radius: 12px;
  border: 1px solid rgba(74, 144, 226, 0.15);
}

.page-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.5rem;
  background: rgba(74, 144, 226, 0.1);
  color: #4A90E2;
  border: 1px solid rgba(74, 144, 226, 0.3);
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.page-btn:hover:not(:disabled) {
  background: rgba(74, 144, 226, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.2);
}

.page-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  background: rgba(74, 144, 226, 0.05);
}

.btn-arrow {
  font-size: 1.2rem;
  font-weight: 700;
}

.page-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #34495e;
}

.current-page {
  color: #4A90E2;
  font-size: 1.3rem;
}

.page-divider {
  color: rgba(44, 62, 80, 0.4);
}

.total-page {
  color: rgba(44, 62, 80, 0.6);
}

/* === 编辑弹窗 === */
.edit-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
}

.edit-modal-content {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 250, 255, 0.98) 100%);
  padding: 2.5rem;
  border-radius: 20px;
  border: 1px solid rgba(74, 144, 226, 0.3);
  max-width: 650px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  transition: all 0.3s ease;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  background: rgba(74, 144, 226, 0.1);
  color: #7f8c8d;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: rgba(255, 107, 107, 0.2);
  color: #e74c3c;
  transform: rotate(90deg);
}

.edit-modal-content h4 {
  margin-bottom: 1.5rem;
  color: #2c3e50;
  font-size: 1.4rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.modal-icon {
  font-size: 1.6rem;
}

.modal-input-wrapper {
  margin-bottom: 1.5rem;
}

.edit-textarea {
  border-color: rgba(74, 144, 226, 0.3);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.cancel-btn {
  padding: 0.7rem 1.8rem;
  background: rgba(127, 140, 141, 0.1);
  color: #7f8c8d;
  border: 1px solid rgba(127, 140, 141, 0.3);
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  background: rgba(127, 140, 141, 0.2);
  transform: translateY(-2px);
}

/* === 响应式设计 === */
@media (max-width: 1024px) {
  .blessings-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .blessing-input-section {
    padding: 1.8rem;
  }

  .input-header h3 {
    font-size: 1.2rem;
  }

  .input-footer {
    flex-direction: column;
    align-items: stretch;
  }

  .submit-btn {
    width: 100%;
  }

  .blessings-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .pagination {
    gap: 1rem;
  }

  .page-btn {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
  }

  .edit-modal-content {
    padding: 2rem;
    width: 95%;
  }
}

@media (max-width: 480px) {
  .blessing-input-section {
    padding: 1.5rem;
  }

  .btn-arrow {
    display: none;
  }

  .page-info {
    font-size: 0.9rem;
  }
}
</style>
