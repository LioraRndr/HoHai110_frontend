<template>
  <div class="article-card" @click="$emit('click')">
    <div v-if="article.coverImage" class="card-image">
      <img :src="article.coverImage" :alt="article.title" />
      <div class="image-overlay"></div>
    </div>
    <div class="card-content">
      <div class="card-header">
        <span v-if="article.category" class="category-tag">
          {{ article.category }}
        </span>
        <span class="date">{{ formatDate(article.publishedAt || article.createdAt) }}</span>
      </div>
      <h3 class="article-title">{{ article.title }}</h3>
      <p class="article-summary">{{ article.summary || truncateContent(article.content) }}</p>
      <div class="card-footer">
        <div class="author-info">
          <span class="author-name">{{ article.author?.username || '管理员' }}</span>
        </div>
        <div class="meta-info">
          <span class="views">
            <span class="icon">👁</span>
            {{ article.views || 0 }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  article: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const truncateContent = (content) => {
  if (!content) return ''
  return content.length > 120 ? content.substring(0, 120) + '...' : content
}
</script>

<style scoped>
.article-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.article-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(74, 144, 226, 0.3);
  border-color: rgba(74, 144, 226, 0.4);
}

.card-image {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.article-card:hover .card-image img {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.4) 100%);
}

.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.category-tag {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  color: white;
  font-size: 0.8rem;
  font-weight: 500;
  border-radius: 20px;
}

.date {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
}

.article-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.75rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-summary {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 1.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.author-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.author-name {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

.meta-info {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.views {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
}

.icon {
  font-size: 1rem;
}

@media (max-width: 768px) {
  .card-image {
    height: 180px;
  }

  .article-title {
    font-size: 1.1rem;
  }

  .article-summary {
    font-size: 0.9rem;
  }
}
</style>
