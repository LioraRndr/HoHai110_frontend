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

  // 初始化用户信息
  const initUser = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser)
      } catch (e) {
        console.error('Failed to parse stored user:', e)
        localStorage.removeItem('user')
      }
    }
  }

  // 登录
  const login = async (credentials) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await authAPI.login(credentials)

      if (response.code === 0 && response.data) {
        const { token: newToken, user: userData } = response.data

        // 保存token和用户信息
        token.value = newToken
        user.value = userData

        localStorage.setItem('token', newToken)
        localStorage.setItem('user', JSON.stringify(userData))

        return { success: true }
      } else {
        throw new Error(response.message || '登录失败')
      }
    } catch (err) {
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

    // 方法
    login,
    register,
    logout,
    fetchCurrentUser,
    updateUser,
    clearError
  }
})
