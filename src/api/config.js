import axios from 'axios'
import { $message } from '@/utils/message.js'

// API基础配置
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1'

// 创建axios实例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 用于防止重复弹出登录过期提示
let isAuthErrorShown = false

// 请求拦截器 - 添加token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器 - 处理错误
apiClient.interceptors.response.use(
  (response) => {
    // 正常响应，检查业务状态码是否表示认证失败
    const data = response.data
    if (data && isAuthenticationError(data)) {
      handleAuthenticationFailure()
      return Promise.reject(new Error('登录信息已过期，请重新登录'))
    }
    return data
  },
  async (error) => {
    const originalRequest = error.config

    // 检查是否为认证失败（HTTP 401 或业务层认证失败）
    const isAuthError = error.response?.status === 401 ||
                        (error.response?.data && isAuthenticationError(error.response.data))

    if (isAuthError && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken
          })

          const { token } = response.data.data
          localStorage.setItem('token', token)

          originalRequest.headers.Authorization = `Bearer ${token}`
          return apiClient(originalRequest)
        } else {
          // 没有refreshToken,直接跳转到登录页
          handleAuthenticationFailure()
          return Promise.reject(new Error('登录信息已过期，请重新登录'))
        }
      } catch (refreshError) {
        // 刷新失败,清除token并跳转到登录页
        handleAuthenticationFailure()
        return Promise.reject(new Error('登录信息已过期，请重新登录'))
      }
    }

    // 处理其他错误
    const errorMessage = error.response?.data?.message || error.message || '请求失败'
    return Promise.reject(new Error(errorMessage))
  }
)

/**
 * 判断响应数据是否表示认证失败
 * @param {Object} data - 响应数据
 * @returns {boolean}
 */
function isAuthenticationError(data) {
  // 检查多种可能的认证失败情况
  const authErrorPatterns = [
    '认证失败',
    '身份验证失败',
    '登录已过期',
    '登录失效',
    '未授权',
    '无效的令牌',
    '无效的token',
    'token已过期',
    'token失效',
    'unauthorized',
    'authentication failed',
    'token expired',
    'invalid token'
  ]

  // 检查 message 字段（确保 message 是字符串）
  let message = ''
  if (typeof data.message === 'string') {
    message = data.message.toLowerCase()
  } else if (data.message && typeof data.message === 'object') {
    // 如果 message 是对象，可能是后端返回了数据在 message 中
    // 这种情况不是认证失败
    return false
  }

  const hasAuthErrorMessage = authErrorPatterns.some(pattern =>
    message.includes(pattern.toLowerCase())
  )

  // 常见的认证失败状态码（业务层）
  const authErrorCodes = [401, 403]
  const hasAuthErrorCode = authErrorCodes.includes(data.code)

  return hasAuthErrorMessage || hasAuthErrorCode
}

/**
 * 处理认证失败：清除认证信息、显示提示、跳转到登录页
 */
function handleAuthenticationFailure() {
  // 防止重复提示
  if (isAuthErrorShown) {
    return
  }
  isAuthErrorShown = true

  // 清除认证信息
  clearAuthData()

  // 显示全局提示
  $message.warning('登录信息已过期，请重新登录', '提示')

  // 保存当前路径，登录后可以跳转回来
  const currentPath = window.location.pathname + window.location.search
  if (currentPath !== '/login' && currentPath !== '/register') {
    localStorage.setItem('redirectAfterLogin', currentPath)
  }

  // 延迟跳转，确保用户看到提示
  setTimeout(() => {
    // 使用动态导入路由，避免循环依赖
    import('@/router').then((routerModule) => {
      const router = routerModule.default
      router.push({ name: 'Login' }).then(() => {
        // 跳转完成后重置标志，允许下次显示提示
        isAuthErrorShown = false
      })
    })
  }, 500)
}

/**
 * 清除所有认证数据
 */
function clearAuthData() {
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('user')

  // 如果使用了 Pinia store，也需要清除
  // 这里通过动态导入避免循环依赖
  try {
    import('@/store/user').then((userStoreModule) => {
      const { useUserStore } = userStoreModule
      const userStore = useUserStore()
      userStore.token = null
      userStore.user = null
    })
  } catch (error) {
    console.warn('Failed to clear user store:', error)
  }
}

// 清除认证信息并跳转到登录页（保留此函数以保持向后兼容）
function clearAuthAndRedirect() {
  handleAuthenticationFailure()
}

export default apiClient
