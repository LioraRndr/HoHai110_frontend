<template>
  <div class="about-page">
    <Navbar />
    <div class="about-container">
      <!-- 页面头部 -->
      <div class="page-hero">
        <h1 class="hero-title">河海大学110周年</h1>
        <p class="hero-subtitle">纪念网站</p>
        <div class="hero-decoration">
          <div class="decoration-circle"></div>
          <div class="decoration-circle"></div>
          <div class="decoration-circle"></div>
        </div>
      </div>

      <!-- 关于学校 -->
      <section class="about-section">
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
      <section class="about-section">
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
      <section class="about-section">
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
      <section class="about-section">
        <h2 class="section-title">关于本项目</h2>
        <div class="content-card project-card">
          <h3>项目简介</h3>
          <p>
            本项目是为庆祝河海大学建校110周年而设计开发的纪念网站。
          </p>

          <h3>技术栈</h3>
          <div class="tech-stack">
            <span class="tech-tag">Vue 3</span>
            <span class="tech-tag">Vite</span>
            <span class="tech-tag">Pinia</span>
            <span class="tech-tag">Vue Router</span>
            <span class="tech-tag">GSAP</span>
            <span class="tech-tag">Axios</span>
          </div>

          <h3>功能特色</h3>
          <ul class="feature-list">
            <li>✨ 卡片交互式历史时间线</li>
            <li>🔥 薪火相传动画与祝福墙</li>
            <li>📖 校训四维立体展示</li>
            <!-- <li>🗺️ 互动式校园地图</li>
            <li>🎨 个性化海报生成器</li>
            <li>📸 校友照片墙</li> -->
          </ul>
        </div>
      </section>

      <!-- 团队信息 -->
      <section class="about-section">
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
import { onMounted } from 'vue'
import gsap from 'gsap'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

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
}

.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-3xl) var(--spacing-xl);
  padding-top: 100px;
}

/* 页面头部 */
.page-hero {
  position: relative;
  text-align: center;
  padding: var(--spacing-4xl) 0;
  margin-bottom: var(--spacing-4xl);
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
.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.tech-tag {
  padding: var(--spacing-sm) var(--spacing-lg);
  background: var(--gradient-river);
  color: white;
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 600;
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

  .contact-item {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-xs);
  }
}
</style>
