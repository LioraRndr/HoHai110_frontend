<template>
  <nav class="navbar" :class="{ scrolled: isScrolled, hidden: isHidden }">
    <div class="navbar-container">
      <!-- Logo -->
      <div class="navbar-logo">
        <router-link to="/" class="logo-link">
          <span class="logo-text">河海110周年</span>
        </router-link>
      </div>

      <!-- 导航链接 -->
      <ul class="navbar-menu">
        <li class="menu-item">
          <router-link to="/" class="menu-link">首页</router-link>
        </li>
        <li class="menu-item">
          <router-link to="/timeline" class="menu-link">校史长河</router-link>
        </li>
        <li class="menu-item">
          <router-link to="/culture" class="menu-link">使命担当</router-link>
        </li>
        <li class="menu-item">
          <router-link to="/people" class="menu-link">河海英华</router-link>
        </li>
        <li class="menu-item">
          <router-link to="/blessings" class="menu-link">薪传接力</router-link>
        </li>
        <li class="menu-item">
          <router-link to="/articles" class="menu-link">共话百十</router-link>
        </li>
        <li class="menu-item">
          <router-link to="/about" class="menu-link">关于</router-link>
        </li>
      </ul>

      <!-- 用户区域 -->
      <div class="navbar-user">
        <div v-if="userStore.isLoggedIn" class="user-info">
          <!-- 管理员标识 -->
          <router-link v-if="userStore.isAdmin" to="/admin" class="admin-badge" title="管理后台">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
            <span>管理</span>
          </router-link>
          <div class="user-avatar">
            {{ userStore.userName.charAt(0).toUpperCase() }}
          </div>
          <span class="user-name">{{ userStore.userName }}</span>
          <button class="logout-button" @click="handleLogout">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
        <div v-else class="auth-buttons">
          <router-link to="/login" class="auth-link login-link">登录</router-link>
          <router-link to="/register" class="auth-link register-link">注册</router-link>
        </div>
      </div>

      <!-- 移动端菜单按钮 -->
      <button class="mobile-menu-button" @click="toggleMobileMenu" aria-label="菜单">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>

    <!-- 移动端菜单 -->
    <div class="mobile-menu" :class="{ active: isMobileMenuOpen }">
      <ul class="mobile-menu-list">
        <li class="mobile-menu-item">
          <router-link to="/" class="mobile-menu-link" @click="closeMobileMenu">首页</router-link>
        </li>
        <li class="mobile-menu-item">
          <router-link to="/timeline" class="mobile-menu-link" @click="closeMobileMenu">校史长河</router-link>
        </li>
        <li class="mobile-menu-item">
          <router-link to="/culture" class="mobile-menu-link" @click="closeMobileMenu">使命担当</router-link>
        </li>
        <li class="mobile-menu-item">
          <router-link to="/people" class="mobile-menu-link" @click="closeMobileMenu">河海英华</router-link>
        </li>
        <li class="mobile-menu-item">
          <router-link to="/blessings" class="mobile-menu-link" @click="closeMobileMenu">薪传接力</router-link>
        </li>
        <li class="mobile-menu-item">
          <router-link to="/articles" class="mobile-menu-link" @click="closeMobileMenu">共话百十</router-link>
        </li>
        <li class="mobile-menu-item">
          <router-link to="/about" class="mobile-menu-link" @click="closeMobileMenu">关于</router-link>
        </li>
      </ul>

      <!-- 移动端用户区域 -->
      <div class="mobile-user-section">
        <div v-if="userStore.isLoggedIn" class="mobile-user-info">
          <div class="mobile-user-avatar">
            {{ userStore.userName.charAt(0).toUpperCase() }}
          </div>
          <span class="mobile-user-name">{{ userStore.userName }}</span>
          <!-- 管理员入口 -->
          <router-link v-if="userStore.isAdmin" to="/admin" class="mobile-admin-link" @click="closeMobileMenu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
            <span>管理后台</span>
          </router-link>
          <button class="mobile-logout-button" @click="handleMobileLogout">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            <span>退出登录</span>
          </button>
        </div>
        <div v-else class="mobile-auth-buttons">
          <router-link to="/login" class="mobile-auth-link mobile-login-link" @click="closeMobileMenu">登录</router-link>
          <router-link to="/register" class="mobile-auth-link mobile-register-link" @click="closeMobileMenu">注册</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const router = useRouter()
const userStore = useUserStore()

const isScrolled = ref(false)
const isHidden = ref(false)
const isMobileMenuOpen = ref(false)
let lastScrollY = 0

const handleScroll = () => {
  const currentScrollY = window.scrollY

  // 滚动超过第一屏(100vh)后,根据滚动方向隐藏/显示导航栏
  if (currentScrollY > window.innerHeight) {
    if (currentScrollY > lastScrollY) {
      // 向下滚动,隐藏导航栏
      isHidden.value = true
    } else {
      // 向上滚动,显示导航栏
      isHidden.value = false
    }
  } else {
    // 在第一屏内,始终显示
    isHidden.value = false
  }

  isScrolled.value = currentScrollY > 50
  lastScrollY = currentScrollY
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleLogout = async () => {
  await userStore.logout()
  router.push('/')
}

const handleMobileLogout = async () => {
  await userStore.logout()
  closeMobileMenu()
  router.push('/')
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  transition: all var(--transition-base);
  padding: var(--spacing-lg) 0;
}

.navbar.scrolled {
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.navbar.hidden {
  transform: translateY(-100%);
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-logo {
  flex-shrink: 0;
}

.logo-link {
  text-decoration: none;
  display: flex;
  align-items: center;
}

.logo-text {
  font-size: var(--text-xl);
  font-family: var(--font-title);
  font-weight: 700;
  color: white;
  letter-spacing: 0.05em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.navbar-menu {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu-item {
  position: relative;
}

.menu-link {
  text-decoration: none;
  color: white;
  font-size: var(--text-base);
  font-weight: 500;
  padding: var(--spacing-sm) var(--spacing-md);
  display: block;
  transition: all var(--transition-base);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  position: relative;
}

.menu-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--color-torch-amber);
  transition: all var(--transition-base);
  transform: translateX(-50%);
}

.menu-link:hover {
  color: var(--color-torch-amber);
}

.menu-link:hover::after {
  width: 80%;
}

.menu-link.router-link-active {
  color: var(--color-torch-amber);
}

.menu-link.router-link-active::after {
  width: 80%;
}

/* 用户区域 */
.navbar-user {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-left: var(--spacing-lg);
}

.user-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-xs) var(--spacing-md);
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full);
  backdrop-filter: blur(10px);
}

/* 管理员标识 */
.admin-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: linear-gradient(135deg, #FF9800 0%, #F57C00 100%);
  border-radius: var(--radius-full);
  color: white;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all var(--transition-base);
  box-shadow: 0 2px 8px rgba(255, 152, 0, 0.3);
}

.admin-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 152, 0, 0.5);
}

.admin-badge svg {
  width: 14px;
  height: 14px;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  background: var(--gradient-torch);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: var(--text-sm);
  color: white;
}

.user-name {
  color: white;
  font-size: var(--text-sm);
  font-weight: 500;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.logout-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: var(--radius-full);
  transition: all var(--transition-base);
}

.logout-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.logout-button svg {
  width: 16px;
  height: 16px;
}

.auth-buttons {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.auth-link {
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: var(--text-sm);
  font-weight: 600;
  border-radius: var(--radius-full);
  transition: all var(--transition-base);
  text-decoration: none;
}

.login-link {
  color: white;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.login-link:hover {
  background: rgba(255, 255, 255, 0.2);
}

.register-link {
  color: white;
  background: var(--gradient-torch);
}

.register-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 122, 26, 0.4);
}

/* 移动端菜单按钮 */
.mobile-menu-button {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: transparent;
  border: none;
  padding: var(--spacing-sm);
  cursor: pointer;
  z-index: 1001;
}

.hamburger-line {
  width: 25px;
  height: 3px;
  background: white;
  border-radius: 2px;
  transition: all var(--transition-base);
}

/* 移动端菜单 */
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 85vh;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  display: none;
  opacity: 0;
  transform: translateY(-100%);
  transition: all 0.3s ease-in-out;
  padding-top: 80px;
  overflow-y: auto;
  border-bottom-left-radius: var(--radius-lg);
  border-bottom-right-radius: var(--radius-lg);
}

.mobile-menu.active {
  opacity: 1;
  transform: translateY(0);
}

.mobile-menu-list {
  list-style: none;
  margin: 0;
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.mobile-menu-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-menu-link {
  text-decoration: none;
  color: white;
  font-size: var(--text-xl);
  font-weight: 500;
  padding: var(--spacing-md) 0;
  display: block;
  transition: all var(--transition-base);
}

.mobile-menu-link:hover,
.mobile-menu-link.router-link-active {
  color: var(--color-torch-amber);
  padding-left: var(--spacing-md);
}

/* 移动端用户区域 */
.mobile-user-section {
  padding: var(--spacing-xl);
  border-top: 2px solid rgba(255, 255, 255, 0.15);
  margin-top: var(--spacing-lg);
}

.mobile-user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
}

.mobile-user-avatar {
  width: 60px;
  height: 60px;
  border-radius: var(--radius-full);
  background: var(--gradient-torch);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: var(--text-xl);
  color: white;
}

.mobile-user-name {
  color: white;
  font-size: var(--text-xl);
  font-weight: 600;
  text-align: center;
}

/* 移动端管理员链接 */
.mobile-admin-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-xl);
  background: linear-gradient(135deg, #FF9800 0%, #F57C00 100%);
  border: 1px solid rgba(255, 152, 0, 0.5);
  color: white;
  border-radius: var(--radius-full);
  font-size: var(--text-base);
  font-weight: 600;
  text-decoration: none;
  transition: all var(--transition-base);
  margin-top: var(--spacing-sm);
  box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
}

.mobile-admin-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 152, 0, 0.5);
}

.mobile-admin-link svg {
  width: 18px;
  height: 18px;
}

.mobile-logout-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-xl);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: var(--radius-full);
  font-size: var(--text-base);
  font-weight: 500;
  transition: all var(--transition-base);
  margin-top: var(--spacing-sm);
}

.mobile-logout-button:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
}

.mobile-logout-button svg {
  width: 18px;
  height: 18px;
}

.mobile-auth-buttons {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  width: 100%;
}

.mobile-auth-link {
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: var(--text-lg);
  font-weight: 600;
  border-radius: var(--radius-full);
  transition: all var(--transition-base);
  text-decoration: none;
  text-align: center;
}

.mobile-login-link {
  color: white;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.mobile-login-link:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
}

.mobile-register-link {
  color: white;
  background: var(--gradient-torch);
  box-shadow: 0 4px 12px rgba(255, 122, 26, 0.3);
}

.mobile-register-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 122, 26, 0.5);
}

/* 响应式 */
@media (max-width: 1024px) {
  .navbar-menu {
    gap: var(--spacing-md);
  }

  .menu-link {
    font-size: var(--text-sm);
    padding: var(--spacing-xs) var(--spacing-sm);
  }

  .logo-text {
    font-size: var(--text-lg);
  }

  .navbar-user {
    margin-left: var(--spacing-md);
  }

  .user-name {
    display: none;
  }
}

@media (max-width: 768px) {
  .navbar-menu {
    display: none;
  }

  .navbar-user {
    display: none;
  }

  .mobile-menu-button {
    display: flex;
  }

  .mobile-menu {
    display: block;
  }

  .logo-text {
    font-size: var(--text-base);
  }
}
</style>
