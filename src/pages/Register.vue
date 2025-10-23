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
          <span class="logo-text">{{ $t('auth.welcome') }}</span>
        </div>
      </div>
    </nav>

    <div class="auth-container">
      <!-- 左侧装饰 -->
      <div class="auth-decoration">
        <div class="decoration-content">
          <h1 class="decoration-title">{{ $t('auth.joinUs') }}</h1>
          <h2 class="decoration-subtitle">{{ $t('footer.title') }}</h2>
          <p class="decoration-text">{{ $t('auth.witnessHistory') }}</p>
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
          <h2 class="form-title">{{ $t('auth.createAccount') }}</h2>
          <p class="form-subtitle">{{ $t('auth.fillInfo') }}</p>

          <!-- 成功提示 -->
          <transition name="fade">
            <div v-if="success" class="success-message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              {{ $t('auth.registerSuccess') }}
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
            <!-- 用户名 -->
            <div class="form-group">
              <label for="username" class="form-label">{{ $t('auth.username') }}</label>
              <input
                id="username"
                v-model="formData.username"
                type="text"
                class="form-input"
                :placeholder="$t('auth.placeholders.usernameLength')"
                required
                :disabled="isLoading"
                minlength="3"
                maxlength="20"
              />
            </div>

            <!-- 邮箱 -->
            <div class="form-group">
              <label for="email" class="form-label">{{ $t('auth.email') }}</label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                class="form-input"
                :placeholder="$t('auth.placeholders.email')"
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
                  :placeholder="$t('auth.placeholders.passwordLength')"
                  required
                  :disabled="isLoading"
                  minlength="6"
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
              <div class="password-strength">
                <div class="strength-bar" :class="passwordStrength.class">
                  <div class="strength-fill" :style="{ width: passwordStrength.width }"></div>
                </div>
                <span class="strength-text">{{ passwordStrength.text }}</span>
              </div>
            </div>

            <!-- 确认密码 -->
            <div class="form-group">
              <label for="confirmPassword" class="form-label">{{ $t('auth.confirmPassword') }}</label>
              <div class="password-input-wrapper">
                <input
                  id="confirmPassword"
                  v-model="formData.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  class="form-input"
                  :placeholder="$t('auth.placeholders.confirmPassword')"
                  required
                  :disabled="isLoading"
                />
                <button
                  type="button"
                  class="password-toggle"
                  @click="showConfirmPassword = !showConfirmPassword"
                  :disabled="isLoading"
                >
                  <svg v-if="showConfirmPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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

            <!-- 注册关闭提示 -->
            <div v-if="registrationClosed" class="warning-message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              {{ $t('auth.errors.registrationClosed') }}
            </div>

            <!-- 用户协议 -->
            <div class="form-group">
              <label class="checkbox-label">
                <input v-model="formData.agreeToTerms" type="checkbox" required>
                <span>{{ $t('auth.agreeToTerms') || '我已阅读并同意' }} <router-link to="/terms" class="terms-link" target="_blank">{{ $t('auth.userAgreement') || '用户协议' }}</router-link> {{ $t('auth.and') || '和' }} <router-link to="/privacy" class="terms-link" target="_blank">{{ $t('auth.privacyPolicy') || '隐私政策' }}</router-link></span>
              </label>
            </div>

            <!-- 提交按钮 -->
            <button
              type="submit"
              class="submit-button"
              :disabled="isLoading || !formData.agreeToTerms"
            >
              <span v-if="!isLoading">{{ $t('common.register') }}</span>
              <span v-else class="loading-spinner">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                </svg>
                {{ $t('auth.registering') }}
              </span>
            </button>
          </form>

          <!-- 登录链接 -->
          <div class="auth-footer">
            {{ $t('auth.hasAccount') }} <router-link to="/login" class="auth-link">{{ $t('auth.loginNow') }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/store/user'
import { authAPI } from '@/api'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const formData = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)
const error = ref('')
const success = ref(false)
const registrationClosed = ref(false)

// 检查注册状态
onMounted(async () => {
  try {
    const response = await authAPI.getRegistrationStatus()
    registrationClosed.value = !response.message.enabled
  } catch (err) {
    console.error('获取注册状态失败:', err)
  }
})

// 计算返回按钮的路径和文本
const backPath = computed(() => {
  const redirect = route.query.redirect
  return redirect || '/'
})

const backText = computed(() => {
  const redirect = route.query.redirect
  return redirect ? t('common.back') : t('common.backToHome')
})

// 密码强度计算
const passwordStrength = computed(() => {
  const password = formData.password
  if (!password) return { class: '', width: '0%', text: '' }

  let strength = 0
  if (password.length >= 6) strength++
  if (password.length >= 10) strength++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
  if (/\d/.test(password)) strength++
  if (/[^a-zA-Z0-9]/.test(password)) strength++

  if (strength <= 1) return { class: 'weak', width: '33%', text: t('common.weak') || '弱' }
  if (strength <= 3) return { class: 'medium', width: '66%', text: t('common.medium') || '中' }
  return { class: 'strong', width: '100%', text: t('common.strong') || '强' }
})

const validateForm = () => {
  // 用户名验证
  if (formData.username.length < 3 || formData.username.length > 20) {
    error.value = t('auth.errors.usernameLength') || '用户名长度必须在3-20个字符之间'
    return false
  }

  if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
    error.value = t('auth.errors.usernameFormat') || '用户名只能包含字母、数字和下划线'
    return false
  }

  // 邮箱验证
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.email)) {
    error.value = t('auth.errors.emailInvalid')
    return false
  }

  // 密码验证
  if (formData.password.length < 6) {
    error.value = t('auth.errors.passwordMinLength')
    return false
  }

  // 确认密码验证
  if (formData.password !== formData.confirmPassword) {
    error.value = t('auth.errors.passwordsNotMatch')
    return false
  }

  // 用户协议验证
  if (!formData.agreeToTerms) {
    error.value = t('auth.errors.termsRequired') || '请阅读并同意用户协议和隐私政策'
    return false
  }

  return true
}

const handleSubmit = async () => {
  error.value = ''

  // 检查注册是否关闭
  if (registrationClosed.value) {
    error.value = t('auth.errors.registrationClosed') || '系统当前不允许新用户注册'
    return
  }

  // 表单验证
  if (!validateForm()) {
    return
  }

  isLoading.value = true

  try {
    const result = await userStore.register({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    })

    if (result.success) {
      success.value = true
      // 3秒后跳转到登录页,保留重定向路径
      setTimeout(() => {
        // 检查是否有重定向路径
        const redirectPath = localStorage.getItem('redirectAfterLogin') || router.currentRoute.value.query.redirect

        if (redirectPath) {
          // 保留重定向路径到登录页
          router.push({ path: '/login', query: { redirect: redirectPath } })
        } else {
          router.push('/login')
        }
      }, 3000)
    } else {
      error.value = result.message || t('auth.errors.registerFailed')
    }
  } catch (err) {
    error.value = err.message || t('auth.errors.registerFailed')
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
  margin: 0 auto var(--spacing-xl) auto;
  background: white;
  border-radius: var(--radius-xl);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  display: grid;
  grid-template-columns: 45% 55%;
}

.auth-decoration {
  background: var(--gradient-torch);
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
  max-height: 90vh;
  overflow-y: auto;
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

.warning-message {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: #fff3cd;
  color: #856404;
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  margin-bottom: var(--spacing-lg);
  border: 1px solid #ffeeba;
}

.warning-message svg {
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

.password-strength {
  margin-top: var(--spacing-xs);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.strength-bar {
  flex: 1;
  height: 4px;
  background: #e0e0e0;
  border-radius: var(--radius-full);
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.strength-bar.weak .strength-fill {
  background: #f44336;
}

.strength-bar.medium .strength-fill {
  background: #ff9800;
}

.strength-bar.strong .strength-fill {
  background: #4caf50;
}

.strength-text {
  font-size: var(--text-xs);
  font-weight: 600;
  min-width: 20px;
}

.strength-bar.weak + .strength-text {
  color: #f44336;
}

.strength-bar.medium + .strength-text {
  color: #ff9800;
}

.strength-bar.strong + .strength-text {
  color: #4caf50;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-xs);
  font-size: var(--text-sm);
  cursor: pointer;
  line-height: 1.6;
}

.checkbox-label input[type="checkbox"] {
  margin-top: 2px;
  cursor: pointer;
}

.terms-link {
  color: var(--color-river-blue);
  font-weight: 600;
  text-decoration: underline;
}

.terms-link:hover {
  color: var(--color-torch-amber);
}

.submit-button {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: var(--text-lg);
  font-weight: 600;
  color: white;
  background: var(--gradient-torch);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-base);
  margin-top: var(--spacing-md);
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 122, 26, 0.3);
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
    max-height: none;
  }

  .form-title {
    font-size: var(--text-2xl);
  }
}
</style>
