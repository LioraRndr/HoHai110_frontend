<template>
  <PageLayout>
    <div class="profile-page">
      <div class="page-header">
        <h1>个人中心</h1>
        <p class="subtitle">管理您的个人信息</p>
      </div>

      <div class="profile-container">
        <!-- 侧边栏 -->
        <aside class="sidebar">
          <nav class="nav-menu">
            <button
              v-for="item in menuItems"
              :key="item.id"
              :class="['menu-item', { active: activeTab === item.id }]"
              @click="activeTab = item.id"
            >
              <span class="menu-icon">{{ item.icon }}</span>
              <span class="menu-label">{{ item.label }}</span>
            </button>
          </nav>
        </aside>

        <!-- 主内容区 -->
        <main class="main-content">
          <!-- 基本信息 -->
          <section v-if="activeTab === 'basic'" class="content-section">
            <h2>基本信息</h2>
            <div v-if="loading" class="loading-text">加载中...</div>
            <div v-else class="form-container">
              <div class="form-group">
                <label>头像</label>
                <div class="avatar-upload">
                  <img :src="profile.avatar || '/default-avatar.png'" alt="头像" class="avatar-preview" />
                  <button @click="showAvatarDialog = true" class="upload-btn">更换头像</button>
                </div>
              </div>

              <div class="form-group">
                <label>用户名</label>
                <input v-model="profile.username" type="text" class="form-input" />
              </div>

              <div class="form-group">
                <label>个人简介</label>
                <textarea v-model="profile.bio" class="form-textarea" rows="4" placeholder="介绍一下自己..."></textarea>
              </div>

              <div class="form-group">
                <label>毕业年份</label>
                <input v-model.number="profile.graduationYear" type="number" class="form-input" placeholder="例如: 2020" />
              </div>

              <div class="form-group">
                <label>院系</label>
                <input v-model="profile.department" type="text" class="form-input" placeholder="例如: 计算机学院" />
              </div>

              <button @click="updateBasicInfo" class="save-btn" :disabled="saving">
                {{ saving ? '保存中...' : '保存更改' }}
              </button>
            </div>
          </section>

          <!-- 账户安全 -->
          <section v-if="activeTab === 'security'" class="content-section">
            <h2>账户安全</h2>
            <div class="security-container">
              <!-- 邮箱验证 -->
              <div class="security-item">
                <div class="security-info">
                  <h3>邮箱地址</h3>
                  <p>{{ profile.email }}</p>
                </div>
                <button @click="showEmailDialog = true" class="action-btn">更换邮箱</button>
              </div>

              <!-- 修改密码 -->
              <div class="security-item">
                <div class="security-info">
                  <h3>登录密码</h3>
                  <p>定期更换密码可以提高账户安全性</p>
                </div>
                <button @click="showPasswordDialog = true" class="action-btn">修改密码</button>
              </div>
            </div>
          </section>

          <!-- 我的活动 -->
          <section v-if="activeTab === 'activities'" class="content-section">
            <h2>我的活动</h2>
            <div v-if="loading" class="loading-text">加载中...</div>
            <div v-else class="stats-grid">
              <div class="stat-card">
                <div class="stat-icon">🎉</div>
                <div class="stat-info">
                  <div class="stat-value">{{ profile.contributions?.maxims || 0 }}</div>
                  <div class="stat-label">格言贡献</div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">🏃</div>
                <div class="stat-info">
                  <div class="stat-value">{{ profile.contributions?.relayParticipations || 0 }}</div>
                  <div class="stat-label">接力参与</div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">🎨</div>
                <div class="stat-info">
                  <div class="stat-value">{{ profile.contributions?.mosaicCompleted || 0 }}</div>
                  <div class="stat-label">拼图完成</div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <!-- 更换头像对话框 -->
      <div v-if="showAvatarDialog" class="dialog-overlay" @click.self="showAvatarDialog = false">
        <div class="dialog">
          <div class="dialog-header">
            <h3>更换头像</h3>
            <button @click="showAvatarDialog = false" class="close-btn">×</button>
          </div>
          <div class="dialog-body">
            <div class="form-group">
              <label>头像URL</label>
              <input v-model="newAvatar" type="text" class="form-input" placeholder="请输入图片URL" />
            </div>
            <div v-if="newAvatar" class="avatar-preview-container">
              <img :src="newAvatar" alt="预览" class="avatar-preview" />
            </div>
          </div>
          <div class="dialog-footer">
            <button @click="showAvatarDialog = false" class="cancel-btn">取消</button>
            <button @click="updateAvatar" class="confirm-btn">确认</button>
          </div>
        </div>
      </div>

      <!-- 修改密码对话框 -->
      <div v-if="showPasswordDialog" class="dialog-overlay" @click.self="showPasswordDialog = false">
        <div class="dialog">
          <div class="dialog-header">
            <h3>修改密码</h3>
            <button @click="showPasswordDialog = false" class="close-btn">×</button>
          </div>
          <div class="dialog-body">
            <div class="form-group">
              <label>旧密码</label>
              <input v-model="passwordForm.oldPassword" type="password" class="form-input" />
            </div>
            <div class="form-group">
              <label>新密码</label>
              <input v-model="passwordForm.newPassword" type="password" class="form-input" />
            </div>
          </div>
          <div class="dialog-footer">
            <button @click="showPasswordDialog = false" class="cancel-btn">取消</button>
            <button @click="changePassword" class="confirm-btn">确认</button>
          </div>
        </div>
      </div>

      <!-- 更换邮箱对话框 -->
      <div v-if="showEmailDialog" class="dialog-overlay" @click.self="showEmailDialog = false">
        <div class="dialog">
          <div class="dialog-header">
            <h3>更换邮箱</h3>
            <button @click="showEmailDialog = false" class="close-btn">×</button>
          </div>
          <div class="dialog-body">
            <div class="form-group">
              <label>新邮箱地址</label>
              <input v-model="emailForm.newEmail" type="email" class="form-input" />
            </div>
            <div class="form-group">
              <label>验证码</label>
              <div class="code-input-group">
                <input v-model="emailForm.code" type="text" class="form-input" placeholder="请输入验证码" />
                <button @click="sendEmailCode" :disabled="codeSending || countdown > 0" class="code-btn">
                  {{ countdown > 0 ? `${countdown}秒后重试` : codeSending ? '发送中...' : '发送验证码' }}
                </button>
              </div>
            </div>
          </div>
          <div class="dialog-footer">
            <button @click="showEmailDialog = false" class="cancel-btn">取消</button>
            <button @click="changeEmail" class="confirm-btn">确认</button>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { userAPI } from '@/api'
import { $message } from '@/utils/message.js'
import PageLayout from '@/components/PageLayout.vue'

const activeTab = ref('basic')
const loading = ref(true)
const saving = ref(false)

const profile = reactive({
  username: '',
  email: '',
  avatar: '',
  bio: '',
  graduationYear: null,
  department: '',
  contributions: {
    maxims: 0,
    relayParticipations: 0,
    mosaicCompleted: 0
  }
})

const menuItems = [
  { id: 'basic', icon: '👤', label: '基本信息' },
  { id: 'security', icon: '🔒', label: '账户安全' },
  { id: 'activities', icon: '📊', label: '我的活动' }
]

// 对话框状态
const showAvatarDialog = ref(false)
const showPasswordDialog = ref(false)
const showEmailDialog = ref(false)
const newAvatar = ref('')

const passwordForm = reactive({
  oldPassword: '',
  newPassword: ''
})

const emailForm = reactive({
  newEmail: '',
  code: ''
})

const codeSending = ref(false)
const countdown = ref(0)

// 加载个人信息
const loadProfile = async () => {
  loading.value = true
  try {
    const response = await userAPI.getProfile()
    console.log('API响应:', response)
    // 后端返回的数据结构: { code: 0, data: null, message: {...用户数据} }
    const userData = response.message || response.data || response
    console.log('用户数据:', userData)
    Object.assign(profile, userData)
  } catch (error) {
    console.error('加载个人信息失败:', error)
    $message.error('加载失败')
  } finally {
    loading.value = false
  }
}

// 更新基本信息
const updateBasicInfo = async () => {
  saving.value = true
  try {
    await userAPI.updateProfile({
      username: profile.username,
      bio: profile.bio,
      graduationYear: profile.graduationYear,
      department: profile.department
    })
    $message.success('保存成功')
  } catch (error) {
    console.error('保存失败:', error)
    $message.error(error.response?.data?.message || '保存失败')
  } finally {
    saving.value = false
  }
}

// 更新头像
const updateAvatar = async () => {
  if (!newAvatar.value) {
    $message.error('请输入头像URL')
    return
  }

  try {
    await userAPI.updateProfile({ avatar: newAvatar.value })
    profile.avatar = newAvatar.value
    showAvatarDialog.value = false
    newAvatar.value = ''
    $message.success('头像更新成功')
  } catch (error) {
    console.error('更新头像失败:', error)
    $message.error('更新失败')
  }
}

// 修改密码
const changePassword = async () => {
  if (!passwordForm.oldPassword || !passwordForm.newPassword) {
    $message.error('请填写完整')
    return
  }

  if (passwordForm.newPassword.length < 6) {
    $message.error('新密码至少6位')
    return
  }

  try {
    await userAPI.changePassword({
      oldPassword: passwordForm.oldPassword,
      newPassword: passwordForm.newPassword
    })
    showPasswordDialog.value = false
    passwordForm.oldPassword = ''
    passwordForm.newPassword = ''
    $message.success('密码修改成功')
  } catch (error) {
    console.error('修改密码失败:', error)
    $message.error(error.response?.data?.message || '修改失败')
  }
}

// 发送邮箱验证码
const sendEmailCode = async () => {
  if (!emailForm.newEmail) {
    $message.error('请输入新邮箱地址')
    return
  }

  codeSending.value = true
  try {
    await userAPI.sendEmailCode({
      email: emailForm.newEmail,
      type: 'email_change'
    })
    $message.success('验证码已发送')

    // 开始倒计时
    countdown.value = 60
    const timer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(timer)
      }
    }, 1000)
  } catch (error) {
    console.error('发送验证码失败:', error)
    $message.error(error.response?.data?.message || '发送失败')
  } finally {
    codeSending.value = false
  }
}

// 更换邮箱
const changeEmail = async () => {
  if (!emailForm.newEmail || !emailForm.code) {
    $message.error('请填写完整')
    return
  }

  try {
    await userAPI.changeEmail({
      newEmail: emailForm.newEmail,
      code: emailForm.code
    })
    profile.email = emailForm.newEmail
    showEmailDialog.value = false
    emailForm.newEmail = ''
    emailForm.code = ''
    $message.success('邮箱更换成功')
  } catch (error) {
    console.error('更换邮箱失败:', error)
    $message.error(error.response?.data?.message || '更换失败')
  }
}

onMounted(() => {
  loadProfile()
})
</script>

<style scoped>
.profile-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
  margin-top: 60px;
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

.profile-container {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
}

/* 侧边栏 */
.sidebar {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  padding: 1rem;
  height: fit-content;
  position: sticky;
  top: 100px;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  color: #666;
  font-size: 0.95rem;
}

.menu-item:hover {
  background: #f5f5f5;
  color: #333;
}

.menu-item.active {
  background: linear-gradient(135deg, rgba(74, 144, 226, 0.1) 0%, rgba(53, 122, 189, 0.1) 100%);
  color: #4A90E2;
  font-weight: 600;
}

.menu-icon {
  font-size: 1.3rem;
}

.menu-label {
  flex: 1;
}

/* 主内容区 */
.main-content {
  min-height: 500px;
}

.content-section {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.content-section h2 {
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

/* 表单 */
.form-container {
  max-width: 600px;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  background: #ffffff;
  color: #333;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #4A90E2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

/* 头像上传 */
.avatar-upload {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar-preview {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e0e0e0;
}

.upload-btn {
  padding: 0.6rem 1.2rem;
  background: rgba(74, 144, 226, 0.1);
  color: #4A90E2;
  border: 1px solid rgba(74, 144, 226, 0.3);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.upload-btn:hover {
  background: rgba(74, 144, 226, 0.2);
}

.save-btn {
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.save-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.4);
}

.save-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* 安全设置 */
.security-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.security-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.security-info h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
}

.security-info p {
  color: #666;
  font-size: 0.9rem;
}

.action-btn {
  padding: 0.6rem 1.5rem;
  background: white;
  color: #4A90E2;
  border: 1px solid #4A90E2;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: #4A90E2;
  color: white;
}

/* 统计卡片 */
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
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border: 1px solid #e0e0e0;
  border-radius: 12px;
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

/* 对话框 */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog {
  background: #ffffff;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.dialog-header h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: #999;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #f0f0f0;
  color: #333;
}

.dialog-body {
  padding: 1.5rem;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1.5rem;
  border-top: 1px solid #e0e0e0;
}

.cancel-btn,
.confirm-btn {
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.cancel-btn {
  background: #f0f0f0;
  color: #666;
}

.cancel-btn:hover {
  background: #e0e0e0;
}

.confirm-btn {
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  color: white;
}

.confirm-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.4);
}

.avatar-preview-container {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.code-input-group {
  display: flex;
  gap: 0.5rem;
}

.code-btn {
  padding: 0.75rem 1rem;
  background: rgba(74, 144, 226, 0.1);
  color: #4A90E2;
  border: 1px solid rgba(74, 144, 226, 0.3);
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.code-btn:hover:not(:disabled) {
  background: rgba(74, 144, 226, 0.2);
}

.code-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 响应式 */
@media (max-width: 1024px) {
  .profile-container {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: static;
  }

  .nav-menu {
    flex-direction: row;
    overflow-x: auto;
  }

  .menu-item {
    flex-shrink: 0;
  }
}

@media (max-width: 768px) {
  .profile-page {
    padding: 1rem;
  }

  .content-section {
    padding: 1.5rem;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .avatar-upload {
    flex-direction: column;
    align-items: flex-start;
  }

  .security-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>
