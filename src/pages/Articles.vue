<template>
  <PageLayout>
    <div class="forum-page">
      <div class="page-header">
        <h1>共话百十 · 校友论坛</h1>
        <p class="subtitle">分享记忆，交流想法，共建河海社区</p>
      </div>

      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>加载中...</p>
      </div>

      <div v-else class="forums-container">
        <div
          v-for="forum in forums"
          :key="forum.id"
          class="forum-card"
          @click="goToForum(forum.id)"
        >
          <div class="forum-icon">{{ forum.icon || '💬' }}</div>
          <div class="forum-info">
            <h3 class="forum-name">{{ forum.name }}</h3>
            <p class="forum-description">{{ forum.description }}</p>
          </div>
          <div class="forum-stats">
            <div class="stat-item">
              <span class="stat-value">{{ forum.postCount }}</span>
              <span class="stat-label">帖子</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ forum.replyCount }}</span>
              <span class="stat-label">回复</span>
            </div>
          </div>
        </div>

        <div v-if="forums.length === 0" class="empty-state">
          <p>暂无板块</p>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { forumAPI } from '@/api'
import { $message } from '@/utils/message.js'
import PageLayout from '@/components/PageLayout.vue'

const router = useRouter()
const forums = ref([])
const loading = ref(true)

// 加载板块列表
const loadForums = async () => {
  loading.value = true
  try {
    const response = await forumAPI.getForums({ status: 'active' })
    forums.value = response.data.forums || []
  } catch (error) {
    console.error('加载板块失败:', error)
    $message.error('加载板块失败: ' + error.message)
  } finally {
    loading.value = false
  }
}

// 跳转到板块详情
const goToForum = (forumId) => {
  router.push({ name: 'ForumBoard', params: { id: forumId } })
}

onMounted(() => {
  loadForums()
})
</script>

<style scoped>
.forum-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 80vh;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  margin-top: 90px;
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

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  color: #999;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(74, 144, 226, 0.1);
  border-top-color: #4A90E2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.forums-container {
  display: grid;
  gap: 1.5rem;
}

.forum-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.forum-card:hover {
  transform: translateY(-4px);
  border-color: #4A90E2;
  box-shadow: 0 8px 24px rgba(74, 144, 226, 0.15);
}

.forum-icon {
  font-size: 3rem;
  min-width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
}

.forum-info {
  flex: 1;
}

.forum-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.forum-description {
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
}

.forum-stats {
  display: flex;
  gap: 2rem;
  padding-left: 2rem;
  border-left: 1px solid #e0e0e0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #4A90E2;
}

.stat-label {
  font-size: 0.85rem;
  color: #999;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #999;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .forum-page {
    padding: 1rem;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .forum-card {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
  }

  .forum-stats {
    border-left: none;
    border-top: 1px solid #e0e0e0;
    padding-left: 0;
    padding-top: 1rem;
    width: 100%;
    justify-content: center;
  }

  .forum-icon {
    min-width: 60px;
    height: 60px;
    font-size: 2rem;
  }
}
</style>
