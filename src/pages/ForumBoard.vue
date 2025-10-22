<template>
  <PageLayout>
    <div class="board-page">
      <!-- 板块头部 -->
      <div class="board-header">
        <div class="header-content">
          <button @click="goBack" class="back-btn">← 返回</button>
          <div class="board-info">
            <h1>{{ forum.name }}</h1>
            <p class="board-description">{{ forum.description }}</p>
          </div>
          <button
            v-if="isLoggedIn"
            @click="showNewPostModal = true"
            class="new-post-btn"
          >
            发表新帖
          </button>
        </div>
      </div>

      <!-- 排序和筛选 -->
      <div class="toolbar">
        <div class="sort-tabs">
          <button
            v-for="sortOption in sortOptions"
            :key="sortOption.value"
            :class="['sort-tab', { active: currentSort === sortOption.value }]"
            @click="changeSort(sortOption.value)"
          >
            {{ sortOption.label }}
          </button>
        </div>
      </div>

      <!-- 帖子列表 -->
      <div v-if="loading" class="loading">加载中...</div>

      <div v-else-if="posts.length === 0" class="empty-state">
        <p>暂无帖子，快来发表第一篇吧！</p>
      </div>

      <div v-else class="posts-list">
        <div
          v-for="post in posts"
          :key="post.id"
          :class="['post-item', { sticky: post.isSticky, highlighted: post.isHighlighted }]"
          @click="goToPost(post.id)"
        >
          <div class="post-tags">
            <span v-if="post.isSticky" class="tag sticky-tag">置顶</span>
            <span v-if="post.isHighlighted" class="tag highlight-tag">精华</span>
            <span v-if="post.status === 'locked'" class="tag lock-tag">已锁定</span>
          </div>

          <div class="post-main">
            <h3 class="post-title">{{ post.title }}</h3>
            <div class="post-meta">
              <span class="author">{{ post.user?.username || '匿名用户' }}</span>
              <span class="separator">•</span>
              <span class="time">{{ formatTime(post.createdAt) }}</span>
            </div>
          </div>

          <div class="post-stats">
            <div class="stat">
              <span class="stat-icon">👁</span>
              <span class="stat-num">{{ post.views }}</span>
            </div>
            <div class="stat">
              <span class="stat-icon">💬</span>
              <span class="stat-num">{{ post.replyCount }}</span>
            </div>
            <div class="stat">
              <span class="stat-icon">❤</span>
              <span class="stat-num">{{ post.likes }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 分页 -->
      <div v-if="totalPages > 1" class="pagination">
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="page-btn"
        >
          上一页
        </button>
        <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="page-btn"
        >
          下一页
        </button>
      </div>

      <!-- 发帖模态框 -->
      <ForumPostEditor
        v-if="showNewPostModal"
        :forum-id="forumId"
        @close="showNewPostModal = false"
        @posted="handleNewPost"
      />
    </div>
  </PageLayout>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { forumAPI } from '@/api'
import { $message } from '@/utils/message.js'
import PageLayout from '@/components/PageLayout.vue'
import ForumPostEditor from '@/components/ForumPostEditor.vue'

const router = useRouter()
const route = useRoute()

const forumId = computed(() => parseInt(route.params.id))
const forum = ref({})
const posts = ref([])
const loading = ref(true)
const currentPage = ref(1)
const totalPages = ref(1)
const currentSort = ref('latest')
const showNewPostModal = ref(false)

const isLoggedIn = computed(() => !!localStorage.getItem('token'))

const sortOptions = [
  { label: '最新', value: 'latest' },
  { label: '热门', value: 'hot' },
  { label: '精华', value: 'highlighted' },
  { label: '活跃', value: 'active' }
]

// 加载板块信息
const loadForum = async () => {
  try {
    const response = await forumAPI.getForum(forumId.value)
    forum.value = response.data.forum || {}
  } catch (error) {
    console.error('加载板块信息失败:', error)
    $message.error('加载板块信息失败')
  }
}

// 加载帖子列表
const loadPosts = async () => {
  loading.value = true
  try {
    const response = await forumAPI.getPosts({
      forumId: forumId.value,
      sort: currentSort.value,
      page: currentPage.value,
      limit: 20
    })
    posts.value = response.data.posts || []
    totalPages.value = response.data.totalPages || 1
  } catch (error) {
    console.error('加载帖子列表失败:', error)
    $message.error('加载帖子列表失败')
  } finally {
    loading.value = false
  }
}

// 切换排序
const changeSort = (sort) => {
  currentSort.value = sort
  currentPage.value = 1
  loadPosts()
}

// 切换页码
const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  loadPosts()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 跳转到帖子详情
const goToPost = (postId) => {
  router.push({ name: 'ForumPost', params: { id: postId } })
}

// 返回论坛首页
const goBack = () => {
  router.push({ name: 'Forum' })
}

// 处理新帖发表
const handleNewPost = () => {
  showNewPostModal.value = false
  currentPage.value = 1
  loadPosts()
  $message.success('发帖成功！')
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

watch(() => route.params.id, () => {
  if (route.name === 'ForumBoard') {
    loadForum()
    loadPosts()
  }
})

onMounted(() => {
  loadForum()
  loadPosts()
})
</script>

<style scoped>
.board-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 80vh;
}

.board-header {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 2rem;
  margin-top: 80px;
  margin-bottom: 1.5rem;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.back-btn {
  padding: 0.6rem 1.2rem;
  background: #f8f9fa;
  color: #333;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: #e9ecef;
  border-color: #4A90E2;
}

.board-info {
  flex: 1;
}

.board-info h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
}

.board-description {
  font-size: 1rem;
  color: #666;
}

.new-post-btn {
  padding: 0.8rem 1.8rem;
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.new-post-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.4);
}

.toolbar {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 1rem 2rem;
  margin-bottom: 1.5rem;
}

.sort-tabs {
  display: flex;
  gap: 0.5rem;
}

.sort-tab {
  padding: 0.6rem 1.2rem;
  background: transparent;
  color: #666;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.sort-tab:hover {
  background: #f8f9fa;
  color: #333;
}

.sort-tab.active {
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  color: white;
}

.loading {
  text-align: center;
  padding: 3rem;
  color: #999;
  font-size: 1.1rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #999;
  font-size: 1.1rem;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.post-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.post-item:hover {
  transform: translateX(4px);
  border-color: #4A90E2;
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.1);
}

.post-item.sticky {
  background: linear-gradient(135deg, #fff9e6 0%, #ffffff 100%);
  border-color: #ffc107;
}

.post-item.highlighted {
  background: linear-gradient(135deg, #e8f5e9 0%, #ffffff 100%);
  border-color: #4caf50;
}

.post-tags {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 60px;
}

.tag {
  padding: 0.25rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
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

.post-main {
  flex: 1;
}

.post-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #999;
}

.author {
  color: #4A90E2;
  font-weight: 500;
}

.separator {
  color: #ddd;
}

.post-stats {
  display: flex;
  gap: 1.5rem;
  padding-left: 1.5rem;
  border-left: 1px solid #e0e0e0;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-icon {
  font-size: 1.2rem;
}

.stat-num {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  padding: 1rem;
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
  .board-page {
    padding: 1rem;
  }

  .header-content {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .back-btn {
    width: fit-content;
  }

  .new-post-btn {
    width: 100%;
  }

  .board-info h1 {
    font-size: 1.5rem;
  }

  .post-item {
    flex-wrap: wrap;
  }

  .post-tags {
    flex-direction: row;
    width: 100%;
    order: -1;
  }

  .post-stats {
    border-left: none;
    border-top: 1px solid #e0e0e0;
    padding-left: 0;
    padding-top: 1rem;
    width: 100%;
  }
}
</style>
