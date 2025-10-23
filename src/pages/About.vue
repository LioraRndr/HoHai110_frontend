<template>
  <div class="about-page">
    <Navbar />
    <PageNav :navItems="navItems" />
    <div class="about-container">
      <!-- 页面头部 -->
      <div id="hero" class="page-hero">
        <h1 class="hero-title">{{ hero.title }}</h1>
        <p class="hero-subtitle">{{ hero.subtitle }}</p>
        <div class="hero-decoration">
          <div class="decoration-circle"></div>
          <div class="decoration-circle"></div>
          <div class="decoration-circle"></div>
        </div>
      </div>

      <!-- 关于学校 -->
      <section id="about-school" class="about-section">
        <h2 class="section-title">{{ aboutSchool.title }}</h2>
        <div class="content-card">
          <p>{{ aboutSchool.paragraph1 }}</p>
          <p>{{ aboutSchool.paragraph2 }}</p>
        </div>
      </section>

      <!-- 发展历程 -->
      <section id="milestone" class="about-section">
        <h2 class="section-title">{{ milestones.title }}</h2>
        <div class="milestone-grid">
          <div v-for="event in milestones.events" :key="event.year" class="milestone-card">
            <div class="milestone-year">{{ event.year }}</div>
            <div class="milestone-title">{{ event.title }}</div>
            <p>{{ event.description }}</p>
          </div>
        </div>
      </section>

      <!-- 办学成就 -->
      <section id="achievements" class="about-section">
        <h2 class="section-title">{{ achievements.title }}</h2>
        <div class="achievements-grid">
          <div v-for="(stat, index) in achievements.stats" :key="index" class="achievement-card">
            <div class="achievement-icon">{{ stat.icon }}</div>
            <div class="achievement-number">{{ stat.number }}</div>
            <div class="achievement-label">{{ stat.label }}</div>
          </div>
        </div>
      </section>

      <!-- 关于项目 -->
      <section id="project" class="about-section">
        <h2 class="section-title">{{ project.title }}</h2>
        <div class="content-card project-card">
          <h3>{{ project.introduction.title }}</h3>
          <p>{{ project.introduction.content }}</p>

          <h3>{{ project.highlights.title }}</h3>
          <ul class="feature-list highlight-list">
            <li v-for="(item, index) in project.highlights.items" :key="index">{{ item }}</li>
          </ul>

          <h3>{{ project.frontend.title }}</h3>
          <div class="tech-section">
            <div class="tech-category">
              <h4>{{ project.frontend.core.title }}</h4>
              <div class="tech-stack">
                <span v-for="tech in project.frontend.core.items" :key="tech.name" :class="['tech-tag', tech.type]">{{ tech.name }}</span>
              </div>
            </div>
            <div class="tech-category">
              <h4>{{ project.frontend.libraries.title }}</h4>
              <div class="tech-stack">
                <span v-for="tech in project.frontend.libraries.items" :key="tech.name" :class="['tech-tag', tech.type]">{{ tech.name }}</span>
              </div>
            </div>
          </div>

          <h3>{{ project.backend.title }}</h3>
          <div class="tech-section">
            <div class="tech-category">
              <h4>{{ project.backend.core.title }}</h4>
              <div class="tech-stack">
                <span v-for="tech in project.backend.core.items" :key="tech.name" :class="['tech-tag', tech.type]">{{ tech.name }}</span>
              </div>
            </div>
            <div class="tech-category">
              <h4>{{ project.backend.features.title }}</h4>
              <div class="tech-stack">
                <span v-for="tech in project.backend.features.items" :key="tech.name" :class="['tech-tag', tech.type]">{{ tech.name }}</span>
              </div>
            </div>
          </div>

          <h3>{{ project.features.title }}</h3>
          <div class="features-grid">
            <div v-for="category in project.features.categories" :key="category.title" class="feature-category">
              <div class="category-icon">{{ category.icon }}</div>
              <h4>{{ category.title }}</h4>
              <ul>
                <li v-for="(item, index) in category.items" :key="index">{{ item }}</li>
              </ul>
            </div>
          </div>

          <h3>{{ project.techFeatures.title }}</h3>
          <div class="tech-features">
            <div v-for="feature in project.techFeatures.items" :key="feature.title" class="tech-feature-item">
              <div class="feature-icon">{{ feature.icon }}</div>
              <div class="feature-content">
                <h4>{{ feature.title }}</h4>
                <p>{{ feature.description }}</p>
              </div>
            </div>
          </div>

          <h3>{{ project.stats.title }}</h3>
          <div class="project-stats">
            <div v-for="stat in project.stats.items" :key="stat.label" class="stat-item">
              <div class="stat-number">{{ stat.number }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>

          <h3>{{ project.architecture.title }}</h3>
          <div class="architecture-info">
            <p>{{ project.architecture.description }}</p>
            <ul>
              <li v-for="layer in project.architecture.layers" :key="layer.name">
                <strong>{{ layer.name }}：</strong>{{ layer.description }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 团队信息 -->
      <section id="team" class="about-section">
        <h2 class="section-title">{{ team.title }}</h2>
        <div class="content-card">
          <p class="team-desc" style="white-space: pre-line;">{{ team.description }}</p>

          <div class="team-members">
            <div v-for="member in team.members" :key="member.name" class="member-card">
              <div class="member-name">{{ member.name }}</div>
              <div class="member-role">{{ member.role }}</div>
              <div v-if="member.links.length > 0" class="member-links">
                <a v-for="link in member.links" :key="link.url" :href="link.url" target="_blank" rel="noopener noreferrer" class="member-link">
                  <span class="link-icon">{{ link.icon }}</span>
                  <span>{{ link.text }}</span>
                </a>
              </div>
            </div>
          </div>

          <div class="contact-info">
            <div class="contact-item">
              <strong>{{ team.contact.version.label }}:</strong>
              <span>{{ team.contact.version.value }}</span>
            </div>
            <div v-if="team.contact.github" class="contact-item github-links">
              <strong>{{ team.contact.github.label }}:</strong>
              <div class="github-link-group">
                <a :href="team.contact.github.frontend" target="_blank" rel="noopener noreferrer" class="github-link">
                  <span class="link-icon">🔗</span>
                  <span>{{ team.contact.github.frontendLabel }}</span>
                </a>
                <a :href="team.contact.github.backend" target="_blank" rel="noopener noreferrer" class="github-link">
                  <span class="link-icon">🔗</span>
                  <span>{{ team.contact.github.backendLabel }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 页脚已替换为共享Footer组件 -->
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { h, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import Navbar from '@/components/Navbar.vue'
import PageNav from '@/components/PageNav.vue'
import Footer from '@/components/Footer.vue'
import { useAboutData } from '@/composables/useAboutData'

const { t } = useI18n()

// 使用 composable 获取数据
const { hero, aboutSchool, milestones, achievements, project, team } = useAboutData()

// 导航项配置
const navItems = computed(() => [
  {
    id: 'hero',
    label: t('aboutPage.pageNav.hero'),
    icon: () => h('svg', {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('path', { d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }),
      h('polyline', { points: '9 22 9 12 15 12 15 22' })
    ])
  },
  {
    id: 'about-school',
    label: t('aboutPage.pageNav.aboutSchool'),
    icon: () => h('svg', {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('path', { d: 'M22 10v6M2 10l10-5 10 5-10 5z' }),
      h('path', { d: 'M6 12v5c3 3 9 3 12 0v-5' })
    ])
  },
  {
    id: 'milestone',
    label: t('aboutPage.pageNav.milestone'),
    icon: () => h('svg', {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('circle', { cx: '12', cy: '12', r: '10' }),
      h('polyline', { points: '12 6 12 12 16 14' })
    ])
  },
  {
    id: 'achievements',
    label: t('aboutPage.pageNav.achievements'),
    icon: () => h('svg', {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('path', { d: 'M6 9H4.5a2.5 2.5 0 0 1 0-5H6' }),
      h('path', { d: 'M18 9h1.5a2.5 2.5 0 0 0 0-5H18' }),
      h('path', { d: 'M4 22h16' }),
      h('path', { d: 'M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22' }),
      h('path', { d: 'M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22' }),
      h('path', { d: 'M18 2H6v7a6 6 0 0 0 12 0V2z' })
    ])
  },
  {
    id: 'project',
    label: t('aboutPage.pageNav.project'),
    icon: () => h('svg', {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('polyline', { points: '16 18 22 12 16 6' }),
      h('polyline', { points: '8 6 2 12 8 18' })
    ])
  },
  {
    id: 'team',
    label: t('aboutPage.pageNav.team'),
    icon: () => h('svg', {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('path', { d: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' }),
      h('circle', { cx: '9', cy: '7', r: '4' }),
      h('path', { d: 'M23 21v-2a4 4 0 0 0-3-3.87' }),
      h('path', { d: 'M16 3.13a4 4 0 0 1 0 7.75' })
    ])
  }
])

onMounted(() => {
  // 入场动画
  gsap.from('.page-hero', {
    opacity: 0,
    y: -50,
    duration: 1,
    ease: 'power3.out'
  })

  gsap.from('.about-section', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
    delay: 0.3
  })
})
</script>

<style scoped>
.about-page {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #F8F5EF 0%, #E5E2DC 100%);
  overflow-x: hidden;
}

.about-container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: var(--spacing-3xl) var(--spacing-xl);
  padding-top: 100px;
  box-sizing: border-box;
}

/* 页面头部 */
.page-hero {
  position: relative;
  text-align: center;
  padding: var(--spacing-4xl) 0;
  margin-bottom: var(--spacing-4xl);
  margin-top: 40px;
}

.hero-title {
  font-size: 4rem;
  font-family: var(--font-title);
  font-weight: 700;
  background: var(--gradient-river);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--spacing-md);
  letter-spacing: 4px;
}

.hero-subtitle {
  font-size: var(--text-xl);
  color: var(--color-ink-black);
  opacity: 0.7;
  letter-spacing: 8px;
}

.hero-decoration {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  pointer-events: none;
}

.decoration-circle {
  position: absolute;
  width: 300px;
  height: 300px;
  border: 2px solid var(--color-river-blue);
  border-radius: var(--radius-full);
  opacity: 0.1;
  animation: rotate 30s linear infinite;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.decoration-circle:nth-child(2) {
  width: 400px;
  height: 400px;
  animation-delay: -10s;
  animation-direction: reverse;
}

.decoration-circle:nth-child(3) {
  width: 500px;
  height: 500px;
  animation-delay: -20s;
}

@keyframes rotate {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

/* 章节 */
.about-section {
  margin-bottom: var(--spacing-4xl);
}

.section-title {
  font-size: var(--text-3xl);
  font-family: var(--font-title);
  font-weight: 700;
  color: var(--color-river-blue);
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

.content-card {
  background: white;
  padding: var(--spacing-3xl);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-soft);
  width: 100%;
  box-sizing: border-box;
}

.content-card p {
  font-size: var(--text-lg);
  line-height: 2;
  color: var(--color-ink-black);
  margin-bottom: var(--spacing-lg);
}

.content-card h3 {
  font-size: var(--text-xl);
  font-family: var(--font-title);
  font-weight: 700;
  color: var(--color-river-blue);
  margin-top: var(--spacing-2xl);
  margin-bottom: var(--spacing-md);
}

.content-card h3:first-child {
  margin-top: 0;
}

/* 里程碑 */
.milestone-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-xl);
}

.milestone-card {
  background: white;
  padding: var(--spacing-2xl);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-soft);
  text-align: center;
  transition: all var(--transition-base);
}

.milestone-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-medium);
}

.milestone-year {
  font-size: var(--text-4xl);
  font-family: var(--font-title);
  font-weight: 700;
  background: var(--gradient-torch);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--spacing-sm);
}

.milestone-title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-river-blue);
  margin-bottom: var(--spacing-md);
}

.milestone-card p {
  font-size: var(--text-base);
  line-height: 1.8;
  color: var(--color-ink-black);
  opacity: 0.8;
}

/* 成就 */
.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-xl);
}

.achievement-card {
  background: white;
  padding: var(--spacing-2xl);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-soft);
  text-align: center;
  transition: all var(--transition-base);
}

.achievement-card:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-medium);
}

.achievement-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-md);
}

.achievement-number {
  font-size: var(--text-2xl);
  font-family: var(--font-title);
  font-weight: 700;
  color: var(--color-river-blue);
  margin-bottom: var(--spacing-sm);
}

.achievement-label {
  font-size: var(--text-sm);
  color: var(--color-ink-black);
  opacity: 0.7;
}

/* 技术栈 */
.tech-section {
  margin-bottom: var(--spacing-xl);
}

.tech-category {
  margin-bottom: var(--spacing-lg);
}

.tech-category h4 {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-ink-black);
  margin-bottom: var(--spacing-md);
  opacity: 0.8;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.tech-tag {
  padding: var(--spacing-sm) var(--spacing-lg);
  color: white;
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 600;
  transition: all var(--transition-base);
}

.tech-tag.frontend {
  background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
}

.tech-tag.backend {
  background: linear-gradient(135deg, #68a063 0%, #215732 100%);
}

.tech-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 功能列表 */
.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  font-size: var(--text-base);
  padding: var(--spacing-sm) 0;
  color: var(--color-ink-black);
  line-height: 1.8;
}

.highlight-list li {
  font-weight: 500;
}

/* 功能模块网格 */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.feature-category {
  background: linear-gradient(135deg, #F8F5EF 0%, #E5E2DC 100%);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  border: 2px solid rgba(0, 122, 204, 0.1);
  transition: all var(--transition-base);
}

.feature-category:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-medium);
  border-color: var(--color-river-blue);
}

.category-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
  text-align: center;
}

.feature-category h4 {
  font-size: var(--text-lg);
  font-family: var(--font-title);
  font-weight: 700;
  color: var(--color-river-blue);
  margin-bottom: var(--spacing-md);
  text-align: center;
}

.feature-category ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-category ul li {
  font-size: var(--text-sm);
  padding: var(--spacing-xs) 0;
  color: var(--color-ink-black);
  line-height: 1.8;
  position: relative;
  padding-left: var(--spacing-md);
}

.feature-category ul li::before {
  content: "▸";
  position: absolute;
  left: 0;
  color: var(--color-river-blue);
  font-weight: bold;
}

/* 技术特性 */
.tech-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.tech-feature-item {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: linear-gradient(135deg, #F8F5EF 0%, #E5E2DC 100%);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(0, 122, 204, 0.1);
  transition: all var(--transition-base);
}

.tech-feature-item:hover {
  transform: translateX(5px);
  box-shadow: var(--shadow-soft);
  border-color: var(--color-river-blue);
}

.tech-feature-item .feature-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.tech-feature-item .feature-content h4 {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-river-blue);
  margin: 0 0 var(--spacing-xs) 0;
}

.tech-feature-item .feature-content p {
  font-size: var(--text-sm);
  line-height: 1.6;
  color: var(--color-ink-black);
  opacity: 0.8;
  margin: 0;
}

/* 项目统计 */
.project-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.stat-item {
  text-align: center;
  padding: var(--spacing-xl);
  background: linear-gradient(135deg, rgba(0, 122, 204, 0.05) 0%, rgba(0, 122, 204, 0.1) 100%);
  border-radius: var(--radius-lg);
  border: 2px solid var(--color-river-blue);
  transition: all var(--transition-base);
}

.stat-item:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-medium);
  background: linear-gradient(135deg, rgba(0, 122, 204, 0.1) 0%, rgba(0, 122, 204, 0.15) 100%);
}

.stat-number {
  font-size: var(--text-3xl);
  font-family: var(--font-title);
  font-weight: 700;
  background: var(--gradient-river);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--spacing-xs);
}

.stat-label {
  font-size: var(--text-sm);
  color: var(--color-ink-black);
  opacity: 0.7;
  font-weight: 500;
}

/* 系统架构 */
.architecture-info {
  background: linear-gradient(135deg, #F8F5EF 0%, #E5E2DC 100%);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  border-left: 4px solid var(--color-river-blue);
}

.architecture-info p {
  font-size: var(--text-base);
  line-height: 1.8;
  color: var(--color-ink-black);
  margin-bottom: var(--spacing-md);
  font-weight: 500;
}

.architecture-info ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.architecture-info ul li {
  font-size: var(--text-sm);
  padding: var(--spacing-sm) 0;
  color: var(--color-ink-black);
  line-height: 1.8;
  position: relative;
  padding-left: var(--spacing-lg);
}

.architecture-info ul li::before {
  content: "◆";
  position: absolute;
  left: 0;
  color: var(--color-river-blue);
  font-size: 0.8em;
}

.architecture-info strong {
  color: var(--color-river-blue);
  font-weight: 600;
}

/* 团队信息 */
.team-desc {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
  font-size: var(--text-lg);
  line-height: 2;
}

.team-members {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
}

.member-card {
  background: linear-gradient(135deg, #F8F5EF 0%, #E5E2DC 100%);
  padding: var(--spacing-2xl);
  border-radius: var(--radius-lg);
  border: 2px solid var(--color-river-blue);
  text-align: center;
  transition: all var(--transition-base);
}

.member-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-medium);
}

.member-name {
  font-size: var(--text-2xl);
  font-family: var(--font-title);
  font-weight: 700;
  color: var(--color-river-blue);
  margin-bottom: var(--spacing-sm);
}

.member-role {
  font-size: var(--text-base);
  color: var(--color-ink-black);
  opacity: 0.7;
  margin-bottom: var(--spacing-lg);
}

.member-links {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.member-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-lg);
  background: white;
  color: var(--color-river-blue);
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: all var(--transition-base);
  font-size: var(--text-sm);
  font-weight: 500;
}

.member-link:hover {
  background: var(--color-river-blue);
  color: white;
  transform: scale(1.05);
}

.link-icon {
  font-size: 1.2em;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding-top: var(--spacing-xl);
  border-top: 1px solid var(--color-page-ivory);
}

.contact-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--text-base);
}

.contact-item strong {
  color: var(--color-river-blue);
}

.contact-item span {
  color: var(--color-ink-black);
  opacity: 0.8;
}

.github-links {
  flex-direction: column;
  align-items: flex-start;
}

.github-link-group {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-sm);
  flex-wrap: wrap;
}

.github-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: linear-gradient(135deg, #F8F5EF 0%, #E5E2DC 100%);
  color: var(--color-river-blue);
  border: 2px solid var(--color-river-blue);
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: all var(--transition-base);
  font-size: var(--text-sm);
  font-weight: 500;
}

.github-link:hover {
  background: var(--color-river-blue);
  color: white;
  transform: translateY(-2px);
  box-shadow: var(--shadow-soft);
}

.github-link .link-icon {
  font-size: 1em;
}

/* 响应式 */
@media (max-width: 768px) {
  .about-container {
    padding: var(--spacing-xl) var(--spacing-md);
    padding-top: 80px;
  }

  .hero-title {
    font-size: 2.5rem;
    letter-spacing: 2px;
  }

  .hero-subtitle {
    font-size: var(--text-base);
    letter-spacing: 4px;
  }

  /* 隐藏装饰圆圈避免溢出 */
  .hero-decoration {
    display: none;
  }

  .section-title {
    font-size: var(--text-2xl);
  }

  .content-card {
    padding: var(--spacing-xl);
  }

  .milestone-grid,
  .achievements-grid {
    grid-template-columns: 1fr;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .tech-features {
    grid-template-columns: 1fr;
  }

  .project-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .tech-feature-item {
    flex-direction: column;
    text-align: center;
  }

  .tech-feature-item .feature-icon {
    font-size: 2.5rem;
  }

  .contact-item {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-xs);
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
    letter-spacing: 1px;
  }

  .project-stats {
    grid-template-columns: 1fr;
  }

  .tech-stack {
    justify-content: center;
  }

  .stat-number {
    font-size: var(--text-2xl);
  }

  .achievement-icon {
    font-size: 3rem;
  }

  .content-card {
    padding: var(--spacing-lg);
  }
}
</style>
