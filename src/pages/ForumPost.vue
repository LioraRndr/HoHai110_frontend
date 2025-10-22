<template>
  <PageLayout>
    <div class="post-page">
      <div v-if="loading" class="loading">加载中...</div>

      <div v-else class="post-container">
        <!-- 返回按钮 -->
        <button @click="goBack" class="back-btn">← 返回板块</button>

        <!-- 帖子内容 -->
        <div class="post-content">
          <div class="post-header">
            <div class="post-tags">
              <span v-if="post.isSticky" class="tag sticky-tag">置顶</span>
              <span v-if="post.isHighlighted" class="tag highlight-tag">精华</span>
              <span v-if="post.status === 'locked'" class="tag lock-tag">已锁定</span>
            </div>
            <h1 class="post-title">{{ post.title }}</h1>
            <div class="post-meta">
              <div class="author-info">
                <span class="author-name">{{ post.user?.username || '匿名用户' }}</span>
                <span class="separator">•</span>
                <span class="post-time">{{ formatTime(post.createdAt) }}</span>
              </div>
              <div class="post-stats-mini">
                <span>浏览 {{ post.views }}</span>
                <span>回复 {{ post.replyCount }}</span>
                <span>点赞 {{ post.likes }}</span>
              </div>
            </div>
          </div>

          <div class="post-body">
            <div class="post-text" v-html="formatContent(post.content)"></div>
            <div v-if="post.images && post.images.length > 0" class="post-images">
              <img
                v-for="(image, index) in post.images"
                :key="index"
                :src="image"
                :alt="`图片${index + 1}`"
                class="post-image"
              />
            </div>
          </div>

          <div class="post-actions">
            <button
              :class="['action-btn', 'like-btn', { liked: post.isLiked }]"
              @click="toggleLike"
            >
              ❤ {{ post.isLiked ? '已赞' : '点赞' }} ({{ post.likes }})
            </button>
            <button
              v-if="canEdit"
              @click="editPost"
              class="action-btn edit-btn"
            >
              ✎ 编辑
            </button>
            <button
              v-if="canDelete"
              @click="deletePost"
              class="action-btn delete-btn"
            >
              🗑 删除
            </button>
          </div>
        </div>

        <!-- 回复列表 -->
        <div class="replies-section">
          <div class="section-header">
            <h2>全部回复 ({{ post.replyCount }})</h2>
          </div>

          <!-- 发表回复 -->
          <div v-if="isLoggedIn && post.status !== 'locked'" class="reply-editor">
            <textarea
              v-model="newReplyContent"
              placeholder="发表你的看法..."
              class="reply-textarea"
              rows="4"
            ></textarea>
            <button
              @click="submitReply"
              :disabled="!newReplyContent.trim()"
              class="submit-reply-btn"
            >
              发表回复
            </button>
          </div>

          <div v-else-if="!isLoggedIn" class="login-tip">
            <router-link to="/login">登录</router-link> 后才能发表回复
          </div>

          <div v-else-if="post.status === 'locked'" class="locked-tip">
            该帖子已被锁定，无法回复
          </div>

          <!-- 回复列表 -->
          <div v-if="repliesLoading" class="loading">加载回复中...</div>

          <div v-else-if="replies.length === 0" class="empty-replies">
            暂无回复，快来抢沙发吧！
          </div>

          <div v-else class="replies-list">
            <div
              v-for="reply in replies"
              :key="reply.id"
              class="reply-item"
            >
              <div class="reply-header">
                <span class="reply-floor">{{ reply.floor }}楼</span>
                <span class="reply-author">{{ reply.user?.username || '匿名用户' }}</span>
                <span class="reply-time">{{ formatTime(reply.createdAt) }}</span>
              </div>
              <div class="reply-content" v-html="formatContent(reply.content)"></div>
              <div class="reply-actions">
                <button
                  :class="['reply-action-btn', { liked: reply.isLiked }]"
                  @click="toggleReplyLike(reply)"
                >
                  ❤ {{ reply.likes }}
                </button>
                <button
                  v-if="isLoggedIn && post.status !== 'locked'"
                  @click="replyToReply(reply)"
                  class="reply-action-btn"
                >
                  💬 回复
                </button>
                <button
                  v-if="canDeleteReply(reply)"
                  @click="deleteReply(reply.id)"
                  class="reply-action-btn delete"
                >
                  🗑 删除
                </button>
              </div>

              <!-- 子回复 -->
              <div v-if="reply.children && reply.children.length > 0" class="sub-replies">
                <div
                  v-for="subReply in reply.children"
                  :key="subReply.id"
                  class="sub-reply-item"
                >
                  <div class="sub-reply-header">
                    <span class="sub-reply-author">{{ subReply.user?.username }}</span>
                    <span v-if="subReply.replyToUser" class="reply-to">
                      回复 @{{ subReply.replyToUser.username }}
                    </span>
                    <span class="sub-reply-time">{{ formatTime(subReply.createdAt) }}</span>
                  </div>
                  <div class="sub-reply-content" v-html="formatContent(subReply.content)"></div>
                  <div class="sub-reply-actions">
                    <button
                      :class="['reply-action-btn', { liked: subReply.isLiked }]"
                      @click="toggleReplyLike(subReply)"
                    >
                      ❤ {{ subReply.likes }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 回复分页 -->
          <div v-if="replyTotalPages > 1" class="pagination">
            <button
              @click="changeReplyPage(replyPage - 1)"
              :disabled="replyPage === 1"
              class="page-btn"
            >
              上一页
            </button>
            <span class="page-info">{{ replyPage }} / {{ replyTotalPages }}</span>
            <button
              @click="changeReplyPage(replyPage + 1)"
              :disabled="replyPage === replyTotalPages"
              class="page-btn"
            >
              下一页
            </button>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { forumAPI } from '@/api'
import { $message } from '@/utils/message.js'
import PageLayout from '@/components/PageLayout.vue'

const router = useRouter()
const route = useRoute()

const postId = computed(() => parseInt(route.params.id))
const post = ref({})
const replies = ref([])
const loading = ref(true)
const repliesLoading = ref(true)
const newReplyContent = ref('')
const replyPage = ref(1)
const replyTotalPages = ref(1)

const isLoggedIn = computed(() => !!localStorage.getItem('token'))
const currentUser = computed(() => JSON.parse(localStorage.getItem('user') || '{}'))
const isAdmin = computed(() => currentUser.value.role === 'admin')
const canEdit = computed(() => isLoggedIn.value && (post.value.userId === currentUser.value.id || isAdmin.value))
const canDelete = computed(() => isLoggedIn.value && (post.value.userId === currentUser.value.id || isAdmin.value))

const canDeleteReply = (reply) => {
  return isLoggedIn.value && (reply.userId === currentUser.value.id || isAdmin.value)
}

// 加载帖子详情
const loadPost = async () => {
  loading.value = true
  try {
    const headers = {}
    if (isLoggedIn.value) {
      headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    const response = await forumAPI.getPost(postId.value)
    post.value = response.data.post || {}
  } catch (error) {
    console.error('加载帖子失败:', error)
    $message.error('加载帖子失败')
  } finally {
    loading.value = false
  }
}

// 加载回复列表
const loadReplies = async () => {
  repliesLoading.value = true
  try {
    const response = await forumAPI.getReplies(postId.value, {
      page: replyPage.value,
      limit: 20
    })
    replies.value = response.data.replies || []
    replyTotalPages.value = response.data.totalPages || 1
  } catch (error) {
    console.error('加载回复失败:', error)
    $message.error('加载回复失败')
  } finally {
    repliesLoading.value = false
  }
}

// 提交回复
const submitReply = async () => {
  if (!newReplyContent.value.trim()) return

  try {
    await forumAPI.createReply(postId.value, {
      content: newReplyContent.value
    })
    newReplyContent.value = ''
    $message.success('回复成功！')
    await loadPost()
    await loadReplies()
  } catch (error) {
    console.error('发表回复失败:', error)
    $message.error('发表回复失败: ' + error.message)
  }
}

// 回复楼中楼
const replyToReply = (reply) => {
  newReplyContent.value = `@${reply.user?.username} `
  document.querySelector('.reply-textarea')?.focus()
}

// 切换点赞
const toggleLike = async () => {
  if (!isLoggedIn.value) {
    $message.error('请先登录')
    return
  }

  try {
    if (post.value.isLiked) {
      await forumAPI.unlike('post', postId.value)
      post.value.likes--
      post.value.isLiked = false
    } else {
      await forumAPI.like('post', postId.value)
      post.value.likes++
      post.value.isLiked = true
    }
  } catch (error) {
    console.error('点赞操作失败:', error)
    $message.error('操作失败')
  }
}

// 切换回复点赞
const toggleReplyLike = async (reply) => {
  if (!isLoggedIn.value) {
    $message.error('请先登录')
    return
  }

  try {
    if (reply.isLiked) {
      await forumAPI.unlike('reply', reply.id)
      reply.likes--
      reply.isLiked = false
    } else {
      await forumAPI.like('reply', reply.id)
      reply.likes++
      reply.isLiked = true
    }
  } catch (error) {
    console.error('点赞操作失败:', error)
    $message.error('操作失败')
  }
}

// 删除帖子
const deletePost = async () => {
  if (!confirm('确定要删除这个帖子吗？此操作不可恢复。')) return

  try {
    await forumAPI.deletePost(postId.value)
    $message.success('帖子已删除')
    router.push({ name: 'ForumBoard', params: { id: post.value.forumId } })
  } catch (error) {
    console.error('删除帖子失败:', error)
    $message.error('删除失败')
  }
}

// 删除回复
const deleteReply = async (replyId) => {
  if (!confirm('确定要删除这条回复吗？')) return

  try {
    await forumAPI.deleteReply(replyId)
    $message.success('回复已删除')
    await loadPost()
    await loadReplies()
  } catch (error) {
    console.error('删除回复失败:', error)
    $message.error('删除失败')
  }
}

// 编辑帖子
const editPost = () => {
  // TODO: 实现编辑功能
  $message.info('编辑功能开发中')
}

// 切换回复页码
const changeReplyPage = (page) => {
  if (page < 1 || page > replyTotalPages.value) return
  replyPage.value = page
  loadReplies()
  document.querySelector('.replies-section')?.scrollIntoView({ behavior: 'smooth' })
}

// 返回板块
const goBack = () => {
  if (post.value.forumId) {
    router.push({ name: 'ForumBoard', params: { id: post.value.forumId } })
  } else {
    router.push({ name: 'Forum' })
  }
}

// 格式化内容（简单的换行处理）
const formatContent = (content) => {
  if (!content) return ''
  return content.replace(/\n/g, '<br>')
}

// 格式化时间
const formatTime = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now - date

  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 7) return `${days}天前`

  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

onMounted(() => {
  loadPost()
  loadReplies()
})
</script>

<style scoped>
.post-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 80vh;
}

.loading {
  text-align: center;
  padding: 3rem;
  color: #999;
}

.post-container {
  margin-top: 80px;
}

.back-btn {
  padding: 0.6rem 1.2rem;
  background: #f8f9fa;
  color: #333;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: #e9ecef;
  border-color: #4A90E2;
}

.post-content {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 1.5rem;
}

.post-header {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
}

.post-tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  padding: 0.25rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.sticky-tag {
  background: rgba(255, 193, 7, 0.2);
  color: #f57c00;
  border: 1px solid rgba(255, 193, 7, 0.3);
}

.highlight-tag {
  background: rgba(76, 175, 80, 0.2);
  color: #388e3c;
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.lock-tag {
  background: rgba(158, 158, 158, 0.2);
  color: #757575;
  border: 1px solid rgba(158, 158, 158, 0.3);
}

.post-title {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.author-name {
  color: #4A90E2;
  font-weight: 600;
}

.separator {
  color: #ddd;
}

.post-time {
  color: #999;
}

.post-stats-mini {
  display: flex;
  gap: 1rem;
  color: #666;
}

.post-body {
  margin-bottom: 1.5rem;
}

.post-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  margin-bottom: 1rem;
}

.post-images {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.post-image {
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.post-image:hover {
  transform: scale(1.05);
}

.post-actions {
  display: flex;
  gap: 0.75rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e0e0e0;
}

.action-btn {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.like-btn {
  background: rgba(244, 67, 54, 0.1);
  color: #f44336;
  border: 1px solid rgba(244, 67, 54, 0.2);
}

.like-btn.liked {
  background: rgba(244, 67, 54, 0.2);
  border-color: rgba(244, 67, 54, 0.4);
}

.like-btn:hover {
  background: rgba(244, 67, 54, 0.2);
}

.edit-btn {
  background: rgba(74, 144, 226, 0.1);
  color: #4A90E2;
  border: 1px solid rgba(74, 144, 226, 0.2);
}

.edit-btn:hover {
  background: rgba(74, 144, 226, 0.2);
}

.delete-btn {
  background: rgba(158, 158, 158, 0.1);
  color: #757575;
  border: 1px solid rgba(158, 158, 158, 0.2);
}

.delete-btn:hover {
  background: rgba(158, 158, 158, 0.2);
}

.replies-section {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 2rem;
}

.section-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
}

.reply-editor {
  margin-bottom: 2rem;
}

.reply-textarea {
  width: 100%;
  padding: 1rem;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.6;
  resize: vertical;
  margin-bottom: 0.75rem;
  font-family: inherit;
}

.reply-textarea:focus {
  outline: none;
  border-color: #4A90E2;
}

.submit-reply-btn {
  padding: 0.7rem 1.5rem;
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.submit-reply-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.4);
}

.submit-reply-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.login-tip,
.locked-tip {
  text-align: center;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  color: #666;
  margin-bottom: 2rem;
}

.login-tip a {
  color: #4A90E2;
  text-decoration: none;
  font-weight: 500;
}

.empty-replies {
  text-align: center;
  padding: 3rem;
  color: #999;
}

.replies-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.reply-item {
  padding: 1.5rem;
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.reply-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}

.reply-floor {
  padding: 0.2rem 0.6rem;
  background: #4A90E2;
  color: white;
  border-radius: 4px;
  font-weight: 500;
  font-size: 0.8rem;
}

.reply-author {
  color: #4A90E2;
  font-weight: 600;
}

.reply-time {
  color: #999;
  margin-left: auto;
}

.reply-content {
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
  margin-bottom: 0.75rem;
}

.reply-actions {
  display: flex;
  gap: 0.5rem;
}

.reply-action-btn {
  padding: 0.4rem 0.8rem;
  background: transparent;
  color: #666;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.3s ease;
}

.reply-action-btn:hover {
  background: #ffffff;
  border-color: #4A90E2;
  color: #4A90E2;
}

.reply-action-btn.liked {
  color: #f44336;
  border-color: #f44336;
}

.reply-action-btn.delete {
  color: #f44336;
}

.sub-replies {
  margin-top: 1rem;
  padding-left: 2rem;
  border-left: 2px solid #4A90E2;
}

.sub-reply-item {
  padding: 1rem;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  margin-bottom: 0.75rem;
}

.sub-reply-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
}

.sub-reply-author {
  color: #4A90E2;
  font-weight: 600;
}

.reply-to {
  color: #999;
}

.sub-reply-time {
  color: #999;
  margin-left: auto;
}

.sub-reply-content {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #333;
  margin-bottom: 0.5rem;
}

.sub-reply-actions {
  display: flex;
  gap: 0.5rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.page-btn {
  padding: 0.6rem 1.2rem;
  background: #ffffff;
  color: #333;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-btn:hover:not(:disabled) {
  background: #f0f0f0;
  border-color: #4A90E2;
}

.page-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.page-info {
  color: #555;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .post-page {
    padding: 1rem;
  }

  .post-content,
  .replies-section {
    padding: 1.5rem;
  }

  .post-title {
    font-size: 1.5rem;
  }

  .post-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .sub-replies {
    padding-left: 1rem;
  }
}
</style>
