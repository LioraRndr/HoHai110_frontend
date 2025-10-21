<template>
  <PageLayout>
    <div class="article-detail-page">
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>加载中...</p>
      </div>

      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
        <button @click="$router.back()" class="back-btn">返回</button>
      </div>

      <article v-else class="article-container">
        <!-- 文章头部 -->
        <header class="article-header">
          <div class="breadcrumb">
            <router-link to="/articles">文章列表</router-link>
            <span class="separator">></span>
            <span class="current">{{ article.title }}</span>
          </div>

          <h1 class="article-title">{{ article.title }}</h1>

          <div class="article-meta">
            <span v-if="article.category" class="category-tag">
              {{ article.category }}
            </span>
            <div class="meta-info">
              <span class="author">作者：{{ article.author?.username || '管理员' }}</span>
              <span class="date">{{ formatDate(article.publishedAt || article.createdAt) }}</span>
              <span class="views">
                <span class="icon">👁</span>
                {{ article.views || 0 }} 次浏览
              </span>
            </div>
          </div>

          <div v-if="article.coverImage" class="cover-image">
            <img :src="article.coverImage" :alt="article.title" />
          </div>
        </header>

        <!-- 文章内容 -->
        <div class="article-content" v-html="formatContent(article.content)"></div>

        <!-- 标签 -->
        <div v-if="article.tags && article.tags.length > 0" class="article-tags">
          <span class="tags-label">标签：</span>
          <span
            v-for="tag in article.tags"
            :key="tag"
            class="tag"
          >
            {{ tag }}
          </span>
        </div>

        <!-- 分享和操作 -->
        <div class="article-actions">
          <button @click="shareArticle" class="action-btn">
            <span class="icon">🔗</span>
            分享
          </button>
          <button
            v-if="canEdit"
            @click="editArticle"
            class="action-btn edit"
          >
            <span class="icon">✏️</span>
            编辑
          </button>
          <button
            v-if="canDelete"
            @click="deleteArticle"
            class="action-btn delete"
          >
            <span class="icon">🗑️</span>
            删除
          </button>
        </div>

        <!-- 评论区 -->
        <CommentSection :article-id="articleId" />
      </article>
    </div>
  </PageLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { articleAPI } from '@/api'
import PageLayout from '@/components/PageLayout.vue'
import CommentSection from '@/components/CommentSection.vue'
import { showError, showSuccess } from '@/utils/message'

const route = useRoute()
const router = useRouter()

const article = ref({})
const loading = ref(true)
const error = ref(null)

const articleId = computed(() => route.params.id)

const canEdit = computed(() => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  return user.id === article.value.authorId || user.role === 'admin'
})

const canDelete = computed(() => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  return user.role === 'admin'
})

// 加载文章详情
const loadArticle = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await articleAPI.getArticle(articleId.value)
    article.value = response.data
  } catch (err) {
    console.error('加载文章失败:', err)
    error.value = err.message || '文章加载失败'
  } finally {
    loading.value = false
  }
}

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 格式化内容（保留换行）
const formatContent = (content) => {
  if (!content) return ''
  // 将换行符转换为 <br>，并保留其他 HTML 标签
  return content
    .replace(/\n/g, '<br>')
    .replace(/\r/g, '')
}

// 分享文章
const shareArticle = () => {
  const url = window.location.href
  if (navigator.share) {
    navigator.share({
      title: article.value.title,
      text: article.value.summary,
      url: url
    }).catch((error) => console.log('分享失败:', error))
  } else {
    // 复制链接到剪贴板
    navigator.clipboard.writeText(url).then(() => {
      showSuccess('文章链接已复制到剪贴板！')
    }).catch((error) => {
      console.error('复制失败:', error)
      showError('无法复制链接')
    })
  }
}

// 编辑文章
const editArticle = () => {
  router.push(`/articles/${articleId.value}/edit`)
}

// 删除文章
const deleteArticle = async () => {
  if (!confirm('确定要删除这篇文章吗？此操作不可恢复。')) return

  try {
    await articleAPI.deleteArticle(articleId.value)
    showSuccess('文章已删除')
    router.push('/articles')
  } catch (err) {
    console.error('删除文章失败:', err)
    showError('删除失败: ' + err.message)
  }
}

onMounted(() => {
  loadArticle()
})
</script>

<style scoped>
.article-detail-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 80vh;
}

.loading,
.error {
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

.back-btn {
  margin-top: 1rem;
  padding: 0.6rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}

.article-container {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 3rem;
  backdrop-filter: blur(10px);
}

.article-header {
  margin-bottom: 2.5rem;
}

.breadcrumb {
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
}

.breadcrumb a {
  color: #4A90E2;
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb a:hover {
  color: #357ABD;
}

.separator {
  margin: 0 0.5rem;
}

.current {
  color: rgba(255, 255, 255, 0.8);
}

.article-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.3;
  margin-bottom: 1.5rem;
}

.article-meta {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.category-tag {
  display: inline-block;
  padding: 0.4rem 1rem;
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 20px;
  width: fit-content;
}

.meta-info {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.6);
}

.author {
  font-weight: 500;
}

.views {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.cover-image {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.cover-image img {
  width: 100%;
  height: auto;
  display: block;
}

.article-content {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.article-content :deep(p) {
  margin-bottom: 1rem;
}

.article-content :deep(h2) {
  font-size: 1.8rem;
  font-weight: 600;
  margin: 2rem 0 1rem;
  color: #ffffff;
}

.article-content :deep(h3) {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1.5rem 0 0.75rem;
  color: #ffffff;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  margin-left: 2rem;
  margin-bottom: 1rem;
}

.article-content :deep(li) {
  margin-bottom: 0.5rem;
}

.article-tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
}

.tags-label {
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

.tag {
  padding: 0.4rem 0.9rem;
  background: rgba(74, 144, 226, 0.1);
  color: #4A90E2;
  border: 1px solid rgba(74, 144, 226, 0.3);
  border-radius: 20px;
  font-size: 0.85rem;
}

.article-actions {
  display: flex;
  gap: 1rem;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 3rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  font-weight: 500;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.action-btn.edit:hover {
  background: rgba(74, 144, 226, 0.2);
  border-color: rgba(74, 144, 226, 0.4);
}

.action-btn.delete:hover {
  background: rgba(255, 107, 107, 0.2);
  border-color: rgba(255, 107, 107, 0.4);
  color: #ff6b6b;
}

.icon {
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .article-detail-page {
    padding: 1rem;
  }

  .article-container {
    padding: 1.5rem;
  }

  .article-title {
    font-size: 1.8rem;
  }

  .article-content {
    font-size: 1rem;
  }

  .meta-info {
    flex-direction: column;
    gap: 0.5rem;
  }

  .article-actions {
    flex-wrap: wrap;
  }
}
</style>
