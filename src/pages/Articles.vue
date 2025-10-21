<template>
  <PageLayout>
    <div class="articles-page">
      <div class="page-header">
        <h1>校庆动态</h1>
        <p class="subtitle">记录河海大学110周年校庆的精彩瞬间</p>
      </div>

      <!-- 筛选和搜索 -->
      <div class="filters-section">
        <div class="filter-group">
          <label>分类：</label>
          <select v-model="filters.category" @change="loadArticles">
            <option value="">全部</option>
            <option value="校庆动态">校庆动态</option>
            <option value="通知公告">通知公告</option>
            <option value="校友故事">校友故事</option>
            <option value="活动回顾">活动回顾</option>
          </select>
        </div>
        <div class="search-box">
          <input
            v-model="searchQuery"
            @keyup.enter="searchArticles"
            type="text"
            placeholder="搜索文章..."
            class="search-input"
          />
          <button @click="searchArticles" class="search-btn">搜索</button>
        </div>
      </div>

      <!-- 文章列表 -->
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>加载中...</p>
      </div>
      <div v-else-if="articles.length === 0" class="no-articles">
        <p>暂无文章</p>
      </div>
      <div v-else class="articles-grid">
        <ArticleCard
          v-for="article in articles"
          :key="article.id"
          :article="article"
          @click="goToArticle(article.id)"
        />
      </div>

      <!-- 分页 -->
      <div v-if="totalPages > 1" class="pagination">
        <button
          @click="changePage(page - 1)"
          :disabled="page === 1"
          class="page-btn"
        >
          « 上一页
        </button>
        <div class="page-numbers">
          <button
            v-for="pageNum in displayPages"
            :key="pageNum"
            @click="changePage(pageNum)"
            :class="{ active: pageNum === page }"
            class="page-number"
          >
            {{ pageNum }}
          </button>
        </div>
        <button
          @click="changePage(page + 1)"
          :disabled="page === totalPages"
          class="page-btn"
        >
          下一页 »
        </button>
      </div>
    </div>
  </PageLayout>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { articleAPI } from '@/api'
import PageLayout from '@/components/PageLayout.vue'
import ArticleCard from '@/components/ArticleCard.vue'
import { showError } from '@/utils/message'

const router = useRouter()

const articles = ref([])
const loading = ref(false)
const searchQuery = ref('')
const page = ref(1)
const total = ref(0)
const totalPages = ref(1)
const limit = 12

const filters = reactive({
  category: '',
  status: 'published'
})

// 计算显示的页码
const displayPages = computed(() => {
  const pages = []
  const maxDisplay = 5
  let start = Math.max(1, page.value - Math.floor(maxDisplay / 2))
  let end = Math.min(totalPages.value, start + maxDisplay - 1)

  if (end - start < maxDisplay - 1) {
    start = Math.max(1, end - maxDisplay + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

// 加载文章列表
const loadArticles = async () => {
  loading.value = true
  try {
    const params = {
      page: page.value,
      limit,
      ...filters
    }
    if (searchQuery.value) {
      params.search = searchQuery.value
    }

    const response = await articleAPI.getArticles(params)
    articles.value = response.data.articles
    total.value = response.data.total
    totalPages.value = response.data.totalPages
  } catch (error) {
    console.error('加载文章失败:', error)
    showError('加载文章失败: ' + error.message)
  } finally {
    loading.value = false
  }
}

// 搜索文章
const searchArticles = () => {
  page.value = 1
  loadArticles()
}

// 切换页码
const changePage = (newPage) => {
  if (newPage < 1 || newPage > totalPages.value) return
  page.value = newPage
  loadArticles()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 跳转到文章详情
const goToArticle = (articleId) => {
  router.push(`/articles/${articleId}`)
}

onMounted(() => {
  loadArticles()
})
</script>

<style scoped>
.articles-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 80vh;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
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
  color: rgba(255, 255, 255, 0.7);
}

.filters-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
}

.filter-group select {
  padding: 0.6rem 1rem;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-group select:hover {
  border-color: #4A90E2;
}

.search-box {
  display: flex;
  gap: 0.5rem;
}

.search-input {
  padding: 0.6rem 1rem;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  min-width: 250px;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #4A90E2;
  background: rgba(0, 0, 0, 0.4);
}

.search-btn {
  padding: 0.6rem 1.5rem;
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.4);
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  color: rgba(255, 255, 255, 0.7);
}

.spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: #4A90E2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.no-articles {
  text-align: center;
  padding: 4rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.1rem;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
}

.page-btn {
  padding: 0.7rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.page-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.page-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
}

.page-number {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.page-number:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.page-number.active {
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  color: white;
  border-color: transparent;
}

@media (max-width: 768px) {
  .articles-page {
    padding: 1rem;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .filters-section {
    flex-direction: column;
    align-items: stretch;
  }

  .search-input {
    min-width: 100%;
  }

  .articles-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .page-numbers {
    flex-wrap: wrap;
  }
}
</style>
