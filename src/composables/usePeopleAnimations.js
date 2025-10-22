import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onUnmounted } from 'vue'

gsap.registerPlugin(ScrollTrigger)

/**
 * 人物篇页面动画管理
 * 统一管理页面中的所有 GSAP 动画和 ScrollTrigger
 */
export function usePeopleAnimations() {
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

    gsap.fromTo('.hero-description',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power3.out' }
    )

    gsap.fromTo('.scroll-indicator',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: 'power3.out' }
    )

    // People cards animation
    const peopleTrigger = ScrollTrigger.create({
      trigger: '.people-grid',
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo('.person-card',
          { opacity: 0, y: 60, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
        )
      },
      onLeaveBack: () => {
        gsap.set('.person-card', { opacity: 1, y: 0, scale: 1 })
      }
    })
    triggers.push(peopleTrigger)

    // 立即设置所有元素为可见，防止页面刷新时元素不可见
    setTimeout(() => {
      gsap.set('.person-card', { opacity: 1 })
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
