<template>
  <div class="about-page">
    <Navbar />
    <PageNav :navItems="navItems" />
    <div class="about-container">
      <!-- 页面头部 -->
      <div id="hero" class="page-hero">
        <h1 class="hero-title">河海大学110周年</h1>
        <p class="hero-subtitle">纪念网站</p>
        <div class="hero-decoration">
          <div class="decoration-circle"></div>
          <div class="decoration-circle"></div>
          <div class="decoration-circle"></div>
        </div>
      </div>

      <!-- 关于学校 -->
      <section id="about-school" class="about-section">
        <h2 class="section-title">关于河海大学</h2>
        <div class="content-card">
          <p>
            河海大学是一所有着110年办学历史,以水利为特色,工科为主,多学科协调发展的教育部直属全国重点大学,
            是实施国家"211工程"重点建设、国家优势学科创新平台建设、"双一流"建设以及教育部批准设立研究生院的高校。
          </p>
          <p>
            一百多年来,学校在治水兴邦的奋斗历程中创造了无数个"第一":
            中国第一所水利高等学府、第一个水利本科专业、第一位水利学科的中国工程院院士、第一个水利工程博士点。
          </p>
        </div>
      </section>

      <!-- 发展历程 -->
      <section id="milestone" class="about-section">
        <h2 class="section-title">发展历程</h2>
        <div class="milestone-grid">
          <div class="milestone-card">
            <div class="milestone-year">1915</div>
            <div class="milestone-title">创立</div>
            <p>河海工程专门学校成立,中国水利高等教育开启</p>
          </div>
          <div class="milestone-card">
            <div class="milestone-year">1952</div>
            <div class="milestone-title">重组</div>
            <p>华东水利学院成立,新中国水利人才培养基地</p>
          </div>
          <div class="milestone-card">
            <div class="milestone-year">1985</div>
            <div class="milestone-title">复名</div>
            <p>恢复"河海大学"校名,邓小平同志亲笔题写</p>
          </div>
          <div class="milestone-card">
            <div class="milestone-year">2017</div>
            <div class="milestone-title">双一流</div>
            <p>水利工程学科入选"双一流"建设学科</p>
          </div>
        </div>
      </section>

      <!-- 办学成就 -->
      <section id="achievements" class="about-section">
        <h2 class="section-title">办学成就</h2>
        <div class="achievements-grid">
          <div class="achievement-card">
            <div class="achievement-icon">🎓</div>
            <div class="achievement-number">20万+</div>
            <div class="achievement-label">培养毕业生</div>
          </div>
          <div class="achievement-card">
            <div class="achievement-icon">🏆</div>
            <div class="achievement-number">全国第一</div>
            <div class="achievement-label">水利工程学科</div>
          </div>
          <div class="achievement-card">
            <div class="achievement-icon">🔬</div>
            <div class="achievement-number">20+</div>
            <div class="achievement-label">国家级科研平台</div>
          </div>
          <div class="achievement-card">
            <div class="achievement-icon">🌏</div>
            <div class="achievement-number">5万+</div>
            <div class="achievement-label">在读学生</div>
          </div>
        </div>
      </section>

      <!-- 关于项目 -->
      <section id="project" class="about-section">
        <h2 class="section-title">关于本项目</h2>
        <div class="content-card project-card">
          <h3>项目简介</h3>
          <p>
            河海大学110周年纪念网站是一个富有交互性和创意的全栈应用，旨在通过现代化的Web技术展现河海大学110年的辉煌历程。
            项目采用前后端分离架构，前端使用Vue 3 + Vite构建，后端基于Node.js + Express + MySQL，提供流畅的用户体验和精美的视觉效果。
          </p>

          <h3>主要亮点</h3>
          <ul class="feature-list highlight-list">
            <li>🎨 精美的动画效果和交互体验</li>
            <li>📱 完善的响应式设计，支持多端访问</li>
            <li>⚡ 高性能加载和渲染优化</li>
            <li>🔐 完整的用户认证和权限管理系统</li>
            <li>💬 丰富的社区互动功能</li>
          </ul>

          <h3>前端技术栈</h3>
          <div class="tech-section">
            <div class="tech-category">
              <h4>核心框架</h4>
              <div class="tech-stack">
                <span class="tech-tag frontend">Vue 3.5.22</span>
                <span class="tech-tag frontend">Vite 7.1.10</span>
                <span class="tech-tag frontend">Vue Router 4.6.3</span>
                <span class="tech-tag frontend">Pinia 3.0.3</span>
              </div>
            </div>
            <div class="tech-category">
              <h4>核心库</h4>
              <div class="tech-stack">
                <span class="tech-tag frontend">GSAP 3.13.0</span>
                <span class="tech-tag frontend">Three.js 0.180.0</span>
                <span class="tech-tag frontend">Axios 1.12.2</span>
                <span class="tech-tag frontend">Socket.IO 4.8.1</span>
                <span class="tech-tag frontend">@vueuse/core 13.9.0</span>
              </div>
            </div>
          </div>

          <h3>后端技术栈</h3>
          <div class="tech-section">
            <div class="tech-category">
              <h4>核心框架</h4>
              <div class="tech-stack">
                <span class="tech-tag backend">Node.js 14+</span>
                <span class="tech-tag backend">Express 5.x</span>
                <span class="tech-tag backend">Sequelize 6.x</span>
                <span class="tech-tag backend">MySQL 8.0+</span>
              </div>
            </div>
            <div class="tech-category">
              <h4>核心功能</h4>
              <div class="tech-stack">
                <span class="tech-tag backend">JWT 认证</span>
                <span class="tech-tag backend">Socket.IO 实时通信</span>
                <span class="tech-tag backend">Nodemailer 邮件服务</span>
                <span class="tech-tag backend">Multer 文件上传</span>
                <span class="tech-tag backend">bcrypt 密码加密</span>
              </div>
            </div>
          </div>

          <h3>核心功能模块</h3>
          <div class="features-grid">
            <div class="feature-category">
              <div class="category-icon">📖</div>
              <h4>内容展示</h4>
              <ul>
                <li>首页 - 校庆主题内容展示与导航</li>
                <li>历史时间线 - 河海大学110年发展历程</li>
                <li>文化展示 - 河海精神与文化内涵</li>
                <li>河海人物 - 杰出校友和重要人物介绍</li>
              </ul>
            </div>

            <div class="feature-category">
              <div class="category-icon">🎨</div>
              <h4>互动体验</h4>
              <ul>
                <!-- <li>海报生成 - 个性化校庆纪念海报制作</li> -->
                <!-- <li>照片墙 - 校友照片马赛克拼图展示</li> -->
                <li>祝福墙 - 师生校友留言祝福互动</li>
                <li>寄语未来 - 校友寄语征集与展示</li>
                <li>火炬传递 - 全局火炬传递计数器</li>
              </ul>
            </div>

            <div class="feature-category">
              <div class="category-icon">💬</div>
              <h4>社区功能</h4>
              <ul>
                <li>论坛系统 - 多板块讨论区，支持发帖、回复、点赞</li>
                <li>文章专栏 - 校庆相关文章发布与阅读</li>
                <li>评论互动 - 文章和帖子的评论功能</li>
                <!-- <li>接力活动 - 校庆接力活动参与和分享</li> -->
              </ul>
            </div>

            <div class="feature-category">
              <div class="category-icon">👤</div>
              <h4>用户系统</h4>
              <ul>
                <li>用户认证 - 登录、注册、密码重置</li>
                <li>个人中心 - 用户信息管理和个性化设置</li>
                <li>权限管理 - 基于角色的访问控制</li>
                <li>管理后台 - 管理员内容管理界面</li>
              </ul>
            </div>
          </div>

          <h3>技术特性</h3>
          <div class="tech-features">
            <div class="tech-feature-item">
              <div class="feature-icon">🎬</div>
              <div class="feature-content">
                <h4>动画效果</h4>
                <p>GSAP驱动的高性能滚动触发动画、基于Three.js的3D视觉效果、GPU加速的动画渲染</p>
              </div>
            </div>
            <div class="tech-feature-item">
              <div class="feature-icon">📱</div>
              <div class="feature-content">
                <h4>响应式设计</h4>
                <p>移动优先的设计理念、灵活的栅格布局系统、自适应字体和间距、触摸友好的交互设计</p>
              </div>
            </div>
            <div class="tech-feature-item">
              <div class="feature-icon">⚡</div>
              <div class="feature-content">
                <h4>性能优化</h4>
                <p>路由级别的代码分割和懒加载、组件异步加载、资源预加载和缓存策略、优化的包体积和加载速度</p>
              </div>
            </div>
            <div class="tech-feature-item">
              <div class="feature-icon">🔒</div>
              <div class="feature-content">
                <h4>安全特性</h4>
                <p>JWT令牌认证、路由守卫和权限验证、XSS和CSRF防护、安全的数据传输、速率限制保护</p>
              </div>
            </div>
          </div>

          <h3>项目规模</h3>
          <div class="project-stats">
            <div class="stat-item">
              <div class="stat-number">80+</div>
              <div class="stat-label">API接口</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">21</div>
              <div class="stat-label">数据表</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">20+</div>
              <div class="stat-label">页面路由</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">15+</div>
              <div class="stat-label">后端控制器</div>
            </div>
          </div>

          <h3>系统架构</h3>
          <div class="architecture-info">
            <p>
              本项目采用前后端分离的现代化架构设计：
            </p>
            <ul>
              <li><strong>前端层：</strong>Vue 3 + Composition API，组件化开发，响应式状态管理</li>
              <li><strong>接口层：</strong>RESTful API设计，统一的请求/响应格式，完善的错误处理</li>
              <li><strong>业务层：</strong>Express路由和控制器，业务逻辑分层，中间件机制</li>
              <li><strong>数据层：</strong>Sequelize ORM，MySQL关系型数据库，数据模型关联</li>
              <li><strong>实时通信：</strong>Socket.IO实现WebSocket双向通信，支持在线状态和实时消息</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 团队信息 -->
      <section id="team" class="about-section">
        <h2 class="section-title">开发团队</h2>
        <div class="content-card">
          <p class="team-desc">
            本作品为河海大学第十一届网页设计大赛参赛作品<br>
            由计算机与软件学院计算机科学与技术2班王煜冉 & 李子睿共同设计制作
          </p>

          <div class="team-members">
            <div class="member-card">
              <div class="member-name">王煜冉</div>
              <div class="member-role">前端开发 & 后端开发</div>
              <div class="member-links">
                <a href="http://r-l.ink/home" target="_blank" rel="noopener noreferrer" class="member-link">
                  <span class="link-icon">🏠</span>
                  <span>个人主页</span>
                </a>
                <a href="https://r-l.ink/about" target="_blank" rel="noopener noreferrer" class="member-link">
                  <span class="link-icon">📧</span>
                  <span>联系方式</span>
                </a>
              </div>
            </div>

            <div class="member-card">
              <div class="member-name">李子睿</div>
              <div class="member-role">设计 & 测试</div>
            </div>
          </div>

          <div class="contact-info">
            <!-- <div class="contact-item">
              <strong>参赛单位:</strong>
              <span>河海大学计算机与软件学院</span>
            </div> -->
            <div class="contact-item">
              <strong>版本:</strong>
              <span>v1.0.0</span>
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
import { h, onMounted } from 'vue'
import gsap from 'gsap'
import Navbar from '@/components/Navbar.vue'
import PageNav from '@/components/PageNav.vue'
import Footer from '@/components/Footer.vue'

// 导航项配置
const navItems = [
  {
    id: 'hero',
    label: '首页',
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
    label: '关于学校',
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
    label: '发展历程',
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
    label: '办学成就',
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
    label: '关于项目',
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
    label: '开发团队',
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
]

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
