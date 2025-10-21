import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onUnmounted } from 'vue'

gsap.registerPlugin(ScrollTrigger)

/**
 * 河海文化页面动画管理
 * 统一管理页面中的所有 GSAP 动画和 ScrollTrigger
 */
export function useCultureAnimations() {
  let triggers = []

  /**
   * 初始化所有动画
   */
  const initAnimations = () => {
    // Hero section animation - 确保立即可见
    gsap.fromTo('.hero-title',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )

    gsap.fromTo('.hero-subtitle',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
    )

    gsap.fromTo('.scroll-indicator',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: 'power3.out' }
    )

    // Timeline items animation - 使用 fromTo 确保最终状态
    const timelineTrigger = ScrollTrigger.create({
      trigger: '.timeline-section',
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo('.timeline-item',
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out' }
        )
      },
      onLeaveBack: () => {
        gsap.set('.timeline-item', { opacity: 1, x: 0 })
      }
    })
    triggers.push(timelineTrigger)

    // Spirit cards animation
    const spiritTrigger = ScrollTrigger.create({
      trigger: '.spirit-section',
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo('.spirit-card',
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
        )
      },
      onLeaveBack: () => {
        gsap.set('.spirit-card', { opacity: 1, y: 0 })
      }
    })
    triggers.push(spiritTrigger)

    // Achievement cards animation
    const achievementTrigger = ScrollTrigger.create({
      trigger: '.achievement-section',
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo('.achievement-card',
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.2)' }
        )
      },
      onLeaveBack: () => {
        gsap.set('.achievement-card', { opacity: 1, scale: 1 })
      }
    })
    triggers.push(achievementTrigger)

    // Global stats animation
    const globalTrigger = ScrollTrigger.create({
      trigger: '.global-section',
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo('.stat-card',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
        )
      },
      onLeaveBack: () => {
        gsap.set('.stat-card', { opacity: 1, y: 0 })
      }
    })
    triggers.push(globalTrigger)

    // 立即设置所有元素为可见，防止页面刷新时元素不可见
    setTimeout(() => {
      gsap.set('.timeline-item, .spirit-card, .achievement-card, .stat-card', { opacity: 1 })
    }, 100)
  }

  /**
   * 清理所有动画和触发器
   */
  const cleanupAnimations = () => {
    triggers.forEach(trigger => trigger.kill())
    triggers = []
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  }

  // 自动清理
  onUnmounted(() => {
    cleanupAnimations()
  })

  return {
    initAnimations,
    cleanupAnimations
  }
}
