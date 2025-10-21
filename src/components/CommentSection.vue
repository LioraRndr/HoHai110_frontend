<template>
  <div class="comment-section">
    <h3 class="comment-title">评论 ({{ total }})</h3>

    <!-- 发表评论区域 -->
    <div v-if="isLoggedIn" class="comment-input-area">
      <textarea
        v-model="newComment"
        placeholder="写下你的评论..."
        class="comment-textarea"
        rows="3"
      ></textarea>
      <div class="comment-actions">
        <button
          @click="submitComment"
          :disabled="!newComment.trim() || submitting"
          class="submit-btn"
        >
          {{ submitting ? '发送中...' : '发表评论' }}
        </button>
      </div>
    </div>
    <div v-else class="login-prompt">
      <p>请 <router-link to="/login">登录</router-link> 后发表评论</p>
    </div>

    <!-- 评论列表 -->
    <div v-if="loading" class="loading">加载评论中...</div>
    <div v-else-if="comments.length === 0" class="no-comments">暂无评论，快来抢沙发吧！</div>
    <div v-else class="comments-list">
      <CommentItem
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        @reply="handleReply"
        @delete="handleDelete"
        @like="handleLike"
        @unlike="handleUnlike"
      />
    </div>

    <!-- 分页 -->
    <div v-if="totalPages > 1" class="pagination">
      <button
        @click="changePage(page - 1)"
        :disabled="page === 1"
        class="page-btn"
      >
        上一页
      </button>
      <span class="page-info">{{ page }} / {{ totalPages }}</span>
      <button
        @click="changePage(page + 1)"
        :disabled="page === totalPages"
        class="page-btn"
      >
        下一页
      </button>
    </div>

    <!-- 回复弹窗 -->
    <div v-if="replyTarget" class="reply-modal" @click.self="cancelReply">
      <div class="reply-modal-content">
        <h4>回复 @{{ replyTarget.user.username }}</h4>
        <textarea
          v-model="replyContent"
          placeholder="写下你的回复..."
          class="comment-textarea"
          rows="3"
        ></textarea>
        <div class="modal-actions">
          <button @click="cancelReply" class="cancel-btn">取消</button>
          <button
            @click="submitReply"
            :disabled="!replyContent.trim() || submitting"
            class="submit-btn"
          >
            {{ submitting ? '发送中...' : '发送回复' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { commentAPI } from '@/api'
import CommentItem from './CommentItem.vue'
import { showError, showSuccess } from '@/utils/message'

const props = defineProps({
  articleId: {
    type: [Number, String],
    required: true
  }
})

const comments = ref([])
const loading = ref(false)
const submitting = ref(false)
const newComment = ref('')
const replyContent = ref('')
const replyTarget = ref(null)
const page = ref(1)
const total = ref(0)
const totalPages = ref(1)
const limit = 20

const isLoggedIn = computed(() => {
  return !!localStorage.getItem('token')
})

// 加载评论
const loadComments = async () => {
  loading.value = true
  try {
    const response = await commentAPI.getComments(props.articleId, {
      page: page.value,
      limit
    })
    comments.value = response.data.comments
    total.value = response.data.total
    totalPages.value = response.data.totalPages
  } catch (error) {
    console.error('加载评论失败:', error)
    showError('加载评论失败: ' + error.message)
  } finally {
    loading.value = false
  }
}

// 发表评论
const submitComment = async () => {
  if (!newComment.value.trim()) return

  submitting.value = true
  try {
    await commentAPI.createComment(props.articleId, {
      content: newComment.value.trim()
    })
    newComment.value = ''
    // 重新加载评论列表
    page.value = 1
    await loadComments()
    showSuccess('评论发表成功！')
  } catch (error) {
    console.error('发表评论失败:', error)
    showError('发表评论失败: ' + error.message)
  } finally {
    submitting.value = false
  }
}

// 处理回复
const handleReply = (comment) => {
  replyTarget.value = comment
  replyContent.value = ''
}

// 取消回复
const cancelReply = () => {
  replyTarget.value = null
  replyContent.value = ''
}

// 提交回复
const submitReply = async () => {
  if (!replyContent.value.trim()) return

  submitting.value = true
  try {
    await commentAPI.createComment(props.articleId, {
      content: replyContent.value.trim(),
      parentId: replyTarget.value.id
    })
    cancelReply()
    await loadComments()
    showSuccess('回复发表成功！')
  } catch (error) {
    console.error('发表回复失败:', error)
    showError('发表回复失败: ' + error.message)
  } finally {
    submitting.value = false
  }
}

// 删除评论
const handleDelete = async (commentId) => {
  if (!confirm('确定要删除这条评论吗？')) return

  try {
    await commentAPI.deleteComment(commentId)
    await loadComments()
    showSuccess('删除成功！')
  } catch (error) {
    console.error('删除评论失败:', error)
    showError('删除评论失败: ' + error.message)
  }
}

// 点赞评论
const handleLike = async (commentId) => {
  try {
    await commentAPI.likeComment(commentId)
    await loadComments()
  } catch (error) {
    console.error('点赞失败:', error)
    showError('点赞失败: ' + error.message)
  }
}

// 取消点赞
const handleUnlike = async (commentId) => {
  try {
    await commentAPI.unlikeComment(commentId)
    await loadComments()
  } catch (error) {
    console.error('取消点赞失败:', error)
    showError('取消点赞失败: ' + error.message)
  }
}

// 切换页码
const changePage = (newPage) => {
  page.value = newPage
  loadComments()
}

onMounted(() => {
  loadComments()
})
</script>

<style scoped>
.comment-section {
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.comment-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #ffffff;
}

.comment-input-area {
  margin-bottom: 2rem;
}

.comment-textarea {
  width: 100%;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.3);
  color: #ffffff;
  font-size: 0.95rem;
  resize: vertical;
  transition: all 0.3s ease;
}

.comment-textarea:focus {
  outline: none;
  border-color: #4A90E2;
  background: rgba(0, 0, 0, 0.4);
}

.comment-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.75rem;
}

.submit-btn {
  padding: 0.6rem 1.5rem;
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.4);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.login-prompt {
  text-align: center;
  padding: 2rem;
  color: rgba(255, 255, 255, 0.7);
}

.login-prompt a {
  color: #4A90E2;
  text-decoration: none;
  font-weight: 500;
}

.login-prompt a:hover {
  text-decoration: underline;
}

.loading,
.no-comments {
  text-align: center;
  padding: 2rem;
  color: rgba(255, 255, 255, 0.6);
}

.comments-list {
  margin-top: 1.5rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.page-btn {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
}

.page-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.page-info {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

.reply-modal {
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
  backdrop-filter: blur(5px);
}

.reply-modal-content {
  background: rgba(20, 20, 40, 0.95);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 600px;
  width: 90%;
}

.reply-modal-content h4 {
  margin-bottom: 1rem;
  color: #ffffff;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.cancel-btn {
  padding: 0.6rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}
</style>
