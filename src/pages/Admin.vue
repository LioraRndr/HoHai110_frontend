<template>
  <PageLayout>
    <div class="admin-page">
      <div class="page-header">
        <h1>管理后台</h1>
        <p class="subtitle">内容审核与数据统计</p>
      </div>

      <!-- 统计数据 -->
      <section class="stats-section">
        <h2>数据统计</h2>
        <div v-if="statsLoading" class="loading-text">加载中...</div>
        <div v-else class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">👥</div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.users || 0 }}</div>
              <div class="stat-label">注册用户</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📝</div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.articles || 0 }}</div>
              <div class="stat-label">文章数</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">💬</div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.comments || 0 }}</div>
              <div class="stat-label">评论数</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🎉</div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.blessings || 0 }}</div>
              <div class="stat-label">祝福数</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📖</div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.maxims || 0 }}</div>
              <div class="stat-label">格言数</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🏃</div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.relayParticipations || 0 }}</div>
              <div class="stat-label">接力参与</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 待审核内容 -->
      <section class="pending-section">
        <h2>待审核内容</h2>
        <div v-if="pendingLoading" class="loading-text">加载中...</div>
        <div v-else class="tabs-container">
          <!-- 标签页 -->
          <div class="tabs">
            <button
              :class="{ active: activeTab === 'comments' }"
              @click="activeTab = 'comments'"
              class="tab-btn"
            >
              待审核评论 ({{ pendingContent.comments?.length || 0 }})
            </button>
            <button
              :class="{ active: activeTab === 'blessings' }"
              @click="activeTab = 'blessings'"
              class="tab-btn"
            >
              待审核祝福 ({{ pendingContent.blessings?.length || 0 }})
            </button>
          </div>

          <!-- 评论列表 -->
          <div v-if="activeTab === 'comments'" class="content-list">
            <div v-if="!pendingContent.comments || pendingContent.comments.length === 0" class="empty-state">
              暂无待审核评论
            </div>
            <div
              v-for="comment in pendingContent.comments"
              :key="comment.id"
              class="content-item"
            >
              <div class="item-header">
                <span class="user-name">{{ comment.user?.username }}</span>
                <span class="item-date">{{ formatDate(comment.createdAt) }}</span>
              </div>
              <div class="item-content">{{ comment.content }}</div>
              <div class="item-meta">
                <span>关联文章ID: {{ comment.articleId }}</span>
              </div>
              <div class="item-actions">
                <button
                  @click="reviewComment(comment.id, 'approved')"
                  class="approve-btn"
                >
                  ✓ 通过
                </button>
                <button
                  @click="reviewComment(comment.id, 'rejected')"
                  class="reject-btn"
                >
                  ✗ 拒绝
                </button>
              </div>
            </div>
          </div>

          <!-- 祝福列表 -->
          <div v-if="activeTab === 'blessings'" class="content-list">
            <div v-if="!pendingContent.blessings || pendingContent.blessings.length === 0" class="empty-state">
              暂无待审核祝福
            </div>
            <div
              v-for="blessing in pendingContent.blessings"
              :key="blessing.id"
              class="content-item"
            >
              <div class="item-header">
                <span class="user-name">
                  {{ blessing.isAnonymous ? '匿名校友' : blessing.authorName }}
                </span>
                <span class="item-date">{{ formatDate(blessing.createdAt) }}</span>
              </div>
              <div class="item-content">{{ blessing.content }}</div>
              <div class="item-meta">
                <span v-if="!blessing.isAnonymous && blessing.graduationYear">
                  {{ blessing.graduationYear }}届
                </span>
                <span v-if="!blessing.isAnonymous && blessing.department">
                  {{ blessing.department }}
                </span>
              </div>
              <div class="item-actions">
                <button
                  @click="reviewBlessing(blessing.id, 'approved')"
                  class="approve-btn"
                >
                  ✓ 通过
                </button>
                <button
                  @click="reviewBlessing(blessing.id, 'rejected')"
                  class="reject-btn"
                >
                  ✗ 拒绝
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 用户管理 -->
      <section class="users-section">
        <h2>用户管理</h2>
        <div class="search-bar">
          <input
            v-model="userSearch"
            @keyup.enter="loadUsers"
            type="text"
            placeholder="搜索用户..."
            class="search-input"
          />
          <button @click="loadUsers" class="search-btn">搜索</button>
        </div>
        <div v-if="usersLoading" class="loading-text">加载中...</div>
        <div v-else class="users-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>用户名</th>
                <th>邮箱</th>
                <th>角色</th>
                <th>毕业年份</th>
                <th>院系</th>
                <th>注册时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <span :class="['role-badge', user.role]">
                    {{ user.role === 'admin' ? '管理员' : '用户' }}
                  </span>
                </td>
                <td>{{ user.graduationYear || '-' }}</td>
                <td>{{ user.department || '-' }}</td>
                <td>{{ formatDate(user.createdAt) }}</td>
                <td>
                  <button
                    v-if="user.role !== 'admin'"
                    @click="deleteUser(user.id)"
                    class="delete-user-btn"
                  >
                    删除
                  </button>
                  <span v-else class="protected">-</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="userTotalPages > 1" class="pagination">
            <button
              @click="changeUserPage(userPage - 1)"
              :disabled="userPage === 1"
              class="page-btn"
            >
              上一页
            </button>
            <span class="page-info">{{ userPage }} / {{ userTotalPages }}</span>
            <button
              @click="changeUserPage(userPage + 1)"
              :disabled="userPage === userTotalPages"
              class="page-btn"
            >
              下一页
            </button>
          </div>
        </div>
      </section>
    </div>
  </PageLayout>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { adminAPI } from '@/api'
import { $message } from '@/utils/message.js'
import PageLayout from '@/components/PageLayout.vue'

const stats = reactive({
  users: 0,
  articles: 0,
  comments: 0,
  blessings: 0,
  maxims: 0,
  relayParticipations: 0
})

const pendingContent = reactive({
  comments: [],
  blessings: []
})

const users = ref([])
const statsLoading = ref(true)
const pendingLoading = ref(true)
const usersLoading = ref(false)
const activeTab = ref('comments')
const userSearch = ref('')
const userPage = ref(1)
const userTotalPages = ref(1)

// 加载统计数据
const loadStats = async () => {
  statsLoading.value = true
  try {
    const response = await adminAPI.getStats()
    Object.assign(stats, response.data)
  } catch (error) {
    console.error('加载统计数据失败:', error)
    $message.error('加载统计数据失败: ' + error.message)
  } finally {
    statsLoading.value = false
  }
}

// 加载待审核内容
const loadPendingContent = async () => {
  pendingLoading.value = true
  try {
    const response = await adminAPI.getPendingContent()
    Object.assign(pendingContent, response.data)
  } catch (error) {
    console.error('加载待审核内容失败:', error)
    $message.error('加载待审核内容失败: ' + error.message)
  } finally {
    pendingLoading.value = false
  }
}

// 审核评论
const reviewComment = async (commentId, status) => {
  try {
    await adminAPI.reviewComment(commentId, status)
    $message.success(status === 'approved' ? '评论已通过' : '评论已拒绝')
    await loadPendingContent()
  } catch (error) {
    console.error('审核评论失败:', error)
    $message.error('审核失败: ' + error.message)
  }
}

// 审核祝福
const reviewBlessing = async (blessingId, status) => {
  try {
    await adminAPI.reviewBlessing(blessingId, status)
    $message.success(status === 'approved' ? '祝福已通过' : '祝福已拒绝')
    await loadPendingContent()
  } catch (error) {
    console.error('审核祝福失败:', error)
    $message.error('审核失败: ' + error.message)
  }
}

// 加载用户列表
const loadUsers = async () => {
  usersLoading.value = true
  try {
    const params = {
      page: userPage.value,
      limit: 20
    }
    if (userSearch.value) {
      params.search = userSearch.value
    }
    const response = await adminAPI.getUsers(params)
    users.value = response.data.users
    userTotalPages.value = response.data.totalPages
  } catch (error) {
    console.error('加载用户列表失败:', error)
    $message.error('加载用户列表失败: ' + error.message)
  } finally {
    usersLoading.value = false
  }
}

// 删除用户
const deleteUser = async (userId) => {
  if (!$message.confirm('确定要删除这个用户吗？此操作不可恢复。')) return

  try {
    await adminAPI.deleteUser(userId)
    $message.success('用户已删除')
    await loadUsers()
  } catch (error) {
    console.error('删除用户失败:', error)
    $message.error('删除失败: ' + error.message)
  }
}

// 切换用户页码
const changeUserPage = (newPage) => {
  if (newPage < 1 || newPage > userTotalPages.value) return
  userPage.value = newPage
  loadUsers()
}

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

onMounted(() => {
  loadStats()
  loadPendingContent()
  loadUsers()
})
</script>

<style scoped>
.admin-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 80vh;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  margin-top:60px;
}

.page-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.1rem;
  color: #666;
}

section {
  margin-bottom: 3rem;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

section h2 {
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
}

.loading-text {
  text-align: center;
  padding: 2rem;
  color: #999;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  border-color: #4A90E2;
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.15);
}

.stat-icon {
  font-size: 2.5rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #4A90E2;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #e0e0e0;
}

.tab-btn {
  padding: 0.8rem 1.5rem;
  background: transparent;
  color: #666;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: -2px;
}

.tab-btn:hover {
  color: #333;
}

.tab-btn.active {
  color: #4A90E2;
  border-bottom-color: #4A90E2;
}

.content-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #999;
}

.content-item {
  padding: 1.5rem;
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.user-name {
  font-weight: 600;
  color: #333;
}

.item-date {
  font-size: 0.85rem;
  color: #999;
}

.item-content {
  color: #333;
  line-height: 1.6;
  margin-bottom: 0.75rem;
  white-space: pre-wrap;
}

.item-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 1rem;
}

.item-actions {
  display: flex;
  gap: 0.75rem;
}

.approve-btn,
.reject-btn {
  padding: 0.5rem 1.2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.approve-btn {
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.approve-btn:hover {
  background: rgba(76, 175, 80, 0.3);
}

.reject-btn {
  background: rgba(244, 67, 54, 0.2);
  color: #f44336;
  border: 1px solid rgba(244, 67, 54, 0.3);
}

.reject-btn:hover {
  background: rgba(244, 67, 54, 0.3);
}

.search-bar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.search-input {
  flex: 1;
  padding: 0.7rem 1rem;
  background: #ffffff;
  color: #333;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #4A90E2;
}

.search-btn {
  padding: 0.7rem 1.5rem;
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.search-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.4);
}

.users-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #f5f5f5;
}

th {
  padding: 1rem;
  text-align: left;
  color: #555;
  font-weight: 600;
  border-bottom: 2px solid #e0e0e0;
}

td {
  padding: 1rem;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
}

tbody tr:hover {
  background: #f8f9fa;
}

.role-badge {
  display: inline-block;
  padding: 0.3rem 0.7rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
}

.role-badge.admin {
  background: rgba(255, 152, 0, 0.2);
  color: #ff9800;
  border: 1px solid rgba(255, 152, 0, 0.3);
}

.role-badge.user {
  background: rgba(74, 144, 226, 0.2);
  color: #4A90E2;
  border: 1px solid rgba(74, 144, 226, 0.3);
}

.delete-user-btn {
  padding: 0.4rem 0.8rem;
  background: rgba(244, 67, 54, 0.2);
  color: #f44336;
  border: 1px solid rgba(244, 67, 54, 0.3);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.3s ease;
}

.delete-user-btn:hover {
  background: rgba(244, 67, 54, 0.3);
}

.protected {
  color: #ccc;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
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
  .admin-page {
    padding: 1rem;
  }

  section {
    padding: 1.5rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .users-table {
    font-size: 0.85rem;
  }

  th, td {
    padding: 0.75rem 0.5rem;
  }
}
</style>
