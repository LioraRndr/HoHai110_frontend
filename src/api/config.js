import axios from 'axios'

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
    return response.data
  },
  async (error) => {
    const originalRequest = error.config

    // Token过期或无效,尝试刷新
    if (error.response?.status === 401 && !originalRequest._retry) {
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
          clearAuthAndRedirect()
          return Promise.reject(new Error('登录已过期,请重新登录'))
        }
      } catch (refreshError) {
        // 刷新失败,清除token并跳转到登录页
        clearAuthAndRedirect()
        return Promise.reject(new Error('登录已过期,请重新登录'))
      }
    }

    // 处理其他错误
    const errorMessage = error.response?.data?.message || error.message || '请求失败'
    return Promise.reject(new Error(errorMessage))
  }
)

// 清除认证信息并跳转到登录页
function clearAuthAndRedirect() {
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('user')

  // 保存当前路径，登录后可以跳转回来
  const currentPath = window.location.pathname + window.location.search
  if (currentPath !== '/login' && currentPath !== '/register') {
    localStorage.setItem('redirectAfterLogin', currentPath)
  }

  // 跳转到登录页
  if (window.location.pathname !== '/login') {
    window.location.href = '/login'
  }
}

export default apiClient
