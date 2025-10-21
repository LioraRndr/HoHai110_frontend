<template>
  <div class="mosaic-page">
    <Navbar />
    <div class="mosaic-container">
      <div class="page-header">
        <h1 class="page-title">校友照片墙</h1>
        <p class="page-subtitle">十万校友,万千回忆,共筑河海百十年辉煌</p>
      </div>

      <div class="stats-bar">
        <div class="stat-item">
          <div class="stat-number">{{ totalPhotos }}</div>
          <div class="stat-label">照片总数</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ participants }}</div>
          <div class="stat-label">参与人数</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">110</div>
          <div class="stat-label">周年校庆</div>
        </div>
      </div>

      <div class="mosaic-grid" ref="gridRef">
        <div
          v-for="photo in photos"
          :key="photo.id"
          class="photo-item"
          :style="{ animationDelay: `${photo.delay}ms` }"
          @click="selectPhoto(photo)"
        >
          <div class="photo-placeholder" :style="{ background: photo.color }">
            <span class="photo-initial">{{ photo.initial }}</span>
          </div>
          <div class="photo-info">
            <div class="photo-name">{{ photo.name }}</div>
            <div class="photo-year">{{ photo.year }}</div>
          </div>
        </div>
      </div>

      <div class="upload-section">
        <button class="upload-btn" @click="showUploadModal = true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
          </svg>
          上传你的照片
        </button>
      </div>

      <!-- 上传弹窗 -->
      <transition name="modal">
        <div v-if="showUploadModal" class="modal-overlay" @click="showUploadModal = false">
          <div class="upload-modal" @click.stop>
            <button class="close-btn" @click="showUploadModal = false">×</button>

            <h3>上传你的照片</h3>
            <p class="modal-desc">分享你与河海的美好回忆</p>

            <div class="upload-form">
              <div class="form-group">
                <label>你的姓名</label>
                <input v-model="uploadForm.name" type="text" placeholder="请输入姓名" />
              </div>

              <div class="form-group">
                <label>入学年份</label>
                <input v-model="uploadForm.year" type="text" placeholder="例如: 2010级" />
              </div>

              <div class="form-group">
                <label>照片描述</label>
                <textarea
                  v-model="uploadForm.description"
                  rows="3"
                  placeholder="简单描述这张照片的故事..."
                ></textarea>
              </div>

              <div class="upload-area">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <p>点击或拖拽上传照片</p>
                <span>支持 JPG, PNG 格式</span>
              </div>

              <button class="submit-btn" @click="handleUpload">提交上传</button>
            </div>
          </div>
        </div>
      </transition>

      <!-- 照片详情弹窗 -->
      <transition name="modal">
        <div v-if="selectedPhoto" class="modal-overlay" @click="selectedPhoto = null">
          <div class="photo-modal" @click.stop>
            <button class="close-btn" @click="selectedPhoto = null">×</button>

            <div class="modal-photo" :style="{ background: selectedPhoto.color }">
              <span class="modal-initial">{{ selectedPhoto.initial }}</span>
            </div>

            <h3>{{ selectedPhoto.name }}</h3>
            <div class="modal-year">{{ selectedPhoto.year }}</div>
            <p v-if="selectedPhoto.description">{{ selectedPhoto.description }}</p>
          </div>
        </div>
      </transition>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { showWarning, showInfo } from '@/utils/message'

const gridRef = ref(null)
const showUploadModal = ref(false)
const selectedPhoto = ref(null)
const totalPhotos = ref(2567)
const participants = ref(1843)

const uploadForm = ref({
  name: '',
  year: '',
  description: ''
})

// 模拟照片数据
const colors = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
]

const generatePhotos = () => {
  const names = [
    '张三', '李四', '王五', '赵六', '孙七', '周八',
    '吴九', '郑十', '冯一', '陈二', '楚三', '卫四'
  ]

  const years = [
    '2020级', '2019级', '2018级', '2015级', '2010级', '2005级',
    '2000级', '95级', '90级', '85级', '80级', '75级'
  ]

  const photos = []
  for (let i = 0; i < 48; i++) {
    const name = names[Math.floor(Math.random() * names.length)] + (i % 10)
    photos.push({
      id: i + 1,
      name: name,
      year: years[Math.floor(Math.random() * years.length)],
      initial: name.charAt(0),
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: i * 30,
      description: '这是我在河海度过的美好时光...'
    })
  }
  return photos
}

const photos = ref(generatePhotos())

const selectPhoto = (photo) => {
  selectedPhoto.value = photo
}

const handleUpload = () => {
  if (!uploadForm.value.name || !uploadForm.value.year) {
    showWarning('请填写完整信息')
    return
  }

  showInfo('上传功能开发中,敬请期待!')
  showUploadModal.value = false
}
</script>

<style scoped>
.mosaic-page {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #F8F5EF 0%, #E5E2DC 100%);
}

.mosaic-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-3xl) var(--spacing-xl);
  padding-top: 100px;
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-3xl);
}

.page-title {
  font-size: var(--text-4xl);
  font-family: var(--font-title);
  font-weight: 700;
  color: var(--color-river-blue);
  margin-bottom: var(--spacing-md);
}

.page-subtitle {
  font-size: var(--text-lg);
  color: var(--color-ink-black);
  opacity: 0.7;
}

.stats-bar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-3xl);
}

.stat-item {
  background: white;
  padding: var(--spacing-xl);
  border-radius: var(--radius-xl);
  text-align: center;
  box-shadow: var(--shadow-soft);
}

.stat-number {
  font-size: var(--text-4xl);
  font-family: var(--font-title);
  font-weight: 700;
  background: var(--gradient-river);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--spacing-sm);
}

.stat-label {
  font-size: var(--text-sm);
  color: var(--color-ink-black);
  opacity: 0.7;
}

.mosaic-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-3xl);
}

.photo-item {
  aspect-ratio: 1;
  cursor: pointer;
  animation: fadeInUp 0.5s ease-out backwards;
  transition: all var(--transition-base);
}

.photo-item:hover {
  transform: translateY(-4px) scale(1.05);
  z-index: 10;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.photo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
  transition: all var(--transition-base);
}

.photo-item:hover .photo-placeholder {
  box-shadow: var(--shadow-medium);
}

.photo-initial {
  font-size: var(--text-3xl);
  font-family: var(--font-title);
  font-weight: 700;
  color: white;
}

.photo-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--spacing-sm);
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
  opacity: 0;
  transition: opacity var(--transition-base);
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
}

.photo-item:hover .photo-info {
  opacity: 1;
}

.photo-name {
  font-size: var(--text-sm);
  font-weight: 600;
  margin-bottom: 2px;
}

.photo-year {
  font-size: var(--text-xs);
  opacity: 0.9;
}

.upload-section {
  text-align: center;
}

.upload-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg) var(--spacing-3xl);
  background: var(--gradient-torch);
  color: white;
  border-radius: var(--radius-full);
  font-size: var(--text-lg);
  font-weight: 600;
  box-shadow: var(--shadow-medium);
  transition: all var(--transition-base);
}

.upload-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-strong);
}

.upload-btn svg {
  width: 24px;
  height: 24px;
}

/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--spacing-xl);
}

.upload-modal,
.photo-modal {
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--spacing-3xl);
  max-width: 500px;
  width: 100%;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
}

.close-btn {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background: var(--color-page-ivory);
  font-size: var(--text-2xl);
  transition: all var(--transition-base);
  z-index: 10;
}

.close-btn:hover {
  background: var(--color-river-blue);
  color: white;
}

.upload-modal h3,
.photo-modal h3 {
  font-size: var(--text-2xl);
  font-family: var(--font-title);
  color: var(--color-river-blue);
  margin-bottom: var(--spacing-md);
  text-align: center;
}

.modal-desc {
  text-align: center;
  color: var(--color-ink-black);
  opacity: 0.7;
  margin-bottom: var(--spacing-2xl);
}

.upload-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.form-group label {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-ink-black);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: var(--spacing-md);
  font-family: var(--font-body);
  font-size: var(--text-base);
  border: 2px solid var(--color-page-ivory);
  border-radius: var(--radius-md);
  transition: border-color var(--transition-base);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-river-blue);
}

.upload-area {
  border: 2px dashed var(--color-page-ivory);
  border-radius: var(--radius-lg);
  padding: var(--spacing-3xl);
  text-align: center;
  cursor: pointer;
  transition: all var(--transition-base);
}

.upload-area:hover {
  border-color: var(--color-river-blue);
  background: rgba(10, 106, 184, 0.05);
}

.upload-area svg {
  width: 48px;
  height: 48px;
  color: var(--color-river-blue);
  margin-bottom: var(--spacing-md);
}

.upload-area p {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-ink-black);
  margin-bottom: var(--spacing-xs);
}

.upload-area span {
  font-size: var(--text-sm);
  color: var(--color-ink-black);
  opacity: 0.6;
}

.submit-btn {
  width: 100%;
  padding: var(--spacing-lg);
  background: var(--gradient-river);
  color: white;
  border-radius: var(--radius-lg);
  font-size: var(--text-lg);
  font-weight: 600;
  transition: all var(--transition-base);
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-medium);
}

.modal-photo {
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-xl);
  margin: 0 auto var(--spacing-xl);
  box-shadow: var(--shadow-medium);
}

.modal-initial {
  font-size: 5rem;
  font-family: var(--font-title);
  font-weight: 700;
  color: white;
}

.modal-year {
  text-align: center;
  font-size: var(--text-sm);
  color: var(--color-ink-black);
  opacity: 0.6;
  margin-bottom: var(--spacing-lg);
}

.photo-modal p {
  font-size: var(--text-base);
  line-height: 1.8;
  color: var(--color-ink-black);
  text-align: center;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* 响应式 */
@media (max-width: 768px) {
  .page-title {
    font-size: var(--text-2xl);
  }

  .stats-bar {
    grid-template-columns: 1fr;
  }

  .mosaic-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: var(--spacing-sm);
  }

  .upload-btn {
    width: 100%;
  }
}
</style>
