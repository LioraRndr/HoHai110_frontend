<template>
  <div class="auth-page">
    <!-- 顶部导航栏 -->
    <nav class="auth-navbar">
      <div class="auth-navbar-container">
        <router-link to="/login" class="back-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>返回登录</span>
        </router-link>

        <div class="navbar-logo">
          <span class="logo-text">河海110周年</span>
        </div>
      </div>
    </nav>

    <div class="auth-container">
      <!-- 左侧装饰 -->
      <div class="auth-decoration">
        <div class="decoration-content">
          <h1 class="decoration-title">找回密码</h1>
          <h2 class="decoration-subtitle">河海大学110周年</h2>
          <p class="decoration-text">通过邮箱验证找回您的账户</p>
          <div class="decoration-wave">
            <svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,50 C300,100 400,0 600,50 C800,100 900,0 1200,50 L1200,120 L0,120 Z" fill="rgba(255,255,255,0.1)"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- 右侧表单 -->
      <div class="auth-form-wrapper">
        <div class="auth-form">
          <h2 class="form-title">找回密码</h2>
          <p class="form-subtitle">输入您的邮箱地址，我们将发送验证码</p>

          <!-- 成功提示 -->
          <transition name="fade">
            <div v-if="success" class="success-message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              验证码已发送到您的邮箱,正在跳转到重置密码页面...
            </div>
          </transition>

          <!-- 错误提示 -->
          <transition name="fade">
            <div v-if="error" class="error-message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {{ error }}
            </div>
          </transition>

          <form @submit.prevent="handleSubmit">
            <!-- 邮箱 -->
            <div class="form-group">
              <label for="email" class="form-label">邮箱地址</label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                class="form-input"
                placeholder="请输入您注册时使用的邮箱"
                required
                :disabled="isLoading"
              />
            </div>

            <!-- 提交按钮 -->
            <button
              type="submit"
              class="submit-button"
              :disabled="isLoading"
            >
              <span v-if="!isLoading">发送验证码</span>
              <span v-else class="loading-spinner">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                </svg>
                发送中...
              </span>
            </button>
          </form>

          <!-- 返回登录链接 -->
          <div class="auth-footer">
            想起密码了? <router-link to="/login" class="auth-link">立即登录</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { userAPI } from '@/api'

const router = useRouter()

const formData = reactive({
  email: ''
})

const isLoading = ref(false)
const error = ref('')
const success = ref(false)

const handleSubmit = async () => {
  error.value = ''

  // 表单验证
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.email)) {
    error.value = '请输入有效的邮箱地址'
    return
  }

  isLoading.value = true

  try {
    await userAPI.forgotPassword({
      email: formData.email
    })

    success.value = true
    // 2秒后跳转到重置密码页面,带上邮箱参数
    setTimeout(() => {
      router.push({
        path: '/reset-password',
        query: { email: formData.email }
      })
    }, 2000)
  } catch (err) {
    error.value = err.response?.data?.message || '发送失败,请稍后重试'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* 顶部导航栏 */
.auth-navbar {
  width: 100%;
  padding: var(--spacing-lg) 0;
  position: relative;
  z-index: 10;
}

.auth-navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.back-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: white;
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 600;
  transition: all var(--transition-base);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateX(-4px);
  color: white;
}

.back-button svg {
  width: 20px;
  height: 20px;
}

.navbar-logo .logo-text {
  font-size: var(--text-xl);
  font-family: var(--font-title);
  font-weight: 700;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.auth-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  border-radius: var(--radius-xl);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  display: grid;
  grid-template-columns: 45% 55%;
}

.auth-decoration {
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  padding: var(--spacing-3xl);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.decoration-content {
  position: relative;
  z-index: 2;
  color: white;
}

.decoration-title {
  font-size: var(--text-5xl);
  font-family: var(--font-title);
  font-weight: 700;
  margin-bottom: var(--spacing-md);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.decoration-subtitle {
  font-size: var(--text-3xl);
  font-family: var(--font-title);
  font-weight: 600;
  margin-bottom: var(--spacing-lg);
  opacity: 0.95;
}

.decoration-text {
  font-size: var(--text-xl);
  opacity: 0.9;
  line-height: 1.8;
}

.decoration-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.3;
}

.decoration-wave svg {
  width: 100%;
  height: auto;
}

.auth-form-wrapper {
  padding: var(--spacing-3xl);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.auth-form {
  width: 100%;
  max-width: 400px;
}

.form-title {
  font-size: var(--text-3xl);
  font-family: var(--font-title);
  font-weight: 700;
  color: var(--color-ink-black);
  margin-bottom: var(--spacing-sm);
}

.form-subtitle {
  font-size: var(--text-base);
  color: var(--color-ink-black);
  opacity: 0.6;
  margin-bottom: var(--spacing-2xl);
}

.success-message {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: #d4edda;
  color: #155724;
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  margin-bottom: var(--spacing-lg);
}

.success-message svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.error-message {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: #fee;
  color: #c33;
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  margin-bottom: var(--spacing-lg);
}

.error-message svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.form-group {
  margin-bottom: var(--spacing-lg);
}

.form-label {
  display: block;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-ink-black);
  margin-bottom: var(--spacing-xs);
}

.form-input {
  width: 100%;
  padding: var(--spacing-md);
  font-size: var(--text-base);
  border: 2px solid #e0e0e0;
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
  font-family: inherit;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-river-blue);
  box-shadow: 0 0 0 3px rgba(10, 106, 184, 0.1);
}

.form-input:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.submit-button {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: var(--text-lg);
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-base);
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(245, 158, 11, 0.3);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
}

.loading-spinner svg {
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.auth-footer {
  text-align: center;
  margin-top: var(--spacing-xl);
  font-size: var(--text-sm);
  color: var(--color-ink-black);
  opacity: 0.7;
}

.auth-link {
  color: var(--color-river-blue);
  font-weight: 600;
  transition: color var(--transition-base);
}

.auth-link:hover {
  color: var(--color-torch-amber);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .auth-navbar-container {
    padding: 0 var(--spacing-md);
  }

  .navbar-logo .logo-text {
    font-size: var(--text-base);
  }

  .back-button span {
    display: none;
  }

  .auth-page {
    padding: 0;
  }

  .auth-container {
    grid-template-columns: 1fr;
    margin: var(--spacing-md);
    padding: 0;
  }

  .auth-decoration {
    padding: var(--spacing-2xl);
    min-height: 200px;
  }

  .decoration-title {
    font-size: var(--text-3xl);
  }

  .decoration-subtitle {
    font-size: var(--text-xl);
  }

  .decoration-text {
    font-size: var(--text-base);
  }

  .auth-form-wrapper {
    padding: var(--spacing-2xl);
  }

  .form-title {
    font-size: var(--text-2xl);
  }
}
</style>
