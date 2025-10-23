<template>
  <div class="auth-page">
    <!-- 顶部导航栏 -->
    <nav class="auth-navbar">
      <div class="auth-navbar-container">
        <router-link :to="backPath" class="back-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>{{ backText }}</span>
        </router-link>

        <div class="navbar-logo">
          <span class="logo-text">{{ $t('home.hero.title') }}</span>
        </div>
      </div>
    </nav>

    <div class="auth-container">
      <!-- 左侧装饰 -->
      <div class="auth-decoration">
        <div class="decoration-content">
          <h1 class="decoration-title">{{ $t('home.hero.title').split('110')[0] }}</h1>
          <h2 class="decoration-subtitle">{{ $t('home.hero.title').includes('110') ? '110' + $t('home.hero.title').split('110')[1] : '' }}</h2>
          <p class="decoration-text">{{ $t('home.hero.subtitle') }}</p>
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
          <h2 class="form-title">{{ $t('auth.welcome') }}</h2>
          <p class="form-subtitle">{{ $t('auth.loginToAccount') }}</p>

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
            <!-- 用户名/邮箱 -->
            <div class="form-group">
              <label for="username" class="form-label">{{ $t('auth.usernameOrEmail') }}</label>
              <input
                id="username"
                v-model="formData.username"
                type="text"
                class="form-input"
                :placeholder="$t('auth.placeholders.usernameOrEmail')"
                required
                :disabled="isLoading"
              />
            </div>

            <!-- 密码 -->
            <div class="form-group">
              <label for="password" class="form-label">{{ $t('auth.password') }}</label>
              <div class="password-input-wrapper">
                <input
                  id="password"
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  class="form-input"
                  :placeholder="$t('auth.placeholders.password')"
                  required
                  :disabled="isLoading"
                />
                <button
                  type="button"
                  class="password-toggle"
                  @click="showPassword = !showPassword"
                  :disabled="isLoading"
                >
                  <svg v-if="showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- 记住我 & 忘记密码 -->
            <div class="form-options">
              <label class="checkbox-label">
                <input v-model="formData.remember" type="checkbox">
                <span>{{ $t('auth.rememberMe') }}</span>
              </label>
              <router-link to="/forgot-password" class="forgot-link">{{ $t('auth.forgotPassword') }}</router-link>
            </div>

            <!-- 提交按钮 -->
            <button
              type="submit"
              class="submit-button"
              :disabled="isLoading"
            >
              <span v-if="!isLoading">{{ $t('common.login') }}</span>
              <span v-else class="loading-spinner">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                </svg>
                {{ $t('auth.loggingIn') }}
              </span>
            </button>
          </form>

          <!-- 注册链接 -->
          <div class="auth-footer">
            {{ $t('auth.noAccount') }} <router-link to="/register" class="auth-link">{{ $t('auth.registerNow') }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const { t } = useI18n()

const formData = reactive({
  username: '',
  password: '',
  remember: false
})

const showPassword = ref(false)
const isLoading = ref(false)
const error = ref('')

// 计算返回按钮的路径和文本
const backPath = computed(() => {
  const redirect = route.query.redirect
  return redirect || '/'
})

const backText = computed(() => {
  const redirect = route.query.redirect
  return redirect ? t('common.back') : t('common.backToHome')
})

const handleSubmit = async () => {
  error.value = ''

  // 表单验证
  if (!formData.username.trim()) {
    error.value = t('auth.errors.usernameOrEmailRequired')
    return
  }

  if (!formData.password) {
    error.value = t('auth.errors.passwordRequired')
    return
  }

  if (formData.password.length < 6) {
    error.value = t('auth.errors.passwordMinLength')
    return
  }

  isLoading.value = true

  try {
    const result = await userStore.login({
      username: formData.username,
      password: formData.password
    })

    if (result.success) {
      // 登录成功,检查是否有重定向路径
      // 优先使用路由 query 参数，其次是 localStorage
      const redirectPath = route.query.redirect || localStorage.getItem('redirectAfterLogin')

      if (redirectPath) {
        localStorage.removeItem('redirectAfterLogin')
      }

      // 等待下一个 tick，确保 store 状态已完全更新
      await new Promise(resolve => setTimeout(resolve, 100))

      // 使用 router.replace 而不是 window.location，避免页面刷新
      if (redirectPath) {
        await router.replace(redirectPath)
      } else {
        // 没有重定向路径,跳转到首页
        await router.replace('/')
      }
    } else {
      error.value = result.message || t('auth.errors.loginFailed')
    }
  } catch (err) {
    error.value = err.message || t('auth.errors.loginFailed')
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
  background: var(--gradient-river);
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

.password-input-wrapper {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: var(--spacing-sm);
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: var(--color-ink-black);
  opacity: 0.5;
  cursor: pointer;
  padding: var(--spacing-xs);
  transition: opacity var(--transition-base);
}

.password-toggle:hover {
  opacity: 1;
}

.password-toggle svg {
  width: 20px;
  height: 20px;
  display: block;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--text-sm);
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  cursor: pointer;
}

.forgot-link {
  font-size: var(--text-sm);
  color: var(--color-river-blue);
  font-weight: 500;
  transition: color var(--transition-base);
}

.forgot-link:hover {
  color: var(--color-torch-amber);
}

.submit-button {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: var(--text-lg);
  font-weight: 600;
  color: white;
  background: var(--gradient-river);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-base);
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(10, 106, 184, 0.3);
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
