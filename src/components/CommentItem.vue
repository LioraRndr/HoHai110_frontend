<template>
  <div class="comment-item">
    <div class="comment-header">
      <img
        :src="comment.user.avatar || defaultAvatar"
        :alt="comment.user.username"
        class="user-avatar"
      />
      <div class="user-info">
        <span class="username">{{ comment.user.username }}</span>
        <span class="comment-date">{{ formatDate(comment.createdAt) }}</span>
      </div>
      <div class="comment-actions">
        <button
          v-if="isLoggedIn"
          @click="toggleLike"
          class="like-btn"
          :class="{ liked: comment.isLiked }"
        >
          <span class="icon">{{ comment.isLiked ? '❤️' : '♡' }}</span>
          <span class="count">{{ comment.likes || 0 }}</span>
        </button>
        <button v-if="isLoggedIn" @click="$emit('reply', comment)" class="reply-btn">
          回复
        </button>
        <button
          v-if="canDelete"
          @click="$emit('delete', comment.id)"
          class="delete-btn"
        >
          删除
        </button>
      </div>
    </div>

    <div class="comment-content">
      {{ comment.content }}
    </div>

    <!-- 回复列表 -->
    <div v-if="comment.replies && comment.replies.length > 0" class="replies-list">
      <CommentItem
        v-for="reply in comment.replies"
        :key="reply.id"
        :comment="reply"
        :is-reply="true"
        @reply="$emit('reply', $event)"
        @delete="$emit('delete', $event)"
        @like="$emit('like', $event)"
        @unlike="$emit('unlike', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  comment: {
    type: Object,
    required: true
  },
  isReply: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['reply', 'delete', 'like', 'unlike'])

const defaultAvatar = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%234A90E2"%3E%3Cpath d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/%3E%3C/svg%3E'

const isLoggedIn = computed(() => {
  return !!localStorage.getItem('token')
})

const canDelete = computed(() => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  return user.id === props.comment.user.id || user.role === 'admin'
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now - date
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 7) {
    return date.toLocaleDateString('zh-CN')
  } else if (days > 0) {
    return `${days}天前`
  } else if (hours > 0) {
    return `${hours}小时前`
  } else if (minutes > 0) {
    return `${minutes}分钟前`
  } else {
    return '刚刚'
  }
}

const toggleLike = () => {
  if (props.comment.isLiked) {
    emit('unlike', props.comment.id)
  } else {
    emit('like', props.comment.id)
  }
}
</script>

<style scoped>
.comment-item {
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.comment-item:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.username {
  font-weight: 600;
  color: #ffffff;
  font-size: 0.95rem;
}

.comment-date {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
}

.comment-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.like-btn,
.reply-btn,
.delete-btn {
  padding: 0.4rem 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.like-btn:hover,
.reply-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.like-btn.liked {
  color: #ff6b6b;
  background: rgba(255, 107, 107, 0.1);
  border-color: rgba(255, 107, 107, 0.3);
}

.delete-btn {
  color: #ff6b6b;
}

.delete-btn:hover {
  background: rgba(255, 107, 107, 0.1);
  border-color: rgba(255, 107, 107, 0.3);
}

.icon {
  font-size: 1rem;
}

.count {
  font-size: 0.85rem;
}

.comment-content {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  font-size: 0.95rem;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.replies-list {
  margin-top: 1rem;
  margin-left: 3rem;
  padding-left: 1rem;
  border-left: 2px solid rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .replies-list {
    margin-left: 1rem;
  }

  .user-avatar {
    width: 32px;
    height: 32px;
  }

  .comment-actions {
    flex-wrap: wrap;
  }
}
</style>
