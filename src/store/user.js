import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authAPI } from '@/api'

export const useUserStore = defineStore('user', () => {
  // 状态
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const isLoading = ref(false)
  const error = ref(null)

  // 计算属性
  const isLoggedIn = computed(() => !!token.value && !!user.value)
  const userName = computed(() => user.value?.username || '')
  const userEmail = computed(() => user.value?.email || '')
  const userRole = computed(() => user.value?.role || 'user')
  const isAdmin = computed(() => user.value?.role === 'admin')

  // 初始化用户信息
  const initUser = () => {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')

    console.log('[UserStore] Initializing user...', {
      hasStoredUser: !!storedUser,
      hasStoredToken: !!storedToken
    })

    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser)
        console.log('[UserStore] User initialized from localStorage:', user.value)
      } catch (e) {
        console.error('Failed to parse stored user:', e)
        localStorage.removeItem('user')
      }
    }

    // 确保 token 也被正确初始化
    if (storedToken && !token.value) {
      token.value = storedToken
      console.log('[UserStore] Token initialized from localStorage')
    }
  }

  // 登录
  const login = async (credentials) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await authAPI.login(credentials)

      console.log('[UserStore] Login response:', response)

      if (response.code === 0) {
        // 尝试从不同位置获取 token 和 user 数据
        let tokenData, userData

        // 情况1: 数据在 response.data 中
        if (response.data && typeof response.data === 'object' && response.data.token) {
          tokenData = response.data.token
          userData = response.data.user
        }
        // 情况2: 数据在 response.message 中（后端可能把数据放错位置）
        else if (response.message && typeof response.message === 'object' && response.message.token) {
          tokenData = response.message.token
          userData = response.message.user
        }
        // 情况3: token 和 user 直接在 response 中
        else if (response.token && response.user) {
          tokenData = response.token
          userData = response.user
        }

        if (tokenData && userData) {
          // 保存token和用户信息
          token.value = tokenData
          user.value = userData

          localStorage.setItem('token', tokenData)
          localStorage.setItem('user', JSON.stringify(userData))

          console.log('[UserStore] Login successful, user saved:', {
            token: tokenData,
            user: userData
          })

          return { success: true }
        } else {
          console.error('[UserStore] Token or user data not found in response:', response)
          throw new Error('登录响应数据格式错误')
        }
      } else {
        throw new Error(response.message || '登录失败')
      }
    } catch (err) {
      console.error('[UserStore] Login error:', err)
      error.value = err.message
      return { success: false, message: err.message }
    } finally {
      isLoading.value = false
    }
  }

  // 注册
  const register = async (userData) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await authAPI.register(userData)

      if (response.code === 0) {
        return { success: true }
      } else {
        throw new Error(response.message || '注册失败')
      }
    } catch (err) {
      error.value = err.message
      return { success: false, message: err.message }
    } finally {
      isLoading.value = false
    }
  }

  // 登出
  const logout = async () => {
    try {
      await authAPI.logout()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      // 清除本地数据
      token.value = null
      user.value = null

      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('refreshToken')
    }
  }

  // 获取当前用户信息
  const fetchCurrentUser = async () => {
    if (!token.value) return

    isLoading.value = true
    error.value = null

    try {
      const response = await authAPI.getCurrentUser()

      if (response.code === 0 && response.data) {
        user.value = response.data
        localStorage.setItem('user', JSON.stringify(response.data))
      }
    } catch (err) {
      error.value = err.message
      // 如果获取用户信息失败,可能token已过期
      if (err.message.includes('401') || err.message.includes('Unauthorized')) {
        await logout()
      }
    } finally {
      isLoading.value = false
    }
  }

  // 更新用户信息
  const updateUser = (updates) => {
    if (user.value) {
      user.value = { ...user.value, ...updates }
      localStorage.setItem('user', JSON.stringify(user.value))
    }
  }

  // 清除错误
  const clearError = () => {
    error.value = null
  }

  // 初始化
  initUser()

  return {
    // 状态
    user,
    token,
    isLoading,
    error,

    // 计算属性
    isLoggedIn,
    userName,
    userEmail,
    userRole,
    isAdmin,

    // 方法
    login,
    register,
    logout,
    fetchCurrentUser,
    updateUser,
    clearError
  }
})
