<template>
  <!-- 桌面端侧边栏 -->
  <div class="side-nav" :class="{ hidden: !isVisible }">
    <div class="nav-container">
      <a
        v-for="item in navItems"
        :key="item.id"
        :href="`#${item.id}`"
        class="nav-item"
        :class="{ active: activeSection === item.id }"
        @click="scrollToSection(item.id, $event)"
        :title="item.label"
      >
        <div class="nav-icon">
          <component :is="item.icon" />
        </div>
        <span class="nav-label">{{ item.label }}</span>
      </a>

      <!-- 回到顶部按钮 -->
      <button
        class="back-to-top nav-item"
        :class="{ visible: showBackToTop }"
        @click="scrollToTop"
        title="回到顶部"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 19V5M5 12l7-7 7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>

  <!-- 移动端底部导航栏 -->
  <div class="mobile-nav" :class="{ hidden: !isVisible }">
    <div class="mobile-nav-container">
      <a
        v-for="item in navItems"
        :key="`mobile-${item.id}`"
        :href="`#${item.id}`"
        class="mobile-nav-item"
        :class="{ active: activeSection === item.id }"
        @click="scrollToSection(item.id, $event)"
      >
        <div class="mobile-nav-icon">
          <component :is="item.icon" />
        </div>
        <span class="mobile-nav-label">{{ item.label }}</span>
      </a>
    </div>
  </div>

  <!-- 移动端回到顶部按钮 -->
  <button
    class="mobile-back-to-top"
    :class="{ visible: showBackToTop }"
    @click="scrollToTop"
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 19V5M5 12l7-7 7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted, h } from 'vue'

const isVisible = ref(true)
const activeSection = ref('timeline')
const showBackToTop = ref(false)
let lastScrollY = 0

// 导航项配置
const navItems = ref([
  {
    id: 'timeline',
    label: '校史长河',
    icon: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' }, [
      h('path', { d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
    ])
  },
  {
    id: 'mission',
    label: '使命担当',
    icon: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' }, [
      h('path', { d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
    ])
  },
  {
    id: 'alumni',
    label: '河海英华',
    icon: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' }, [
      h('path', { d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
    ])
  },
  {
    id: 'future',
    label: '寄语未来',
    icon: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' }, [
      h('path', { d: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
    ])
  }
])

// 滚动到指定部分
const scrollToSection = (sectionId, event) => {
  event.preventDefault()
  const section = document.getElementById(sectionId)
  if (section) {
    // 获取导航栏实际高度
    const navbar = document.querySelector('.navbar')
    const navbarHeight = navbar ? navbar.offsetHeight : 80

    // 获取当前滚动位置
    const currentScroll = window.scrollY
    const targetScroll = section.offsetTop - navbarHeight

    // 判断滚动方向
    let targetPosition
    if (targetScroll > currentScroll) {
      // 向下滚动：多滚动一个导航栏高度
      targetPosition = section.offsetTop // 不减去导航栏高度，等于多滚动一个navbarHeight
    } else {
      // 向上滚动：正常滚动
      targetPosition = section.offsetTop - navbarHeight
    }

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    })
  }
}

// 回到顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// 处理滚动事件
const handleScroll = () => {
  const currentScrollY = window.scrollY

  // 控制侧边栏显示/隐藏
  if (currentScrollY < 200) {
    isVisible.value = false
  } else {
    isVisible.value = true
  }

  // 控制回到顶部按钮显示
  showBackToTop.value = currentScrollY > 500

  // 更新当前激活的部分
  const sections = navItems.value.map(item => document.getElementById(item.id))
  const scrollPosition = currentScrollY + 200

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i]
    if (section && section.offsetTop <= scrollPosition) {
      activeSection.value = navItems.value[i].id
      break
    }
  }

  lastScrollY = currentScrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.side-nav {
  position: fixed;
  right: var(--spacing-xl);
  top: 50%;
  transform: translateY(-50%) translateX(0);
  z-index: 100;
  transition: all 0.3s ease;
}

.side-nav.hidden {
  transform: translateY(-50%) translateX(120px);
  opacity: 0;
  pointer-events: none;
}

/* 统一的导航容器 - 确保所有按钮对齐 */
.nav-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  background: white;
  padding: var(--spacing-md);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-strong);
}

/* 统一的导航按钮样式 */
.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--color-river-blue);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  text-decoration: none;
  border: 2px solid transparent;
}

.nav-item:hover {
  background: rgba(10, 106, 184, 0.1);
  transform: scale(1.1);
  border-color: rgba(10, 106, 184, 0.2);
}

/* 激活状态 - 使用统一的河流蓝渐变 */
.nav-item.active {
  background: var(--gradient-river);
  color: white;
  box-shadow: 0 4px 12px rgba(10, 106, 184, 0.4);
}

.nav-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-icon svg {
  width: 100%;
  height: 100%;
  stroke-width: 2;
}

/* 标签提示 */
.nav-label {
  position: absolute;
  right: calc(100% + var(--spacing-md));
  white-space: nowrap;
  padding: var(--spacing-xs) var(--spacing-md);
  background: var(--color-ink-black);
  color: white;
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  transform: translateX(10px);
}

.nav-label::after {
  content: '';
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  border: 6px solid transparent;
  border-left-color: var(--color-ink-black);
}

.nav-item:hover .nav-label {
  opacity: 1;
  transform: translateX(0);
}

/* 回到顶部按钮 - 使用相同的基础样式 + 特殊状态 */
.back-to-top {
  margin-top: var(--spacing-sm);
  opacity: 0;
  transform: scale(0.8);
  pointer-events: none;
}

.back-to-top.visible {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
}

/* 回到顶部按钮悬停时使用渐变背景 */
.back-to-top:hover {
  background: var(--gradient-river);
  color: white;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(10, 106, 184, 0.4);
}

.back-to-top svg {
  width: 24px;
  height: 24px;
  stroke-width: 2;
}

/* 响应式 */
@media (max-width: 1024px) {
  .side-nav {
    right: var(--spacing-md);
  }

  .nav-item {
    width: 40px;
    height: 40px;
  }

  .nav-icon svg,
  .back-to-top svg {
    width: 20px;
    height: 20px;
  }
}

@media (max-width: 768px) {
  /* 隐藏桌面侧边栏 */
  .side-nav {
    display: none;
  }
}

/* 移动端底部导航栏 */
.mobile-nav {
  display: none;
}

@media (max-width: 768px) {
  .mobile-nav {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
    z-index: 100;
    transition: transform 0.3s ease;
  }

  .mobile-nav.hidden {
    transform: translateY(100%);
  }

  .mobile-nav-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: var(--spacing-sm) var(--spacing-md);
    max-width: 100%;
  }

  .mobile-nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: var(--spacing-xs) var(--spacing-sm);
    color: var(--color-river-blue);
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    border-radius: var(--radius-md);
    min-width: 60px;
  }

  .mobile-nav-item:active {
    background: rgba(10, 106, 184, 0.1);
  }

  .mobile-nav-item.active {
    color: var(--color-torch-amber);
  }

  .mobile-nav-item.active .mobile-nav-icon {
    background: var(--gradient-river);
    color: white;
    box-shadow: 0 2px 8px rgba(10, 106, 184, 0.3);
  }

  .mobile-nav-icon {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-full);
    transition: all 0.3s ease;
  }

  .mobile-nav-icon svg {
    width: 20px;
    height: 20px;
    stroke-width: 2;
  }

  .mobile-nav-label {
    font-size: 11px;
    font-weight: 500;
    white-space: nowrap;
  }

  /* 回到顶部按钮在移动端 */
  .mobile-back-to-top {
    position: fixed;
    right: var(--spacing-md);
    bottom: 80px;
    width: 48px;
    height: 48px;
    border-radius: var(--radius-full);
    background: var(--gradient-river);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(10, 106, 184, 0.4);
    z-index: 99;
    opacity: 0;
    transform: scale(0.8);
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .mobile-back-to-top.visible {
    opacity: 1;
    transform: scale(1);
    pointer-events: auto;
  }

  .mobile-back-to-top:active {
    transform: scale(0.95);
  }

  .mobile-back-to-top svg {
    width: 24px;
    height: 24px;
    stroke-width: 2;
  }
}
</style>
