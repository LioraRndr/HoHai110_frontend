import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/Register.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/timeline',
    name: 'Timeline',
    component: () => import('@/pages/Timeline.vue')
  },
  {
    path: '/relay',
    name: 'Relay',
    component: () => import('@/pages/Relay.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/maxims',
    name: 'Maxims',
    component: () => import('@/pages/Maxims.vue')
  },
  {
    path: '/culture',
    name: 'Culture',
    component: () => import('@/pages/Culture.vue')
  },
  {
    path: '/poster',
    name: 'Poster',
    component: () => import('@/pages/Poster.vue')
  },
  {
    path: '/mosaic',
    name: 'Mosaic',
    component: () => import('@/pages/Mosaic.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/About.vue')
  },
  {
    path: '/articles',
    name: 'Articles',
    component: () => import('@/pages/Articles.vue')
  },
  {
    path: '/articles/:id',
    name: 'ArticleDetail',
    component: () => import('@/pages/ArticleDetail.vue')
  },
  {
    path: '/blessings',
    name: 'Blessings',
    component: () => import('@/pages/Blessings.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/pages/Admin.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/message-test',
    name: 'MessageTest',
    component: () => import('@/pages/MessageTest.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const isLoggedIn = !!token
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  // 需要登录的页面
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  }
  // 需要管理员权限的页面
  else if (to.meta.requiresAdmin && user.role !== 'admin') {
    // 使用浏览器原生alert，因为此时消息服务可能还未初始化
    alert('需要管理员权限才能访问此页面')
    next({ name: 'Home' })
  }
  // 已登录用户访问登录/注册页面,重定向到首页
  else if (to.meta.requiresGuest && isLoggedIn) {
    next({ name: 'Home' })
  }
  else {
    next()
  }
})

export default router
