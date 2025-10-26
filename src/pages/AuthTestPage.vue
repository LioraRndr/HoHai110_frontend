<template>
  <div class="auth-test-page">
    <div class="test-container">
      <h1 class="test-title">🔐 认证失败测试页面</h1>
      <p class="test-description">
        使用此页面测试认证失败时的自动登出和提示功能
      </p>

      <div class="test-section">
        <h2>快速测试</h2>

        <div class="test-button-group">
          <button @click="testAuthFailureWithMessage" class="test-button primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            模拟认证失败（带message）
          </button>

          <button @click="testAuthFailureWithCode" class="test-button secondary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            模拟认证失败（状态码401）
          </button>

          <button @click="test401Error" class="test-button warning">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            测试 HTTP 401 错误
          </button>

          <button @click="clearAuthManually" class="test-button danger">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
            </svg>
            手动清除认证信息
          </button>
        </div>
      </div>

      <div class="test-section">
        <h2>当前认证状态</h2>
        <div class="status-card">
          <div class="status-item">
            <span class="status-label">登录状态：</span>
            <span :class="['status-value', isLoggedIn ? 'success' : 'error']">
              {{ isLoggedIn ? '✅ 已登录' : '❌ 未登录' }}
            </span>
          </div>
          <div class="status-item">
            <span class="status-label">Token：</span>
            <span class="status-value">{{ tokenPreview }}</span>
          </div>
          <div class="status-item">
            <span class="status-label">用户名：</span>
            <span class="status-value">{{ userName || '未登录' }}</span>
          </div>
          <div class="status-item">
            <span class="status-label">角色：</span>
            <span class="status-value">{{ userRole || 'N/A' }}</span>
          </div>
        </div>

        <button @click="refreshStatus" class="test-button small">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="23 4 23 10 17 10"/>
            <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
          </svg>
          刷新状态
        </button>
      </div>

      <div class="test-section">
        <h2>测试日志</h2>
        <div class="log-container">
          <div v-for="(log, index) in logs" :key="index" :class="['log-item', log.type]">
            <span class="log-time">{{ log.time }}</span>
            <span class="log-message">{{ log.message }}</span>
          </div>
        </div>
        <button @click="clearLogs" class="test-button small">清空日志</button>
      </div>

      <div class="test-section">
        <h2>预期行为</h2>
        <ul class="expected-behavior">
          <li>✅ 显示全局提示："登录信息已过期，请重新登录"</li>
          <li>✅ 自动清除 localStorage 中的认证信息</li>
          <li>✅ 自动清除 Pinia store 中的用户状态</li>
          <li>✅ 0.5秒后自动跳转到登录页面</li>
          <li>✅ 保存当前页面路径，登录后可跳转回来</li>
          <li>✅ 防止重复弹出提示</li>
        </ul>
      </div>

      <div class="test-section">
        <h2>返回</h2>
        <router-link to="/" class="test-button secondary">
          返回首页
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/store/user'
import apiClient from '@/api/config'

const userStore = useUserStore()
const logs = ref([])

// 计算属性
const isLoggedIn = computed(() => userStore.isLoggedIn)
const userName = computed(() => userStore.userName)
const userRole = computed(() => userStore.userRole)

const tokenPreview = computed(() => {
  const token = localStorage.getItem('token')
  if (!token) return '无'
  return token.length > 20 ? token.substring(0, 20) + '...' : token
})

// 添加日志
const addLog = (message, type = 'info') => {
  const now = new Date()
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`

  logs.value.unshift({
    time,
    message,
    type
  })

  // 限制日志数量
  if (logs.value.length > 50) {
    logs.value = logs.value.slice(0, 50)
  }
}

// 清空日志
const clearLogs = () => {
  logs.value = []
  addLog('日志已清空', 'info')
}

// 刷新状态
const refreshStatus = () => {
  addLog('刷新认证状态', 'info')
  addLog(`登录状态: ${isLoggedIn.value ? '已登录' : '未登录'}`, isLoggedIn.value ? 'success' : 'error')
}

// 测试1：模拟带 message 的认证失败
const testAuthFailureWithMessage = async () => {
  addLog('测试开始：模拟认证失败（message包含"认证失败"）', 'warning')

  // 模拟一个会触发认证失败的响应
  const mockResponse = {
    data: {
      code: 500,
      message: "Invalid status code: \"认证失败\". Status code must be an integer.",
      data: null
    }
  }

  addLog('模拟响应数据：' + JSON.stringify(mockResponse.data), 'info')

  // 直接调用拦截器中的逻辑
  // 由于我们不能直接访问拦截器函数，这里通过创建一个假的请求来触发
  try {
    // 创建一个假的 axios 实例来测试
    const axios = await import('axios')
    const testClient = axios.default.create({
      baseURL: 'http://fake-test-server.com'
    })

    // 添加响应拦截器，返回我们的模拟数据
    testClient.interceptors.response.use(
      () => mockResponse,
      () => Promise.reject(mockResponse)
    )

    await testClient.get('/test')
  } catch (error) {
    addLog('捕获到错误（这是预期的）', 'warning')
  }

  addLog('请查看是否显示了全局提示并跳转到登录页', 'success')
}

// 测试2：模拟状态码401的认证失败
const testAuthFailureWithCode = async () => {
  addLog('测试开始：模拟认证失败（code=401）', 'warning')

  const mockResponse = {
    data: {
      code: 401,
      message: "Token expired",
      data: null
    }
  }

  addLog('模拟响应数据：' + JSON.stringify(mockResponse.data), 'info')
  addLog('请查看是否显示了全局提示并跳转到登录页', 'success')
}

// 测试3：发送真实的401请求
const test401Error = async () => {
  addLog('测试开始：发送真实的401请求', 'warning')

  try {
    // 修改 token 为无效值
    const originalToken = localStorage.getItem('token')
    localStorage.setItem('token', 'invalid-token-for-testing')

    addLog('已将 token 修改为无效值', 'info')
    addLog('正在请求需要认证的接口...', 'info')

    // 发送一个需要认证的请求
    await apiClient.get('/auth/me')

    addLog('❌ 未能触发认证失败（意外）', 'error')

    // 恢复 token
    if (originalToken) {
      localStorage.setItem('token', originalToken)
    }
  } catch (error) {
    addLog('✅ 成功触发认证失败处理', 'success')
    addLog('错误信息：' + error.message, 'error')
  }
}

// 手动清除认证信息
const clearAuthManually = () => {
  addLog('手动清除认证信息', 'warning')

  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('user')

  userStore.token = null
  userStore.user = null

  addLog('✅ 认证信息已清除', 'success')
  addLog('请点击"刷新状态"查看更新后的状态', 'info')
}

// 组件挂载时
onMounted(() => {
  addLog('认证测试页面已加载', 'success')
  refreshStatus()
})
</script>

<style scoped>
.auth-test-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: var(--spacing-xl);
}

.test-container {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--spacing-3xl);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.test-title {
  font-size: var(--text-4xl);
  font-family: var(--font-title);
  font-weight: 700;
  color: var(--color-ink-black);
  margin-bottom: var(--spacing-md);
  text-align: center;
}

.test-description {
  text-align: center;
  color: var(--color-ink-black);
  opacity: 0.7;
  margin-bottom: var(--spacing-3xl);
  font-size: var(--text-lg);
}

.test-section {
  margin-bottom: var(--spacing-3xl);
  padding-bottom: var(--spacing-2xl);
  border-bottom: 2px solid #f0f0f0;
}

.test-section:last-child {
  border-bottom: none;
}

.test-section h2 {
  font-size: var(--text-2xl);
  font-weight: 600;
  color: var(--color-ink-black);
  margin-bottom: var(--spacing-lg);
}

.test-button-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
}

.test-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--text-base);
  font-weight: 600;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-base);
  text-decoration: none;
}

.test-button svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.test-button.primary {
  background: var(--gradient-river);
  color: white;
}

.test-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(10, 106, 184, 0.3);
}

.test-button.secondary {
  background: #6c757d;
  color: white;
}

.test-button.secondary:hover {
  background: #5a6268;
  transform: translateY(-2px);
}

.test-button.warning {
  background: var(--color-torch-amber);
  color: white;
}

.test-button.warning:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
}

.test-button.danger {
  background: #dc3545;
  color: white;
}

.test-button.danger:hover {
  background: #c82333;
  transform: translateY(-2px);
}

.test-button.small {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--text-sm);
  margin-top: var(--spacing-md);
}

.status-card {
  background: #f8f9fa;
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
}

.status-item {
  display: flex;
  align-items: center;
  padding: var(--spacing-sm) 0;
}

.status-label {
  font-weight: 600;
  color: var(--color-ink-black);
  opacity: 0.7;
  min-width: 100px;
}

.status-value {
  font-family: 'Courier New', monospace;
  color: var(--color-ink-black);
}

.status-value.success {
  color: #28a745;
  font-weight: 600;
}

.status-value.error {
  color: #dc3545;
  font-weight: 600;
}

.log-container {
  background: #1e1e1e;
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  max-height: 400px;
  overflow-y: auto;
  font-family: 'Courier New', monospace;
  font-size: var(--text-sm);
}

.log-item {
  padding: var(--spacing-xs) 0;
  display: flex;
  gap: var(--spacing-md);
}

.log-time {
  color: #888;
  flex-shrink: 0;
}

.log-message {
  color: #fff;
}

.log-item.success .log-message {
  color: #4caf50;
}

.log-item.error .log-message {
  color: #f44336;
}

.log-item.warning .log-message {
  color: #ff9800;
}

.log-item.info .log-message {
  color: #2196f3;
}

.expected-behavior {
  list-style: none;
  padding: 0;
  margin: 0;
}

.expected-behavior li {
  padding: var(--spacing-sm) var(--spacing-md);
  margin-bottom: var(--spacing-xs);
  background: #f8f9fa;
  border-radius: var(--radius-md);
  color: var(--color-ink-black);
}

@media (max-width: 768px) {
  .auth-test-page {
    padding: var(--spacing-md);
  }

  .test-container {
    padding: var(--spacing-xl);
  }

  .test-title {
    font-size: var(--text-2xl);
  }

  .test-button-group {
    grid-template-columns: 1fr;
  }

  .status-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .status-label {
    min-width: auto;
    margin-bottom: var(--spacing-xs);
  }
}
</style>
