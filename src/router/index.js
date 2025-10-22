import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import { $message } from '@/utils/message.js'

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
    path: '/culture',
    name: 'Culture',
    component: () => import('@/pages/Culture.vue')
  },
  {
    path: '/people',
    name: 'People',
    component: () => import('@/pages/People.vue')
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

  // 需要管理员权限的页面(需要同时登录且是管理员)
  if (to.meta.requiresAdmin) {
    if (!isLoggedIn) {
      // 未登录,重定向到登录页
      next({ name: 'Login', query: { redirect: to.fullPath } })
      return
    }
    if (user.role !== 'admin') {
      // 已登录但不是管理员
      // 延迟显示消息,确保路由跳转完成后再显示
      setTimeout(() => {
        $message.error('需要管理员权限才能访问此页面')
      }, 100)
      next({ name: 'Home' })
      return
    }
  }
  // 需要登录的页面
  else if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
    return
  }
  // 已登录用户访问登录/注册页面,重定向到首页
  else if (to.meta.requiresGuest && isLoggedIn) {
    next({ name: 'Home' })
    return
  }

  next()
})

export default router
